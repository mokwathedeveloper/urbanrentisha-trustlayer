# UrbanRentisha TrustLayer AI Agent UX/UI Design

## 1. Purpose

This document defines the AI Agent UX/UI direction for UrbanRentisha TrustLayer. The AI agent is designed to support tenants, property managers, agents, administrators, and hackathon judges by making the platform easier to understand, safer to use, and faster to navigate.

The AI agent should not replace the core product flow. It should support the central trust flow:

```text
Tenant selects verified property
Tenant requests viewing
Tenant pays through Stellar testnet
Tenant generates a ZK payment proof
Soroban verifies the proof
UrbanRentisha unlocks safe property access
```

The AI agent should act as a guided trust assistant that explains what is happening, reduces confusion, highlights risk, and helps users complete the correct next step.

---

## 2. AI Agent Product Role

The AI agent should function as a contextual assistant inside UrbanRentisha TrustLayer.

Its role is to help users:

```text
Understand verified properties
Request viewing access
Understand Stellar testnet payment
Understand ZK payment proof
Track proof verification status
Understand escrow/payment-hold status
Access viewing codes
Report suspicious listings
Interpret agent trust profiles
Navigate tenant, manager, and admin dashboards
Use demo mode during hackathon judging
```

The AI agent must be practical, calm, trustworthy, and non-intrusive.

It should not sound like a chatbot gimmick. It should feel like a professional trust-support layer embedded in the product.

---

## 3. AI Agent Positioning

Recommended name:

```text
TrustGuide
```

Alternative names:

```text
Rentisha Guide
Trust Assistant
Verification Guide
Access Guide
```

Best final name:

```text
TrustGuide
```

Reason:

TrustGuide is simple, clear, product-aligned, and easy for both technical and non-technical users to understand. It communicates help, protection, and verification without sounding too technical or too crypto-heavy.

---

## 4. AI Agent Personality

The AI agent should feel:

```text
Clear
Calm
Protective
Professional
Human
Helpful
Trustworthy
Direct
Non-technical
Safety-first
```

The AI agent should avoid:

```text
Overly technical explanations
Crypto-heavy language
Long paragraphs
Fear-based language
Overpromising legal protection
Fake friendliness
Too much excitement
Unclear instructions
```

---

## 5. Primary AI Agent Users

## 5.1 Tenant

The tenant uses the AI agent to understand whether a listing is verified, what payment is required, what proof verification means, and why viewing details remain locked until verification succeeds.

Tenant needs:

```text
Simple guidance
Safety reassurance
Payment explanation
Proof status explanation
Report listing help
Viewing code support
```

## 5.2 Agent or Property Manager

The property manager uses the AI agent to understand verified viewing requests, suspicious reports, tenant verification status, and dashboard summaries.

Manager needs:

```text
Request summaries
Report explanations
Trust score insights
Verified tenant status
Escrow/payment-hold status interpretation
```

## 5.3 Platform Administrator

The admin uses the AI agent to interpret audit logs, proof verification activity, fake listing reports, suspicious activity, and platform metrics.

Admin needs:

```text
Risk summaries
Audit log interpretation
Report triage
Agent verification guidance
Suspicious activity alerts
Platform health summaries
```

## 5.4 Hackathon Judge

The judge uses demo mode to understand the product quickly. The AI agent should guide the judge through the full flow in 2–3 minutes.

Judge needs:

```text
Fast walkthrough
Clear explanation of ZK
Clear explanation of Stellar
Demo steps
What to look for
Where the proof is verified
Where access unlock happens
```

---

## 6. AI Agent Entry Points

The AI agent should appear in key moments, not everywhere.

Recommended entry points:

```text
Landing page
Demo mode screen
Property detail page
Request viewing screen
Payment screen
Proof generation screen
Proof verification screen
Escrow status screen
Viewing code screen
Tenant dashboard
Manager dashboard
Admin dashboard
Audit log screen
Fake listing report screen
API documentation page
```

---

## 7. AI Agent UI Pattern

Use a compact floating assistant panel, not a full-screen chatbot by default.

Recommended pattern:

```text
Floating help button
Expandable side panel
Contextual suggestion cards
Inline guidance blocks
Status-aware explanations
Quick action buttons
```

## 7.1 Floating Button

Position:

```text
Bottom-right on desktop
Bottom navigation assistant tab on mobile
```

Label:

```text
Ask TrustGuide
```

Icon suggestion:

```text
ShieldCheck
MessageCircle
Sparkles only if used subtly
```

## 7.2 Side Panel

The side panel should include:

```text
Current page context
Suggested next step
Plain-language explanation
Quick actions
Safety tip
Related status summary
```

