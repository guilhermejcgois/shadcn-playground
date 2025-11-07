import { test, expect } from "@playwright/test";
import fs from "node:fs";

const GOT_URL = process.env.GOT_URL || "http://localhost:3001";
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test("POST /api/print/c1 retorna um PDF válido", async ({ request }) => {
  // sanity: Gotenberg no ar
  const health = await request.get(GOT_URL + "/health");
  expect(health.ok()).toBeTruthy();

  const r = await request.post("/api/print/c1");
  expect(r.ok()).toBeTruthy();
  expect(r.headers()["content-type"]).toContain("application/pdf");
  const buf = Buffer.from(await r.body());
  expect(buf.byteLength).toBeGreaterThan(10_000); // tamanho mínimo
  fs.writeFileSync("tmp-relatorio-c1.pdf", buf);
});
