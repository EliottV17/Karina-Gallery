import { expect, test, type Page } from "@playwright/test";

async function expectResponsiveShell(page: Page) {
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(242, 236, 188)");
  // Evaluate still works with page JavaScript disabled: no app script is needed.
  const layout = await page.evaluate(async () => {
    await document.fonts.ready;
    return {
      overflowing: document.documentElement.scrollWidth > window.innerWidth,
      manropeLoaded: [...document.fonts].some((font) => font.family.replaceAll('"', "").toLowerCase() === "manrope" && font.status === "loaded")
        && getComputedStyle(document.body).fontFamily.toLowerCase().includes("manrope"),
    };
  });
  expect(layout).toEqual({ overflowing: false, manropeLoaded: true });
}

test("server-rendered routes expose the approved content and working navigation", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Karina Gallery");
  await expect(page.getByRole("heading", { level: 1, name: "Karina Gallery" })).toBeVisible();
  const navigation = page.getByRole("navigation", { name: "Navegación principal" });
  await expect(navigation.getByRole("link", { name: "Galería", exact: true })).toHaveAttribute("aria-current", "page");
  await navigation.getByRole("link", { name: "Info", exact: true }).click();
  await expect(page).toHaveURL("/info");
  await expect(page).toHaveTitle("Info | Karina Gallery");
  await expect(page.getByRole("heading", { level: 1, name: "Soy Karina Lauer." })).toBeVisible();
  await expect(page.getByText("Nací en Lima, Perú, y me gradué en Ciencias de la Comunicación. Actualmente vivo en Alemania y estoy felizmente casada.", { exact: true })).toBeVisible();
  await expect(page.getByText("Me dedico a la fotografía de forma independiente: documento viajes y creo contenido para redes sociales, principalmente Instagram.", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "https://www.instagram.com/karinalauer_/");
  await expect(page.locator("main img")).toHaveCount(0);
  await expect(navigation.getByRole("link", { name: "Info", exact: true })).toHaveAttribute("aria-current", "page");
  await page.getByRole("link", { name: "Volver a la galería" }).click();
  await expect(page).toHaveURL("/");
  expect(errors).toEqual([]);
});

test("both routes keep the Lotus shell and local Manrope without horizontal overflow", async ({ page }) => {
  for (const route of ["/", "/info"]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expectResponsiveShell(page);
  }
});
