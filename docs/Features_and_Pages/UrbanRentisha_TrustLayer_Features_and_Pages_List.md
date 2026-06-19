# UrbanRentisha TrustLayer Features and Pages List

## 1. Overview

UrbanRentisha TrustLayer will include **20 main product features** and **22 primary pages/screens**.

The product is designed as a **ZK rental payment proof and verified property access layer on Stellar**. It is not positioned as a full rental marketplace. Instead, it is a trust, verification, anti-scam, payment-proof, and access-control layer for rental platforms, property agencies, landlords, and property managers.

The central product promise is:

```text
A tenant privately proves payment, Stellar verifies it, and UrbanRentisha unlocks safe property access.
```

---

# 2. Total Main Features: 20

## 1. Tenant Account

Tenants can create or access an account using demo login, email login, or wallet-based login. The account allows tenants to request property viewing access, track payment status, receive verification updates, and view unlocked viewing codes.

## 2. Property Listing Page

The app shows verified rental listings. Each listing includes property name, location, rent amount, viewing fee, property image or placeholder, agent or landlord name, and verification status.

## 3. Verified Property Badge

Every approved listing displays a verification badge such as **Verified Property**. This helps tenants identify listings that have passed platform checks.

## 4. Request Viewing Feature

Each property includes a **Request Viewing** button. When clicked, the system creates a viewing request linked to the tenant, property, agent, and required viewing fee.

## 5. Stellar Testnet Payment

The tenant can pay the viewing or reservation fee using Stellar testnet. The MVP may use testnet XLM or another testnet asset depending on implementation ease.

## 6. ZK Payment Proof Generation

After payment, the system generates a zero-knowledge proof. The proof shows that the tenant completed the required payment condition without exposing unnecessary wallet details or full transaction history.

## 7. Stellar/Soroban Proof Verification

The app submits the ZK proof to a Stellar/Soroban smart contract for verification. If the proof is valid, the viewing request is marked as verified.

## 8. Unlock Viewing Details

Viewing details remain locked until proof verification succeeds. After verification, the tenant can access a viewing code, agent contact, property viewing instructions, or appointment confirmation.

## 9. Fake Listing Report Button

Tenants can report suspicious listings or fake agents. The report form can include reasons such as fake property, suspicious agent, wrong location, duplicate listing, payment scam, or misleading details.

## 10. Agent Verification Profile

Agents or landlords have verification profiles. Each profile shows agent name, verification status, listed properties, total verified viewing requests, report count, and trust score.

## 11. Escrow / Payment-Hold Status

The app shows simplified escrow or payment-hold status. For the MVP, this should be presented as **Payment-Hold Status** or **Reservation Status** rather than full legal escrow.

Recommended statuses:

```text
Pending
Paid
Verified
Active
Released
Refunded
Failed
```

## 12. Viewing Code Generator

After proof verification, the system generates a unique viewing code such as:

```text
VIEW-8K29XQ
```

The code is linked to the property, tenant, agent, and viewing request.

## 13. Notification System

The tenant receives in-app notifications when important events happen. These include payment received, proof generated, proof verified, access unlocked, escrow/payment-hold status changes, and report review updates.

## 14. Audit Log

The system records important trust and verification events. This includes viewing request creation, payment initiation, payment confirmation, proof generation, proof verification, viewing code generation, access unlock, agent verification updates, and fake listing reports.

## 15. API for Rental Platforms

UrbanRentisha includes a basic API layer so external rental platforms can integrate the trust layer.

Example endpoints:

```text
POST /api/viewing-requests
GET /api/viewing-requests/:id/status
POST /api/proofs/verify
POST /api/listings/:id/report
GET /api/agents/:id/trust-profile
GET /api/viewing-codes/:code/verify
```

## 16. Tenant Dashboard

The tenant dashboard shows requested properties, payment status, proof status, escrow/payment-hold status, unlocked viewing codes, notifications, reported listings, and viewing history.

## 17. Property Manager Dashboard

The property manager dashboard shows listed properties, viewing requests, verified tenants, escrow/payment-hold statuses, generated viewing codes, reports, trust score, and agent verification status.

## 18. Admin Dashboard

The admin dashboard manages the full platform. It includes property approvals, agent verification, fake listing reports, proof verification activity, escrow/payment-hold monitoring, audit logs, suspicious activity, platform metrics, and API client management.

## 19. Proof Status Tracker

Each viewing request includes a clear proof and access status tracker.

Recommended tracker:

