# UrbanRentisha TrustLayer Property Detail Page UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
5. Property Detail Page only
```

## 2. Page Purpose

The **Property Detail Page** shows full property information, rent, viewing fee, property verification badge, agent profile, and report button.

This page helps tenants review the listing, confirm rent and viewing fee, check agent verification, understand the locked viewing-access flow, and report suspicious activity.

---

## 3. Design Inspiration Rule

The provided MantleMandate system is used only as structural inspiration for spacing, dark SaaS hierarchy, precise cards, strong badges, and accessible interactions. Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha keeps its own identity: dark green trust UI, eco-friendly real estate trust, verified property access, Stellar payment-proof workflow, tenant safety, and professional B2B SaaS clarity.

---

## 4. Final Folder Structure

```text
urbanrentisha-property-detail/
├── app/
│   ├── properties/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── property-detail/
│   │   ├── agent-profile-card.tsx
│   │   ├── amenities-grid.tsx
│   │   ├── detail-header.tsx
│   │   ├── logo-mark.tsx
│   │   ├── payment-proof-flow.tsx
│   │   ├── price-viewing-card.tsx
│   │   ├── property-detail-page.tsx
│   │   ├── property-facts.tsx
│   │   ├── property-gallery.tsx
│   │   ├── property-hero-info.tsx
│   │   ├── report-listing-modal.tsx
│   │   ├── similar-trust-card.tsx
│   │   └── verification-panel.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── property-detail-data.ts
│   └── utils.ts
│
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 5. Layout and Interaction Rules

Desktop layout uses a sticky top header, back link, share/report actions, a left content column, and a sticky right sidebar. The left column contains gallery, title/details, facts, amenities, verification, and payment-proof flow. The right sidebar contains rent/viewing fee card, agent card, and tenant protection card.

Interactions: report button opens modal; reason selection uses radio buttons; report textarea has a visible label; submit shows a success state; request viewing CTA is ready for the next payment-proof route.

---

## 6. Full Starter Code

## `package.json`

```json
{
  "name": "urbanrentisha-property-detail-page",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "clsx": "latest",
    "lucide-react": "latest",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "autoprefixer": "latest",
    "postcss": "latest",
    "tailwindcss": "latest",
    "typescript": "latest"
  }
}
```

## `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true
};

export default nextConfig;
```

## `postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ur: {
          bg: "#060B0A",
          "bg-soft": "#0B1512",
          card: "#0E1A16",
          "card-hover": "#12241D",
          input: "#07110E",
          border: "#1F352B",
          "border-strong": "#2E5A45",
          primary: "#16A34A",
          "primary-hover": "#15803D",
          mint: "#34D399",
          cyan: "#22D3EE",
          warning: "#F59E0B",
          "warning-bg": "#2A2000",
          error: "#EF4444",
          "error-bg": "#2D0F0F",
          success: "#22C55E",
          "success-bg": "#0D2818",
          text: "#F8FAFC",
          muted: "#94A3B8",
          subtle: "#64748B",
          disabled: "#475569"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      boxShadow: {
        "green-glow": "0 0 60px rgba(22, 163, 74, 0.24)",
        "soft-dark": "0 24px 80px rgba(0, 0, 0, 0.35)",
        "card-hover": "0 18px 55px rgba(22, 163, 74, 0.13)"
      },
      borderRadius: { "ur-sm": "8px", ur: "12px", "ur-lg": "18px", "ur-xl": "28px" }
    }
  },
  plugins: []
};

export default config;
```

## `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "900"]
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Property Detail | UrbanRentisha TrustLayer",
  description: "Review verified property details, rent, viewing fee, agent profile, and request secure viewing access."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

## `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-inter: Inter, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; min-height: 100vh; background: #060B0A; color: #F8FAFC; font-family: var(--font-inter); }
code, pre, .font-mono { font-family: var(--font-mono); }
::selection { background: rgba(22, 163, 74, 0.35); }

