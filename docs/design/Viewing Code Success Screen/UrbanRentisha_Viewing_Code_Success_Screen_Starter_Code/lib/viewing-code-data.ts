import {
  BadgeCheck,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Copy,
  Database,
  DoorOpen,
  Eye,
  EyeOff,
  FileCheck2,
  Hash,
  HelpCircle,
  Home,
  KeyRound,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Phone,
  ReceiptText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UserRound,
  WalletCards
} from "lucide-react";

export type ViewingCodeRecord = {
  requestId: string;
  viewingCode: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  buildingName: string;
  accessPoint: string;
  viewingDate: string;
  viewingTime: string;
  codeExpiresAt: string;
  tenantName: string;
  agentName: string;
  agentPhone: string;
  agentCompany: string;
  agentVerified: boolean;
  paymentAmountKes: number;
  network: "Stellar Testnet";
  paymentStatus: "Paid";
  proofStatus: "Verified";
  accessStatus: "Unlocked";
  txHash: string;
  proofHash: string;
  verificationHash: string;
};

export const viewingCodeRecord: ViewingCodeRecord = {
  requestId: "REQ-UR-9084",
  viewingCode: "UR-4829-LOCK",
  propertyId: "UR-LST-1001",
  propertyTitle: "Kilimani Green View Apartment",
  propertyLocation: "Kilimani, Nairobi",
  buildingName: "Green View Residences",
  accessPoint: "Main gate security desk",
  viewingDate: "Sat, 22 Jun",
  viewingTime: "11:30 AM",
  codeExpiresAt: "22 Jun 2026, 6:00 PM",
  tenantName: "John Tenant",
  agentName: "Amina Njoroge",
  agentPhone: "+254 700 000 000",
  agentCompany: "Amina Realty Group",
  agentVerified: true,
  paymentAmountKes: 500,
  network: "Stellar Testnet",
  paymentStatus: "Paid",
  proofStatus: "Verified",
  accessStatus: "Unlocked",
  txHash:
    "4f7a8b2c9d1e6f0a3b5c7d8e9f102a4b6c8d0e1f2a3b4c5d6e7f8091a2b3c4d5",
  proofHash:
    "zkp_0x9f12e5ab4c8d7a63f20b1c44e9aa73f1dc8829b6e4107ac5d9ef2a13b0c44190",
  verificationHash:
    "soro_0x7ab11f9e44dc92a18f03b7e54c2a901f6bb7d3e8124a90cc1f0e55a7d4e2c109"
};

export const unlockSteps = [
  { label: "Payment", description: "Viewing fee paid", icon: WalletCards },
  { label: "Proof", description: "Proof generated", icon: LockKeyhole },
  { label: "Verified", description: "Proof accepted", icon: ShieldCheck },
  { label: "Unlocked", description: "Viewing code active", icon: KeyRound }
];

export const successMetrics = [
  { label: "Payment", value: "Paid", icon: ReceiptText },
  { label: "Proof", value: "Verified", icon: ShieldCheck },
  { label: "Access", value: "Unlocked", icon: DoorOpen },
  { label: "Expires", value: "6:00 PM", icon: TimerReset }
];

export const viewingInstructions = [
  {
    title: "Arrive on time",
    description: "Use the selected viewing slot and arrive 5–10 minutes early.",
    icon: Clock3
  },
  {
    title: "Show the code",
    description: "Share the viewing code only with the verified agent or gate security desk.",
    icon: KeyRound
  },
  {
    title: "Confirm agent identity",
    description: "Match the agent name and company shown on this screen before entering.",
    icon: BadgeCheck
  },
  {
    title: "Report anything suspicious",
    description: "Use the report button if anyone asks for extra payment outside the platform.",
    icon: ShieldAlert
  }
];

export const auditReferences = [
  { label: "Request ID", value: "REQ-UR-9084", icon: FileCheck2 },
  { label: "Property ID", value: "UR-LST-1001", icon: Home },
  { label: "Network", value: "Stellar Testnet", icon: Sparkles },
  { label: "TX hash", value: "4f7a8b2c...b3c4d5", icon: Hash },
  { label: "Proof hash", value: "zkp_0x9f12...c44190", icon: LockKeyhole },
  { label: "Verification", value: "soro_0x7ab...2c109", icon: Database }
];

export const accessRules = [
  {
    title: "Code is time-limited",
    description: "The viewing code expires after the reservation window.",
    icon: TimerReset
  },
  {
    title: "Do not share publicly",
    description: "Treat the code like a private access credential.",
    icon: EyeOff
  },
  {
    title: "Verified access only",
    description: "Access was unlocked only after proof verification succeeded.",
    icon: ShieldCheck
  }
];

export const supportActions = [
  {
    title: "Call verified agent",
    description: "Use the verified phone contact if you arrive at the property.",
    icon: Phone
  },
  {
    title: "Message agent",
    description: "Send a secure in-app message about the viewing appointment.",
    icon: MessageCircle
  },
  {
    title: "Contact support",
    description: "Ask UrbanRentisha support to review access or code problems.",
    icon: HelpCircle
  }
];

export const codeControls = [
  { label: "Copy code", icon: Copy },
  { label: "Show / hide code", icon: Eye }
];
