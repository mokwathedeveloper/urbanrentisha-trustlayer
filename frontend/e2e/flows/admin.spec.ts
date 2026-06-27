import { test, expect } from "@playwright/test";
import { ENV } from "../env";
import { waitForAppShell } from "../helpers";

test.use({ storageState: "e2e/.auth/admin.json" });

test.beforeEach(() => {
  test.skip(
    !ENV.admin.email || !ENV.admin.password,
    "TEST_ADMIN_EMAIL/TEST_ADMIN_PASSWORD not set",
  );
});

test.describe("admin flows", () => {
  test("dashboard loads after login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/dashboard/);
    await waitForAppShell(page);
  });

  test("can access the verification review queue", async ({ page }) => {
    await page.goto("/admin/verifications");
    await waitForAppShell(page);
    await expect(page.getByText(/access restricted/i)).not.toBeVisible();
  });

  test("can access audit logs", async ({ page }) => {
    await page.goto("/audit-logs");
    await waitForAppShell(page);
  });

  // Sidebar nav (and everything in it, including these links) is hidden
  // below the lg breakpoint with no mobile menu fallback - see helpers.ts.
  // This is a real product gap, not a reason to weaken the assertion, so
  // it's scoped to desktop rather than loosened to pass on mobile too.
  test("admin-specific nav items are present (desktop sidebar only)", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "Sidebar nav is hidden below the lg breakpoint - no mobile equivalent exists (see helpers.ts).",
    );
    await page.goto("/dashboard");
    await waitForAppShell(page);
    await expect(
      page.getByRole("link", { name: "Verification Review" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Audit Logs" })).toBeVisible();
  });
});
