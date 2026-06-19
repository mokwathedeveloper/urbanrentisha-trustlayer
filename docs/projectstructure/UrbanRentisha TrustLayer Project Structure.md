# UrbanRentisha TrustLayer Project Structure

urbanrentisha-trustlayer/  
├── apps/  
│ ├── web/  
│ │ ├── app/  
│ │ │ ├── (auth)/  
│ │ │ │ ├── login/  
│ │ │ │ ├── signup/  
│ │ │ │ └── onboarding/  
│ │ │ │  
│ │ │ ├── (public)/  
│ │ │ │ ├── page.tsx  
│ │ │ │ ├── api-docs/  
│ │ │ │ ├── faq/  
│ │ │ │ └── demo/  
│ │ │ │  
│ │ │ ├── tenant/  
│ │ │ │ ├── dashboard/  
│ │ │ │ ├── listings/  
│ │ │ │ ├── listings/\[id\]/  
│ │ │ │ ├── viewing-requests/\[id\]/  
│ │ │ │ ├── payment/\[requestId\]/  
│ │ │ │ ├── proofs/generate/\[requestId\]/  
│ │ │ │ ├── proofs/verify/\[requestId\]/  
│ │ │ │ ├── escrow/\[requestId\]/  
│ │ │ │ ├── viewing-code/\[code\]/  
│ │ │ │ ├── notifications/  
│ │ │ │ └── reports/  
│ │ │ │  
│ │ │ ├── manager/  
│ │ │ │ ├── dashboard/  
│ │ │ │ ├── listings/  
│ │ │ │ ├── viewing-requests/  
│ │ │ │ ├── verified-tenants/  
│ │ │ │ ├── reports/  
│ │ │ │ └── trust-profile/  
│ │ │ │  
│ │ │ ├── admin/  
│ │ │ │ ├── dashboard/  
│ │ │ │ ├── listings/  
│ │ │ │ ├── agents/  
│ │ │ │ ├── reports/  
│ │ │ │ ├── proof-activity/  
│ │ │ │ ├── audit-logs/  
│ │ │ │ ├── analytics/  
│ │ │ │ └── api-clients/  
│ │ │ │  
│ │ │ ├── layout.tsx  
│ │ │ ├── globals.css  
│ │ │ └── not-found.tsx  
│ │ │  
│ │ ├── components/  
│ │ │ ├── ui/  
│ │ │ │ ├── button.tsx  
│ │ │ │ ├── input.tsx  
│ │ │ │ ├── card.tsx  
│ │ │ │ ├── badge.tsx  
│ │ │ │ ├── modal.tsx  
│ │ │ │ ├── table.tsx  
│ │ │ │ ├── tabs.tsx  
│ │ │ │ ├── toast.tsx  
│ │ │ │ └── stepper.tsx  
│ │ │ │  
│ │ │ ├── layout/  
│ │ │ │ ├── public-navbar.tsx  
│ │ │ │ ├── dashboard-sidebar.tsx  
│ │ │ │ ├── dashboard-header.tsx  
│ │ │ │ └── mobile-nav.tsx  
│ │ │ │  
│ │ │ ├── product/  
│ │ │ │ ├── property-card.tsx  
│ │ │ │ ├── verified-property-badge.tsx  
│ │ │ │ ├── agent-trust-card.tsx  
│ │ │ │ ├── viewing-request-card.tsx  
│ │ │ │ ├── payment-status-card.tsx  
│ │ │ │ ├── proof-status-tracker.tsx  
│ │ │ │ ├── escrow-status-tracker.tsx  
│ │ │ │ ├── viewing-code-card.tsx  
│ │ │ │ ├── audit-log-row.tsx  
│ │ │ │ └── api-endpoint-card.tsx  
│ │ │ │  
│ │ │ └── states/  
│ │ │ ├── empty-state.tsx  
│ │ │ ├── loading-state.tsx  
│ │ │ ├── error-state.tsx  
│ │ │ └── success-state.tsx  
│ │ │  
│ │ ├── features/  
│ │ │ ├── auth/  
│ │ │ ├── listings/  
│ │ │ ├── viewing-requests/  
│ │ │ ├── payments/  
│ │ │ ├── zk-proofs/  
│ │ │ ├── verification/  
│ │ │ ├── viewing-codes/  
│ │ │ ├── reports/  
│ │ │ ├── notifications/  
│ │ │ ├── dashboards/  
│ │ │ └── api-portal/  
│ │ │  
│ │ ├── lib/  
│ │ │ ├── api-client.ts  
│ │ │ ├── constants.ts  
│ │ │ ├── routes.ts  
│ │ │ ├── utils.ts  
│ │ │ └── validations.ts  
│ │ │  
│ │ ├── hooks/  
│ │ │ ├── use-auth.ts  
│ │ │ ├── use-listings.ts  
│ │ │ ├── use-viewing-request.ts  
│ │ │ ├── use-payment-status.ts  
│ │ │ ├── use-proof-status.ts  
│ │ │ └── use-notifications.ts  
│ │ │  
│ │ ├── styles/  
│ │ │ └── theme.css  
│ │ │  
│ │ ├── public/  
│ │ │ ├── logo/  
│ │ │ ├── images/  
│ │ │ └── demo/  
│ │ │  
│ │ ├── tailwind.config.ts  
│ │ ├── next.config.ts  
│ │ ├── tsconfig.json  
│ │ └── package.json  
│ │  
│ └── api/  
│ ├── src/  
│ │ ├── main.ts  
│ │ ├── app.module.ts  
│ │ │  
│ │ ├── auth/  
│ │ │ ├── auth.controller.ts  
│ │ │ ├── auth.service.ts  
│ │ │ ├── auth.module.ts  
│ │ │ ├── guards/  
│ │ │ ├── strategies/  
│ │ │ └── dto/  
│ │ │  
│ │ ├── users/  
│ │ ├── tenants/  
│ │ ├── agents/  
│ │ ├── listings/  
│ │ ├── viewing-requests/  
│ │ ├── payments/  
│ │ ├── stellar/  
│ │ ├── zk-proofs/  
│ │ ├── proof-verification/  
│ │ ├── escrow/  
│ │ ├── viewing-codes/  
│ │ ├── notifications/  
│ │ ├── reports/  
│ │ ├── audit-logs/  
│ │ ├── analytics/  
│ │ ├── external-api/  
│ │ ├── integrations/  
│ │ ├── queues/  
│ │ ├── admin/  
│ │ ├── prisma/  
│ │ │ ├── prisma.module.ts  
│ │ │ └── prisma.service.ts  
│ │ │  
│ │ └── common/  
│ │ ├── decorators/  
│ │ ├── filters/  
│ │ ├── guards/  
│ │ ├── interceptors/  
│ │ ├── pipes/  
│ │ ├── constants/  
│ │ ├── enums/  
│ │ └── types/  
│ │  
│ ├── test/  
│ ├── tsconfig.json  
│ └── package.json  
│  
├── packages/  
│ ├── database/  
│ │ ├── prisma/  
│ │ │ ├── schema.prisma  
│ │ │ ├── migrations/  
│ │ │ └── seed.ts  
│ │ └── package.json  
│ │  
│ ├── contracts/  
│ │ ├── soroban/  
│ │ │ ├── src/  
│ │ │ ├── tests/  
│ │ │ ├── Cargo.toml  
│ │ │ └── README.md  
│ │ └── package.json  
│ │  
│ ├── zk/  
│ │ ├── circuits/  
│ │ ├── proofs/  
│ │ ├── verifier/  
│ │ ├── scripts/  
│ │ └── README.md  
│ │  
│ └── shared/  
│ ├── src/  
│ │ ├── types/  
│ │ ├── enums/  
│ │ ├── constants/  
│ │ ├── schemas/  
│ │ └── utils/  
│ └── package.json  
│  
├── docs/  
│ ├── PRD.md  
│ ├── ROADMAP.md  
│ ├── ARCHITECTURE.md  
│ ├── API.md  
│ ├── DATABASE.md  
│ ├── ZK_PROOF.md  
│ ├── CONTRACTS.md  
│ ├── DESIGN_SYSTEM.md  
│ ├── DEMO_SCRIPT.md  
│ └── SUBMISSION_NOTES.md  
│  
├── scripts/  
│ ├── setup.sh  
│ ├── seed-demo-data.ts  
│ ├── deploy-contract.sh  
│ └── generate-demo-proof.ts  
│  
├── .github/  
│ └── workflows/  
│ ├── lint.yml  
│ ├── test.yml  
│ └── deploy.yml  
│  
├── .env.example  
├── .gitignore  
├── README.md  
├── package.json  
├── pnpm-workspace.yaml  
├── turbo.json  
└── tsconfig.base.json

