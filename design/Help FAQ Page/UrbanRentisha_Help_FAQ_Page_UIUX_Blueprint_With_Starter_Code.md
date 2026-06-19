# UrbanRentisha TrustLayer Help / FAQ Page UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
22. Help / FAQ Page only
```

## 2. Page Purpose

The **Help / FAQ Page** explains:

```text
Stellar testnet
ZK proof
Payment-hold status
Viewing codes
Reports
Safety rules
Known limitations
```

This page helps tenants, agents, property managers, admins, and external demo reviewers understand how UrbanRentisha TrustLayer works before trusting the viewing flow.

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Dark SaaS layout
Clear help cards
Search-first support page
FAQ accordion
Safety warning panel
Known limitations panel
Minimal motion
Technical but simple tone
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
Rental scam prevention
ZK payment proof
Stellar/Soroban verification
Safe verified viewing
Professional SaaS clarity
```

---

## 4. UX Goal

The user should understand this immediately:

```text
UrbanRentisha uses a trust flow to reduce rental scams.
Payment status, private proof, and verification determine whether viewing access can unlock.
Users should know how Stellar testnet, ZK proof, viewing codes, reports, safety rules, and MVP limitations work.
```

---

## 5. Required Screen Content

Required sections:

```text
Help / FAQ hero
Search help input
Help topic cards
Stellar testnet explainer
ZK proof explainer
Payment-hold status guide
Viewing code guide
Report suspicious listing guide
Safety rules panel
Known limitations panel
FAQ accordion
Support contact panel
Sidebar navigation
Topbar search
```

Help categories:

```text
Stellar testnet
ZK proof
Payment-hold status
Viewing codes
Reports
Safety
Limitations
```

---

## 6. Final Folder Structure

```text
urbanrentisha-help-faq-page/
├── app/
│   ├── help/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── help-faq/
│   │   ├── explainer-section.tsx
│   │   ├── faq-accordion-item.tsx
│   │   ├── faq-accordion-section.tsx
│   │   ├── help-faq-page.tsx
│   │   ├── help-hero.tsx
│   │   ├── help-sidebar.tsx
│   │   ├── help-stats-grid.tsx
│   │   ├── help-topic-grid.tsx
│   │   ├── help-topbar.tsx
│   │   ├── known-limitations-panel.tsx
│   │   ├── logo-mark.tsx
│   │   ├── payment-hold-guide.tsx
│   │   ├── safety-rules-panel.tsx
│   │   ├── status-badge.tsx
│   │   ├── support-panel.tsx
│   │   └── viewing-codes-reports-section.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── help-faq-data.ts
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
Left sidebar
Sticky topbar with search and report button
Page title and safety badges
Help hero
Stats grid
Main two-column layout:
  Left:
    - topic cards
    - explainers
    - payment-hold guide
    - viewing code and report guide
    - FAQ accordion
  Right sticky:
    - safety rules
    - known limitations
    - support panel
```

Mobile and tablet:

```text
Topbar with menu button
No fixed sidebar
Page title
Hero search
Stats stacked
Topic cards stacked
Explainers stacked
Payment guide stacked
FAQ accordion
Safety rules
Known limitations
Support panel
```

---

## 8. Interaction Rules

```text
Search supports Stellar, testnet, ZK proof, payment hold, viewing code, reports, safety, limitations, and support.
Topic cards scroll to page sections.
FAQ accordion opens one or more questions.
Report button routes to suspicious listing report screen.
Support card routes to support page.
Known limitations must remain visible.
Safety rules must use text, icon, and severity label.
```

---

## 9. Color Tokens

```text
Background: #060B0A
Soft background: #0B1512
Sidebar: #07100D
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
JetBrains Mono = technical references, statuses, hashes, network labels, API-like values
```

Use JetBrains Mono for:

```text
Stellar testnet
ZK payment proof
payment_hold
proof_verified
access_unlocked
REQ-UR-9084
soro_0x7ab42d3c...2c109
```

---

## 11. Accessibility Requirements

```text
All FAQ controls must be keyboard accessible.
Status must not rely on color only.
Safety rules must include severity labels.
Known limitations must use visible labels.
Search input must have accessible label.
Cards must remain readable without hover.
Buttons must have visible focus states.
Mobile touch targets should be at least 44px.
```

---

## 12. Implementation Notes

This starter is UI-only.

Connect later to:

```text
Help search API
FAQ CMS
Support ticket API
Report suspicious listing route
Knowledge-base articles
Known limitations CMS
Product status page
```

Recommended route:

```text
/help
```

---

# 13. Full Starter Code

