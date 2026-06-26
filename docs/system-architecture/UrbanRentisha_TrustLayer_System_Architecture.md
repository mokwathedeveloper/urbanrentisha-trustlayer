# UrbanRentisha TrustLayer System Architecture

## 1. Executive Technical Summary

UrbanRentisha TrustLayer is a ZK-powered rental trust and payment-verification platform built on Stellar. The platform allows tenants to request verified property viewing access, complete a Stellar testnet viewing or reservation payment, generate a zero-knowledge proof, verify that proof through a Stellar/Soroban smart contract, and unlock a secure viewing code after successful verification.

The system is designed as a serious B2B SaaS trust infrastructure layer, not as a full rental marketplace. Its purpose is to help rental platforms, agencies, landlords, property managers, and student housing providers reduce fake listings, fake agents, unsafe viewing payments, manual payment verification, and rental fraud.

The central trust flow is:

```text
Tenant requests viewing
Tenant pays through Stellar testnet
Tenant generates ZK payment proof
Soroban verifies proof
UrbanRentisha unlocks viewing code
Admin audit log records the event
```

---

## 2. Architecture Goals

The architecture is designed to achieve the following goals:

```text
Support a clean tenant viewing-access flow
Make ZK and Stellar load-bearing in the product
Separate frontend, backend, database, blockchain, and proof responsibilities
Support tenant, agent, manager, admin, and external API roles
Enable reliable audit logging and trust-safety review
Support future B2B rental-platform integrations
Keep the MVP demo-friendly and production-scalable
Protect users from unsafe wallet and payment practices
Avoid overbuilding full legal escrow in the MVP
```

---

## 3. Final Technology Stack

## 3.1 Frontend

```text
Next.js
TypeScript
Tailwind CSS
shadcn/ui
lucide-react icons
Google Fonts
TanStack Query
React Hook Form
Zod
Framer Motion
```

## 3.2 Backend

```text
NestJS
TypeScript
Prisma ORM
PostgreSQL
Redis
BullMQ
REST API
JWT or session authentication
Role-based access control
```

## 3.3 Blockchain and ZK

```text
Stellar testnet
Soroban smart contracts
Stellar SDK
Circom proof system, BLS12-381 (chosen over Noir - see WHITEPAPER.md S4.1)
Off-chain ZK proof generation service (real Groth16 proofs via snarkjs)
On-chain proof verification (real BLS12-381 pairing check, not state recording)
```

## 3.4 Infrastructure

```text
Frontend hosting
Backend hosting
Managed PostgreSQL
Managed Redis
Queue workers
Environment-based configuration
CI/CD pipeline
Logging and monitoring
```

---

## 4. MVP Architecture

The MVP architecture prioritizes one complete working trust flow.

```text
Next.js Frontend
        ↓
NestJS Backend API
        ↓
PostgreSQL Database
        ↓
Redis / BullMQ Queues
        ↓
Stellar Testnet Service
        ↓
ZK Proof Service
        ↓
Soroban Smart Contract
```

The MVP should fully demonstrate:

```text
Property listing
Viewing request
Stellar testnet payment
ZK proof generation
Soroban proof verification
Viewing code unlock
Tenant dashboard
Admin audit log
Demo mode
```

The MVP may simplify:

```text
Escrow as payment-hold status
Advanced trust score logic
Email and SMS notifications
Production agency onboarding
External API client onboarding
Advanced analytics
```

---

## 5. Production Architecture

The production architecture expands the MVP into a scalable SaaS platform.

```text
Web Client
        ↓
Next.js Frontend
        ↓
API Gateway / NestJS Backend
        ↓
Domain Services
        ↓
PostgreSQL Primary Database
        ↓
Redis Cache and Queues
        ↓
Queue Workers
        ↓
ZK Proof Worker
        ↓
Stellar Transaction Service
        ↓
Soroban Smart Contract
        ↓
Notification Providers
        ↓
External Rental Platform APIs
        ↓
Analytics and Monitoring
```

In production, these services may be separated into independent workers or services:

```text
ZK proof worker
Stellar transaction service
Notification service
Analytics service
External API integration service
Webhook delivery service
Trust score calculation worker
```

---

## 6. System Context Diagram