@layer utilities {
  .ur-container { @apply mx-auto w-full max-w-[1380px] px-5 sm:px-6 lg:px-8; }
  .ur-focus { @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ur-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ur-bg; }
  .detail-grid-bg {
    background-image: linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }
}
```

## `app/page.tsx`

```tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/properties/UR-LST-1001");
}
```

## `app/properties/[id]/page.tsx`

```tsx
import { PropertyDetailPage } from "@/components/property-detail/property-detail-page";

type PageProps = { params: { id: string } };

export default function Page({ params }: PageProps) {
  return <PropertyDetailPage propertyId={params.id} />;
}
```

## `lib/utils.ts`

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## `lib/property-detail-data.ts`

```ts
import {
  BadgeCheck,
  Building2,
  Camera,
  Car,
  CheckCircle2,
  Clock3,
  Droplets,
  FileCheck2,
  Home,
  KeyRound,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  Star,
  Trees,
  Wallet,
  Wifi,
  Zap
} from "lucide-react";

export type PropertyDetail = {
  id: string;
  title: string;
  location: string;
  neighborhood: string;
  rentKes: number;
  viewingFeeKes: number;
  depositKes: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  type: string;
  availableFrom: string;
  trustScore: number;
  verificationStatus: "Verified";
  description: string;
  agent: {
    name: string;
    company: string;
    role: string;
    verified: boolean;
    responseTime: string;
    rating: number;
    completedViewings: number;
    phoneMasked: string;
    walletShort: string;
  };
  facts: { label: string; value: string }[];
  amenities: { label: string; icon: typeof Wifi }[];
  verificationChecks: { label: string; description: string; icon: typeof ShieldCheck }[];
};

export const propertyDetail: PropertyDetail = {
  id: "UR-LST-1001",
  title: "Kilimani Green View Apartment",
  location: "Kilimani, Nairobi",
  neighborhood: "Kilimani",
  rentKes: 68000,
  viewingFeeKes: 500,
  depositKes: 68000,
  bedrooms: 2,
  bathrooms: 2,
  sizeSqm: 92,
  type: "Apartment",
  availableFrom: "Available now",
  trustScore: 97,
  verificationStatus: "Verified",
  description: "A verified two-bedroom apartment in Kilimani with secure parking, balcony access, strong natural light, and controlled viewing access. The listing is connected to a verified agent profile and uses the UrbanRentisha payment-proof workflow before private viewing details are unlocked.",
  agent: {
    name: "Amina Njoroge",
    company: "Amina Realty Group",
    role: "Verified Property Agent",
    verified: true,
    responseTime: "Usually replies within 18 minutes",
    rating: 4.9,
    completedViewings: 214,
    phoneMasked: "+254 7•• ••• 418",
    walletShort: "GB7N...K9QP"
  },
  facts: [
    { label: "Property ID", value: "UR-LST-1001" },
    { label: "Type", value: "Apartment" },
    { label: "Bedrooms", value: "2 bedrooms" },
    { label: "Bathrooms", value: "2 bathrooms" },
    { label: "Size", value: "92 sqm" },
    { label: "Deposit", value: "KES 68,000" },
    { label: "Viewing fee", value: "KES 500" },
    { label: "Availability", value: "Available now" }
  ],
  amenities: [
    { label: "Secure parking", icon: Car },
    { label: "Backup power", icon: Zap },
    { label: "Fiber internet", icon: Wifi },
    { label: "Water storage", icon: Droplets },
    { label: "Balcony view", icon: Trees },
    { label: "Verified photos", icon: Camera }
  ],
  verificationChecks: [
    { label: "Property verified", description: "The listing has passed property-level checks before publishing.", icon: Home },
    { label: "Agent verified", description: "The assigned agent profile is verified and connected to this listing.", icon: BadgeCheck },
    { label: "Payment-proof access", description: "Viewing details unlock only after the required payment proof succeeds.", icon: LockKeyhole },
    { label: "Audit trail ready", description: "Viewing request, payment status, proof status, and access status can be reviewed.", icon: FileCheck2 }
  ]
};

