# UrbanRentisha TrustLayer ZK Proof Generation Screen UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
9. ZK Proof Generation Screen only
```

## 2. Page Purpose

The **ZK Proof Generation Screen** allows the tenant to generate a private payment proof after payment is received.

This page helps tenants:

```text
Confirm the payment has been received
Review the linked request and transaction hash
Generate a private payment proof
Understand public inputs versus private witness inputs
Copy the proof hash
Continue to proof verification
```

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Dark SaaS layout
Technical trust tone
Readable proof states
Clear public/private data separation
Accessible interactions
Minimal motion
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
Verified property access
Private payment proof
Stellar and ZK trust flow
Tenant safety
Professional B2B SaaS clarity
```

---

## 4. UX Goal

The tenant should understand this immediately:

```text
Payment has been received.
The next action is to generate a private proof.
The proof confirms payment without exposing unrelated wallet history.
The generated proof still needs verification before access unlocks.
```

---

## 5. Final Folder Structure

```text
urbanrentisha-zk-proof-generation/
├── app/
│   ├── zk-proof-generation/
│   │   └── [requestId]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── zk-proof-generation/
│   │   ├── generate-proof-card.tsx
│   │   ├── logo-mark.tsx
│   │   ├── payment-confirmed-card.tsx
│   │   ├── privacy-explainer-card.tsx
│   │   ├── private-inputs-card.tsx
│   │   ├── proof-output-card.tsx
│   │   ├── proof-status-panel.tsx
│   │   ├── proof-success-actions.tsx
│   │   ├── proof-summary-card.tsx
│   │   ├── public-inputs-card.tsx
│   │   ├── zk-header.tsx
│   │   ├── zk-progress.tsx
│   │   └── zk-proof-generation-page.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── zk-proof-data.ts
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
Back-to-Stellar-payment link
Screen title and trust badges
ZK progress stepper
Left main column:
  - confirmed payment summary
  - generate proof action card
  - proof status panel
  - proof hash output after generation
  - privacy explainer
  - next CTA to proof verification
Right sticky sidebar:
  - proof summary
  - public inputs
  - private witness input explanation
```

Mobile:

```text
Header
Back link
Title
Progress stepper
Payment confirmed card
Generate proof card
Proof status
Proof output
Public/private input cards
Next CTA
```

---

## 7. Interaction Rules

```text
Generate proof button starts the generating state.
Generating state shows a loader.
After generation, proof hash output appears.
Copy proof hash button copies the proof hash.
Proof success CTA routes to proof verification.
Access remains locked until verification succeeds.
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
JetBrains Mono = proof hash, transaction hash, request ID, property ID, circuit name, verifier name
```

Use JetBrains Mono for:

```text
REQ-UR-9084
UR-LST-1001
payment_condition_v1
UrbanRentishaTrustVerifier
zkp_0x9f12...
poseidon_0x82...
```

---

## 10. Accessibility Requirements

```text
Generate proof button must be keyboard focusable.
Copy proof button must show a copied state.
Proof status must use icon and text, not color only.
Long hash strings must wrap and not overflow.
Public and private input explanations must be clearly separated.
All interactive elements must have visible focus rings.
Minimum mobile touch target should be 44px.
```

---

## 11. Implementation Notes

This starter is UI-only.

Connect it later to:

```text
Proof generation service
Noir/Circom/RISC Zero proof engine
Payment record API
Transaction hash lookup
Proof storage endpoint
Proof verification screen
Soroban verifier or verification-record contract
```

Recommended API endpoints:

```text
POST /api/v1/proofs/generate
GET /api/v1/proofs/:requestId/status
POST /api/v1/proofs/submit
```

Recommended next route after proof generation:

```text
/proof-verification/REQ-UR-9084
```

---

# 12. Full Starter Code

\n## `package.json`\n\n```json\n{
  "name": "urbanrentisha-zk-proof-generation-screen",
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
  title: "ZK Proof Generation | UrbanRentisha TrustLayer",
  description:
    "Generate a private payment proof after a Stellar payment is received."
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

  .zk-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }
}
\n```\n\n## `app/page.tsx`\n\n```tsx\nimport { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/zk-proof-generation/REQ-UR-9084");
}
\n```\n\n## `app/zk-proof-generation/[requestId]/page.tsx`\n\n```tsx\nimport { ZkProofGenerationPage } from "@/components/zk-proof-generation/zk-proof-generation-page";

