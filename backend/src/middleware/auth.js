import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function requireAdmin(request, response, next) {
  const authorization = request.get("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";

  if (!token) {
    response.status(401).json({ message: "Autentikasi admin diperlukan." });
    return;
  }

  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET, {
      issuer: "psu-api",
      audience: "psu-admin",
    });

    if (payload.type !== "access" || typeof payload.sub !== "string") {
      response.status(401).json({ message: "Token akses tidak valid." });
      return;
    }

    request.admin = { id: payload.sub, email: payload.email };
    next();
  } catch {
    response.status(401).json({ message: "Sesi admin tidak valid atau kedaluwarsa." });
  }
}
