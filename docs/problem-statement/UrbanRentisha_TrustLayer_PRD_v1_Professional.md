# UrbanRentisha TrustLayer

## Product Requirements Document

**Product name:** UrbanRentisha TrustLayer  
**Product type:** B2B SaaS trust, payment-verification, and rental-access layer  
**Hackathon:** Stellar Hacks: Real-World ZK  
**Version:** 1.0  
**Date:** 18 June 2026  
**Primary chain:** Stellar testnet  
**Smart contract environment:** Soroban  
**ZK approach:** Off-chain proof generation with on-chain proof verification  
**Recommended MVP proof stack:** Circom + Groth16 or Noir + UltraHonk, depending on implementation speed and verifier readiness  

---

## 1. Executive Summary

UrbanRentisha TrustLayer is a trust and payment-verification layer for rental marketplaces, property agencies, landlords, student housing platforms, and real estate operators. The product reduces rental scams by allowing tenants to prove that a required viewing fee, reservation fee, or payment-hold condition has been satisfied without exposing unnecessary wallet details, full transaction history, or private financial activity.

The product uses zero-knowledge proof technology to generate a private proof off-chain and verifies that proof through a Stellar Soroban smart contract. Once the proof is verified, the tenant receives controlled access to viewing details, a unique viewing code, agent contact information, or appointment instructions.

The hackathon MVP focuses on a single complete and judge-friendly flow: a tenant selects a verified rental listing, requests viewing access, pays a small testnet fee on Stellar, generates a zero-knowledge payment proof, submits the proof to a Soroban verifier contract, and unlocks viewing access only after verification succeeds.

UrbanRentisha TrustLayer is not intended to be a full rental marketplace in the MVP. It is a reusable verification infrastructure layer that rental platforms can integrate to reduce fraud, replace fakeable screenshots, automate proof of payment, and create a reliable audit trail.

---

## 2. Product Thesis

Rental fraud often happens because payment confirmation and property verification are handled through weak trust signals such as screenshots, phone calls, informal receipts, mobile money messages, or unverifiable agent claims. Tenants may pay viewing fees or reservation deposits to fake agents, while legitimate property managers waste time confirming whether tenants are serious and whether payments are real.

UrbanRentisha TrustLayer introduces a verifiable trust layer between tenants and rental platforms. Instead of asking tenants to expose wallet activity or send manual proof of payment, the tenant proves that a defined payment condition has been met. The platform receives a cryptographic verification result, not sensitive financial history.

The product is strongest when positioned as:

> A ZK-powered rental trust layer on Stellar that verifies payment eligibility and unlocks property access without exposing unnecessary tenant financial data.

---

## 3. Problem Statement

Rental marketplaces and property agencies face persistent trust problems. Fake agents, duplicate listings, non-existent properties, and payment scams make tenants hesitant to pay viewing or reservation fees. At the same time, legitimate agencies need a reliable way to filter serious tenants and control access to private viewing details.

Existing verification methods are weak. Screenshots can be edited. Payment messages can be forwarded or faked. Manual confirmation is slow. Public wallet inspection may expose more information than necessary. Informal verification also creates poor auditability when disputes arise.

UrbanRentisha TrustLayer solves this by using Stellar for payment flow and zero-knowledge proof verification for privacy-preserving access control. The tenant proves that the required payment condition for a specific property was satisfied, while the platform avoids manual receipt checks and unnecessary data exposure.

---

## 4. Target Customers and Users

### 4.1 Primary B2B Customers

- Rental marketplaces
- Property management companies
- Real estate agencies
- Student housing platforms
- Co-living operators
- Landlord networks
- Large landlords managing multiple units

### 4.2 End Users

- Tenants seeking safe rental access
- Agents and landlords managing listings
- Property managers reviewing viewing requests
- Platform administrators managing trust, verification, and reports

---

## 5. Core Personas

### 5.1 Tenant

The tenant wants to find a legitimate rental property, avoid fake agents, and access viewing details only after completing a trusted payment step. The tenant does not want to expose full wallet history, unrelated transactions, or unnecessary personal financial information.

### 5.2 Property Manager

The property manager wants only verified tenants to access private viewing details. They want to reduce spam, avoid fake inquiries, and remove manual payment confirmation.

### 5.3 Agent or Landlord

The agent or landlord wants to show verified listings, receive serious viewing requests, maintain a trustworthy profile, and reduce disputes around payment and access.