export const proofFlow = [
  { title: "Request viewing", description: "Tenant confirms interest in this verified property.", icon: KeyRound },
  { title: "Pay viewing fee", description: "Payment condition is created and tracked before access unlock.", icon: Wallet },
  { title: "Generate payment proof", description: "A private proof confirms payment without exposing unrelated wallet history.", icon: ReceiptText },
  { title: "Unlock access", description: "Viewing code and private access details unlock after verification succeeds.", icon: CheckCircle2 }
];

export const trustMetrics = [
  { label: "Trust score", value: "97%", icon: ShieldCheck },
  { label: "Agent rating", value: "4.9", icon: Star },
  { label: "Viewings", value: "214", icon: Building2 },
  { label: "Response", value: "18m", icon: Clock3 }
];
```

## `components/ui/button.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "warning";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary: "border border-ur-primary bg-ur-primary text-white hover:bg-ur-primary-hover",
  secondary: "border border-ur-border-strong bg-ur-card text-ur-text hover:bg-ur-card-hover",
  ghost: "border border-transparent bg-transparent text-ur-muted hover:bg-white/5 hover:text-white",
  outline: "border border-white/14 bg-transparent text-white hover:border-ur-primary/60 hover:bg-white/5",
  danger: "border border-ur-error/50 bg-ur-error-bg text-ur-error hover:bg-ur-error/15",
  warning: "border border-ur-warning/30 bg-ur-warning-bg text-ur-warning hover:bg-ur-warning/15"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-[52px] px-8 text-base"
};

export function Button({ className, variant = "primary", size = "md", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-ur-sm font-bold transition-colors duration-150 ur-focus disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
```

## `components/ui/badge.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "outline";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant };

const variants: Record<BadgeVariant, string> = {
  success: "border-ur-success/25 bg-ur-success-bg text-ur-success",
  warning: "border-ur-warning/25 bg-ur-warning-bg text-ur-warning",
  danger: "border-ur-error/25 bg-ur-error-bg text-ur-error",
  neutral: "border-white/10 bg-white/5 text-ur-muted",
  outline: "border-white/14 bg-transparent text-white/82"
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold", variants[variant], className)}
      {...props}
    />
  );
}
```

## `components/property-detail/logo-mark.tsx`

```tsx
import Link from "next/link";
import { Home, Leaf, ShieldCheck } from "lucide-react";

export function LogoMark() {
  return (
    <Link href="/" className="flex w-fit items-center gap-3 rounded-ur-sm ur-focus">
      <div className="relative grid h-11 w-11 place-items-center rounded-2xl border border-ur-primary/35 bg-ur-primary/10 shadow-green-glow">
        <ShieldCheck className="absolute h-8 w-8 text-ur-primary" strokeWidth={1.8} />
        <Home className="h-4 w-4 text-white" strokeWidth={2.4} />
        <Leaf className="absolute bottom-1 right-1 h-4 w-4 text-ur-mint" strokeWidth={2.2} />
      </div>
      <div className="leading-tight">
        <p className="text-xl font-black tracking-[-0.04em] text-white">Urban<span className="text-ur-primary">Rentisha</span></p>
        <p className="text-sm font-semibold text-ur-muted">TrustLayer</p>
      </div>
    </Link>
  );
}
```

## `components/property-detail/detail-header.tsx`

```tsx
import Link from "next/link";
import { Bell, LayoutDashboard, Menu, UserRound } from "lucide-react";
import { LogoMark } from "@/components/property-detail/logo-mark";