Example side panel title:

```text
TrustGuide
```

Example subtitle:

```text
Here to help you verify safely.
```

## 7.3 Inline Guidance Blocks

Use inline AI guidance when the user reaches complex steps.

Examples:

```text
Payment screen:
"Your viewing fee is sent through Stellar testnet for this demo. Once payment is received, the app can generate a private proof."

Proof generation screen:
"Your proof confirms that the required payment condition was met without showing unrelated wallet activity."

Proof verification screen:
"The smart contract checks the proof before viewing access is unlocked."
```

---

## 8. AI Agent Screen-by-Screen UX

## 8.1 Landing Page

Purpose:

Help visitors understand the product in simple language.

AI agent role:

```text
Explain what UrbanRentisha does
Explain the trust flow
Explain why ZK and Stellar are used
Guide users to demo mode
```

Suggested prompt chips:

```text
What does this product do?
How does it reduce rental scams?
Where is ZK used?
Where is Stellar used?
Show me the demo flow
```

## 8.2 Demo Mode Screen

Purpose:

Guide hackathon judges through the product in 2–3 minutes.

AI agent role:

```text
Provide step-by-step demo instructions
Explain each step briefly
Highlight ZK proof generation
Highlight Soroban verification
Highlight viewing code unlock
```

Suggested AI card:

```text
Demo Guide

Step 1: Choose a verified property.
Step 2: Request viewing access.
Step 3: Complete a Stellar testnet payment.
Step 4: Generate a ZK payment proof.
Step 5: Verify the proof through Soroban.
Step 6: Unlock the viewing code.
```

## 8.3 Property Listing Page

Purpose:

Help tenants identify verified listings.

AI agent role:

```text
Explain verified badges
Suggest what tenants should check
Warn about suspicious listing signs
Explain report listing option
```

Prompt chips:

```text
What does Verified Property mean?
How do I know this agent is safe?
What should I check before paying?
How do I report a suspicious listing?
```

## 8.4 Property Detail Page

Purpose:

Help tenants understand listing trust signals.

AI agent role:

```text
Summarize property verification
Explain agent trust profile
Explain viewing fee
Explain what happens after Request Viewing
```

Inline AI summary:

```text
This property is verified by the platform. To access viewing details, you will need to complete the viewing fee, generate a private payment proof, and verify it before receiving a viewing code.
```

## 8.5 Request Viewing Screen

Purpose:

Help the tenant understand what they are about to do.

AI agent role:

```text
Explain viewing request
Explain required fee
Explain privacy-preserving proof
Explain locked access
```

Suggested microcopy:

```text
Viewing details stay locked until your payment proof is verified.
```

## 8.6 Stellar Payment Screen

Purpose:

Reduce confusion around testnet payment.

AI agent role:

```text
Explain Stellar testnet
Explain payment status
Explain transaction hash
Explain that no real mainnet funds are used in the MVP
```

Suggested prompt chips:

```text
What is Stellar testnet?
Why do I need to pay first?
Where can I see the transaction?
What happens after payment?
```

## 8.7 ZK Proof Generation Screen

Purpose:

Explain ZK in human language.

AI agent role:

```text
Explain proof generation
Explain what remains private
Explain what becomes public
Explain why proof matters
```

Plain-language explanation:

```text
The proof confirms that the required payment condition was met. It does not need to expose your full wallet history or unrelated activity.
```

## 8.8 Proof Verification Screen

Purpose:

Show that Stellar is part of the product flow.

AI agent role:

```text
Explain Soroban verification
Explain verification status
Explain failed proof state
Explain why access remains locked before verification
```

Suggested status explanation:

```text
Your proof is being checked by the smart contract. If verification succeeds, your viewing code will be unlocked.
```

## 8.9 Escrow Status Screen

Purpose:

Explain simplified payment-hold status without overclaiming legal escrow.

AI agent role:

```text
Explain pending
Explain active
Explain released
Explain refunded
Explain failed
```

Safe language:

```text
This MVP shows payment-hold status for transparency. It is not a full legal escrow service.
```

## 8.10 Viewing Code Success Screen

Purpose:

Confirm access unlock.

AI agent role:

```text
Explain how to use viewing code
Explain expiry if applicable
Explain next steps
Warn users not to share code publicly
```

Suggested success message:

```text
Your viewing access is unlocked. Use this code when contacting the verified agent.
```

## 8.11 Fake Listing Report Screen

Purpose:

Support tenants reporting suspicious listings.

AI agent role:

```text
Help users choose report reason
Explain what happens after reporting
Encourage factual reporting
Avoid panic language
```

Suggested report reasons:

```text
Fake property
Suspicious agent
Wrong location
Duplicate listing
Payment scam
Misleading details
```

