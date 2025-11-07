import { test, expect } from "@playwright/test";

test("rota /print/c1 renderiza sem erro", async ({ page }) => {
  const res = await page.goto("/print/c1", { waitUntil: "networkidle" });
  expect(res?.ok()).toBeTruthy();
  const count = await page.locator("h1, h2").count();
  expect(count).toBeGreaterThan(0);
});