### 5.4 Platform Administrator

The administrator wants to verify listings and agents, review suspicious activity, monitor proof verification, audit payment-related events, and manage reports of fake listings.

### 5.5 Rental Marketplace Operator

The marketplace operator wants a reusable verification API and dashboard layer that can be integrated into an existing rental platform without building a full cryptographic system internally.

---

## 6. Product Goals

The MVP must demonstrate that zero-knowledge proof technology and Stellar can solve a real rental trust problem. It must show a clear product flow, not only a technical proof.

The MVP should allow a judge or user to:

1. Open the app in demo mode.
2. View verified rental listings.
3. Select a property and request viewing access.
4. Pay or simulate a payment through Stellar testnet.
5. Generate a zero-knowledge proof after payment.
6. Submit the proof to a Soroban smart contract.
7. Verify the proof on Stellar.
8. Unlock a viewing code only after successful verification.
9. View the event in tenant, manager, and admin dashboards.
10. See audit logs, proof status, report status, and payment-hold status.

---

## 7. Non-Goals

The MVP will not build a complete production rental marketplace. The following items are intentionally out of scope for the hackathon build:

- Advanced property search
- Lease signing
- Full tenant screening
- Production-grade escrow
- Real mainnet funds
- Legal deposit compliance
- Automated dispute resolution
- Full KYC or AML compliance
- End-to-end private payments
- Real SMS or email delivery
- Production agent onboarding
- Production payment settlement

The MVP may simulate some administrative and SaaS features while keeping the ZK and Stellar flow real, visible, and load-bearing.

---

## 8. Product Principles

### 8.1 ZK Must Be Load-Bearing

Zero-knowledge proof must perform a real product function. It must verify the payment condition before access is unlocked. It must not appear only in the README, pitch, or UI copy.

### 8.2 Stellar Must Be Part of the Flow

Stellar must be used in the payment or verification flow. The strongest MVP uses Stellar testnet payment and Soroban proof verification or verification-state recording.

### 8.3 The Product Must Be Simple to Demo

The demo should be understandable within two to three minutes. A judge should immediately see the tenant problem, the payment flow, the ZK proof step, the on-chain verification step, and the unlocked viewing code.

### 8.4 Trust Layer Before Marketplace

UrbanRentisha TrustLayer should look like verification infrastructure for rental platforms, not only a listing website. Listings are included to demonstrate the workflow, but the core product is the trust and verification layer.

### 8.5 Privacy Without Overclaiming

The MVP proves payment eligibility without exposing unnecessary wallet details. It does not claim to provide full financial privacy, legal escrow, production KYC, or regulatory compliance.

---

## 9. MVP Scope

The MVP includes all 20 mandatory features, implemented with controlled depth. The core transaction and proof flow must be functional. Supporting SaaS features may be simplified but should still appear professionally in the UI and data model.

### 9.1 Core Functional Flow

1. Tenant signs in through demo login, email login, or wallet login.
2. Tenant views verified properties.
3. Tenant opens a property details page.
4. Tenant reviews the agent profile and verification badge.
5. Tenant requests viewing access.
6. System creates a viewing request.
7. Tenant completes Stellar testnet payment or demo payment transaction.
8. System generates a ZK payment proof off-chain.
9. Tenant submits proof for Soroban verification.
10. Soroban contract verifies the proof.
11. Viewing request status becomes verified.
12. System generates a unique viewing code.
13. Tenant dashboard shows unlocked access.
14. Manager dashboard shows verified tenant request.
15. Admin dashboard records the action in the audit log.

---

## 10. Mandatory Features

### 10.1 Tenant Account

Tenants must be able to create or access an account. For the MVP, this can be a demo login, email login, or wallet-based login.

The tenant account must allow the tenant to:

- Request property viewing access
- Track payment status
- Track proof status
- Track payment-hold status
- Receive in-app notifications
- View unlocked viewing codes
- View previously requested properties

### 10.2 Property Listing Page

The app must show rental listings. Each listing must include:

- Property name
- Location
- Rent amount
- Viewing fee
- Property image or placeholder
- Agent or landlord name
- Verification status
- Request viewing action
- Report listing action

The listing page is the primary entry point for the tenant viewing request flow.

### 10.3 Verified Property Badge

Every approved listing must display a verification badge. The default label should be:

> Verified Property

The badge must indicate that the listing has been reviewed by the platform. It should appear on listing cards, property details pages, tenant dashboard items, and manager dashboard views.

