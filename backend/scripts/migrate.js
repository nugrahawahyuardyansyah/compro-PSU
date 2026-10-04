import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { pool } from "../src/config/db.js";

try {
  const schemaPath = new URL("../src/db/schema.sql", import.meta.url);
  const schema = await readFile(fileURLToPath(schemaPath), "utf8");
  const statements = schema
    .split(";")
    .map((statement) => statement.trim())
    .filter(Boolean);
  const connection = await pool.getConnection();
  try {
    for (const statement of statements) {
      await connection.query(statement);
    }
  } finally {
    connection.release();
  }
  console.info(`Database schema applied (${statements.length} statements).`);
} catch (error) {
  console.error("Database migration failed.", error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
