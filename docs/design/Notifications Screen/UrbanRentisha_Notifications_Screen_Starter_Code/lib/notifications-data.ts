import {
  Bell,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Eye,
  FileWarning,
  Flag,
  Hash,
  KeyRound,
  LockKeyhole,
  ReceiptText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  WalletCards
} from "lucide-react";

export type NotificationType =
  | "all"
  | "payment"
  | "proof"
  | "access"
  | "report"
  | "viewing-code";

export type NotificationPriority = "normal" | "important" | "urgent";

export type NotificationRecord = {
  id: string;
  type: Exclude<NotificationType, "all">;
  title: string;
  description: string;
  timestamp: string;
  unread: boolean;
  priority: NotificationPriority;
  requestId: string;
  actionLabel: string;
  href: string;
  meta: {
    label: string;
    value: string;
  }[];
};

export const notificationFilters: {
  label: string;
  value: NotificationType;
}[] = [
  { label: "All", value: "all" },
  { label: "Payment", value: "payment" },
  { label: "Proof", value: "proof" },
  { label: "Access", value: "access" },
  { label: "Reports", value: "report" },
  { label: "Viewing Code", value: "viewing-code" }
];

export const initialNotifications: NotificationRecord[] = [
  {
    id: "NTF-1001",
    type: "payment",
    title: "Viewing fee payment confirmed",
    description:
      "KES 500 viewing fee was received on Stellar testnet for Kilimani Green View Apartment.",
    timestamp: "2 min ago",
    unread: true,
    priority: "important",
    requestId: "REQ-UR-9084",
    actionLabel: "View payment",
    href: "/stellar-payment/REQ-UR-9084",
    meta: [
      { label: "Amount", value: "KES 500" },
      { label: "Network", value: "Stellar Testnet" },
      { label: "TX", value: "4f7a8b2c...b3c4d5" }
    ]
  },
  {
    id: "NTF-1002",
    type: "proof",
    title: "Private payment proof generated",
    description:
      "A ZK payment proof was generated without exposing unrelated wallet history.",
    timestamp: "4 min ago",
    unread: true,
    priority: "normal",
    requestId: "REQ-UR-9084",
    actionLabel: "View proof",
    href: "/zk-proof-generation/REQ-UR-9084",
    meta: [
      { label: "Proof", value: "zkp_0x9f12...c44190" },
      { label: "Circuit", value: "payment_condition_v1" }
    ]
  },
  {
    id: "NTF-1003",
    type: "access",
    title: "Viewing access unlocked",
    description:
      "Proof verification succeeded. The viewing request is eligible for access unlock.",
    timestamp: "6 min ago",
    unread: true,
    priority: "important",
    requestId: "REQ-UR-9084",
    actionLabel: "Open access",
    href: "/viewing-code/REQ-UR-9084",
    meta: [
      { label: "Access", value: "Unlocked" },
      { label: "Verification", value: "soro_0x7ab...2c109" }
    ]
  },
  {
    id: "NTF-1004",
    type: "viewing-code",
    title: "Viewing code is ready",
    description:
      "Your property viewing code is active for Sat, 22 Jun at 11:30 AM.",
    timestamp: "8 min ago",
    unread: false,
    priority: "urgent",
    requestId: "REQ-UR-9084",
    actionLabel: "Copy code",
    href: "/viewing-code/REQ-UR-9084",
    meta: [
      { label: "Code", value: "UR-4829-LOCK" },
      { label: "Expires", value: "6:00 PM" }
    ]
  },
  {
    id: "NTF-1005",
    type: "report",
    title: "Report review update",
    description:
      "The listing report for Westlands Studio Loft was reviewed by the safety team.",
    timestamp: "1 hr ago",
    unread: false,
    priority: "normal",
    requestId: "RPT-UR-3310",
    actionLabel: "View report",
    href: "/reports/RPT-UR-3310",
    meta: [
      { label: "Report", value: "RPT-UR-3310" },
      { label: "Status", value: "Reviewed" }
    ]
  },
  {
    id: "NTF-1006",
    type: "payment",
    title: "Payment-hold status updated",
    description:
      "Your reservation status is active and the viewing fee hold remains visible.",
    timestamp: "2 hrs ago",
    unread: false,
    priority: "normal",
    requestId: "REQ-UR-9084",
    actionLabel: "View hold",
    href: "/payment-hold/REQ-UR-9084",
    meta: [
      { label: "Hold", value: "HOLD-UR-7712" },
      { label: "Status", value: "Reservation active" }
    ]
  }
];

export const notificationStats = [
  {
    label: "Unread",
    value: "3",
    icon: Bell
  },
  {
    label: "Payment",
    value: "2",
    icon: WalletCards
  },
  {
    label: "Proof",
    value: "1",
    icon: LockKeyhole
  },
  {
    label: "Access",
    value: "2",
    icon: KeyRound
  }
];

export const notificationPreferences = [
  {
    title: "Payment updates",
    description: "Notify when payment is received, held, released, or reviewed.",
    icon: ReceiptText,
    enabled: true
  },
  {
    title: "Proof updates",
    description: "Notify when ZK proof generation or verification changes state.",
    icon: ShieldCheck,
    enabled: true
  },
  {
    title: "Viewing-code updates",
    description: "Notify when access code is created, copied, expired, or refreshed.",
    icon: KeyRound,
    enabled: true
  },
  {
    title: "Report updates",
    description: "Notify when a suspicious listing report receives review action.",
    icon: Flag,
    enabled: true
  }
];

export const typeVisuals = {
  payment: {
    label: "Payment",
    icon: WalletCards,
    tone: "success"
  },
  proof: {
    label: "Proof",
    icon: LockKeyhole,
    tone: "success"
  },
  access: {
    label: "Access",
    icon: KeyRound,
    tone: "success"
  },
  report: {
    label: "Report",
    icon: ShieldAlert,
    tone: "danger"
  },
  "viewing-code": {
    label: "Viewing code",
    icon: Eye,
    tone: "warning"
  }
} as const;

export const notificationTimeline = [
  {
    title: "Payment received",
    description: "Stellar testnet transaction matched the viewing request.",
    icon: WalletCards,
    time: "10:07 AM"
  },
  {
    title: "Proof generated",
    description: "Private payment proof was created.",
    icon: LockKeyhole,
    time: "10:09 AM"
  },
  {
    title: "Proof verified",
    description: "Soroban verifier accepted proof payload.",
    icon: ShieldCheck,
    time: "10:11 AM"
  },
  {
    title: "Viewing code unlocked",
    description: "Tenant received verified access code.",
    icon: KeyRound,
    time: "10:12 AM"
  }
];

export const safetyHighlights = [
  {
    title: "Urgent notifications stay visible",
    description: "Viewing-code and safety issues should not disappear until acknowledged.",
    icon: FileWarning
  },
  {
    title: "Hash values use monospace",
    description: "TX, proof, and verification references must stay readable and copy-safe.",
    icon: Hash
  },
  {
    title: "Status uses text and icon",
    description: "Do not rely on green, yellow, or red alone.",
    icon: CheckCircle2
  },
  {
    title: "Time-sensitive updates are clear",
    description: "Viewing time and code expiry should always be readable.",
    icon: Clock3
  },
  {
    title: "Blockchain status is scoped",
    description: "Only relevant payment, proof, and verification references are shown.",
    icon: Sparkles
  },
  {
    title: "Viewing updates are actionable",
    description: "Every notification should lead to the relevant screen.",
    icon: CalendarCheck2
  }
];
