# UrbanRentisha TrustLayer Hero Photo Implementation Guide

## 1. Purpose

This guide explains how to implement the **UrbanRentisha TrustLayer landing page hero section** using the hero image named:

```text
hero-ilustration.png
```

This guide is for AI developer implementation, Codex, and frontend developer handoff.

---

## 2. Final Image Requirement

Place the image here:

```text
public/images/hero-ilustration.png
```

The code references the image using:

```tsx
src="/images/hero-ilustration.png"
```

Important: the current filename is intentionally spelled as:

```text
hero-ilustration.png
```

If you rename it to `hero-illustration.png`, update the `src` value inside `components/landing/hero-section.tsx`.

---

## 3. Required Stack

```text
Next.js App Router
TypeScript
Tailwind CSS
Google Fonts
Inter
JetBrains Mono
next/image
Lucide React icons
```

Google Fonts are mandatory.

Use:

```text
Inter = all UI text
JetBrains Mono = code, hashes, transaction IDs, viewing codes only
```

---

## 4. Final Folder Structure

```text
urbanrentisha-landing/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── landing/
│       ├── hero-section.tsx
│       └── logo-mark.tsx
│
├── lib/
│   └── utils.ts
│
├── public/
│   └── images/
│       └── hero-ilustration.png
│
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 5. Hero Layout Specification

## Desktop Layout

```text
Full screen hero section
Dark background
Top navigation inside hero
Two-column grid
Left column: brand message, CTA buttons, trust statistics
Right column: hero illustration image
Bottom strip: three trust proof points
```

## Mobile Layout

```text
Single-column layout
Hero text first
Image below text
CTA buttons stack
Stats use two-column grid
Hero image remains contained and uncropped
```

---

## 6. Hero Image Dimensions

Recommended hero image dimension:

```text
1920px × 1080px
Aspect ratio: 16:9
Format: PNG
Filename: hero-ilustration.png
```

The component displays it inside a responsive frame:

```text
Mobile height: 360px
Tablet height: 460px
Desktop height: 620px
Object fit: contain
```

This ensures the image is never cropped.

---

## 7. Exact Image Code

Use this inside the hero image container:

```tsx
<Image
  src="/images/hero-ilustration.png"
  alt="UrbanRentisha TrustLayer hero illustration showing ZK proof, Stellar blockchain, verified access, and secure rental buildings"
  fill
  priority
  sizes="(max-width: 768px) 100vw, 56vw"
  className="object-contain drop-shadow-[0_30px_70px_rgba(22,163,74,0.22)]"
/>
```

Important behavior:

```text
fill = responsive image container
priority = loads immediately for hero/LCP
object-contain = no cropping
sizes = optimized responsive loading
descriptive alt text = accessibility
```

---

## 8. Hero Copy

Use this exact headline:

```text
Safe Rentals.
Verified Trust.
Zero Compromise.
```

Use this exact body copy:

```text
Stop rental scams. Prove payments privately with zero-knowledge proofs and unlock verified property access on Stellar.
```

Primary button:

```text
Get Started
```

Secondary button:

```text
How it Works
```

---

## 9. Stats

Use these stats:

```text
10K+ Users Protected
2K+ Verified Properties
5K+ Transactions Secured
100% Privacy First
```

---

## 10. Installation

```bash
pnpm install
pnpm add lucide-react clsx tailwind-merge
pnpm dev
```

---

## 11. Implementation Checklist

Before accepting the hero page, confirm:

```text
Google Fonts are loaded in app/layout.tsx.
Inter is used as the primary UI font.
JetBrains Mono is configured for technical text.
hero-ilustration.png is inside public/images.
Hero image appears on the right on desktop.
Hero image appears below the text on mobile.
Image is not cropped.
Hero headline is visible and large.
"Verified Trust." is green.
CTA buttons have hover states.
Stats appear below CTA.
Bottom trust strip appears.
No white/light page background appears in the hero.
```

---

## 12. Final Result

The completed hero communicates:

```text
UrbanRentisha protects tenants from rental scams.
Payments are proven privately using zero-knowledge.
Verification happens through Stellar/Soroban.
Access unlocks only after trust is verified.
```
