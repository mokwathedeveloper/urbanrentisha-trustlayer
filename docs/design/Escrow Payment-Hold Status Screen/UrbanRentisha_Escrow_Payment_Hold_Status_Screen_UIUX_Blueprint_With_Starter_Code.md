# UrbanRentisha TrustLayer Escrow / Payment-Hold Status Screen UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
11. Escrow / Payment-Hold Status Screen only
```

## 2. Page Purpose

The **Escrow / Payment-Hold Status Screen** shows simplified payment-hold or reservation status.

This screen helps tenants:

```text
See whether the viewing fee is held, reserved, released, refunded, or expired
Review the held amount
Review the active reservation
See access and viewing-code status
Understand release and refund rules
Track payment, proof, and reservation references
Open support or dispute actions
```

---

## 3. Product Wording Rule

For the MVP and hackathon implementation, use **payment-hold** and **reservation status** wording first.

Use the word **escrow** carefully because true escrow may require legal, regulatory, and operational controls beyond this UI.

Recommended UI wording:

```text
Payment-hold status
Reservation active
Held viewing fee
Refund review
Release eligible
Hold reference
```

Avoid overpromising:

```text
Guaranteed escrow
Legally protected escrow
Bank-grade escrow
Regulated escrow
```

---

## 4. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Dark SaaS layout
Technical trust tone
Clear status cards
Readable audit trail
Accessible controls
Minimal but meaningful interactions
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
Verified property access
Payment-proof workflow
Reservation status
Tenant safety
Professional B2B SaaS clarity
```

---

## 5. UX Goal

The tenant should understand this immediately:

```text
The viewing fee has been received.
The payment is being tracked against a reservation.
The viewing slot is protected.
The hold can be resolved by release, refund review, expiry, or completion.
The audit references are visible for support and transparency.
```

---

## 6. Final Folder Structure

```text
urbanrentisha-payment-hold-status/
├── app/
│   ├── payment-hold/
│   │   └── [requestId]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── payment-hold/
│   │   ├── contract-hold-reference-card.tsx
│   │   ├── hold-audit-trail-card.tsx
│   │   ├── hold-breakdown-card.tsx
│   │   ├── hold-status-hero-card.tsx
│   │   ├── hold-timeline-card.tsx
│   │   ├── logo-mark.tsx
│   │   ├── payment-hold-header.tsx
│   │   ├── payment-hold-progress.tsx
│   │   ├── payment-hold-status-page.tsx
│   │   ├── release-rules-card.tsx
│   │   ├── reservation-access-card.tsx
│   │   ├── reservation-summary-card.tsx
│   │   ├── support-dispute-card.tsx
│   │   └── tenant-actions-card.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── payment-hold-data.ts
│   └── utils.ts
│
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 7. Page Layout

Desktop:

```text
Sticky top header
Back-to-viewing-access link
Screen title and trust badges
Payment-hold progress stepper
Left main column:
  - hold status hero card
  - reservation summary
  - hold amount breakdown
  - payment-hold timeline
  - release/refund rules
Right sticky sidebar:
  - tenant actions
  - viewing access status
  - contract/hold references
  - audit trail
  - support/dispute panel