# Folder Purpose

## apps/web

This is the **Next.js frontend**. It contains all pages, dashboards, components, user flows, and UI logic.

It handles:

Landing page  
Tenant dashboard  
Property listings  
Payment screens  
ZK proof screens  
Admin dashboard  
Manager dashboard  
API portal  
Demo mode

## apps/api

This is the **NestJS backend**. It contains all business logic, API endpoints, authentication, database access, Stellar services, ZK services, notifications, queues, reports, analytics, and integrations.

It handles:

Users  
Listings  
Viewing requests  
Payments  
Stellar transactions  
ZK proofs  
Proof verification  
Viewing codes  
Reports  
Audit logs  
Notifications  
Analytics  
External APIs

## packages/database

This contains the shared **Prisma schema**, migrations, and seed data.

It handles:

Database models  
Migrations  
Demo data  
Seeded listings  
Seeded users  
Seeded viewing requests

## packages/contracts

This contains the **Soroban smart contract** code.

It handles:

create_request  
submit_proof  
verify_proof  
get_access_status  
get_verification_status

## packages/zk

This contains the **ZK proof system**.

It handles:

Noir or Circom circuits  
Proof generation scripts  
Verifier logic  
Proof examples  
ZK documentation

## packages/shared

This contains shared TypeScript types, constants, enums, validation schemas, and utilities used across frontend and backend.

