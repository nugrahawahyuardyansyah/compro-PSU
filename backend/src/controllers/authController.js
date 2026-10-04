import { createHash, randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env.js";
import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const credentialsSchema = z.object({
  email: z.string().trim().email().max(190),
  password: z.string().min(1).max(200),
});

const refreshCookieName = "psu_refresh";
const refreshTtlMs = env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000;

function cookieOptions() {
  return {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SAME_SITE,
    path: "/api/auth",
    maxAge: refreshTtlMs,
  };
}

function signAccessToken(user) {
  return jwt.sign(
    { email: user.email, type: "access" },
    env.JWT_ACCESS_SECRET,
    {
      subject: String(user.id),
      issuer: "psu-api",
      audience: "psu-admin",
      expiresIn: env.ACCESS_TOKEN_TTL,
    },
  );
}

function signRefreshToken(userId, tokenId) {
  return jwt.sign(
    { type: "refresh" },
    env.JWT_REFRESH_SECRET,
    {
      subject: String(userId),
      jwtid: tokenId,
      issuer: "psu-api",
      audience: "psu-admin-refresh",
      expiresIn: `${env.REFRESH_TOKEN_TTL_DAYS}d`,
    },
  );
}

function tokenHash(token) {
  return createHash("sha256").update(token).digest("hex");
}

async function issueRefreshToken(userId, response) {
  const tokenId = randomUUID();
  const token = signRefreshToken(userId, tokenId);
  const expiresAt = new Date(Date.now() + refreshTtlMs);
  await pool.execute(
    "INSERT INTO refresh_tokens (id, user_id, token_hash, expires_at) VALUES (?, ?, ?, ?)",
    [tokenId, userId, tokenHash(token), expiresAt],
  );
  response.cookie(refreshCookieName, token, cookieOptions());
}

export const login = asyncHandler(async (request, response) => {
  const credentials = credentialsSchema.parse(request.body);
  const [rows] = await pool.execute(
    "SELECT id, email, password_hash, role FROM users WHERE email = ? AND is_active = 1 LIMIT 1",
    [credentials.email.toLowerCase()],
  );
  const user = rows[0];
  const passwordMatches = user
    ? await bcrypt.compare(credentials.password, user.password_hash)
    : false;

  if (!passwordMatches || user.role !== "admin") {
    response.status(401).json({ message: "Email atau kata sandi tidak sesuai." });
    return;
  }

  await issueRefreshToken(user.id, response);
  response.json({
    accessToken: signAccessToken(user),
    user: { id: user.id, email: user.email, role: user.role },
  });
});

export const refresh = asyncHandler(async (request, response) => {
  const token = request.cookies[refreshCookieName];
  if (!token) {
    response.status(401).json({ message: "Sesi admin telah berakhir." });
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, env.JWT_REFRESH_SECRET, {
      issuer: "psu-api",
      audience: "psu-admin-refresh",
    });
  } catch {
    response.clearCookie(refreshCookieName, cookieOptions());
    response.status(401).json({ message: "Sesi admin tidak valid atau kedaluwarsa." });
    return;
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [tokens] = await connection.execute(
      `SELECT id, user_id FROM refresh_tokens
       WHERE id = ? AND token_hash = ? AND revoked_at IS NULL
         AND expires_at > UTC_TIMESTAMP() FOR UPDATE`,
      [payload.jti, tokenHash(token)],
    );
    if (!tokens[0] || String(tokens[0].user_id) !== payload.sub) {
      await connection.rollback();
      response.clearCookie(refreshCookieName, cookieOptions());
      response.status(401).json({ message: "Sesi admin tidak valid atau kedaluwarsa." });
      return;
    }

    const [users] = await connection.execute(
      "SELECT id, email, role FROM users WHERE id = ? AND is_active = 1 LIMIT 1",
      [tokens[0].user_id],
    );
    if (!users[0] || users[0].role !== "admin") {
      await connection.rollback();
      response.clearCookie(refreshCookieName, cookieOptions());
      response.status(401).json({ message: "Akun admin tidak aktif." });
      return;
    }

    await connection.execute(
      "UPDATE refresh_tokens SET revoked_at = UTC_TIMESTAMP() WHERE id = ?",
      [payload.jti],
    );
    await connection.commit();
    await issueRefreshToken(users[0].id, response);
    response.json({
      accessToken: signAccessToken(users[0]),
      user: { id: users[0].id, email: users[0].email, role: users[0].role },
    });
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
});

export const logout = asyncHandler(async (request, response) => {
  const token = request.cookies[refreshCookieName];
  if (token) {
    try {
      const payload = jwt.verify(token, env.JWT_REFRESH_SECRET, {
        issuer: "psu-api",
        audience: "psu-admin-refresh",
      });
      await pool.execute(
        "UPDATE refresh_tokens SET revoked_at = UTC_TIMESTAMP() WHERE id = ? AND token_hash = ? AND revoked_at IS NULL",
        [payload.jti, tokenHash(token)],
      );
    } catch {
      // The cookie is still cleared below when the token is expired or invalid.
    }
  }
  response.clearCookie(refreshCookieName, cookieOptions());
  response.status(204).end();
});

export const currentAdmin = asyncHandler(async (request, response) => {
  const [rows] = await pool.execute(
    "SELECT id, email, role FROM users WHERE id = ? AND is_active = 1 LIMIT 1",
    [request.admin.id],
  );
  if (!rows[0]) {
    response.status(401).json({ message: "Akun admin tidak aktif." });
    return;
  }
  response.json({ user: rows[0] });
});
