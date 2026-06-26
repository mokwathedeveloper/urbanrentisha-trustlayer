# UrbanRentisha TrustLayer Backend Starter

Backend starter for UrbanRentisha TrustLayer.

## Stack

```text
NestJS
TypeScript
Prisma ORM
Supabase PostgreSQL
JWT authentication
Role-based access control
Stellar SDK
ZK proof workflow service
Audit logs
External API integrations
Webhooks
```

## Purpose

This backend powers the UrbanRentisha TrustLayer MVP:

```text
Tenant accounts
Agent accounts
Verified property listings
Viewing requests
Stellar testnet payment intents
Payment confirmation
ZK payment proof generation
Proof verification tracking
Viewing code unlock
Suspicious listing reports
Notifications
Audit logs
External rental-platform API
Admin operations
```

## Quick Start

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

## Default API URL

```text
http://localhost:4000/api/v1
```

## Testing

```bash
npm test                                          # Jest - 100% line/branch coverage on auth + ZK commitment logic
npx tsc --noEmit                                  # typecheck
npx eslint "{src,apps,libs,test,api}/**/*.ts"     # lint
npm run build                                     # nest build
```

## Important

The ZK proof service generates **real** Groth16 proofs — `snarkjs.groth16.fullProve()` against the actual Circom circuit artifacts in `src/zk-proofs/circuit-artifacts/` — and submits them for **real** on-chain verification against a deployed Soroban contract (`CAO2EEH75TIJWGQEMKIO2RLDPWHQJ7HLDTG7HVYYGS6ZEV62HZQYDGSW` on Stellar testnet). This is not a mock or simulated proof flow; see [docs/zkproof/](../../docs/zkproof/UrbanRentisha_TrustLayer_ZK_Proof_Documentation.md) and the root [WHITEPAPER.md](../../WHITEPAPER.md) for the full design and an honest account of the construction's current limitations.