### 10.4 Request Viewing Feature

Each property must include a **Request Viewing** button. When clicked, the system creates a viewing request linked to:

- Tenant ID
- Tenant wallet address, where applicable
- Property ID
- Agent ID
- Required viewing fee
- Payment reference
- Proof status
- Access status
- Created timestamp

### 10.5 Stellar Testnet Payment

The tenant must be able to pay a viewing fee or reservation fee using Stellar testnet. The MVP may use testnet XLM for simplicity. Testnet USDC may be listed as a future supported asset.

The payment step must show:

- Property name
- Required viewing fee
- Destination account or contract
- Payment status
- Transaction reference or hash
- Next step: generate proof

### 10.6 ZK Payment Proof Generation

After payment, the system must generate a zero-knowledge proof off-chain. The proof must represent a meaningful payment condition.

Recommended proof statement:

> The tenant knows a valid payment commitment or payment reference that satisfies the required viewing fee for property X, without revealing unrelated wallet activity or full transaction history.

Private inputs may include:

- Tenant-side payment secret
- Payment reference preimage
- Wallet-linked secret
- Commitment salt
- Request-specific nonce

Public inputs may include:

- Listing ID
- Viewing request ID
- Required fee
- Payment commitment
- Payment-hold contract address
- Nullifier or proof identifier

### 10.7 Stellar Smart Contract Proof Verification

The app must submit the proof to a Stellar Soroban smart contract. If the proof is valid, the contract must mark the viewing request as verified.

The smart contract should expose functions equivalent to:

```text
create_request(listing_id, tenant_hash, required_fee)
submit_proof(request_id, proof, public_inputs)
verify_proof(request_id)
get_access_status(request_id)
get_request_status(request_id)
```

The contract should store or emit:

- Request ID
- Listing ID
- Proof verification status
- Verification timestamp
- Access eligibility
- Nullifier or proof identifier

### 10.8 Unlock Viewing Details

Viewing details must remain locked until proof verification succeeds. After successful verification, the tenant can access:

- Viewing code
- Agent contact
- Property viewing instructions
- Appointment confirmation
- Access expiration, if used

### 10.9 Fake Listing Report Button

Each listing must include a **Report Listing** button. The report form should allow the tenant to select a reason such as:

- Fake property
- Suspicious agent
- Wrong location
- Duplicate listing
- Payment scam
- Already occupied property
- Other concern

For the MVP, reports should be stored and displayed in the admin dashboard. Repeated reports may reduce the agent trust score in a later version.

### 10.10 Agent Verification Profile

Agents and landlords must have verification profiles. Each profile should show:

- Agent name
- Verification status
- Listed properties
- Total verified viewing requests
- Report count
- Trust score
- Last verification date
- Admin review status

The profile helps tenants understand whether they are dealing with a verified and trusted agent.

### 10.11 Escrow or Payment-Hold Status

The app must show a simplified payment-hold status. To avoid legal overclaiming, the MVP should use **Payment Hold Status** or **Reservation Status** in the UI unless full escrow logic is implemented.

Supported statuses:

```text
Pending
Paid
Held
Verified
Released
Refunded
Failed
```

The purpose is to show that the tenant payment is tracked and not disappearing to an unknown person.

### 10.12 Viewing Code Generator

After proof verification, the system must generate a unique viewing code. Example:

```text
VIEW-8K29XQ
```

The viewing code must be linked to:

- Property ID
- Tenant ID
- Viewing request ID
- Agent ID
- Verification timestamp
- Expiry timestamp, if used

### 10.13 Notification System

The tenant must receive in-app notifications when important events happen. MVP notifications may appear as dashboard alerts or timeline updates.

Notification triggers:

- Viewing request created
- Payment pending
- Payment received
- Proof generated
- Proof verified
- Access unlocked
- Viewing code generated
- Payment-hold status changed
- Report submitted
- Report reviewed

### 10.14 Audit Log

The system must keep an audit log of important actions.

Audit events include:

- Tenant login
- Viewing request creation
- Payment initiation
- Payment received
- Proof generation
- Proof submission
- Proof verification success
- Proof verification failure
- Viewing code generation
- Access unlock
- Agent verification update
- Listing approval
- Listing report submission
- Report review
- Suspicious activity flag

The audit log is important for the B2B SaaS position because rental platforms and agencies need reliable records for trust, compliance, and dispute review.

### 10.15 API for Rental Platforms

