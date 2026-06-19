# UrbanRentisha TrustLayer Landing Page UI/UX Blueprint

## 1. Purpose

This file is a developer-ready UI/UX blueprint for the **UrbanRentisha TrustLayer Landing Page**.

It is designed for:

```text
AI implementation
Codex implementation
Frontend developer handoff
Next.js TypeScript build
Tailwind CSS implementation
Consistent spacing, sections, colors, and interactions
```

This blueprint covers **only Screen 1: Landing Page**.

The landing page explains:

```text
UrbanRentisha TrustLayer
The rental scam problem
The ZK payment proof flow
The Stellar/Soroban verification flow
The viewing-code unlock outcome
The B2B API integration direction
```

---

## 2. Design Inspiration Rule

The attached MantleMandate design system is used only as **structural inspiration** for:

```text
Strict spacing
Technical trust tone
Clean cards
Precise typography
Strong button hierarchy
Clear status rules
Developer-ready component thinking
```

Do not copy MantleMandate branding.

UrbanRentisha must keep its own identity:

```text
Eco-friendly real estate trust
Green, white, navy, sand, and trust-teal palette
Human, safe, verified, professional feeling
Rental trust and property access focus
```

---

## 3. UrbanRentisha Landing Page Section Order

The landing page must follow this exact order:

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

Do not reorder sections without product approval.

---

## 4. Visual Direction

## Brand Feel

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
```

## Color Tokens

```text
page: #F8FBF7
surface: #FFFFFF
card: #FFFFFF
card-soft: #F1F8F2
border: #DCE8DD
primary: #166534
primary-hover: #14532D
secondary: #0F766E
accent: #84CC16
sand: #F4E7C5
warning: #F59E0B
warning-bg: #FFF7E6
error: #DC2626
error-bg: #FEF2F2
success: #16A34A
success-bg: #EAF7EE
navy: #0F172A
text-primary: #0F172A
text-secondary: #475569
text-muted: #64748B
text-inverse: #FFFFFF
link: #0F766E
```

## Typography

```text
Primary UI font: Inter
Technical font: JetBrains Mono
```

Rules:

```text
Headings use Inter Black/Bold.
Body text uses Inter Regular.
Code, hashes, request IDs, viewing codes use JetBrains Mono.
Do not use monospace for normal text.
Do not use all caps for body copy.
```

## Spacing

Base spacing unit:

```text
4px
```

Landing page container:

```text
max-width: 1280px
horizontal padding: 16px mobile, 24px tablet, 32px desktop
section spacing: 64px to 80px
card padding: 24px
hero vertical spacing: 80px to 96px
```

---

## 5. Folder Structure

Use this structure inside `apps/web`.

```text
apps/web/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   └── section-heading.tsx
│   │
│   └── landing/
│       ├── api-integration-section.tsx
│       ├── demo-preview-section.tsx
│       ├── faq-section.tsx
│       ├── feature-bento-section.tsx
│       ├── final-cta-section.tsx
│       ├── hero-section.tsx
│       ├── how-it-works-section.tsx
│       ├── landing-footer.tsx
│       ├── landing-navbar.tsx
│       ├── logo-mark.tsx
│       ├── problem-section.tsx
│       ├── solution-flow-section.tsx
│       └── trust-strip.tsx
│
├── lib/
│   ├── landing-data.ts
│   └── utils.ts
│
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json
```

---

## 6. Implementation Setup

Install dependencies:

```bash
pnpm add lucide-react clsx tailwind-merge
```

Required stack:

```text
Next.js App Router
TypeScript
Tailwind CSS
Google Fonts
Lucide React
```

---

# 7. Full Starter Code

The full starter code is included in the accompanying ZIP file.

The key implementation files are:

```text
app/page.tsx
app/layout.tsx
app/globals.css
tailwind.config.ts
lib/landing-data.ts
components/ui/*
components/landing/*
```

---

## 8. Interaction Rules

## Navbar

```text
Sticky top
Blurred background
Desktop links visible
Mobile menu button visible
CTA buttons on desktop
Focus ring on links and buttons
```

## Hero

```text
Primary CTA: Try guided demo
Secondary CTA: View API docs
Hero card shows payment, proof, verification, and viewing code
Viewing code uses JetBrains Mono
```

## Cards

```text
Border: #DCE8DD
Radius: 18px to 24px
Background: #FFFFFF
Hover: #F1F8F2
No heavy shadows
Soft professional depth only
```

## Buttons

```text
Primary: green
Secondary/outline: white with green/navy text
Large CTA height: 52px
Standard button height: 40px
```

## Accessibility

```text
All buttons must have visible focus rings.
All text must maintain strong contrast.
Icons must support meaning but not replace labels.
Viewing code must be selectable/copyable in future iteration.
Mobile layout must remain single-column and readable.
```

---

## 9. Developer Notes

This landing page should not look like a crypto speculation product.

It should feel like:

```text
A safe rental trust infrastructure product
A human property access tool
A professional B2B SaaS platform
A ZK/Stellar demo that solves a real-world problem
```

Avoid:

```text
Dark hacker dashboard look
Neon overload
Generic blockchain cubes
Overly technical hero copy
Fake stock-photo feeling
Too many animations
Weak CTA hierarchy
```

---

## 10. Success Criteria

The landing page is successful if a visitor understands these within 10 seconds:

```text
UrbanRentisha protects tenants from unsafe rental access payments.
Tenants prove payment privately using ZK.
Stellar/Soroban verifies the proof.
Viewing access unlocks only after verification.
The product can become an API trust layer for rental platforms.
```