export function DetailHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="ur-container flex h-20 items-center justify-between">
        <LogoMark />
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {[
            { label: "Listings", href: "/listings", active: true },
            { label: "How it works", href: "/tenant/onboarding", active: false },
            { label: "Proof tracker", href: "/proof-status", active: false },
            { label: "Help", href: "/help", active: false }
          ].map((item) => (
            <Link key={item.label} href={item.href} className={item.active ? "rounded-ur-sm bg-ur-primary/10 px-4 py-2 text-sm font-bold text-ur-mint ur-focus" : "rounded-ur-sm px-4 py-2 text-sm font-bold text-white/56 transition-colors hover:bg-white/5 hover:text-white ur-focus"}>{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button type="button" className="hidden h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus sm:grid" aria-label="Notifications"><Bell className="h-4 w-4" /></button>
          <Link href="/tenant/dashboard" className="hidden h-10 items-center gap-2 rounded-ur-sm border border-white/10 px-4 text-sm font-bold text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus sm:inline-flex"><LayoutDashboard className="h-4 w-4" />Dashboard</Link>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus" aria-label="User menu"><UserRound className="h-4 w-4 sm:hidden" /><Menu className="hidden h-4 w-4 sm:block lg:hidden" /></button>
        </div>
      </div>
    </header>
  );
}
```

## `components/property-detail/property-detail-page.tsx`

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Flag, Share2 } from "lucide-react";
import { propertyDetail } from "@/lib/property-detail-data";
import { DetailHeader } from "@/components/property-detail/detail-header";
import { PropertyGallery } from "@/components/property-detail/property-gallery";
import { PropertyHeroInfo } from "@/components/property-detail/property-hero-info";
import { PriceViewingCard } from "@/components/property-detail/price-viewing-card";
import { AgentProfileCard } from "@/components/property-detail/agent-profile-card";
import { PropertyFacts } from "@/components/property-detail/property-facts";
import { AmenitiesGrid } from "@/components/property-detail/amenities-grid";
import { VerificationPanel } from "@/components/property-detail/verification-panel";
import { PaymentProofFlow } from "@/components/property-detail/payment-proof-flow";
import { SimilarTrustCard } from "@/components/property-detail/similar-trust-card";
import { ReportListingModal } from "@/components/property-detail/report-listing-modal";
import { Button } from "@/components/ui/button";

type PropertyDetailPageProps = { propertyId: string };

export function PropertyDetailPage({ propertyId }: PropertyDetailPageProps) {
  const [reportOpen, setReportOpen] = useState(false);
  const property = propertyDetail;

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 detail-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />
      <div className="relative z-10">
        <DetailHeader />
        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link href="/listings" className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"><ArrowLeft className="h-4 w-4" />Back to listings</Link>
            <div className="flex gap-3">
              <Button variant="outline" size="sm"><Share2 className="h-4 w-4" />Share</Button>
              <Button variant="danger" size="sm" onClick={() => setReportOpen(true)}><Flag className="h-4 w-4" />Report listing</Button>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <section className="space-y-6">
              <PropertyGallery />
              <PropertyHeroInfo property={property} currentId={propertyId} />
              <PropertyFacts property={property} />
              <AmenitiesGrid property={property} />
              <VerificationPanel property={property} />
              <PaymentProofFlow />
            </section>
            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <PriceViewingCard property={property} />
              <AgentProfileCard agent={property.agent} />
              <SimilarTrustCard />
            </aside>
          </div>
        </section>
      </div>
      <ReportListingModal open={reportOpen} propertyTitle={property.title} onClose={() => setReportOpen(false)} />
    </main>
  );
}
```

## `components/property-detail/property-gallery.tsx`

```tsx
import { Camera, ImageIcon, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const galleryItems = ["Main living room", "Bedroom suite", "Kitchen", "Balcony"];

export function PropertyGallery() {
  return (
    <section className="overflow-hidden rounded-ur-xl border border-white/10 bg-white/[0.035] p-4 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-3 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="relative min-h-[360px] overflow-hidden rounded-ur-lg bg-gradient-to-br from-emerald-950 via-emerald-800/45 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_34%,rgba(52,211,153,0.30),transparent_28%)]" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2"><Badge variant="success"><ShieldCheck className="h-3.5 w-3.5" />Verified photos</Badge><Badge variant="neutral"><Camera className="h-3.5 w-3.5" />12 images</Badge></div>
          <div className="absolute bottom-5 left-5 right-5 rounded-ur-lg border border-white/10 bg-black/32 p-5 backdrop-blur"><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/44">Featured image</p><h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-white">Bright verified apartment interior</h2><p className="mt-2 max-w-[520px] text-sm leading-6 text-white/58">Professional listing media is treated as part of property verification.</p></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {galleryItems.map((item, index) => (
            <div key={item} className="relative min-h-[170px] overflow-hidden rounded-ur-lg border border-white/10 bg-gradient-to-br from-ur-card via-emerald-950/60 to-black">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(22,163,74,0.24),transparent_32%)]" />
              <div className="absolute inset-0 grid place-items-center text-white/32"><ImageIcon className="h-10 w-10" /></div>
              <div className="absolute bottom-3 left-3 right-3"><p className="rounded-ur-sm border border-white/10 bg-black/28 px-3 py-2 text-xs font-bold text-white/70 backdrop-blur">{index + 1}. {item}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## `components/property-detail/property-hero-info.tsx`

```tsx
import { Bath, BedDouble, Building2, MapPin, Ruler, ShieldCheck } from "lucide-react";
import type { PropertyDetail } from "@/lib/property-detail-data";
import { Badge } from "@/components/ui/badge";

type PropertyHeroInfoProps = { property: PropertyDetail; currentId: string };

export function PropertyHeroInfo({ property, currentId }: PropertyHeroInfoProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-4 flex flex-wrap gap-2"><Badge variant="success"><ShieldCheck className="h-3.5 w-3.5" />Property verified</Badge><Badge variant="outline">{property.type}</Badge><Badge variant="neutral"><span className="font-mono">{currentId}</span></Badge></div>
          <h1 className="max-w-[820px] text-[40px] font-black leading-[1.04] tracking-[-0.06em] text-white sm:text-[54px]">{property.title}</h1>
          <p className="mt-4 flex items-center gap-2 text-base font-medium text-white/62"><MapPin className="h-5 w-5 text-ur-primary" />{property.location}</p>
          <p className="mt-5 max-w-[820px] text-base leading-7 text-white/62">{property.description}</p>
        </div>
        <div className="min-w-[190px] rounded-ur-lg border border-ur-primary/20 bg-ur-success-bg p-5 text-right"><p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success">Trust score</p><p className="mt-2 font-mono text-4xl font-black text-ur-success">{property.trustScore}%</p><p className="mt-2 text-xs leading-5 text-ur-success/76">Listing, agent, and access workflow verified.</p></div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric icon={<BedDouble className="h-5 w-5" />} label="Bedrooms" value={`${property.bedrooms}`} />
        <Metric icon={<Bath className="h-5 w-5" />} label="Bathrooms" value={`${property.bathrooms}`} />
        <Metric icon={<Ruler className="h-5 w-5" />} label="Size" value={`${property.sizeSqm} sqm`} />
        <Metric icon={<Building2 className="h-5 w-5" />} label="Neighborhood" value={property.neighborhood} />
      </div>
    </section>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4"><div className="mb-3 text-ur-primary">{icon}</div><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p><p className="mt-1 text-lg font-black text-white">{value}</p></div>;
}
```

## `components/property-detail/price-viewing-card.tsx`

```tsx
import { ArrowRight, CalendarDays, KeyRound, LockKeyhole, ReceiptText } from "lucide-react";
import type { PropertyDetail } from "@/lib/property-detail-data";
import { Button } from "@/components/ui/button";

type PriceViewingCardProps = { property: PropertyDetail };

export function PriceViewingCard({ property }: PriceViewingCardProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Rent and viewing access</p>
      <div className="mt-4 rounded-ur-lg border border-white/10 bg-black/18 p-5"><p className="text-sm text-white/48">Monthly rent</p><p className="mt-1 text-4xl font-black tracking-[-0.05em] text-white">KES {property.rentKes.toLocaleString()}</p><p className="mt-2 text-sm text-white/48">Deposit: KES {property.depositKes.toLocaleString()}</p></div>
      <div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-ur-lg border border-white/10 bg-black/16 p-4"><ReceiptText className="mb-3 h-5 w-5 text-ur-primary" /><p className="text-xs font-bold uppercase tracking-[0.12em] text-white/38">Viewing fee</p><p className="mt-1 text-xl font-black text-white">KES {property.viewingFeeKes.toLocaleString()}</p></div><div className="rounded-ur-lg border border-white/10 bg-black/16 p-4"><CalendarDays className="mb-3 h-5 w-5 text-ur-primary" /><p className="text-xs font-bold uppercase tracking-[0.12em] text-white/38">Availability</p><p className="mt-1 text-sm font-black text-white">{property.availableFrom}</p></div></div>
      <div className="mt-4 rounded-ur-lg border border-ur-primary/20 bg-ur-success-bg p-4"><div className="flex gap-3"><LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-ur-success" /><div><p className="text-sm font-black text-ur-success">Access remains locked</p><p className="mt-1 text-sm leading-6 text-ur-success/76">Viewing details unlock only after Stellar payment and private proof verification.</p></div></div></div>
      <Button className="mt-5 w-full" size="lg"><KeyRound className="h-4 w-4" />Request viewing<ArrowRight className="h-4 w-4" /></Button>
      <p className="mt-3 text-center text-xs leading-5 text-white/42">The viewing request starts the payment-proof workflow.</p>
    </section>
  );
}
```

## `components/property-detail/agent-profile-card.tsx`

```tsx
import { BadgeCheck, Phone, Star, Timer, UserRound, WalletCards } from "lucide-react";
import type { PropertyDetail } from "@/lib/property-detail-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type AgentProfileCardProps = { agent: PropertyDetail["agent"] };

export function AgentProfileCard({ agent }: AgentProfileCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start gap-4"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-ur-lg border border-ur-primary/25 bg-ur-primary/10 text-ur-primary"><UserRound className="h-7 w-7" /></div><div className="min-w-0"><div className="mb-2 flex flex-wrap items-center gap-2"><h2 className="text-lg font-black text-white">{agent.name}</h2>{agent.verified ? <Badge variant="success"><BadgeCheck className="h-3.5 w-3.5" />Verified</Badge> : null}</div><p className="text-sm font-semibold text-white/62">{agent.role}</p><p className="mt-1 text-xs text-white/42">{agent.company}</p></div></div>
      <div className="mt-5 grid grid-cols-2 gap-3"><AgentMetric icon={<Star className="h-4 w-4" />} label="Rating" value={agent.rating.toString()} /><AgentMetric icon={<Timer className="h-4 w-4" />} label="Response" value="18 min" /><AgentMetric icon={<Phone className="h-4 w-4" />} label="Phone" value={agent.phoneMasked} /><AgentMetric icon={<WalletCards className="h-4 w-4" />} label="Wallet" value={agent.walletShort} mono /></div>
      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/16 p-4"><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">Agent note</p><p className="mt-2 text-sm leading-6 text-white/58">Contact details are protected until the viewing access flow is completed.</p></div>
      <Button variant="outline" className="mt-5 w-full">View agent profile</Button>
    </section>
  );
}