```

Mobile:

```text
Header
Back link
Title
Progress stepper
Hold status hero
Hold amount
Reservation summary
Tenant actions
Timeline
References
Support
```

---

## 8. Interaction Rules

```text
Copy hold ID button copies HOLD reference and shows copied state.
Mark viewing completed changes status to release_eligible.
Request refund review changes status to refund_pending.
Request reschedule button is UI-ready for future route/modal.
Report issue button is UI-ready for future report flow.
Access status remains visible separately from hold status.
```

---

## 9. Color Tokens

```text
Background: #060B0A
Soft background: #0B1512
Card: #0E1A16
Card hover: #12241D
Input: #07110E
Border: #1F352B
Strong border: #2E5A45
Primary green: #16A34A
Primary hover: #15803D
Mint: #34D399
Cyan: #22D3EE
Warning: #F59E0B
Warning background: #2A2000
Error: #EF4444
Error background: #2D0F0F
Success: #22C55E
Success background: #0D2818
Text: #F8FAFC
Muted: #94A3B8
Subtle: #64748B
```

---

## 10. Typography

Google Fonts are mandatory.

```text
Inter = all UI text
JetBrains Mono = hold ID, reservation ID, request ID, transaction hash, proof hash, verification hash, XLM amount
```

Use JetBrains Mono for:

```text
REQ-UR-9084
HOLD-UR-7712
RSV-UR-4481
8.4200000 XLM
4f7a8b2c...
zkp_0x9f12...
soro_0x7ab...
```

---

## 11. Accessibility Requirements

```text
All buttons must be keyboard focusable.
Copy hold ID button must show copied state.
Hold status must use icon and text, not color only.
Long references must truncate safely or wrap.
Support/dispute actions must have clear labels.
Color cannot be the only way to indicate hold state.
All interactive elements must have visible focus rings.
Minimum mobile touch target should be 44px.
```

---

## 12. Implementation Notes

This starter is UI-only.

Connect it later to:

```text
Payment-hold status API
Reservation status API
Viewing request API
Proof verification status API
Support/dispute API
Refund/release rules engine
Audit log service
```

Recommended API endpoints:

```text
GET /api/v1/payment-holds/:requestId
POST /api/v1/payment-holds/:requestId/complete-viewing
POST /api/v1/payment-holds/:requestId/refund-review
GET /api/v1/payment-holds/:requestId/audit-events
```

Recommended route:

```text
/payment-hold/REQ-UR-9084
```

---

# 13. Full Starter Code

\n## `package.json`\n\n```json\n{
  "name": "urbanrentisha-payment-hold-status-screen",
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
\n```\n\n## `next.config.ts`\n\n```ts\nimport type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true
};

export default nextConfig;
\n```\n\n## `postcss.config.js`\n\n```js\nmodule.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
\n```\n\n## `tsconfig.json`\n\n```json\n{
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
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
\n```\n\n## `tailwind.config.ts`\n\n```ts\nimport type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
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
      borderRadius: {
        "ur-sm": "8px",
        ur: "12px",
        "ur-lg": "18px",
        "ur-xl": "28px"
      }
    }
  },
  plugins: []
};

export default config;
\n```\n\n## `app/layout.tsx`\n\n```tsx\nimport type { Metadata } from "next";
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
  title: "Payment-Hold Status | UrbanRentisha TrustLayer",
  description:
    "View simplified payment-hold and reservation status for a verified viewing request."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
\n```\n\n## `app/globals.css`\n\n```css\n@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-inter: Inter, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background: #060B0A;
  color: #F8FAFC;
  font-family: var(--font-inter);
}

code,
pre,
.font-mono {
  font-family: var(--font-mono);
}

::selection {
  background: rgba(22, 163, 74, 0.35);
}

@layer utilities {
  .ur-container {
    @apply mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-8;
  }

  .ur-focus {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ur-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ur-bg;
  }

  .hold-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }
}
\n```\n\n## `app/page.tsx`\n\n```tsx\nimport { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/payment-hold/REQ-UR-9084");
}
\n```\n\n## `app/payment-hold/[requestId]/page.tsx`\n\n```tsx\nimport { PaymentHoldStatusPage } from "@/components/payment-hold/payment-hold-status-page";

