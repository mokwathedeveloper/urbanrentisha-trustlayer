# UrbanRentisha TrustLayer System Design Prompt

## Purpose

Use this prompt to generate a complete professional system design for **UrbanRentisha TrustLayer**, a ZK-powered rental trust and payment-verification platform built on Stellar.

The output should guide architects, backend developers, frontend developers, Web3 developers, ZK engineers, DevOps engineers, and technical reviewers.

---

# Master System Design Prompt

Act as a senior software architect, Web3/blockchain engineer, backend engineer, frontend engineer, DevOps engineer, and security engineer with 30+ years of experience designing scalable SaaS platforms, fintech systems, marketplace infrastructure, blockchain applications, zero-knowledge proof systems, API products, dashboards, and trust-and-safety platforms.

I am building a product called **UrbanRentisha TrustLayer**.

## 1. Product Context

UrbanRentisha TrustLayer is a ZK-powered rental trust and payment-verification platform built on Stellar. It helps tenants safely request rental property viewing access by paying a viewing or reservation fee through Stellar testnet, generating a zero-knowledge proof, verifying that proof through a Stellar/Soroban smart contract, and unlocking a secure viewing code after verification succeeds.

The platform helps reduce fake listings, fake agents, unsafe viewing payments, manual payment verification, and rental fraud.

The product should be treated as a serious B2B SaaS trust infrastructure layer for rental platforms, property agencies, landlords, student housing providers, and real estate marketplaces.

It is not a full rental marketplace first. It is a trust, verification, payment-proof, anti-scam, and access-control layer.

The central product promise is:

```text
A tenant privately proves payment, Stellar verifies it, and UrbanRentisha unlocks safe property access.
```

---

## 2. Required Technology Stack

Design the system using the following stack:

### Frontend

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

### Backend

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

### Blockchain and ZK

```text
Stellar testnet
Soroban smart contracts
Stellar SDK
Noir or Circom proof system
Off-chain ZK proof generation service
On-chain proof verification or verification-state recording
```

### Infrastructure

```text
PostgreSQL database
Redis queue/cache
Frontend deployment
Backend deployment
Worker deployment
Environment-based configuration
CI/CD pipeline
Logging and monitoring
```

---

## 3. Required Product Features

The system must support the following features:

1. Tenant account
2. Property listing page
3. Verified property badge
4. Request viewing button
5. Stellar testnet payment
6. ZK payment proof generation
7. Stellar/Soroban smart contract proof verification
8. Unlock viewing details
9. Fake listing report button
10. Agent verification profile
11. Escrow/payment-hold status tracker
12. Viewing code generator
13. Notification system
14. Audit log
15. API for rental platforms
16. Tenant dashboard
17. Property manager dashboard
18. Admin dashboard
19. Proof status tracker
20. Demo mode for hackathon judges

---

## 4. Required User Roles

Design role-based experiences and backend permissions for:

```text
Tenant
Agent
Property Manager
Platform Administrator
External Rental Platform / API Client
```

Each role should only access actions and data relevant to its responsibility.

---

## 5. Core User Flow

Design the system around this main flow:

```text
Tenant opens app
Tenant views verified property listings
Tenant selects a property
Tenant requests viewing access
Backend creates viewing request
Tenant pays viewing fee through Stellar testnet
Backend records Stellar transaction reference
ZK proof is generated off-chain
Proof is submitted for Soroban verification
Soroban verifies proof or records verification result
Backend updates proof and access status
Viewing code is generated
Tenant receives notification
Viewing details are unlocked
Admin audit log records the full event
```

The system design must make it clear that viewing access remains locked until successful proof verification.

---

## 6. Required System Design Output

Create a complete system design that includes:

1. Executive technical summary
2. Architecture overview
3. System context diagram
4. High-level architecture diagram
5. Frontend architecture
6. Backend architecture
7. NestJS module architecture
8. Database architecture
9. Prisma model design
10. API design
11. Authentication and authorization design
12. Role-based access control design
13. Stellar payment flow
14. Soroban smart contract design
15. ZK proof generation design
16. Proof verification flow
17. Escrow/payment-hold status design
18. Viewing code generation design
19. Notification system design
20. Audit log design
21. Fake listing report design
22. Agent trust profile design
23. Analytics design
24. External rental-platform API design
25. Background queue design
26. Third-party integrations design
27. AI agent support design if needed
28. Demo mode system design
29. Error handling strategy
30. Loading and retry strategy
31. Observability and monitoring
32. Security design
33. Privacy design
34. Secrets management
35. Rate limiting and abuse prevention
36. Data validation strategy
37. Testing strategy
38. Deployment architecture
39. CI/CD workflow
40. Scalability roadmap
41. MVP architecture
42. Production architecture
43. Known limitations
44. Future improvements
45. Final developer-ready implementation checklist

