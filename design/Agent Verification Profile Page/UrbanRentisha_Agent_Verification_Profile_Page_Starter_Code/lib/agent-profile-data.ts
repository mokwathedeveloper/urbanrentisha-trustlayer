import {
  BadgeCheck,
  Bell,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileCheck2,
  Flag,
  Hash,
  Home,
  IdCard,
  KeyRound,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ReceiptText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  UserCheck,
  UserRound,
  WalletCards
} from "lucide-react";

export type VerificationStatus = "verified" | "under_review" | "restricted";
export type PropertyStatus = "verified" | "review_needed" | "paused";
export type ViewingStatus = "completed" | "scheduled" | "verified";

export type AgentProfile = {
  agentId: string;
  name: string;
  company: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  joinedAt: string;
  verificationStatus: VerificationStatus;
  trustScore: number;
  reportCount: number;
  resolvedReports: number;
  listedProperties: number;
  verifiedViewingRequests: number;
  successfulViewings: number;
  walletAddress: string;
  licenseReference: string;
  profileHash: string;
};

export type ListedProperty = {
  id: string;
  title: string;
  location: string;
  rentKes: number;
  viewingFeeKes: number;
  status: PropertyStatus;
  requests: number;
};

export type VerifiedViewingRequest = {
  id: string;
  property: string;
  tenant: string;
  date: string;
  status: ViewingStatus;
  proof: string;
};

export const agentProfile: AgentProfile = {
  agentId: "AGT-UR-2048",
  name: "Amina Njoroge",
  company: "Amina Realty Group",
  role: "Verified Property Agent",
  location: "Nairobi, Kenya",
  phone: "+254 700 000 000",
  email: "amina@aminarealty.example",
  joinedAt: "12 Mar 2026",
  verificationStatus: "verified",
  trustScore: 96,
  reportCount: 2,
  resolvedReports: 2,
  listedProperties: 12,
  verifiedViewingRequests: 148,
  successfulViewings: 136,
  walletAddress: "GCDK...9X2P",
  licenseReference: "REA-KE-2026-4481",
  profileHash: "agt_0x9f12e5ab4c8d7a63f20b1c44e9aa73f1dc88"
};

export const listedProperties: ListedProperty[] = [
  {
    id: "UR-LST-1001",
    title: "Kilimani Green View Apartment",
    location: "Kilimani, Nairobi",
    rentKes: 85000,
    viewingFeeKes: 500,
    status: "verified",
    requests: 42
  },
  {
    id: "UR-LST-1024",
    title: "Westlands Studio Loft",
    location: "Westlands, Nairobi",
    rentKes: 52000,
    viewingFeeKes: 400,
    status: "verified",
    requests: 29
  },
  {
    id: "UR-LST-1042",
    title: "Lavington Garden Maisonette",
    location: "Lavington, Nairobi",
    rentKes: 145000,
    viewingFeeKes: 700,
    status: "review_needed",
    requests: 18
  },
  {
    id: "UR-LST-1055",
    title: "Runda Family Home",
    location: "Runda, Nairobi",
    rentKes: 280000,
    viewingFeeKes: 1000,
    status: "verified",
    requests: 11
  }
];

export const verifiedViewingRequests: VerifiedViewingRequest[] = [
  {
    id: "REQ-UR-9084",
    property: "Kilimani Green View Apartment",
    tenant: "John Tenant",
    date: "22 Jun, 11:30 AM",
    status: "verified",
    proof: "soro_0x7ab...2c109"
  },
  {
    id: "REQ-UR-9019",
    property: "Westlands Studio Loft",
    tenant: "Maya Tenant",
    date: "21 Jun, 2:00 PM",
    status: "completed",
    proof: "soro_0x3ed...7f991"
  },
  {
    id: "REQ-UR-8976",
    property: "Lavington Garden Maisonette",
    tenant: "Brian Tenant",
    date: "24 Jun, 10:00 AM",
    status: "scheduled",
    proof: "soro_0xa18...4bc22"
  }
];

