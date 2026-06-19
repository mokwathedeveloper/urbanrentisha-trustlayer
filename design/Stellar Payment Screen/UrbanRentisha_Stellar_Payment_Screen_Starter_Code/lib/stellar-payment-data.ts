import {
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
