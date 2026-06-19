# UrbanRentisha TrustLayer Final Vercel + Supabase Deployment Documentation

## 1. Document Purpose

This document defines the final deployment direction for **UrbanRentisha TrustLayer** using:

```text
Vercel for frontend
Vercel for backend functions / NestJS API
Supabase PostgreSQL database
Prisma ORM
Stellar testnet
Soroban smart contract
ZK proof service
GitHub CI/CD
```

This setup is recommended for the hackathon MVP because it is fast to deploy, easy to manage, and suitable for a demo-ready product.

The architecture still supports future growth. If proof generation, background queues, external API clients, notifications, analytics, and third-party integrations become heavier, those services can later move to a dedicated backend or worker host.

---

## 2. Final Deployment Decision

The chosen deployment setup is:

```text
Frontend:
Vercel

Backend:
Vercel Functions running NestJS

Database:
Supabase PostgreSQL

ORM:
Prisma

Authentication:
Demo login first
Optional Supabase Auth later

Storage:
Supabase Storage if property images or proof files are needed

Blockchain:
Stellar testnet + Soroban contract

CI/CD:
GitHub + Vercel automatic deployment
```

---

## 3. Does Vercel Work for Both Frontend and Backend?

Yes. Vercel can work for both the frontend and backend for the MVP.

The frontend will be a **Next.js app** deployed on Vercel.

The backend can be deployed as a **NestJS application on Vercel**, where the NestJS server runs as a Vercel Function.

This is good for the MVP because the product needs API endpoints, database access, Supabase integration, Stellar testnet calls, proof status updates, and demo-mode APIs.

However, long-running workers and heavy proof generation may need to move outside Vercel later.

---

## 4. Architecture Summary

```text
User Browser
    ↓
Vercel Frontend
Next.js + TypeScript + Tailwind CSS
    ↓
Vercel Backend Function
NestJS API
    ↓
Supabase PostgreSQL
Prisma ORM
    ↓
Stellar Testnet
Soroban Contract
    ↓
ZK Proof / Verification Status
    ↓
Viewing Code Unlock
```

---

## 5. Recommended MVP Architecture

```text
urbanrentisha-trustlayer/
├── apps/
│   ├── web/       Next.js frontend deployed on Vercel
│   └── api/       NestJS backend deployed on Vercel Functions
│
├── packages/
│   ├── database/  Prisma schema and migrations
│   ├── contracts/ Soroban contract
│   ├── zk/        ZK proof logic or demo proof service
│   └── shared/    Shared types and constants
│
├── docs/
├── README.md
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

---

## 6. Recommended Production Evolution

The MVP can run on Vercel and Supabase.

Later, if the project becomes heavier, use this production evolution:

```text
Frontend:
Vercel

Main API:
NestJS backend on Render, Railway, Fly.io, AWS, GCP, Azure, or VPS

Workers:
Separate proof worker
Separate notification worker
Separate analytics worker
Separate external webhook worker

Database:
Supabase PostgreSQL or another managed PostgreSQL

Queues:
Redis / BullMQ on Upstash, Railway, Render, or another Redis provider

Blockchain:
Stellar mainnet or testnet depending on release stage
```

---

## 7. When Vercel Is Enough

Vercel is enough for the MVP if the backend mainly handles:

```text
User login
Property listings
Viewing requests
Payment records
Proof status records
Proof submission endpoints
Viewing code generation
Admin audit logs
Demo-mode endpoints
Supabase database reads and writes
Stellar testnet transaction references
Soroban contract calls
```

---

## 8. When to Move Backend Workers Away From Vercel

Move heavy backend services away from Vercel when you need:

```text
Long-running proof generation
Continuous Stellar transaction polling
BullMQ background queues
Redis workers
High-volume external API clients
Webhook retry workers
Notification workers
Analytics pipelines
Large proof files
CPU-heavy ZK computation
```

Recommended future worker hosts:

```text
Railway
Render
Fly.io
DigitalOcean
AWS
Google Cloud
Azure
VPS with Docker
```

---

## 9. Supabase Role in the System

Supabase will provide the database layer.

Recommended Supabase services:

```text
Supabase PostgreSQL
Supabase dashboard for database management
Supabase Storage if property images are needed
Supabase Auth only if we decide not to build custom auth
```

For the MVP, use Supabase mainly as:

```text
PostgreSQL database
Database dashboard
Optional storage
```

Prisma will manage the database schema, migrations, and type-safe database access.

---

## 10. Supabase Values Needed

When you log into Supabase, collect these values:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
DATABASE_URL
DIRECT_URL
```

