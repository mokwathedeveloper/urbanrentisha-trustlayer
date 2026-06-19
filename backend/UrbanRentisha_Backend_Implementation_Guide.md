# UrbanRentisha TrustLayer Backend Implementation Guide

## 1. Purpose

This guide explains how to implement the backend for **UrbanRentisha TrustLayer**.

UrbanRentisha TrustLayer is a rental trust and verification system. It helps prevent rental scams by making sure a tenant completes the required payment proof process before viewing access is unlocked.

The backend controls:

```text
Users
Tenants
Agents
Property listings
Viewing requests
Stellar testnet payments
ZK payment proof generation
Proof verification
Viewing code unlock
Fake listing reports
Notifications
Audit logs
External platform APIs
Webhooks
Admin dashboards
```

---

## 2. Recommended Backend Stack

```text
Framework: NestJS
Language: TypeScript
Database: Supabase PostgreSQL
ORM: Prisma
Authentication: JWT
Authorization: Role-based access control
Blockchain: Stellar SDK
Smart contract layer: Soroban-ready proof verification reference
ZK proof workflow: Off-chain proof service or mock MVP proof generator
Deployment: Render, Railway, Fly.io, or Vercel-compatible serverless adaptation
```

For the MVP, the backend uses a **hybrid proof flow**:

```text
Real payment-intent flow
Real transaction-hash recording
Real proof hash generation
Real proof-status tracking
Mock or fallback proof verification
Soroban transaction hash placeholder
Viewing code unlock after proof verification
```

This is acceptable for a hackathon MVP as long as the demo clearly explains the limitation.

---

## 3. Backend Folder Structure

```text
urbanrentisha-trustlayer-backend/
├── src/
│   ├── admin/
│   ├── audit-logs/
│   ├── auth/
│   ├── common/
│   │   ├── decorators/
│   │   ├── guards/
│   │   ├── types/
│   │   └── utils/
│   ├── external-api/
│   ├── listings/
│   ├── notifications/
│   ├── payments/
│   ├── prisma/
│   ├── proof-verification/
│   ├── reports/
│   ├── stellar/
│   ├── users/
│   ├── viewing-codes/
│   ├── viewing-requests/
│   ├── webhooks/
│   ├── zk-proofs/
│   ├── app.module.ts
│   └── main.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── docs/
│   └── API_ENDPOINTS.md
│
├── .env.example
├── docker-compose.yml
├── package.json
├── README.md
└── tsconfig.json
```

---

## 4. Main Data Models

The Prisma schema includes:

```text
User
TenantProfile
AgentProfile
Listing
ViewingRequest
Payment
ZkProof
ProofVerification
ViewingCode
Report
Notification
AuditLog
ApiClient
WebhookEvent
```

### Main enums

```text
UserRole
UserStatus
ListingStatus
ViewingRequestStatus
PaymentStatus
ProofStatus
ViewingCodeStatus
ReportStatus
ReportType
NotificationType
AuditSeverity
```

---

## 5. Core User Roles

```text
TENANT
AGENT
MANAGER
ADMIN
PLATFORM
```

### Tenant

Can:

```text
Browse listings
Create viewing requests
Create payment intent
Confirm payment
Generate proof
Submit proof verification
Unlock viewing code
Submit reports
View notifications
```

### Agent / Manager

Can:

```text
Create listings
View property requests
Track viewing requests
View verified tenants
Respond to reports later
```

### Admin

Can:

```text
Verify listings
View all reports
View audit logs
View platform dashboard
Review proof activity
Suspend unsafe listings or users later
```

### Platform

Used for external rental-platform API integrations.

---

## 6. Main Backend Flow

```text
1. Tenant registers or logs in
2. Tenant selects a verified listing
3. Backend creates a viewing request
4. Backend creates a Stellar payment intent
5. Tenant pays the viewing fee on Stellar testnet
6. Backend confirms the transaction hash
7. Backend marks payment as received
8. Backend generates a ZK proof hash
9. Backend submits proof for verification
10. Backend marks proof as verified
11. Backend generates a viewing code
12. Tenant receives viewing access
13. Every important event is saved in audit logs
```

---

## 7. Payment and Proof Flow

### Step 1: Create viewing request

```text
POST /api/v1/viewing-requests
```

Body:

```json
{
  "listingId": "listing_id",
  "preferredDate": "2026-06-24",
  "preferredTime": "10:00"
}
```

Result:

```text
Viewing request is created with status AWAITING_PAYMENT.
```

### Step 2: Create Stellar payment intent

