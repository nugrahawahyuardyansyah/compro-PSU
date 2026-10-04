import "dotenv/config";
import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  FRONTEND_ORIGIN: z.string().url().default("http://localhost:5173"),
  DB_HOST: z.string().min(1).default("localhost"),
  DB_PORT: z.coerce.number().int().positive().default(3306),
  DB_NAME: z.string().min(1).default("psu"),
  DB_USER: z.string().min(1).default("root"),
  DB_PASSWORD: z.string().default(""),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  ACCESS_TOKEN_TTL: z.string().default("10m"),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().int().positive().default(7),
  COOKIE_SAME_SITE: z.enum(["strict", "lax", "none"]).default("strict"),
  COOKIE_SECURE: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
}).superRefine((configuration, context) => {
  if (
    configuration.NODE_ENV === "production" &&
    !configuration.COOKIE_SECURE
  ) {
    context.addIssue({
      code: "custom",
      path: ["COOKIE_SECURE"],
      message: "Production refresh-token cookies require HTTPS.",
    });
  }
  if (
    configuration.COOKIE_SAME_SITE === "none" &&
    !configuration.COOKIE_SECURE
  ) {
    context.addIssue({
      code: "custom",
      path: ["COOKIE_SAME_SITE"],
      message: "SameSite=None cookies require COOKIE_SECURE=true.",
    });
  }
});

const result = environmentSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid environment configuration:", result.error.flatten().fieldErrors);
  throw new Error("Backend environment configuration is invalid.");
}

export const env = result.data;
