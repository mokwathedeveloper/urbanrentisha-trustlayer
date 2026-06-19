import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  Bell,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Code2,
  Database,
  Eye,
  FileCheck2,
  FileSearch,
  FileWarning,
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
  WalletCards,
  XCircle
} from "lucide-react";

export type ApprovalStatus = "pending" | "approved" | "rejected" | "needs_review";
export type ReportSeverity = "low" | "medium" | "high" | "critical";
export type AgentStatus = "verified" | "pending" | "restricted" | "suspended";
export type ProofStatus = "verified" | "failed" | "queued" | "review";
export type SuspiciousStatus = "open" | "investigating" | "blocked" | "resolved";
export type AuditAction = "approval" | "proof" | "report" | "agent" | "system";
export type AnalyticsTone = "success" | "warning" | "danger" | "neutral";

export type AdminProfile = {
  id: string;
  name: string;
  role: string;
  accessLevel: string;
  walletAddress: string;
  pendingApprovals: number;
  openReports: number;
  suspiciousFlags: number;
  proofVerifications: number;
  activeAgents: number;
};

export type PlatformApproval = {
  id: string;
  type: "listing" | "agent" | "property_document" | "api_partner";
  title: string;
  submittedBy: string;
  submittedAt: string;
  status: ApprovalStatus;
  riskScore: number;
};

export type PlatformReport = {
  id: string;
  type: "fake_listing" | "unsafe_payment" | "agent_mismatch" | "access_issue";
  title: string;
  submittedBy: string;
  createdAt: string;
  severity: ReportSeverity;
  status: "new" | "under_review" | "escalated" | "resolved";
};

export type AgentRecord = {
  id: string;
  name: string;
  company: string;
  status: AgentStatus;
  trustScore: number;
  reports: number;
  listedProperties: number;
};

export type ProofActivity = {
  id: string;
  requestId: string;
  tenant: string;
  listing: string;
  status: ProofStatus;
  network: "Stellar Testnet" | "Soroban";
  proofHash: string;
  time: string;
};

export type SuspiciousActivity = {
  id: string;
  title: string;
  actor: string;
  source: string;
  status: SuspiciousStatus;
  riskScore: number;
  detectedAt: string;
};

export type AuditLog = {
  id: string;
  action: AuditAction;
  actor: string;
  description: string;
  reference: string;
  time: string;
};

export type AnalyticsMetric = {
  label: string;
  value: string;
  helper: string;
  tone: AnalyticsTone;
  icon: typeof LayoutDashboard;
};

export const adminProfile: AdminProfile = {
  id: "ADM-UR-001",
  name: "Platform Admin",
  role: "Trust Operations Lead",
  accessLevel: "Super Admin",
  walletAddress: "GADM...9X2P",
  pendingApprovals: 18,
  openReports: 11,
  suspiciousFlags: 7,
  proofVerifications: 2842,
  activeAgents: 126
};

export const platformApprovals: PlatformApproval[] = [
  {
    id: "APP-UR-9001",
    type: "listing",
    title: "Kilimani Green View Apartment",
    submittedBy: "Amina Realty Group",
    submittedAt: "Today, 9:18 AM",
    status: "pending",
    riskScore: 22
  },
  {
    id: "APP-UR-9002",
    type: "agent",
    title: "Daniel Mwangi Agent Profile",
    submittedBy: "Daniel Mwangi",
    submittedAt: "Today, 10:02 AM",
    status: "needs_review",
    riskScore: 48
  },
  {
    id: "APP-UR-9003",
    type: "property_document",
    title: "Westlands Studio Lease Docs",
    submittedBy: "Northside Homes",
    submittedAt: "Yesterday, 4:21 PM",
    status: "approved",
    riskScore: 12
  },
  {
    id: "APP-UR-9004",
    type: "api_partner",
    title: "MetroRent API Access",
    submittedBy: "MetroRent Limited",
    submittedAt: "Yesterday, 2:40 PM",
    status: "pending",
    riskScore: 31
  }
];

export const platformReports: PlatformReport[] = [
  {
    id: "RPT-UR-4421",
    type: "fake_listing",
    title: "Suspicious duplicate listing in Kilimani",
    submittedBy: "John Tenant",
    createdAt: "12 min ago",
    severity: "high",
    status: "under_review"
  },
  {
    id: "RPT-UR-4418",
    type: "unsafe_payment",
    title: "Agent requested off-platform payment",
    submittedBy: "Maya Tenant",
    createdAt: "36 min ago",
    severity: "critical",
    status: "escalated"
  },
  {
    id: "RPT-UR-4409",
    type: "agent_mismatch",
    title: "Agent identity does not match viewing details",
    submittedBy: "Brian Tenant",
    createdAt: "1 hr ago",
    severity: "medium",
    status: "new"
  }
];

