import {
  AlertTriangle,
  BadgeCheck,
  Bell,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Copy,
  Database,
  DoorOpen,
  Eye,
  FileWarning,
  Flag,
  Hash,
  HelpCircle,
  Home,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  LockKeyhole,
  LogOut,
  MapPin,
  MessageCircle,
  Plus,
  ReceiptText,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  TimerReset,
  TrendingUp,
  UserCheck,
  UserRound,
  UsersRound,
  WalletCards
} from "lucide-react";

export type ListingStatus = "verified" | "review_needed" | "paused";
export type RequestStatus = "new" | "proof_verified" | "scheduled" | "completed" | "needs_action";
export type TenantStatus = "verified" | "pending" | "restricted";
export type HoldStatus = "active" | "released" | "expired" | "disputed";
export type ReportStatus = "submitted" | "under_review" | "resolved" | "escalated";
export type CodeStatus = "active" | "used" | "expired" | "revoked";

export type ManagerProfile = {
  id: string;
  name: string;
  company: string;
  role: string;
  walletAddress: string;
  trustScore: number;
  activeListings: number;
  pendingRequests: number;
  verifiedTenants: number;
  activeHolds: number;
  openReports: number;
};

export type ManagerListing = {
  id: string;
  title: string;
  location: string;
  rentKes: number;
  viewingFeeKes: number;
  status: ListingStatus;
  requests: number;
  verifiedViews: number;
};

export type ViewingRequest = {
  id: string;
  propertyTitle: string;
  tenantName: string;
  tenantId: string;
  requestedAt: string;
  viewingSlot: string;
  status: RequestStatus;
  paymentStatus: "paid" | "held" | "pending";
  proofHash?: string;
};

export type VerifiedTenant = {
  id: string;
  name: string;
  propertyTitle: string;
  verification: TenantStatus;
  lastActivity: string;
  walletAddress: string;
};

export type PaymentHold = {
  id: string;
  propertyTitle: string;
  tenantName: string;
  amountKes: number;
  status: HoldStatus;
  holdUntil: string;
  txHash: string;
};

export type ManagerReport = {
  id: string;
  type: "listing" | "agent" | "payment" | "access";
  propertyTitle: string;
  submittedBy: string;
  status: ReportStatus;
  submittedAt: string;
};

export type ViewingCode = {
  id: string;
  propertyTitle: string;
  tenantName: string;
  code: string;
  status: CodeStatus;
  expiresAt: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "listing" | "request" | "payment" | "proof" | "report";
};

export const managerProfile: ManagerProfile = {
  id: "MGR-UR-4408",
  name: "Amina Realty Group",
  company: "Amina Realty Group",
  role: "Verified Property Manager",
  walletAddress: "GCDK...9X2P",
  trustScore: 94,
  activeListings: 12,
  pendingRequests: 7,
  verifiedTenants: 36,
  activeHolds: 5,
  openReports: 2
};

export const managerListings: ManagerListing[] = [
  {
    id: "UR-LST-1001",
    title: "Kilimani Green View Apartment",
    location: "Kilimani, Nairobi",
    rentKes: 85000,
    viewingFeeKes: 500,
    status: "verified",
    requests: 42,
    verifiedViews: 31
  },
  {
    id: "UR-LST-1024",
    title: "Westlands Studio Loft",
    location: "Westlands, Nairobi",
    rentKes: 52000,
    viewingFeeKes: 400,
    status: "verified",
    requests: 29,
    verifiedViews: 18
  },
  {
    id: "UR-LST-1042",
    title: "Lavington Garden Maisonette",
    location: "Lavington, Nairobi",
    rentKes: 145000,
    viewingFeeKes: 700,
    status: "review_needed",
    requests: 18,
    verifiedViews: 9
  },
  {
    id: "UR-LST-1055",
    title: "Runda Family Home",
    location: "Runda, Nairobi",
    rentKes: 280000,
    viewingFeeKes: 1000,
    status: "paused",
    requests: 11,
    verifiedViews: 4
  }
];

export const viewingRequests: ViewingRequest[] = [
  {
    id: "REQ-UR-9084",
    propertyTitle: "Kilimani Green View Apartment",
    tenantName: "John Tenant",
    tenantId: "TNT-UR-1188",
    requestedAt: "Today, 10:04 AM",
    viewingSlot: "22 Jun, 11:30 AM",
    status: "proof_verified",
    paymentStatus: "held",
    proofHash: "soro_0x7ab...2c109"
  },
  {
    id: "REQ-UR-9121",
    propertyTitle: "Westlands Studio Loft",
    tenantName: "Maya Tenant",
    tenantId: "TNT-UR-1260",
    requestedAt: "Today, 12:18 PM",
    viewingSlot: "23 Jun, 2:00 PM",
    status: "scheduled",
    paymentStatus: "paid",
    proofHash: "soro_0x3ed...7f991"
  },
  {
    id: "REQ-UR-9146",
    propertyTitle: "Lavington Garden Maisonette",
    tenantName: "Brian Tenant",
    tenantId: "TNT-UR-1309",
    requestedAt: "Yesterday, 5:41 PM",
    viewingSlot: "24 Jun, 10:00 AM",
    status: "needs_action",
    paymentStatus: "pending"
  }
];