---

## 7. Frontend Architecture Requirements

Design the frontend as a modular Next.js application.

The frontend should include:

```text
Public landing page
Signup/login
Tenant onboarding
Property listings
Property detail page
Request viewing screen
Stellar payment screen
ZK proof generation screen
Proof verification screen
Escrow/payment-hold status screen
Viewing code success screen
Notifications screen
Fake listing report screen
Tenant dashboard
Property manager dashboard
Admin dashboard
Audit log screen
API documentation page
Demo mode screen
Help/FAQ page
```

Frontend requirements:

```text
Use TypeScript strictly
Use Tailwind CSS theme tokens
Use reusable UI components
Use role-based route protection
Use TanStack Query for server state
Use React Hook Form for forms
Use Zod for frontend validation
Use clear loading, error, empty, and success states
Use readable dashboard layouts
Use mobile-first responsive design
```

---

## 8. Backend Architecture Requirements

Design the backend as a modular NestJS API.

Required modules:

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

Backend requirements:

```text
Use DTOs for request validation
Use role-based guards
Use centralized error handling
Use centralized audit logging
Use service-level business logic
Keep Stellar logic isolated in Stellar module
Keep ZK logic isolated in ZK Proof module
Keep queue logic isolated in Queues module
Keep analytics isolated in Analytics module
Keep external API clients isolated
Use Prisma for database access
Use Redis and BullMQ for background jobs
```

---

## 9. Database Design Requirements

Create a database design using PostgreSQL and Prisma.

Required models:

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

Include:

```text
Model fields
Relationships
Indexes
Unique constraints
Status enums
Audit fields
Soft delete strategy if needed
Security-sensitive fields
```

Required status enums:

```text
UserRole
ListingVerificationStatus
ViewingRequestStatus
PaymentStatus
ProofStatus
EscrowStatus
AccessStatus
ReportStatus
NotificationStatus
ApiClientStatus
```

---

## 10. API Design Requirements

Design REST APIs for:

### Auth APIs

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

### Listing APIs

```text
GET /api/listings
GET /api/listings/:id
POST /api/listings
PATCH /api/listings/:id
PATCH /api/listings/:id/approve
POST /api/listings/:id/report
```

### Viewing Request APIs

```text
POST /api/viewing-requests
GET /api/viewing-requests/:id
GET /api/viewing-requests/:id/status
PATCH /api/viewing-requests/:id/status
```

### Payment APIs

```text
POST /api/payments/create
POST /api/payments/confirm
GET /api/payments/:id/status
```

### ZK Proof APIs

```text
POST /api/proofs/generate
POST /api/proofs/submit
POST /api/proofs/verify
GET /api/proofs/:id/status
```

### Viewing Code APIs

```text
POST /api/viewing-codes/generate
GET /api/viewing-codes/:code/verify
PATCH /api/viewing-codes/:code/revoke
```

### Agent APIs

```text
GET /api/agents/:id/trust-profile
GET /api/agents/:id/listings
GET /api/agents/:id/reports
PATCH /api/agents/:id/verify
```

### Notification APIs

```text
GET /api/notifications
PATCH /api/notifications/:id/read
PATCH /api/notifications/read-all
```

### Admin APIs

```text
GET /api/admin/dashboard
GET /api/admin/audit-logs
GET /api/admin/reports
PATCH /api/admin/reports/:id/review
PATCH /api/admin/listings/:id/approve
PATCH /api/admin/agents/:id/verify
GET /api/admin/analytics
```

### External Platform APIs

```text
POST /api/external/viewing-requests
GET /api/external/viewing-requests/:id/status
POST /api/external/proofs/verify
POST /api/external/listings/:id/report
GET /api/external/agents/:id/trust-profile
GET /api/external/viewing-codes/:code/verify
```

For each API group, include:

```text
Purpose
Request body
Response body
Validation rules
Authorization rules
Error responses
Audit log events
```

---

## 11. Stellar and Soroban Requirements

Design the Stellar and Soroban layer.

The system should include:

```text
Stellar testnet payment flow
Payment reference generation
Transaction hash capture
Payment confirmation logic
Soroban contract deployment
Proof submission
Proof verification or verification-state recording
Access eligibility storage
Contract event reading
```

Recommended Soroban functions:

```text
create_request(request_id, tenant, listing_id, amount)
submit_proof(request_id, proof_hash, public_inputs)
verify_proof(request_id, proof_data)
get_access_status(request_id)
get_verification_status(request_id)
```

Recommended Soroban events:

```text
RequestCreated
ProofSubmitted
ProofVerified
ProofFailed
AccessGranted
```

The smart contract should stay minimal for the MVP and should not overbuild legal escrow logic.

---

