import {
  AlertTriangle,
  BadgeCheck,
  Bell,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Code2,
  Copy,
  Database,
  Download,
  Eye,
  FileCheck2,
  FileSearch,
  FileWarning,
  Filter,
  Flag,
  Gauge,
  Hash,
  HelpCircle,
  Home,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  LockKeyhole,
  LogOut,
  MessageCircle,
  Network,
  RefreshCcw,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  TimerReset,
  UserCheck,
  UserRound,
  UsersRound,
  WalletCards,
  XCircle
} from "lucide-react";

export type AuditEventType =
  | "proof_verified"
  | "payment_received"
  | "viewing_code_unlocked"
  | "listing_approved"
  | "agent_verified"
  | "report_submitted"
  | "suspicious_activity"
  | "access_revoked"
  | "system_update";

export type AuditSeverity = "info" | "success" | "warning" | "critical";
export type AuditActorType = "system" | "admin" | "tenant" | "agent" | "contract";
export type AuditIntegrity = "verified" | "pending" | "flagged";

export type AuditEvent = {
  id: string;
  type: AuditEventType;
  title: string;
  description: string;
  actor: string;
  actorType: AuditActorType;
  target: string;
  targetType: "request" | "listing" | "agent" | "payment" | "proof" | "report" | "viewing_code" | "system";
  severity: AuditSeverity;
  integrity: AuditIntegrity;
  timestamp: string;
  dateGroup: "Today" | "Yesterday" | "Earlier";
  txHash?: string;
  proofHash?: string;
  requestId?: string;
  listingId?: string;
  ipAddress?: string;
};

export type AuditStat = {
  label: string;
  value: string;
  helper: string;
  tone: "success" | "warning" | "danger" | "neutral";
  icon: typeof Database;
};

export const auditStats: AuditStat[] = [
  {
    label: "Total events",
    value: "14.2K",
    helper: "System-wide trust activity",
    tone: "neutral",
    icon: Database
  },
  {
    label: "Verified events",
    value: "98.7%",
    helper: "Integrity checked records",
    tone: "success",
    icon: ShieldCheck
  },
  {
    label: "Proof events",
    value: "2,842",
    helper: "ZK/Soroban proof history",
    tone: "success",
    icon: LockKeyhole
  },
  {
    label: "Report events",
    value: "431",
    helper: "Fake listing and payment reports",
    tone: "warning",
    icon: Flag
  },
  {
    label: "Critical flags",
    value: "7",
    helper: "Needs trust-ops attention",
    tone: "danger",
    icon: ShieldAlert
  },
  {
    label: "Export ready",
    value: "CSV",
    helper: "Filtered audit export",
    tone: "success",
    icon: Download
  }
];

export const auditEvents: AuditEvent[] = [
  {
    id: "AUD-UR-5510",
    type: "proof_verified",
    title: "Proof verification accepted",
    description:
      "Tenant payment proof was verified through the trust verification flow before viewing access was unlocked.",
    actor: "system/verifier",
    actorType: "system",
    target: "REQ-UR-9084",
    targetType: "proof",
    severity: "success",
    integrity: "verified",
    timestamp: "Today, 10:31 AM",
    dateGroup: "Today",
    txHash: "4f7a8b2c0ae9b3c4d5f611e8a92f001b",
    proofHash: "soro_0x7ab42d3c...2c109",
    requestId: "REQ-UR-9084",
    listingId: "UR-LST-1001",
    ipAddress: "system"
  },
  {
    id: "AUD-UR-5509",
    type: "viewing_code_unlocked",
    title: "Viewing code unlocked",
    description:
      "A viewing code was generated after proof verification and payment-hold validation.",
    actor: "system/access-service",
    actorType: "system",
    target: "CODE-UR-4829",
    targetType: "viewing_code",
    severity: "success",
    integrity: "verified",
    timestamp: "Today, 10:32 AM",
    dateGroup: "Today",
    txHash: "7b2a99fd1c3a71e0b119f82c221d05c7",
    proofHash: "soro_0x7ab42d3c...2c109",
    requestId: "REQ-UR-9084",
    listingId: "UR-LST-1001",
    ipAddress: "system"
  },
  {
    id: "AUD-UR-5508",
    type: "report_submitted",
    title: "Unsafe payment report escalated",
    description:
      "A tenant reported that an agent requested off-platform payment outside the verified flow.",
    actor: "admin@urbanrentisha",
    actorType: "admin",
    target: "RPT-UR-4418",
    targetType: "report",
    severity: "critical",
    integrity: "verified",
    timestamp: "Today, 10:13 AM",
    dateGroup: "Today",
    requestId: "REQ-UR-9121",
    listingId: "UR-LST-1024",
    ipAddress: "102.214.88.19"
  },
  {
    id: "AUD-UR-5502",
    type: "listing_approved",
    title: "Property document approved",
    description:
      "Admin completed document review and approved the listing verification record.",
    actor: "admin@urbanrentisha",
    actorType: "admin",
    target: "APP-UR-9003",
    targetType: "listing",
    severity: "success",
    integrity: "verified",
    timestamp: "Today, 9:22 AM",
    dateGroup: "Today",
    listingId: "UR-LST-1024",
    ipAddress: "102.214.88.19"
  },
  {
    id: "AUD-UR-5498",
    type: "suspicious_activity",
    title: "Duplicate listing image hash detected",
    description:
      "Risk engine detected image reuse across two active rental listings with different managers.",
    actor: "system/risk-engine",
    actorType: "system",
    target: "SUS-UR-6998",
    targetType: "system",
    severity: "warning",
    integrity: "flagged",
    timestamp: "Yesterday, 5:45 PM",
    dateGroup: "Yesterday",
    listingId: "UR-LST-1220",
    ipAddress: "system"
  },
  {
    id: "AUD-UR-5484",
    type: "payment_received",
    title: "Viewing fee payment received",
    description:
      "Stellar testnet payment was attached to a viewing request and marked ready for proof generation.",
    actor: "tenant_wallet/GCB7...22LP",
    actorType: "tenant",
    target: "PAY-UR-7201",
    targetType: "payment",
    severity: "info",
    integrity: "verified",
    timestamp: "Yesterday, 2:30 PM",
    dateGroup: "Yesterday",
    txHash: "8d2a1f0c7119bbcc28d091e77a88951e",
    requestId: "REQ-UR-9084",
    listingId: "UR-LST-1001",
    ipAddress: "wallet"
  },
  {
    id: "AUD-UR-5470",
    type: "agent_verified",
    title: "Agent profile verified",
    description:
      "Agent identity and business profile were verified and moved to active status.",
    actor: "admin@urbanrentisha",
    actorType: "admin",
    target: "AGT-UR-2048",
    targetType: "agent",
    severity: "success",
    integrity: "verified",
    timestamp: "Earlier, 14 Jun 2026",
    dateGroup: "Earlier",
    ipAddress: "102.214.88.19"
  },
  {
    id: "AUD-UR-5466",
    type: "access_revoked",
    title: "Viewing access revoked",
    description:
      "Viewing code was revoked after a suspicious payment mismatch was detected.",
    actor: "system/access-service",
    actorType: "system",
    target: "CODE-UR-4397",
    targetType: "viewing_code",
    severity: "critical",
    integrity: "verified",
    timestamp: "Earlier, 13 Jun 2026",
    dateGroup: "Earlier",
    requestId: "REQ-UR-9146",
    listingId: "UR-LST-1042",
    ipAddress: "system"
  }
];

