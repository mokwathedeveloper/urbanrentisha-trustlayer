# UrbanRentisha TrustLayer Landing Page UI/UX Guide

## 1. Purpose

This document defines the UI/UX direction for the **UrbanRentisha TrustLayer Landing Page**.

It matches the landing page starter code and should guide AI agents, Codex, UI designers, and frontend developers when implementing or improving the landing page.

The landing page must explain:

```text
What UrbanRentisha TrustLayer is
Why rental scams are a real problem
How ZK payment proof protects tenants
How Stellar/Soroban verifies the proof
How viewing access unlocks after verification
Why the product can become a B2B rental trust API
```

The page must feel professional, safe, human, clean, and product-specific.

---

## 2. Core UX Goal

The page must help a visitor understand the product within 10 seconds.

The visitor should quickly understand:

```text
UrbanRentisha helps tenants avoid unsafe rental viewing payments.
Tenants pay through Stellar testnet.
A private ZK proof confirms the payment condition.
Soroban verifies the proof.
Viewing details unlock only after verification succeeds.
Rental platforms can integrate the trust layer through APIs.
```

---

## 3. Page Type

```text
Product landing page
Hackathon demo landing page
B2B SaaS trust-layer introduction page
Web3 product explainer page
```

The page is not a full property marketplace screen. It is a product explanation and conversion screen.

---

## 4. Target Users

The landing page must speak to four audiences.

## 4.1 Hackathon Judges

Judges need to understand:

```text
The real-world problem
Where ZK adds value
How Stellar is integrated
What the working demo flow will show
```

## 4.2 Tenants

Tenants need to feel:

```text
Safe
Protected
In control
Less exposed
More confident before paying
```

## 4.3 Property Managers and Agents

Managers need to understand:

```text
Verified tenants
Reduced fake inquiries
Less manual payment checking
Clear audit trail
Better trust profile
```

## 4.4 Rental Platforms

Platforms need to see:

```text
API integration potential
Trust-layer infrastructure
Scam reduction
Reusable verification flow
B2B SaaS value
```

---

## 5. Brand Direction

## 5.1 Brand Personality

UrbanRentisha TrustLayer should feel:

```text
Trustworthy
Human
Eco-conscious
Professional
Secure
Modern
Calm
Clear
B2B-ready
Locally relevant
```

## 5.2 Visual Identity

The landing page should use an **eco-friendly real estate trust** identity.

Visual cues:

```text
House
Shield
Leaf
Verification badge
Viewing code
Safe access
Soft green surfaces
Clean white cards
Deep navy text
```

Avoid:

```text
Dark hacker UI
Overly crypto-heavy visuals
Random blockchain cubes
Generic AI dashboards
Overcrowded sections
Neon overload
Fake stock-photo feeling
```

---

## 6. Color System

The landing page uses the UrbanRentisha color palette.

| Token | Hex | Usage |
|---|---|---|
| `page` | `#F8FBF7` | Main page background |
| `surface` | `#FFFFFF` | Navbar, cards, clean panels |
| `card` | `#FFFFFF` | Primary cards |
| `card-soft` | `#F1F8F2` | Soft card hover, inner panels |
| `border` | `#DCE8DD` | Card borders and dividers |
| `primary` | `#166534` | Main CTA, logo, trusted states |
| `primary-hover` | `#14532D` | CTA hover |
| `secondary` | `#0F766E` | Technical trust accents |
| `accent` | `#84CC16` | Eco highlight and leaf accent |
| `sand` | `#F4E7C5` | Human warmth and soft highlight |
| `warning` | `#F59E0B` | Scam risk and caution indicators |
| `warning-bg` | `#FFF7E6` | Warning cards |
| `error` | `#DC2626` | Failed proof or unsafe action |
| `error-bg` | `#FEF2F2` | Error background |
| `success` | `#16A34A` | Verified and completed status |
| `success-bg` | `#EAF7EE` | Verified badges and safe cards |
| `navy` | `#0F172A` | Main headings |
| `text-primary` | `#0F172A` | Body and heading text |
| `text-secondary` | `#475569` | Descriptions |
| `text-muted` | `#64748B` | Captions and metadata |
| `text-inverse` | `#FFFFFF` | Text on green buttons |
| `link` | `#0F766E` | Links |

## 6.1 Color Usage Rules

