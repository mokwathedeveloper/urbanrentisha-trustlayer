import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock3,
  Eye,
  FileCheck2,
  Home,
  KeyRound,
  LockKeyhole,
  ReceiptText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap
} from "lucide-react";

export const onboardingSteps = [
  {
    id: "verified-property",
    title: "Choose a verified property",
    eyebrow: "Step 01",
    description:
      "Start with a property that has passed UrbanRentisha listing and agent checks.",
    icon: Home,
    outcome: "You avoid random or unverified listings."
  },
  {
    id: "request-viewing",
    title: "Request viewing access",
    eyebrow: "Step 02",
    description:
      "Create a viewing request linked to the tenant, property, agent, and viewing fee.",
    icon: Eye,
    outcome: "The request is tracked before any access is released."
  },
  {
    id: "stellar-payment",
    title: "Pay through Stellar testnet",
    eyebrow: "Step 03",
    description:
      "Complete the required viewing payment through the controlled Stellar testnet flow.",
    icon: Wallet,
    outcome: "Payment status becomes visible and auditable."
  },
  {
    id: "zk-proof",
    title: "Generate private payment proof",
    eyebrow: "Step 04",
    description:
      "A zero-knowledge proof confirms the payment condition without exposing unrelated wallet history.",
    icon: LockKeyhole,
    outcome: "Privacy is preserved while trust is proven."
  },
  {
    id: "unlock-access",
    title: "Unlock viewing details",
    eyebrow: "Step 05",
    description:
      "After proof verification succeeds, UrbanRentisha unlocks the viewing code and access details.",
    icon: KeyRound,
    outcome: "Access unlocks only when the trust condition is satisfied."
  }
] as const;

export const proofReasons = [
  {
    title: "Prevents fake receipts",
    description:
      "Viewing access does not depend on screenshots or manually forwarded payment claims.",
    icon: ReceiptText
  },
  {
    title: "Protects private wallet activity",
    description:
      "The proof confirms the payment condition without revealing unrelated transactions.",
    icon: ShieldCheck
  },
  {
    title: "Creates an audit trail",
    description:
      "Payment status, proof status, and access status can be reviewed later.",
    icon: FileCheck2
  }
];

export const tenantBenefits = [
  {
    label: "Verified property first",
    icon: BadgeCheck
  },
  {
    label: "No private key request",
    icon: ShieldAlert
  },
  {
    label: "Payment status tracked",
    icon: Clock3
  },
  {
    label: "ZK proof before access",
    icon: Sparkles
  },
  {
    label: "Viewing code unlocked safely",
    icon: KeyRound
  },
  {
    label: "Agent and listing trust improved",
    icon: Building2
  }
];

export const flowSummary = [
  {
    label: "Property",
    value: "Verified",
    icon: Home
  },
  {
    label: "Payment",
    value: "Stellar",
    icon: Zap
  },
  {
    label: "Proof",
    value: "ZK",
    icon: LockKeyhole
  },
  {
    label: "Access",
    value: "Unlocked",
    icon: CheckCircle2
  }
];

export type OnboardingStepId = (typeof onboardingSteps)[number]["id"];
