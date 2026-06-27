import { test, expect } from "@playwright/test";
import { ENV } from "../env";

/**
 * Strictly read-only checks safe to run against real production. No login,
 * no mutation, no payment/escrow/proof submission. This file is the ONLY
 * one wired into the "production-smoke" Playwright project (see
 * playwright.config.ts) - everything else requires APP_BASE_URL to be a
 * local/staging environment to run at all.
 */

test.describe("production read-only smoke", () => {
  test("home page responds and renders", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("body")).not.toBeEmpty();
  });

  test("visiting /listings while logged out redirects to login (no public listings browsing exists)", async ({
    page,
  }) => {
    // /listings lives under the authenticated (app) route group and
    // redirects logged-out visitors to /login client-side - confirmed by
    // actually running this against a live app, not assumed from reading
    // code. The initial server response is still 200 (Next.js serves the
    // shell before the client-side redirect fires).
    const response = await page.goto("/listings");
    expect(response?.ok()).toBeTruthy();
    await expect(page).toHaveURL(/\/login/);
  });

  test("login page renders the sign-in form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.locator('form button[type="submit"]')).toBeVisible();
  });

  test("GET /health/live returns ok", async ({ request }) => {
    const res = await request.get(`${ENV.apiBaseUrl}/health/live`);
    expect(res.ok()).toBeTruthy();
  });

  test("GET /health/ready returns 200 or a clear 503, never a raw 500", async ({
    request,
  }) => {
    const res = await request.get(`${ENV.apiBaseUrl}/health/ready`, {
      failOnStatusCode: false,
    });
    expect([200, 503]).toContain(res.status());
  });

  test("GET /listings returns a paginated shape", async ({ request }) => {
    const res = await request.get(`${ENV.apiBaseUrl}/listings`);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    // Real shape per PaginatedResult<T> (src/common/utils/pagination.util.ts):
    // { items, page, limit, total, hasNextPage }.
    expect(Array.isArray(body.items)).toBe(true);
    expect(body).toHaveProperty("page");
    expect(body).toHaveProperty("total");
  });

  test("a protected endpoint rejects an unauthenticated request", async ({
    request,
  }) => {
    const res = await request.get(`${ENV.apiBaseUrl}/notifications`, {
      failOnStatusCode: false,
    });
    expect(res.status()).toBe(401);
  });

  test("an invalid login is rejected cleanly, not with a 500", async ({
    request,
  }) => {
    const res = await request.post(`${ENV.apiBaseUrl}/auth/login`, {
      data: {
        email: "not-a-real-user@urbanrentisha.local",
        password: "DefinitelyWrongPass123!",
      },
      failOnStatusCode: false,
    });
    expect([400, 401]).toContain(res.status());
  });

  test("backend responses carry an x-request-id header", async ({ request }) => {
    const res = await request.get(`${ENV.apiBaseUrl}/health/live`);
    expect(res.headers()["x-request-id"]).toBeTruthy();
  });
});