## 8.12 Tenant Dashboard

Purpose:

Help tenants understand all active requests.

AI agent role:

```text
Summarize requested properties
Explain pending steps
Highlight unlocked codes
Highlight reported listings
Explain failed states
```

Suggested dashboard summary:

```text
You have 2 active viewing requests. One proof is verified and one payment is pending.
```

## 8.13 Property Manager Dashboard

Purpose:

Help managers prioritize verified tenants and reports.

AI agent role:

```text
Summarize verified requests
Highlight reports received
Explain trust score
Suggest action on pending requests
```

Suggested manager summary:

```text
You have 4 verified tenant requests and 1 listing report under review.
```

## 8.14 Admin Dashboard

Purpose:

Help administrators review trust and safety activity.

AI agent role:

```text
Summarize platform risk
Explain proof verification activity
Highlight suspicious reports
Recommend review priorities
```

Suggested admin summary:

```text
There are 3 open reports, 12 verified proofs, and 1 agent pending verification.
```

## 8.15 API Documentation Page

Purpose:

Help rental platforms understand integration.

AI agent role:

```text
Explain endpoints
Suggest integration steps
Explain API response fields
Guide developers through testing
```

Suggested prompt chips:

```text
How do I create a viewing request?
How do I check proof status?
How do I verify a viewing code?
How do I submit a report?
```

---

## 9. AI Agent Quick Actions

The AI agent should provide action buttons based on the current screen.

Examples:

```text
Start demo
Request viewing
Check payment status
Generate proof
Verify proof
View code
Report listing
Open audit log
Review reports
View API docs
```

Each quick action should be context-aware and should never expose actions the user role cannot perform.

---

## 10. AI Agent Conversation Rules

## 10.1 Tenant Conversation Rules

The agent should:

```text
Use simple language
Avoid deep technical explanations unless requested
Protect the tenant from risky behavior
Explain that viewing access unlocks only after verification
Encourage reporting suspicious listings
```

The agent should not:

```text
Ask for seed phrases
Ask for private keys
Claim real legal escrow protection
Promise refunds if not implemented
Guarantee that every verified listing is risk-free
```

## 10.2 Manager Conversation Rules

The agent should:

```text
Summarize requests
Explain verification statuses
Highlight reports
Help prioritize actions
Provide operational clarity
```

The agent should not:

```text
Automatically dismiss reports
Hide negative trust indicators
Encourage manual off-platform payments
```

## 10.3 Admin Conversation Rules

The agent should:

```text
Highlight risk
Summarize audit logs
Explain proof and payment failures
Recommend review priorities
Show evidence clearly
```

The agent should not:

```text
Make final enforcement decisions without admin confirmation
Delete reports automatically
Approve suspicious agents automatically
```

---

## 11. AI Agent Trust and Safety Rules

The AI agent must follow these safety rules:

```text
Never request seed phrases.
Never request private keys.
Never ask users to send money outside the platform.
Never claim legal escrow unless implemented.
Never guarantee that a property is completely risk-free.
Never hide payment failure states.
Never unlock viewing details before proof verification.
Always explain suspicious listing reporting clearly.
Always show what data is public and what stays private.
```

---

## 12. AI Agent Visual Design

The AI agent should follow the UrbanRentisha visual system.

## 12.1 Recommended Colours

```text
Panel background: #FFFFFF
Primary action: #0F766E
Header text: #0F172A
Secondary text: #475569
Border: #E2E8F0
Verified state: #16A34A
Warning state: #EA580C
Error state: #DC2626
Technical highlight: #2563EB
```

## 12.2 Component Style

```text
Rounded cards
Soft borders
Clean spacing
Clear icon labels
No clutter
Readable text
Compact suggestions
Mobile-first layout
```

## 12.3 AI Agent Card Types

```text
Explanation card
Next-step card
Safety tip card
Status summary card
Proof explanation card
Payment explanation card
Report guidance card
Admin insight card
API help card
Demo guide card
```

---

## 13. AI Agent Component List

Frontend components:

```text
ai-agent-button.tsx
ai-agent-panel.tsx
ai-agent-message.tsx
ai-agent-prompt-chip.tsx
ai-agent-quick-action.tsx
ai-agent-status-card.tsx
ai-agent-safety-tip.tsx
ai-agent-demo-guide.tsx
ai-agent-page-context.tsx
```

Backend components:

```text
ai-agent.controller.ts
ai-agent.service.ts
ai-agent.module.ts
ai-agent-context.service.ts
ai-agent-prompts.service.ts
ai-agent-actions.service.ts
ai-agent-audit.service.ts
```

Shared types:

