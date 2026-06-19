# UrbanRentisha TrustLayer Proof Verification Screen UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
10. Proof Verification Screen only
```

## 2. Page Purpose

The **Proof Verification Screen** submits the generated proof for Stellar/Soroban verification and shows proof verification status.

This page helps tenants:

```text
Confirm the generated proof is ready
Submit proof payload to the verifier
Track Stellar/Soroban verification status
View the verification result
Copy the verification hash
Confirm access unlock eligibility
Continue to viewing access unlock
```

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Dark SaaS layout
Technical trust tone
Clear verification states
Readable contract references
Accessible controls
Minimal status motion
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
Verified property access
Stellar/Soroban proof verification
Payment-proof workflow
Tenant safety
Professional B2B SaaS clarity
```

---

## 4. UX Goal

The tenant should understand this immediately:

```text
The proof has already been generated.
This screen verifies the proof.
Successful verification makes the request eligible for access unlock.
Viewing access is not unlocked until the next access/code step.
```

---

## 5. Final Folder Structure

```text
urbanrentisha-proof-verification/
├── app/
│   ├── proof-verification/
│   │   └── [requestId]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── proof-verification/
│   │   ├── audit-trail-card.tsx
│   │   ├── contract-reference-card.tsx
│   │   ├── logo-mark.tsx
│   │   ├── proof-payload-card.tsx
│   │   ├── proof-ready-card.tsx
│   │   ├── proof-verification-page.tsx
│   │   ├── submit-verification-card.tsx
│   │   ├── verification-header.tsx
│   │   ├── verification-progress.tsx
│   │   ├── verification-result-card.tsx
│   │   ├── verification-safety-card.tsx
│   │   ├── verification-status-panel.tsx
│   │   └── verification-success-actions.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── proof-verification-data.ts
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
Back-to-ZK-proof link
Screen title and trust badges
Verification progress stepper
Left main column:
  - proof ready summary
  - submit verification action card
  - verification status panel
  - verification result after success
  - next CTA to viewing access unlock
Right sticky sidebar:
  - contract reference
  - proof payload
  - audit trail
  - verification safety notes
```

Mobile:

```text
Header
Back link
Title
Progress stepper
Proof ready card
Submit card
Verification status
Contract/payload cards
Result after verification
Access unlock CTA
```

---

## 7. Interaction Rules

```text
Submit proof button starts submitting state.
Submitting state transitions to verifying state.
Verifying state transitions to verified state.
Verified state reveals verification result card.
Verification result card shows verification hash.
Copy verification hash button copies the hash and shows copied state.
Access unlock CTA appears only after verification succeeds.
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
JetBrains Mono = proof hash, transaction hash, verification hash, contract ID, request ID, contract function
```

Use JetBrains Mono for:

```text
REQ-UR-9084
UR-LST-1001
zkp_0x9f12...
soro_0x7ab...
CDLZ...TRUST
verify_payment_proof
```

---

## 10. Accessibility Requirements

```text
Submit proof button must be keyboard focusable.
Copy verification hash button must show copied state.
Verification status must use icon and text, not color only.
Long hashes must wrap and not overflow.
Contract and proof payload cards must not rely on color alone.
All interactive elements must have visible focus rings.
Minimum mobile touch target should be 44px.
```

---

## 11. Implementation Notes

This starter is UI-only.

Connect it later to:

```text
Soroban contract client
Proof verification API
Verifier contract function
Transaction/result polling
Verification hash storage
Viewing code/access unlock screen
Audit log service
```

Recommended contract function:

```text
verify_payment_proof(request_id, proof_hash, public_inputs)
```

Recommended API endpoints:

```text
POST /api/v1/proofs/verify
GET /api/v1/proofs/:requestId/verification-status
POST /api/v1/viewing-codes/generate
```

Recommended next route after successful verification:

```text
/viewing-code/REQ-UR-9084
```

---

# 12. Full Starter Code

\n## `package.json`\n\n```json\n{
  "name": "urbanrentisha-proof-verification-screen",
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
  title: "Proof Verification | UrbanRentisha TrustLayer",
  description:
    "Submit a generated payment proof for Stellar/Soroban verification and track verification status."
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

  .verification-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }
}
\n```\n\n## `app/page.tsx`\n\n```tsx\nimport { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/proof-verification/REQ-UR-9084");
}
\n```\n\n## `app/proof-verification/[requestId]/page.tsx`\n\n```tsx\nimport { ProofVerificationPage } from "@/components/proof-verification/proof-verification-page";

