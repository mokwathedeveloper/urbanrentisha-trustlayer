# UrbanRentisha TrustLayer Stellar Payment Screen UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
8. Stellar Payment Screen only
```

## 2. Page Purpose

The **Stellar Payment Screen** shows the Stellar testnet payment flow, payment amount, transaction status, and transaction hash.

This page helps tenants:

```text
Review the required viewing fee
Confirm the linked viewing request
Connect a Stellar testnet wallet
Submit the payment
Track transaction status
View and copy the transaction hash
Continue to ZK proof generation
```

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Dark SaaS layout
Technical trust tone
Clear transaction status states
Readable payment cards
Accessible controls
Minimal but precise interactions
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
Verified property access
Stellar testnet payment
Payment-proof workflow
Tenant safety
Professional B2B SaaS clarity
```

---

## 4. UX Goal

The tenant should understand this immediately:

```text
This is a Stellar testnet payment screen.
The viewing fee amount is fixed.
The transaction status is visible.
The transaction hash is needed for proof generation.
Access remains locked until ZK proof verification succeeds.
```

---

## 5. Final Folder Structure

```text
urbanrentisha-stellar-payment/
├── app/
│   ├── stellar-payment/
│   │   └── [requestId]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── stellar-payment/
│   │   ├── logo-mark.tsx
│   │   ├── payment-amount-card.tsx
│   │   ├── payment-header.tsx
│   │   ├── payment-instructions.tsx
│   │   ├── payment-progress.tsx
│   │   ├── payment-success-actions.tsx
│   │   ├── payment-summary-card.tsx
│   │   ├── security-notes-card.tsx
│   │   ├── stellar-payment-page.tsx
│   │   ├── stellar-wallet-card.tsx
│   │   ├── transaction-hash-card.tsx
│   │   └── transaction-status-panel.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── stellar-payment-data.ts
│   └── utils.ts
│
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 6. Page Layout

Desktop:

```text
Sticky top header
Back-to-request link
Screen title and trust badges
Payment progress stepper
Left main column:
  - payment amount card
  - Stellar wallet/payment action card
  - transaction status panel
  - transaction hash card after confirmation
  - next CTA to ZK proof generation
Right sticky sidebar:
  - payment summary
  - payment instructions
  - security notes
```

Mobile:

```text
Header
Back link
Title
Progress stepper
Payment amount
Wallet/payment card
Summary card
Status panel
Hash card after confirmation
Next CTA
```

---

## 7. Interaction Rules

```text
Connect wallet button changes status from idle to wallet_connected.
Pay viewing fee button is disabled until wallet is connected.
Pay viewing fee button simulates submitting and confirming states.
Confirmed status reveals transaction hash card.
Copy hash button copies the transaction hash and shows a copied state.
Continue to ZK proof button appears after confirmation.
```

---

## 8. Color Tokens

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

## 9. Typography

Google Fonts are mandatory.

```text
Inter = all UI text
JetBrains Mono = wallet addresses, transaction hash, memo, XLM amount, request IDs
```

Use JetBrains Mono for:

```text
REQ-UR-9084
GAK4...9P2L
GB7N...K9QP
UR-REQ-9084
4f7a8b2c...
8.4200000 XLM
```

---

## 10. Accessibility Requirements

```text
All buttons must have visible focus states.
Copy hash button must show a state change.
Transaction status must use text and icon, not color only.
Payment amount must be readable at mobile sizes.
Hash text must wrap and not overflow.
Wallet connection must never ask for seed phrase.
Minimum mobile touch target should be 44px.
```

---

## 11. Implementation Notes

This starter is UI-only.

Connect it later to:

```text
Freighter wallet or Stellar-compatible wallet connector
Stellar SDK
Viewing request API
Payment creation endpoint
Transaction status polling
Transaction hash storage
ZK proof generation screen
```

Recommended API endpoints:

```text
POST /api/v1/payments/create
POST /api/v1/payments/submit
GET /api/v1/payments/:requestId/status
```

Recommended next route after confirmation:

```text
/zk-proof-generation/REQ-UR-9084
```

---

# 12. Full Starter Code

\n## `package.json`\n\n```json\n{
  "name": "urbanrentisha-stellar-payment-screen",
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
  title: "Stellar Payment | UrbanRentisha TrustLayer",
  description:
    "Complete a Stellar testnet viewing-fee payment and track transaction status."
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

  .payment-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }
}
\n```\n\n## `app/page.tsx`\n\n```tsx\nimport { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/stellar-payment/REQ-UR-9084");
}
\n```\n\n## `app/stellar-payment/[requestId]/page.tsx`\n\n```tsx\nimport { StellarPaymentPage } from "@/components/stellar-payment/stellar-payment-page";

