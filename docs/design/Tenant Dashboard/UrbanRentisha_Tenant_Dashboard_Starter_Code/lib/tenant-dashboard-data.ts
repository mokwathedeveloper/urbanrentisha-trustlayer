import {
  AlertTriangle,
  BadgeCheck,
  Bell,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Copy,
  Database,
  DoorOpen,
  Eye,
  FileWarning,
  Flag,
  Hash,
  Heart,
  HelpCircle,
  Home,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  MapPin,
  MessageCircle,
  ReceiptText,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UserRound,
  WalletCards
} from "lucide-react";

export type PaymentStatus = "not_started" | "pending" | "paid" | "held" | "refunded";
export type ProofStatus = "not_generated" | "generating" | "generated" | "verified" | "failed";
export type HoldStatus = "none" | "active" | "released" | "expired" | "refunded";
export type ViewingCodeStatus = "locked" | "unlocked" | "expired";
export type RequestStatus = "in_progress" | "ready" | "completed" | "attention";
export type ReportStatus = "submitted" | "reviewed" | "resolved";
export type NotificationType = "payment" | "proof" | "access" | "report" | "viewing-code";

export type TenantProfile = {
  id: string;
  name: string;
  role: string;
  walletAddress: string;
  accountStatus: "Verified tenant";
  activeRequests: number;
  unreadNotifications: number;
  completedViewings: number;
};

export type TenantRequest = {
  id: string;
  propertyId: string;
  propertyTitle: string;
  location: string;
  agentName: string;
  requestedAt: string;
  viewingDate: string;
  viewingTime: string;
  paymentAmountKes: number;
  paymentStatus: PaymentStatus;
  proofStatus: ProofStatus;
  holdStatus: HoldStatus;
  viewingCodeStatus: ViewingCodeStatus;
  requestStatus: RequestStatus;
  viewingCode?: string;
  txHash?: string;
  proofHash?: string;
};

export type ViewingHistoryItem = {
  id: string;
  propertyTitle: string;
  location: string;
  date: string;
  agentName: string;
  status: "completed" | "cancelled" | "expired";
  proofReference: string;
};

export type TenantNotification = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  href: string;
};

export type TenantReport = {
  id: string;
  propertyTitle: string;
  reason: string;
  status: ReportStatus;
  submittedAt: string;
};

export const tenantProfile: TenantProfile = {
  id: "TNT-UR-1188",
  name: "John Tenant",
  role: "Verified Tenant",
  walletAddress: "GCDK...9X2P",
  accountStatus: "Verified tenant",
  activeRequests: 3,
  unreadNotifications: 5,
  completedViewings: 8
};

export const tenantRequests: TenantRequest[] = [
  {
    id: "REQ-UR-9084",
    propertyId: "UR-LST-1001",
    propertyTitle: "Kilimani Green View Apartment",
    location: "Kilimani, Nairobi",
    agentName: "Amina Njoroge",
    requestedAt: "Today, 10:04 AM",
    viewingDate: "22 Jun 2026",
    viewingTime: "11:30 AM",
    paymentAmountKes: 500,
    paymentStatus: "paid",
    proofStatus: "verified",
    holdStatus: "active",
    viewingCodeStatus: "unlocked",
    requestStatus: "ready",
    viewingCode: "UR-4829-LOCK",
    txHash: "4f7a8b2c...b3c4d5",
    proofHash: "soro_0x7ab...2c109"
  },
  {
    id: "REQ-UR-9121",
    propertyId: "UR-LST-1024",
    propertyTitle: "Westlands Studio Loft",
    location: "Westlands, Nairobi",
    agentName: "Daniel Mwangi",
    requestedAt: "Today, 12:18 PM",
    viewingDate: "23 Jun 2026",
    viewingTime: "2:00 PM",
    paymentAmountKes: 400,
    paymentStatus: "held",
    proofStatus: "generated",
    holdStatus: "active",
    viewingCodeStatus: "locked",
    requestStatus: "in_progress",
    txHash: "8d2a1f0c...91e77a",
    proofHash: "zkp_0x8fe...a12cc"
  },
  {
    id: "REQ-UR-9146",
    propertyId: "UR-LST-1042",
    propertyTitle: "Lavington Garden Maisonette",
    location: "Lavington, Nairobi",
    agentName: "Faith Wanjiku",
    requestedAt: "Yesterday, 5:41 PM",
    viewingDate: "24 Jun 2026",
    viewingTime: "10:00 AM",
    paymentAmountKes: 700,
    paymentStatus: "pending",
    proofStatus: "not_generated",
    holdStatus: "none",
    viewingCodeStatus: "locked",
    requestStatus: "attention"
  }
];