function AgentMetric({ icon, label, value, mono }: { icon: React.ReactNode; label: string; value: string; mono?: boolean }) {
  return <div className="rounded-ur-sm border border-white/10 bg-black/16 p-3"><div className="mb-2 text-ur-primary">{icon}</div><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">{label}</p><p className={mono ? "mt-1 font-mono text-xs font-bold text-ur-mint" : "mt-1 text-sm font-black text-white"}>{value}</p></div>;
}
```

## `components/property-detail/property-facts.tsx`

```tsx
import type { PropertyDetail } from "@/lib/property-detail-data";

type PropertyFactsProps = { property: PropertyDetail };

export function PropertyFacts({ property }: PropertyFactsProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Property information</p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">Full property details</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{property.facts.map((fact) => <div key={fact.label} className="rounded-ur-lg border border-white/10 bg-black/16 p-4"><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{fact.label}</p><p className="mt-2 text-sm font-black text-white">{fact.value}</p></div>)}</div>
    </section>
  );
}
```

## `components/property-detail/amenities-grid.tsx`

```tsx
import type { PropertyDetail } from "@/lib/property-detail-data";

type AmenitiesGridProps = { property: PropertyDetail };

export function AmenitiesGrid({ property }: AmenitiesGridProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Amenities</p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">What is included</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{property.amenities.map((amenity) => { const Icon = amenity.icon; return <div key={amenity.label} className="flex items-center gap-3 rounded-ur-lg border border-white/10 bg-black/16 p-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary"><Icon className="h-5 w-5" /></div><p className="text-sm font-bold text-white/76">{amenity.label}</p></div>; })}</div>
    </section>
  );
}
```

## `components/property-detail/verification-panel.tsx`

```tsx
import type { PropertyDetail } from "@/lib/property-detail-data";