Optional backend-only values:

```text
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_JWT_SECRET
```

Security rule:

```text
Never place SUPABASE_SERVICE_ROLE_KEY in frontend code.
Never prefix service-role keys with NEXT_PUBLIC_.
Never commit database URLs or secrets to GitHub.
```

---

## 11. Environment Variables

## 11.1 Frontend Variables for Vercel

Add these to the **apps/web** Vercel project.

```text
NEXT_PUBLIC_APP_NAME=UrbanRentisha TrustLayer
NEXT_PUBLIC_API_URL=https://api.urbanrentisha.app/api/v1
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_SOROBAN_CONTRACT_ID=
NEXT_PUBLIC_DEMO_MODE=true
```

Safe frontend variables:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_STELLAR_NETWORK
NEXT_PUBLIC_SOROBAN_CONTRACT_ID
```

Never expose:

```text
DATABASE_URL
DIRECT_URL
SUPABASE_SERVICE_ROLE_KEY
JWT_SECRET
PLATFORM_ADMIN_SECRET_KEY
```

---

## 11.2 Backend Variables for Vercel

Add these to the **apps/api** Vercel backend project.

```text
NODE_ENV=production
PORT=3000

DATABASE_URL=
DIRECT_URL=

JWT_SECRET=
JWT_EXPIRES_IN=7d

SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=

STELLAR_NETWORK=testnet
STELLAR_RPC_URL=
STELLAR_HORIZON_URL=
SOROBAN_CONTRACT_ID=
PLATFORM_ADMIN_PUBLIC_KEY=
PLATFORM_ADMIN_SECRET_KEY=
VERIFIER_PUBLIC_KEY=

CORS_ORIGIN=https://urbanrentisha.app
API_BASE_URL=https://api.urbanrentisha.app/api/v1

DEMO_MODE=true
```

---

## 12. Vercel Project Setup

There are two good deployment options.

## Option A: Two Vercel Projects

Recommended for clarity.

```text
Project 1:
urbanrentisha-web
Root directory: apps/web

Project 2:
urbanrentisha-api
Root directory: apps/api
```

Benefits:

```text
Cleaner separation
Different environment variables
Separate deployment logs
Easier debugging
Professional frontend/backend boundary
```

## Option B: One Vercel Project

Possible, but less clean.

```text
One project containing frontend and API routes
```

This is only recommended if the backend is very small.

Final recommendation:

```text
Use two Vercel projects:
1. urbanrentisha-web
2. urbanrentisha-api
```

---

## 13. Frontend Deployment on Vercel

## 13.1 Frontend Project Settings

```text
Framework Preset: Next.js
Root Directory: apps/web
Install Command: pnpm install
Build Command: pnpm --filter web build
Output Directory: .next
Node Version: 20 or later
```

## 13.2 Frontend Domains

Recommended domains:

```text
urbanrentisha.app
www.urbanrentisha.app
```

## 13.3 Frontend Deployment Flow

```text
Push to GitHub
    ↓
Vercel detects changes
    ↓
Preview deployment created
    ↓
Merge to main
    ↓
Production deployment created
```

---

## 14. Backend Deployment on Vercel

## 14.1 Backend Project Settings

```text
Framework Preset: Other
Root Directory: apps/api
Install Command: pnpm install
Build Command: pnpm --filter api build
Output Directory: dist
Node Version: 20 or later
```

## 14.2 NestJS Entrypoint

The NestJS entrypoint should be named in a way Vercel can detect.

Recommended:

```text
apps/api/src/main.ts
```

Basic shape:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```

## 14.3 Backend Domain

Recommended API domain:

```text
api.urbanrentisha.app
```

If using the default Vercel domain first:

```text
https://urbanrentisha-api.vercel.app
```

Then set:

```text
NEXT_PUBLIC_API_URL=https://urbanrentisha-api.vercel.app/api/v1
```

---

## 15. Supabase + Prisma Setup

## 15.1 Prisma Schema Location

Recommended:

```text
packages/database/prisma/schema.prisma
```

## 15.2 Prisma Provider

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

## 15.3 Migration Commands

Development:

```bash
pnpm --filter database prisma migrate dev
```

