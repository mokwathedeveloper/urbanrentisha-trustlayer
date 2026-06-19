# UrbanRentisha TrustLayer Final Professional Development Roadmap

## 1. Product Direction

UrbanRentisha TrustLayer is a ZK-powered rental trust and payment-verification platform built on Stellar. The product helps tenants safely request verified property viewing access by paying a viewing or reservation fee through Stellar testnet, generating a zero-knowledge proof, verifying that proof through a Stellar/Soroban smart contract, and unlocking a secure viewing code only after successful verification.

The product is not positioned as a full rental marketplace. It is positioned as a trust, verification, anti-scam, payment-proof, and access-control infrastructure layer for rental platforms, property agencies, landlords, student housing providers, and real estate marketplaces.

The central product promise is:

> A tenant privately proves payment, Stellar verifies it, and UrbanRentisha unlocks safe property access.

---

## 2. Final Technology Stack

### 2.1 Frontend Stack

The frontend will be built using modern, type-safe, scalable web technologies.

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

### 2.2 Backend Stack

The backend will be built using NestJS because the product requires a serious service architecture for payments, proof processing, notifications, analytics, audit logs, integrations, queues, and external APIs.

```text
NestJS
TypeScript
Prisma ORM
PostgreSQL
class-validator or Zod
JWT or session authentication
REST API
Background queues
Redis
BullMQ
```

### 2.3 Blockchain and ZK Stack

```text
Stellar testnet
Soroban smart contracts
Stellar SDK
Noir or Circom proof system
ZK proof generation service
Proof verification service
```

### 2.4 Design and UI Stack

```text
Tailwind CSS
shadcn/ui component foundation
lucide-react icons
Google Fonts
Inter for body text
Space Grotesk for headings
IBM Plex Mono for technical data
```

### 2.5 Database and Infrastructure

```text
PostgreSQL
Prisma ORM
Redis for queues and caching
Environment-based configuration
Vercel or Netlify for frontend
Render, Railway, Fly.io, or similar for backend
Managed PostgreSQL
Managed Redis
```

---

## 3. Final Architecture Decision

UrbanRentisha TrustLayer will use a separated frontend and backend architecture.

```text
Frontend:
Next.js + TypeScript + Tailwind CSS

Backend:
NestJS + TypeScript + Prisma + PostgreSQL

Blockchain:
Stellar testnet + Soroban smart contract

ZK:
Off-chain proof generation + on-chain verification or verification recording

Infrastructure:
PostgreSQL + Redis + queue workers + deployment environments
```

This architecture is stronger than a simple full-stack Next.js MVP because the selected product scope includes proof service, notification service, background queues, third-party integrations, external API clients, analytics, audit logs, and B2B API access.

---

## 4. Backend Strategy with NestJS

UrbanRentisha TrustLayer will use NestJS as the dedicated backend framework and Next.js as the frontend framework. This architecture is suitable for a serious SaaS product because the platform requires structured APIs, role-based access, database operations, proof processing, Stellar transaction handling, notifications, audit logs, analytics, and external rental-platform integrations.

The frontend will focus on the user experience, including property listings, tenant dashboard, manager dashboard, admin dashboard, payment screens, proof status tracking, viewing code unlock, demo mode, and API documentation.

The NestJS backend will manage the core business logic and service layer. It will handle tenant accounts, property listings, viewing requests, Stellar payment records, ZK proof records, proof verification results, escrow or payment-hold status, viewing codes, fake listing reports, notifications, audit logs, analytics, and API access for external rental platforms.

A separate backend is justified because the project includes:

```text
Proof service
Notification service
Background queues
Third-party integrations
External API clients
Analytics
Audit logs
Role-based dashboards
Stellar transaction service
ZK verification workflow
```

---

## 5. High-Level System Architecture

```text
Tenant / Manager / Admin UI
        ↓
Next.js Frontend
        ↓
NestJS API Gateway
        ↓
Business Services
        ↓
PostgreSQL + Redis
        ↓
Stellar Service + ZK Proof Service
        ↓
Soroban Smart Contract
        ↓
Proof Verification Result
        ↓
Viewing Code Unlock
```

The system flow should remain simple and judge-friendly:

```text
Tenant selects verified property
Tenant requests viewing
Backend creates viewing request
Tenant pays viewing fee on Stellar testnet
Backend records payment reference
ZK proof is generated off-chain
Proof is submitted for Soroban verification
Verification result is stored
Viewing code is generated
Tenant unlocks property viewing access
Admin audit log records the full event
```

---

## 6. Recommended Monorepo Structure

```text
urbanrentisha-trustlayer/
├── apps/
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── styles/
│   │   └── public/
│   │
│   └── api/
│       ├── src/
│       │   ├── auth/
│       │   ├── users/
│       │   ├── tenants/
│       │   ├── agents/
│       │   ├── listings/
│       │   ├── viewing-requests/
│       │   ├── payments/
│       │   ├── stellar/
│       │   ├── zk-proofs/
│       │   ├── proof-verification/
│       │   ├── escrow/
│       │   ├── viewing-codes/
│       │   ├── notifications/
│       │   ├── reports/
│       │   ├── audit-logs/
│       │   ├── analytics/
│       │   ├── external-api/
│       │   ├── integrations/
│       │   ├── queues/
│       │   ├── admin/
│       │   ├── common/
│       │   └── prisma/
│       └── test/
│
├── packages/
│   ├── database/
│   │   ├── prisma/
│   │   └── seed/
│   │
│   ├── contracts/
│   │   ├── soroban/
│   │   └── tests/
│   │
│   ├── zk/
│   │   ├── circuits/
│   │   ├── proofs/
│   │   └── verifier/
│   │
│   └── shared/
│       ├── types/
│       ├── constants/
│       └── utils/
│
├── docs/
│   ├── PRD.md
│   ├── ROADMAP.md
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── ZK_PROOF.md
│   ├── CONTRACTS.md
│   └── DEMO_SCRIPT.md
│
├── README.md
├── package.json
├── pnpm-workspace.yaml
├── .env.example
└── turbo.json
```

---

## 7. User Roles

### 7.1 Tenant

The tenant requests viewing access, pays the viewing fee, generates proof, verifies proof, receives a viewing code, tracks notifications, and reports suspicious listings.

### 7.2 Agent or Landlord

The agent manages listed properties, receives viewing requests, sees verified tenants, tracks viewing codes, receives reports, and monitors trust score.

### 7.3 Property Manager

The property manager oversees multiple properties, views payment and proof statuses, handles verified requests, and monitors operational trust.

### 7.4 Platform Administrator

The administrator approves listings, verifies agents, reviews fake listing reports, monitors proof verification activity, reviews audit logs, and manages suspicious activity.

### 7.5 External Rental Platform

An external platform can connect through the API to create viewing requests, check proof status, verify viewing codes, retrieve agent trust profiles, and submit reports.

---

## 8. Core Pages and Screens

### 8.1 Public Screens

```text
Landing page
Help/FAQ page
API documentation page
Demo mode screen
```

### 8.2 Authentication Screens

```text
Signup
Login
Tenant onboarding
Wallet connection
Role selection
```

### 8.3 Tenant Screens

```text
Property listing page
Property detail page
Search and filter page
Request viewing screen
Stellar payment screen
ZK proof generation screen
Proof verification screen
Escrow status screen
Viewing code success screen
Notifications screen
Fake listing report screen
Tenant dashboard
Viewing history
```

### 8.4 Agent and Manager Screens

```text
Property manager dashboard
Listed properties
Viewing requests
Verified tenants
Escrow statuses
Generated viewing codes
Reports received
Agent trust profile
Agent verification status
```

### 8.5 Admin Screens

```text
Admin dashboard
Property approvals
Agent verification
Fake listing reports
Proof verification activity
Escrow monitoring
Audit log screen
Suspicious activity
Platform metrics
API client management
```

---

## 9. Core Backend Modules

The NestJS backend should be organized around product domains.

```text
Auth Module
Users Module
Tenants Module
Agents Module
Listings Module
Viewing Requests Module
Payments Module
Stellar Module
ZK Proofs Module
Proof Verification Module
Escrow Module
Viewing Codes Module
Notifications Module
Reports Module
Audit Logs Module
Analytics Module
External API Module
Third-Party Integrations Module
Queues Module
Admin Module
Prisma Module
Common Module
```

---

## 10. Backend Service Responsibilities

### Auth Service

Manages login, registration, JWT/session authentication, role-based access, and wallet-linked identity.