```text
+--------------------+
|      Tenant        |
+---------+----------+
          |
          v
+--------------------+        +----------------------+
| Next.js Frontend   | <----> | NestJS Backend API   |
+---------+----------+        +----------+-----------+
          |                              |
          |                              v
          |                   +----------------------+
          |                   | PostgreSQL Database  |
          |                   +----------+-----------+
          |                              |
          |                              v
          |                   +----------------------+
          |                   | Redis / BullMQ       |
          |                   +----------+-----------+
          |                              |
          |                              v
+---------+----------+        +----------------------+
| Property Manager   |        | Background Workers   |
+--------------------+        +----------+-----------+
                                         |
                                         v
                              +----------------------+
                              | ZK Proof Service     |
                              +----------+-----------+
                                         |
                                         v
                              +----------------------+
                              | Stellar / Soroban    |
                              +----------------------+
```

---

## 7. High-Level Architecture Diagram

```text
                 +-----------------------------+
                 |        Next.js Web App      |
                 | Tenant / Manager / Admin UI |
                 +--------------+--------------+
                                |
                                v
                 +-----------------------------+
                 |       NestJS API Layer      |
                 | Controllers / Guards / DTOs |
                 +--------------+--------------+
                                |
        +-----------------------+------------------------+
        |                       |                        |
        v                       v                        v
+---------------+       +---------------+        +---------------+
| Domain        |       | Integration   |        | Queue         |
| Services      |       | Services      |        | Services      |
+-------+-------+       +-------+-------+        +-------+-------+
        |                       |                        |
        v                       v                        v
+---------------+       +---------------+        +---------------+
| PostgreSQL    |       | Stellar SDK   |        | Redis/BullMQ  |
| Prisma ORM    |       | Soroban       |        | Workers       |
+-------+-------+       +-------+-------+        +-------+-------+
                                |                        |
                                v                        v
                      +------------------+      +------------------+
                      | Soroban Contract |      | ZK Proof Service |
                      +------------------+      +------------------+
```

---

## 8. Core User Flow

```text
1. Tenant opens UrbanRentisha TrustLayer.
2. Tenant views verified rental listings.
3. Tenant selects a property.
4. Tenant clicks Request Viewing.
5. Backend creates a viewing request.
6. Tenant completes Stellar testnet payment.
7. Backend records payment reference and transaction hash.
8. Tenant generates ZK payment proof.
9. Backend stores proof metadata.
10. Proof is submitted for Soroban verification.
11. Soroban verifies the proof or records verification result.
12. Backend updates proof status and access status.
13. Viewing code is generated.
14. Tenant receives notification.
15. Viewing details are unlocked.
16. Admin audit log records the complete event.
```

---

## 9. Frontend Architecture

## 9.1 Frontend Responsibilities

The Next.js frontend is responsible for:

```text
Public landing page
Signup and login
Tenant onboarding
Property listings
Property details
Viewing request flow
Stellar payment screen
ZK proof generation screen
Proof verification screen
Escrow/payment-hold status screen
Viewing code unlock screen
Tenant dashboard
Property manager dashboard
Admin dashboard
Audit log screen
API documentation page
Demo mode screen
Help and FAQ page
```

## 9.2 Frontend Folder Structure

```text
apps/web/
├── app/
│   ├── (auth)/
│   ├── (public)/
│   ├── tenant/
│   ├── manager/
│   ├── admin/
│   ├── layout.tsx
│   ├── globals.css
│   └── not-found.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── product/
│   └── states/
│
├── features/
│   ├── auth/
│   ├── listings/
│   ├── viewing-requests/
│   ├── payments/
│   ├── zk-proofs/
│   ├── verification/
│   ├── viewing-codes/
│   ├── reports/
│   ├── notifications/
│   ├── dashboards/
│   └── api-portal/
│
├── hooks/
├── lib/
├── styles/
└── public/
```

## 9.3 Frontend Design Rules

```text
Use strict TypeScript.
Use Tailwind design tokens.
Use reusable shadcn/ui components.
Use TanStack Query for server state.
Use React Hook Form for forms.
Use Zod for validation.
Use role-based route protection.
Use loading, empty, error, and success states.
Use mobile-first responsive design.
Keep blockchain and ZK copy simple and human.
```

