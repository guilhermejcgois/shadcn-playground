import { test, expect } from "@playwright/test";

test("GET /api/clients sem filtro", async ({ request }) => {
  const r = await request.get("/api/clients");
  expect(r.ok()).toBeTruthy();
  const data = await r.json();
  expect(Array.isArray(data)).toBeTruthy();
  expect(data.length).toBeGreaterThan(0);
});

test("GET /api/reports/c1/summary", async ({ request }) => {
  const r = await request.get("/api/reports/c1/summary");
  expect(r.ok()).toBeTruthy();
  const json = await r.json();
  expect(json).toHaveProperty("plBruto");
  expect(json).toHaveProperty("mes");
});