## 12. ZK Proof Requirements

Design the ZK layer.

Recommended proof statement:

```text
The tenant knows a valid payment reference or commitment that satisfies the required viewing fee for the selected property listing.
```

Private inputs:

```text
paymentSecret
tenantPaymentReference
tenantWalletData
```

Public inputs:

```text
listingId
requestId
requiredViewingFee
paymentCommitment
escrowContractAddress
```

Expected output:

```text
validPaymentCondition = true
```

The system design should explain:

```text
What is proved
What remains private
What is public
Where proof is generated
Where proof is verified
How failed proofs are handled
How proof metadata is stored
How proof status updates the UI
```

---

## 13. Queue and Worker Requirements

Design background queues using Redis and BullMQ.

Required queues:

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

Explain:

```text
What each queue does
Which events trigger each queue
Retry strategy
Failure handling
Dead-letter strategy
Observability
```

---

## 14. Security Requirements

Design security for:

```text
Authentication
Authorization
Role-based access control
API keys for external clients
Rate limiting
Input validation
Output sanitization
Secrets management
Wallet safety
No seed phrase collection
No private key exposure
Audit logging
Admin action review
Webhook signature verification
Fraud report review
Sensitive data minimization
```

The system must never ask users for private keys or seed phrases.

---

## 15. Privacy Requirements

Design privacy protections for:

```text
Tenant wallet information
Payment references
Proof metadata
Viewing codes
Agent reports
Audit logs
Admin review records
External API data access
```

Explain how ZK supports privacy by proving the payment condition without exposing unnecessary wallet history or unrelated transaction activity.

---

## 16. Analytics Requirements

Design analytics for:

```text
Viewing requests created
Payments completed
Proofs generated
Proofs verified
Failed proofs
Viewing codes unlocked
Fake listing reports
Report review speed
Manual verification removed
Time from payment to access unlock
API usage by external platforms
```

Include dashboard metric recommendations.

---

## 17. Demo Mode Requirements

Design a reliable demo mode for hackathon judges.

Demo mode should include:

```text
Seeded tenant account
Seeded verified listings
Seeded agent profile
Stellar testnet payment path
Proof generation path
Proof verification path
Viewing code unlock
Admin audit log view
Manager dashboard view
Fast walkthrough in 2–3 minutes
```

Demo mode should be resilient. If live proof generation or contract verification fails during demonstration, include a clearly labeled fallback state while still showing the intended architecture honestly.

---

## 18. Output Format

Return the final answer in this structure:

1. Executive Technical Summary
2. Product and System Context
3. Architecture Goals
4. MVP Architecture
5. Production Architecture
6. System Context Diagram
7. High-Level Architecture Diagram
8. Core User Flow
9. Frontend Architecture
10. Backend Architecture
11. NestJS Module Design
12. Database Design
13. Prisma Schema Outline
14. API Design
15. Authentication and Authorization
16. Stellar Payment Design
17. Soroban Contract Design
18. ZK Proof Design
19. Queue and Worker Design
20. Notification Design
21. Audit Log Design
22. Report and Trust-Safety Design
23. Analytics Design
24. External API Design
25. Demo Mode Design
26. Security Design
27. Privacy Design
28. Error Handling
29. Observability
30. Testing Strategy
31. Deployment Design
32. CI/CD Design
33. Scalability Roadmap
34. Known Limitations
35. Future Improvements
36. Developer Implementation Checklist

---

## 19. Rules

Follow these rules:

```text
Do not make the system generic.
Make the architecture specific to rental fraud prevention, Stellar payments, ZK proof verification, viewing-code access control, verified agents, and B2B rental platforms.
Use Next.js for frontend.
Use NestJS for backend.
Use Prisma and PostgreSQL for data.
Use Redis and BullMQ for background queues.
Use Stellar testnet and Soroban for blockchain flow.
Use Noir or Circom for proof generation.
Keep the MVP realistic.
Keep the smart contract minimal.
Keep escrow as simplified payment-hold status unless production escrow is explicitly implemented.
Do not overpromise legal escrow.
Do not expose private keys or seed phrases.
Make the system developer-ready.
Use clear module boundaries.
Explain tradeoffs.
Include failure states.
Include security and privacy rules.
Prioritize one complete working trust flow over unnecessary marketplace complexity.
```

---

## 20. Final Instruction

Create a complete, professional, developer-ready system design for UrbanRentisha TrustLayer that can guide implementation, documentation, and hackathon delivery.

The design must show how the system enables this trust flow:

```text
Tenant requests viewing
Tenant pays through Stellar testnet
Tenant generates ZK proof
Soroban verifies proof
Viewing code unlocks
Admin audit log records the event
```

The final result should be clear enough for a senior developer to implement and clear enough for hackathon judges to understand.
