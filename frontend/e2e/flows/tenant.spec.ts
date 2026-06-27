import { test, expect } from "@playwright/test";
import { ENV } from "../env";
import { waitForAppShell } from "../helpers";

test.use({ storageState: "e2e/.auth/tenant.json" });

test.beforeEach(() => {
  test.skip(
    !ENV.tenant.email || !ENV.tenant.password,
    "TEST_TENANT_EMAIL/TEST_TENANT_PASSWORD not set",
  );
});

test.describe("tenant flows", () => {
  test("dashboard loads after login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/dashboard/);
    await waitForAppShell(page);
  });

  test("can browse listings and open a listing's details", async ({ page }) => {
    await page.goto("/listings");
    await waitForAppShell(page);

    // Scoped to <main>: a[href^="/listings/"] also matches the sidebar's
    // own "My Properties"/"My Bookings" etc. nav links (hidden on mobile,
    // but still in the DOM) - see helpers.ts's note on the sidebar gap.
    const firstCardLink = page.locator('main a[href^="/listings/"]').first();
    const count = await firstCardLink.count();
    test.skip(count === 0, "No listings available to open.");

    await firstCardLink.click();
    await expect(page).toHaveURL(/\/listings\/[^/]+$/);
  });

  test("can open My Bookings (viewing requests)", async ({ page }) => {
    await page.goto("/bookings");
    await waitForAppShell(page);
    // Either real bookings render, or a readable empty state - never blank.
    // Scoped to <main> - the sidebar's own "My Bookings" label otherwise
    // matches this regex too (and is hidden on mobile, see helpers.ts).
    await expect(
      page.locator("main").getByText(/booking|viewing request|no.*booking|nothing/i).first(),
    ).toBeVisible();
  });

  test("can open the payments page", async ({ page }) => {
    await page.goto("/payments");
    await waitForAppShell(page);
  });

  test("can open the escrow / holds page", async ({ page }) => {
    await page.goto("/escrow");
    await waitForAppShell(page);
  });

  test("can open the verifications (proof status) page", async ({ page }) => {
    await page.goto("/verifications");
    await waitForAppShell(page);
  });

  test("can open notifications", async ({ page }) => {
    await page.goto("/notifications");
    await waitForAppShell(page);
  });

  test("can open messages", async ({ page }) => {
    await page.goto("/messages");
    await waitForAppShell(page);
  });

  test("saved properties page renders an empty state or saved items", async ({
    page,
  }) => {
    await page.goto("/saved");
    await waitForAppShell(page);
    // Scoped to <main> - the sidebar's own "Saved Properties" label
    // otherwise matches this regex too (hidden on mobile, see helpers.ts).
    await expect(
      page.locator("main").getByText(/saved|no.*saved|nothing/i).first(),
    ).toBeVisible();
  });

  // Gated behind an explicit opt-in: this local backend's DATABASE_URL was
  // found to point at the same shared Supabase instance as production
  // (confirmed in .env, not assumed) - there is no isolated local/staging
  // database in this project today. A real ViewingRequest is mutating,
  // visible data, so it must not run by default even in "local" mode. Set
  // E2E_ALLOW_MUTATIONS=true only once you've confirmed which database
  // APP_BASE_URL/API_BASE_URL are actually pointed at.
  test("can submit a viewing request for an open listing", async ({ page }) => {
    test.skip(
      process.env.E2E_ALLOW_MUTATIONS !== "true",
      "Set E2E_ALLOW_MUTATIONS=true to run this mutating test - see README.",
    );
    await page.goto("/listings");
    await waitForAppShell(page);
    const firstCardLink = page.locator('main a[href^="/listings/"]').first();
    test.skip((await firstCardLink.count()) === 0, "No listings available.");
    await firstCardLink.click();

    const requestButton = page.getByRole("link", { name: /request (a )?viewing/i });
    test.skip(
      (await requestButton.count()) === 0,
      "No 'Request Viewing' action available on this listing (may already be reserved/rented, or this account has a pending request).",
    );
    await requestButton.click();
    await expect(page).toHaveURL(/\/listings\/[^/]+\/request/);
  });
});
