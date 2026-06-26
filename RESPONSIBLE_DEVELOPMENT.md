<div align="center">

<img src="logo.png" alt="UrbanRentisha TrustLayer" width="90" />

# 🌱 Responsible Software Development

### UrbanRentisha TrustLayer — Our Commitment Beyond Shipping Features

[![Security](https://img.shields.io/badge/Security-Policy-F59E0B?style=for-the-badge)](SECURITY.md)
[![Privacy by Design](https://img.shields.io/badge/Privacy-Zero--Knowledge_by_Design-22D3EE?style=for-the-badge)](docs/zkproof/UrbanRentisha_TrustLayer_ZK_Proof_Documentation.md)
[![Testnet Only](https://img.shields.io/badge/Network-Testnet_Only-08B5E5?style=for-the-badge&logo=stellar&logoColor=white)](https://stellar.org)

</div>

---

This project handles real financial transactions (rental viewing fees, held in escrow) and real personal trust signals (verification status, audit history). Software that touches money and identity carries real responsibility — this document is an honest account of how that responsibility was handled, including where it falls short.

## 1. Security by Design

Not a claim — see [SECURITY.md](SECURITY.md) for the full, current list of what's actually implemented and verified: rate-limited authentication, audit logging on every login attempt, JWT + role-based access control, strict input validation on every endpoint, and real on-chain BLS12-381 pairing verification (not a stub).

Two real vulnerabilities were found and fixed during this project, not assumed away:

- The original payment commitment relation (`secret² + nonce² == target`) was **not actually a binding commitment** — solvable via modular square root without knowing the real secret. Replaced with a one-way `MiMCPermutation`.
- That replacement was itself under-secured at 12 rounds (`5^12 ≈ 2^28`, far short of the `~2^255` needed). Caught by direct calculation, corrected to 220 rounds.
- A public listings endpoint had no status filter at all, meaning tenants could see listings an admin had explicitly **rejected** as fraudulent — directly undermining the platform's "verified rental access" premise. Found and fixed.

These are listed, not buried, because finding and disclosing your own mistakes is the actual practice of security, not a slogan about it.

## 2. Data Privacy by Architecture

The core product mechanism *is* a privacy guarantee: a tenant proves a payment condition was satisfied via a zero-knowledge proof, without revealing wallet history or unrelated financial activity to the platform or the landlord. This isn't a bolt-on privacy policy — it's the reason the ZK circuit exists at all.

Beyond the proof itself: secret keys are never sent to the frontend and never committed to the repository; private proof witness material (the secret/nonce pair) is hashed before storage, never persisted in the clear; Supabase service-role keys are server-only.

## 3. Honest Metrics, Not Inflated Ones

No claim in this repo's documentation is unverified. Every contract address, performance number, and test-coverage figure cited in [README.md](README.md), [TECH_STACK.md](TECH_STACK.md), and [DEMO_GUIDE.md](DEMO_GUIDE.md) was checked against the live deployment or the actual codebase before being written down — not estimated, not aspirational.

Where the work is incomplete, it's stated as such: the MiMC permutation is explicitly documented as a non-audited construction; broader backend test coverage is described as "still thin," not "comprehensive"; the `findOne` listing-detail endpoint has a known, smaller residual access-control gap that was deliberately left alone rather than risk breaking a legitimate agent/admin flow under time pressure.

## 4. Accessibility

Real fixes shipped during development, not an afterthought: corrected `dt`/`dd` semantic ordering in the hero stats list, strengthened overlay contrast against WCAG guidance, and changed the primary button color where the brand accent shade failed contrast requirements. See [CHANGELOG.md](CHANGELOG.md) (2026-06-24/25 entries) for specifics.

## 5. AI-Assisted Development, Human-Governed

This project was built with AI pair-programming (Claude Code) under an explicit, version-controlled rules file ([CLAUDE.md](CLAUDE.md)) that mandates: audit existing code before changing it, never fabricate data or mock results, run full type/lint/test/build checks before every commit, and disclose limitations rather than hide them. Every fix described in this document and [SECURITY.md](SECURITY.md) — including the two real vulnerabilities above — was found through direct verification against running code or a live deployment, not assumed correct because an AI wrote it.

## 6. Open Source Commitment

Public repository, [MIT licensed](LICENSE), full commit history preserved (see [CHANGELOG.md](CHANGELOG.md)) rather than squashed into an opaque single commit. Nothing about the implementation is hidden from judges, contributors, or auditors.

## 7. Right-Sized for What This Actually Is

This is a Stellar **testnet** MVP, not a production financial system — and the documentation says so plainly rather than implying otherwise. No mainnet deployment, no claim of an independent security audit, no overstated production-readiness. Stellar testnet was chosen deliberately: real transaction semantics and real on-chain verification, without real funds at risk while the commitment scheme and broader test coverage mature.
