import { test, expect, type Page } from "@playwright/test";
import { ENV } from "../env";
import { waitForAppShell } from "../helpers";

/**
 * Review flow lives on an agent/landlord/manager's profile page
 * (/agents/[id]), not on the listing itself - see
 * src/reviews/reviews.service.ts and components/.../agents/[id]/page.tsx.
 *
 * Backend behavior actually verified by reading reviews.service.ts (not
 * assumed):
 *  - Only TENANT-role accounts may submit a review (role check, not a
 *    "completed booking" check - there is NO eligibility gate tied to a
 *    finished viewing/payment/proof flow).
 *  - The target must be an agent, landlord, or manager profile.
 *  - A second review from the same reviewer for the same target is an
 *    UPSERT (overwrites the prior rating/comment), not a rejected
 *    duplicate - the backend does not enforce "one review per pair, no
 *    edits". A "duplicate review blocked" test would assert behavior this
 *    app does not implement, so it is intentionally not included here.
 *  - rating must be an integer 1-5 (class-validator @IsInt @Min(1) @Max(5)).
 */
test.use({ storageState: "e2e/.auth/tenant.json" });

test.beforeEach(() => {
  test.skip(
    !ENV.tenant.email || !ENV.tenant.password,
    "TEST_TENANT_EMAIL/TEST_TENANT_PASSWORD not set",
  );
});

async function findAnAgentProfileId(page: Page): Promise<string | null> {
  // Reachable from a listing's detail page, which links to its agent's
  // profile - there's no public agent directory to browse directly.
  await page.goto("/listings");
  await waitForAppShell(page);
  const firstCardLink = page.locator('main a[href^="/listings/"]').first();
  if ((await firstCardLink.count()) === 0) return null;
  await firstCardLink.click();
  await page.waitForLoadState("load");

  const agentLink = page.locator('a[href^="/agents/"]').first();
  if ((await agentLink.count()) === 0) return null;
  const href = await agentLink.getAttribute("href");
  return href ?? null;
}

test.describe("review flow", () => {
  test("review form is reachable from a listing's agent profile", async ({
    page,
  }) => {
    const agentHref = await findAnAgentProfileId(page);
    test.skip(
      !agentHref,
      "No listing with a linked agent profile available to test the review flow against.",
    );
    await page.goto(agentHref!);
    await expect(page.getByText(/leave a review/i)).toBeVisible();
  });

  test("rating validation: submit stays disabled until a star is chosen (empty/0-star review blocked)", async ({
    page,
  }) => {
    const agentHref = await findAnAgentProfileId(page);
    test.skip(!agentHref, "No agent profile available.");
    await page.goto(agentHref!);

    // Confirmed in agents/[id]/page.tsx: Button disabled={... || myRating === 0}.
    const submitButton = page.getByRole("button", { name: /submit review/i });
    await expect(submitButton).toBeDisabled();

    await page.getByRole("button", { name: "Rate 3 stars" }).click();
    await expect(submitButton).toBeEnabled();
  });

  // Gated behind explicit opt-in for the same reason as the tenant viewing-
  // request mutation test: this environment's database is shared with
  // production (confirmed via .env's DATABASE_URL), so submitting a review
  // here is real, visible, mutating data, not isolated test data.
  test("can submit a valid review and see it appear", async ({ page }) => {
    test.skip(
      process.env.E2E_ALLOW_MUTATIONS !== "true",
      "Set E2E_ALLOW_MUTATIONS=true to run this mutating test - see README.",
    );
    const agentHref = await findAnAgentProfileId(page);
    test.skip(!agentHref, "No agent profile available.");
    await page.goto(agentHref!);

    const comment = `E2E test review ${Date.now()} - safe to delete`;
    await page.getByRole("button", { name: "Rate 4 stars" }).click();
    await page.getByPlaceholder(/share your experience/i).fill(comment);
    await page.getByRole("button", { name: /submit review/i }).click();

    await expect(page.getByText(comment)).toBeVisible({ timeout: 10_000 });
  });
});