export const trustActivity = [
  {
    id: "TRUST-001",
    title: "Proof-backed access flow",
    description: "Verified payment proof unlocked a viewing code for REQ-UR-9084.",
    icon: LockKeyhole,
    tone: "success",
    reference: "soro_0x7ab...2c109"
  },
  {
    id: "TRUST-002",
    title: "Report safety triage",
    description: "Unsafe payment report moved to escalated status.",
    icon: Flag,
    tone: "danger",
    reference: "RPT-UR-4418"
  },
  {
    id: "TRUST-003",
    title: "Listing verification",
    description: "Document approval changed listing to verified.",
    icon: Building2,
    tone: "success",
    reference: "UR-LST-1024"
  },
  {
    id: "TRUST-004",
    title: "Risk engine flag",
    description: "Duplicate listing image hash requires admin review.",
    icon: ShieldAlert,
    tone: "warning",
    reference: "SUS-UR-6998"
  }
];

export const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Audit Log", href: "/audit-log", icon: Database, active: true },
  { label: "Approvals", href: "/admin/approvals", icon: ClipboardCheck },
  { label: "Reports", href: "/admin/reports", icon: Flag },
  { label: "Agents", href: "/admin/agents", icon: UsersRound },
  { label: "Proof Activity", href: "/admin/proofs", icon: LockKeyhole },
  { label: "Risk Queue", href: "/admin/risk", icon: ShieldAlert },
  { label: "Analytics", href: "/admin/analytics", icon: Gauge },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Support", href: "/support", icon: HelpCircle }
];

export const eventTypeLabels: Record<AuditEventType, string> = {
  proof_verified: "Proof verified",
  payment_received: "Payment received",
  viewing_code_unlocked: "Viewing code unlocked",
  listing_approved: "Listing approved",
  agent_verified: "Agent verified",
  report_submitted: "Report submitted",
  suspicious_activity: "Suspicious activity",
  access_revoked: "Access revoked",
  system_update: "System update"
};

export const statusVisuals = {
  severity: {
    info: { label: "Info", variant: "neutral", icon: Bell },
    success: { label: "Success", variant: "success", icon: CheckCircle2 },
    warning: { label: "Warning", variant: "warning", icon: AlertTriangle },
    critical: { label: "Critical", variant: "danger", icon: ShieldAlert }
  },
  integrity: {
    verified: { label: "Verified", variant: "success", icon: ShieldCheck },
    pending: { label: "Pending", variant: "warning", icon: TimerReset },
    flagged: { label: "Flagged", variant: "danger", icon: AlertTriangle }
  },
  eventTypeIcon: {
    proof_verified: LockKeyhole,
    payment_received: WalletCards,
    viewing_code_unlocked: KeyRound,
    listing_approved: Building2,
    agent_verified: UserCheck,
    report_submitted: Flag,
    suspicious_activity: ShieldAlert,
    access_revoked: XCircle,
    system_update: RefreshCcw
  }
} as const;

export const auditFilterTabs = [
  "All events",
  "Proofs",
  "Payments",
  "Reports",
  "Access",
  "Listings",
  "Agents",
  "Critical"
];

export const selectedEvent = auditEvents[0];

export const auditExportOptions = [
  {
    label: "Export CSV",
    description: "Download filtered audit rows.",
    icon: Download
  },
  {
    label: "Copy event ID",
    description: "Copy selected event reference.",
    icon: Copy
  },
  {
    label: "Refresh logs",
    description: "Pull latest trust activity.",
    icon: RefreshCcw
  }
];