It handles:

Status enums  
API response types  
Shared DTO types  
Common constants  
Utility functions

## docs

This contains all project documentation required for development, README support, and hackathon submission.

It should include:

PRD  
Roadmap  
Architecture  
API docs  
ZK proof explanation  
Smart contract explanation  
Database design  
Demo script  
Submission notes

# Recommended Package Scripts

{  
"scripts": {  
"dev": "turbo dev",  
"dev:web": "pnpm --filter web dev",  
"dev:api": "pnpm --filter api start:dev",  
"build": "turbo build",  
"lint": "turbo lint",  
"test": "turbo test",  
"db:generate": "pnpm --filter database prisma generate",  
"db:migrate": "pnpm --filter database prisma migrate dev",  
"db:seed": "pnpm --filter database prisma db seed",  
"contract:build": "pnpm --filter contracts build",  
"contract:deploy": "pnpm --filter contracts deploy",  
"zk:prove": "pnpm --filter zk prove",  
"zk:verify": "pnpm --filter zk verify"  
}  
}

# Best Setup Order

1\. Create monorepo  
2\. Add Next.js frontend in apps/web  
3\. Add NestJS backend in apps/api  
4\. Add Prisma and PostgreSQL in packages/database  
5\. Add shared types in packages/shared  
6\. Add frontend design system  
7\. Add backend modules  
8\. Add Stellar service  
9\. Add ZK proof package  
10\. Add Soroban contract package  
11\. Add demo data  
12\. Add documentation