export const verifiedTenants: VerifiedTenant[] = [
  {
    id: "TNT-UR-1188",
    name: "John Tenant",
    propertyTitle: "Kilimani Green View Apartment",
    verification: "verified",
    lastActivity: "2 min ago",
    walletAddress: "GCB7...22LP"
  },
  {
    id: "TNT-UR-1260",
    name: "Maya Tenant",
    propertyTitle: "Westlands Studio Loft",
    verification: "verified",
    lastActivity: "18 min ago",
    walletAddress: "GDA4...9Q81"
  },
  {
    id: "TNT-UR-1309",
    name: "Brian Tenant",
    propertyTitle: "Lavington Garden Maisonette",
    verification: "pending",
    lastActivity: "1 hr ago",
    walletAddress: "GFC8...17VR"
  }
];

export const paymentHolds: PaymentHold[] = [
  {
    id: "ESC-UR-7201",
    propertyTitle: "Kilimani Green View Apartment",
    tenantName: "John Tenant",
    amountKes: 500,
    status: "active",
    holdUntil: "22 Jun, 12:30 PM",
    txHash: "4f7a8b2c...b3c4d5"
  },
  {
    id: "ESC-UR-7195",
    propertyTitle: "Westlands Studio Loft",
    tenantName: "Maya Tenant",
    amountKes: 400,
    status: "released",
    holdUntil: "Released today",
    txHash: "8d2a1f0c...91e77a"
  },
  {
    id: "ESC-UR-7168",
    propertyTitle: "Lavington Garden Maisonette",
    tenantName: "Brian Tenant",
    amountKes: 700,
    status: "disputed",
    holdUntil: "Under review",
    txHash: "92fa31cd...09d71e"
  }
];

export const managerReports: ManagerReport[] = [
  {
    id: "RPT-UR-3310",
    type: "payment",
    propertyTitle: "Westlands Studio Loft",
    submittedBy: "Maya Tenant",
    status: "under_review",
    submittedAt: "18 Jun"
  },
  {
    id: "RPT-UR-3291",
    type: "listing",
    propertyTitle: "Runda Family Home",
    submittedBy: "Anonymous tenant",
    status: "escalated",
    submittedAt: "14 Jun"
  },
  {
    id: "RPT-UR-3287",
    type: "access",
    propertyTitle: "Kilimani Green View Apartment",
    submittedBy: "John Tenant",
    status: "resolved",
    submittedAt: "12 Jun"
  }
];

export const viewingCodes: ViewingCode[] = [
  {
    id: "CODE-UR-4829",
    propertyTitle: "Kilimani Green View Apartment",
    tenantName: "John Tenant",
    code: "UR-4829-LOCK",
    status: "active",
    expiresAt: "22 Jun, 12:30 PM"
  },
  {
    id: "CODE-UR-4630",
    propertyTitle: "Westlands Studio Loft",
    tenantName: "Maya Tenant",
    code: "UR-4630-OPEN",
    status: "used",
    expiresAt: "Used today"
  },
  {
    id: "CODE-UR-4397",
    propertyTitle: "Lavington Garden Maisonette",
    tenantName: "Brian Tenant",
    code: "UR-4397-WAIT",
    status: "expired",
    expiresAt: "Expired yesterday"
  }
];

export const recentActivity: ActivityItem[] = [
  {
    id: "ACT-1001",
    title: "Proof verified",
    description: "John Tenant proof verified for Kilimani Green View Apartment.",
    time: "2 min ago",
    type: "proof"
  },
  {
    id: "ACT-1002",
    title: "Payment hold activated",
    description: "KES 500 hold became active for REQ-UR-9084.",
    time: "8 min ago",
    type: "payment"
  },
  {
    id: "ACT-1003",
    title: "New viewing request",
    description: "Brian Tenant requested Lavington Garden Maisonette.",
    time: "1 hr ago",
    type: "request"
  },
  {
    id: "ACT-1004",
    title: "Report escalated",
    description: "Runda Family Home listing report requires review.",
    time: "4 hrs ago",
    type: "report"
  }
];

export const dashboardStats = [
  {
    label: "Active listings",
    value: "12",
    helper: "10 verified, 1 review, 1 paused",
    icon: Building2,
    tone: "success"
  },
  {
    label: "Viewing requests",
    value: "7",
    helper: "3 awaiting manager action",
    icon: CalendarCheck2,
    tone: "warning"
  },
  {
    label: "Verified tenants",
    value: "36",
    helper: "Proof-backed tenant activity",
    icon: UsersRound,
    tone: "success"
  },
  {
    label: "Payment holds",
    value: "5",
    helper: "Active escrow/payment holds",
    icon: ReceiptText,
    tone: "warning"
  },
  {
    label: "Viewing codes",
    value: "9",
    helper: "4 active, 3 used, 2 expired",
    icon: KeyRound,
    tone: "success"
  },
  {
    label: "Trust score",
    value: "94%",
    helper: "Manager trust profile",
    icon: Star,
    tone: "success"
  }
];

