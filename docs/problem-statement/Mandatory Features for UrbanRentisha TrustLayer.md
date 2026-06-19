# Mandatory Features for UrbanRentisha TrustLayer

## 1\. Tenant Account

Tenants must be able to create or access an account. For the MVP, this can be a simple demo login, email login, or wallet-based login. The account should allow the tenant to request property viewing access, track payment status, receive verification updates, and view unlocked viewing codes.

## 2\. Property Listing Page

The app must show rental listings. Each listing should include property name, location, rent amount, viewing fee, property image or placeholder, agent/landlord name, and verification status. The listing page is the main place where tenants begin the viewing request process.

## 3\. Verified Property Badge

Every approved listing must show a verification badge. This tells the tenant that the property has been checked by the platform. The badge can say “Verified Property.” This feature helps reduce fake listings and builds trust.

## 4\. Request Viewing Feature

Each property must have a “Request Viewing” button. When the tenant clicks it, the system creates a viewing request linked to the tenant, the property, and the required viewing fee.

## 5\. Stellar Testnet Payment

The tenant must be able to pay the viewing fee or reservation fee using Stellar testnet. This payment can use testnet XLM or testnet USDC. The purpose is to show that Stellar is part of the real product flow, not just mentioned in the project.

## 6\. ZK Payment Proof Generation

After payment, the system must generate a zero-knowledge proof. The proof should show that the tenant completed the required payment condition without exposing unnecessary wallet details or full transaction history.

## 7\. Stellar Smart Contract Proof Verification

The app must send the ZK proof to a Stellar/Soroban smart contract for verification. If the proof is valid, the smart contract should mark the viewing request as verified.

## 8\. Unlock Viewing Details

Once the proof is verified, the app must unlock viewing details for the tenant. This can include a viewing code, agent contact, property viewing instructions, or appointment confirmation.

## 9\. Fake Listing Report Button

Tenants must be able to report suspicious listings or fake agents. Each listing should have a “Report Listing” button. The report form should allow the tenant to select a reason, such as fake property, suspicious agent, wrong location, duplicate listing, or payment scam.

For the MVP, the report can be stored in the admin dashboard. In a later version, repeated reports can reduce the agent trust score automatically.

## 10\. Agent Verification Profile

Agents or landlords must have verification profiles. Each profile should show the agent’s name, verification status, listed properties, total verified viewing requests, report count, and trust score.

This feature is important because tenants need to know whether they are dealing with a real agent or a risky one.

## 11\. Escrow Status

The app must show escrow or payment-holding status. The tenant should see whether the viewing fee or reservation fee is pending, held, verified, released, refunded, or failed.

For the MVP, this can be a simplified escrow status tracker rather than a full legal escrow system. The goal is to show that the tenant’s money is not just disappearing to an unknown person.

## 12\. Viewing Code Generator

After proof verification, the system must generate a unique viewing code. The tenant can present this code to the agent during the viewing appointment.

The viewing code should be linked to the property, tenant, and viewing request. For the MVP, the code can be a random string such as VIEW-8K29XQ.

## 13\. Notification System

The tenant must receive notifications when important events happen. The app should notify the tenant when payment is received, proof is generated, proof is verified, access is unlocked, escrow status changes, or a report is reviewed.

For the MVP, notifications can appear inside the app as status messages. Email or SMS can be added later.

## 14\. Audit Log

The system must keep an audit log of important actions. This includes viewing request creation, payment initiation, proof generation, proof verification, viewing code generation, access unlock, agent verification updates, and fake listing reports.

This is important for the B2B SaaS side because property platforms, agencies, and administrators need a reliable record of what happened.

## 15\. API for Rental Platforms

The app must include a basic API layer so other rental platforms can later connect to UrbanRentisha TrustLayer. For the MVP, this does not need to be a full commercial API. It can include simple endpoints for creating viewing requests, checking verification status, submitting reports, retrieving agent trust profiles, and checking viewing code status.

Example API endpoints:

POST /api/viewing-requests  
GET /api/viewing-requests/:id/status  
POST /api/proofs/verify  
POST /api/listings/:id/report  
GET /api/agents/:id/trust-profile  
GET /api/viewing-codes/:code/verify

## 16\. Tenant Dashboard

The tenant must have a dashboard showing requested properties, payment status, proof status, escrow status, unlocked viewing codes, and notifications.

## 17\. Property Manager Dashboard

The agent or landlord must have a dashboard showing listed properties, viewing requests, verified tenants, escrow statuses, generated viewing codes, reports, and trust score.

## 18\. Admin Dashboard

The admin must have a dashboard for managing the whole platform. The admin should be able to approve listings, verify agents, review fake listing reports, view audit logs, monitor proof verification, and manage suspicious activity.

## 19\. Proof Status Tracker

The app must show a clear status tracker for each viewing request. The statuses should include:

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

## 20\. Demo Mode

The app must include a demo mode for hackathon judges. Demo mode should allow judges to test the full flow quickly using test data and Stellar testnet. The demo should show a tenant requesting a viewing, making a testnet payment, generating a proof, verifying it, unlocking a viewing code, and showing the action in the admin audit log.