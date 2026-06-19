import {
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
