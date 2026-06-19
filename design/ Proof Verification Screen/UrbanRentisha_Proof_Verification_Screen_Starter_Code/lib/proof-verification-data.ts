import {
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
