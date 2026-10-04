import { ZodError } from "zod";

export function notFoundHandler(request, response) {
  response.status(404).json({ message: "Endpoint tidak ditemukan." });
}

export function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      message: "Data yang dikirim belum valid.",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  if (error.code === "ER_DUP_ENTRY") {
    response.status(409).json({
      message: "Data dengan nilai unik tersebut sudah tersedia.",
    });
    return;
  }

  const status = Number.isInteger(error.status) ? error.status : 500;
  if (status >= 500) {
    console.error("Unhandled API error.", error.name, error.code || "UNKNOWN");
  }

  response.status(status).json({
    message:
      status >= 500
        ? "Terjadi kesalahan pada server."
        : error.message,
  });
}