---

## 10. Backend Architecture

## 10.1 Backend Responsibilities

The NestJS backend is responsible for:

```text
Authentication and authorization
User and role management
Property listings
Viewing requests
Payment records
Stellar transaction handling
ZK proof metadata
Proof verification status
Escrow/payment-hold status
Viewing code generation
Fake listing reports
Agent trust profiles
Notifications
Audit logs
Analytics
External API access
Third-party integrations
Background queues
Admin operations
```

## 10.2 NestJS Module Structure

```text
apps/api/src/
├── auth/
├── users/
├── tenants/
├── agents/
├── listings/
├── viewing-requests/
├── payments/
├── stellar/
├── zk-proofs/
├── proof-verification/
├── escrow/
├── viewing-codes/
├── notifications/
├── reports/
├── audit-logs/
├── analytics/
├── external-api/
├── integrations/
├── queues/
├── admin/
├── prisma/
└── common/
```

## 10.3 Backend Design Rules

```text
Use DTOs for request validation.
Use role-based guards.
Use centralized exception filters.
Use centralized audit logging.
Keep business logic in services.
Keep controllers thin.
Keep Prisma access inside service layers.
Keep Stellar logic inside the Stellar module.
Keep ZK logic inside the ZK Proof module.
Keep queues inside the Queues module.
Keep analytics isolated in the Analytics module.
Keep external API logic isolated in the External API module.
```

---

## 11. NestJS Module Design

## 11.1 Auth Module

Purpose:

```text
Register users
Login users
Manage sessions or JWTs
Protect routes
Apply role-based guards
Support wallet-linked accounts
```

## 11.2 Listings Module

Purpose:

```text
Create property listings
Update property listings
Approve or reject listings
Show verified property badge
Store agent and manager ownership
```

## 11.3 Viewing Requests Module

Purpose:

```text
Create viewing request
Track request lifecycle
Connect tenant, property, agent, payment, proof, and viewing code
Expose request status
```

## 11.4 Payments Module

Purpose:

```text
Create payment record
Track payment status
Store Stellar transaction hash
Confirm payment received
Trigger proof generation eligibility
```

## 11.5 Stellar Module

Purpose:

```text
Manage Stellar testnet transaction references
Interact with Stellar SDK
Track payment confirmation
Call Soroban contract functions
Read contract verification events
```

## 11.6 ZK Proofs Module

Purpose:

```text
Create proof generation task
Store proof metadata
Track proof status
Separate private proof logic from normal business logic
```

## 11.7 Proof Verification Module

Purpose:

```text
Submit proof for verification
Record Soroban verification result
Update access eligibility
Trigger viewing code generation
```

## 11.8 Viewing Codes Module

Purpose:

```text
Generate unique viewing code
Verify code
Expire code
Revoke code
Link code to tenant, property, and viewing request
```

## 11.9 Reports Module

Purpose:

```text
Submit suspicious listing report
Review report
Track report status
Update agent trust profile
```

## 11.10 Audit Logs Module

Purpose:

```text
Record important platform actions
Support admin review
Support dispute traceability
Support B2B trust reporting
```

## 11.11 Queues Module

Purpose:

```text
Manage proof generation jobs
Manage notification jobs
Manage analytics jobs
Manage Stellar transaction polling jobs
Manage webhook delivery jobs
```

---

## 12. Database Architecture

The database uses PostgreSQL with Prisma ORM.

## 12.1 Core Models

```text
User
TenantProfile
AgentProfile
PropertyListing
ViewingRequest
PaymentRecord
ZKProof
ProofVerification
EscrowStatusRecord
ViewingCode
Notification
ListingReport
AuditLog
ApiClient
ApiKey
AnalyticsEvent
IntegrationLog
QueueJobLog
```

## 12.2 Core Relationships

```text
User has one TenantProfile or AgentProfile.
AgentProfile has many PropertyListings.
PropertyListing has many ViewingRequests.
ViewingRequest belongs to TenantProfile.
ViewingRequest belongs to PropertyListing.
ViewingRequest has one PaymentRecord.
ViewingRequest has one ZKProof.
ZKProof has one ProofVerification.
ViewingRequest has one ViewingCode.
PropertyListing has many ListingReports.
User has many Notifications.
User has many AuditLogs as actor.
ApiClient has many ApiKeys.
```

