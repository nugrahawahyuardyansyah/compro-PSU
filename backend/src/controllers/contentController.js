import { z } from "zod";
import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { paginationResult, parsePagination } from "../utils/pagination.js";

const listSchema = z.object({
  q: z.string().trim().max(120).default(""),
  category: z.string().trim().max(80).default(""),
});

function normalizeArticle(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    thumbnail: row.thumbnail,
    excerpt: row.excerpt,
    content: row.content,
    author: row.author,
    category: row.category,
    status: row.status,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function normalizePartner(row) {
  return {
    id: row.id,
    name: row.name,
    logo: row.logo,
    category: row.category,
    description: row.description,
    website: row.website,
  };
}

export const listArticles = asyncHandler(async (request, response) => {
  const { page, limit } = parsePagination(request.query);
  const { q, category } = listSchema.parse(request.query);
  const offset = (page - 1) * limit;
  const filters = ["status = 'published'"];
  const parameters = [];

  if (q) {
    filters.push("(title LIKE ? OR excerpt LIKE ?)");
    parameters.push(`%${q}%`, `%${q}%`);
  }
  if (category) {
    filters.push("category = ?");
    parameters.push(category);
  }

  const where = filters.join(" AND ");
  const [[countRow]] = await pool.execute(
    `SELECT COUNT(*) AS total FROM articles WHERE ${where}`,
    parameters,
  );
  const [rows] = await pool.execute(
    `SELECT id, title, slug, thumbnail, excerpt, author, category, status,
            published_at, created_at, updated_at
     FROM articles WHERE ${where}
     ORDER BY published_at DESC, id DESC LIMIT ? OFFSET ?`,
    [...parameters, limit, offset],
  );

  response.json({
    data: rows.map(normalizeArticle),
    pagination: paginationResult(page, limit, countRow.total),
  });
});

export const getArticle = asyncHandler(async (request, response) => {
  const [rows] = await pool.execute(
    `SELECT id, title, slug, thumbnail, excerpt, content, author, category,
            status, published_at, created_at, updated_at
     FROM articles WHERE slug = ? AND status = 'published' LIMIT 1`,
    [request.params.slug],
  );

  if (!rows[0]) {
    response.status(404).json({ message: "Artikel tidak ditemukan." });
    return;
  }

  response.json({ data: normalizeArticle(rows[0]) });
});

export const listPartners = asyncHandler(async (request, response) => {
  const { page, limit } = parsePagination(request.query);
  const { q, category } = listSchema.parse(request.query);
  const offset = (page - 1) * limit;
  const filters = ["is_published = 1"];
  const parameters = [];

  if (q) {
    filters.push("(name LIKE ? OR description LIKE ?)");
    parameters.push(`%${q}%`, `%${q}%`);
  }
  if (category) {
    filters.push("category = ?");
    parameters.push(category);
  }

  const where = filters.join(" AND ");
  const [[countRow]] = await pool.execute(
    `SELECT COUNT(*) AS total FROM partners WHERE ${where}`,
    parameters,
  );
  const [rows] = await pool.execute(
    `SELECT id, name, logo, category, description, website
     FROM partners WHERE ${where}
     ORDER BY name ASC LIMIT ? OFFSET ?`,
    [...parameters, limit, offset],
  );

  response.json({
    data: rows.map(normalizePartner),
    pagination: paginationResult(page, limit, countRow.total),
  });
});

export const getPartner = asyncHandler(async (request, response) => {
  const [rows] = await pool.execute(
    `SELECT id, name, logo, category, description, website
     FROM partners WHERE id = ? AND is_published = 1 LIMIT 1`,
    [request.params.id],
  );

  if (!rows[0]) {
    response.status(404).json({ message: "Mitra tidak ditemukan." });
    return;
  }

  response.json({ data: normalizePartner(rows[0]) });
});

export const verifyCertificate = asyncHandler(async (request, response) => {
  const certificateNumber = z.string().trim().min(1).max(100).parse(
    request.params.certificateNumber,
  );
  const [rows] = await pool.execute(
    `SELECT certificate_number, company_name, certification_type, status,
            issued_at, expired_at
     FROM certificates WHERE certificate_number = ? LIMIT 1`,
    [certificateNumber],
  );

  if (!rows[0]) {
    response.json({ status: "NOT_FOUND", certificate: null });
    return;
  }

  const row = rows[0];
  const expirationDate =
    row.expired_at instanceof Date
      ? row.expired_at.toISOString().slice(0, 10)
      : row.expired_at;
  const today = new Date().toISOString().slice(0, 10);
  const isExpired =
    row.status !== "revoked" &&
    expirationDate &&
    expirationDate < today;
  const status = row.status === "revoked" ? "REVOKED" : isExpired ? "EXPIRED" : "VALID";

  response.json({
    status,
    certificate: {
      certificateNumber: row.certificate_number,
      companyName: row.company_name,
      certificationType: row.certification_type,
      issuedAt: row.issued_at,
      expiredAt: row.expired_at,
    },
  });
});
