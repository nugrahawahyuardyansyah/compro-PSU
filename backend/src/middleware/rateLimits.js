import { rateLimit } from "express-rate-limit";

export const publicSubmissionLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
});

export const authLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Terlalu banyak percobaan autentikasi." },
});