---

## 13. Prisma Schema Outline

```prisma
enum UserRole {
  TENANT
  AGENT
  MANAGER
  ADMIN
  API_CLIENT
}

enum ListingVerificationStatus {
  PENDING
  VERIFIED
  REJECTED
  SUSPENDED
}

enum ViewingRequestStatus {
  VIEWING_REQUESTED
  PAYMENT_PENDING
  PAYMENT_RECEIVED
  PROOF_GENERATED
  PROOF_VERIFIED
  ESCROW_ACTIVE
  VIEWING_CODE_GENERATED
  ACCESS_UNLOCKED
  COMPLETED
  FAILED
  REPORTED
}

enum PaymentStatus {
  PENDING
  INITIATED
  RECEIVED
  FAILED
  REFUNDED
}

enum ProofStatus {
  NOT_STARTED
  GENERATING
  GENERATED
  SUBMITTED
  VERIFIED
  FAILED
}

enum EscrowStatus {
  NOT_STARTED
  PENDING
  ACTIVE
  RELEASED
  REFUNDED
  FAILED
}

enum AccessStatus {
  LOCKED
  UNLOCKED
  EXPIRED
  REVOKED
}

enum ReportStatus {
  OPEN
  UNDER_REVIEW
  RESOLVED
  DISMISSED
}
```

Key models should include:

```text
id
createdAt
updatedAt
status fields
foreign keys
audit metadata
soft delete fields where appropriate
```

---

## 14. API Architecture

The backend exposes REST APIs for frontend clients and external rental-platform clients.

## 14.1 Auth APIs

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

## 14.2 Listing APIs

```text
GET /api/listings
GET /api/listings/:id
POST /api/listings
PATCH /api/listings/:id
PATCH /api/listings/:id/approve
POST /api/listings/:id/report
```

## 14.3 Viewing Request APIs

```text
POST /api/viewing-requests
GET /api/viewing-requests/:id
GET /api/viewing-requests/:id/status
PATCH /api/viewing-requests/:id/status
```

## 14.4 Payment APIs

```text
POST /api/payments/create
POST /api/payments/confirm
GET /api/payments/:id/status
```

## 14.5 ZK Proof APIs

```text
POST /api/proofs/generate
POST /api/proofs/submit
POST /api/proofs/verify
GET /api/proofs/:id/status
```

## 14.6 Viewing Code APIs

```text
POST /api/viewing-codes/generate
GET /api/viewing-codes/:code/verify
PATCH /api/viewing-codes/:code/revoke
```

## 14.7 Admin APIs

```text
GET /api/admin/dashboard
GET /api/admin/audit-logs
GET /api/admin/reports
PATCH /api/admin/reports/:id/review
PATCH /api/admin/listings/:id/approve
PATCH /api/admin/agents/:id/verify
GET /api/admin/analytics
```

## 14.8 External Platform APIs

```text
POST /api/external/viewing-requests
GET /api/external/viewing-requests/:id/status
POST /api/external/proofs/verify
POST /api/external/listings/:id/report
GET /api/external/agents/:id/trust-profile
GET /api/external/viewing-codes/:code/verify
```

---

## 15. Authentication and Authorization

## 15.1 Authentication

Supported authentication options for MVP:

```text
Email/password demo login
Wallet-linked demo account
JWT access token
Session-based authentication if preferred
```

## 15.2 Authorization

Authorization is role-based.

```text
Tenant can access own viewing requests and codes.
Agent can access own listings and requests.
Manager can access managed listings and related requests.
Admin can access all platform operations.
External API client can access only permitted API resources.
```

## 15.3 Guards

Recommended NestJS guards:

```text
JwtAuthGuard
RolesGuard
ApiKeyGuard
AdminGuard
ManagerGuard
OwnerGuard
```

---

## 16. Stellar Payment Design

## 16.1 Payment Flow

```text
Tenant requests viewing
Backend creates payment record
Frontend shows Stellar payment details
Tenant completes testnet payment
Transaction hash is captured
Backend confirms transaction
Payment status becomes RECEIVED
Proof generation becomes available
```