type PageProps = {
  params: {
    requestId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <StellarPaymentPage requestId={params.requestId} />;
}
\n```\n\n## `lib/utils.ts`\n\n```ts\nimport { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\n```\n\n## `lib/stellar-payment-data.ts`\n\n```ts\nimport {
  CheckCircle2,
  Clock3,
  CreditCard,
  FileCheck2,
  Hash,
  Home,
  KeyRound,
  LockKeyhole,
  ReceiptText,
  Send,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap
} from "lucide-react";

export type PaymentStatus =
  | "idle"
  | "wallet_connected"
  | "submitting"
  | "confirming"
  | "confirmed"
  | "failed";

export type StellarPaymentRequest = {
  requestId: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  tenantWallet: string;
  platformWallet: string;
  amountKes: number;
  amountXlm: string;
  network: "Stellar Testnet";
  asset: "XLM";
  memo: string;
  transactionHash: string;
  createdAt: string;
};

export const stellarPaymentRequest: StellarPaymentRequest = {
  requestId: "REQ-UR-9084",
  propertyId: "UR-LST-1001",
  propertyTitle: "Kilimani Green View Apartment",
  propertyLocation: "Kilimani, Nairobi",
  tenantWallet: "GAK4...9P2L",
  platformWallet: "GB7N...K9QP",
  amountKes: 500,
  amountXlm: "8.4200000",
  network: "Stellar Testnet",
  asset: "XLM",
  memo: "UR-REQ-9084",
  transactionHash:
    "4f7a8b2c9d1e6f0a3b5c7d8e9f102a4b6c8d0e1f2a3b4c5d6e7f8091a2b3c4d5",
  createdAt: "2026-06-19 14:28 EAT"
};

export const paymentSteps = [
  {
    label: "Request",
    description: "Viewing request created",
    icon: FileCheck2
  },
  {
    label: "Wallet",
    description: "Connect testnet wallet",
    icon: Wallet
  },
  {
    label: "Payment",
    description: "Submit XLM payment",
    icon: Send
  },
  {
    label: "Confirm",
    description: "Track transaction hash",
    icon: Hash
  },
  {
    label: "Proof",
    description: "Generate ZK proof next",
    icon: LockKeyhole
  }
];

export const transactionFacts = [
  {
    label: "Network",
    value: "Stellar Testnet",
    icon: Sparkles
  },
  {
    label: "Asset",
    value: "XLM",
    icon: Zap
  },
  {
    label: "Memo",
    value: "UR-REQ-9084",
    icon: ReceiptText
  },
  {
    label: "Status",
    value: "Awaiting payment",
    icon: Clock3
  }
];

export const securityNotes = [
  {
    title: "Testnet payment only",
    description: "This screen is designed for hackathon/demo testnet flow.",
    icon: CreditCard
  },
  {
    title: "No seed phrase request",
    description: "UrbanRentisha must never ask tenants to type a seed phrase.",
    icon: ShieldCheck
  },
  {
    title: "Payment proof required",
    description: "After payment confirmation, the user proceeds to private proof generation.",
    icon: LockKeyhole
  },
  {
    title: "Access remains locked",
    description: "Viewing code unlocks only after proof verification succeeds.",
    icon: KeyRound
  }
];

export const requestSummaryItems = [
  {
    label: "Property",
    value: "Verified",
    icon: Home
  },
  {
    label: "Request",
    value: "Created",
    icon: CheckCircle2
  },
  {
    label: "Payment",
    value: "Pending",
    icon: Clock3
  },
  {
    label: "Proof",
    value: "Next",
    icon: LockKeyhole
  }
];
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
\n```\n\n## `components/stellar-payment/logo-mark.tsx`\n\n```tsx\nimport Link from "next/link";
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
\n```\n\n## `components/stellar-payment/stellar-payment-page.tsx`\n\n```tsx\n"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { stellarPaymentRequest, type PaymentStatus } from "@/lib/stellar-payment-data";
import { PaymentHeader } from "@/components/stellar-payment/payment-header";
import { PaymentProgress } from "@/components/stellar-payment/payment-progress";
import { PaymentAmountCard } from "@/components/stellar-payment/payment-amount-card";
import { StellarWalletCard } from "@/components/stellar-payment/stellar-wallet-card";
import { TransactionStatusPanel } from "@/components/stellar-payment/transaction-status-panel";
import { TransactionHashCard } from "@/components/stellar-payment/transaction-hash-card";
import { PaymentSummaryCard } from "@/components/stellar-payment/payment-summary-card";
import { PaymentInstructions } from "@/components/stellar-payment/payment-instructions";
import { PaymentSuccessActions } from "@/components/stellar-payment/payment-success-actions";
import { SecurityNotesCard } from "@/components/stellar-payment/security-notes-card";
import { Badge } from "@/components/ui/badge";

type StellarPaymentPageProps = {
  requestId: string;
};

export function StellarPaymentPage({ requestId }: StellarPaymentPageProps) {
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [copied, setCopied] = useState(false);
  const request = { ...stellarPaymentRequest, requestId };

  function connectWallet() {
    setStatus("wallet_connected");
  }

  function submitPayment() {
    setStatus("submitting");
    window.setTimeout(() => setStatus("confirming"), 900);
    window.setTimeout(() => setStatus("confirmed"), 1800);
  }

  async function copyHash() {
    await navigator.clipboard.writeText(request.transactionHash);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 payment-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <PaymentHeader />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href={`/request-viewing/${request.propertyId}`}
              className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to request viewing
            </Link>

            <div className="flex flex-wrap gap-2">
              <Badge variant="success">
                <ShieldCheck className="h-3.5 w-3.5" />
                Testnet-safe payment
              </Badge>
              <Badge variant="outline">
                <Sparkles className="h-3.5 w-3.5" />
                Stellar network
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Stellar payment screen
            </p>
            <h1 className="mt-3 max-w-[820px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
              Pay the viewing fee on Stellar testnet.
            </h1>
            <p className="mt-4 max-w-[760px] text-base leading-7 text-white/66">
              Complete the payment, track transaction status, and keep the transaction hash for proof generation. Access stays locked until proof verification succeeds.
            </p>
          </div>

          <PaymentProgress status={status} />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-6">
              <PaymentAmountCard request={request} />
              <StellarWalletCard
                request={request}
                status={status}
                onConnectWallet={connectWallet}
                onSubmitPayment={submitPayment}
              />
              <TransactionStatusPanel status={status} request={request} />
              {status === "confirmed" ? (
                <TransactionHashCard
                  hash={request.transactionHash}
                  copied={copied}
                  onCopy={copyHash}
                />
              ) : null}
              {status === "confirmed" ? (
                <PaymentSuccessActions request={request} />
              ) : null}
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <PaymentSummaryCard request={request} status={status} />
              <PaymentInstructions request={request} />
              <SecurityNotesCard />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
\n```\n\n## `components/stellar-payment/payment-header.tsx`\n\n```tsx\nimport Link from "next/link";
import { Bell, LayoutDashboard, Menu, UserRound } from "lucide-react";
import { LogoMark } from "@/components/stellar-payment/logo-mark";

export function PaymentHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="ur-container flex h-20 items-center justify-between">
        <LogoMark />

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {[
            { label: "Listings", href: "/listings" },
            { label: "Request", href: "/request-viewing/UR-LST-1001" },
            { label: "Stellar payment", href: "/stellar-payment/REQ-UR-9084", active: true },
            { label: "Proof tracker", href: "/proof-status" }
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
\n```\n\n## `components/stellar-payment/payment-progress.tsx`\n\n```tsx\nimport { CheckCircle2 } from "lucide-react";
import { paymentSteps, type PaymentStatus } from "@/lib/stellar-payment-data";
import { cn } from "@/lib/utils";

type PaymentProgressProps = {
  status: PaymentStatus;
};

function getActiveIndex(status: PaymentStatus) {
  if (status === "idle") return 1;
  if (status === "wallet_connected") return 2;
  if (status === "submitting" || status === "confirming") return 3;
  if (status === "confirmed") return 4;
  return 1;
}

export function PaymentProgress({ status }: PaymentProgressProps) {
  const activeIndex = getActiveIndex(status);

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-3 md:grid-cols-5">
        {paymentSteps.map((step, index) => {
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
\n```\n\n## `components/stellar-payment/payment-amount-card.tsx`\n\n```tsx\nimport { ReceiptText, ShieldCheck, Sparkles, Zap } from "lucide-react";
import type { StellarPaymentRequest } from "@/lib/stellar-payment-data";
import { Badge } from "@/components/ui/badge";

type PaymentAmountCardProps = {
  request: StellarPaymentRequest;
};

export function PaymentAmountCard({ request }: PaymentAmountCardProps) {
  return (
    <section className="overflow-hidden rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Payment amount locked
          </Badge>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-white">
            Viewing fee payment
          </h2>

          <p className="mt-3 max-w-[660px] text-sm leading-6 text-white/62">
            This payment is linked to the viewing request. After confirmation, the transaction hash is used for the private proof step.
          </p>
        </div>

        <div className="min-w-[260px] rounded-ur-lg border border-white/10 bg-black/20 p-5 text-right">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/42">
            Required viewing fee
          </p>
          <p className="mt-2 text-4xl font-black tracking-[-0.05em] text-white">
            KES {request.amountKes.toLocaleString()}
          </p>
          <p className="mt-2 font-mono text-lg font-bold text-ur-mint">
            {request.amountXlm} {request.asset}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Info icon={<Sparkles className="h-5 w-5" />} label="Network" value={request.network} />
        <Info icon={<Zap className="h-5 w-5" />} label="Asset" value={request.asset} />
        <Info icon={<ReceiptText className="h-5 w-5" />} label="Memo" value={request.memo} mono />
      </div>
    </section>
  );
}

function Info({
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
      <p className={mono ? "mt-1 font-mono text-sm font-bold text-white" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
\n```\n\n## `components/stellar-payment/stellar-wallet-card.tsx`\n\n```tsx\n"use client";

import { ArrowRight, CheckCircle2, Loader2, Send, Wallet } from "lucide-react";
import type { PaymentStatus, StellarPaymentRequest } from "@/lib/stellar-payment-data";
import { Button } from "@/components/ui/button";

type StellarWalletCardProps = {
  request: StellarPaymentRequest;
  status: PaymentStatus;
  onConnectWallet: () => void;
  onSubmitPayment: () => void;
};

export function StellarWalletCard({
  request,
  status,
  onConnectWallet,
  onSubmitPayment
}: StellarWalletCardProps) {
  const walletConnected = status !== "idle";
  const busy = status === "submitting" || status === "confirming";
  const confirmed = status === "confirmed";

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Stellar testnet wallet
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Connect wallet and submit payment.
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/58">
          This starter simulates the wallet connection and payment confirmation. Connect this UI to Freighter or another Stellar-compatible wallet later.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <WalletTile label="Tenant wallet" value={request.tenantWallet} connected={walletConnected} />
        <WalletTile label="Platform receiving wallet" value={request.platformWallet} connected />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          variant={walletConnected ? "secondary" : "primary"}
          className="w-full"
          onClick={onConnectWallet}
          disabled={walletConnected}
        >
          {walletConnected ? <CheckCircle2 className="h-4 w-4" /> : <Wallet className="h-4 w-4" />}
          {walletConnected ? "Wallet connected" : "Connect testnet wallet"}
        </Button>

        <Button
          size="lg"
          className="w-full"
          onClick={onSubmitPayment}
          disabled={!walletConnected || busy || confirmed}
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {confirmed ? "Payment confirmed" : busy ? "Submitting payment..." : "Pay viewing fee"}
          {!busy && !confirmed ? <ArrowRight className="h-4 w-4" /> : null}
        </Button>
      </div>
    </section>
  );
}

function WalletTile({
  label,
  value,
  connected
}: {
  label: string;
  value: string;
  connected?: boolean;
}) {
  return (
    <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p>
        {connected ? (
          <span className="rounded-full border border-ur-success/25 bg-ur-success-bg px-2 py-1 text-[11px] font-bold text-ur-success">
            Connected
          </span>
        ) : (
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-bold text-white/42">
            Not connected
          </span>
        )}
      </div>
      <p className="font-mono text-sm font-bold text-white">{value}</p>
    </div>
  );
}
\n```\n\n## `components/stellar-payment/transaction-status-panel.tsx`\n\n```tsx\nimport { AlertTriangle, CheckCircle2, Clock3, Loader2, RadioTower } from "lucide-react";
import type { PaymentStatus, StellarPaymentRequest } from "@/lib/stellar-payment-data";
import { cn } from "@/lib/utils";

type TransactionStatusPanelProps = {
  status: PaymentStatus;
  request: StellarPaymentRequest;
};

const statusCopy: Record<PaymentStatus, { title: string; description: string; tone: "neutral" | "success" | "warning" | "danger" }> = {
  idle: {
    title: "Awaiting wallet connection",
    description: "Connect a Stellar testnet wallet to begin the payment flow.",
    tone: "neutral"
  },
  wallet_connected: {
    title: "Wallet connected",
    description: "Ready to submit the viewing-fee payment on Stellar testnet.",
    tone: "warning"
  },
  submitting: {
    title: "Submitting payment",
    description: "The transaction is being prepared and submitted to the network.",
    tone: "warning"
  },
  confirming: {
    title: "Confirming on Stellar",
    description: "Waiting for testnet confirmation and transaction hash availability.",
    tone: "warning"
  },
  confirmed: {
    title: "Payment confirmed",
    description: "Transaction hash is available. Continue to ZK proof generation next.",
    tone: "success"
  },
  failed: {
    title: "Payment failed",
    description: "The transaction did not complete. Retry with a funded testnet wallet.",
    tone: "danger"
  }
};

export function TransactionStatusPanel({ status, request }: TransactionStatusPanelProps) {
  const copy = statusCopy[status];
  const Icon =
    status === "confirmed"
      ? CheckCircle2
      : status === "failed"
        ? AlertTriangle
        : status === "submitting" || status === "confirming"
          ? Loader2
          : status === "wallet_connected"
            ? RadioTower
            : Clock3;

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div className={cn(
            "grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg",
            copy.tone === "success" && "bg-ur-success-bg text-ur-success",
            copy.tone === "warning" && "bg-ur-warning-bg text-ur-warning",
            copy.tone === "danger" && "bg-ur-error-bg text-ur-error",
            copy.tone === "neutral" && "bg-white/5 text-white/58"
          )}>
            <Icon className={cn("h-6 w-6", (status === "submitting" || status === "confirming") && "animate-spin")} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Transaction status
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
              {copy.title}
            </h2>
            <p className="mt-2 max-w-[640px] text-sm leading-6 text-white/58">
              {copy.description}
            </p>
          </div>
        </div>

        <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4 sm:min-w-[180px] sm:text-right">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
            Request ID
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-ur-mint">{request.requestId}</p>
        </div>
      </div>
    </section>
  );
}
\n```\n\n## `components/stellar-payment/transaction-hash-card.tsx`\n\n```tsx\n"use client";

import { Check, Copy, ExternalLink, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";

type TransactionHashCardProps = {
  hash: string;
  copied: boolean;
  onCopy: () => void;
};

export function TransactionHashCard({
  hash,
  copied,
  onCopy
}: TransactionHashCardProps) {
  const shortHash = `${hash.slice(0, 16)}...${hash.slice(-16)}`;

  return (
    <section className="rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-5 flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
          <Hash className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-success">
            Transaction hash
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Payment transaction confirmed.
          </h2>
          <p className="mt-2 text-sm leading-6 text-ur-success/78">
            Store this hash for proof generation and audit tracking.
          </p>
        </div>
      </div>

      <div className="rounded-ur-lg border border-ur-success/20 bg-black/18 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/64">
          Full hash
        </p>
        <p className="mt-2 break-all font-mono text-sm leading-6 text-white">{hash}</p>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button className="w-full" onClick={onCopy}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy transaction hash"}
        </Button>

        <Button variant="outline" className="w-full">
          View on testnet explorer
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      <p className="mt-3 font-mono text-xs text-ur-success/70">{shortHash}</p>
    </section>
  );
}
\n```\n\n## `components/stellar-payment/payment-summary-card.tsx`\n\n```tsx\nimport { CheckCircle2, Clock3, LockKeyhole } from "lucide-react";
import type { PaymentStatus, StellarPaymentRequest } from "@/lib/stellar-payment-data";
import { requestSummaryItems } from "@/lib/stellar-payment-data";
import { Badge } from "@/components/ui/badge";

type PaymentSummaryCardProps = {
  request: StellarPaymentRequest;
  status: PaymentStatus;
};

export function PaymentSummaryCard({ request, status }: PaymentSummaryCardProps) {
  const confirmed = status === "confirmed";

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Payment summary
          </p>
          <h2 className="mt-2 text-lg font-black text-white">{request.propertyTitle}</h2>
          <p className="mt-1 text-sm text-white/52">{request.propertyLocation}</p>
        </div>

        <Badge variant={confirmed ? "success" : "warning"}>
          {confirmed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
          {confirmed ? "Paid" : "Pending"}
        </Badge>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <SummaryTile label="Amount" value={`KES ${request.amountKes.toLocaleString()}`} />
        <SummaryTile label="XLM" value={request.amountXlm} mono />
        <SummaryTile label="Memo" value={request.memo} mono />
        <SummaryTile label="Network" value={request.network} />
      </div>

      <div className="mt-5 space-y-3">
        {requestSummaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-bold text-white/70">{item.label}</p>
              </div>
              <p className="text-sm font-black text-white">
                {item.label === "Payment" ? (confirmed ? "Confirmed" : "Pending") : item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
        <div className="flex gap-3">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-ur-primary" />
          <p className="text-sm leading-6 text-white/60">
            Viewing access remains locked until the next proof verification step succeeds.
          </p>
        </div>
      </div>
    </section>
  );
}

function SummaryTile({
  label,
  value,
  mono
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">{label}</p>
      <p className={mono ? "mt-1 font-mono text-xs font-bold text-ur-mint" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
\n```\n\n## `components/stellar-payment/payment-instructions.tsx`\n\n```tsx\nimport { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type { StellarPaymentRequest } from "@/lib/stellar-payment-data";

type PaymentInstructionsProps = {
  request: StellarPaymentRequest;
};

export function PaymentInstructions({ request }: PaymentInstructionsProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Payment instructions
      </p>

      <div className="mt-4 space-y-3">
        <Instruction
          icon={<Info className="h-4 w-4" />}
          title="Use Stellar testnet"
          description="This demo payment must use testnet assets, not mainnet funds."
        />
        <Instruction
          icon={<CheckCircle2 className="h-4 w-4" />}
          title="Use the correct memo"
          description={`Include memo ${request.memo} so the request can match the payment.`}
        />
        <Instruction
          icon={<AlertTriangle className="h-4 w-4" />}
          title="Never share secret keys"
          description="The wallet connector should never ask for or store tenant secret keys."
        />
      </div>
    </section>
  );
}

function Instruction({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
        {icon}
      </div>
      <div>
        <p className="text-sm font-black text-white">{title}</p>
        <p className="mt-1 text-xs leading-5 text-white/52">{description}</p>
      </div>
    </div>
  );
}
\n```\n\n## `components/stellar-payment/security-notes-card.tsx`\n\n```tsx\nimport { securityNotes } from "@/lib/stellar-payment-data";

export function SecurityNotesCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Security notes
      </p>

      <div className="mt-4 space-y-3">
        {securityNotes.map((item) => {
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
    </section>
  );
}
\n```\n\n## `components/stellar-payment/payment-success-actions.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import type { StellarPaymentRequest } from "@/lib/stellar-payment-data";
import { Button } from "@/components/ui/button";

type PaymentSuccessActionsProps = {
  request: StellarPaymentRequest;
};

export function PaymentSuccessActions({ request }: PaymentSuccessActionsProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Payment complete
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
              Generate the private payment proof next.
            </h2>
            <p className="mt-2 max-w-[660px] text-sm leading-6 text-white/58">
              The transaction hash confirms payment on Stellar testnet. The next screen should create the ZK proof used to unlock viewing access.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link href={`/zk-proof-generation/${request.requestId}`} className="w-full sm:w-auto">
          <Button size="lg" className="w-full">
            <LockKeyhole className="h-4 w-4" />
            Continue to ZK proof
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>

        <Link href="/tenant/dashboard" className="w-full sm:w-auto">
          <Button size="lg" variant="outline" className="w-full">
            View dashboard
          </Button>
        </Link>
      </div>
    </section>
  );
}
\n```\n
---

# 13. Acceptance Checklist

```text
The route /stellar-payment/REQ-UR-9084 works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for request ID, memo, wallet addresses, XLM amount, and transaction hash.
UrbanRentisha dark green theme is applied.
Payment amount is clearly shown.
Stellar testnet network is clearly shown.
Wallet connection button works.
Pay viewing fee button is disabled until wallet connection.
Payment status changes through submitting and confirming states.
Confirmed status reveals transaction hash.
Copy transaction hash button works.
Next CTA to ZK proof generation appears after confirmation.
Access locked message is clear.
No seed phrase request appears.
Mobile layout is stacked and readable.
All controls have visible focus states.
```

---

# 14. Final UX Summary

```text
The Stellar Payment Screen is the payment confirmation bridge between the viewing request and ZK proof generation.
The screen must show amount, network, memo, status, and transaction hash clearly.
The tenant should know that payment alone does not unlock access; proof verification is still required.
```
