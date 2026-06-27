import { test as setup, expect } from "@playwright/test";
import { ENV } from "./env";

/**
 * Real UI login (not an API shortcut) for each role that has credentials
 * configured, saving the resulting browser storage state so the actual
 * flow specs can start already authenticated instead of re-running the
 * login form in every test. Skips (not fails) a role whose env vars are
 * unset, since not every role has confirmed-working demo credentials in
 * every environment - see README for which roles currently do.
 */
async function loginAndSave(
  page: import("@playwright/test").Page,
  email: string,
  password: string,
  storageStatePath: string,
) {
  await page.goto("/login");
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.locator('form button[type="submit"]').click();
  await expect(page).toHaveURL(/\/dashboard|\/onboarding|\/change-password/, {
    timeout: 15_000,
  });
  await page.context().storageState({ path: storageStatePath });
}

setup("authenticate as tenant", async ({ page }) => {
  if (!ENV.tenant.email || !ENV.tenant.password) {
    setup.skip(true, "TEST_TENANT_EMAIL/TEST_TENANT_PASSWORD not set");
    return;
  }
  await loginAndSave(
    page,
    ENV.tenant.email,
    ENV.tenant.password,
    "e2e/.auth/tenant.json",
  );
});

setup("authenticate as landlord/agent", async ({ page }) => {
  if (!ENV.landlord.email || !ENV.landlord.password) {
    setup.skip(true, "TEST_LANDLORD_EMAIL/TEST_LANDLORD_PASSWORD not set");
    return;
  }
  await loginAndSave(
    page,
    ENV.landlord.email,
    ENV.landlord.password,
    "e2e/.auth/landlord.json",
  );
});

setup("authenticate as admin", async ({ page }) => {
  if (!ENV.admin.email || !ENV.admin.password) {
    setup.skip(true, "TEST_ADMIN_EMAIL/TEST_ADMIN_PASSWORD not set");
    return;
  }
  await loginAndSave(
    page,
    ENV.admin.email,
    ENV.admin.password,
    "e2e/.auth/admin.json",
  );
});