type PageProps = {
  params: {
    requestId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <PaymentHoldStatusPage requestId={params.requestId} />;
}
\n```\n\n## `lib/utils.ts`\n\n```ts\nimport { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\n```\n\n## `lib/payment-hold-data.ts`\n\n```ts\nimport {
  BadgeCheck,
  Banknote,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Database,
  FileCheck2,
  Hash,
  HelpCircle,
  Home,
  KeyRound,
  LockKeyhole,
  MapPin,
  ReceiptText,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UnlockKeyhole,
  UserRound,
  WalletCards
} from "lucide-react";

export type HoldStatus =
  | "held"
  | "reserved"
  | "release_eligible"
  | "released"
  | "refund_pending"
  | "expired";

export type PaymentHoldRecord = {
  requestId: string;
  holdId: string;
  reservationId: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  tenantName: string;
  agentName: string;
  viewingDate: string;
  viewingTime: string;
  holdAmountKes: number;
  holdAmountXlm: string;
  platformFeeKes: number;
  refundableAmountKes: number;
  status: HoldStatus;
  accessStatus: "Locked" | "Unlocked";
  verificationStatus: "Verified";
  network: "Stellar Testnet";
  txHash: string;
  proofHash: string;
  verificationHash: string;
  expiresAt: string;
};

export const paymentHoldRecord: PaymentHoldRecord = {
  requestId: "REQ-UR-9084",
  holdId: "HOLD-UR-7712",
  reservationId: "RSV-UR-4481",
  propertyId: "UR-LST-1001",
  propertyTitle: "Kilimani Green View Apartment",
  propertyLocation: "Kilimani, Nairobi",
  tenantName: "John Tenant",
  agentName: "Amina Njoroge",
  viewingDate: "Sat, 22 Jun",
  viewingTime: "11:30 AM",
  holdAmountKes: 500,
  holdAmountXlm: "8.4200000 XLM",
  platformFeeKes: 0,
  refundableAmountKes: 500,
  status: "reserved",
  accessStatus: "Unlocked",
  verificationStatus: "Verified",
  network: "Stellar Testnet",
  txHash:
    "4f7a8b2c9d1e6f0a3b5c7d8e9f102a4b6c8d0e1f2a3b4c5d6e7f8091a2b3c4d5",
  proofHash:
    "zkp_0x9f12e5ab4c8d7a63f20b1c44e9aa73f1dc8829b6e4107ac5d9ef2a13b0c44190",
  verificationHash:
    "soro_0x7ab11f9e44dc92a18f03b7e54c2a901f6bb7d3e8124a90cc1f0e55a7d4e2c109",
  expiresAt: "22 Jun 2026, 6:00 PM"
};

export const holdSteps = [
  {
    label: "Payment",
    description: "Viewing fee received",
    icon: WalletCards
  },
  {
    label: "Proof",
    description: "Payment proof verified",
    icon: ShieldCheck
  },
  {
    label: "Reserved",
    description: "Viewing slot protected",
    icon: CalendarCheck2
  },
  {
    label: "Complete",
    description: "Release or refund resolved",
    icon: CheckCircle2
  }
];

export const holdMetrics = [
  {
    label: "Hold amount",
    value: "KES 500",
    icon: Banknote
  },
  {
    label: "Reservation",
    value: "Active",
    icon: CalendarCheck2
  },
  {
    label: "Access",
    value: "Unlocked",
    icon: UnlockKeyhole
  },
  {
    label: "Expires",
    value: "6:00 PM",
    icon: Clock3
  }
];

export const holdTimeline = [
  {
    title: "Viewing request created",
    description: "Tenant selected a verified property and preferred viewing slot.",
    time: "10:04 AM",
    icon: FileCheck2
  },
  {
    title: "Payment received",
    description: "Viewing fee was received on Stellar testnet.",
    time: "10:07 AM",
    icon: WalletCards
  },
  {
    title: "Proof verified",
    description: "Private payment proof passed verification.",
    time: "10:09 AM",
    icon: ShieldCheck
  },
  {
    title: "Reservation active",
    description: "Viewing slot is currently protected for the tenant.",
    time: "Now",
    icon: CalendarCheck2
  }
];

export const releaseRules = [
  {
    title: "Release after completed viewing",
    description: "The hold can be marked complete when the viewing takes place according to policy.",
    icon: CheckCircle2
  },
  {
    title: "Refund if agent cancels",
    description: "The refundable amount can be returned when the verified agent cancels or no-shows.",
    icon: RefreshCcw
  },
  {
    title: "Expire after reservation window",
    description: "The reservation is reviewed after the hold window expires.",
    icon: TimerReset
  }
];

export const auditEvents = [
  {
    label: "Request ID",
    value: "REQ-UR-9084",
    icon: FileCheck2
  },
  {
    label: "Hold ID",
    value: "HOLD-UR-7712",
    icon: LockKeyhole
  },
  {
    label: "Reservation ID",
    value: "RSV-UR-4481",
    icon: CalendarCheck2
  },
  {
    label: "Network",
    value: "Stellar Testnet",
    icon: Sparkles
  },
  {
    label: "TX hash",
    value: "4f7a8b2c...b3c4d5",
    icon: Hash
  },
  {
    label: "Verification",
    value: "soro_0x7ab...2c109",
    icon: Database
  }
];

export const reservationFacts = [
  {
    label: "Property",
    value: "Verified",
    icon: Home
  },
  {
    label: "Agent",
    value: "Verified",
    icon: UserRound
  },
  {
    label: "Location",
    value: "Kilimani",
    icon: MapPin
  },
  {
    label: "Access",
    value: "Code unlocked",
    icon: KeyRound
  }
];

export const supportReasons = [
  {
    title: "Agent unavailable",
    description: "Open support if the verified agent cannot attend the scheduled viewing.",
    icon: HelpCircle
  },
  {
    title: "Need to reschedule",
    description: "A tenant can request assistance before the reservation window expires.",
    icon: CalendarCheck2
  },
  {
    title: "Payment issue",
    description: "Support can review transaction and proof references from the audit trail.",
    icon: ReceiptText
  }
];

export const simplifiedStatusCopy: Record<HoldStatus, { label: string; description: string; badge: "success" | "warning" | "neutral" | "danger" }> = {
  held: {
    label: "Payment held",
    description: "The viewing fee has been received and is waiting for reservation confirmation.",
    badge: "warning"
  },
  reserved: {
    label: "Reservation active",
    description: "The viewing fee is held and the viewing slot is protected for the tenant.",
    badge: "success"
  },
  release_eligible: {
    label: "Release eligible",
    description: "The viewing has been completed and the hold can be resolved.",
    badge: "success"
  },
  released: {
    label: "Released",
    description: "The hold has been resolved according to platform policy.",
    badge: "success"
  },
  refund_pending: {
    label: "Refund pending",
    description: "A refund review has been opened for this payment hold.",
    badge: "warning"
  },
  expired: {
    label: "Expired",
    description: "The reservation window has ended and the hold requires review.",
    badge: "danger"
  }
};
\n```\n\n## `components/ui/button.tsx`\n\n```tsx\nimport * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "warning" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-ur-primary bg-ur-primary text-white hover:bg-ur-primary-hover",
  secondary:
    "border border-ur-border-strong bg-ur-card text-ur-text hover:bg-ur-card-hover",
  ghost:
    "border border-transparent bg-transparent text-ur-muted hover:bg-white/5 hover:text-white",
  outline:
    "border border-white/14 bg-transparent text-white hover:border-ur-primary/60 hover:bg-white/5",
  warning:
    "border border-ur-warning/30 bg-ur-warning-bg text-ur-warning hover:bg-ur-warning/15",
  danger:
    "border border-ur-error/40 bg-ur-error-bg text-ur-error hover:bg-ur-error/15"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-[52px] px-8 text-base"
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
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
\n```\n\n## `components/ui/badge.tsx`\n\n```tsx\nimport * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "outline";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  success: "border-ur-success/25 bg-ur-success-bg text-ur-success",
  warning: "border-ur-warning/25 bg-ur-warning-bg text-ur-warning",
  danger: "border-ur-error/25 bg-ur-error-bg text-ur-error",
  neutral: "border-white/10 bg-white/5 text-ur-muted",
  outline: "border-white/14 bg-transparent text-white/82"
};

export function Badge({
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
\n```\n\n## `components/payment-hold/logo-mark.tsx`\n\n```tsx\nimport Link from "next/link";
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
        <p className="text-xl font-black tracking-[-0.04em] text-white">
          Urban<span className="text-ur-primary">Rentisha</span>
        </p>
        <p className="text-sm font-semibold text-ur-muted">TrustLayer</p>
      </div>
    </Link>
  );
}
\n```\n\n## `components/payment-hold/payment-hold-status-page.tsx`\n\n```tsx\n"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import {
  paymentHoldRecord,
  type HoldStatus
} from "@/lib/payment-hold-data";
import { PaymentHoldHeader } from "@/components/payment-hold/payment-hold-header";
import { PaymentHoldProgress } from "@/components/payment-hold/payment-hold-progress";
import { HoldStatusHeroCard } from "@/components/payment-hold/hold-status-hero-card";
import { ReservationSummaryCard } from "@/components/payment-hold/reservation-summary-card";
import { HoldBreakdownCard } from "@/components/payment-hold/hold-breakdown-card";
import { HoldTimelineCard } from "@/components/payment-hold/hold-timeline-card";
import { ReleaseRulesCard } from "@/components/payment-hold/release-rules-card";
import { TenantActionsCard } from "@/components/payment-hold/tenant-actions-card";
import { ContractHoldReferenceCard } from "@/components/payment-hold/contract-hold-reference-card";
import { HoldAuditTrailCard } from "@/components/payment-hold/hold-audit-trail-card";
import { SupportDisputeCard } from "@/components/payment-hold/support-dispute-card";
import { ReservationAccessCard } from "@/components/payment-hold/reservation-access-card";
import { Badge } from "@/components/ui/badge";

