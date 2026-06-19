# UrbanRentisha Tenant Onboarding Hero Image Implementation Guide

## 1. Purpose

This guide explains how to use the **right-side image** for the Tenant Onboarding hero section.

This image is used in the onboarding hero card where the left side contains copy and the right side shows the professional illustration with:

```text
Phone access unlocked
Verified property
Shield protection
Payment verified
Private data notice
Quality viewing/access granted cues
```

---

## 2. Correct Image File

Use this filename:

```text
tenant-onboarding-hero-illustration.png
```

Place it here:

```text
public/images/tenant-onboarding-hero-illustration.png
```

The component references it as:

```tsx
src="/images/tenant-onboarding-hero-illustration.png"
```

---

## 3. Recommended Professional Dimensions

Use this image dimension:

```text
Export size: 1600px × 1100px
Aspect ratio: about 16:11
Format: PNG
Background: dark visual or transparent-style composition
```

This size fits the right side of the onboarding hero card well.

## Website Display Size

```text
Desktop display frame: about 640px × 560px
Tablet display frame: about 560px × 430px
Mobile display frame: full width × 340px
```

## Why this dimension works

```text
It is wide enough for the right-side illustration.
It keeps the phone, house, and shield visible.
It does not become too tall for the onboarding hero section.
It remains crisp when displayed around 560px to 680px wide.
```

---

## 4. Final Folder Structure

```text
urbanrentisha-tenant-onboarding-hero/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── onboarding/
│       └── tenant-onboarding-hero.tsx
│
├── public/
│   └── images/
│       └── tenant-onboarding-hero-illustration.png
│
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 5. Required Stack

```text
Next.js App Router
TypeScript
Tailwind CSS
next/image
Google Fonts
Inter
JetBrains Mono
Lucide React
```

Google Fonts are mandatory.

Use:

```text
Inter = all UI text
JetBrains Mono = technical codes, hashes, viewing codes only
```

---

## 6. Hero Layout

Desktop layout:

```text
Large rounded hero card
Left side:
  - welcome badge
  - headline
  - paragraph
  - three benefit rows
  - CTA buttons

Right side:
  - tenant-onboarding-hero-illustration.png
  - contained inside responsive image frame
  - green glow behind image
```

Mobile layout:

```text
Text first
Image below text
CTA buttons stacked
Bottom trust strip stacked
Image remains contained and uncropped
```

---

## 7. Exact Image Code

Use this exact code block:

```tsx
<div className="relative h-[340px] w-full sm:h-[430px] lg:h-[560px]">
  <Image
    src="/images/tenant-onboarding-hero-illustration.png"
    alt="Tenant onboarding hero illustration showing access unlocked, verified property, shield protection, and private payment proof"
    fill
    priority
    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 56vw, 680px"
    className="object-contain drop-shadow-[0_28px_90px_rgba(22,163,74,0.22)]"
  />
</div>
```

## Important image behavior

```text
fill = image fills the responsive frame
object-contain = no cropping
priority = image loads early because it is in the hero section
sizes = responsive browser optimization
drop-shadow = professional green glow effect
```

---

## 8. Implementation Steps

1. Place the image here:

```text
public/images/tenant-onboarding-hero-illustration.png
```

2. Install dependencies:

```bash
pnpm install
pnpm add lucide-react clsx tailwind-merge
```

3. Import the component:

```tsx
import { TenantOnboardingHero } from "@/components/onboarding/tenant-onboarding-hero";
```

4. Render it:

```tsx
export default function HomePage() {
  return (
    <main className="min-h-screen bg-ur-bg text-ur-text">
      <TenantOnboardingHero />
    </main>
  );
}
```

---

## 9. UX Acceptance Checklist

Before approving the implementation, confirm:

```text
The image is named tenant-onboarding-hero-illustration.png.
The image is placed inside public/images.
The image is not cropped.
The image is not stretched.
The phone, property, and shield remain visible.
The image appears on the right side on desktop.
The image stacks below text on mobile.
Google Fonts are loaded.
The dark green UrbanRentisha theme is applied.
CTA buttons are visible.
The hero explains verified viewing and payment proof.
```

---

## 10. Final Recommendation

Use:

```text
tenant-onboarding-hero-illustration.png
1600px × 1100px
PNG
Display with next/image
object-contain
priority
```

This is the best professional setup for the right-side Tenant Onboarding hero illustration.