\n## `package.json`\n\n```json\n{
  "name": "urbanrentisha-help-faq-page",
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
          sidebar: "#07100D",
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
        "card-hover": "0 18px 55px rgba(22, 163, 74, 0.13)",
        "warning-glow": "0 0 55px rgba(245, 158, 11, 0.14)",
        "danger-glow": "0 0 55px rgba(239, 68, 68, 0.14)"
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
  title: "Help / FAQ | UrbanRentisha TrustLayer",
  description:
    "Help and FAQ for Stellar testnet, ZK payment proof, payment-hold status, viewing codes, reports, safety rules, and known limitations."
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
    @apply mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-8;
  }

  .ur-focus {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ur-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ur-bg;
  }

  .help-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }

  .help-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(22, 163, 74, 0.45) rgba(255, 255, 255, 0.04);
  }
}
\n```\n\n## `app/page.tsx`\n\n```tsx\nimport { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/help");
}
\n```\n\n## `app/help/page.tsx`\n\n```tsx\nimport { HelpFaqPage } from "@/components/help-faq/help-faq-page";

export default function Page() {
  return <HelpFaqPage />;
}
\n```\n\n## `lib/utils.ts`\n\n```ts\nimport { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\n```\n\n## `lib/help-faq-data.ts`\n\n```ts\nimport {
  AlertTriangle,
  BadgeCheck,
  Bell,
  BookOpenText,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Code2,
  Database,
  ExternalLink,
  FileWarning,
  Flag,
  Gauge,
  HelpCircle,
  Home,
  Info,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  ListChecks,
  LockKeyhole,
  Mail,
  MessageCircle,
  Network,
  Phone,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UserCheck,
  UserRound,
  UsersRound,
  WalletCards,
  XCircle
} from "lucide-react";

export type HelpTopicTone = "success" | "warning" | "danger" | "neutral";
export type FaqCategory =
  | "Stellar testnet"
  | "ZK proof"
  | "Payment-hold status"
  | "Viewing codes"
  | "Reports"
  | "Safety"
  | "Limitations";

export type HelpTopic = {
  id: string;
  title: string;
  description: string;
  category: FaqCategory;
  icon: typeof HelpCircle;
  tone: HelpTopicTone;
  href: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  defaultOpen?: boolean;
};

export type ExplainerCard = {
  title: string;
  description: string;
  icon: typeof HelpCircle;
  tone: HelpTopicTone;
  bullets: string[];
};

export type SafetyRule = {
  title: string;
  description: string;
  icon: typeof HelpCircle;
  severity: "required" | "recommended" | "warning";
};

export type LimitationItem = {
  title: string;
  description: string;
  status: "known" | "mvp" | "planned";
};

export const helpStats = [
  {
    label: "Help topics",
    value: "7",
    helper: "Core product education areas",
    tone: "success",
    icon: BookOpenText
  },
  {
    label: "Safety rules",
    value: "8",
    helper: "Tenant and agent protection",
    tone: "success",
    icon: ShieldCheck
  },
  {
    label: "Known limits",
    value: "5",
    helper: "MVP honesty and scope",
    tone: "warning",
    icon: AlertTriangle
  },
  {
    label: "Support routes",
    value: "3",
    helper: "FAQ, report, human support",
    tone: "neutral",
    icon: LifeBuoy
  }
];

export const helpTopics: HelpTopic[] = [
  {
    id: "stellar-testnet",
    title: "Stellar testnet",
    description:
      "Understand why testnet is used for demo payments and what a testnet transaction means.",
    category: "Stellar testnet",
    icon: Network,
    tone: "success",
    href: "#stellar-testnet"
  },
  {
    id: "zk-proof",
    title: "ZK payment proof",
    description:
      "Learn how a tenant proves payment without exposing unrelated wallet activity.",
    category: "ZK proof",
    icon: LockKeyhole,
    tone: "success",
    href: "#zk-proof"
  },
  {
    id: "payment-hold",
    title: "Payment-hold status",
    description:
      "See what awaiting payment, received, proof ready, verified, and released mean.",
    category: "Payment-hold status",
    icon: WalletCards,
    tone: "warning",
    href: "#payment-hold"
  },
  {
    id: "viewing-codes",
    title: "Viewing codes",
    description:
      "Understand when a viewing code unlocks and why it can expire or be revoked.",
    category: "Viewing codes",
    icon: KeyRound,
    tone: "success",
    href: "#viewing-codes"
  },
  {
    id: "reports",
    title: "Reports",
    description:
      "Report fake listings, suspicious agents, off-platform payment demands, or unsafe access requests.",
    category: "Reports",
    icon: Flag,
    tone: "danger",
    href: "#reports"
  },
  {
    id: "safety-rules",
    title: "Safety rules",
    description:
      "Follow the rules that keep renters, property owners, and agents protected.",
    category: "Safety",
    icon: ShieldAlert,
    tone: "warning",
    href: "#safety-rules"
  },
  {
    id: "known-limitations",
    title: "Known limitations",
    description:
      "Clear MVP boundaries for testnet payments, verification latency, and manual review.",
    category: "Limitations",
    icon: FileWarning,
    tone: "neutral",
    href: "#known-limitations"
  }
];

export const explainerCards: ExplainerCard[] = [
  {
    title: "Stellar testnet",
    description:
      "A safe blockchain testing environment used to demonstrate payment flow without moving real money.",
    icon: Network,
    tone: "success",
    bullets: [
      "Used for demo and hackathon validation.",
      "Shows payment intent, transaction hash, and confirmation status.",
      "Not the same as production real-money settlement."
    ]
  },
  {
    title: "Zero-knowledge proof",
    description:
      "A private proof that confirms the payment condition was met without showing unnecessary wallet details.",
    icon: LockKeyhole,
    tone: "success",
    bullets: [
      "Proves required payment condition.",
      "Reduces exposure of sensitive payment data.",
      "Links proof status to access unlock."
    ]
  },
  {
    title: "Payment-hold status",
    description:
      "A simplified reservation state that helps users know where the viewing request is in the trust flow.",
    icon: WalletCards,
    tone: "warning",
    bullets: [
      "Awaiting payment means no proof can start yet.",
      "Payment received means proof can be generated.",
      "Verified means viewing access can unlock."
    ]
  }
];

export const paymentHoldSteps = [
  {
    title: "Awaiting payment",
    description: "The request exists, but the required viewing fee has not been detected.",
    icon: TimerReset,
    tone: "neutral"
  },
  {
    title: "Payment received",
    description: "The Stellar testnet payment reference is attached to the viewing request.",
    icon: WalletCards,
    tone: "success"
  },
  {
    title: "Proof ready",
    description: "The system can generate a private proof from the confirmed payment condition.",
    icon: LockKeyhole,
    tone: "success"
  },
  {
    title: "Verified",
    description: "The proof has passed verification and access can be unlocked.",
    icon: ShieldCheck,
    tone: "success"
  },
  {
    title: "Released or revoked",
    description: "The hold is either completed safely or revoked due to risk, expiry, or report review.",
    icon: ShieldAlert,
    tone: "warning"
  }
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-01",
    category: "Stellar testnet",
    question: "What is Stellar testnet?",
    answer:
      "Stellar testnet is a safe testing network for demonstrating blockchain payment behavior. In this MVP, it helps show payment intent, payment confirmation, and transaction hash without using production real-money settlement.",
    defaultOpen: true
  },
  {
    id: "faq-02",
    category: "Stellar testnet",
    question: "Does a testnet transaction mean real money moved?",
    answer:
      "No. Testnet assets are used for testing and demo validation. The production version would need a real payment configuration, compliance review, and real operational settlement rules."
  },
  {
    id: "faq-03",
    category: "ZK proof",
    question: "What does the ZK proof prove?",
    answer:
      "The proof confirms that the required viewing-fee payment condition was met for the selected request. It should not expose unrelated wallet history, unrelated balances, or unnecessary private payment details."
  },
  {
    id: "faq-04",
    category: "ZK proof",
    question: "Why not just show the payment receipt?",
    answer:
      "A receipt can expose more information than needed. The ZK proof approach is designed to confirm eligibility while reducing unnecessary exposure of sensitive payment data."
  },
  {
    id: "faq-05",
    category: "Payment-hold status",
    question: "What does payment-hold mean?",
    answer:
      "Payment-hold is a simplified reservation status. It shows whether the request is waiting for payment, payment received, proof ready, verified, released, expired, or revoked."
  },
  {
    id: "faq-06",
    category: "Viewing codes",
    question: "When does a viewing code unlock?",
    answer:
      "The viewing code unlocks after the required payment is received and the payment proof is verified. The code can also expire or be revoked if there is suspicious activity."
  },
  {
    id: "faq-07",
    category: "Reports",
    question: "What should tenants report?",
    answer:
      "Tenants should report fake listings, suspicious property images, agents asking for off-platform payments, wrong viewing details, unsafe behavior, or any listing that appears misleading."
  },
  {
    id: "faq-08",
    category: "Safety",
    question: "What is the safest way to use UrbanRentisha?",
    answer:
      "Use only verified listings, keep payments inside the guided flow, do not send off-platform money, check the property verification badge, and report suspicious activity immediately."
  },
  {
    id: "faq-09",
    category: "Limitations",
    question: "What are the known MVP limitations?",
    answer:
      "The MVP may use Stellar testnet, simplified proof verification, simulated payment-hold states, demo listings, and manual review for some safety events. These limitations should be clearly disclosed in demos."
  }
];