The app must include a basic API layer so other rental platforms can later connect to UrbanRentisha TrustLayer. The MVP API can be lightweight and demo-oriented.

Recommended endpoints:

```text
POST /api/viewing-requests
GET /api/viewing-requests/:id/status
POST /api/proofs/verify
POST /api/listings/:id/report
GET /api/agents/:id/trust-profile
GET /api/viewing-codes/:code/verify
GET /api/audit-log
```

The API documentation page should explain expected request bodies, response formats, and how another platform would use UrbanRentisha as a trust layer.

### 10.16 Tenant Dashboard

The tenant dashboard must show:

- Requested properties
- Payment status
- Proof status
- Payment-hold status
- Viewing codes
- Notifications
- Report status
- Access status

### 10.17 Property Manager Dashboard

The property manager dashboard must show:

- Listed properties
- Viewing requests
- Verified tenants
- Payment-hold statuses
- Generated viewing codes
- Fake listing reports
- Agent trust score
- Proof verification status

### 10.18 Admin Dashboard

The admin dashboard must support platform-level management.

Admin capabilities:

- Approve listings
- Verify agents
- Review fake listing reports
- View audit logs
- Monitor proof verification
- Manage suspicious activity
- View tenant and manager activity summaries
- Review failed proof attempts

### 10.19 Proof Status Tracker

Each viewing request must show a clear progress tracker.

Supported statuses:

```text
Viewing requested
Payment pending
Payment received
Proof generated
Proof submitted
Proof verified
Payment hold active
Viewing code generated
Access unlocked
Completed
Failed
Reported
```

The tracker should be visible on the tenant dashboard, viewing request page, manager dashboard, and admin dashboard.

### 10.20 Demo Mode

The app must include a judge-friendly demo mode. Demo mode must allow judges to run the full product flow quickly using test data and Stellar testnet.

Demo mode should show:

1. Tenant selects a verified listing.
2. Tenant requests viewing.
3. Tenant makes or simulates a Stellar testnet payment.
4. Tenant generates a ZK proof.
5. Proof is verified through Soroban.
6. Viewing code is unlocked.
7. Manager dashboard shows verified request.
8. Admin audit log records the full event trail.

---

## 11. Page and Route Map

| Page | Suggested Route | Primary User | Purpose |
|---|---|---|---|
| Landing Page | `/` | Public | Explain the product and trust problem. |
| Demo Mode | `/demo` | Judges | Run the full demo flow quickly. |
| Tenant Login | `/login` | Tenant | Access demo, email, or wallet login. |
| Tenant Dashboard | `/tenant/dashboard` | Tenant | Track requests, payments, proofs, codes, and notifications. |
| Property Listings | `/listings` | Tenant | Browse verified rental listings. |
| Property Details | `/listings/[id]` | Tenant | View listing, agent, fee, badge, and report action. |
| Viewing Request | `/viewing-requests/[id]` | Tenant | Track one request from creation to unlock. |
| Stellar Payment | `/payment/[requestId]` | Tenant | Complete or simulate Stellar testnet payment. |
| Generate Proof | `/proofs/generate/[requestId]` | Tenant | Generate ZK proof after payment. |
| Verify Proof | `/proofs/verify/[requestId]` | Tenant | Submit proof to Soroban verifier. |
| Viewing Code | `/viewing-code/[code]` | Tenant / Agent | Show or validate unlocked viewing code. |
| Agent Profile | `/agents/[id]` | Tenant / Admin | View verification, reports, trust score, and listings. |
| Manager Dashboard | `/manager/dashboard` | Manager | Manage listings, requests, verified tenants, and reports. |
| Admin Dashboard | `/admin/dashboard` | Admin | Manage platform trust and verification. |
| Admin Audit Log | `/admin/audit-log` | Admin | Review event history and proof activity. |
| Reports Page | `/admin/reports` | Admin | Review fake listing and suspicious agent reports. |
| API Docs | `/api-docs` | B2B Partner | Show integration endpoints and use cases. |
| Notifications | `/notifications` | Tenant / Manager | Show event updates. |

---

## 12. User Journeys

### 12.1 Tenant Viewing Access Journey

