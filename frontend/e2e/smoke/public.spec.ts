import { test, expect } from "@playwright/test";

/**
 * Public, unauthenticated flows - safe to run against any environment
 * including production, since nothing here logs in or mutates data.
 *
 * Real finding from running these against a live app (not assumed from
 * reading code): /listings has no public variant - it lives under the
 * authenticated (app) route group (app/(app)/listings/page.tsx) and its
 * layout redirects any unauthenticated visit straight to /login (see
 * components/app-shell - actually app/(app)/layout.tsx's useEffect). So
 * "browse listings without logging in" and "open a listing's details
 * without logging in" are not real flows in this app today; the tests
 * below assert the actual redirect behavior instead of a feature that
 * doesn't exist, and the authenticated versions of these flows are
 * covered in flows/tenant.spec.ts and flows/landlord.spec.ts.
 */

function collectConsoleErrors(page: import("@playwright/test").Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    // "Failed to load resource: ... 401/403/..." is Chrome's own
    // network-status log for any non-2xx fetch, including ones the app
    // handles perfectly gracefully (e.g. an intentionally invalid login).
    // Only treat it as a real problem alongside an actual uncaught
    // exception or a genuine console.error() call from app code.
    if (msg.type() === "error" && !/^Failed to load resource:/.test(msg.text())) {
      errors.push(msg.text());
    }
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

test.describe("public flows", () => {
  test("home page loads with no console errors", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("body")).not.toBeEmpty();
    expect(errors, `console errors on home page: ${errors.join("; ")}`).toEqual([]);
  });

  test("visiting /listings while logged out redirects to login (no public listings browsing exists)", async ({
    page,
  }) => {
    await page.goto("/listings");
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('form button[type="submit"]')).toBeVisible();
  });

  test("login page renders the sign-in form", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto("/login");
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
    await expect(page.locator('form button[type="submit"]')).toBeVisible();
    expect(errors, `console errors on login page: ${errors.join("; ")}`).toEqual([]);
  });

  test("register tab renders the sign-up form", async ({ page }) => {
    await page.goto("/login");
    // Two elements match /create account/i case-insensitively: the
    // "Create Account" tab button and the inline "Create account" link
    // inside the sign-in form - exact-match the tab specifically.
    await page.getByRole("button", { name: "Create Account", exact: true }).click();
    await expect(page.getByLabel(/full name/i)).toBeVisible();
    await expect(page.getByLabel(/confirm password/i)).toBeVisible();
  });

  test("invalid login shows a clean error, not a crash", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto("/login");
    await page.getByLabel(/email/i).fill("not-a-real-user@urbanrentisha.local");
    await page.getByLabel("Password", { exact: true }).fill("DefinitelyWrongPass123!");
    await page.locator('form button[type="submit"]').click();

    await expect(page.getByText(/sign in failed|invalid|incorrect|unauthorized/i)).toBeVisible({
      timeout: 10_000,
    });
    // The error must render in-page, not navigate away or blank the screen.
    await expect(page).toHaveURL(/\/login/);
    expect(errors, `console errors after invalid login: ${errors.join("; ")}`).toEqual([]);
  });
});
