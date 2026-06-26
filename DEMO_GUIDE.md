<div align="center">

<img src="logo.png" alt="UrbanRentisha TrustLayer" width="90" />

# 🎬 UrbanRentisha TrustLayer — Judge Demo Guide

[![Stellar Hacks](https://img.shields.io/badge/Stellar_Hacks-Real--World_ZK-08B5E5?style=for-the-badge&logo=stellar&logoColor=white)](https://dorahacks.io/hackathon/stellar-hacks-zk)
[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-urbanrentisha--web.vercel.app-16A34A?style=for-the-badge)](https://urbanrentisha-web.vercel.app)

</div>

---

## 🔑 Demo Credentials

Live site: **https://urbanrentisha-web.vercel.app**

| Role | Email | Password | What it shows |
|---|---|---|---|
| 👤 Tenant | `tenant1@urbanrentisha.local` | `TenantPass123!` | Browse listings, pay, generate ZK proof, unlock viewing code |
| 🏢 Agent | `agent@urbanrentisha.local` | `Agent123!` | Listing management, verification status, escrow visibility |
| 🛠️ Admin | `admin@urbanrentisha.local` | `ChangeMe123!` | Platform-wide dashboard, verification queue, audit log |

All three confirmed working against the live deployment by direct login test, not assumed.

> ⚠️ **Honest note:** the public browse list now only returns `VERIFIED` listings (previously it leaked pending/rejected ones too — fixed). It still includes a couple of test-named entries among the 5 verified listings ("Escrow Visibility Test", "kileleshwa"). For the cleanest walkthrough, use **"Kilimani Green View Apartment"** (listing ID `cmqlib0ws0004j88wctv2l78m`) — a real, presentable listing.

## 🎯 Core User Journey (for judges)

This is the load-bearing ZK flow — proof generation and on-chain verification gate every step.

1. **Log in as the tenant** (`tenant1@urbanrentisha.local`) → lands on `/dashboard`.
2. **Browse listings** at `/listings` → open **"Kilimani Green View Apartment"** (`/listings/[id]`).
3. **Request a viewing** at `/listings/[id]/request` → creates a `ViewingRequest`.
4. **Pay the viewing fee** at `/requests/[id]/payment` → 500 KES via the Soroban escrow contract on Stellar testnet (`CCDYGIL6...AJW5ESTY`).
5. **Generate the ZK proof** at `/requests/[id]/proof` → backend calls `snarkjs.groth16.fullProve()` against the real Circom circuit — a real Groth16 proof, not a placeholder.
6. **Verify on-chain** at `/requests/[id]/verify` → the proof is submitted to the deployed Soroban contract (`CAO2EEH7...HZQYDGSW`), which runs a real BLS12-381 pairing check and returns `true`/`false`.
7. **Unlock the viewing code** at `/requests/[id]/code` → only reachable if step 6 returned `true`. This is the load-bearing gate: no valid proof, no code.
8. *(Optional)* **Escrow status** at `/requests/[id]/escrow` shows the on-chain hold/release state.

## 🎬 2-Minute Video Script

A starting point — adjust pacing to what's comfortable, but keep these beats since they map directly to the hackathon's judging criteria ("ZK should be load-bearing, not just on a slide").

```text
[0:00–0:15] Hook
"Rental scams cost tenants money every day — fake listings, no proof of payment,
no accountability. UrbanRentisha TrustLayer fixes this with a real
zero-knowledge proof, verified on-chain on Stellar, before a tenant ever
gets access to a property."

[0:15–0:40] The flow
Show: browsing a listing → requesting a viewing → paying the fee on Stellar
testnet.
"The tenant pays into a Soroban escrow contract — funds are held, not
released, until the payment is proven."

[0:40–1:20] The ZK core (the most important 40 seconds)
Show: the proof-generation screen, then the verification screen.
"Here's the part that matters for this hackathon — the backend generates
a real Groth16 proof using a Circom circuit, compiled for the BLS12-381
curve. That proof gets submitted to a Soroban smart contract deployed on
Stellar testnet, which runs a real pairing check — not a mock, not a
stub. If you want to verify this yourselves, the contract ID is in the
README and you can call it directly with the Stellar CLI."

[1:20–1:45] The payoff
Show: viewing code unlock screen.
"Only once that proof verifies on-chain does the tenant get the viewing
code. No proof, no access — the ZK isn't decoration, it's the gate."

[1:45–2:00] Close
"Full source, the deployed contract, and the proof design writeup —
including a real security bug I found and fixed in the commitment
scheme — are all in the README. Thanks for watching."
```

## 📋 Submission Checklist

Against [Stellar Hacks: Real-World ZK](https://dorahacks.io/hackathon/stellar-hacks-zk)'s actual stated requirements:

- [x] **Open-source repo** — public, with a README explaining what was built (this repo)
- [ ] **Demo video (2–3 min)** — script above, recording is the one remaining step
- [x] **ZK + Stellar, load-bearing** — real Circom/Groth16 proof, verified on-chain by a deployed Soroban contract; access is gated on verification succeeding, not cosmetic

## ⭐ Stellar Contract Addresses

| Contract | Address |
|---|---|
| 🪪 `UrbanRentishaTrustVerifier` | `CAO2EEH75TIJWGQEMKIO2RLDPWHQJ7HLDTG7HVYYGS6ZEV62HZQYDGSW` |
| 🔒 `UrbanRentishaEscrow` | `CCDYGIL6TW3CDBYUOOZFEY7LJXCY35AFTS3FGIMIG37PYMKAAJW5ESTY` |

Verify either directly: `stellar contract info interface --id <address> --network testnet`