1. Tenant logs in through demo, email, or wallet login.
2. Tenant opens property listings.
3. Tenant selects a verified property.
4. Tenant checks agent profile and viewing fee.
5. Tenant clicks **Request Viewing**.
6. System creates a viewing request.
7. Tenant pays viewing fee through Stellar testnet.
8. Payment status changes to **Payment Received**.
9. Tenant clicks **Generate Proof**.
10. ZK proof is generated off-chain.
11. Tenant clicks **Verify on Stellar**.
12. Soroban smart contract verifies the proof.
13. Request status changes to **Proof Verified**.
14. Viewing code is generated.
15. Viewing details are unlocked.
16. Tenant receives notification.

### 12.2 Fake Listing Report Journey

1. Tenant opens a listing.
2. Tenant notices suspicious information.
3. Tenant clicks **Report Listing**.
4. Tenant selects a report reason.
5. Report is submitted.
6. Admin dashboard receives report.
7. Listing or agent receives a review flag.
8. Report status is updated.
9. Tenant receives an in-app notification when reviewed.

### 12.3 Property Manager Journey

1. Manager logs into dashboard.
2. Manager views listed properties.
3. Manager sees viewing requests.
4. Manager filters requests by proof status.
5. Manager sees verified tenants.
6. Manager checks generated viewing codes.
7. Manager reviews report count and trust score.

### 12.4 Admin Trust Management Journey

1. Admin opens dashboard.
2. Admin reviews new listing approvals.
3. Admin verifies agent profiles.
4. Admin monitors proof verification events.
5. Admin checks fake listing reports.
6. Admin reviews audit log.
7. Admin flags suspicious activity if needed.

---

## 13. ZK Design

### 13.1 Recommended MVP Proof Statement

The recommended MVP proof statement is:

> The tenant knows a valid payment commitment linked to a specific viewing request and listing fee, without revealing unrelated wallet history or private payment data.

### 13.2 Why This Proof Matters

The proof is valuable because the platform does not need to inspect private wallet history or rely on fakeable screenshots. The contract receives proof that the required condition has been satisfied. Access is unlocked only after proof verification succeeds.

### 13.3 Private Inputs

Potential private inputs:

- Tenant payment secret
- Payment reference preimage
- Commitment salt
- Wallet-controlled secret
- Request nonce
- Internal proof seed

### 13.4 Public Inputs

Potential public inputs:

- Listing ID
- Viewing request ID
- Required fee
- Payment commitment
- Contract address
- Nullifier
- Proof identifier

### 13.5 Nullifier Strategy

The system should use a nullifier or proof identifier to prevent reuse of the same proof for multiple viewing requests. The nullifier should be linked to the viewing request and listing, not directly to the tenant identity.

### 13.6 Recommended ZK Stack

For the hackathon MVP, the recommended stack is:

- **Circom + Groth16** if the team prioritizes smaller proofs and efficient verification.
- **Noir + UltraHonk** if the team prioritizes readability and faster circuit development.
- **RISC Zero** only if the product needs to prove more complex off-chain computation.

The fastest practical route is to implement a simple proof condition with an existing Stellar verifier example and keep the proof statement narrow.

---

## 14. Stellar and Soroban Integration

### 14.1 Stellar Role

Stellar is used for:

- Testnet payment flow
- Payment or reservation reference
- Smart contract state
- Proof verification or verification-state recording
- Auditability of verification outcomes

### 14.2 Soroban Contract Responsibilities

The Soroban contract should:

- Create or register viewing requests
- Store listing and request identifiers
- Accept proof submission
- Verify proof using the selected verifier
- Store verification result
- Prevent proof replay through nullifier tracking
- Return access eligibility
- Emit verification events

### 14.3 Suggested Contract Functions

```rust
create_request(listing_id, tenant_commitment, required_fee) -> request_id
submit_proof(request_id, proof, public_inputs) -> verification_result
get_access_status(request_id) -> access_status
get_request_status(request_id) -> request_status
mark_code_generated(request_id, code_hash) -> bool
is_nullifier_used(nullifier) -> bool
```

### 14.4 On-Chain State

Minimum state:

- Request ID
- Listing ID
- Tenant commitment
- Required fee
- Proof status
- Access status
- Nullifier status
- Verification timestamp
- Viewing code hash, if stored on-chain

---

## 15. System Architecture

### 15.1 Architecture Components

1. **Frontend application**  
   Tenant, manager, admin, and demo-mode interfaces.

2. **Backend API**  
   Request creation, dashboard data, report storage, notifications, and code generation.

3. **ZK proof service**  
   Generates the proof from private and public inputs.

4. **Stellar payment layer**  
   Handles testnet XLM payment flow and transaction references.

