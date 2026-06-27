import { expect, type Page } from "@playwright/test";

/**
 * The (app) layout shows a bare "Loading..." page while useAuth() resolves
 * - asserting page content immediately after goto() races that state and
 * is flaky. Waiting on the Topbar's notifications button (always rendered,
 * see components/app-shell/topbar.tsx) reliably waits out that loading
 * state regardless of viewport, since expect(...).toBeVisible() polls/
 * retries, unlike a one-shot .count().
 *
 * Deliberately NOT the sidebar's nav links: components/app-shell/
 * sidebar.tsx renders the whole sidebar (including "All Listings", every
 * other nav item) as `hidden ... lg:flex` - completely absent below the lg
 * breakpoint, with no hamburger/drawer fallback anywhere in the app shell.
 * Confirmed by actually running these tests on a mobile viewport, not
 * assumed from reading the className alone. This is a real product gap
 * (mobile users have no way to navigate between sections except the
 * notifications bell, profile, settings, and logout - see topbar.tsx's
 * dropdown), not a test bug - see the final report's "mobile findings"
 * section.
 */
export async function waitForAppShell(page: Page) {
  await expect(page.getByRole("button", { name: "Notifications" })).toBeVisible({
    timeout: 15_000,
  });
}

/**
 * waitForLoadState("networkidle") hangs in this app: the realtime
 * socket.io client (see lib/realtime or RealtimeGateway usage) keeps
 * reconnecting in the background, so the network is never truly idle.
 * Waiting for the app shell instead is the reliable equivalent of "the
 * authenticated page has finished its initial render."
 */
export async function gotoAndWaitForShell(page: Page, path: string) {
  await page.goto(path);
  await waitForAppShell(page);
}