```text
Green means verified, safe, successful, trusted.
Amber means caution, rental scam risk, or pending status.
Red means failed, dangerous, blocked, or rejected.
Navy is used for strong authority and readability.
White keeps the product clean and trustworthy.
Soft green backgrounds make the product feel human and organic.
```

---

## 7. Typography

## 7.1 Fonts

```text
Primary font: Inter
Technical font: JetBrains Mono
```

Use Inter for:

```text
Navigation
Headings
Buttons
Labels
Body copy
Cards
FAQ
CTA text
```

Use JetBrains Mono only for:

```text
Viewing codes
API endpoints
Transaction hashes
Contract IDs
Request IDs
```

## 7.2 Type Scale

| Role | Size | Weight | Usage |
|---|---:|---:|---|
| Display | 56–72px | 900 | Hero headline |
| H1 | 40–56px | 800–900 | Major page statements |
| H2 | 30–40px | 700 | Section headings |
| H3 | 20–24px | 700 | Card titles |
| Body Large | 18px | 400 | Hero paragraph |
| Body | 14–16px | 400 | Descriptions |
| Caption | 12px | 600 | Eyebrows, badges, metadata |
| Code | 13–14px | 500 | Viewing code and API endpoints |

## 7.3 Typography Rules

```text
Hero headline must be bold and visible.
Descriptions should be medium length, not too dense.
Do not use all caps for paragraphs.
Use uppercase only for section eyebrows and metadata labels.
Keep line height generous for trust and readability.
```

---

## 8. Spacing System

Base spacing unit:

```text
4px
```

Recommended spacing:

| Token | Value | Usage |
|---|---:|---|
| `space-1` | 4px | Icon gap |
| `space-2` | 8px | Small inline gap |
| `space-3` | 12px | Badge padding |
| `space-4` | 16px | Standard inner gap |
| `space-5` | 20px | Compact card padding |
| `space-6` | 24px | Standard card padding |
| `space-8` | 32px | Section internal spacing |
| `space-10` | 40px | Major block spacing |
| `space-12` | 48px | Section component spacing |
| `space-16` | 64px | Landing section spacing |
| `space-20` | 80px | Large section spacing |

## 8.1 Container

```text
Max width: 1280px
Mobile horizontal padding: 16px
Tablet horizontal padding: 24px
Desktop horizontal padding: 32px
```

## 8.2 Layout Rule

Every major section must breathe. Do not crowd cards or force too much text into one row.

---

## 9. Page Structure

The page must use this exact structure:

```text
1. LandingNavbar
2. HeroSection
3. TrustStrip
4. ProblemSection
5. SolutionFlowSection
6. FeatureBentoSection
7. HowItWorksSection
8. DemoPreviewSection
9. ApiIntegrationSection
10. FaqSection
11. FinalCtaSection
12. LandingFooter
```

---

# 10. Section-by-Section UI/UX Specification

## 10.1 LandingNavbar

## Purpose

The navbar gives users immediate brand recognition and quick access to key sections.

## Content

```text
Logo
Problem
How it works
Features
API
FAQ
View API Docs button
Try Demo button
Mobile menu icon
```

## Layout

```text
Height: 64px
Sticky top
White/soft page background with blur
Border bottom: #DCE8DD
Logo left
Navigation center/right
CTA buttons right
Mobile menu icon shown below desktop breakpoint
```

## Interaction

```text
Nav links scroll to page sections.
Primary CTA points to demo mode.
Secondary CTA points to API docs.
Mobile menu can later open a drawer.
```

## UX Rule

The navbar must remain clean and not over-explain the product.

---

## 10.2 HeroSection

## Purpose

The hero must explain the full product value in one screen.

## Main Message

```text
Safer rental viewing through private payment proof.
```

## Required Elements

```text
Verified/ZK badge
Large headline
Short paragraph
Primary CTA: Try guided demo
Secondary CTA: View API docs
Three trust bullets
Right-side product flow card
Viewing code preview
```

## Right-Side Hero Card

The hero card should show:

```text
Viewing request
Verified property
Payment received
Private proof generated
Soroban proof verified
Viewing code ready
```

## UX Rule

The hero must make ZK and Stellar visible, but not intimidating.

Use human copy first, technical proof second.

---

## 10.3 TrustStrip

## Purpose

The trust strip summarizes the platform in three quick trust signals.

## Cards

