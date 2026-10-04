import bcrypt from "bcryptjs";
import { z } from "zod";
import { pool } from "../src/config/db.js";

const adminSchema = z.object({
  ADMIN_EMAIL: z.string().trim().email().max(190),
  ADMIN_PASSWORD: z.string().min(12).max(200),
});

try {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = adminSchema.parse(process.env);
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await pool.execute(
    `INSERT INTO users (email, password_hash, role, is_active)
     VALUES (?, ?, 'admin', TRUE)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash),
                             role = 'admin', is_active = TRUE`,
    [ADMIN_EMAIL.toLowerCase(), passwordHash],
  );
  console.info(`Admin account configured for ${ADMIN_EMAIL.toLowerCase()}.`);
} catch (error) {
  console.error("Unable to create admin account. Provide valid ADMIN_EMAIL and ADMIN_PASSWORD environment variables.", error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
