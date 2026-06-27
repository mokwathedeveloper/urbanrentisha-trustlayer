import { defineConfig, devices } from "@playwright/test";

/**
 * APP_BASE_URL/API_BASE_URL default to local dev servers - run `npm run dev`
 * (frontend) and the backend's `npm run start:dev` before `npm run e2e:local`.
 * For e2e:production-smoke, these are overridden to the deployed URLs and
 * only the read-only e2e/smoke/production.spec.ts file runs (see
 * package.json) - it deliberately has no dependency on the authenticated
 * "setup" project, since production tests must never need (or risk) a
 * mutating login flow against real data.
 */
const APP_BASE_URL = process.env.APP_BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: APP_BASE_URL,
    // Only on failure, per the task's safety/cost requirement - not "always".
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
      testIgnore: /smoke\/production\.spec\.ts/,
    },
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup"],
      testIgnore: /smoke\/production\.spec\.ts/,
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
      dependencies: ["setup"],
      testIgnore: /smoke\/production\.spec\.ts/,
    },
    {
      name: "production-smoke",
      use: { ...devices["Desktop Chrome"], baseURL: APP_BASE_URL },
      testMatch: /smoke\/production\.spec\.ts/,
    },
  ],
});
