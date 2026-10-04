import { z } from "zod";
import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const serviceRequestSchema = z.object({
  name: z.string().trim().min(2).max(150),
  organization: z.string().trim().min(2).max(180),
  email: z.string().trim().email().max(190),
  phone: z.string().trim().max(40).optional().default(""),
  service: z.string().trim().min(2).max(100),
  details: z.string().trim().min(10).max(5000),
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(150),
  email: z.string().trim().email().max(190),
  phone: z.string().trim().max(40).optional().default(""),
  subject: z.string().trim().min(2).max(180),
  message: z.string().trim().min(10).max(5000),
});

export const createServiceRequest = asyncHandler(async (request, response) => {
  const data = serviceRequestSchema.parse(request.body);
  const [result] = await pool.execute(
    `INSERT INTO service_requests
     (name, organization, email, phone, service, details)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.organization,
      data.email,
      data.phone,
      data.service,
      data.details,
    ],
  );

  response.status(201).json({
    message: "Pengajuan layanan berhasil diterima.",
    reference: `SR-${String(result.insertId).padStart(8, "0")}`,
  });
});

export const createContact = asyncHandler(async (request, response) => {
  const data = contactSchema.parse(request.body);
  const [result] = await pool.execute(
    `INSERT INTO contacts (name, email, phone, subject, message)
     VALUES (?, ?, ?, ?, ?)`,
    [data.name, data.email, data.phone, data.subject, data.message],
  );

  response.status(201).json({
    message: "Pesan berhasil diterima.",
    reference: `CT-${String(result.insertId).padStart(8, "0")}`,
  });
});