```text
AiAgentRole
AiAgentContext
AiAgentMessage
AiAgentAction
AiAgentPromptChip
AiAgentSafetyRule
```

---

## 14. AI Agent Backend Design

The AI agent backend should use a context-aware design.

The backend should receive:

```text
userRole
currentPage
entityId
viewingRequestStatus
paymentStatus
proofStatus
escrowStatus
accessStatus
reportStatus
```

The backend should return:

```text
summary
recommendedNextStep
suggestedPrompts
quickActions
safetyTips
pageExplanation
```

Recommended endpoint:

```text
POST /api/ai-agent/context
```

Request example:

```json
{
  "userRole": "TENANT",
  "currentPage": "PROOF_VERIFICATION",
  "viewingRequestId": "vr_123",
  "paymentStatus": "RECEIVED",
  "proofStatus": "SUBMITTED",
  "accessStatus": "LOCKED"
}
```

Response example:

```json
{
  "summary": "Your proof has been submitted for verification.",
  "recommendedNextStep": "Wait for proof verification to complete.",
  "suggestedPrompts": [
    "What is being verified?",
    "Why is access still locked?",
    "What happens after verification?"
  ],
  "quickActions": [
    {
      "label": "Refresh proof status",
      "action": "REFRESH_PROOF_STATUS"
    }
  ],
  "safetyTips": [
    "Do not share your viewing code publicly once it is generated."
  ]
}
```

---

## 15. AI Agent Data Model

Recommended model:

```text
AiAgentInteraction
```

Suggested fields:

```text
id
userId
userRole
currentPage
entityType
entityId
prompt
response
actionTaken
metadata
createdAt
```

This model supports analytics, user support, demo review, and future improvement.

---

## 16. AI Agent Prompt Library

## 16.1 Tenant Prompt Examples

```text
What does Verified Property mean?
Why do I need to pay a viewing fee?
What is Stellar testnet?
What is a ZK payment proof?
Why is my access still locked?
How do I report a fake listing?
Where is my viewing code?
```

## 16.2 Manager Prompt Examples

```text
Which tenants are verified?
Which requests are pending?
What does this trust score mean?
Which listings received reports?
Which viewing codes were generated today?
```

## 16.3 Admin Prompt Examples

```text
Which reports need review?
Which agents are pending verification?
Show recent proof verification failures.
Summarize suspicious activity.
Explain this audit log event.
```

## 16.4 Developer/API Prompt Examples

```text
How do I create a viewing request?
How do I check proof status?
How do I verify a viewing code?
What does this API response mean?
How do I test the demo API?
```

---

## 17. AI Agent States

The AI agent must support these states:

```text
Idle
Listening
Thinking
Responding
Action suggested
Action completed
Action failed
No context available
Role restricted
Offline or unavailable
```

## 17.1 Loading State

```text
TrustGuide is checking your request status.
```

## 17.2 Error State

```text
I could not retrieve the latest status. Please try refreshing this request.
```

## 17.3 Role Restricted State

```text
This action is only available to administrators.
```

## 17.4 No Context State

```text
I can help explain this page or guide you to the next step.
```

---

## 18. AI Agent Success Metrics

Track:

```text
Number of AI agent interactions
Most used prompt chips
Number of users guided through full demo
Reduction in abandoned payment flows
Reduction in proof verification confusion
Number of reports submitted through AI guidance
Tenant completion rate from request to viewing code
Admin report review speed
API documentation questions answered
```

---

## 19. AI Agent MVP Scope

For the hackathon MVP, implement a simple rule-based/context-aware assistant instead of a complex autonomous agent.

MVP should include:

```text
Floating assistant button
Expandable side panel
Context-aware explanations
Prompt chips
Quick actions
Demo mode guidance
Tenant payment/proof explanations
Admin audit explanation
Report listing guidance
```

Do not overbuild the AI agent in the first version. It should make the product clearer, not distract from the ZK and Stellar flow.

---

## 20. AI Agent Future Scope

Future versions can include:

```text
Natural language report triage
Fraud-risk summary generation
Auto-generated admin investigation notes
Tenant safety recommendations
API integration assistant
Agent trust score explanation
Webhook troubleshooting assistant
Property verification assistant
Multi-language support
Voice-assisted demo mode
```

---

## 21. Final AI Agent UX Principle

The AI agent should make UrbanRentisha TrustLayer easier to trust, easier to understand, and easier to complete.

It should support the product promise:

```text
A tenant privately proves payment, Stellar verifies it, and UrbanRentisha unlocks safe property access.
```

The agent should never become the main product. It should be a quiet, intelligent trust guide that helps users understand the status, next step, and safety meaning of every important action.
