import { defineConfig, devices } from "@playwright/test";

const port = 3100;
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 2,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    launchOptions: { ...(executablePath ? { executablePath } : {}), chromiumSandbox: true },
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "tablet", use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 } } },
    { name: "mobile", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" } },
    { name: "server-html", use: { ...devices["Desktop Chrome"], javaScriptEnabled: false } },
  ],
  webServer: {
    command: process.env.TEST_SERVER_MODE === "dev"
      ? `bun run dev --hostname 127.0.0.1 --port ${port}`
      : `bun run start --hostname 127.0.0.1 --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