export const agentStats = [
  {
    label: "Trust score",
    value: "96%",
    helper: "Verified agent rating",
    icon: Star,
    tone: "success"
  },
  {
    label: "Reports",
    value: "2",
    helper: "2 resolved, 0 active",
    icon: Flag,
    tone: "warning"
  },
  {
    label: "Properties",
    value: "12",
    helper: "Active listed properties",
    icon: Building2,
    tone: "success"
  },
  {
    label: "Verified viewings",
    value: "148",
    helper: "Proof-backed requests",
    icon: CalendarCheck2,
    tone: "success"
  }
];

export const verificationChecks = [
  {
    title: "Identity verified",
    description: "Government ID and agent profile match platform records.",
    status: "Passed",
    icon: IdCard
  },
  {
    title: "License checked",
    description: "License reference is linked to the listed company profile.",
    status: "Passed",
    icon: FileCheck2
  },
  {
    title: "Wallet linked",
    description: "Agent wallet is linked to Stellar testnet verification records.",
    status: "Passed",
    icon: WalletCards
  },
  {
    title: "Listing quality",
    description: "Listed properties are reviewed for location and access consistency.",
    status: "Monitored",
    icon: ClipboardCheck
  }
];

export const trustTimeline = [
  {
    title: "Agent profile created",
    description: "Profile and company details submitted.",
    time: "12 Mar 2026",
    icon: UserRound
  },
  {
    title: "Identity verified",
    description: "Identity and license details passed review.",
    time: "14 Mar 2026",
    icon: BadgeCheck
  },
  {
    title: "Wallet linked",
    description: "Stellar testnet wallet added to verification profile.",
    time: "16 Mar 2026",
    icon: WalletCards
  },
  {
    title: "First verified viewing",
    description: "First proof-backed viewing request completed.",
    time: "20 Mar 2026",
    icon: KeyRound
  }
];

export const reportSummary = [
  {
    label: "Total reports",
    value: "2",
    icon: Flag
  },
  {
    label: "Resolved",
    value: "2",
    icon: CheckCircle2
  },
  {
    label: "Active flags",
    value: "0",
    icon: ShieldCheck
  },
  {
    label: "Last review",
    value: "18 Jun",
    icon: Bell
  }
];

export const profileReferences = [
  {
    label: "Agent ID",
    value: "AGT-UR-2048",
    icon: UserCheck
  },
  {
    label: "License",
    value: "REA-KE-2026-4481",
    icon: IdCard
  },
  {
    label: "Wallet",
    value: "GCDK...9X2P",
    icon: WalletCards
  },
  {
    label: "Profile hash",
    value: "agt_0x9f12...1dc88",
    icon: Hash
  },
  {
    label: "Network",
    value: "Stellar Testnet",
    icon: Sparkles
  },
  {
    label: "Verification DB",
    value: "active_record",
    icon: Database
  }
];

export const safetyNotes = [
  {
    title: "Reports are visible but contextual",
    description: "Report count should be shown with resolved and active status, not as a raw accusation.",
    icon: ShieldAlert
  },
  {
    title: "Trust score is not a guarantee",
    description: "Use score language as a platform signal, not a legal promise.",
    icon: Star
  },
  {
    title: "Verified viewing requests matter",
    description: "Proof-backed viewings show completed platform activity.",
    icon: ReceiptText
  },
  {
    title: "Contact through platform first",
    description: "Tenants should prefer verified in-app contact and safe viewing flow.",
    icon: MessageCircle
  }
];

export const contactActions = [
  {
    label: "Message agent",
    icon: MessageCircle
  },
  {
    label: "Call verified number",
    icon: Phone
  },
  {
    label: "Email agent",
    icon: Mail
  },
  {
    label: "Report concern",
    icon: Flag
  }
];

export const trustSignals = [
  {
    label: "Identity",
    value: "Verified",
    icon: BadgeCheck
  },
  {
    label: "Wallet",
    value: "Linked",
    icon: WalletCards
  },
  {
    label: "Listings",
    value: "Monitored",
    icon: Home
  },
  {
    label: "Trend",
    value: "Stable",
    icon: TrendingUp
  }
];
