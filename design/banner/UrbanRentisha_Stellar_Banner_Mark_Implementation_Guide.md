# UrbanRentisha Stellar Banner Mark Implementation Guide

## 1. Purpose

This guide explains how to use the **Stellar image only** inside the UrbanRentisha landing page banner section.

The image should appear in the center of this banner:

```text
Built on Stellar. Powered by Privacy.   |   Stellar image   |   Stay Updated
```

This is not the hero image. It belongs in the **Stellar privacy banner section** near the bottom of the landing page, before the footer.

---

## 2. Correct Image Specification

Use this exact professional image size:

```text
Canvas size: 720px × 240px
Aspect ratio: 3:1
Format: PNG
Background: Transparent
Filename: stellar-banner-mark.png
```

## 2.1 Safe Area

Keep the logo inside this safe area:

```text
Safe width: 560px
Safe height: 140px
Horizontal padding: 80px left and right
Vertical padding: 50px top and bottom
```

This prevents the logo from touching the banner edges.

---

## 3. Where to Place the Image

Place the image here:

```text
public/images/stellar-banner-mark.png
```

Then reference it in code as:

```tsx
src="/images/stellar-banner-mark.png"
```

Do not use a relative import for this image. Use the public image path.

---

## 4. Website Display Size

The image should be exported large but displayed smaller for crispness.

Recommended display sizes:

```text
Desktop: 360px × 120px
Tablet: 300px × 100px
Mobile: 240px × 80px
```

The image must use:

```text
object-contain
```

This keeps the image from cropping or stretching.

---

## 5. Final Folder Structure

```text
urbanrentisha-landing/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── landing/
│       └── stellar-banner-section.tsx
│
├── lib/
│   └── utils.ts
│
├── public/
│   └── images/
│       └── stellar-banner-mark.png
│
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 6. Required Stack

```text
Next.js App Router
TypeScript
Tailwind CSS
Google Fonts
Inter
JetBrains Mono
next/image
Lucide React
```

Google Fonts are mandatory.

Use:

```text
Inter = all UI text
JetBrains Mono = technical values only
```

---

## 7. Component Usage

Create this file:

```text
components/landing/stellar-banner-section.tsx
```

Then import it into your landing page:

```tsx
import { StellarBannerSection } from "@/components/landing/stellar-banner-section";
```

Use it like this:

```tsx
export default function HomePage() {
  return (
    <main className="min-h-screen bg-ur-bg text-ur-text">
      <StellarBannerSection />
    </main>
  );
}
```

---

## 8. Image Code

Use this exact image block:

```tsx
<div className="relative h-[80px] w-[240px] md:h-[100px] md:w-[300px] lg:h-[120px] lg:w-[360px]">
  <Image
    src="/images/stellar-banner-mark.png"
    alt="Stellar logo"
    fill
    priority
    sizes="(max-width: 768px) 240px, (max-width: 1024px) 300px, 360px"
    className="object-contain"
  />
</div>
```

## Why this works

```text
fill = image fills the defined frame
object-contain = prevents cropping
priority = loads early because this is a visible banner asset
sizes = optimizes mobile, tablet, and desktop image delivery
```

---

## 9. Banner Placement in Landing Page

Recommended landing page order:

```text
Navbar
Hero Section
Stats / Trust Strip
Problem Section
ZK + Stellar Trust Flow
Built for Everyone Section
Why UrbanRentisha Section
Stellar Banner Section
Footer
```

The Stellar image belongs in:

```text
Stellar Banner Section
```

---

## 10. Styling Rules

The banner should use:

```text
Dark glass card background
Thin white border at low opacity
Subtle green glow behind the Stellar image
Three-column layout on desktop
Stacked layout on mobile
No extra color palette block
No flow diagram
No unrelated graphics
```

---

## 11. Acceptance Checklist

Before accepting the implementation, confirm:

```text
The image is named stellar-banner-mark.png.
The image is inside public/images.
The image canvas is 720px × 240px.
The image has a transparent background.
The image displays as 360px × 120px on desktop.
The image displays as 300px × 100px on tablet.
The image displays as 240px × 80px on mobile.
The image is centered in the banner.
The image is not cropped.
The image is not stretched.
The banner appears before the footer.
Google Fonts are loaded in app/layout.tsx.
```

---

## 12. Final Recommendation

Use:

```text
stellar-banner-mark.png
720px × 240px
Transparent PNG
Displayed at 360px × 120px on desktop
```

This is the most professional and stable dimension for the center Stellar image in the banner.