```text
Payment Proof
Stellar
Verified Access
```

## Layout

```text
3 cards on desktop
Stacked cards on mobile
White background
Soft borders
Icon left, text right
```

## UX Rule

This strip should confirm that the product is not only a rental page. It is a proof and access layer.

---

## 10.4 ProblemSection

## Purpose

This section explains why the product matters.

## Required Problems

```text
Fake rental listings
Unsafe viewing fees
Weak trust records
```

## Layout

```text
Section heading left
3-card grid
Amber warning icon backgrounds
Short problem descriptions
```

## UX Rule

The tone should be serious but not fear-based.

Avoid dramatic claims. Focus on practical pain.

---

## 10.5 SolutionFlowSection

## Purpose

This section visually explains the trust flow.

## Flow

```text
Verified property
→ Stellar payment
→ ZK proof
→ Soroban verification
→ Viewing code
```

## Layout

```text
5 equal cards on desktop
Stacked cards on mobile
Arrow connectors on desktop
Each card has step number, icon, title, and short description
```

## UX Rule

This is one of the most important sections for hackathon judges.

It must clearly show how ZK and Stellar work together.

---

## 10.6 FeatureBentoSection

## Purpose

This section explains product capabilities without listing all 20 features.

## Featured Cards

```text
Verified property badge
Private payment proof
Viewing code unlock
Agent trust profile
Platform API
```

## Layout

```text
Bento grid
3 cards across first row
2 wider cards second row
Soft hover background
Strong icon hierarchy
```

## UX Rule

Only show the features that support the landing page story. Do not overload this screen with all product features.

---

## 10.7 HowItWorksSection

## Purpose

This section supports the demo story and makes implementation flow obvious.

## Steps

```text
Tenant requests access to a verified property.
The app creates a viewing request and payment reference.
Tenant completes a Stellar testnet payment.
A ZK proof is generated off-chain.
Soroban verifies proof or records verification status.
UrbanRentisha unlocks the viewing code.
```

## Layout

```text
Text section left
Step list card right
Numbered rows
Check icons
Clear separation between rows
```

## UX Rule

This section should be copy-paste useful for the demo video script.

---

## 10.8 DemoPreviewSection

## Purpose

This section tells judges that the product can be tested quickly.

## Required Content

```text
Hackathon demo mode badge
Short explanation
Start demo button
Open audit log button
Proof verified status
Code generated status
Audit recorded status
```

## Layout

```text
Large explanation card left
Status stack right
```

## UX Rule

Make the demo feel reliable. The user should know the product has a guided path.

---

## 10.9 ApiIntegrationSection

## Purpose

This section positions UrbanRentisha as a B2B SaaS/API trust layer.

## Required Endpoints

```text
POST /api/viewing-requests
GET /api/viewing-requests/:id/status
POST /api/proofs/verify
GET /api/viewing-codes/:code/verify
```

## Layout

```text
Text left
API endpoint card right
Code uses JetBrains Mono
Each endpoint has status badge
```

## UX Rule

This section must look developer-friendly but not too technical for non-developers.

---

## 10.10 FaqSection

## Purpose

Answer likely judge, tenant, and developer questions.

## Required FAQ

```text
Is UrbanRentisha a full rental marketplace?
Where does ZK add value?
Where is Stellar used?
Is this full legal escrow?
```

## Layout

```text
Centered heading
Accordion cards
White cards on soft green page background
```

## UX Rule

Answers must be short and honest. Do not overpromise escrow or privacy.

---

## 10.11 FinalCtaSection

## Purpose

Close with the main promise and demo CTA.

## Copy Direction

```text
Prove the payment. Protect the tenant. Unlock trusted rental access.
```

## Layout

```text
Soft green CTA panel
Shield icon
Large headline
Short paragraph
Primary demo button
```

## UX Rule

This should feel confident and calm, not loud.

---

## 10.12 LandingFooter

## Purpose

Simple brand close and trust phrase.

## Required Text

```text
Secure. Private. Verifiable. Built on Stellar.
```

## Layout

```text
Logo left
Trust phrase right
Stacked on mobile
```

---

# 11. Component Design Rules

## 11.1 Buttons

## Primary Button

```text
Background: #166534
Hover: #14532D
Text: #FFFFFF
Height: 40px standard, 52px large
Radius: 8px
Font: Inter SemiBold
```

## Outline Button