type PageProps = {
  params: {
    requestId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <ZkProofGenerationPage requestId={params.requestId} />;
}
\n```\n\n## `lib/utils.ts`\n\n```ts\nimport { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\n```\n\n## `lib/zk-proof-data.ts`\n\n```ts\nimport {
  CheckCircle2,
  CircuitBoard,
  Database,
  EyeOff,
  FileCheck2,
  Fingerprint,
  Hash,
  Home,
  KeyRound,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap
} from "lucide-react";

export type ProofStatus =
  | "ready"
  | "generating"
  | "generated"
  | "failed";

export type ZkProofRequest = {
  requestId: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  paymentAmountKes: number;
  paymentAmountXlm: string;
  transactionHash: string;
  paymentCommitment: string;
  proofHash: string;
  circuitName: string;
  verifier: string;
  network: "Stellar Testnet";
};

export const zkProofRequest: ZkProofRequest = {
  requestId: "REQ-UR-9084",
  propertyId: "UR-LST-1001",
  propertyTitle: "Kilimani Green View Apartment",
  propertyLocation: "Kilimani, Nairobi",
  paymentAmountKes: 500,
  paymentAmountXlm: "8.4200000 XLM",
  transactionHash:
    "4f7a8b2c9d1e6f0a3b5c7d8e9f102a4b6c8d0e1f2a3b4c5d6e7f8091a2b3c4d5",
  paymentCommitment:
    "poseidon_0x82f4a901c6d4e77b1c49a3e80924c61f4d70a11e",
  proofHash:
    "zkp_0x9f12e5ab4c8d7a63f20b1c44e9aa73f1dc8829b6e4107ac5d9ef2a13b0c44190",
  circuitName: "payment_condition_v1",
  verifier: "UrbanRentishaTrustVerifier",
  network: "Stellar Testnet"
};

export const proofSteps = [
  {
    label: "Payment",
    description: "Transaction confirmed",
    icon: Wallet
  },
  {
    label: "Witness",
    description: "Prepare private inputs",
    icon: Database
  },
  {
    label: "Generate",
    description: "Create ZK payment proof",
    icon: CircuitBoard
  },
  {
    label: "Proof",
    description: "Proof hash generated",
    icon: Hash
  },
  {
    label: "Verify",
    description: "Submit proof to verifier",
    icon: ShieldCheck
  }
];

export const publicInputs = [
  {
    label: "Request ID",
    value: "REQ-UR-9084",
    icon: FileCheck2
  },
  {
    label: "Property ID",
    value: "UR-LST-1001",
    icon: Home
  },
  {
    label: "Required fee",
    value: "KES 500",
    icon: ReceiptText
  },
  {
    label: "Network",
    value: "Stellar Testnet",
    icon: Sparkles
  },
  {
    label: "Verifier",
    value: "UrbanRentishaTrustVerifier",
    icon: ShieldCheck
  },
  {
    label: "Circuit",
    value: "payment_condition_v1",
    icon: CircuitBoard
  }
];

export const privateInputs = [
  {
    title: "Tenant payment reference",
    description: "Used to prove payment linkage without exposing unrelated wallet history.",
    icon: Fingerprint
  },
  {
    title: "Payment nonce",
    description: "Keeps the commitment unique for this request and payment condition.",
    icon: KeyRound
  },
  {
    title: "Wallet details",
    description: "Sensitive wallet context is used locally and not shown on the verification record.",
    icon: EyeOff
  },
  {
    title: "Payment secret",
    description: "Private witness value used to prove the payment condition.",
    icon: LockKeyhole
  }
];

export const proofFacts = [
  {
    label: "Proof system",
    value: "ZK payment condition",
    icon: Zap
  },
  {
    label: "Privacy level",
    value: "Wallet history hidden",
    icon: EyeOff
  },
  {
    label: "Output",
    value: "Proof hash",
    icon: Hash
  },
  {
    label: "Next step",
    value: "Verify proof",
    icon: ShieldCheck
  }
];

export const privacyNotes = [
  {
    title: "Proves payment condition",
    description: "The proof confirms the viewing fee condition was satisfied.",
    icon: CheckCircle2
  },
  {
    title: "Hides unrelated wallet history",
    description: "The tenant does not need to reveal unrelated balances or transactions.",
    icon: EyeOff
  },
  {
    title: "Produces a verifier-ready proof",
    description: "The proof hash can be submitted to the Stellar/Soroban verification step.",
    icon: ShieldCheck
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
\n```\n\n## `components/zk-proof-generation/logo-mark.tsx`\n\n```tsx\nimport Link from "next/link";
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
\n```\n\n## `components/zk-proof-generation/zk-proof-generation-page.tsx`\n\n```tsx\n"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, EyeOff, ShieldCheck } from "lucide-react";
import { zkProofRequest, type ProofStatus } from "@/lib/zk-proof-data";
import { ZkHeader } from "@/components/zk-proof-generation/zk-header";
import { ZkProgress } from "@/components/zk-proof-generation/zk-progress";
import { PaymentConfirmedCard } from "@/components/zk-proof-generation/payment-confirmed-card";
import { GenerateProofCard } from "@/components/zk-proof-generation/generate-proof-card";
import { ProofStatusPanel } from "@/components/zk-proof-generation/proof-status-panel";
import { ProofOutputCard } from "@/components/zk-proof-generation/proof-output-card";
import { PublicInputsCard } from "@/components/zk-proof-generation/public-inputs-card";
import { PrivateInputsCard } from "@/components/zk-proof-generation/private-inputs-card";
import { PrivacyExplainerCard } from "@/components/zk-proof-generation/privacy-explainer-card";
import { ProofSummaryCard } from "@/components/zk-proof-generation/proof-summary-card";
import { ProofSuccessActions } from "@/components/zk-proof-generation/proof-success-actions";
import { Badge } from "@/components/ui/badge";

type ZkProofGenerationPageProps = {
  requestId: string;
};

export function ZkProofGenerationPage({ requestId }: ZkProofGenerationPageProps) {
  const [status, setStatus] = useState<ProofStatus>("ready");
  const [copied, setCopied] = useState(false);
  const request = { ...zkProofRequest, requestId };

  function generateProof() {
    setStatus("generating");
    window.setTimeout(() => setStatus("generated"), 1800);
  }

  async function copyProofHash() {
    await navigator.clipboard.writeText(request.proofHash);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 zk-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <ZkHeader />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href={`/stellar-payment/${request.requestId}`}
              className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Stellar payment
            </Link>

            <div className="flex flex-wrap gap-2">
              <Badge variant="success">
                <ShieldCheck className="h-3.5 w-3.5" />
                Payment received
              </Badge>
              <Badge variant="outline">
                <EyeOff className="h-3.5 w-3.5" />
                Private proof
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              ZK proof generation
            </p>
            <h1 className="mt-3 max-w-[840px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
              Generate a private payment proof.
            </h1>
            <p className="mt-4 max-w-[780px] text-base leading-7 text-white/66">
              The payment has been received. Generate a proof that confirms the viewing fee condition without exposing unrelated wallet history.
            </p>
          </div>

          <ZkProgress status={status} />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-6">
              <PaymentConfirmedCard request={request} />
              <GenerateProofCard
                request={request}
                status={status}
                onGenerate={generateProof}
              />
              <ProofStatusPanel status={status} request={request} />

              {status === "generated" ? (
                <>
                  <ProofOutputCard
                    proofHash={request.proofHash}
                    copied={copied}
                    onCopy={copyProofHash}
                  />
                  <ProofSuccessActions request={request} />
                </>
              ) : null}

              <PrivacyExplainerCard />
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <ProofSummaryCard request={request} status={status} />
              <PublicInputsCard />
              <PrivateInputsCard />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
\n```\n\n## `components/zk-proof-generation/zk-header.tsx`\n\n```tsx\nimport Link from "next/link";
import { Bell, LayoutDashboard, Menu, UserRound } from "lucide-react";
import { LogoMark } from "@/components/zk-proof-generation/logo-mark";

export function ZkHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="ur-container flex h-20 items-center justify-between">
        <LogoMark />

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {[
            { label: "Request", href: "/request-viewing/UR-LST-1001" },
            { label: "Stellar payment", href: "/stellar-payment/REQ-UR-9084" },
            { label: "ZK proof", href: "/zk-proof-generation/REQ-UR-9084", active: true },
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
\n```\n\n## `components/zk-proof-generation/zk-progress.tsx`\n\n```tsx\nimport { CheckCircle2 } from "lucide-react";
import { proofSteps, type ProofStatus } from "@/lib/zk-proof-data";
import { cn } from "@/lib/utils";

type ZkProgressProps = {
  status: ProofStatus;
};

function getActiveIndex(status: ProofStatus) {
  if (status === "ready") return 2;
  if (status === "generating") return 2;
  if (status === "generated") return 4;
  return 2;
}

export function ZkProgress({ status }: ZkProgressProps) {
  const activeIndex = getActiveIndex(status);

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-3 md:grid-cols-5">
        {proofSteps.map((step, index) => {
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
\n```\n\n## `components/zk-proof-generation/payment-confirmed-card.tsx`\n\n```tsx\nimport { CheckCircle2, Hash, ReceiptText, Wallet } from "lucide-react";
import type { ZkProofRequest } from "@/lib/zk-proof-data";
import { Badge } from "@/components/ui/badge";

type PaymentConfirmedCardProps = {
  request: ZkProofRequest;
};

export function PaymentConfirmedCard({ request }: PaymentConfirmedCardProps) {
  return (
    <section className="overflow-hidden rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <Badge variant="success">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Payment confirmed
          </Badge>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-white">
            Payment is ready for proof generation.
          </h2>

          <p className="mt-3 max-w-[680px] text-sm leading-6 text-ur-success/78">
            The Stellar payment has been received. This screen prepares the private witness values and generates a proof for the viewing-fee condition.
          </p>
        </div>

        <div className="min-w-[260px] rounded-ur-lg border border-ur-success/20 bg-black/18 p-5 text-right">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/64">
            Paid amount
          </p>
          <p className="mt-2 text-4xl font-black tracking-[-0.05em] text-white">
            KES {request.paymentAmountKes.toLocaleString()}
          </p>
          <p className="mt-2 font-mono text-lg font-bold text-ur-mint">
            {request.paymentAmountXlm}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Info icon={<Wallet className="h-5 w-5" />} label="Request" value={request.requestId} mono />
        <Info icon={<ReceiptText className="h-5 w-5" />} label="Property" value={request.propertyId} mono />
        <Info icon={<Hash className="h-5 w-5" />} label="Transaction" value={`${request.transactionHash.slice(0, 12)}...${request.transactionHash.slice(-8)}`} mono />
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
    <div className="rounded-ur-lg border border-ur-success/20 bg-black/16 p-4">
      <div className="mb-3 text-ur-success">{icon}</div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/60">{label}</p>
      <p className={mono ? "mt-1 font-mono text-sm font-bold text-white" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
\n```\n\n## `components/zk-proof-generation/generate-proof-card.tsx`\n\n```tsx\n"use client";

import { CircuitBoard, Database, Loader2, LockKeyhole, Play, ShieldCheck } from "lucide-react";
import type { ProofStatus, ZkProofRequest } from "@/lib/zk-proof-data";
import { Button } from "@/components/ui/button";

type GenerateProofCardProps = {
  request: ZkProofRequest;
  status: ProofStatus;
  onGenerate: () => void;
};

export function GenerateProofCard({
  request,
  status,
  onGenerate
}: GenerateProofCardProps) {
  const generating = status === "generating";
  const generated = status === "generated";

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Private proof action
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Generate proof for this payment condition.
        </h2>
        <p className="mt-3 max-w-[760px] text-sm leading-6 text-white/58">
          The proof confirms that the tenant paid the required viewing fee for this request without showing unrelated wallet history.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <GenerationTile
          icon={<Database className="h-5 w-5" />}
          label="Witness"
          value="Private inputs prepared"
        />
        <GenerationTile
          icon={<CircuitBoard className="h-5 w-5" />}
          label="Circuit"
          value={request.circuitName}
          mono
        />
        <GenerationTile
          icon={<ShieldCheck className="h-5 w-5" />}
          label="Verifier"
          value={request.verifier}
          mono
        />
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
        <div className="flex gap-3">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-ur-primary" />
          <div>
            <p className="text-sm font-black text-white">What remains private</p>
            <p className="mt-1 text-sm leading-6 text-white/58">
              Payment secret, nonce, and wallet context are used as private witness data. They are not displayed in the final verification record.
            </p>
          </div>
        </div>
      </div>

      <Button
        size="lg"
        className="mt-5 w-full"
        onClick={onGenerate}
        disabled={generating || generated}
      >
        {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
        {generated ? "Proof generated" : generating ? "Generating proof..." : "Generate private payment proof"}
      </Button>
    </section>
  );
}

function GenerationTile({
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
      <p className={mono ? "mt-1 break-all font-mono text-sm font-bold text-white" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
\n```\n\n## `components/zk-proof-generation/proof-status-panel.tsx`\n\n```tsx\nimport { AlertTriangle, CheckCircle2, Clock3, Loader2 } from "lucide-react";
import type { ProofStatus, ZkProofRequest } from "@/lib/zk-proof-data";
import { cn } from "@/lib/utils";

type ProofStatusPanelProps = {
  status: ProofStatus;
  request: ZkProofRequest;
};

const statusCopy: Record<ProofStatus, { title: string; description: string; tone: "neutral" | "success" | "warning" | "danger" }> = {
  ready: {
    title: "Ready to generate",
    description: "Payment is confirmed and proof inputs are available.",
    tone: "neutral"
  },
  generating: {
    title: "Generating private proof",
    description: "The proof circuit is processing the payment condition and private witness values.",
    tone: "warning"
  },
  generated: {
    title: "Proof generated",
    description: "A verifier-ready proof hash is now available for the next verification step.",
    tone: "success"
  },
  failed: {
    title: "Proof generation failed",
    description: "The proof could not be generated. Check payment reference and retry.",
    tone: "danger"
  }
};

export function ProofStatusPanel({ status, request }: ProofStatusPanelProps) {
  const copy = statusCopy[status];
  const Icon =
    status === "generated"
      ? CheckCircle2
      : status === "failed"
        ? AlertTriangle
        : status === "generating"
          ? Loader2
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
            <Icon className={cn("h-6 w-6", status === "generating" && "animate-spin")} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Proof status
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
\n```\n\n## `components/zk-proof-generation/proof-output-card.tsx`\n\n```tsx\n"use client";

import { Check, Copy, Hash, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProofOutputCardProps = {
  proofHash: string;
  copied: boolean;
  onCopy: () => void;
};

export function ProofOutputCard({
  proofHash,
  copied,
  onCopy
}: ProofOutputCardProps) {
  const shortProof = `${proofHash.slice(0, 18)}...${proofHash.slice(-16)}`;

  return (
    <section className="rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-5 flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
          <Hash className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-success">
            Proof output
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Private payment proof generated.
          </h2>
          <p className="mt-2 text-sm leading-6 text-ur-success/78">
            This proof hash is ready for submission to the verification step.
          </p>
        </div>
      </div>

      <div className="rounded-ur-lg border border-ur-success/20 bg-black/18 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/64">
          Proof hash
        </p>
        <p className="mt-2 break-all font-mono text-sm leading-6 text-white">{proofHash}</p>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button className="w-full" onClick={onCopy}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy proof hash"}
        </Button>

        <Button variant="outline" className="w-full">
          <ShieldCheck className="h-4 w-4" />
          Prepare for verification
        </Button>
      </div>

      <p className="mt-3 font-mono text-xs text-ur-success/70">{shortProof}</p>
    </section>
  );
}
\n```\n\n## `components/zk-proof-generation/public-inputs-card.tsx`\n\n```tsx\nimport { publicInputs } from "@/lib/zk-proof-data";

export function PublicInputsCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Public inputs
      </p>

      <p className="mt-2 text-sm leading-6 text-white/56">
        These values may be visible to the verifier because they do not expose unrelated wallet history.
      </p>

      <div className="mt-4 space-y-3">
        {publicInputs.map((item) => {
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
\n```\n\n## `components/zk-proof-generation/private-inputs-card.tsx`\n\n```tsx\nimport { privateInputs } from "@/lib/zk-proof-data";

export function PrivateInputsCard() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Private witness inputs
      </p>

      <p className="mt-2 text-sm leading-6 text-white/58">
        These values are used for proof generation but should not be exposed in the UI, logs, or verification record.
      </p>

      <div className="mt-4 space-y-3">
        {privateInputs.map((item) => {
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
\n```\n\n## `components/zk-proof-generation/privacy-explainer-card.tsx`\n\n```tsx\nimport { privacyNotes } from "@/lib/zk-proof-data";

export function PrivacyExplainerCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Privacy explanation
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          What the proof reveals and what it hides.
        </h2>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {privacyNotes.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-ur-lg border border-white/10 bg-black/16 p-5">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-black text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/58">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/zk-proof-generation/proof-summary-card.tsx`\n\n```tsx\nimport { CheckCircle2, Clock3, Loader2, ShieldCheck } from "lucide-react";
import type { ProofStatus, ZkProofRequest } from "@/lib/zk-proof-data";
import { proofFacts } from "@/lib/zk-proof-data";
import { Badge } from "@/components/ui/badge";

type ProofSummaryCardProps = {
  request: ZkProofRequest;
  status: ProofStatus;
};

export function ProofSummaryCard({ request, status }: ProofSummaryCardProps) {
  const generated = status === "generated";
  const generating = status === "generating";

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Proof summary
          </p>
          <h2 className="mt-2 text-lg font-black text-white">{request.propertyTitle}</h2>
          <p className="mt-1 text-sm text-white/52">{request.propertyLocation}</p>
        </div>

        <Badge variant={generated ? "success" : "warning"}>
          {generated ? <CheckCircle2 className="h-3.5 w-3.5" /> : generating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Clock3 className="h-3.5 w-3.5" />}
          {generated ? "Generated" : generating ? "Generating" : "Ready"}
        </Badge>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <SummaryTile label="Request" value={request.requestId} mono />
        <SummaryTile label="Payment" value={`KES ${request.paymentAmountKes.toLocaleString()}`} />
        <SummaryTile label="Circuit" value={request.circuitName} mono />
        <SummaryTile label="Network" value={request.network} />
      </div>

      <div className="mt-5 space-y-3">
        {proofFacts.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-bold text-white/70">{item.label}</p>
              </div>
              <p className="text-sm font-black text-white">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ur-primary" />
          <p className="text-sm leading-6 text-white/60">
            The generated proof does not unlock access by itself. It must be verified in the next screen.
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
      <p className={mono ? "mt-1 truncate font-mono text-xs font-bold text-ur-mint" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
\n```\n\n## `components/zk-proof-generation/proof-success-actions.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { ZkProofRequest } from "@/lib/zk-proof-data";
import { Button } from "@/components/ui/button";

type ProofSuccessActionsProps = {
  request: ZkProofRequest;
};

export function ProofSuccessActions({ request }: ProofSuccessActionsProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Proof ready
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Continue to proof verification.
          </h2>
          <p className="mt-2 max-w-[680px] text-sm leading-6 text-white/58">
            The proof is generated and ready to be checked by the verifier. Access remains locked until verification succeeds.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link href={`/proof-verification/${request.requestId}`} className="w-full sm:w-auto">
          <Button size="lg" className="w-full">
            Verify proof
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
The route /zk-proof-generation/REQ-UR-9084 works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for request ID, transaction hash, proof hash, commitment, circuit name, and verifier.
UrbanRentisha dark green theme is applied.
Confirmed payment summary is visible.
Generate private proof button is visible.
Generating state appears after click.
Proof status changes after generation.
Proof hash appears after generation.
Copy proof hash button works.
Public inputs card is visible.
Private witness inputs card is visible.
Privacy explanation is clear.
Next CTA routes to proof verification.
Access locked message is clear.
Mobile layout is stacked and readable.
All controls have visible focus states.
```

---

# 14. Final UX Summary

```text
The ZK Proof Generation Screen converts a confirmed Stellar payment into a private payment proof.
The tenant sees what is public, what stays private, and why the proof is needed.
The proof does not unlock access by itself; it must be verified in the next screen.
```