export const quickActions = [
  {
    label: "Add new listing",
    description: "Create a verified property listing.",
    href: "/manager/listings/new",
    icon: Plus
  },
  {
    label: "Review requests",
    description: "Approve or schedule tenant viewing requests.",
    href: "/manager/requests",
    icon: ListChecks
  },
  {
    label: "Manage viewing codes",
    description: "View active, used, and expired access codes.",
    href: "/manager/viewing-codes",
    icon: KeyRound
  },
  {
    label: "Open report center",
    description: "Review suspicious listing, payment, and access reports.",
    href: "/manager/reports",
    icon: ShieldAlert
  }
];

export const managerFlowSteps = [
  {
    title: "Listing verified",
    description: "Property details and manager profile were reviewed.",
    status: "Complete",
    icon: Building2
  },
  {
    title: "Tenant payment received",
    description: "Viewing fee payment is attached to a request.",
    status: "Complete",
    icon: WalletCards
  },
  {
    title: "Proof accepted",
    description: "Tenant proof is verified before access unlocks.",
    status: "Complete",
    icon: ShieldCheck
  },
  {
    title: "Viewing code active",
    description: "Tenant access code is active for the scheduled slot.",
    status: "Active",
    icon: DoorOpen
  }
];

export const sidebarItems = [
  { label: "Dashboard", href: "/manager/dashboard", icon: LayoutDashboard, active: true },
  { label: "Listings", href: "/manager/listings", icon: Building2 },
  { label: "Requests", href: "/manager/requests", icon: CalendarCheck2 },
  { label: "Verified Tenants", href: "/manager/tenants", icon: UsersRound },
  { label: "Payment Holds", href: "/manager/payment-holds", icon: ReceiptText },
  { label: "Viewing Codes", href: "/manager/viewing-codes", icon: KeyRound },
  { label: "Reports", href: "/manager/reports", icon: Flag },
  { label: "Messages", href: "/manager/messages", icon: MessageCircle },
  { label: "Trust Score", href: "/manager/trust-score", icon: Star },
  { label: "Settings", href: "/manager/settings", icon: Settings },
  { label: "Support", href: "/support", icon: HelpCircle }
];

export const statusVisuals = {
  listing: {
    verified: { label: "Verified", variant: "success", icon: ShieldCheck },
    review_needed: { label: "Review needed", variant: "warning", icon: AlertTriangle },
    paused: { label: "Paused", variant: "danger", icon: LockKeyhole }
  },
  request: {
    new: { label: "New", variant: "warning", icon: Bell },
    proof_verified: { label: "Proof verified", variant: "success", icon: ShieldCheck },
    scheduled: { label: "Scheduled", variant: "success", icon: CalendarCheck2 },
    completed: { label: "Completed", variant: "success", icon: CheckCircle2 },
    needs_action: { label: "Needs action", variant: "danger", icon: AlertTriangle }
  },
  tenant: {
    verified: { label: "Verified", variant: "success", icon: UserCheck },
    pending: { label: "Pending", variant: "warning", icon: TimerReset },
    restricted: { label: "Restricted", variant: "danger", icon: ShieldAlert }
  },
  hold: {
    active: { label: "Active", variant: "warning", icon: ReceiptText },
    released: { label: "Released", variant: "success", icon: CheckCircle2 },
    expired: { label: "Expired", variant: "danger", icon: Clock3 },
    disputed: { label: "Disputed", variant: "danger", icon: AlertTriangle }
  },
  report: {
    submitted: { label: "Submitted", variant: "neutral", icon: Flag },
    under_review: { label: "Under review", variant: "warning", icon: FileWarning },
    resolved: { label: "Resolved", variant: "success", icon: CheckCircle2 },
    escalated: { label: "Escalated", variant: "danger", icon: ShieldAlert }
  },
  code: {
    active: { label: "Active", variant: "success", icon: KeyRound },
    used: { label: "Used", variant: "neutral", icon: CheckCircle2 },
    expired: { label: "Expired", variant: "danger", icon: TimerReset },
    revoked: { label: "Revoked", variant: "danger", icon: LockKeyhole }
  }
} as const;

export const auditReferences = [
  {
    label: "Manager ID",
    value: "MGR-UR-4408",
    icon: UserRound
  },
  {
    label: "Active listing",
    value: "UR-LST-1001",
    icon: Building2
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
    label: "Active proof",
    value: "soro_0x7ab...2c109",
    icon: LockKeyhole
  },
  {
    label: "Audit DB",
    value: "manager_flow_active",
    icon: Database
  }
];

export const safetyRules = [
  {
    title: "Do not unlock access manually",
    description: "Access should unlock after verified payment and proof status only.",
    icon: KeyRound
  },
  {
    title: "Keep listing details accurate",
    description: "Wrong location, photos, or fees increase reports and reduce trust score.",
    icon: Building2
  },
  {
    title: "Review reports quickly",
    description: "Payment, access, or listing reports should be addressed before more viewings.",
    icon: Flag
  },
  {
    title: "Use platform communication",
    description: "Keep tenant communication inside verified UrbanRentisha channels.",
    icon: MessageCircle
  }
];