5. **Soroban verifier contract**  
   Verifies proof and records request verification status.

6. **Database or local demo store**  
   Stores listings, users, agents, reports, notifications, audit logs, and request metadata.

### 15.2 Data Flow

```text
Tenant logs in
→ Tenant selects verified property
→ Tenant creates viewing request
→ System records required fee and request ID
→ Tenant pays via Stellar testnet
→ Payment reference is captured
→ ZK proof is generated off-chain
→ Proof is submitted to Soroban
→ Contract verifies proof
→ Verification status is recorded
→ Viewing code is generated
→ Access details are unlocked
→ Audit log and dashboards update
```

---

## 16. Data Model

### 16.1 Tenant

```json
{
  "tenantId": "tenant_001",
  "name": "Demo Tenant",
  "email": "tenant@example.com",
  "walletAddress": "G...",
  "createdAt": "2026-06-18T00:00:00Z"
}
```

### 16.2 Property Listing

```json
{
  "listingId": "listing_001",
  "propertyName": "Westlands Studio Apartment",
  "location": "Westlands, Nairobi",
  "rentAmount": 45000,
  "viewingFee": 1,
  "currency": "testnet XLM",
  "imageUrl": "/images/property-001.jpg",
  "agentId": "agent_001",
  "verificationStatus": "verified",
  "createdAt": "2026-06-18T00:00:00Z"
}
```

### 16.3 Agent Profile

```json
{
  "agentId": "agent_001",
  "name": "Amani Properties",
  "verificationStatus": "verified",
  "listedProperties": 3,
  "verifiedViewingRequests": 12,
  "reportCount": 1,
  "trustScore": 92,
  "lastVerifiedAt": "2026-06-18T00:00:00Z"
}
```

### 16.4 Viewing Request

```json
{
  "requestId": "request_001",
  "tenantId": "tenant_001",
  "listingId": "listing_001",
  "agentId": "agent_001",
  "requiredFee": 1,
  "paymentStatus": "payment_received",
  "proofStatus": "proof_verified",
  "paymentHoldStatus": "verified",
  "accessStatus": "unlocked",
  "viewingCode": "VIEW-8K29XQ",
  "createdAt": "2026-06-18T00:00:00Z"
}
```

### 16.5 Listing Report

```json
{
  "reportId": "report_001",
  "listingId": "listing_001",
  "tenantId": "tenant_001",
  "reason": "suspicious_agent",
  "description": "Agent requested payment outside the platform.",
  "status": "under_review",
  "createdAt": "2026-06-18T00:00:00Z"
}
```

### 16.6 Audit Event

```json
{
  "eventId": "audit_001",
  "actorType": "tenant",
  "actorId": "tenant_001",
  "eventType": "proof_verified",
  "requestId": "request_001",
  "listingId": "listing_001",
  "metadata": {
    "contractId": "C...",
    "transactionHash": "abc123"
  },
  "createdAt": "2026-06-18T00:00:00Z"
}
```

---

## 17. API Requirements

### 17.1 Create Viewing Request

```http
POST /api/viewing-requests
```

Request body:

```json
{
  "tenantId": "tenant_001",
  "listingId": "listing_001"
}
```

Response:

```json
{
  "requestId": "request_001",
  "status": "viewing_requested",
  "requiredFee": 1,
  "currency": "testnet XLM"
}
```

### 17.2 Get Viewing Request Status

```http
GET /api/viewing-requests/:id/status
```

Response:

```json
{
  "requestId": "request_001",
  "paymentStatus": "payment_received",
  "proofStatus": "proof_verified",
  "accessStatus": "unlocked"
}
```

### 17.3 Submit Proof for Verification

```http
POST /api/proofs/verify
```

Request body:

```json
{
  "requestId": "request_001",
  "proof": "0x...",
  "publicInputs": ["listing_001", "request_001", "1", "commitment"]
}
```

Response:

```json
{
  "requestId": "request_001",
  "verificationStatus": "verified",
  "accessStatus": "unlocked"
}
```

### 17.4 Report Listing

```http
POST /api/listings/:id/report
```

Request body:

```json
{
  "tenantId": "tenant_001",
  "reason": "payment_scam",
  "description": "Agent asked for payment outside UrbanRentisha."
}
```

### 17.5 Get Agent Trust Profile

```http
GET /api/agents/:id/trust-profile
```

### 17.6 Verify Viewing Code

```http
GET /api/viewing-codes/:code/verify
```