## 16.2 Payment Data Stored

```text
viewingRequestId
tenantWallet
amount
asset
stellarTxHash
paymentStatus
paidAt
createdAt
```

## 16.3 Payment Safety Rules

```text
Never ask for seed phrases.
Never ask for private keys.
Use testnet for MVP.
Show transaction hash clearly.
Show that payment is part of demo flow.
Do not imply full legal escrow if not implemented.
```

---

## 17. Soroban Contract Design

## 17.1 Contract Responsibilities

```text
Create request reference
Accept proof metadata
Verify proof or record verification result
Store verification status
Store access eligibility
Return access status
Emit contract events
```

## 17.2 Recommended Contract Functions

```text
create_request(request_id, tenant, listing_id, amount)
submit_proof(request_id, proof_hash, public_inputs)
verify_proof(request_id, proof_data)
get_access_status(request_id)
get_verification_status(request_id)
```

## 17.3 Recommended Contract Events

```text
RequestCreated
ProofSubmitted
ProofVerified
ProofFailed
AccessGranted
```

## 17.4 Contract Boundary

The smart contract should remain minimal in the MVP. It should focus on proof verification and access eligibility. Complex escrow, refunds, disputes, and production payment custody should be future improvements unless fully implemented.

---

## 18. ZK Proof Design

## 18.1 Proof Statement

```text
The tenant knows a valid payment reference or commitment that satisfies the required viewing fee for the selected property listing.
```

## 18.2 Private Inputs

```text
paymentSecret
tenantPaymentReference
tenantWalletData
```

## 18.3 Public Inputs

```text
listingId
requestId
requiredViewingFee
paymentCommitment
escrowContractAddress
```

## 18.4 Expected Output

```text
validPaymentCondition = true
```

## 18.5 What Remains Private

```text
Full wallet history
Unrelated transaction activity
Private payment reference
Tenant-side payment secret
```

## 18.6 What Is Public

```text
Request ID
Listing ID
Required viewing fee
Payment commitment
Verification result
```

## 18.7 ZK Flow

```text
Payment received
Backend creates payment commitment
Proof generation job starts
Proof is generated off-chain
Proof metadata is stored
Proof is submitted to verification service
Soroban verifies or records result
Proof status becomes VERIFIED or FAILED
```

---

## 19. Queue and Worker Design

Use Redis and BullMQ.

## 19.1 Required Queues

```text
proof-generation-queue
proof-verification-queue
notification-queue
analytics-queue
audit-log-queue
stellar-confirmation-queue
external-webhook-queue
trust-score-queue
```

## 19.2 Queue Use Cases

```text
Generate ZK proof asynchronously
Retry failed proof verification
Poll Stellar transaction confirmation
Send in-app notifications
Process audit logs
Update analytics
Deliver webhooks to external platforms
Recalculate trust scores
```

## 19.3 Failure Handling

```text
Retry failed jobs with backoff.
Move permanently failed jobs to dead-letter queue.
Record job failures in QueueJobLog.
Notify admin for critical failures.
Do not unlock viewing access if proof verification fails.
```

---

## 20. Notification Design

## 20.1 MVP Notifications

Use in-app notifications.

Notification triggers:

```text
Viewing request created
Payment pending
Payment received
Proof generation started
Proof generated
Proof submitted
Proof verified
Proof failed
Escrow/payment-hold status changed
Viewing code generated
Access unlocked
Report submitted
Report reviewed
```

## 20.2 Future Notification Channels

```text
Email
SMS
Push notifications
External platform webhooks
```

---

## 21. Audit Log Design

Audit logs must record important actions.

## 21.1 Events to Record

```text
User registered
Property created
Property approved
Viewing request created
Payment initiated
Payment received
Proof generation started
Proof generated
Proof submitted
Proof verified
Proof failed
Viewing code generated
Access unlocked
Listing reported
Report reviewed
Agent verified
Admin action performed
External API request received
```

## 21.2 Audit Log Fields

```text
id
actorId
actorRole
action
entityType
entityId
metadata
createdAt
```

---

## 22. Report and Trust-Safety Design

## 22.1 Fake Listing Reports

Tenants can report suspicious listings for reasons such as:

