import app from "./app.js";
import { env } from "./config/env.js";
import { checkDatabaseConnection, pool } from "./config/db.js";

try {
  await checkDatabaseConnection();
  app.listen(env.PORT, () => {
    console.info(`PSU API listening on port ${env.PORT}`);
  });
} catch (error) {
  console.error("Unable to start PSU API because the database is unavailable.", error);
  await pool.end();
  process.exitCode = 1;
}