---

## 18. Status Model

### 18.1 Viewing Request Statuses

```text
Viewing requested
Payment pending
Payment received
Proof generated
Proof submitted
Proof verified
Payment hold active
Viewing code generated
Access unlocked
Completed
Failed
Reported
```

### 18.2 Payment Statuses

```text
Not started
Payment pending
Payment received
Payment failed
Refund pending
Refunded
```

### 18.3 Proof Statuses

```text
Not generated
Proof generated
Proof submitted
Proof verified
Proof failed
Proof expired
```

### 18.4 Access Statuses

```text
Locked
Eligible
Unlocked
Expired
Revoked
```

### 18.5 Report Statuses

```text
Submitted
Under review
Resolved
Rejected
Escalated
```

---

## 19. Success Metrics

### 19.1 Hackathon Success Metrics

- Full demo flow completion rate
- Successful proof verification rate
- Time from payment to access unlock
- Number of verified viewing requests created in demo
- Number of audit events recorded
- Judge ability to understand ZK value within two to three minutes

### 19.2 Product Metrics

- Reduction in manual payment checks
- Reduction in fake listing reports
- Increase in verified tenant inquiries
- Agent trust score improvement
- Viewing request to completed viewing conversion
- Report resolution time
- Verification failure rate

### 19.3 SaaS Metrics

- Number of partner platforms integrated
- API verification requests per month
- Active property manager seats
- Cost per verified request
- Monthly recurring revenue potential
- Tenant trust improvement score

---

## 20. Security, Privacy, and Trust Requirements

### 20.1 Privacy Requirements

The system must not expose full tenant wallet history. The proof should reveal only what is required to verify the payment condition.

### 20.2 Replay Protection

The system should use a nullifier or request-specific proof identifier to prevent one valid proof from being reused across multiple viewing requests.

### 20.3 Access Control

Only verified tenants should access viewing details. Admin-only pages must not be visible to tenants. Manager dashboards must only show relevant listings and requests.

### 20.4 Audit Integrity

Important actions must be logged with timestamps and actor identifiers. Audit logs should distinguish between tenant actions, manager actions, admin actions, backend actions, and contract verification events.

### 20.5 MVP Disclaimer

The MVP uses testnet funds and a simplified payment-hold model. It is not a legal escrow product and must not be represented as production-ready financial infrastructure.

---

## 21. Acceptance Criteria

The MVP is accepted if the following conditions are met:

1. A tenant can log in through demo, email, or wallet-based login.
2. A tenant can view verified property listings.
3. Each listing shows property details, agent information, fee, image, and verification badge.
4. A tenant can request viewing access.
5. The system creates a viewing request.
6. A tenant can make or simulate a Stellar testnet payment.
7. The system can generate a zero-knowledge proof after payment.
8. The app can submit the proof to a Soroban verifier contract.
9. The contract can return a proof verification result.
10. The app unlocks viewing details only after successful verification.
11. The system generates a unique viewing code.
12. Tenant dashboard shows request, payment, proof, hold status, and viewing code.
13. Manager dashboard shows verified requests and reports.
14. Admin dashboard shows listings, reports, proof activity, and audit logs.
15. The fake listing report button stores reports.
16. Agent profile displays verification and trust indicators.
17. The audit log records all major events.
18. Demo mode allows judges to complete the full flow quickly.
19. README explains the problem, architecture, ZK design, Stellar integration, setup, limitations, and demo instructions.
20. Public repository includes source code and reproducible setup steps.

---

## 22. Demo Requirements

The demo must be short, clear, and product-led. It should show the working product rather than only slides.

### 22.1 Demo Sequence

1. Open UrbanRentisha TrustLayer.
2. Select demo tenant login.
3. Open verified property listings.
4. Select a verified property.
5. Click **Request Viewing**.
6. Show payment requirement.
7. Complete or simulate Stellar testnet payment.
8. Generate ZK payment proof.
9. Verify proof on Stellar Soroban.
10. Show proof status as verified.
11. Generate and reveal viewing code.
12. Open tenant dashboard.
13. Open manager dashboard.
14. Open admin audit log.
15. Show fake listing report and trust controls.

### 22.2 Demo Closing Statement

> UrbanRentisha TrustLayer helps rental platforms reduce scams by using ZK proofs on Stellar to verify payment eligibility before property viewing details are unlocked.

---

## 23. Recommended Build Priorities

### Priority 1: Core ZK and Stellar Flow