export const safetyRules: SafetyRule[] = [
  {
    title: "Do not pay outside the verified flow",
    description:
      "Off-platform payment requests are a strong fraud signal. Report them immediately.",
    icon: WalletCards,
    severity: "required"
  },
  {
    title: "Check the verified property badge",
    description:
      "Only proceed when the listing has a clear verification status and trusted agent profile.",
    icon: BadgeCheck,
    severity: "required"
  },
  {
    title: "Use viewing codes only after proof verification",
    description:
      "A viewing code should unlock only after payment and proof checks are complete.",
    icon: KeyRound,
    severity: "required"
  },
  {
    title: "Report suspicious agent behavior",
    description:
      "Report pressure tactics, fake urgency, wrong property access, or identity mismatch.",
    icon: Flag,
    severity: "recommended"
  },
  {
    title: "Do not share private wallet data",
    description:
      "The system should not ask tenants to expose unrelated wallet history or seed phrases.",
    icon: LockKeyhole,
    severity: "warning"
  },
  {
    title: "Confirm appointment details",
    description:
      "Check location, date, time, agent identity, and access instructions before traveling.",
    icon: CalendarCheck2,
    severity: "recommended"
  }
];

export const limitations: LimitationItem[] = [
  {
    title: "Testnet payments are for demonstration",
    description:
      "The MVP uses Stellar testnet to demonstrate payment flow. Production settlement requires real payment configuration.",
    status: "mvp"
  },
  {
    title: "Some verification may be simulated",
    description:
      "Depending on implementation depth, proof verification may be recorded through a fallback service before full on-chain verification is complete.",
    status: "known"
  },
  {
    title: "Manual review is still required",
    description:
      "Reports, suspicious listings, and agent disputes may still require human review.",
    status: "known"
  },
  {
    title: "Viewing access can expire",
    description:
      "Viewing codes may expire to reduce code sharing, stale access, and unsafe repeated entry.",
    status: "known"
  },
  {
    title: "Production compliance is not included in MVP",
    description:
      "A live product needs legal, privacy, payment, and jurisdiction-specific compliance review.",
    status: "planned"
  }
];

