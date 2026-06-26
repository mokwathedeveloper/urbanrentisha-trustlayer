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

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [DEMO_GUIDE.md](../DEMO_GUIDE.md) — live demo credentials and a walkthrough of the real user flow this frontend implements
