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
pnpm install
cp .env.example .env
pnpm prisma:generate
pnpm prisma:migrate
pnpm start:dev
```

## Default API URL

```text
http://localhost:4000/api/v1
```

## Important

This starter includes a hybrid MVP proof flow. The ZK proof service creates a simulated proof hash and verification record so the product flow can be demonstrated. A real ZK circuit/prover can later replace the mock generator without changing the API contract.