export const supportOptions = [
  {
    title: "Read the FAQ",
    description: "Find quick answers about payment proof, Stellar, viewing codes, and reports.",
    icon: BookOpenText,
    href: "#faq"
  },
  {
    title: "Report a fake listing",
    description: "Flag suspicious listings, unsafe agents, or off-platform payment requests.",
    icon: Flag,
    href: "/reports/new"
  },
  {
    title: "Contact support",
    description: "Get human help for a payment, proof, access, or viewing-code issue.",
    icon: LifeBuoy,
    href: "/support"
  }
];

export const sidebarItems = [
  { label: "Overview", href: "#overview", icon: HelpCircle, active: true },
  { label: "Stellar Testnet", href: "#stellar-testnet", icon: Network },
  { label: "ZK Proof", href: "#zk-proof", icon: LockKeyhole },
  { label: "Payment Hold", href: "#payment-hold", icon: WalletCards },
  { label: "Viewing Codes", href: "#viewing-codes", icon: KeyRound },
  { label: "Reports", href: "#reports", icon: Flag },
  { label: "Safety Rules", href: "#safety-rules", icon: ShieldAlert },
  { label: "Known Limitations", href: "#known-limitations", icon: FileWarning },
  { label: "FAQ", href: "#faq", icon: MessageCircle },
  { label: "Support", href: "#support", icon: LifeBuoy }
];

export const appSidebarItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Properties", href: "/properties", icon: Building2 },
  { label: "Viewings", href: "/viewings", icon: CalendarCheck2 },
  { label: "Reports", href: "/reports", icon: Flag },
  { label: "Audit Log", href: "/audit-log", icon: Database },
  { label: "API Docs", href: "/api-docs", icon: Code2 },
  { label: "Help Center", href: "/help", icon: HelpCircle, active: true },
  { label: "Settings", href: "/settings", icon: Settings }
];

export const statusVisuals = {
  tone: {
    success: { variant: "success", icon: CheckCircle2 },
    warning: { variant: "warning", icon: AlertTriangle },
    danger: { variant: "danger", icon: ShieldAlert },
    neutral: { variant: "neutral", icon: Info }
  },
  severity: {
    required: { variant: "danger", label: "Required", icon: AlertTriangle },
    recommended: { variant: "success", label: "Recommended", icon: CheckCircle2 },
    warning: { variant: "warning", label: "Warning", icon: ShieldAlert }
  },
  limitation: {
    known: { variant: "warning", label: "Known", icon: AlertTriangle },
    mvp: { variant: "neutral", label: "MVP", icon: Info },
    planned: { variant: "success", label: "Planned", icon: CheckCircle2 }
  }
} as const;
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
\n```\n\n## `components/help-faq/status-badge.tsx`\n\n```tsx\nimport type { ComponentType } from "react";
import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  label: string;
  variant: "success" | "warning" | "danger" | "neutral" | "outline";
  icon: ComponentType<{ className?: string }>;
};