### User Service

Manages shared user data across tenant, agent, manager, and admin roles.

### Property Listing Service

Creates, reads, updates, approves, and verifies property listings.

### Viewing Request Service

Creates viewing requests and tracks the full request lifecycle.

### Payment Service

Records payment intent, payment status, asset type, amount, transaction hash, and payment confirmation state.

### Stellar Transaction Service

Handles Stellar testnet payment references, wallet addresses, transaction hashes, and Stellar-related verification data.

### ZK Proof Service

Triggers or manages off-chain proof generation and stores proof metadata.

### Proof Verification Service

Submits proof data for verification and records verification results.

### Escrow Status Service

Tracks simplified payment-hold status such as pending, active, released, refunded, or failed.

### Viewing Code Service

Generates and validates unique viewing codes linked to tenants, properties, and viewing requests.

### Notification Service

Creates in-app notifications for payment, proof, escrow, report, and access events.

### Report Listing Service

Allows tenants to report suspicious listings and allows admins to review those reports.

### Agent Trust Profile Service

Tracks verification status, report count, verified requests, listed properties, and trust score.

### Audit Log Service

Records important system actions for transparency and dispute review.

### Analytics Service

Provides platform metrics, conversion metrics, verification metrics, and fraud-safety indicators.

### External API Client Service

Supports B2B rental-platform integrations.

### Third-Party Integration Service

Manages future external services such as email, SMS, identity checks, property data providers, and analytics tools.

### Background Queue Service

Handles asynchronous work such as proof generation, notifications, analytics updates, report processing, and external API sync.

---

## 11. Database Roadmap

### 11.1 Core Models