export const agentRecords: AgentRecord[] = [
  {
    id: "AGT-UR-2048",
    name: "Amina Njoroge",
    company: "Amina Realty Group",
    status: "verified",
    trustScore: 96,
    reports: 2,
    listedProperties: 12
  },
  {
    id: "AGT-UR-2091",
    name: "Daniel Mwangi",
    company: "Northside Homes",
    status: "pending",
    trustScore: 72,
    reports: 1,
    listedProperties: 5
  },
  {
    id: "AGT-UR-2112",
    name: "Kevin Otieno",
    company: "MetroRent Limited",
    status: "restricted",
    trustScore: 58,
    reports: 6,
    listedProperties: 9
  }
];

export const proofActivities: ProofActivity[] = [
  {
    id: "PRF-UR-8101",
    requestId: "REQ-UR-9084",
    tenant: "John Tenant",
    listing: "Kilimani Green View Apartment",
    status: "verified",
    network: "Soroban",
    proofHash: "soro_0x7ab...2c109",
    time: "2 min ago"
  },
  {
    id: "PRF-UR-8100",
    requestId: "REQ-UR-9121",
    tenant: "Maya Tenant",
    listing: "Westlands Studio Loft",
    status: "queued",
    network: "Stellar Testnet",
    proofHash: "zkp_0x8fe...a12cc",
    time: "11 min ago"
  },
  {
    id: "PRF-UR-8097",
    requestId: "REQ-UR-9146",
    tenant: "Brian Tenant",
    listing: "Lavington Garden Maisonette",
    status: "failed",
    network: "Soroban",
    proofHash: "soro_0xe51...9cd41",
    time: "29 min ago"
  }
];

export const suspiciousActivities: SuspiciousActivity[] = [
  {
    id: "SUS-UR-7001",
    title: "Repeated off-platform payment language",
    actor: "AGT-UR-2112",
    source: "Message scan",
    status: "investigating",
    riskScore: 91,
    detectedAt: "7 min ago"
  },
  {
    id: "SUS-UR-6998",
    title: "Duplicate listing image hash",
    actor: "UR-LST-1220",
    source: "Listing upload",
    status: "open",
    riskScore: 78,
    detectedAt: "22 min ago"
  },
  {
    id: "SUS-UR-6993",
    title: "Proof mismatch with request amount",
    actor: "REQ-UR-9146",
    source: "Proof verifier",
    status: "blocked",
    riskScore: 88,
    detectedAt: "34 min ago"
  }
];

export const auditLogs: AuditLog[] = [
  {
    id: "AUD-UR-5510",
    action: "proof",
    actor: "system/verifier",
    description: "Proof verification accepted for REQ-UR-9084.",
    reference: "soro_0x7ab...2c109",
    time: "2 min ago"
  },
  {
    id: "AUD-UR-5508",
    action: "report",
    actor: "admin@urbanrentisha",
    description: "Escalated unsafe payment report.",
    reference: "RPT-UR-4418",
    time: "18 min ago"
  },
  {
    id: "AUD-UR-5502",
    action: "approval",
    actor: "admin@urbanrentisha",
    description: "Approved property document review.",
    reference: "APP-UR-9003",
    time: "1 hr ago"
  },
  {
    id: "AUD-UR-5498",
    action: "agent",
    actor: "system/risk-engine",
    description: "Restricted an agent profile after report threshold.",
    reference: "AGT-UR-2112",
    time: "2 hrs ago"
  }
];

export const analyticsMetrics: AnalyticsMetric[] = [
  {
    label: "Proof success rate",
    value: "98.4%",
    helper: "+2.1% this week",
    tone: "success",
    icon: ShieldCheck
  },
  {
    label: "Report resolution",
    value: "74%",
    helper: "Median 3.8 hours",
    tone: "warning",
    icon: Flag
  },
  {
    label: "Suspicious blocks",
    value: "19",
    helper: "7 active investigations",
    tone: "danger",
    icon: ShieldAlert
  },
  {
    label: "Verified agents",
    value: "126",
    helper: "+14 this month",
    tone: "success",
    icon: UserCheck
  }
];

export const dashboardStats = [
  {
    label: "Pending approvals",
    value: "18",
    helper: "Listings, agents, docs, partners",
    icon: ClipboardCheck,
    tone: "warning"
  },
  {
    label: "Open reports",
    value: "11",
    helper: "2 escalated, 4 high priority",
    icon: Flag,
    tone: "danger"
  },
  {
    label: "Agents",
    value: "126",
    helper: "112 verified, 9 pending",
    icon: UsersRound,
    tone: "success"
  },
  {
    label: "Proof verifications",
    value: "2.8K",
    helper: "98.4% success rate",
    icon: LockKeyhole,
    tone: "success"
  },
  {
    label: "Suspicious flags",
    value: "7",
    helper: "Active risk investigations",
    icon: ShieldAlert,
    tone: "danger"
  },
  {
    label: "Audit logs",
    value: "14.2K",
    helper: "Immutable platform trail",
    icon: Database,
    tone: "neutral"
  }
];