```text
Fake property
Suspicious agent
Wrong location
Duplicate listing
Payment scam
Misleading details
```

## 22.2 Agent Trust Profile

Agent profile should show:

```text
Agent name
Verification status
Listed properties
Verified viewing requests
Report count
Trust score
Last reviewed date
```

## 22.3 Trust Score MVP

For MVP, trust score can be simple and rule-based.

Example factors:

```text
Verified agent status
Number of verified viewing requests
Number of reports
Report severity
Admin review outcomes
```

---

## 23. Analytics Design

Analytics should track product and trust performance.

## 23.1 MVP Analytics

```text
Viewing requests created
Payments completed
Proofs generated
Proofs verified
Failed proofs
Viewing codes unlocked
Fake listing reports submitted
Average time from payment to access unlock
```

## 23.2 Production Analytics

```text
Manual verification removed
Reported scams reduced
Verified tenant inquiries increased
Agent trust score changes
Viewing request conversion rate
Platform adoption rate
API usage by rental platforms
```

---

## 24. External API Design

UrbanRentisha should expose APIs for external rental platforms.

## 24.1 External API Capabilities

```text
Create viewing request
Check request status
Verify proof status
Verify viewing code
Submit listing report
Retrieve agent trust profile
```

## 24.2 External API Security

```text
API keys
Rate limits
Request validation
Webhook signatures
Scoped permissions
Audit logging
Usage analytics
```

---

## 25. Demo Mode Design

Demo mode should allow judges to complete the full flow quickly.

## 25.1 Demo Mode Requirements

```text
Seeded tenant account
Seeded verified listings
Seeded verified agent
Seeded admin account
Guided demo steps
Stellar testnet path
Proof generation path
Proof verification path
Viewing code unlock
Admin audit log display
Manager dashboard display
```

## 25.2 Demo Fallback Strategy

If live proof generation or contract verification fails during a demo, the app may show a clearly labeled fallback state. The fallback must be honest and must not pretend that a failed live component succeeded.

Example label:

```text
Demo fallback: showing expected verification result from seeded test data.
```

---

## 26. Security Design

## 26.1 MVP Security

```text
Environment variables protected
Input validation on all APIs
Role-based access control
Protected dashboards
No private keys in frontend
No seed phrase collection
Safe error messages
Audit logging
Server-side authorization checks
```

## 26.2 Production Security

```text
Rate limiting
API key management
Webhook signature verification
Encrypted sensitive fields
Secrets manager
Admin activity review
Database backups
Monitoring and alerting
Security testing
```

---

## 27. Privacy Design

Privacy principles:

```text
Minimize tenant wallet data exposure.
Do not expose unrelated transaction activity.
Store proof metadata, not unnecessary private inputs.
Keep viewing codes private to eligible users.
Restrict report access to authorized users.
Restrict audit logs to admins.
Use ZK proof to prove payment condition without exposing full payment history.
```

---

## 28. Error Handling Design

## 28.1 Frontend Errors

```text
Payment failed
Proof generation failed
Proof verification failed
Network unavailable
Viewing code expired
Listing unavailable
Unauthorized access
Report submission failed
```

## 28.2 Backend Errors

```text
Validation error
Authentication error
Authorization error
Resource not found
Payment confirmation failed
Proof generation job failed
Soroban verification failed
Database error
Queue failure
External API failure
```

## 28.3 Error Rule

Viewing access must remain locked whenever payment, proof generation, or proof verification fails.

---

## 29. Observability and Monitoring

Track:

```text
API request latency
API error rate
Payment confirmation failures
Proof generation failures
Proof verification failures
Queue job failures
Database errors
External API failures
Admin actions
Security alerts
```

Recommended logs:

```text
Structured logs
Correlation IDs
Request IDs
User role context
Viewing request ID
Payment ID
Proof ID
Contract transaction hash
```

---

## 30. Testing Strategy

## 30.1 Frontend Testing

```text
Component tests
Form validation tests
Status tracker tests
Dashboard rendering tests
Responsive layout checks
Accessibility checks
```

## 30.2 Backend Testing

```text
Service unit tests
Controller tests
Auth guard tests
DTO validation tests
Database integration tests
Viewing request lifecycle tests
Payment status tests
Proof status tests
Viewing code tests
Report review tests
```