type VerificationPanelProps = { property: PropertyDetail };

export function VerificationPanel({ property }: VerificationPanelProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Verification status</p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">Why this listing is trusted</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">{property.verificationChecks.map((check) => { const Icon = check.icon; return <article key={check.label} className="rounded-ur-lg border border-white/10 bg-black/18 p-5"><div className="flex gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary"><Icon className="h-5 w-5" /></div><div><h3 className="font-black text-white">{check.label}</h3><p className="mt-2 text-sm leading-6 text-white/58">{check.description}</p></div></div></article>; })}</div>
    </section>
  );
}
```

## `components/property-detail/payment-proof-flow.tsx`

```tsx
import { ArrowRight } from "lucide-react";
import { proofFlow } from "@/lib/property-detail-data";

export function PaymentProofFlow() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Viewing access workflow</p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">From request to access unlock</h2>
      <div className="mt-5 grid gap-3 lg:grid-cols-4">{proofFlow.map((item, index) => { const Icon = item.icon; return <div key={item.title} className="relative"><article className="h-full rounded-ur-lg border border-white/10 bg-black/16 p-5"><div className="mb-4 grid h-12 w-12 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary"><Icon className="h-6 w-6" /></div><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">Step {index + 1}</p><h3 className="mt-1 font-black text-white">{item.title}</h3><p className="mt-2 text-sm leading-6 text-white/58">{item.description}</p></article>{index < proofFlow.length - 1 ? <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-ur-primary lg:block" /> : null}</div>; })}</div>
    </section>
  );
}
```

## `components/property-detail/similar-trust-card.tsx`

```tsx
import { CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";

export function SimilarTrustCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Tenant protection</p>
      <h2 className="mt-2 text-lg font-black tracking-[-0.03em] text-white">Safe viewing rule</h2>
      <div className="mt-5 space-y-3"><TrustRow icon={<ShieldCheck className="h-4 w-4" />} title="Verified listing" description="Property checks are visible before payment." /><TrustRow icon={<LockKeyhole className="h-4 w-4" />} title="Access locked" description="Private details remain hidden until proof succeeds." /><TrustRow icon={<CheckCircle2 className="h-4 w-4" />} title="Audit ready" description="Request and verification events are tracked." /></div>
    </section>
  );
}