type PageProps = {
  params: {
    requestId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <ProofVerificationPage requestId={params.requestId} />;
}
\n```\n\n## `lib/utils.ts`\n\n```ts\nimport { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\n```\n\n## `lib/proof-verification-data.ts`\n\n```ts\nimport {
  CheckCircle2,
  CircuitBoard,
  Clock3,
  Database,
  FileCheck2,
  Fingerprint,
  Hash,
  Home,
  KeyRound,
  LockKeyhole,
  Network,
  ReceiptText,
  Send,
  ShieldCheck,
  Sparkles,
  UnlockKeyhole,
  Wallet,
  Zap
} from "lucide-react";

export type VerificationStatus =
  | "ready"
  | "submitting"
  | "verifying"
  | "verified"
  | "failed";

export type ProofVerificationRequest = {
  requestId: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  paymentAmountKes: number;
  paymentAmountXlm: string;
  transactionHash: string;
  proofHash: string;
  verificationHash: string;
  contractId: string;
  verifierName: string;
  network: "Stellar Testnet";
  contractFunction: "verify_payment_proof";
  accessStatus: "Locked" | "Unlocked";
};

export const proofVerificationRequest: ProofVerificationRequest = {
  requestId: "REQ-UR-9084",
  propertyId: "UR-LST-1001",
  propertyTitle: "Kilimani Green View Apartment",
  propertyLocation: "Kilimani, Nairobi",
  paymentAmountKes: 500,
  paymentAmountXlm: "8.4200000 XLM",
  transactionHash:
    "4f7a8b2c9d1e6f0a3b5c7d8e9f102a4b6c8d0e1f2a3b4c5d6e7f8091a2b3c4d5",
  proofHash:
    "zkp_0x9f12e5ab4c8d7a63f20b1c44e9aa73f1dc8829b6e4107ac5d9ef2a13b0c44190",
  verificationHash:
    "soro_0x7ab11f9e44dc92a18f03b7e54c2a901f6bb7d3e8124a90cc1f0e55a7d4e2c109",
  contractId: "CDLZ...TRUST",
  verifierName: "UrbanRentishaTrustVerifier",
  network: "Stellar Testnet",
  contractFunction: "verify_payment_proof",
  accessStatus: "Locked"
};

export const verificationSteps = [
  {
    label: "Payment",
    description: "Payment confirmed",
    icon: Wallet
  },
  {
    label: "Proof",
    description: "Proof generated",
    icon: CircuitBoard
  },
  {
    label: "Submit",
    description: "Submit to verifier",
    icon: Send
  },
  {
    label: "Verify",
    description: "Soroban verification",
    icon: ShieldCheck
  },
  {
    label: "Unlock",
    description: "Access eligible",
    icon: UnlockKeyhole
  }
];

export const proofPayloadItems = [
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
    label: "Proof hash",
    value: "zkp_0x9f12...c44190",
    icon: Hash
  },
  {
    label: "Transaction",
    value: "4f7a8b2c...b3c4d5",
    icon: ReceiptText
  }
];

export const contractFacts = [
  {
    label: "Network",
    value: "Stellar Testnet",
    icon: Sparkles
  },
  {
    label: "Contract",
    value: "CDLZ...TRUST",
    icon: Network
  },
  {
    label: "Function",
    value: "verify_payment_proof",
    icon: Zap
  },
  {
    label: "Verifier",
    value: "UrbanRentishaTrustVerifier",
    icon: ShieldCheck
  }
];

export const verificationOutputs = [
  {
    label: "Proof validity",
    value: "Valid",
    icon: CheckCircle2
  },
  {
    label: "Payment condition",
    value: "Satisfied",
    icon: Fingerprint
  },
  {
    label: "Access decision",
    value: "Unlock eligible",
    icon: UnlockKeyhole
  },
  {
    label: "Audit event",
    value: "Recorded",
    icon: Database
  }
];

export const auditEvents = [
  {
    title: "Proof submitted",
    description: "Generated proof was submitted to the verifier.",
    icon: Send
  },
  {
    title: "Contract checked",
    description: "Verifier contract checked public inputs and proof hash.",
    icon: ShieldCheck
  },
  {
    title: "Access eligibility updated",
    description: "Request is eligible for viewing code generation.",
    icon: UnlockKeyhole
  }
];

export const safetyNotes = [
  {
    title: "No private witness exposed",
    description: "The verifier sees proof outputs, not the tenant payment secret.",
    icon: LockKeyhole
  },
  {
    title: "Verification is auditable",
    description: "The result can be referenced by request ID and verification hash.",
    icon: Database
  },
  {
    title: "Access still follows policy",
    description: "Verification enables unlock eligibility; final viewing code is handled next.",
    icon: KeyRound
  }
];

export const statusTiming = [
  {
    label: "Submit proof",
    value: "1–2 sec",
    icon: Send
  },
  {
    label: "Verify proof",
    value: "3–8 sec",
    icon: Clock3
  },
  {
    label: "Record result",
    value: "Instant",
    icon: Database
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
\n```\n\n## `components/proof-verification/logo-mark.tsx`\n\n```tsx\nimport Link from "next/link";
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
\n```\n\n## `components/proof-verification/proof-verification-page.tsx`\n\n```tsx\n"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import {
  proofVerificationRequest,
  type VerificationStatus
} from "@/lib/proof-verification-data";
import { VerificationHeader } from "@/components/proof-verification/verification-header";
import { VerificationProgress } from "@/components/proof-verification/verification-progress";
import { ProofReadyCard } from "@/components/proof-verification/proof-ready-card";
import { SubmitVerificationCard } from "@/components/proof-verification/submit-verification-card";
import { VerificationStatusPanel } from "@/components/proof-verification/verification-status-panel";
import { VerificationResultCard } from "@/components/proof-verification/verification-result-card";
import { VerificationSuccessActions } from "@/components/proof-verification/verification-success-actions";
import { ContractReferenceCard } from "@/components/proof-verification/contract-reference-card";
import { ProofPayloadCard } from "@/components/proof-verification/proof-payload-card";
import { AuditTrailCard } from "@/components/proof-verification/audit-trail-card";
import { VerificationSafetyCard } from "@/components/proof-verification/verification-safety-card";
import { Badge } from "@/components/ui/badge";

type ProofVerificationPageProps = {
  requestId: string;
};

export function ProofVerificationPage({ requestId }: ProofVerificationPageProps) {
  const [status, setStatus] = useState<VerificationStatus>("ready");
  const [copied, setCopied] = useState(false);
  const request = { ...proofVerificationRequest, requestId };

  function submitProof() {
    setStatus("submitting");
    window.setTimeout(() => setStatus("verifying"), 900);
    window.setTimeout(() => setStatus("verified"), 2100);
  }

  async function copyVerificationHash() {
    await navigator.clipboard.writeText(request.verificationHash);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 verification-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <VerificationHeader />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href={`/zk-proof-generation/${request.requestId}`}
              className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to ZK proof generation
            </Link>

            <div className="flex flex-wrap gap-2">
              <Badge variant="success">
                <ShieldCheck className="h-3.5 w-3.5" />
                Proof generated
              </Badge>
              <Badge variant="outline">
                <Sparkles className="h-3.5 w-3.5" />
                Soroban verification
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Proof verification
            </p>
            <h1 className="mt-3 max-w-[900px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
              Verify the proof on Stellar/Soroban.
            </h1>
            <p className="mt-4 max-w-[780px] text-base leading-7 text-white/66">
              Submit the generated payment proof to the verifier contract, track verification status, and unlock eligibility for viewing access.
            </p>
          </div>

          <VerificationProgress status={status} />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-6">
              <ProofReadyCard request={request} />
              <SubmitVerificationCard
                request={request}
                status={status}
                onSubmit={submitProof}
              />
              <VerificationStatusPanel status={status} request={request} />

              {status === "verified" ? (
                <>
                  <VerificationResultCard
                    request={request}
                    copied={copied}
                    onCopy={copyVerificationHash}
                  />
                  <VerificationSuccessActions request={request} />
                </>
              ) : null}
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <ContractReferenceCard request={request} />
              <ProofPayloadCard />
              <AuditTrailCard status={status} />
              <VerificationSafetyCard />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
\n```\n\n## `components/proof-verification/verification-header.tsx`\n\n```tsx\nimport Link from "next/link";
import { Bell, LayoutDashboard, Menu, UserRound } from "lucide-react";
import { LogoMark } from "@/components/proof-verification/logo-mark";

export function VerificationHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="ur-container flex h-20 items-center justify-between">
        <LogoMark />

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {[
            { label: "Payment", href: "/stellar-payment/REQ-UR-9084" },
            { label: "ZK proof", href: "/zk-proof-generation/REQ-UR-9084" },
            { label: "Verify proof", href: "/proof-verification/REQ-UR-9084", active: true },
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
\n```\n\n## `components/proof-verification/verification-progress.tsx`\n\n```tsx\nimport { CheckCircle2 } from "lucide-react";
import { verificationSteps, type VerificationStatus } from "@/lib/proof-verification-data";
import { cn } from "@/lib/utils";

type VerificationProgressProps = {
  status: VerificationStatus;
};

function getActiveIndex(status: VerificationStatus) {
  if (status === "ready") return 2;
  if (status === "submitting") return 2;
  if (status === "verifying") return 3;
  if (status === "verified") return 5;
  return 2;
}

export function VerificationProgress({ status }: VerificationProgressProps) {
  const activeIndex = getActiveIndex(status);

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-3 md:grid-cols-5">
        {verificationSteps.map((step, index) => {
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
\n```\n\n## `components/proof-verification/proof-ready-card.tsx`\n\n```tsx\nimport { CircuitBoard, Hash, ShieldCheck } from "lucide-react";
import type { ProofVerificationRequest } from "@/lib/proof-verification-data";
import { Badge } from "@/components/ui/badge";

type ProofReadyCardProps = {
  request: ProofVerificationRequest;
};

export function ProofReadyCard({ request }: ProofReadyCardProps) {
  return (
    <section className="overflow-hidden rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Generated proof ready
          </Badge>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-white">
            Proof is ready for Soroban verification.
          </h2>

          <p className="mt-3 max-w-[680px] text-sm leading-6 text-ur-success/78">
            The generated payment proof can now be submitted to the verifier contract to confirm access eligibility for this viewing request.
          </p>
        </div>

        <div className="min-w-[260px] rounded-ur-lg border border-ur-success/20 bg-black/18 p-5 text-right">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/64">
            Verification target
          </p>
          <p className="mt-2 font-mono text-lg font-black text-white">
            {request.contractId}
          </p>
          <p className="mt-2 text-sm text-ur-success/76">{request.network}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Info icon={<Hash className="h-5 w-5" />} label="Proof hash" value={`${request.proofHash.slice(0, 14)}...${request.proofHash.slice(-8)}`} mono />
        <Info icon={<CircuitBoard className="h-5 w-5" />} label="Verifier" value={request.verifierName} mono />
        <Info icon={<ShieldCheck className="h-5 w-5" />} label="Function" value={request.contractFunction} mono />
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
      <p className={mono ? "mt-1 truncate font-mono text-sm font-bold text-white" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
\n```\n\n## `components/proof-verification/submit-verification-card.tsx`\n\n```tsx\n"use client";

import { CheckCircle2, Loader2, Send, ShieldCheck, UploadCloud } from "lucide-react";
import type {
  ProofVerificationRequest,
  VerificationStatus
} from "@/lib/proof-verification-data";
import { Button } from "@/components/ui/button";

type SubmitVerificationCardProps = {
  request: ProofVerificationRequest;
  status: VerificationStatus;
  onSubmit: () => void;
};

export function SubmitVerificationCard({
  request,
  status,
  onSubmit
}: SubmitVerificationCardProps) {
  const busy = status === "submitting" || status === "verifying";
  const verified = status === "verified";

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Submit proof
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Send generated proof to the verifier contract.
        </h2>
        <p className="mt-3 max-w-[760px] text-sm leading-6 text-white/58">
          The proof payload is submitted to the Stellar/Soroban verification layer. A successful result makes the request eligible for viewing access unlock.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <SubmitTile icon={<UploadCloud className="h-5 w-5" />} label="Payload" value="Proof hash + public inputs" />
        <SubmitTile icon={<ShieldCheck className="h-5 w-5" />} label="Contract" value={request.contractId} mono />
        <SubmitTile icon={<Send className="h-5 w-5" />} label="Function" value={request.contractFunction} mono />
      </div>

      <Button
        size="lg"
        className="mt-5 w-full"
        onClick={onSubmit}
        disabled={busy || verified}
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : verified ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
        {verified ? "Proof verified" : busy ? "Submitting for verification..." : "Submit proof for verification"}
      </Button>
    </section>
  );
}

function SubmitTile({
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
      <p className={mono ? "mt-1 truncate font-mono text-sm font-bold text-white" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
\n```\n\n## `components/proof-verification/verification-status-panel.tsx`\n\n```tsx\nimport { AlertTriangle, CheckCircle2, Clock3, Loader2, RadioTower } from "lucide-react";
import type {
  ProofVerificationRequest,
  VerificationStatus
} from "@/lib/proof-verification-data";
import { cn } from "@/lib/utils";

type VerificationStatusPanelProps = {
  status: VerificationStatus;
  request: ProofVerificationRequest;
};

const statusCopy: Record<VerificationStatus, { title: string; description: string; tone: "neutral" | "success" | "warning" | "danger" }> = {
  ready: {
    title: "Ready to submit",
    description: "The generated proof is available and ready for contract verification.",
    tone: "neutral"
  },
  submitting: {
    title: "Submitting proof",
    description: "The proof payload is being sent to the Stellar/Soroban verification flow.",
    tone: "warning"
  },
  verifying: {
    title: "Verifying on Soroban",
    description: "The verifier is checking proof validity and payment-condition public inputs.",
    tone: "warning"
  },
  verified: {
    title: "Proof verified",
    description: "The proof is valid. The request is now eligible for access unlock.",
    tone: "success"
  },
  failed: {
    title: "Verification failed",
    description: "The verifier rejected the proof or the payment condition did not match.",
    tone: "danger"
  }
};

export function VerificationStatusPanel({
  status,
  request
}: VerificationStatusPanelProps) {
  const copy = statusCopy[status];
  const Icon =
    status === "verified"
      ? CheckCircle2
      : status === "failed"
        ? AlertTriangle
        : status === "submitting" || status === "verifying"
          ? Loader2
          : status === "ready"
            ? Clock3
            : RadioTower;

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
            <Icon className={cn("h-6 w-6", (status === "submitting" || status === "verifying") && "animate-spin")} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Verification status
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
\n```\n\n## `components/proof-verification/verification-result-card.tsx`\n\n```tsx\n"use client";

import { Check, CheckCircle2, Copy, Hash, UnlockKeyhole } from "lucide-react";
import type { ProofVerificationRequest } from "@/lib/proof-verification-data";
import { verificationOutputs } from "@/lib/proof-verification-data";
import { Button } from "@/components/ui/button";

type VerificationResultCardProps = {
  request: ProofVerificationRequest;
  copied: boolean;
  onCopy: () => void;
};

export function VerificationResultCard({
  request,
  copied,
  onCopy
}: VerificationResultCardProps) {
  return (
    <section className="rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-5 flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-success">
            Verification result
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Proof verified successfully.
          </h2>
          <p className="mt-2 text-sm leading-6 text-ur-success/78">
            The verifier accepted the proof. The request is now eligible for viewing access unlock.
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {verificationOutputs.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-ur-sm border border-ur-success/20 bg-black/16 p-3">
              <div className="mb-2 text-ur-success"><Icon className="h-4 w-4" /></div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ur-success/64">{item.label}</p>
              <p className="mt-1 text-sm font-black text-white">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-success/20 bg-black/18 p-4">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ur-success/64">
          <Hash className="h-4 w-4" />
          Verification hash
        </p>
        <p className="mt-2 break-all font-mono text-sm leading-6 text-white">{request.verificationHash}</p>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button className="w-full" onClick={onCopy}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy verification hash"}
        </Button>

        <Button variant="outline" className="w-full">
          <UnlockKeyhole className="h-4 w-4" />
          Prepare access unlock
        </Button>
      </div>
    </section>
  );
}
\n```\n\n## `components/proof-verification/verification-success-actions.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, KeyRound, ShieldCheck } from "lucide-react";
import type { ProofVerificationRequest } from "@/lib/proof-verification-data";
import { Button } from "@/components/ui/button";

type VerificationSuccessActionsProps = {
  request: ProofVerificationRequest;
};

export function VerificationSuccessActions({
  request
}: VerificationSuccessActionsProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
          <KeyRound className="h-6 w-6" />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Access eligibility ready
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Continue to viewing access unlock.
          </h2>
          <p className="mt-2 max-w-[680px] text-sm leading-6 text-white/58">
            Verification succeeded. The next screen can issue or reveal the viewing code according to platform policy.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link href={`/viewing-code/${request.requestId}`} className="w-full sm:w-auto">
          <Button size="lg" className="w-full">
            Unlock viewing access
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>

        <Link href="/proof-status" className="w-full sm:w-auto">
          <Button size="lg" variant="outline" className="w-full">
            <ShieldCheck className="h-4 w-4" />
            View proof status
          </Button>
        </Link>
      </div>
    </section>
  );
}
\n```\n\n## `components/proof-verification/contract-reference-card.tsx`\n\n```tsx\nimport type { ProofVerificationRequest } from "@/lib/proof-verification-data";
import { contractFacts } from "@/lib/proof-verification-data";

type ContractReferenceCardProps = {
  request: ProofVerificationRequest;
};

export function ContractReferenceCard({ request }: ContractReferenceCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Contract reference
      </p>

      <h2 className="mt-2 text-lg font-black text-white">{request.verifierName}</h2>
      <p className="mt-1 text-sm text-white/52">{request.network}</p>

      <div className="mt-5 space-y-3">
        {contractFacts.map((item) => {
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
\n```\n\n## `components/proof-verification/proof-payload-card.tsx`\n\n```tsx\nimport { proofPayloadItems } from "@/lib/proof-verification-data";

export function ProofPayloadCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Proof payload
      </p>

      <p className="mt-2 text-sm leading-6 text-white/56">
        The verifier receives the generated proof hash and required public inputs.
      </p>

      <div className="mt-4 space-y-3">
        {proofPayloadItems.map((item) => {
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
\n```\n\n## `components/proof-verification/audit-trail-card.tsx`\n\n```tsx\nimport { CheckCircle2, Clock3 } from "lucide-react";
import { auditEvents, type VerificationStatus } from "@/lib/proof-verification-data";
import { cn } from "@/lib/utils";

type AuditTrailCardProps = {
  status: VerificationStatus;
};

export function AuditTrailCard({ status }: AuditTrailCardProps) {
  const done = status === "verified";

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Audit trail
      </p>

      <div className="mt-4 space-y-3">
        {auditEvents.map((event) => {
          const Icon = event.icon;

          return (
            <div key={event.title} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className={cn(
                "grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm",
                done ? "bg-ur-success-bg text-ur-success" : "bg-white/5 text-white/40"
              )}>
                {done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </div>
              <div>
                <p className="text-sm font-black text-white">{event.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-ur-sm border border-white/10 bg-black/16 p-3">
        <div className="flex items-center gap-2 text-sm font-bold text-white/62">
          <Clock3 className="h-4 w-4 text-ur-primary" />
          {done ? "All events recorded" : "Events will record after successful verification"}
        </div>
      </div>
    </section>
  );
}
\n```\n\n## `components/proof-verification/verification-safety-card.tsx`\n\n```tsx\nimport { safetyNotes, statusTiming } from "@/lib/proof-verification-data";

export function VerificationSafetyCard() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Verification safety
      </p>

      <div className="mt-4 space-y-3">
        {safetyNotes.map((item) => {
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

      <div className="mt-5 grid grid-cols-3 gap-2">
        {statusTiming.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <Icon className="mb-2 h-4 w-4 text-ur-primary" />
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/38">{item.label}</p>
              <p className="mt-1 text-xs font-black text-white">{item.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
\n```\n
---

# 13. Acceptance Checklist

```text
The route /proof-verification/REQ-UR-9084 works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for request ID, proof hash, contract ID, contract function, and verification hash.
UrbanRentisha dark green theme is applied.
Generated proof summary is visible.
Submit proof button is visible.
Submitting state appears after click.
Verifying state appears after submitting.
Verified state appears after verification.
Verification result card appears after success.
Copy verification hash button works.
Contract reference card is visible.
Proof payload card is visible.
Audit trail card updates after success.
Access unlock CTA appears only after verification succeeds.
Access eligibility message is clear.
Mobile layout is stacked and readable.
All controls have visible focus states.
```

---

# 14. Final UX Summary

```text
The Proof Verification Screen confirms whether the generated private payment proof is valid.
It connects the ZK proof step to Stellar/Soroban verification.
Successful verification does not merely show success; it makes the viewing request eligible for access unlock.
```
