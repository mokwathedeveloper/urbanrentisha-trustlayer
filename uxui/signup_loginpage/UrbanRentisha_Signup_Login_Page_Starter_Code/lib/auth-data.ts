import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock3,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wallet
} from "lucide-react";

export const demoRoles = [
  {
    id: "tenant",
    label: "Tenant",
    email: "demo-tenant@urbanrentisha.app",
    description: "Request viewing, prove payment, unlock access.",
    icon: UserRound
  },
  {
    id: "manager",
    label: "Property Manager",
    email: "demo-manager@urbanrentisha.app",
    description: "Manage listings, requests, codes, and reports.",
    icon: Building2
  },
  {
    id: "admin",
    label: "Admin",
    email: "demo-admin@urbanrentisha.app",
    description: "Review agents, proofs, reports, and audit logs.",
    icon: ShieldCheck
  }
] as const;

export const trustItems = [
  {
    title: "Private proof",
    description: "Payment condition can be proven without exposing full wallet activity.",
    icon: LockKeyhole
  },
  {
    title: "Stellar-ready",
    description: "Prepared for Stellar testnet payment and Soroban verification flows.",
    icon: Sparkles
  },
  {
    title: "Access control",
    description: "Viewing details unlock after proof verification succeeds.",
    icon: KeyRound
  }
];

export const securityChecks = [
  {
    label: "No seed phrase required",
    icon: ShieldCheck
  },
  {
    label: "Demo mode available",
    icon: BadgeCheck
  },
  {
    label: "Proof status tracked",
    icon: Clock3
  },
  {
    label: "Wallet access supported",
    icon: Wallet
  },
  {
    label: "Audit-ready events",
    icon: CheckCircle2
  }
];

export type DemoRoleId = (typeof demoRoles)[number]["id"];