```text
POST /api/v1/payments/create
```

Body:

```json
{
  "viewingRequestId": "request_id",
  "payerWallet": "GCB7..."
}
```

Result:

```text
Backend returns amount, destination wallet, Stellar memo, and payment ID.
```

### Step 3: Confirm payment

```text
POST /api/v1/payments/confirm
```

Body:

```json
{
  "paymentId": "payment_id",
  "txHash": "stellar_testnet_transaction_hash"
}
```

Result:

```text
Payment becomes RECEIVED.
Viewing request becomes PAYMENT_RECEIVED.
```

### Step 4: Generate ZK proof

```text
POST /api/v1/zk-proofs/generate
```

Body:

```json
{
  "viewingRequestId": "request_id"
}
```

Result:

```text
Proof hash is generated.
Proof status becomes GENERATED.
Viewing request becomes PROOF_READY.
```

### Step 5: Submit proof verification

```text
POST /api/v1/proof-verification/submit
```

Body:

```json
{
  "viewingRequestId": "request_id"
}
```

Result:

```text
Proof becomes VERIFIED.
Verification record is created.
Soroban transaction hash placeholder is stored.
Viewing request becomes PROOF_VERIFIED.
```

### Step 6: Generate viewing code

```text
POST /api/v1/viewing-codes/generate
```

Body:

```json
{
  "viewingRequestId": "request_id"
}
```

Result:

```text
Viewing code becomes ACTIVE.
Viewing request becomes ACCESS_UNLOCKED.
```

---

## 8. Stellar Testnet Integration

The starter includes:

```text
src/stellar/stellar.service.ts
```

It provides:

```text
Destination wallet
Memo generation
Transaction lookup by hash
Payment reference verification
```

Environment variables:

```text
STELLAR_NETWORK=testnet
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
STELLAR_PLATFORM_PUBLIC_KEY=...
STELLAR_PLATFORM_SECRET_KEY=...
```

For the MVP, the backend checks whether the transaction hash exists on Stellar testnet.

For production, add:

```text
Amount validation
Destination wallet validation
Memo validation
Asset validation
Sequence and ledger confirmation depth
Duplicate transaction protection
Refund rules
Compliance checks
```

---

## 9. ZK Proof Implementation Plan

The starter has a mock ZK proof generator in:

```text
src/zk-proofs/zk-proofs.service.ts
```

It creates:

```text
proofHash
publicInputs
privateHintHash
generatedAt
status
```

### Public inputs

```text
requestId
listingId
requiredViewingFee
paymentCommitment
```

### Private data represented by hash only

```text
txHash
payerWallet
proof salt
```

### Production replacement

Later, replace the mock proof logic with:

```text
Noir, Circom, or RISC Zero prover
Proof artifact storage
Verifier contract call
Soroban proof verification transaction
Verified proof result indexing
```

Keep the API shape the same so the frontend does not need to change.

---

## 10. Soroban Verification Strategy

For hackathon MVP, use:

```text
mock_soroban_<hash>
```

This lets the frontend show proof verification status.

For production or deeper hackathon implementation, add:

```text
Soroban contract deploy
Contract method submit_proof
Contract method verify_proof
Contract method get_access_status
Contract event ProofVerified
Backend listener/indexer for contract event
```

Recommended contract name:

```text
UrbanRentishaTrustVerifier
```

---

## 11. API Endpoints

Base URL:

```text
/api/v1
```

### Auth

```text
POST /auth/register
POST /auth/login
GET  /auth/me
```

### Users

```text
GET /users/me
```

### Listings

```text
GET   /listings
GET   /listings/:id
POST  /listings
PATCH /listings/:id/verify
```

### Viewing requests

```text
POST /viewing-requests
GET  /viewing-requests/:id
GET  /viewing-requests/:id/status
```

### Payments

```text
POST /payments/create
POST /payments/confirm
GET  /payments/:id
```

### ZK proofs

```text
POST /zk-proofs/generate
GET  /zk-proofs/:id
```

### Proof verification

```text
POST /proof-verification/submit
GET  /proof-verification/:id
```

### Viewing codes

```text
POST /viewing-codes/generate
GET  /viewing-codes/:code/verify
```

### Reports

```text
POST /reports
GET  /reports
```

### Notifications

```text
GET   /notifications
PATCH /notifications/:id/read
```

### Audit logs

```text
GET /audit-logs
```

### External platform API

```text
POST /external/viewing-requests
```

### Webhooks

```text
POST /webhooks
GET  /webhooks
```

### Admin

```text
GET /admin/dashboard
```

