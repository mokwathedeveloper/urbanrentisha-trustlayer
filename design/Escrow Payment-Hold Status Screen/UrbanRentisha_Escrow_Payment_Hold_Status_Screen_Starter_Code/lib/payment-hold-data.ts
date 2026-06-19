import {
  BadgeCheck,
  Banknote,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Database,
  FileCheck2,
  Hash,
  HelpCircle,
  Home,
  KeyRound,
  LockKeyhole,
  MapPin,
  ReceiptText,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UnlockKeyhole,
  UserRound,
  WalletCards
} from "lucide-react";

export type HoldStatus =
  | "held"
  | "reserved"
  | "release_eligible"
  | "released"
  | "refund_pending"
  | "expired";

export type PaymentHoldRecord = {
  requestId: string;
  holdId: string;
  reservationId: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  tenantName: string;
  agentName: string;
  viewingDate: string;
  viewingTime: string;
  holdAmountKes: number;
  holdAmountXlm: string;
  platformFeeKes: number;
  refundableAmountKes: number;
  status: HoldStatus;
  accessStatus: "Locked" | "Unlocked";
  verificationStatus: "Verified";
  network: "Stellar Testnet";
  txHash: string;
  proofHash: string;
  verificationHash: string;
  expiresAt: string;
};

export const paymentHoldRecord: PaymentHoldRecord = {
  requestId: "REQ-UR-9084",
  holdId: "HOLD-UR-7712",
  reservationId: "RSV-UR-4481",
  propertyId: "UR-LST-1001",
  propertyTitle: "Kilimani Green View Apartment",
  propertyLocation: "Kilimani, Nairobi",
  tenantName: "John Tenant",
  agentName: "Amina Njoroge",
  viewingDate: "Sat, 22 Jun",
  viewingTime: "11:30 AM",
  holdAmountKes: 500,
  holdAmountXlm: "8.4200000 XLM",
  platformFeeKes: 0,
  refundableAmountKes: 500,
  status: "reserved",
  accessStatus: "Unlocked",
  verificationStatus: "Verified",
  network: "Stellar Testnet",
  txHash:
    "4f7a8b2c9d1e6f0a3b5c7d8e9f102a4b6c8d0e1f2a3b4c5d6e7f8091a2b3c4d5",
  proofHash:
    "zkp_0x9f12e5ab4c8d7a63f20b1c44e9aa73f1dc8829b6e4107ac5d9ef2a13b0c44190",
  verificationHash:
    "soro_0x7ab11f9e44dc92a18f03b7e54c2a901f6bb7d3e8124a90cc1f0e55a7d4e2c109",
  expiresAt: "22 Jun 2026, 6:00 PM"
};

export const holdSteps = [
  {
    label: "Payment",
    description: "Viewing fee received",
    icon: WalletCards
  },
  {
    label: "Proof",
    description: "Payment proof verified",
    icon: ShieldCheck
  },
  {
    label: "Reserved",
    description: "Viewing slot protected",
    icon: CalendarCheck2
  },
  {
    label: "Complete",
    description: "Release or refund resolved",
    icon: CheckCircle2
  }
];

export const holdMetrics = [
  {
    label: "Hold amount",
    value: "KES 500",
    icon: Banknote
  },
  {
    label: "Reservation",
    value: "Active",
    icon: CalendarCheck2
  },
  {
    label: "Access",
    value: "Unlocked",
    icon: UnlockKeyhole
  },
  {
    label: "Expires",
    value: "6:00 PM",
    icon: Clock3
  }
];

export const holdTimeline = [
  {
    title: "Viewing request created",
    description: "Tenant selected a verified property and preferred viewing slot.",
    time: "10:04 AM",
    icon: FileCheck2
  },
  {
    title: "Payment received",
    description: "Viewing fee was received on Stellar testnet.",
    time: "10:07 AM",
    icon: WalletCards
  },
  {
    title: "Proof verified",
    description: "Private payment proof passed verification.",
    time: "10:09 AM",
    icon: ShieldCheck
  },
  {
    title: "Reservation active",
    description: "Viewing slot is currently protected for the tenant.",
    time: "Now",
    icon: CalendarCheck2
  }
];

export const releaseRules = [
  {
    title: "Release after completed viewing",
    description: "The hold can be marked complete when the viewing takes place according to policy.",
    icon: CheckCircle2
  },
  {
    title: "Refund if agent cancels",
    description: "The refundable amount can be returned when the verified agent cancels or no-shows.",
    icon: RefreshCcw
  },
  {
    title: "Expire after reservation window",
    description: "The reservation is reviewed after the hold window expires.",
    icon: TimerReset
  }
];

export const auditEvents = [
  {
    label: "Request ID",
    value: "REQ-UR-9084",
    icon: FileCheck2
  },
  {
    label: "Hold ID",
    value: "HOLD-UR-7712",
    icon: LockKeyhole
  },
  {
    label: "Reservation ID",
    value: "RSV-UR-4481",
    icon: CalendarCheck2
  },
  {
    label: "Network",
    value: "Stellar Testnet",
    icon: Sparkles
  },
  {
    label: "TX hash",
    value: "4f7a8b2c...b3c4d5",
    icon: Hash
  },
  {
    label: "Verification",
    value: "soro_0x7ab...2c109",
    icon: Database
  }
];

export const reservationFacts = [
  {
    label: "Property",
    value: "Verified",
    icon: Home
  },
  {
    label: "Agent",
    value: "Verified",
    icon: UserRound
  },
  {
    label: "Location",
    value: "Kilimani",
    icon: MapPin
  },
  {
    label: "Access",
    value: "Code unlocked",
    icon: KeyRound
  }
];

export const supportReasons = [
  {
    title: "Agent unavailable",
    description: "Open support if the verified agent cannot attend the scheduled viewing.",
    icon: HelpCircle
  },
  {
    title: "Need to reschedule",
    description: "A tenant can request assistance before the reservation window expires.",
    icon: CalendarCheck2
  },
  {
    title: "Payment issue",
    description: "Support can review transaction and proof references from the audit trail.",
    icon: ReceiptText
  }
];

export const simplifiedStatusCopy: Record<HoldStatus, { label: string; description: string; badge: "success" | "warning" | "neutral" | "danger" }> = {
  held: {
    label: "Payment held",
    description: "The viewing fee has been received and is waiting for reservation confirmation.",
    badge: "warning"
  },
  reserved: {
    label: "Reservation active",
    description: "The viewing fee is held and the viewing slot is protected for the tenant.",
    badge: "success"
  },
  release_eligible: {
    label: "Release eligible",
    description: "The viewing has been completed and the hold can be resolved.",
    badge: "success"
  },
  released: {
    label: "Released",
    description: "The hold has been resolved according to platform policy.",
    badge: "success"
  },
  refund_pending: {
    label: "Refund pending",
    description: "A refund review has been opened for this payment hold.",
    badge: "warning"
  },
  expired: {
    label: "Expired",
    description: "The reservation window has ended and the hold requires review.",
    badge: "danger"
  }
};