```text
Background: transparent or white
Border: #DCE8DD
Text: #0F172A
Hover background: #F1F8F2
```

## Rule

Primary buttons should always represent the main action.

For this landing page, the main action is:

```text
Try guided demo
Start demo mode
```

---

## 11.2 Cards

```text
Background: #FFFFFF
Border: #DCE8DD
Radius: 18px to 24px
Padding: 24px
Shadow: soft and minimal
Hover: #F1F8F2
```

Cards must not feel heavy or dark.

---

## 11.3 Badges

## Verified Badge

```text
Background: #EAF7EE
Text: #16A34A
Border: green at low opacity
Icon: ShieldCheck or CheckCircle2
```

## Outline Badge

```text
Background: transparent
Border: #DCE8DD
Text: #0F172A
```

---

## 11.4 Icons

Use Lucide React icons.

Preferred icons:

```text
ShieldCheck
Home
Leaf
Wallet
LockKeyhole
FileCheck2
KeyRound
BadgeCheck
UserCheck
Code2
Database
AlertTriangle
Activity
```

Rules:

```text
Icons must have labels.
Icons must not carry meaning alone.
Use 20px icons in normal cards.
Use 24px icons in feature cards.
Use green for trusted actions.
Use amber for scam-risk problems.
```

---

# 12. Responsive Behavior

## Mobile

```text
Single-column layout
Navbar shows mobile menu icon
Hero text stacks above hero card
Trust strip stacks
Solution steps stack vertically
Bento cards become full-width
API section stacks
CTA buttons stack
Large tap targets
```

## Tablet

```text
Two-column where appropriate
Cards can use 2-column grids
Keep hero readable
Avoid overly dense rows
```

## Desktop

```text
Hero uses two columns
Trust strip uses three columns
Problem cards use three columns
Solution flow uses five columns
Feature bento uses 12-column layout
API and demo sections use two columns
```

---

# 13. Interaction and Motion Rules

Keep animations minimal.

Allowed:

```text
Button hover color
Card hover background
Smooth section scroll
Accordion open/close
Soft focus rings
```

Avoid:

```text
Parallax
Heavy 3D animation
Rotating blockchain graphics
Auto-playing distracting animations
Large scroll effects
```

---

# 14. Accessibility Rules

The landing page must follow these rules:

```text
Use semantic HTML.
Use visible focus states.
Use accessible button labels.
Use aria-label where icons are used alone.
Do not rely only on color to show status.
Maintain strong contrast between text and background.
Keep body text at 14px or above.
Use 44px minimum tap targets on mobile.
Use meaningful heading hierarchy.
```

---

# 15. UX Writing Direction

## Tone

```text
Clear
Warm
Professional
Direct
Protective
Non-hype
Non-technical first
Technical only when needed
```

## Recommended Copy

```text
Safer rental viewing through private payment proof.
Viewing details unlock only after proof verification succeeds.
Prove the payment without exposing unrelated wallet activity.
Built for rental platforms that need a trust layer.
Secure. Private. Verifiable. Built on Stellar.
```

## Avoid

```text
Crypto moonshot language
Overpromising full escrow
Overpromising complete fraud elimination
Long ZK explanations in the hero
Generic AI SaaS claims
```

---

# 16. Implementation Quality Checklist

Before accepting the landing page, confirm:

```text
Hero headline is visible and strong.
Primary CTA is clear.
Page uses UrbanRentisha green identity.
Logo appears eco-friendly and real-estate focused.
ZK and Stellar appear in the first screen.
Problem section is specific to rental scams.
Solution flow clearly shows proof and verification.
Viewing code appears as a concrete product outcome.
API section supports B2B positioning.
FAQ is honest about escrow and MVP scope.
Mobile layout is clean and readable.
All buttons have visible hover and focus states.
All cards have consistent spacing and border radius.
No generic crypto dashboard look appears.
```

---

# 17. Final UI/UX Summary

The UrbanRentisha landing page should communicate one strong story:

```text
Rental viewing payments are risky when trust is manual.
UrbanRentisha creates a verified access flow.
The tenant pays through Stellar testnet.
A ZK proof confirms the required payment condition privately.
Soroban verifies the proof.
The viewing code unlocks only after verification succeeds.
```

The page must be clean enough for tenants, credible enough for property managers, technical enough for judges, and structured enough for developers.