export const viewingHistory: ViewingHistoryItem[] = [
  {
    id: "HST-UR-7001",
    propertyTitle: "Parklands One Bedroom",
    location: "Parklands, Nairobi",
    date: "18 Jun 2026",
    agentName: "Kevin Otieno",
    status: "completed",
    proofReference: "soro_0x21e...90fa1"
  },
  {
    id: "HST-UR-6968",
    propertyTitle: "Ngong Road Bedsitter",
    location: "Ngong Road, Nairobi",
    date: "14 Jun 2026",
    agentName: "Grace Muthoni",
    status: "completed",
    proofReference: "soro_0x4ab...d9e21"
  },
  {
    id: "HST-UR-6882",
    propertyTitle: "Kileleshwa Studio",
    location: "Kileleshwa, Nairobi",
    date: "9 Jun 2026",
    agentName: "Amina Njoroge",
    status: "expired",
    proofReference: "soro_0xb91...2af10"
  }
];

export const tenantNotifications: TenantNotification[] = [
  {
    id: "NTF-1001",
    type: "viewing-code",
    title: "Viewing code unlocked",
    description: "Your code for Kilimani Green View Apartment is ready.",
    time: "2 min ago",
    unread: true,
    href: "/viewing-code/REQ-UR-9084"
  },
  {
    id: "NTF-1002",
    type: "proof",
    title: "Proof verified",
    description: "Soroban verification accepted the payment proof.",
    time: "6 min ago",
    unread: true,
    href: "/proof-verification/REQ-UR-9084"
  },
  {
    id: "NTF-1003",
    type: "payment",
    title: "Payment hold active",
    description: "Reservation hold is active for Westlands Studio Loft.",
    time: "22 min ago",
    unread: true,
    href: "/payment-hold/REQ-UR-9121"
  },
  {
    id: "NTF-1004",
    type: "report",
    title: "Report reviewed",
    description: "Your report for Westlands Studio Loft was reviewed.",
    time: "1 hr ago",
    unread: false,
    href: "/reports/RPT-UR-3310"
  }
];

export const tenantReports: TenantReport[] = [
  {
    id: "RPT-UR-3310",
    propertyTitle: "Westlands Studio Loft",
    reason: "Agent requested off-platform payment",
    status: "reviewed",
    submittedAt: "18 Jun 2026"
  },
  {
    id: "RPT-UR-3291",
    propertyTitle: "Ngong Road Bedsitter",
    reason: "Location mismatch",
    status: "resolved",
    submittedAt: "12 Jun 2026"
  }
];

export const dashboardStats = [
  {
    label: "Active requests",
    value: "3",
    helper: "2 active, 1 needs action",
    icon: CalendarCheck2,
    tone: "success"
  },
  {
    label: "Payment statuses",
    value: "2",
    helper: "Paid or held requests",
    icon: WalletCards,
    tone: "success"
  },
  {
    label: "Verified proofs",
    value: "1",
    helper: "Soroban accepted",
    icon: ShieldCheck,
    tone: "success"
  },
  {
    label: "Notifications",
    value: "5",
    helper: "Unread trust-flow updates",
    icon: Bell,
    tone: "warning"
  }
];

export const quickActions = [
  {
    label: "Find verified property",
    description: "Search properties with verified listing badges.",
    href: "/listings",
    icon: Search
  },
  {
    label: "Open viewing code",
    description: "Go to the latest unlocked viewing code.",
    href: "/viewing-code/REQ-UR-9084",
    icon: KeyRound
  },
  {
    label: "View payment hold",
    description: "Check the reservation and hold status.",
    href: "/payment-hold/REQ-UR-9084",
    icon: ReceiptText
  },
  {
    label: "Report suspicious listing",
    description: "Submit a safety report for suspicious activity.",
    href: "/report-listing/UR-LST-1001",
    icon: Flag
  }
];

