# UrbanRentisha TrustLayer: Final Mandatory Features and Pages

## Product Direction

UrbanRentisha TrustLayer will include all mandatory features, but the product should remain focused on one clear hackathon story: a tenant finds a verified property, requests viewing access, pays through Stellar testnet, generates a zero-knowledge proof, verifies the proof through a Stellar smart contract, and receives a viewing code only after verification succeeds.

The app should feel like a professional B2B SaaS trust layer for rental platforms, agencies, landlords, and property managers. The tenant-facing pages should show the rental access flow, while the manager and admin dashboards should show verification, reporting, escrow status, audit logs, and platform trust controls.

## Main Pages and Routes

| Page | Suggested Route | Purpose |
| --- | --- | --- |
| Landing Page | /   | Explains the anti-scam rental trust layer. |
| Demo Mode Page | /demo | Lets judges run the full product flow quickly. |
| Tenant Login Page | /login | Allows demo login, email login, or wallet login. |
| Tenant Dashboard | /tenant/dashboard | Shows requests, payments, proofs, codes, and notifications. |
| Property Listings Page | /listings | Displays verified rental listings. |
| Property Details Page | /listings/\[id\] | Shows property details, agent profile, badge, and report button. |
| Viewing Request Page | /viewing-requests/\[id\] | Tracks request, payment, proof, escrow, and access state. |
| Stellar Payment Page | /payment/\[requestId\] | Handles testnet XLM or testnet USDC payment. |
| Proof Generation Page | /proofs/generate/\[requestId\] | Generates the ZK payment proof after payment. |
| Proof Verification Page | /proofs/verify/\[requestId\] | Sends the proof to the Soroban verifier contract. |
| Viewing Code Page | /viewing-code/\[code\] | Shows unlocked viewing code and appointment details. |
| Agent Profile Page | /agents/\[id\] | Shows agent verification, reports, trust score, and properties. |
| Property Manager Dashboard | /manager/dashboard | Shows listings, requests, tenants, reports, escrow, and codes. |
| Admin Dashboard | /admin/dashboard | Manages listings, agents, reports, proofs, and suspicious activity. |
| Admin Audit Log | /admin/audit-log | Shows all important platform events. |
| Reports Page | /admin/reports | Allows admin to review fake listing or scam reports. |
| API Documentation Page | /api-docs | Shows available API endpoints for rental platforms. |
| Notifications Page | /notifications | Shows payment, proof, escrow, report, and access updates. |

## Feature Alignment

### 1\. Tenant Account

The tenant account is required. For the MVP, this can be a demo login or wallet-based login. The tenant account should allow the user to request viewings, track payment status, receive verification updates, and view unlocked viewing codes.

### 2\. Property Listing Page

The app must include a property listing page. Each listing should show the property name, location, rent amount, viewing fee, image or placeholder, agent or landlord name, and verification status.

### 3\. Verified Property Badge

Every approved property should display a clear badge such as “Verified Property.” This badge should appear on both the listing card and property details page.

### 4\. Request Viewing Feature

Each listing should include a “Request Viewing” button. When clicked, the system should create a viewing request connected to the tenant, property, agent, required fee, and request status.

### 5\. Stellar Testnet Payment

The tenant should pay the viewing or reservation fee using Stellar testnet. The MVP can use testnet XLM for simplicity, with testnet USDC shown as a future option.

### 6\. ZK Payment Proof Generation

After payment, the system should generate a zero-knowledge proof showing that the required payment condition was satisfied. This proof should not expose the tenant’s full wallet history or unrelated payment activity.

### 7\. Stellar Smart Contract Proof Verification

The generated proof should be submitted to a Soroban smart contract. If the proof is valid, the contract should update the viewing request status to verified.

### 8\. Unlock Viewing Details

Viewing details should remain locked until proof verification succeeds. After verification, the tenant can see a viewing code, agent contact, appointment instruction, or property access note.

### 9\. Fake Listing Report Button

Each listing should include a “Report Listing” button. The tenant should be able to select a reason such as fake property, suspicious agent, wrong location, duplicate listing, or payment scam.

### 10\. Agent Verification Profile

Each agent or landlord should have a profile showing verification status, listed properties, verified viewing requests, report count, and trust score.

### 11\. Escrow Status

The app should include a simplified escrow or payment-holding status. For the MVP, this should be called “Payment Hold Status” or “Reservation Status” to avoid overclaiming legal escrow functionality.

Recommended statuses are: pending, paid, verified, released, refunded, and failed.

### 12\. Viewing Code Generator

After proof verification, the system should generate a unique viewing code such as VIEW-8K29XQ. The code should be linked to the tenant, property, agent, and viewing request.

### 13\. Notification System

The app should show in-app notifications when payment is received, proof is generated, proof is verified, access is unlocked, escrow status changes, or a report is reviewed.

### 14\. Audit Log

The platform should keep an audit log of important events. This includes request creation, payment initiation, proof generation, proof verification, code generation, access unlock, agent verification, and fake listing reports.

### 15\. API for Rental Platforms

The app should include a basic API layer to support the B2B SaaS vision. The API can be lightweight in the MVP and should show how another rental platform could connect to UrbanRentisha TrustLayer.

Recommended API endpoints:

POST /api/viewing-requests  
GET /api/viewing-requests/:id/status  
POST /api/proofs/verify  
POST /api/listings/:id/report  
GET /api/agents/:id/trust-profile  
GET /api/viewing-codes/:code/verify

### 16\. Tenant Dashboard

The tenant dashboard should show requested properties, payment status, proof status, escrow status, unlocked viewing codes, and notifications.

### 17\. Property Manager Dashboard

The manager dashboard should show listed properties, viewing requests, verified tenants, escrow statuses, generated viewing codes, fake listing reports, and trust score.

### 18\. Admin Dashboard

The admin dashboard should allow platform administrators to approve listings, verify agents, review fake listing reports, view audit logs, monitor proof verification, and manage suspicious activity.

### 19\. Proof Status Tracker

Each viewing request should have a clear tracker showing the full verification journey.

Recommended tracker:

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

### 20\. Demo Mode

The app must include a judge-friendly demo mode. Demo mode should let judges complete the full flow using test data and Stellar testnet: select a property, request viewing, make payment, generate proof, verify proof, unlock code, and view the event in the admin audit log.

## Recommended MVP Build Priority

The first priority is the full tenant trust flow: listings, request viewing, Stellar payment, ZK proof generation, Soroban proof verification, and viewing code unlock.

The second priority is trust and safety: verified property badge, fake listing report button, agent verification profile, trust score, and simplified escrow status.

The third priority is SaaS depth: tenant dashboard, manager dashboard, admin dashboard, audit log, notifications, and API documentation.

## Final Positioning Statement

UrbanRentisha TrustLayer is a ZK-powered rental trust infrastructure layer on Stellar. It helps rental platforms reduce scams by allowing tenants to prove that a required viewing or reservation payment was completed without exposing unnecessary wallet details. Once the proof is verified through a Stellar smart contract, the tenant receives controlled access to verified viewing details.