type PaymentHoldStatusPageProps = {
  requestId: string;
};

export function PaymentHoldStatusPage({ requestId }: PaymentHoldStatusPageProps) {
  const [status, setStatus] = useState<HoldStatus>("reserved");
  const [copied, setCopied] = useState(false);
  const record = { ...paymentHoldRecord, requestId, status };

  async function copyHoldId() {
    await navigator.clipboard.writeText(record.holdId);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function markCompleted() {
    setStatus("release_eligible");
  }

  function requestRefundReview() {
    setStatus("refund_pending");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 hold-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <PaymentHoldHeader />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href={`/viewing-code/${record.requestId}`}
              className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to viewing access
            </Link>

            <div className="flex flex-wrap gap-2">
              <Badge variant="success">
                <ShieldCheck className="h-3.5 w-3.5" />
                Proof verified
              </Badge>
              <Badge variant="outline">
                <LockKeyhole className="h-3.5 w-3.5" />
                Payment-hold tracked
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Payment-hold status
            </p>
            <h1 className="mt-3 max-w-[900px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
              Track the reservation and payment hold.
            </h1>
            <p className="mt-4 max-w-[790px] text-base leading-7 text-white/66">
              View the simplified hold state, reservation window, payment reference, and next actions for the verified viewing request.
            </p>
          </div>

          <PaymentHoldProgress status={status} />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-6">
              <HoldStatusHeroCard
                record={record}
                copied={copied}
                onCopy={copyHoldId}
              />
              <ReservationSummaryCard record={record} />
              <HoldBreakdownCard record={record} />
              <HoldTimelineCard status={status} />
              <ReleaseRulesCard />
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <TenantActionsCard
                status={status}
                onMarkCompleted={markCompleted}
                onRequestRefund={requestRefundReview}
              />
              <ReservationAccessCard record={record} />
              <ContractHoldReferenceCard record={record} />
              <HoldAuditTrailCard status={status} />
              <SupportDisputeCard />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
\n```\n\n## `components/payment-hold/payment-hold-header.tsx`\n\n```tsx\nimport Link from "next/link";
import { Bell, LayoutDashboard, Menu, UserRound } from "lucide-react";
import { LogoMark } from "@/components/payment-hold/logo-mark";

export function PaymentHoldHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="ur-container flex h-20 items-center justify-between">
        <LogoMark />

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {[
            { label: "Viewing access", href: "/viewing-code/REQ-UR-9084" },
            { label: "Payment hold", href: "/payment-hold/REQ-UR-9084", active: true },
            { label: "Proof status", href: "/proof-status" },
            { label: "Dashboard", href: "/tenant/dashboard" }
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={
                item.active
                  ? "rounded-ur-sm bg-ur-primary/10 px-4 py-2 text-sm font-bold text-ur-mint ur-focus"
                  : "rounded-ur-sm px-4 py-2 text-sm font-bold text-white/56 transition-colors hover:bg-white/5 hover:text-white ur-focus"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus sm:grid"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>

          <Link
            href="/tenant/dashboard"
            className="hidden h-10 items-center gap-2 rounded-ur-sm border border-white/10 px-4 text-sm font-bold text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus sm:inline-flex"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label="User menu"
          >
            <UserRound className="h-4 w-4 sm:hidden" />
            <Menu className="hidden h-4 w-4 sm:block lg:hidden" />
          </button>
        </div>
      </div>
    </header>
  );
}
\n```\n\n## `components/payment-hold/payment-hold-progress.tsx`\n\n```tsx\nimport { CheckCircle2 } from "lucide-react";
import { holdSteps, type HoldStatus } from "@/lib/payment-hold-data";
import { cn } from "@/lib/utils";

type PaymentHoldProgressProps = {
  status: HoldStatus;
};

function getActiveIndex(status: HoldStatus) {
  if (status === "held") return 2;
  if (status === "reserved" || status === "refund_pending") return 3;
  if (status === "release_eligible" || status === "released") return 4;
  if (status === "expired") return 3;
  return 3;
}

export function PaymentHoldProgress({ status }: PaymentHoldProgressProps) {
  const activeIndex = getActiveIndex(status);

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-3 md:grid-cols-4">
        {holdSteps.map((step, index) => {
          const Icon = step.icon;
          const isDone = index < activeIndex;
          const isActive = index === activeIndex;

          return (
            <div
              key={step.label}
              className={cn(
                "rounded-ur-lg border p-4 transition-colors",
                isActive
                  ? "border-ur-primary/70 bg-ur-primary/10"
                  : isDone
                    ? "border-ur-success/25 bg-ur-success-bg"
                    : "border-white/10 bg-black/16"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-ur",
                    isActive || isDone ? "bg-ur-primary text-white" : "bg-white/5 text-white/40"
                  )}
                >
                  {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <div>
                  <p className="text-sm font-black text-white">{step.label}</p>
                  <p className="mt-1 text-xs text-white/45">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/payment-hold/hold-status-hero-card.tsx`\n\n```tsx\n"use client";

import { Check, Copy, LockKeyhole, WalletCards } from "lucide-react";
import {
  simplifiedStatusCopy,
  type PaymentHoldRecord
} from "@/lib/payment-hold-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type HoldStatusHeroCardProps = {
  record: PaymentHoldRecord;
  copied: boolean;
  onCopy: () => void;
};

export function HoldStatusHeroCard({
  record,
  copied,
  onCopy
}: HoldStatusHeroCardProps) {
  const copy = simplifiedStatusCopy[record.status];

  return (
    <section className="overflow-hidden rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          <Badge variant={copy.badge}>
            <LockKeyhole className="h-3.5 w-3.5" />
            {copy.label}
          </Badge>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-white">
            {copy.label}
          </h2>

          <p className="mt-3 max-w-[700px] text-sm leading-6 text-white/64">
            {copy.description}
          </p>

          <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/18 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/42">
              Hold reference
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-sm font-bold text-ur-mint">{record.holdId}</p>
              <Button size="sm" variant="outline" onClick={onCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy hold ID"}
              </Button>
            </div>
          </div>
        </div>

        <div className="min-w-[270px] rounded-ur-lg border border-white/10 bg-black/20 p-5 text-right">
          <WalletCards className="ml-auto h-7 w-7 text-ur-primary" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/42">
            Held amount
          </p>
          <p className="mt-2 text-4xl font-black tracking-[-0.05em] text-white">
            KES {record.holdAmountKes.toLocaleString()}
          </p>
          <p className="mt-2 font-mono text-lg font-bold text-ur-mint">
            {record.holdAmountXlm}
          </p>
        </div>
      </div>
    </section>
  );
}
\n```\n\n## `components/payment-hold/reservation-summary-card.tsx`\n\n```tsx\nimport { CalendarCheck2, MapPin, ShieldCheck, UserRound } from "lucide-react";
import { reservationFacts, type PaymentHoldRecord } from "@/lib/payment-hold-data";

type ReservationSummaryCardProps = {
  record: PaymentHoldRecord;
};

export function ReservationSummaryCard({ record }: ReservationSummaryCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Reservation summary
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            {record.propertyTitle}
          </h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-white/58">
            <MapPin className="h-4 w-4 text-ur-primary" />
            {record.propertyLocation}
          </p>
        </div>

        <div className="rounded-ur-lg border border-ur-success/20 bg-ur-success-bg p-4 text-right">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-ur-success">
            Access status
          </p>
          <p className="mt-1 text-xl font-black text-white">{record.accessStatus}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryTile icon={<CalendarCheck2 className="h-5 w-5" />} label="Viewing" value={`${record.viewingDate}, ${record.viewingTime}`} />
        <SummaryTile icon={<UserRound className="h-5 w-5" />} label="Agent" value={record.agentName} />
        <SummaryTile icon={<ShieldCheck className="h-5 w-5" />} label="Proof" value={record.verificationStatus} />
        <SummaryTile icon={<CalendarCheck2 className="h-5 w-5" />} label="Reservation" value={record.reservationId} mono />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {reservationFacts.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <Icon className="mb-3 h-5 w-5 text-ur-primary" />
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{item.label}</p>
              <p className="mt-1 text-sm font-black text-white">{item.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SummaryTile({
  icon,
  label,
  value,
  mono
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <div className="mb-3 text-ur-primary">{icon}</div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p>
      <p className={mono ? "mt-1 font-mono text-sm font-bold text-ur-mint" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
\n```\n\n## `components/payment-hold/hold-breakdown-card.tsx`\n\n```tsx\nimport { Banknote, ReceiptText, RefreshCcw, WalletCards } from "lucide-react";
import type { PaymentHoldRecord } from "@/lib/payment-hold-data";

type HoldBreakdownCardProps = {
  record: PaymentHoldRecord;
};

export function HoldBreakdownCard({ record }: HoldBreakdownCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Hold breakdown
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Payment-hold amount and policy view
      </h2>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <BreakdownTile icon={<WalletCards className="h-5 w-5" />} label="Total held" value={`KES ${record.holdAmountKes.toLocaleString()}`} />
        <BreakdownTile icon={<Banknote className="h-5 w-5" />} label="Network asset" value={record.holdAmountXlm} mono />
        <BreakdownTile icon={<ReceiptText className="h-5 w-5" />} label="Platform fee" value={`KES ${record.platformFeeKes.toLocaleString()}`} />
        <BreakdownTile icon={<RefreshCcw className="h-5 w-5" />} label="Refundable" value={`KES ${record.refundableAmountKes.toLocaleString()}`} />
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
        <p className="text-sm font-black text-white">Simplified MVP status</p>
        <p className="mt-2 text-sm leading-6 text-white/58">
          This screen explains the reservation hold in clear tenant-friendly language. Connect the final business rules to your backend, legal policy, and payment contract implementation.
        </p>
      </div>
    </section>
  );
}

function BreakdownTile({
  icon,
  label,
  value,
  mono
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <div className="mb-3 text-ur-primary">{icon}</div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p>
      <p className={mono ? "mt-1 font-mono text-sm font-bold text-ur-mint" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
\n```\n\n## `components/payment-hold/hold-timeline-card.tsx`\n\n```tsx\nimport { CheckCircle2, Clock3 } from "lucide-react";
import { holdTimeline, type HoldStatus } from "@/lib/payment-hold-data";

type HoldTimelineCardProps = {
  status: HoldStatus;
};

export function HoldTimelineCard({ status }: HoldTimelineCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Timeline
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Payment-hold activity
      </h2>

      <div className="mt-5 space-y-3">
        {holdTimeline.map((event, index) => {
          const Icon = event.icon;
          return (
            <div key={event.title} className="flex gap-4 rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur bg-ur-success-bg text-ur-success">
                {index < holdTimeline.length - 1 ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-black text-white">{event.title}</p>
                  <p className="inline-flex items-center gap-1 font-mono text-xs font-bold text-ur-mint">
                    <Clock3 className="h-3.5 w-3.5" />
                    {event.time}
                  </p>
                </div>
                <p className="mt-1 text-sm leading-6 text-white/56">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs leading-5 text-white/42">
        Current status: <span className="font-mono text-ur-mint">{status}</span>
      </p>
    </section>
  );
}
\n```\n\n## `components/payment-hold/release-rules-card.tsx`\n\n```tsx\nimport { releaseRules } from "@/lib/payment-hold-data";

export function ReleaseRulesCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Release and refund rules
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Simple reservation policy view
      </h2>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {releaseRules.map((rule) => {
          const Icon = rule.icon;
          return (
            <article key={rule.title} className="rounded-ur-lg border border-white/10 bg-black/16 p-5">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-black text-white">{rule.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/58">{rule.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/payment-hold/tenant-actions-card.tsx`\n\n```tsx\n"use client";

import { CalendarDays, CheckCircle2, RefreshCcw, ShieldAlert } from "lucide-react";
import type { HoldStatus } from "@/lib/payment-hold-data";
import { Button } from "@/components/ui/button";

type TenantActionsCardProps = {
  status: HoldStatus;
  onMarkCompleted: () => void;
  onRequestRefund: () => void;
};

export function TenantActionsCard({
  status,
  onMarkCompleted,
  onRequestRefund
}: TenantActionsCardProps) {
  const completed = status === "release_eligible" || status === "released";
  const refundPending = status === "refund_pending";

  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Tenant actions
      </p>

      <h2 className="mt-2 text-lg font-black text-white">
        Manage this reservation
      </h2>

      <p className="mt-2 text-sm leading-6 text-white/58">
        Use these actions to move the simplified hold state during the demo.
      </p>

      <div className="mt-5 space-y-3">
        <Button className="w-full" onClick={onMarkCompleted} disabled={completed || refundPending}>
          <CheckCircle2 className="h-4 w-4" />
          Mark viewing completed
        </Button>

        <Button variant="warning" className="w-full" onClick={onRequestRefund} disabled={completed || refundPending}>
          <RefreshCcw className="h-4 w-4" />
          Request refund review
        </Button>

        <Button variant="outline" className="w-full">
          <CalendarDays className="h-4 w-4" />
          Request reschedule
        </Button>

        <Button variant="danger" className="w-full">
          <ShieldAlert className="h-4 w-4" />
          Report issue
        </Button>
      </div>
    </section>
  );
}
\n```\n\n## `components/payment-hold/reservation-access-card.tsx`\n\n```tsx\nimport { KeyRound, LockKeyhole, UnlockKeyhole } from "lucide-react";
import type { PaymentHoldRecord } from "@/lib/payment-hold-data";
import { Badge } from "@/components/ui/badge";

type ReservationAccessCardProps = {
  record: PaymentHoldRecord;
};

export function ReservationAccessCard({ record }: ReservationAccessCardProps) {
  const unlocked = record.accessStatus === "Unlocked";

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Viewing access
          </p>
          <h2 className="mt-2 text-lg font-black text-white">
            {unlocked ? "Access unlocked" : "Access locked"}
          </h2>
        </div>

        <Badge variant={unlocked ? "success" : "warning"}>
          {unlocked ? <UnlockKeyhole className="h-3.5 w-3.5" /> : <LockKeyhole className="h-3.5 w-3.5" />}
          {record.accessStatus}
        </Badge>
      </div>

      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <KeyRound className="mb-3 h-5 w-5 text-ur-primary" />
        <p className="text-sm font-black text-white">Viewing code status</p>
        <p className="mt-2 text-sm leading-6 text-white/56">
          {unlocked
            ? "The tenant can proceed to the viewing code screen. The payment hold remains visible until the reservation is resolved."
            : "Viewing code is hidden until proof verification and access policy requirements are met."}
        </p>
      </div>
    </section>
  );
}
\n```\n\n## `components/payment-hold/contract-hold-reference-card.tsx`\n\n```tsx\nimport type { PaymentHoldRecord } from "@/lib/payment-hold-data";
import { auditEvents } from "@/lib/payment-hold-data";

type ContractHoldReferenceCardProps = {
  record: PaymentHoldRecord;
};

export function ContractHoldReferenceCard({ record }: ContractHoldReferenceCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Hold references
      </p>

      <h2 className="mt-2 text-lg font-black text-white">{record.network}</h2>
      <p className="mt-1 text-sm text-white/52">Payment, proof, and reservation identifiers</p>

      <div className="mt-5 space-y-3">
        {auditEvents.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-bold text-white/70">{item.label}</p>
              </div>
              <p className="max-w-[150px] truncate font-mono text-xs font-bold text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/payment-hold/hold-audit-trail-card.tsx`\n\n```tsx\nimport { CheckCircle2, Clock3 } from "lucide-react";
import type { HoldStatus } from "@/lib/payment-hold-data";

type HoldAuditTrailCardProps = {
  status: HoldStatus;
};

export function HoldAuditTrailCard({ status }: HoldAuditTrailCardProps) {
  const items = [
    "Payment received",
    "Proof verified",
    "Viewing access unlocked",
    status === "release_eligible"
      ? "Release eligible"
      : status === "refund_pending"
        ? "Refund review opened"
        : "Reservation active"
  ];

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Audit trail
      </p>

      <div className="mt-4 space-y-3">
        {items.map((item, index) => (
          <div key={item} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-success-bg text-ur-success">
              {index < items.length - 1 ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
            </div>
            <div>
              <p className="text-sm font-black text-white">{item}</p>
              <p className="mt-1 text-xs leading-5 text-white/52">
                Recorded against the reservation and hold reference.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
\n```\n\n## `components/payment-hold/support-dispute-card.tsx`\n\n```tsx\nimport { supportReasons } from "@/lib/payment-hold-data";
import { Button } from "@/components/ui/button";

export function SupportDisputeCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Need help?
      </p>

      <div className="mt-4 space-y-3">
        {supportReasons.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Button variant="outline" className="mt-5 w-full">
        Contact support
      </Button>
    </section>
  );
}
\n```\n
---

# 14. Acceptance Checklist

```text
The route /payment-hold/REQ-UR-9084 works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for hold ID, reservation ID, request ID, hashes, and XLM amount.
UrbanRentisha dark green theme is applied.
Hold status hero card is visible.
Hold amount is clearly shown.
Reservation summary is visible.
Payment-hold timeline is visible.
Release/refund rules are visible.
Tenant actions are visible.
Copy hold ID interaction works.
Mark viewing completed changes status to release_eligible.
Request refund review changes status to refund_pending.
Viewing access status is visible.
Hold references and audit trail are visible.
Support/dispute panel is visible.
Mobile layout is stacked and readable.
All controls have visible focus states.
```

---

# 15. Final UX Summary

```text
The Payment-Hold Status Screen gives tenants a clear, simplified view of the reservation hold.
It must explain what is held, why it is held, when it can be released or reviewed, and which references support the audit trail.
The screen should communicate trust without overclaiming legal escrow functionality.
```