Production:

```bash
pnpm --filter database prisma migrate deploy
```

Generate client:

```bash
pnpm --filter database prisma generate
```

---

## 16. Build and Deployment Commands

## 16.1 Root Scripts

Recommended root `package.json` scripts:

```json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck",
    "test": "turbo test",
    "db:generate": "pnpm --filter database prisma generate",
    "db:migrate": "pnpm --filter database prisma migrate dev",
    "db:deploy": "pnpm --filter database prisma migrate deploy",
    "db:seed": "pnpm --filter database prisma db seed",
    "dev:web": "pnpm --filter web dev",
    "dev:api": "pnpm --filter api start:dev",
    "build:web": "pnpm --filter web build",
    "build:api": "pnpm --filter api build"
  }
}
```

---

## 17. GitHub CI/CD

Use GitHub for source control and Vercel for automatic deployments.

Recommended branch strategy:

```text
main → production
develop → staging
feature/* → preview deployments
```

## 17.1 GitHub Actions CI

Create:

```text
.github/workflows/ci.yml
```

Recommended workflow:

```yaml
name: CI

on:
  pull_request:
  push:
    branches:
      - main
      - develop

jobs:
  checks:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Enable Corepack
        run: corepack enable

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Generate Prisma Client
        run: pnpm db:generate

      - name: Type check
        run: pnpm typecheck

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test

      - name: Build
        run: pnpm build
```

---

## 18. Database Deployment Flow

Recommended safe deployment flow:

```text
1. Create Supabase project.
2. Copy project URL and publishable key.
3. Copy database connection strings.
4. Add DATABASE_URL and DIRECT_URL to Vercel backend environment variables.
5. Run Prisma migration locally against development database first.
6. Test schema.
7. Run production migration using prisma migrate deploy.
8. Seed demo data.
9. Test API health endpoint.
```

---

## 19. Demo Data Setup

Create demo accounts:

```text
demo-tenant@urbanrentisha.app
demo-manager@urbanrentisha.app
demo-admin@urbanrentisha.app
```

Create demo listings:

```text
Verified 2BR Apartment
Student Studio Unit
Family Maisonette
```

Create demo flow:

```text
Tenant logs in
Tenant selects verified property
Tenant requests viewing
Tenant confirms Stellar testnet payment
Tenant generates proof
Proof is verified
Viewing code unlocks
Admin audit log records event
```

---

## 20. Demo Mode Routes

Frontend:

```text
/demo
/tenant/dashboard
/admin/audit-logs
```

Backend:

```text
POST /api/v1/demo/start
POST /api/v1/demo/payments/simulate
POST /api/v1/demo/proofs/verify
GET /api/v1/demo/status
```

---

## 21. Health Check Endpoint

Create a backend health endpoint:

```http
GET /api/v1/health
```

Expected response:

```json
{
  "success": true,
  "message": "UrbanRentisha API is healthy.",
  "data": {
    "status": "ok",
    "database": "connected",
    "stellarNetwork": "testnet",
    "demoMode": true
  }
}
```

---

## 22. CORS Configuration

The backend should only allow approved frontend origins.

Recommended:

```ts
app.enableCors({
  origin: [
    'https://urbanrentisha.app',
    'https://www.urbanrentisha.app',
    'https://urbanrentisha-web.vercel.app'
  ],
  credentials: true,
});
```

For local development:

```text
http://localhost:3000
```

---

## 23. Security Rules

Follow these deployment security rules:

```text
Never expose private keys in frontend code.
Never expose seed phrases.
Never expose Supabase service role key in frontend.
Never commit .env files.
Use Vercel environment variables.
Use GitHub secrets for CI/CD.
Use separate staging and production variables.
Use strong JWT secret.
Use CORS restrictions.
Use API rate limiting.
Use audit logs for sensitive actions.
```

---

## 24. What You Should Give Codex or Developer

You can give the developer:

```text
Supabase project URL
Supabase publishable key
Database connection string
Direct database connection string
Vercel project names
GitHub repository URL
Stellar testnet contract ID
Stellar RPC URL
Soroban contract ID
```

Do not share publicly:

```text
Supabase service role key
Database password
JWT secret
Platform admin secret key
Stellar secret key
GitHub tokens
Vercel tokens
```

---

## 25. Recommended `.env.example`