## 30.3 Blockchain and ZK Testing

```text
Soroban contract tests
Proof generation tests
Proof verification tests
Invalid proof tests
Failed payment tests
Access locked before verification test
Access unlocked after verification test
```

## 30.4 Demo Testing

```text
Demo tenant login works
Listings load
Request viewing works
Payment screen works
Proof generation works
Proof verification works
Viewing code unlocks
Admin audit log updates
Manager dashboard updates
```

---

## 31. Deployment Design

## 31.1 Development

```text
Local Next.js frontend
Local NestJS backend
Local PostgreSQL
Local Redis
Stellar testnet
Local proof service
Local Soroban contract testing
```

## 31.2 Staging

```text
Hosted frontend
Hosted backend
Managed PostgreSQL
Managed Redis
Stellar testnet contract
Seeded demo data
Demo accounts
Logging enabled
```

## 31.3 Production Direction

```text
Frontend deployed separately
Backend deployed separately
Managed database
Managed Redis
Separate queue workers
Separate ZK worker
Monitored Stellar service
CI/CD pipeline
Secrets management
Monitoring and alerting
```

---

## 32. CI/CD Design

Recommended pipeline:

```text
Install dependencies
Run linting
Run type checks
Run tests
Build frontend
Build backend
Run database migration check
Build Soroban contract
Run contract tests
Deploy frontend
Deploy backend
Run smoke tests
```

---

## 33. Scalability Roadmap

## 33.1 MVP

```text
Single frontend app
Single backend API
Single database
Single Redis instance
Basic proof service
Basic Soroban contract
```

## 33.2 Growth Stage

```text
Separate queue workers
Separate proof worker
External API client management
Webhook delivery system
Analytics dashboard
Rate limiting
API keys
```

## 33.3 Production Scale

```text
Dedicated proof infrastructure
Dedicated Stellar transaction service
Distributed queues
Caching layer
Read replicas
Monitoring and alerting
Separate notification service
Enterprise API gateway
Multi-tenant platform support
```

---

## 34. Known Limitations

```text
The MVP uses Stellar testnet, not mainnet.
The MVP does not implement full legal escrow.
The MVP may use simplified trust score logic.
The MVP may use in-app notifications only.
The MVP may use seeded demo data for some dashboard states.
The MVP proof statement should remain simple.
The MVP does not replace legal rental due diligence.
```

---

## 35. Future Improvements

```text
Production escrow integration
Mainnet payment support
Multi-asset payment support
Advanced agent verification
Identity proof integration
Automated trust score calculation
Email and SMS notifications
Webhook integrations
External rental platform SDK
Multi-language support
Advanced fraud detection
AI-assisted report triage
Production-grade compliance review
```

---

## 36. Developer Implementation Checklist

```text
Set up monorepo
Create Next.js frontend
Create NestJS backend
Create Prisma schema
Set up PostgreSQL
Set up Redis and BullMQ
Create auth module
Create listings module
Create viewing requests module
Create payment module
Create Stellar module
Create ZK proofs module
Create proof verification module
Create viewing code module
Create reports module
Create audit log module
Create analytics module
Create external API module
Create Soroban contract
Create proof circuit
Connect frontend to backend
Connect backend to Stellar
Connect backend to proof service
Connect backend to Soroban
Build demo mode
Seed demo data
Write README
Write API docs
Write ZK proof docs
Write contract docs
Test full demo flow
Record demo video
Submit project
```

---

## 37. Final Architecture Summary

UrbanRentisha TrustLayer uses a separated Next.js frontend and NestJS backend architecture supported by PostgreSQL, Prisma, Redis, BullMQ, Stellar testnet, Soroban smart contracts, and an off-chain ZK proof service.

The architecture is designed around one clear trust flow:

```text
A tenant requests viewing access.
The tenant pays through Stellar testnet.
The tenant generates a ZK payment proof.
Soroban verifies the proof.
UrbanRentisha unlocks a viewing code.
The admin audit log records the event.
```

This architecture keeps the MVP focused, demo-ready, and understandable while also creating a strong foundation for a future B2B SaaS rental trust infrastructure platform.
