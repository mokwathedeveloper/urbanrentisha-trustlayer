<div align="center">

<img src="logo.png" alt="UrbanRentisha TrustLayer" width="90" />

# 📋 Changelog

[![Commits](https://img.shields.io/badge/Commits-644-16A34A?style=for-the-badge)](https://github.com/mokwathedeveloper/urbanrentisha-trustlayer/commits/master)
[![Stellar Testnet](https://img.shields.io/badge/Network-Stellar_Testnet-08B5E5?style=for-the-badge)](https://stellar.org)

All notable changes to **UrbanRentisha TrustLayer** are documented here, grouped by day of work (June 19–26, 2026). Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/); entries are thematic summaries of the real commit history, not a 1:1 commit dump — see [the full commit log](https://github.com/mokwathedeveloper/urbanrentisha-trustlayer/commits/master) for that level of detail.

</div>

---

## 🗓️ 2026-06-26 — ZK Security Hardening, Auth Security, Performance, SEO

### 🔐 Security fixes
- Replaced a **non-binding** quadratic payment commitment (`secret² + nonce² == target`, solvable via modular square root without knowing the real secret) with `MiMCPermutation`, a real one-way permutation.
- Found and fixed an **under-rounded** MiMC permutation: 12 rounds gave an algebraic degree of `5^12 ≈ 2^28`, ~18× short of the `~2^255` needed for this field. Corrected to 220 rounds, matching circomlib's own documented security margin.
- Added rate limiting (`@nestjs/throttler`) — 5 req/min on `/auth/login` and `/auth/register`, 60 req/min global default. Previously unlimited.
- Added audit logging on every login/register attempt (success, wrong password, unknown email, suspended account) — previously zero coverage on the most security-critical endpoint.
- Added 25 missing database indexes across all foreign-key relations, plus converted unconstrained `String` status columns (`AgentProfile.verificationStatus`, `Report.severity`) to real enums — migrated live data without loss (verified row counts identical before/after).

### ⚡ Performance
- Self-hosted and subsetted the icon font: 475KB Google Fonts request → 380KB self-hosted, only the 75 glyphs actually used.
- Fixed the header logo requesting a 3840px-wide image variant for a logo that never renders wider than ~240px.
- Lighthouse performance score: 62 → ~74–76 (measured directly, multiple runs, real production build).

### 🏗️ Refactoring
- Split an 805-line `AdminService` god-class into five focused services (dashboard, verification, user, landlord, payment-ops).
- Added proper error handling around Stellar/Soroban calls that previously surfaced as opaque 500s on failure.

### 🌐 SEO / PWA
- Added OpenGraph/Twitter card metadata, `sitemap.xml`, `robots.txt`, JSON-LD structured data, and a PWA manifest with installable icons — none of this existed before.

### 🧪 Tests
- Added full test coverage (100% line/branch) for `AuthService` and the new MiMC commitment logic — previously zero automated tests existed in the backend.

---

## 🗓️ 2026-06-24 — 2026-06-25 — Accessibility & CI

- Added a GitHub Actions workflow for lint, typecheck, test, and build on every push.
- Fixed accessibility issues: `dt`/`dd` order in hero stats, overlay contrast, primary button color contrast against the brand accent shade.
- Let Next.js optimize the hero illustration instead of serving it raw/unoptimized.

---

## 🗓️ 2026-06-23 — Reviews, Threads, Real ZK Begins

- Added `Review` and `ListingThread` models, `User.lastActiveAt` presence tracking.
- **Replaced the mock ZK proof and Soroban verification with a real implementation** — the start of the genuine Circom/Groth16 pipeline.
- Added the Soroban trust-verifier client and field-mapping utilities.
- Deployed and verified the real Circom/Groth16 proof against a live Soroban contract on Stellar testnet.

---

## 🗓️ 2026-06-22 — Notifications, Sessions

- Wired notifications end-to-end: emitted on payment confirmation, proof verification outcome, viewing code generation, and report submission.
- Added the Notifications screen with filters and a detail panel.
- Included `avatarUrl` in auth session responses.

---

## 🗓️ 2026-06-21 — Agents, Dashboards, Audit Trail

- Added `AgentsService` with real verification stats, and the Agent Verification Profile screen.
- Built role-specific dashboards: Tenant, Property Manager, Admin — each wired to real backend metrics, not placeholder data.
- Added the Audit Log screen wired to real `/audit-logs` and `/audit-logs/stats` endpoints.

---

## 🗓️ 2026-06-20 — Screens Build-Out

- Consolidated documentation under `docs/`, added QA testing rules.
- Built the Landing Page, Login/Signup, Property Listing, Search & Filter, Property Detail, Request Viewing, Stellar Payment, ZK Proof Generation, Proof Verification, Escrow/Payment-Hold Status, and Viewing Code Success screens — each matched against its design mockup and verified against real backend data (not static/mock fixtures).

---

## 🗓️ 2026-06-19 — Initial Commit

- Project scaffolded for the Stellar Hacks: Real-World ZK hackathon.
