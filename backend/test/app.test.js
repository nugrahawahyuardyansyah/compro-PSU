import assert from "node:assert/strict";
import { after, before, test } from "node:test";

process.env.JWT_ACCESS_SECRET ??= "test-access-secret-at-least-thirty-two-characters";
process.env.JWT_REFRESH_SECRET ??= "test-refresh-secret-at-least-thirty-two-characters";

const { default: app } = await import("../src/app.js");
let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
});

test("health endpoint responds without a database query", async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("unknown endpoints return a structured 404", async () => {
  const response = await fetch(`${baseUrl}/api/missing`);
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { message: "Endpoint tidak ditemukan." });
});

test("admin article endpoints reject requests without an access token", async () => {
  const response = await fetch(`${baseUrl}/api/admin/articles`);
  assert.equal(response.status, 401);
  assert.equal((await response.json()).message, "Autentikasi admin diperlukan.");
});

test("service requests validate input before touching the database", async () => {
  const response = await fetch(`${baseUrl}/api/service-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "x" }),
  });
  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.message, "Data yang dikirim belum valid.");
  assert.ok(body.errors.some((issue) => issue.field === "email"));
});

test("contact submissions validate input before touching the database", async () => {
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "x", email: "not-an-email" }),
  });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).message, "Data yang dikirim belum valid.");
});

test("CORS only returns the configured frontend origin", async () => {
  const allowed = await fetch(`${baseUrl}/api/health`, {
    headers: { Origin: "http://localhost:5173" },
  });
  assert.equal(allowed.headers.get("access-control-allow-origin"), "http://localhost:5173");

  const rejected = await fetch(`${baseUrl}/api/health`, {
    headers: { Origin: "http://untrusted.example" },
  });
  assert.equal(rejected.headers.get("access-control-allow-origin"), null);
});