export function StatusBadge({ label, variant, icon: Icon }: StatusBadgeProps) {
  return (
    <Badge variant={variant}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </Badge>
  );
}
\n```\n\n## `components/help-faq/logo-mark.tsx`\n\n```tsx\nimport Link from "next/link";
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
\n```\n\n## `components/help-faq/help-sidebar.tsx`\n\n```tsx\nimport { LogOut, ShieldCheck, UserRound } from "lucide-react";
import { appSidebarItems, sidebarItems } from "@/lib/help-faq-data";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/help-faq/logo-mark";

export function HelpSidebar() {
  return (
    <aside className="hidden min-h-screen w-[292px] shrink-0 border-r border-white/10 bg-ur-sidebar/90 p-5 backdrop-blur-xl xl:block">
      <LogoMark />

      <nav className="mt-9 space-y-1" aria-label="Main app navigation">
        {appSidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex h-11 items-center gap-3 rounded-ur-sm px-3 text-sm font-bold transition-colors ur-focus",
                item.active
                  ? "border border-ur-primary/25 bg-ur-primary/12 text-white"
                  : "text-white/56 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={cn("h-4 w-4", item.active ? "text-ur-primary" : "text-white/44")} />
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="mt-8 border-t border-white/10 pt-5">
        <p className="px-3 text-xs font-black uppercase tracking-[0.16em] text-white/32">
          Help topics
        </p>

        <nav className="mt-3 space-y-1" aria-label="Help page navigation">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-ur-sm px-3 text-xs font-bold transition-colors ur-focus",
                  item.active
                    ? "bg-ur-primary/10 text-white"
                    : "text-white/48 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn("h-4 w-4", item.active ? "text-ur-primary" : "text-white/34")} />
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-4">
        <ShieldCheck className="h-6 w-6 text-ur-success" />
        <p className="mt-3 text-sm font-black text-white">Safety-first help</p>
        <p className="mt-2 text-xs leading-5 text-ur-success/74">
          Learn how proof, payment status, reports, and viewing codes protect the rental flow.
        </p>
      </div>

      <div className="mt-8 border-t border-white/10 pt-5">
        <div className="flex items-center gap-3 rounded-ur-lg border border-white/10 bg-black/16 p-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-ur-primary/15 text-ur-primary">
            <UserRound className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-white">John Tenant</p>
            <p className="text-xs text-white/46">Tenant</p>
          </div>
        </div>

        <button
          type="button"
          className="mt-3 flex h-10 w-full items-center gap-3 rounded-ur-sm px-3 text-sm font-bold text-white/56 transition-colors hover:bg-white/5 hover:text-white ur-focus"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
\n```\n\n## `components/help-faq/help-topbar.tsx`\n\n```tsx\nimport Link from "next/link";
import { Bell, Flag, Menu, Search, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/help-faq/logo-mark";

export function HelpTopbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 xl:hidden">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <LogoMark />
        </div>

        <label className="relative hidden flex-1 xl:block">
          <span className="sr-only">Search help topics</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/42" />
          <input
            placeholder="Search Stellar testnet, ZK proof, payment hold, viewing code, reports, safety..."
            className="h-11 w-full max-w-[760px] rounded-ur-sm border border-white/10 bg-black/18 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-ur-primary"
          />
        </label>

        <div className="flex items-center gap-2">
          <Link
            href="/notifications"
            className="relative grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-warning/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label="Open notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ur-warning px-1 text-[10px] font-black text-black">
              4
            </span>
          </Link>

          <Button className="hidden sm:inline-flex" variant="danger">
            <Flag className="h-4 w-4" />
            Report issue
          </Button>

          <Link
            href="/profile"
            className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label="Profile"
          >
            <UserRound className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
\n```\n\n## `components/help-faq/help-faq-page.tsx`\n\n```tsx\nimport { BadgeCheck, HelpCircle, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HelpSidebar } from "@/components/help-faq/help-sidebar";
import { HelpTopbar } from "@/components/help-faq/help-topbar";
import { HelpHero } from "@/components/help-faq/help-hero";
import { HelpStatsGrid } from "@/components/help-faq/help-stats-grid";
import { HelpTopicGrid } from "@/components/help-faq/help-topic-grid";
import { ExplainerSection } from "@/components/help-faq/explainer-section";
import { PaymentHoldGuide } from "@/components/help-faq/payment-hold-guide";
import { ViewingCodesReportsSection } from "@/components/help-faq/viewing-codes-reports-section";
import { SafetyRulesPanel } from "@/components/help-faq/safety-rules-panel";
import { KnownLimitationsPanel } from "@/components/help-faq/known-limitations-panel";
import { FaqAccordionSection } from "@/components/help-faq/faq-accordion-section";
import { SupportPanel } from "@/components/help-faq/support-panel";

export function HelpFaqPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 help-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-cyan/10 blur-[130px]" />

      <div className="relative z-10 flex min-h-screen">
        <HelpSidebar />

        <div className="min-w-0 flex-1">
          <HelpTopbar />

          <section className="px-5 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-6" id="overview">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="success">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Help center
                  </Badge>
                  <Badge variant="outline">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Safety-first rental access
                  </Badge>
                  <Badge variant="outline">
                    <HelpCircle className="h-3.5 w-3.5" />
                    FAQ and limitations
                  </Badge>
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
                  Help / FAQ page
                </p>
                <h1 className="mt-3 max-w-[1040px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
                  Understand verified viewing before you unlock access.
                </h1>
                <p className="mt-4 max-w-[940px] text-base leading-7 text-white/66">
                  Learn how Stellar testnet, private payment proof, payment-hold status, viewing codes, reports, safety rules, and MVP limitations work inside UrbanRentisha TrustLayer.
                </p>
              </div>

              <HelpHero />
              <HelpStatsGrid />

              <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_410px]">
                <section className="space-y-6">
                  <HelpTopicGrid />
                  <ExplainerSection />
                  <PaymentHoldGuide />
                  <ViewingCodesReportsSection />
                  <FaqAccordionSection />
                </section>

                <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
                  <SafetyRulesPanel />
                  <KnownLimitationsPanel />
                  <SupportPanel />
                </aside>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
\n```\n\n## `components/help-faq/help-hero.tsx`\n\n```tsx\nimport { ArrowRight, Flag, LockKeyhole, Network, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HelpHero() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified viewing guide
          </Badge>

          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">
            A safer rental flow needs clear rules.
          </h2>

          <p className="mt-3 max-w-[760px] text-sm leading-6 text-white/62">
            This help center explains the trust flow in simple terms: payment is checked, proof is generated, verification is recorded, and viewing access unlocks only when the request is safe.
          </p>

          <label className="relative mt-5 block max-w-[760px]">
            <span className="sr-only">Search help center</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/42" />
            <input
              placeholder="Search for payment proof, Stellar, viewing code, reports, safety..."
              className="h-12 w-full rounded-ur-sm border border-white/10 bg-black/18 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-ur-primary"
            />
          </label>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button>
              Start with FAQ
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              Report a listing
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-ur-lg border border-white/10 bg-black/18 p-5">
          <div className="grid gap-3">
            <HeroSignal icon={<Network className="h-4 w-4" />} label="Payment network" value="Stellar testnet" />
            <HeroSignal icon={<LockKeyhole className="h-4 w-4" />} label="Privacy layer" value="ZK payment proof" />
            <HeroSignal icon={<ShieldCheck className="h-4 w-4" />} label="Access status" value="Verified before unlock" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSignal({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/20 p-3">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
          {icon}
        </div>
        <p className="text-sm font-bold text-white/70">{label}</p>
      </div>
      <p className="max-w-[190px] truncate font-mono text-xs font-bold text-ur-mint">{value}</p>
    </div>
  );
}
\n```\n\n## `components/help-faq/help-stats-grid.tsx`\n\n```tsx\nimport { helpStats } from "@/lib/help-faq-data";
import { cn } from "@/lib/utils";

export function HelpStatsGrid() {
  return (
    <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {helpStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.label}
            className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-black tracking-[-0.05em] text-white">
                  {stat.value}
                </p>
              </div>
              <div
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-ur",
                  stat.tone === "warning"
                    ? "bg-ur-warning-bg text-ur-warning"
                    : stat.tone === "success"
                      ? "bg-ur-success-bg text-ur-success"
                      : "bg-white/5 text-white/60"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/52">{stat.helper}</p>
          </article>
        );
      })}
    </section>
  );
}
\n```\n\n## `components/help-faq/help-topic-grid.tsx`\n\n```tsx\nimport { ChevronRight } from "lucide-react";
import { helpTopics, statusVisuals, type HelpTopicTone } from "@/lib/help-faq-data";
import { cn } from "@/lib/utils";