```text
User
TenantProfile
AgentProfile
PropertyListing
ViewingRequest
PaymentRecord
ZKProof
ProofVerification
EscrowStatus
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

### 11.2 User Model

Important fields:

```text
id
name
email
walletAddress
role
status
createdAt
updatedAt
```

### 11.3 PropertyListing Model

Important fields:

```text
id
title
location
rentAmount
viewingFee
imageUrl
agentId
verificationStatus
isActive
createdAt
updatedAt
```

### 11.4 ViewingRequest Model

Important fields:

```text
id
tenantId
propertyId
agentId
paymentStatus
proofStatus
escrowStatus
accessStatus
viewingCodeId
createdAt
updatedAt
```

### 11.5 PaymentRecord Model

Important fields:

```text
id
viewingRequestId
tenantWallet
amount
asset
stellarTxHash
paymentStatus
paidAt
createdAt
```

### 11.6 ZKProof Model

Important fields:

```text
id
viewingRequestId
proofHash
publicInputs
proofStatus
generatedAt
createdAt
```

### 11.7 ProofVerification Model

Important fields:

```text
id
proofId
contractAddress
verificationTxHash
verificationStatus
verifiedAt
createdAt
```

### 11.8 ViewingCode Model

Important fields:

```text
id
code
tenantId
propertyId
viewingRequestId
status
expiresAt
createdAt
```

### 11.9 ListingReport Model

Important fields:

```text
id
listingId
reporterId
agentId
reason
description
status
reviewedBy
reviewedAt
createdAt
```

### 11.10 AuditLog Model

Important fields:

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

## 12. Recommended Status Enums

### 12.1 User Role

```text
TENANT
AGENT
MANAGER
ADMIN
API_CLIENT
```

### 12.2 Listing Verification Status

```text
PENDING
VERIFIED
REJECTED
SUSPENDED
```

### 12.3 Viewing Request Status

```text
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
```

### 12.4 Payment Status

```text
PENDING
INITIATED
RECEIVED
FAILED
REFUNDED
```

### 12.5 Proof Status

```text
NOT_STARTED
GENERATING
GENERATED
SUBMITTED
VERIFIED
FAILED
```

### 12.6 Escrow Status

```text
NOT_STARTED
PENDING
ACTIVE
RELEASED
REFUNDED
FAILED
```

### 12.7 Access Status

```text
LOCKED
UNLOCKED
EXPIRED
REVOKED
```

### 12.8 Report Status

```text
OPEN
UNDER_REVIEW
RESOLVED
DISMISSED
```

---

## 13. API Roadmap

### 13.1 Authentication APIs

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

### 13.2 Listing APIs

```text
GET /api/listings
GET /api/listings/:id
POST /api/listings
PATCH /api/listings/:id
PATCH /api/listings/:id/approve
POST /api/listings/:id/report
```

### 13.3 Viewing Request APIs

```text
POST /api/viewing-requests
GET /api/viewing-requests/:id
GET /api/viewing-requests/:id/status
PATCH /api/viewing-requests/:id/status
```

### 13.4 Payment APIs

```text
POST /api/payments/create
POST /api/payments/confirm
GET /api/payments/:id/status
```

### 13.5 ZK Proof APIs

```text
POST /api/proofs/generate
POST /api/proofs/submit
POST /api/proofs/verify
GET /api/proofs/:id/status
```

### 13.6 Viewing Code APIs

```text
POST /api/viewing-codes/generate
GET /api/viewing-codes/:code/verify
PATCH /api/viewing-codes/:code/revoke
```

### 13.7 Agent APIs

```text
GET /api/agents/:id/trust-profile
GET /api/agents/:id/listings
GET /api/agents/:id/reports
PATCH /api/agents/:id/verify
```

### 13.8 Notification APIs

```text
GET /api/notifications
PATCH /api/notifications/:id/read
PATCH /api/notifications/read-all
```

### 13.9 Admin APIs

```text
GET /api/admin/dashboard
GET /api/admin/audit-logs
GET /api/admin/reports
PATCH /api/admin/reports/:id/review
PATCH /api/admin/listings/:id/approve
PATCH /api/admin/agents/:id/verify
GET /api/admin/analytics
```

### 13.10 External Platform APIs

```text
POST /api/external/viewing-requests
GET /api/external/viewing-requests/:id/status
POST /api/external/proofs/verify
POST /api/external/listings/:id/report
GET /api/external/agents/:id/trust-profile
GET /api/external/viewing-codes/:code/verify
```

---

## 14. Smart Contract Roadmap

The Soroban contract should remain minimal and reliable for the hackathon. It should not attempt to become a full escrow system.

### 14.1 Contract Responsibilities

```text
Create viewing request reference
Accept submitted proof metadata
Verify proof or record verification result
Store access eligibility
Return proof verification status
Return access status
Emit verification events
```

### 14.2 Recommended Contract Functions

```text
create_request(request_id, tenant, listing_id, amount)
submit_proof(request_id, proof_hash, public_inputs)
verify_proof(request_id, proof_data)
get_access_status(request_id)
get_verification_status(request_id)
```

### 14.3 Recommended Contract Events

```text
RequestCreated
ProofSubmitted
ProofVerified
ProofFailed
AccessGranted
```

### 14.4 Smart Contract MVP Boundary

For the MVP, the smart contract should focus on proof verification status and access eligibility. Escrow should remain a simplified payment-hold status in the product layer unless there is enough time to implement more advanced contract-based escrow.

---

## 15. ZK Proof Roadmap

### 15.1 Recommended Proof System

Use Noir for the first version because it is more readable and easier to explain in a hackathon setting.

Use Circom only if verification cost becomes the top priority.

Use RISC Zero only if the team wants to prove a more complex off-chain computation.

### 15.2 Proof Statement

```text
The tenant knows a valid payment reference or commitment that satisfies the required viewing fee for the selected property listing.
```

### 15.3 Private Inputs

```text
paymentSecret
tenantPaymentReference
tenantWalletData
```

### 15.4 Public Inputs

```text
listingId
requestId
requiredViewingFee
paymentCommitment
escrowContractAddress
```

### 15.5 Expected Output

```text
validPaymentCondition = true
```

### 15.6 ZK Service Responsibilities

```text
Receive payment reference
Create or retrieve payment commitment
Generate proof off-chain
Store proof metadata
Submit proof for verification
Update proof status
Emit audit event
Notify tenant
```

---

## 16. Queue and Background Job Roadmap

Use Redis and BullMQ with NestJS for background work.

### 16.1 Queue Use Cases

```text
ZK proof generation
Proof verification retry
Notification dispatch
Audit log processing
Analytics event processing
External API webhook delivery
Report review processing
Trust score recalculation
Stellar transaction confirmation polling
```

### 16.2 Queue Names

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

---

## 17. Notification Roadmap

### 17.1 MVP Notifications

For the MVP, use in-app notifications only.

Notification triggers:

```text
Viewing request created
Payment pending
Payment received
Proof generation started
Proof generated
Proof verification submitted
Proof verified
Access unlocked
Viewing code generated
Listing report submitted
Report reviewed
```

### 17.2 Future Notifications

```text
Email notifications
SMS notifications
Push notifications
Webhook notifications for external platforms
```

---

## 18. Analytics Roadmap

The analytics service should measure product, trust, and verification performance.

### 18.1 Hackathon Metrics

```text
Number of viewing requests
Number of completed payments
Number of generated proofs
Number of verified proofs
Number of unlocked viewing codes
Number of failed proof attempts
Number of fake listing reports
Average time from payment to access unlock
```

### 18.2 Future Business Metrics

```text
Reduction in manual payment checks
Reduction in reported scam listings
Increase in verified tenant inquiries
Agent trust score changes
Viewing request conversion rate
Platform adoption rate
API usage by rental platforms
```

---

## 19. UI Component Roadmap

### 19.1 Core Components

```text
Button
Input
Select
Textarea
Card
Badge
Status Pill
Modal
Drawer
Toast
Tabs
Stepper
Data Table
Search Bar
Filter Panel
Dashboard Sidebar
Top Navigation
Empty State
Loading State
Error State
Success State
```

### 19.2 Product-Specific Components

```text
Verified Property Badge
Agent Trust Card
Viewing Request Card
Payment Status Card
Proof Status Tracker
Escrow Status Tracker
Viewing Code Card
Fake Listing Report Form
Audit Log Row
API Endpoint Card
Demo Mode Banner
Stellar Transaction Card
ZK Proof Summary Card
```

---

## 20. Frontend Development Roadmap

### Phase 1: Frontend Foundation

Deliverables:

```text
Next.js project setup
TypeScript configured
Tailwind CSS configured
Google Fonts configured
shadcn/ui configured
lucide-react installed
Theme tokens created
Base layout created
Responsive navigation created
Reusable UI components created
```

### Phase 2: Public and Auth Pages

Deliverables:

```text
Landing page
Signup page
Login page
Tenant onboarding
Help/FAQ page
Demo mode entry screen
```

### Phase 3: Tenant Flow Pages

Deliverables:

```text
Property listing page
Property details page
Search and filter UI
Request viewing screen
Stellar payment screen
ZK proof generation screen
Proof verification screen
Escrow status screen
Viewing code success screen
Notifications screen
Tenant dashboard
Fake listing report screen
```

### Phase 4: Manager and Admin Dashboards

Deliverables:

```text
Property manager dashboard
Agent profile page
Viewing requests table
Reports received table
Admin dashboard
Audit log screen
Fake listing review screen
Proof verification activity screen
Analytics cards
```

### Phase 5: API Portal

Deliverables:

```text
API overview page
Endpoint cards
Example request blocks
Example response blocks
Authentication notes
Integration guide
Developer-friendly documentation layout
```

---

## 21. Backend Development Roadmap

### Phase 1: NestJS Foundation

Deliverables:

```text
NestJS project setup
TypeScript configured
Prisma configured
PostgreSQL connected
Environment config added
Global validation pipes added
Error handling added
Response formatting added
Logging added
```

### Phase 2: Auth and Users

Deliverables:

```text
User model
Tenant profile
Agent profile
Admin role
JWT/session auth
Role-based guards
Login endpoint
Register endpoint
Current user endpoint
```

### Phase 3: Listings and Viewing Requests

Deliverables:

```text
Listing CRUD
Listing approval
Viewing request creation
Viewing request status tracking
Property-agent-tenant linking
Request lifecycle logic
```

### Phase 4: Payments and Stellar

Deliverables:

```text
Payment record model
Payment creation endpoint
Payment confirmation endpoint
Stellar transaction hash capture
Stellar service module
Payment status update
Audit log on payment received
```

### Phase 5: ZK Proof and Verification

Deliverables:

```text
ZK proof model
Proof generation endpoint
Proof service module
Proof verification module
Proof status update
Verification result storage
Audit log on proof verified
Notification on proof status changes
```

### Phase 6: Viewing Codes and Escrow Status

Deliverables:

```text
Viewing code generation
Viewing code verification
Access status update
Escrow status tracking
Viewing code expiration
Code revoke endpoint
```

### Phase 7: Reports, Trust, and Admin

Deliverables:

```text
Fake listing report endpoint
Report review endpoint
Agent trust profile endpoint
Trust score calculation
Admin dashboard endpoint
Audit log endpoint
Suspicious activity endpoint
```

### Phase 8: Queues, Notifications, Analytics, Integrations

Deliverables:

```text
Redis setup
BullMQ setup
Notification queue
Proof generation queue
Analytics queue
External webhook queue
Analytics event model
External API client module
Third-party integration module
```

---

## 22. Integration Roadmap

### 22.1 Frontend to Backend

```text
Connect auth flows
Connect listing data
Connect viewing request creation
Connect payment status
Connect proof status
Connect viewing code unlock
Connect dashboard data
Connect audit logs
```

### 22.2 Backend to Stellar

```text
Create payment reference
Track Stellar transaction hash
Confirm payment status
Submit proof verification transaction
Store contract response
Emit audit event
```

### 22.3 Backend to ZK Service

```text
Trigger proof generation
Receive proof output
Store proof metadata
Submit proof to verification flow
Update proof status
Notify frontend
```

### 22.4 Smart Contract to Product State

```text
Proof verified on-chain
Verification result returned
Backend records result
Viewing request status updated
Viewing code generated
Tenant receives access
Admin audit log updated
```

---

## 23. Testing Roadmap

### 23.1 Frontend Testing

```text
Component testing
Page rendering tests
Form validation tests
Status tracker tests
Dashboard table tests
Responsive layout checks
Accessibility checks
```

### 23.2 Backend Testing

```text
Unit tests for services
Controller tests
Validation tests
Auth guard tests
Database integration tests
Payment status tests
Proof status tests
Viewing code tests
Report review tests
```

### 23.3 Blockchain and ZK Testing

```text
Soroban contract tests
Proof generation tests
Proof verification tests
Invalid proof tests
Failed payment tests
Access locked before verification test
Access unlocked after verification test
```

### 23.4 Demo Flow Testing

```text
Tenant can login
Tenant can view listings
Tenant can request viewing
Tenant can complete payment flow
Tenant can generate proof
Tenant can verify proof
Tenant can unlock code
Admin can see audit log
Manager can see verified request
```

---

## 24. Security Roadmap

### 24.1 MVP Security

```text
Environment variable protection
Input validation
Role-based access control
Protected dashboard routes
Server-side authorization
Safe error messages
No private keys in frontend
No seed phrases requested
No sensitive proof data exposed in UI
```

### 24.2 Production Security

```text
Rate limiting
API key management
Webhook signature verification
Audit log immutability strategy
Encrypted sensitive fields
Secrets manager
Monitoring and alerting
Database backups
Admin activity review
Security testing
```

---

## 25. Deployment Roadmap

### 25.1 Development Environment

```text
Local Next.js frontend
Local NestJS backend
Local PostgreSQL
Local Redis
Stellar testnet
Local proof service
```

### 25.2 Staging Environment

```text
Hosted frontend
Hosted backend
Managed PostgreSQL
Managed Redis
Soroban testnet contract
Seeded demo data
Demo tenant account
Demo manager account
Demo admin account
```

### 25.3 Production-Ready Direction

```text
Frontend deployed separately
Backend deployed separately
Database managed
Redis managed
Queue workers separated
ZK proof worker separated
Stellar service monitored
Analytics enabled
External API keys managed
```

---

## 26. Hackathon Delivery Plan

### Day 1: Final Setup

```text
Confirm scope
Create repository
Set up monorepo
Set up frontend
Set up backend
Set up database
Add design system tokens
```

### Day 2: UI Foundation

```text
Build landing page
Build auth screens
Build dashboard shell
Build reusable components
Add seeded data
```

### Day 3: Tenant Property Flow

```text
Build listing page
Build property detail page
Build request viewing flow
Build tenant dashboard
```

### Day 4: Backend Core Models

```text
Create Prisma schema
Add seed data
Build user APIs
Build listing APIs
Build viewing request APIs
Add audit log service
```

### Day 5: Payment Flow

```text
Build payment screen
Add payment APIs
Integrate Stellar testnet payment reference
Record transaction hash
Update payment status
```

### Day 6: ZK Proof Flow

```text
Create proof service
Create proof generation endpoint
Build proof generation UI
Store proof metadata
Add proof status tracker
```

### Day 7: Soroban Contract

```text
Create Soroban contract scaffold
Add request and verification functions
Deploy to Stellar testnet
Connect backend to contract
Record verification result
```

### Day 8: Access Unlock

```text
Generate viewing code
Unlock access after verification
Build viewing code success screen
Add tenant notification
Add admin audit log entry
```

### Day 9: Reports and Trust Features

```text
Build report listing flow
Build agent verification profile
Build trust score display
Build report review admin screen
```

### Day 10: Manager and Admin Dashboards

```text
Build manager dashboard
Build admin dashboard
Build proof activity view
Build audit log screen
Build platform metrics cards
```

### Day 11: API Portal

```text
Build API docs page
Add endpoint cards
Add example request and response blocks
Add API integration story
```

### Day 12: Queue, Analytics, and Polish

```text
Add basic queue structure
Add notification queue
Add analytics events
Improve empty states
Improve loading states
Improve error states
```

### Day 13: Demo Mode and Documentation

```text
Build demo mode
Create one-click demo flow
Write README
Write architecture document
Write API document
Write ZK proof document
Write demo script
```

### Day 14: Final Testing and Submission

```text
Test full tenant flow
Test admin audit flow
Test failed proof state
Test report listing state
Record demo video
Prepare submission
Push final repo
Submit hackathon entry
```

---

## 27. Build Priority

### 27.1 Must Work Fully

```text
Property listing
Property detail
Request viewing
Stellar payment
ZK proof generation
Soroban proof verification
Viewing code unlock
Tenant dashboard
Admin audit log
Demo mode
```

### 27.2 Should Work Simply

```text
Fake listing report
Agent verification profile
Escrow status tracker
Property manager dashboard
Notifications
API documentation page
Analytics cards
```

### 27.3 Can Be Simulated for MVP

```text
Advanced escrow release and refund
Automated trust score recalculation
Email and SMS notifications
Production tenant identity verification
Production agency onboarding
Third-party property verification
Full external API client onboarding
```

---

## 28. README Roadmap

The README should include:

```text
Project name
Short description
Problem
Solution
How ZK is used
How Stellar is used
Core user flow
Screenshots or demo GIF
Architecture diagram
Technology stack
Repository structure
Setup instructions
Environment variables
API routes
Smart contract notes
ZK proof notes
Demo instructions
Known limitations
Future roadmap
Team
License
```

---

## 29. Documentation Roadmap

Create these files inside the `docs` folder:

```text
PRD.md
ROADMAP.md
ARCHITECTURE.md
API.md
ZK_PROOF.md
CONTRACTS.md
DATABASE.md
DEMO_SCRIPT.md
SUBMISSION_NOTES.md
```

---

## 30. Final Developer Rules

```text
Use TypeScript strictly.
Avoid any unless absolutely necessary.
Use DTOs for all NestJS request bodies.
Validate all API inputs.
Use enums for status values.
Keep blockchain logic inside the Stellar module.
Keep ZK logic inside the ZK Proof module.
Keep queue logic inside the Queues module.
Keep analytics isolated in the Analytics module.
Keep audit logging centralized.
Never expose private keys in the frontend.
Never ask users for seed phrases.
Keep demo mode simple and reliable.
Document limitations honestly.
Prioritize the central trust flow over extra marketplace complexity.
```

---

## 31. Final Roadmap Summary

UrbanRentisha TrustLayer should be built as a serious rental trust infrastructure product using a separated Next.js frontend and NestJS backend. The frontend should deliver a clean, human, trust-first user experience using Tailwind CSS, Google Fonts, and lucide-react icons. The backend should manage structured product logic through NestJS modules, Prisma, PostgreSQL, Redis queues, Stellar services, ZK proof services, notifications, analytics, integrations, and audit logs.

The first build priority is one complete trust flow:

```text
Tenant selects verified property
Tenant requests viewing
Tenant pays through Stellar testnet
Tenant generates a ZK proof
Soroban verifies the proof
UrbanRentisha unlocks a viewing code
Admin audit log records the event
```

Everything else, including dashboards, fake listing reports, agent trust profiles, escrow status, notifications, analytics, and API access, should support this central trust flow.

The final product should feel modern, secure, human, professional, and B2B-ready.