---

## 12. Environment Setup

Create `.env` from `.env.example`.

Required:

```text
DATABASE_URL
DIRECT_URL
JWT_SECRET
STELLAR_HORIZON_URL
STELLAR_PLATFORM_PUBLIC_KEY
STELLAR_PLATFORM_SECRET_KEY
ZK_PROOF_SALT
WEBHOOK_SIGNING_SECRET
```

For Supabase:

```text
DATABASE_URL should use the pooled connection string.
DIRECT_URL should use the direct connection string.
```

---

## 13. Installation Commands

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
pnpm start:dev
```

If not using Supabase locally, run:

```bash
docker compose up -d
```

Then update:

```text
DATABASE_URL
DIRECT_URL
```

to local PostgreSQL.

---

## 14. Frontend Connection Plan

Connect frontend pages in this order:

```text
1. Tenant onboarding page -> no backend required first
2. Property listing page -> GET /listings
3. Property detail page -> GET /listings/:id
4. Request viewing screen -> POST /viewing-requests
5. Stellar payment screen -> POST /payments/create and POST /payments/confirm
6. ZK proof generation screen -> POST /zk-proofs/generate
7. Proof verification screen -> POST /proof-verification/submit
8. Viewing code success screen -> POST /viewing-codes/generate
9. Notifications screen -> GET /notifications
10. Fake listing report screen -> POST /reports
11. Tenant dashboard -> combine request, payment, proof, and code data
12. Manager dashboard -> listings and viewing requests
13. Admin dashboard -> GET /admin/dashboard
14. Audit log screen -> GET /audit-logs
15. API docs page -> docs/static endpoint data
16. Help page -> static or CMS
```

---

## 15. Audit Log Rules

Every important action should create an audit log:

```text
user.registered
listing.created
listing.verified
viewing_request.created
payment_intent.created
payment.received
zk_proof.generated
proof.verified
viewing_code.unlocked
report.submitted
access.revoked
admin.action
external_api.request
webhook.registered
```

Each audit log should include:

```text
actorId
action
entityType
entityId
severity
metadata
createdAt
```

---

## 16. Security Rules

Use these rules before production:

```text
Never expose JWT_SECRET
Never expose STELLAR_PLATFORM_SECRET_KEY
Never expose WEBHOOK_SIGNING_SECRET
Never expose Supabase service role key in frontend
Hash API keys before storing them
Validate webhook signatures
Rate-limit viewing request creation
Rate-limit external API clients
Validate Stellar destination, memo, asset, and amount
Prevent duplicate transaction hash usage
Expire viewing codes
Revoke codes after suspicious reports
Use HTTPS only
```

---

## 17. MVP Limitations

The starter is intentionally honest about MVP scope.

Current starter limitations:

```text
ZK proof generation is mocked
Soroban verification is represented by a mock transaction hash
External tenant mapping is not fully implemented
Webhook delivery queue is not implemented
Rate limiting is not implemented
Refresh token flow is not implemented
Real payment settlement is not implemented
```

Recommended next improvements:

```text
Add BullMQ worker for proof jobs
Add Redis-backed rate limiting
Add real webhook delivery retries
Add OpenAPI Swagger docs
Add Soroban contract integration
Add real ZK prover
Add duplicate transaction hash prevention
Add full external platform tenant mapping
Add production logging and monitoring
```

---

## 18. Deployment Plan

Recommended MVP deployment:

```text
Frontend: Vercel
Backend: Render, Railway, or Fly.io
Database: Supabase PostgreSQL
Proof worker: Render/Railway background worker
```

Vercel can host a lightweight API, but proof generation and worker jobs are better on a persistent backend host.

---

## 19. Development Checklist

```text
Backend starts successfully
Prisma connects to database
Seed creates admin and sample listing
JWT register and login works
GET /listings returns sample listing
POST /viewing-requests creates request
POST /payments/create returns payment intent
POST /payments/confirm records txHash
POST /zk-proofs/generate creates proof hash
POST /proof-verification/submit marks proof verified
POST /viewing-codes/generate unlocks code
POST /reports creates fake listing report
GET /audit-logs shows system trail
GET /admin/dashboard shows counts
```

---

## 20. Final Backend Goal

The backend should make the project feel real.

It should prove that UrbanRentisha is not just UI screens. It is a working trust layer where:

```text
Property listings are verified
Viewing requests are tracked
Payments are connected to Stellar
Proofs are generated
Verification unlocks access
Reports create safety signals
Audit logs preserve trust activity
External platforms can integrate through APIs
```