function TrustRow({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return <div className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">{icon}</div><div><p className="text-sm font-black text-white">{title}</p><p className="mt-1 text-xs leading-5 text-white/52">{description}</p></div></div>;
}
```

## `components/property-detail/report-listing-modal.tsx`

```tsx
"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ReportListingModalProps = { open: boolean; propertyTitle: string; onClose: () => void };

const reportReasons = ["Fake or suspicious listing", "Agent requested payment outside platform", "Incorrect property information", "Unsafe communication", "Other concern"];

export function ReportListingModal({ open, propertyTitle, onClose }: ReportListingModalProps) {
  const [selectedReason, setSelectedReason] = useState(reportReasons[0]);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5 backdrop-blur-sm">
      <section className="w-full max-w-[560px] rounded-ur-xl border border-white/10 bg-ur-bg p-5 shadow-soft-dark">
        <div className="mb-5 flex items-start justify-between gap-4"><div><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-ur-error/25 bg-ur-error-bg px-3 py-1 text-xs font-bold text-ur-error"><AlertTriangle className="h-3.5 w-3.5" />Report listing</div><h2 className="text-2xl font-black tracking-[-0.04em] text-white">Report a concern</h2><p className="mt-2 text-sm leading-6 text-white/58">Report suspicious activity for <span className="font-bold text-white">{propertyTitle}</span>.</p></div><button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/64 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus" aria-label="Close report modal"><X className="h-4 w-4" /></button></div>
        {submitted ? (
          <div className="rounded-ur-lg border border-ur-success/20 bg-ur-success-bg p-5"><div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-ur-success" /><div><p className="font-black text-ur-success">Report submitted</p><p className="mt-2 text-sm leading-6 text-ur-success/78">The UrbanRentisha trust team can now review the listing and agent activity.</p></div></div><Button className="mt-5 w-full" onClick={onClose}>Done</Button></div>
        ) : (
          <>
            <div className="space-y-2">{reportReasons.map((reason) => <label key={reason} className="flex cursor-pointer items-center gap-3 rounded-ur-sm border border-white/10 bg-white/[0.035] p-3 transition-colors hover:border-white/20 hover:bg-white/[0.055]"><input type="radio" name="report-reason" value={reason} checked={selectedReason === reason} onChange={() => setSelectedReason(reason)} className="h-4 w-4 accent-ur-error" /><span className="text-sm font-bold text-white/72">{reason}</span></label>)}</div>
            <div className="mt-4 space-y-2"><label htmlFor="report-details" className="block text-xs font-semibold tracking-[0.04em] text-white/78">Extra details</label><textarea id="report-details" placeholder="Add details that can help the trust team investigate..." className="min-h-[120px] w-full resize-y rounded-ur-sm border border-white/12 bg-ur-input p-3 text-sm text-white outline-none transition-colors placeholder:text-white/32 focus:border-ur-primary" /></div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row"><Button variant="danger" className="w-full" onClick={() => setSubmitted(true)}>Submit report</Button><Button variant="outline" className="w-full" onClick={onClose}>Cancel</Button></div>
          </>
        )}
      </section>
    </div>
  );
}
```

---

## 7. Acceptance Checklist

```text
The route /properties/UR-LST-1001 works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for listing ID, wallet short address, and trust value.
UrbanRentisha dark green theme is applied.
Property gallery is visible.
Full property information is visible.
Rent is clearly shown.
Viewing fee is clearly shown.
Property verification badge is visible.
Trust score is visible.
Agent profile is visible.
Report listing button is visible.
Report modal opens and closes.
Report submit confirmation appears.
Request viewing CTA is visible.
Payment-proof workflow is explained.
Mobile layout is stacked and readable.
All controls have focus states.
```

## 8. Final UX Summary

```text
This is a verified property with a verified agent.
Rent and viewing fee are transparent.
Private access details stay locked until payment proof succeeds.
The tenant can report suspicious activity before proceeding.
```