```text
Viewing requested
Payment pending
Payment received
Proof generated
Proof verified
Escrow active
Viewing code generated
Access unlocked
Completed
Failed
Reported
```

## 20. Demo Mode

Demo mode allows hackathon judges to test the full flow quickly using seeded data and Stellar testnet. It should show a tenant requesting a viewing, making a testnet payment, generating a proof, verifying it, unlocking a viewing code, and viewing the event in the admin audit log.

---

# 3. Total Main Pages / Screens: 22

## 1. Landing Page

Explains UrbanRentisha TrustLayer, the rental scam problem, and the ZK/Stellar trust flow.

## 2. Signup / Login Page

Allows demo login, email login, or wallet-based access.

## 3. Tenant Onboarding Page

Explains how verified viewing works and why payment proof is required before access unlocks.

## 4. Property Listing Page

Shows verified rental listings with property cards, search, filters, and request-viewing buttons.

## 5. Property Detail Page

Shows full property information, rent, viewing fee, property verification badge, agent profile, and report button.

## 6. Search and Filter Page

Allows tenants to filter properties by location, rent range, verification status, property type, and viewing fee.

## 7. Request Viewing Screen

Creates a viewing request for a selected property and shows the required viewing fee.

## 8. Stellar Payment Screen

Shows the Stellar testnet payment flow, payment amount, transaction status, and transaction hash.

## 9. ZK Proof Generation Screen

Allows the tenant to generate a private payment proof after payment is received.

## 10. Proof Verification Screen

Submits the generated proof for Stellar/Soroban verification and shows proof verification status.

## 11. Escrow / Payment-Hold Status Screen

Shows simplified payment-hold or reservation status.

## 12. Viewing Code Success Screen

Displays the unlocked viewing code after successful proof verification.

## 13. Notifications Screen

Shows payment, proof, access, report, and viewing-code updates.

## 14. Fake Listing Report Screen

Allows tenants to report suspicious listings or agents.

## 15. Agent Verification Profile Page

Shows agent verification status, trust score, report count, listed properties, and verified viewing requests.

## 16. Tenant Dashboard

Shows tenant requests, payment statuses, proof statuses, escrow/payment-hold statuses, viewing codes, notifications, reports, and viewing history.

## 17. Property Manager Dashboard

Shows manager listings, viewing requests, verified tenants, escrow/payment-hold statuses, reports, viewing codes, and trust score.

## 18. Admin Dashboard

Shows platform-wide approvals, reports, agents, proof verification activity, suspicious activity, audit logs, and analytics.

## 19. Audit Log Screen

Shows important system events and trust activity.

## 20. API Documentation Page

Shows API endpoints for external rental-platform integrations.

## 21. Demo Mode Screen

Guides hackathon judges through the full UrbanRentisha trust flow.

## 22. Help / FAQ Page

Explains Stellar testnet, ZK proof, payment-hold status, viewing codes, reports, safety rules, and known limitations.

---

# 4. Practical Build Count

```text
20 core product features
22 main screens/pages
3 dashboards
1 API documentation portal
1 demo mode flow
```

---

# 5. Must-Perfect Hackathon Demo Screens

These screens should work very well for the hackathon demo:

```text
Landing Page
Property Listing Page
Property Detail Page
Request Viewing Screen
Stellar Payment Screen
ZK Proof Generation Screen
Proof Verification Screen
Viewing Code Success Screen
Tenant Dashboard
Admin Audit Log
Demo Mode Screen
```

Total must-perfect demo screens:

```text
11
```

---

# 6. Recommended Build Priority

## Priority 1: Core Trust Flow

These must be completed first:

```text
Property listings
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

## Priority 2: Trust and Safety Features

These should be simple but present:

```text
Verified property badge
Fake listing report
Agent verification profile
Escrow/payment-hold status
Notifications
Proof status tracker
```

## Priority 3: SaaS and Platform Features

These make the product look B2B-ready:

```text
Property manager dashboard
Admin dashboard
API documentation page
External rental-platform API
Analytics cards
Audit logs
```

---

# 7. Final Product Scope Summary

UrbanRentisha TrustLayer will have **20 main features** and **22 primary pages/screens**.

The product should feel like a serious rental trust infrastructure layer, not a broad rental marketplace. The most important experience is the trust journey:

```text
Tenant finds verified property
Tenant requests viewing
Tenant pays through Stellar testnet
Tenant generates ZK proof
Soroban verifies proof
Viewing code unlocks
Admin audit log records the event
```

All other features should support this central product promise.