export const trustFlowSteps = [
  {
    title: "Request created",
    description: "Tenant requested verified viewing.",
    status: "Complete",
    icon: CalendarCheck2
  },
  {
    title: "Payment received",
    description: "Viewing fee payment matched request.",
    status: "Complete",
    icon: WalletCards
  },
  {
    title: "Proof verified",
    description: "Private proof accepted on verification layer.",
    status: "Complete",
    icon: ShieldCheck
  },
  {
    title: "Access unlocked",
    description: "Viewing code is active for the scheduled slot.",
    status: "Active",
    icon: DoorOpen
  }
];

export const sidebarItems = [
  { label: "Dashboard", href: "/tenant/dashboard", icon: LayoutDashboard, active: true },
  { label: "Properties", href: "/listings", icon: Home },
  { label: "Requests", href: "/tenant/requests", icon: CalendarCheck2 },
  { label: "Payments", href: "/tenant/payments", icon: WalletCards },
  { label: "Proofs", href: "/tenant/proofs", icon: LockKeyhole },
  { label: "Viewing Codes", href: "/tenant/viewing-codes", icon: KeyRound },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Reports", href: "/reports", icon: Flag },
  { label: "History", href: "/tenant/history", icon: Clock3 },
  { label: "Saved", href: "/tenant/saved", icon: Heart },
  { label: "Support", href: "/support", icon: HelpCircle }
];

export const statusVisuals = {
  payment: {
    paid: { label: "Paid", variant: "success", icon: CheckCircle2 },
    held: { label: "Held", variant: "warning", icon: ReceiptText },
    pending: { label: "Pending", variant: "warning", icon: TimerReset },
    not_started: { label: "Not started", variant: "neutral", icon: Clock3 },
    refunded: { label: "Refunded", variant: "neutral", icon: WalletCards }
  },
  proof: {
    verified: { label: "Verified", variant: "success", icon: ShieldCheck },
    generated: { label: "Generated", variant: "warning", icon: LockKeyhole },
    generating: { label: "Generating", variant: "warning", icon: TimerReset },
    not_generated: { label: "Not generated", variant: "neutral", icon: Clock3 },
    failed: { label: "Failed", variant: "danger", icon: AlertTriangle }
  },
  hold: {
    active: { label: "Active hold", variant: "warning", icon: ReceiptText },
    released: { label: "Released", variant: "success", icon: CheckCircle2 },
    expired: { label: "Expired", variant: "danger", icon: AlertTriangle },
    refunded: { label: "Refunded", variant: "neutral", icon: WalletCards },
    none: { label: "No hold", variant: "neutral", icon: Clock3 }
  },
  code: {
    unlocked: { label: "Unlocked", variant: "success", icon: KeyRound },
    locked: { label: "Locked", variant: "warning", icon: LockKeyhole },
    expired: { label: "Expired", variant: "danger", icon: TimerReset }
  }
} as const;

export const safetyRules = [
  {
    title: "Use platform payments only",
    description: "Do not send money outside UrbanRentisha when requesting a viewing.",
    icon: WalletCards
  },
  {
    title: "Check proof and access status",
    description: "Viewing access should unlock only after payment and proof verification.",
    icon: ShieldCheck
  },
  {
    title: "Keep viewing codes private",
    description: "Share a viewing code only with the verified agent or access desk.",
    icon: KeyRound
  },
  {
    title: "Report suspicious behaviour",
    description: "Use the report flow if an agent asks for extra payment or unsafe access.",
    icon: ShieldAlert
  }
];

export const auditReferences = [
  {
    label: "Tenant ID",
    value: "TNT-UR-1188",
    icon: UserRound
  },
  {
    label: "Active request",
    value: "REQ-UR-9084",
    icon: CalendarCheck2
  },
  {
    label: "Network",
    value: "Stellar Testnet",
    icon: Sparkles
  },
  {
    label: "Latest TX",
    value: "4f7a8b2c...b3c4d5",
    icon: Hash
  },
  {
    label: "Proof",
    value: "soro_0x7ab...2c109",
    icon: LockKeyhole
  },
  {
    label: "Audit DB",
    value: "tenant_flow_active",
    icon: Database
  }
];