export function HelpTopicGrid() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Help topics
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Choose what you need to understand
        </h2>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {helpTopics.map((topic) => {
          const Icon = topic.icon;
          const visual = statusVisuals.tone[topic.tone as HelpTopicTone];

          return (
            <a
              key={topic.id}
              href={topic.href}
              className="group rounded-ur-lg border border-white/10 bg-black/16 p-4 transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04] ur-focus"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={cn(
                    "grid h-12 w-12 shrink-0 place-items-center rounded-ur",
                    visual.variant === "danger"
                      ? "bg-ur-error-bg text-ur-error"
                      : visual.variant === "warning"
                        ? "bg-ur-warning-bg text-ur-warning"
                        : visual.variant === "success"
                          ? "bg-ur-success-bg text-ur-success"
                          : "bg-white/5 text-white/62"
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <ChevronRight className="h-5 w-5 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-ur-primary" />
              </div>

              <h3 className="mt-4 text-lg font-black text-white">{topic.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/56">{topic.description}</p>
            </a>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/help-faq/explainer-section.tsx`\n\n```tsx\nimport { explainerCards, statusVisuals, type HelpTopicTone } from "@/lib/help-faq-data";
import { cn } from "@/lib/utils";

export function ExplainerSection() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Core explainers
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Stellar, ZK proof, and payment status
        </h2>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {explainerCards.map((card) => {
          const Icon = card.icon;
          const visual = statusVisuals.tone[card.tone as HelpTopicTone];

          return (
            <article key={card.title} id={card.title.toLowerCase().replaceAll(" ", "-")} className="rounded-ur-lg border border-white/10 bg-black/16 p-5">
              <div
                className={cn(
                  "grid h-12 w-12 place-items-center rounded-ur",
                  visual.variant === "warning"
                    ? "bg-ur-warning-bg text-ur-warning"
                    : "bg-ur-success-bg text-ur-success"
                )}
              >
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-lg font-black text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/56">{card.description}</p>

              <ul className="mt-4 space-y-2">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm leading-6 text-white/58">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ur-primary" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/help-faq/payment-hold-guide.tsx`\n\n```tsx\nimport { paymentHoldSteps } from "@/lib/help-faq-data";
import { cn } from "@/lib/utils";

export function PaymentHoldGuide() {
  return (
    <section id="payment-hold" className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Payment-hold status guide
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          What each payment-hold state means
        </h2>
        <p className="mt-2 max-w-[820px] text-sm leading-6 text-white/56">
          Payment-hold does not need to feel confusing. It is a simple status layer that shows whether payment, proof, and access checks are complete.
        </p>
      </div>

      <div className="mt-5 grid gap-3">
        {paymentHoldSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <article key={step.title} className="grid gap-4 rounded-ur-lg border border-white/10 bg-black/16 p-4 sm:grid-cols-[54px_1fr] sm:items-start">
              <div className="relative">
                <div
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-ur",
                    step.tone === "warning"
                      ? "bg-ur-warning-bg text-ur-warning"
                      : step.tone === "success"
                        ? "bg-ur-success-bg text-ur-success"
                        : "bg-white/5 text-white/62"
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-ur-primary text-xs font-black text-white">
                  {index + 1}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/56">{step.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/help-faq/viewing-codes-reports-section.tsx`\n\n```tsx\nimport { AlertTriangle, Flag, KeyRound, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ViewingCodesReportsSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <article id="viewing-codes" className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
        <Badge variant="success">
          <KeyRound className="h-3.5 w-3.5" />
          Viewing codes
        </Badge>
        <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-white">
          Viewing access unlocks only after trust checks.
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/56">
          A viewing code is released after payment is detected and proof verification succeeds. Codes can expire, be revoked, or be blocked if a report or suspicious activity appears.
        </p>

        <div className="mt-5 space-y-3">
          <RuleRow icon={<ShieldCheck className="h-4 w-4" />} title="Unlocked" text="Proof verified and viewing access is available." />
          <RuleRow icon={<AlertTriangle className="h-4 w-4" />} title="Expired" text="The code is no longer valid after the allowed time window." />
          <RuleRow icon={<Flag className="h-4 w-4" />} title="Revoked" text="Access was removed due to report, risk, or manual review." />
        </div>
      </article>

      <article id="reports" className="rounded-ur-xl border border-ur-error/20 bg-ur-error-bg p-6 shadow-soft-dark backdrop-blur-xl">
        <Badge variant="danger">
          <Flag className="h-3.5 w-3.5" />
          Reports
        </Badge>
        <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-white">
          Report fake listings and unsafe payment requests.
        </h2>
        <p className="mt-3 text-sm leading-6 text-ur-error/76">
          Report any agent who asks for off-platform payment, changes viewing details suspiciously, uses mismatched identity, or shares misleading property information.
        </p>

        <Button className="mt-5" variant="danger">
          <Flag className="h-4 w-4" />
          Report suspicious activity
        </Button>
      </article>
    </section>
  );
}

function RuleRow({
  icon,
  title,
  text
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
        {icon}
      </div>
      <div>
        <p className="text-sm font-black text-white">{title}</p>
        <p className="mt-1 text-xs leading-5 text-white/52">{text}</p>
      </div>
    </div>
  );
}
\n```\n\n## `components/help-faq/safety-rules-panel.tsx`\n\n```tsx\nimport { safetyRules, statusVisuals } from "@/lib/help-faq-data";
import { StatusBadge } from "@/components/help-faq/status-badge";

export function SafetyRulesPanel() {
  return (
    <section id="safety-rules" className="rounded-ur-xl border border-ur-warning/25 bg-ur-warning-bg p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-warning">
        Safety rules
      </p>
      <h2 className="mt-2 text-lg font-black text-white">Rules that protect the rental flow</h2>

      <div className="mt-4 space-y-3">
        {safetyRules.map((rule) => {
          const Icon = rule.icon;
          const visual = statusVisuals.severity[rule.severity];

          return (
            <article key={rule.title} className="rounded-ur-sm border border-ur-warning/20 bg-black/16 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-warning/15 text-ur-warning">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white">{rule.title}</p>
                    <p className="mt-1 text-xs leading-5 text-ur-warning/74">{rule.description}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <StatusBadge label={visual.label} variant={visual.variant} icon={visual.icon} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/help-faq/known-limitations-panel.tsx`\n\n```tsx\nimport { limitations, statusVisuals } from "@/lib/help-faq-data";
import { StatusBadge } from "@/components/help-faq/status-badge";

export function KnownLimitationsPanel() {
  return (
    <section id="known-limitations" className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Known limitations
      </p>
      <h2 className="mt-2 text-lg font-black text-white">MVP boundaries and honest scope</h2>
      <p className="mt-2 text-sm leading-6 text-white/56">
        These points should remain visible so users understand what is demo-ready and what requires production hardening.
      </p>

      <div className="mt-4 space-y-3">
        {limitations.map((item) => {
          const visual = statusVisuals.limitation[item.status];

          return (
            <article key={item.title} className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-black text-white">{item.title}</p>
                <StatusBadge label={visual.label} variant={visual.variant} icon={visual.icon} />
              </div>
              <p className="mt-2 text-xs leading-5 text-white/52">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/help-faq/faq-accordion-section.tsx`\n\n```tsx\nimport { FaqAccordionItem } from "@/components/help-faq/faq-accordion-item";
import { faqItems } from "@/lib/help-faq-data";

export function FaqAccordionSection() {
  return (
    <section id="faq" className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          FAQ
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Frequently asked questions
        </h2>
        <p className="mt-2 max-w-[820px] text-sm leading-6 text-white/56">
          Clear answers about how UrbanRentisha TrustLayer handles proof, payment status, reports, access, and limitations.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {faqItems.map((item) => (
          <FaqAccordionItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
\n```\n\n## `components/help-faq/faq-accordion-item.tsx`\n\n```tsx\nimport { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/help-faq-data";
import { Badge } from "@/components/ui/badge";

export function FaqAccordionItem({ item }: { item: FaqItem }) {
  return (
    <details
      className="group rounded-ur-lg border border-white/10 bg-black/16 p-4 open:border-ur-primary/35 open:bg-white/[0.04]"
      open={item.defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 ur-focus">
        <div>
          <Badge variant="outline">{item.category}</Badge>
          <h3 className="mt-3 text-lg font-black text-white">{item.question}</h3>
        </div>
        <ChevronDown className="mt-2 h-5 w-5 shrink-0 text-white/42 transition-transform group-open:rotate-180 group-open:text-ur-primary" />
      </summary>

      <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-white/58">
        {item.answer}
      </p>
    </details>
  );
}
\n```\n\n## `components/help-faq/support-panel.tsx`\n\n```tsx\nimport { ExternalLink, LifeBuoy, Mail, Phone } from "lucide-react";
import { supportOptions } from "@/lib/help-faq-data";
import { Button } from "@/components/ui/button";

export function SupportPanel() {
  return (
    <section id="support" className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Support
          </p>
          <h2 className="mt-2 text-lg font-black text-white">Still need help?</h2>
        </div>
        <LifeBuoy className="h-6 w-6 text-ur-primary" />
      </div>

      <div className="mt-4 space-y-3">
        {supportOptions.map((option) => {
          const Icon = option.icon;

          return (
            <a
              key={option.title}
              href={option.href}
              className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3 transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04] ur-focus"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-white">{option.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{option.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-white/32" />
            </a>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3">
        <Button className="w-full">
          <Mail className="h-4 w-4" />
          Email support
        </Button>
        <Button className="w-full" variant="outline">
          <Phone className="h-4 w-4" />
          Emergency safety help
        </Button>
      </div>
    </section>
  );
}
\n```\n
---

# 14. Acceptance Checklist

```text
The route /help works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for technical labels and references.
UrbanRentisha dark green theme is applied.
Left sidebar is visible on desktop.
Topbar search is visible.
Help / FAQ title and badges are visible.
Help hero is visible.
Stats grid is visible.
Topic cards are visible.
Stellar testnet explainer is visible.
ZK proof explainer is visible.
Payment-hold status guide is visible.
Viewing code guide is visible.
Report guide is visible.
Safety rules panel is visible.
Known limitations panel is visible.
FAQ accordion is visible.
Support panel is visible.
Mobile layout is stacked and readable.
All controls have visible focus states.
```

---

# 15. Final UX Summary

```text
The Help / FAQ Page is the education and safety center.
It should make users understand exactly how verified viewing works, why payment proof matters, how access unlocks, how to report suspicious activity, and what the MVP does not yet guarantee.
```
