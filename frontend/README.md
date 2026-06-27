# UrbanRentisha TrustLayer — Frontend

Next.js 16 (App Router) + React 19 frontend for UrbanRentisha TrustLayer. See the [repo root README](../README.md) for the full project (ZK proof system, smart contracts, hackathon context) — this file covers the frontend specifically.

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Runs on `http://localhost:3000` (falls back to the next free port if 3000 is taken). Requires the backend running separately — see [`backend/UrbanRentisha_Backend_Starter_Code/README.md`](../backend/UrbanRentisha_Backend_Starter_Code/README.md).

## Environment Variables

```bash
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000/api/v1"
NEXT_PUBLIC_SITE_URL="https://urbanrentisha.app"
```

`NEXT_PUBLIC_SITE_URL` is used for SEO metadata (OpenGraph, sitemap, canonical URLs) — see `lib/site.ts`.

## Scripts

```bash
npm run dev         # Turbopack dev server
npm run build       # production build
npm run start       # serve a production build
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
```

## Project Layout

```text
app/                    Next.js App Router
  (app)/                 Authenticated app shell - dashboard, listings, payments, ZK proof flow, admin
  login/                 Public login/signup/demo-login page
  activate/               Agent/manager activation-code flow
  api-docs/               Live, interactive API reference (verified to match the real backend routes)
  layout.tsx              Root layout - fonts, SEO metadata, JSON-LD, analytics
  manifest.ts, robots.ts, sitemap.ts   PWA manifest, robots.txt, sitemap.xml (Next.js native generation)
components/              Shared UI - landing page sections, dashboards, ui primitives
lib/                     API client, auth context, utilities
scripts/subset-icon-font.cjs   Regenerates the self-hosted, subsetted icon font (re-run if a new icon is added to components/ui/icon.tsx)
public/fonts/            Self-hosted subsetted Material Symbols font (475KB Google Fonts CDN request -> 380KB self-hosted)
public/images/           Brand assets - logo.png is the real, current logo used throughout the app
```

## Notable Engineering Decisions

- **Self-hosted, subsetted icon font** instead of loading the full Material Symbols set from Google Fonts — only the ~75 glyphs actually used in `components/ui/icon.tsx`, removing a third-party DNS/TLS round-trip entirely. Regenerate via `node scripts/subset-icon-font.cjs` if a new icon is added.
- **No client-side rendering for SEO surfaces** — `manifest.ts`, `robots.ts`, and `sitemap.ts` use Next.js's native file-convention generation rather than client-rendered equivalents, so crawlers and social-share previews see real metadata.
- **Vercel Analytics + Speed Insights** wired in (`@vercel/analytics`, `@vercel/speed-insights`) since the project is already Vercel-linked.

## Testing / Quality Gates

```bash
npx tsc --noEmit
npx eslint . --ext .ts,.tsx
npm run build
```

All three are required to pass before any commit — see the root [`CLAUDE.md`](../CLAUDE.md) for the full project's quality rules.

## End-to-End Tests (Playwright)

Real browser tests (Chromium desktop + Pixel 7 mobile viewport) covering public flows, tenant/landlord/admin authenticated flows, the review system, and backend API smoke checks. No mocks — these drive an actual browser against a running app.

### One-time setup

```bash
npx playwright install chromium   # downloads the browser binary (~150MB)
cp .env.e2e.example .env.e2e      # fill in real values, never commit this file
```

`.env.e2e` (and `.env.e2e.staging` / `.env.e2e.production`, same shape) hold:

| Var | Purpose |
|---|---|
| `APP_BASE_URL` / `API_BASE_URL` | Where the frontend/backend are running |
| `TEST_TENANT_EMAIL` / `_PASSWORD` | Demo tenant — see [DEMO_GUIDE.md](../DEMO_GUIDE.md) |
| `TEST_LANDLORD_EMAIL` / `_PASSWORD` | Demo property-management account. **This app has no confirmed-working LANDLORD demo account** — point this at the AGENT demo account (`agent@urbanrentisha.local`) unless you have a real landlord account; the nav/permissions tested are AGENT's |
| `TEST_ADMIN_EMAIL` / `_PASSWORD` | Demo admin — see DEMO_GUIDE.md |
| `E2E_ALLOW_MUTATIONS` | `false` by default. Set to `true` only to run the two tests that create real data (a viewing request, a review) — see Safety below |

### Running

```bash
npm run e2e:local              # full suite against http://localhost:3000 + :4000 (start both dev servers first)
npm run e2e:staging            # same suite against .env.e2e.staging's URLs
npm run e2e:production-smoke   # read-only checks only, against .env.e2e.production's URLs
npm run e2e:report             # open the last HTML report
npx playwright test --ui       # interactive mode - watch the browser run, time-travel through steps
```

Screenshots, traces, and video are captured **only on failure** (see `playwright.config.ts`) — open them with `npx playwright show-trace test-results/.../trace.zip` or `npm run e2e:report`.

### Safety rules (read before running against anything but your own machine)

- **`e2e:production-smoke` only runs `e2e/smoke/production.spec.ts`** — strictly read-only (no login, no mutation, no payment/escrow/proof submission). It's wired into its own Playwright project with no dependency on the authenticated `setup` project, so it cannot accidentally pick up a login flow.
- **There is currently no isolated local/staging database in this project** — this repo's local `.env` `DATABASE_URL` was found to point at the same shared Supabase instance used by production. "Local" does not mean "safe to mutate" here. The two tests that create real data (a `ViewingRequest`, a `Review`) are gated behind `E2E_ALLOW_MUTATIONS=true` and skipped by default for exactly this reason — don't set it to `true` against an environment whose database you haven't confirmed.
- Mutating tests use clearly-marked, timestamped data (e.g. `E2E test review ${Date.now()} - safe to delete`) but do **not** auto-clean-up after themselves today (the reviews API has no delete endpoint; viewing requests aren't meant to be cancelled by the requester). Clean up manually if you run them.

### Structure

```text
e2e/
  env.ts              Typed env var access + missing-credential skip messages
  helpers.ts          waitForAppShell - the loading-state-aware "page is ready" wait
  auth.setup.ts       Real UI login per role, saves storageState to e2e/.auth/*.json (gitignored)
  smoke/public.spec.ts        Unauthenticated flows - safe anywhere
  smoke/production.spec.ts    The ONLY file the production-smoke project runs
  smoke/api.spec.ts           Backend smoke incl. the 429 rate-limit burst test (local/staging only)
  flows/tenant.spec.ts        Tenant dashboard, listings, bookings, payments, escrow, etc.
  flows/landlord.spec.ts      Landlord/agent flows + role-restriction checks
  flows/admin.spec.ts         Admin flows + role-restriction checks
  flows/review.spec.ts        Review submission flow + validation
```

### Known gaps (see the project's E2E hardening task report for full detail)

- No confirmed `LANDLORD` (vs. `AGENT`) demo account, and no `MANAGER`/`PLATFORM` demo accounts at all — those roles aren't covered.
- The sidebar (all nav: Listings, Bookings, Payments, Escrow, Messages, etc.) is `hidden ... lg:flex` with **no mobile menu fallback** — confirmed by actually running these tests on a mobile viewport. Below the `lg` breakpoint, authenticated users can only reach Notifications (bell icon), Profile, and Settings without typing a URL directly.
- `/listings` has no public/unauthenticated variant — it lives under the authenticated route group and redirects to `/login`. "Browse listings without an account" is not a real flow in this app today.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [DEMO_GUIDE.md](../DEMO_GUIDE.md) — live demo credentials and a walkthrough of the real user flow this frontend implements
