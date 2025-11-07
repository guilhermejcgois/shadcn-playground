import { test, expect } from "@playwright/test";

test("root abre e permite abrir cliente c1 (overview cover)", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByText("Relatórios")).toBeVisible();

  // Abrir Spotlight (Ctrl+K / Cmd+K) e buscar cliente
  await page.keyboard.press(
    process.platform === "darwin" ? "Meta+K" : "Control+K"
  );
  const input = page.getByPlaceholder("Buscar por nome, documento ou ID…");
  await expect(input).toBeVisible();
  await input.fill("c1");
  await page.getByRole("option").first().click(); // CommandItem

  await expect(page).toHaveURL(/\/c1\/overview.*page=cover/);
  await expect(
    page.getByRole("heading", { name: "Visão Geral" })
  ).toBeVisible();
});
