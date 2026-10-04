import { z } from "zod";
import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { paginationResult, parsePagination } from "../utils/pagination.js";

const articleSchema = z.object({
  title: z.string().trim().min(3).max(220),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(220)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  thumbnail: z.string().trim().max(1000).nullable().optional(),
  excerpt: z.string().trim().max(500).nullable().optional(),
  content: z.string().trim().min(1).max(100000),
  author: z.string().trim().min(2).max(150),
  category: z.string().trim().min(2).max(80),
  status: z.enum(["draft", "published"]),
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

export const listAdminArticles = asyncHandler(async (request, response) => {
  const { page, limit } = parsePagination(request.query);
  const q = z.string().trim().max(120).default("").parse(request.query.q);
  const status = z.enum(["draft", "published"]).optional().parse(request.query.status);
  const filters = [];
  const parameters = [];
  if (q) {
    filters.push("(title LIKE ? OR excerpt LIKE ?)");
    parameters.push(`%${q}%`, `%${q}%`);
  }
  if (status) {
    filters.push("status = ?");
    parameters.push(status);
  }
  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  const offset = (page - 1) * limit;
  const [[countRow]] = await pool.execute(
    `SELECT COUNT(*) AS total FROM articles ${where}`,
    parameters,
  );
  const [rows] = await pool.execute(
    `SELECT id, title, slug, thumbnail, excerpt, content, author, category,
            status, published_at, created_at, updated_at
     FROM articles ${where}
     ORDER BY updated_at DESC, id DESC LIMIT ? OFFSET ?`,
    [...parameters, limit, offset],
  );
  response.json({
    data: rows.map(normalizeArticle),
    pagination: paginationResult(page, limit, countRow.total),
  });
});

export const createAdminArticle = asyncHandler(async (request, response) => {
  const article = articleSchema.parse(request.body);
  const [result] = await pool.execute(
    `INSERT INTO articles
     (title, slug, thumbnail, excerpt, content, author, category, status, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, IF(? = 'published', UTC_TIMESTAMP(), NULL))`,
    [
      article.title,
      article.slug,
      article.thumbnail || null,
      article.excerpt || null,
      article.content,
      article.author,
      article.category,
      article.status,
      article.status,
    ],
  );
  response.status(201).json({ data: { id: result.insertId, ...article } });
});

export const updateAdminArticle = asyncHandler(async (request, response) => {
  const id = z.coerce.number().int().positive().parse(request.params.id);
  const article = articleSchema.parse(request.body);
  const [result] = await pool.execute(
    `UPDATE articles SET title = ?, slug = ?, thumbnail = ?, excerpt = ?,
       content = ?, author = ?, category = ?, status = ?,
       published_at = CASE
         WHEN ? = 'published' THEN COALESCE(published_at, UTC_TIMESTAMP())
         ELSE NULL
       END
     WHERE id = ?`,
    [
      article.title,
      article.slug,
      article.thumbnail || null,
      article.excerpt || null,
      article.content,
      article.author,
      article.category,
      article.status,
      article.status,
      id,
    ],
  );
  if (result.affectedRows === 0) {
    response.status(404).json({ message: "Artikel tidak ditemukan." });
    return;
  }
  response.json({ data: { id, ...article } });
});

export const deleteAdminArticle = asyncHandler(async (request, response) => {
  const id = z.coerce.number().int().positive().parse(request.params.id);
  const [result] = await pool.execute("DELETE FROM articles WHERE id = ?", [id]);
  if (result.affectedRows === 0) {
    response.status(404).json({ message: "Artikel tidak ditemukan." });
    return;
  }
  response.status(204).end();
});