```env
# App
NODE_ENV=development
PORT=3000

# Frontend
NEXT_PUBLIC_APP_NAME="UrbanRentisha TrustLayer"
NEXT_PUBLIC_API_URL="http://localhost:4000/api/v1"
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=""
NEXT_PUBLIC_STELLAR_NETWORK="testnet"
NEXT_PUBLIC_SOROBAN_CONTRACT_ID=""
NEXT_PUBLIC_DEMO_MODE="true"

# Backend
DATABASE_URL=""
DIRECT_URL=""
JWT_SECRET=""
JWT_EXPIRES_IN="7d"

SUPABASE_URL=""
SUPABASE_PUBLISHABLE_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""

STELLAR_NETWORK="testnet"
STELLAR_RPC_URL=""
STELLAR_HORIZON_URL=""
SOROBAN_CONTRACT_ID=""
PLATFORM_ADMIN_PUBLIC_KEY=""
PLATFORM_ADMIN_SECRET_KEY=""
VERIFIER_PUBLIC_KEY=""

CORS_ORIGIN="http://localhost:3000"
API_BASE_URL="http://localhost:4000/api/v1"
DEMO_MODE="true"
```

---

## 26. Deployment Checklist

## 26.1 Supabase Checklist

```text
Create Supabase project.
Create database password.
Copy project URL.
Copy publishable key.
Copy pooled connection string.
Copy direct connection string.
Add DATABASE_URL and DIRECT_URL to backend environment.
Run Prisma migrations.
Seed demo data.
Test database connection.
```

## 26.2 Vercel Frontend Checklist

```text
Create Vercel project for apps/web.
Set root directory to apps/web.
Add frontend environment variables.
Connect GitHub repository.
Deploy preview.
Test landing page.
Test API connection.
Set custom domain.
```

## 26.3 Vercel Backend Checklist

```text
Create Vercel project for apps/api.
Set root directory to apps/api.
Add backend environment variables.
Add Supabase database variables.
Add Stellar/Soroban variables.
Deploy API.
Test health endpoint.
Test CORS from frontend.
Test auth route.
Test listing route.
Test viewing request route.
```

## 26.4 Stellar/Soroban Checklist

```text
Deploy contract to Stellar testnet.
Copy contract ID.
Add contract ID to backend environment variables.
Add public contract ID to frontend if safe.
Test create_request.
Test submit_proof.
Test verify_proof or verification-state recording.
Test access status lookup.
```

## 26.5 Demo Checklist

```text
Demo route works.
Demo tenant login works.
Listings load.
Request viewing works.
Payment simulation or testnet flow works.
Proof generation flow works.
Proof verification flow works.
Viewing code unlocks.
Admin audit log updates.
Demo video can be recorded smoothly.
```

---

## 27. Deployment Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Heavy proof generation times out on Vercel | Move proof generation to a separate worker later. |
| Background queues are needed | Use external worker host such as Railway, Render, or Fly.io. |
| Supabase connection pooling issue | Use Supabase pooled connection string for serverless deployments. |
| Secrets leak to frontend | Only use `NEXT_PUBLIC_` for safe public variables. |
| Backend CORS blocks frontend | Add Vercel frontend domain to CORS config. |
| Contract verification fails during demo | Add clearly labeled demo fallback. |
| Prisma migration fails | Test migrations on staging before production. |
| API cold starts affect demo | Warm the demo route before recording or presenting. |

---

## 28. Final Recommendation

For the hackathon MVP, use:

```text
Vercel frontend
Vercel backend with NestJS
Supabase PostgreSQL
Prisma ORM
Stellar testnet
Soroban contract
Demo-mode proof flow
GitHub + Vercel deployment
```

For production growth, keep Vercel for the frontend but move heavy backend workers to a dedicated host when needed.

Final architecture:

```text
Vercel
├── Next.js frontend
└── NestJS backend function

Supabase
└── PostgreSQL database

Stellar
└── Testnet + Soroban contract

Future Worker Host
└── Proof generation, queues, analytics, notifications, webhooks
```

This setup is professional, fast to deploy, and strong enough for the hackathon while leaving a clear path to production scale.

---

## 29. Official References

Use these official references during implementation:

```text
Vercel NestJS deployment documentation:
https://vercel.com/docs/frameworks/backend/nestjs

Supabase Next.js documentation:
https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

Supabase Prisma documentation:
https://supabase.com/docs/guides/database/prisma
```
