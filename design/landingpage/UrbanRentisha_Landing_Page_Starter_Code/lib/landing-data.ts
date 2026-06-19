import {
  AlertTriangle,
  BadgeCheck,
  Bell,
  Building2,
  CheckCircle2,
  Code2,
  Database,
  FileCheck2,
  Home,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  UserCheck,
  Wallet,
  Zap,
} from "lucide-react";

export const landingNavItems = [
  { label: "Problem", href: "#problem" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "API", href: "#api" },
  { label: "FAQ", href: "#faq" },
];

export const trustStats = [
  {
    label: "Core flow",
    value: "Payment Proof",
    description: "Private proof before viewing access.",
    icon: FileCheck2,
  },
  {
    label: "Network",
    value: "Stellar",
    description: "Testnet payment and Soroban verification.",
    icon: Zap,
  },
  {
    label: "Safety layer",
    value: "Verified Access",
    description: "Codes unlock after proof verification.",
    icon: ShieldCheck,
  },
];

export const problems = [
  {
    title: "Fake rental listings",
    description:
      "Tenants can lose money to listings that are unavailable, duplicated, or controlled by unverified agents.",
    icon: AlertTriangle,
  },
  {
    title: "Unsafe viewing fees",
    description:
      "Viewing payments are often confirmed manually through screenshots, calls, or informal receipts.",
    icon: Wallet,
  },
  {
    title: "Weak trust records",
    description:
      "Platforms need a cleaner audit trail for viewing requests, proof status, reports, and agent trust.",
    icon: Database,
  },
];

export const solutionSteps = [
  {
    title: "Verified property",
    description: "Tenant selects a listing approved by the platform.",
    icon: Home,
  },
  {
    title: "Stellar payment",
    description: "Tenant pays the viewing fee through Stellar testnet.",
    icon: Wallet,
  },
  {
    title: "ZK proof",
    description: "A private proof confirms the payment condition.",
    icon: LockKeyhole,
  },
  {
    title: "Soroban verification",
    description: "The smart contract verifies the proof status.",
    icon: FileCheck2,
  },
  {
    title: "Viewing code",
    description: "Access unlocks only after proof verification succeeds.",
    icon: KeyRound,
  },
];

export const bentoFeatures = [
  {
    title: "Verified property badge",
    description:
      "Show tenants which properties have passed platform-level checks.",
    icon: BadgeCheck,
    className: "lg:col-span-4",
  },
  {
    title: "Private payment proof",
    description:
      "Prove the required payment condition without exposing unrelated wallet activity.",
    icon: LockKeyhole,
    className: "lg:col-span-4",
  },
  {
    title: "Viewing code unlock",
    description:
      "Generate a one-time viewing code after successful proof verification.",
    icon: KeyRound,
    className: "lg:col-span-4",
  },
  {
    title: "Agent trust profile",
    description:
      "Display verification status, listed properties, report count, and trust score.",
    icon: UserCheck,
    className: "lg:col-span-6",
  },
  {
    title: "Platform API",
    description:
      "Allow rental platforms to create requests, check status, and verify viewing codes.",
    icon: Code2,
    className: "lg:col-span-6",
  },
];

export const howItWorks = [
  "Tenant requests access to a verified property.",
  "The app creates a viewing request and payment reference.",
  "Tenant completes a Stellar testnet payment.",
  "A ZK proof is generated off-chain.",
  "Soroban verifies proof or records verification status.",
  "UrbanRentisha unlocks the viewing code.",
];

export const faqs = [
  {
    question: "Is UrbanRentisha a full rental marketplace?",
    answer:
      "No. The MVP is a trust layer for verified rental access, payment proof, agent trust, reports, and audit logs.",
  },
  {
    question: "Where does ZK add value?",
    answer:
      "ZK lets a tenant prove the viewing payment condition was satisfied without exposing unrelated wallet history.",
  },
  {
    question: "Where is Stellar used?",
    answer:
      "Stellar testnet is used for the payment flow, and Soroban is used for proof verification or verification-state recording.",
  },
  {
    question: "Is this full legal escrow?",
    answer:
      "No. The MVP shows payment-hold or reservation status for transparency. Full legal escrow is a future production feature.",
  },
];