export const quickActions = [
  {
    label: "Review approvals",
    description: "Approve or reject listings, agents, documents, and API partners.",
    href: "/admin/approvals",
    icon: ClipboardCheck
  },
  {
    label: "Open report center",
    description: "Investigate fake listings, unsafe payments, and access issues.",
    href: "/admin/reports",
    icon: Flag
  },
  {
    label: "Run proof audit",
    description: "Inspect proof status, hashes, request IDs, and verifier logs.",
    href: "/admin/proofs",
    icon: LockKeyhole
  },
  {
    label: "View risk queue",
    description: "Review suspicious platform activity and blocked flows.",
    href: "/admin/risk",
    icon: ShieldAlert
  }
];

export const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, active: true },
  { label: "Approvals", href: "/admin/approvals", icon: ClipboardCheck },
  { label: "Reports", href: "/admin/reports", icon: Flag },
  { label: "Agents", href: "/admin/agents", icon: UsersRound },
  { label: "Listings", href: "/admin/listings", icon: Building2 },
  { label: "Proof Activity", href: "/admin/proofs", icon: LockKeyhole },
  { label: "Suspicious Activity", href: "/admin/risk", icon: ShieldAlert },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: Database },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "API Partners", href: "/admin/api-partners", icon: Code2 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Support", href: "/support", icon: HelpCircle }
];

export const statusVisuals = {
  approval: {
    pending: { label: "Pending", variant: "warning", icon: TimerReset },
    approved: { label: "Approved", variant: "success", icon: CheckCircle2 },
    rejected: { label: "Rejected", variant: "danger", icon: XCircle },
    needs_review: { label: "Needs review", variant: "warning", icon: AlertTriangle }
  },
  reportSeverity: {
    low: { label: "Low", variant: "neutral", icon: Flag },
    medium: { label: "Medium", variant: "warning", icon: FileWarning },
    high: { label: "High", variant: "danger", icon: ShieldAlert },
    critical: { label: "Critical", variant: "danger", icon: AlertTriangle }
  },
  agent: {
    verified: { label: "Verified", variant: "success", icon: BadgeCheck },
    pending: { label: "Pending", variant: "warning", icon: TimerReset },
    restricted: { label: "Restricted", variant: "danger", icon: ShieldAlert },
    suspended: { label: "Suspended", variant: "danger", icon: XCircle }
  },
  proof: {
    verified: { label: "Verified", variant: "success", icon: ShieldCheck },
    failed: { label: "Failed", variant: "danger", icon: AlertTriangle },
    queued: { label: "Queued", variant: "warning", icon: Clock3 },
    review: { label: "Review", variant: "warning", icon: FileSearch }
  },
  suspicious: {
    open: { label: "Open", variant: "warning", icon: AlertTriangle },
    investigating: { label: "Investigating", variant: "danger", icon: Eye },
    blocked: { label: "Blocked", variant: "danger", icon: LockKeyhole },
    resolved: { label: "Resolved", variant: "success", icon: CheckCircle2 }
  },
  audit: {
    approval: { label: "Approval", variant: "warning", icon: ClipboardCheck },
    proof: { label: "Proof", variant: "success", icon: LockKeyhole },
    report: { label: "Report", variant: "danger", icon: Flag },
    agent: { label: "Agent", variant: "neutral", icon: UserCheck },
    system: { label: "System", variant: "neutral", icon: Network }
  }
} as const;

export const adminFlowSteps = [
  {
    title: "Approvals reviewed",
    description: "Listings, agents, documents, and API partners enter admin queue.",
    status: "Active",
    icon: ClipboardCheck
  },
  {
    title: "Reports triaged",
    description: "Safety reports are classified by severity and status.",
    status: "Active",
    icon: Flag
  },
  {
    title: "Proofs monitored",
    description: "Verifier activity is watched for failed or suspicious proof states.",
    status: "Live",
    icon: ShieldCheck
  },
  {
    title: "Audit trail retained",
    description: "Admin and system events are preserved for traceability.",
    status: "Live",
    icon: Database
  }
];

export const auditReferences = [
  {
    label: "Admin ID",
    value: "ADM-UR-001",
    icon: UserRound
  },
  {
    label: "Network",
    value: "Stellar Testnet",
    icon: Sparkles
  },
  {
    label: "Latest proof",
    value: "soro_0x7ab...2c109",
    icon: Hash
  },
  {
    label: "Risk engine",
    value: "risk_engine_live",
    icon: Gauge
  },
  {
    label: "Audit stream",
    value: "audit_stream_active",
    icon: Database
  },
  {
    label: "Admin scope",
    value: "platform_trust_ops",
    icon: ShieldCheck
  }
];

export const adminSafetyRules = [
  {
    title: "Never approve without evidence",
    description: "Listings, agents, and partner access must show enough proof for platform trust.",
    icon: ClipboardCheck
  },
  {
    title: "Escalate unsafe payments fast",
    description: "Off-platform payment requests must enter the report and risk queue.",
    icon: WalletCards
  },
  {
    title: "Monitor failed proofs",
    description: "Repeated proof failures can indicate amount mismatch or bad actors.",
    icon: LockKeyhole
  },
  {
    title: "Preserve audit logs",
    description: "Admin actions must remain traceable for compliance and dispute review.",
    icon: Database
  }
];
