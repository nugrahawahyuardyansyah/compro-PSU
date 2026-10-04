import assert from "node:assert/strict";
import test from "node:test";
import { paginationResult, parsePagination } from "../src/utils/pagination.js";

test("pagination applies safe defaults", () => {
  assert.deepEqual(parsePagination({}), { page: 1, limit: 12 });
});

test("pagination accepts numeric query strings within limits", () => {
  assert.deepEqual(parsePagination({ page: "3", limit: "20" }), {
    page: 3,
    limit: 20,
  });
});

test("pagination rejects limits above the maximum", () => {
  assert.throws(() => parsePagination({ limit: "51" }));
});

test("pagination metadata reports a zero-page empty result", () => {
  assert.deepEqual(paginationResult(1, 12, 0), {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });
});