- Property listing
- Request viewing
- Stellar testnet payment
- ZK proof generation
- Soroban proof verification
- Viewing code unlock
- Proof status tracker

### Priority 2: Trust and Safety Layer

- Verified property badge
- Agent verification profile
- Fake listing report button
- Payment-hold status
- Audit log

### Priority 3: SaaS Product Layer

- Tenant dashboard
- Property manager dashboard
- Admin dashboard
- API documentation
- Notifications
- Demo mode polish

---

## 24. Two-Week Build Plan

### Day 1: Product Finalization

- Lock PRD scope.
- Finalize proof statement.
- Finalize user flow and routes.
- Create design wireframes.

### Day 2: Project Setup

- Set up frontend.
- Set up backend API.
- Set up smart contract workspace.
- Add demo data.

### Day 3: Listings and Tenant Flow

- Build listing page.
- Build property details page.
- Build tenant login.
- Build request viewing flow.

### Day 4: Dashboards

- Build tenant dashboard.
- Build manager dashboard.
- Build admin dashboard shell.
- Add status tracker.

### Day 5: Stellar Payment Flow

- Add Stellar testnet payment or payment simulation.
- Capture payment reference.
- Update payment status.

### Day 6 to Day 8: ZK Proof Implementation

- Build simple proof circuit or method.
- Generate proof off-chain.
- Define public and private inputs.
- Add nullifier or proof identifier.

### Day 9 to Day 10: Soroban Verification

- Implement verifier contract.
- Submit proof to contract.
- Store verification result.
- Emit verification event.

### Day 11: Access Unlock and Viewing Code

- Generate viewing code after proof verification.
- Unlock tenant access.
- Update dashboards and notifications.

### Day 12: Reports, Audit Log, API Docs

- Add report listing form.
- Add audit log events.
- Add API documentation page.

### Day 13: Demo Mode and QA

- Create demo mode.
- Test full end-to-end flow.
- Document limitations.
- Fix UI and flow issues.

### Day 14: Submission Polish

- Finalize README.
- Record two-to-three-minute demo video.
- Confirm public repo.
- Submit hackathon entry.

---

## 25. Risk Register

| Risk | Impact | Mitigation |
|---|---|---|
| ZK verification takes too long | High | Use a simple proof and existing verifier example. |
| Scope becomes too broad | High | Build all pages, but keep non-core pages lightweight. |
| Judges miss ZK value | High | Make proof generation and Soroban verification visible in demo. |
| Payment flow becomes unstable | Medium | Use testnet XLM and provide demo fallback. |
| Escrow claims are misunderstood | Medium | Use “Payment Hold Status” instead of claiming legal escrow. |
| Agent trust score feels fake | Medium | Explain that MVP trust score is rule-based and demo-driven. |
| API layer distracts from core | Low | Keep API docs lightweight and focused on future integration. |

---

## 26. Open Questions

1. Should the MVP use Circom or Noir for the first proof implementation?
2. Will the payment proof verify a real testnet transaction or a payment commitment derived from the transaction?
3. Should viewing codes be stored directly or stored as hashed values?
4. Should demo mode use a fully simulated payment fallback if testnet is slow?
5. Should agent trust scores be manually assigned or computed from reports and verified requests?
6. Should payment-hold status remain purely off-chain in MVP or partly stored in the contract?

---

## 27. Final Product Definition

UrbanRentisha TrustLayer is a ZK-powered rental access verification layer on Stellar. It helps rental platforms, agencies, and property managers reduce scams by allowing tenants to prove that a required viewing or reservation payment condition was satisfied without exposing unnecessary wallet history. Once a Stellar Soroban smart contract verifies the proof, the platform unlocks controlled viewing access and records the trust event in dashboards and audit logs.

The product is locally relevant, technically aligned with the Stellar Real-World ZK hackathon, and commercially credible as a B2B SaaS trust infrastructure layer for rental platforms.

---

## 28. Reference Links for Implementation

- Stellar ZK documentation: https://developers.stellar.org/docs/build/apps/zk
- Stellar smart contract documentation: https://developers.stellar.org/docs/build/smart-contracts
- Stellar testnet tools: https://developers.stellar.org/docs/tools
- Soroban examples: https://github.com/stellar/soroban-examples
- Circom documentation: https://docs.circom.io
- Noir documentation: https://noir-lang.org/docs
- RISC Zero documentation: https://dev.risczero.com

