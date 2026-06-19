import {
  AlertTriangle,
  BadgeCheck,
  Bell,
  BookOpenText,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Code2,
  Database,
  ExternalLink,
  FileWarning,
  Flag,
  Gauge,
  HelpCircle,
  Home,
  Info,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  ListChecks,
  LockKeyhole,
  Mail,
  MessageCircle,
  Network,
  Phone,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UserCheck,
  UserRound,
  UsersRound,
  WalletCards,
  XCircle
} from "lucide-react";

export type HelpTopicTone = "success" | "warning" | "danger" | "neutral";
export type FaqCategory =
  | "Stellar testnet"
  | "ZK proof"
  | "Payment-hold status"
  | "Viewing codes"
  | "Reports"
  | "Safety"
  | "Limitations";

export type HelpTopic = {
  id: string;
  title: string;
  description: string;
  category: FaqCategory;
  icon: typeof HelpCircle;
  tone: HelpTopicTone;
  href: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  defaultOpen?: boolean;
};

export type ExplainerCard = {
  title: string;
  description: string;
  icon: typeof HelpCircle;
  tone: HelpTopicTone;
  bullets: string[];
};

export type SafetyRule = {
  title: string;
  description: string;
  icon: typeof HelpCircle;
  severity: "required" | "recommended" | "warning";
};

export type LimitationItem = {
  title: string;
  description: string;
  status: "known" | "mvp" | "planned";
};

export const helpStats = [
  {
    label: "Help topics",
    value: "7",
    helper: "Core product education areas",
    tone: "success",
    icon: BookOpenText
  },
  {
    label: "Safety rules",
    value: "8",
    helper: "Tenant and agent protection",
    tone: "success",
    icon: ShieldCheck
  },
  {
    label: "Known limits",
    value: "5",
    helper: "MVP honesty and scope",
    tone: "warning",
    icon: AlertTriangle
  },
  {
    label: "Support routes",
    value: "3",
    helper: "FAQ, report, human support",
    tone: "neutral",
    icon: LifeBuoy
  }
];

export const helpTopics: HelpTopic[] = [
  {
    id: "stellar-testnet",
    title: "Stellar testnet",
    description:
      "Understand why testnet is used for demo payments and what a testnet transaction means.",
    category: "Stellar testnet",
    icon: Network,
    tone: "success",
    href: "#stellar-testnet"
  },
  {
    id: "zk-proof",
    title: "ZK payment proof",
    description:
      "Learn how a tenant proves payment without exposing unrelated wallet activity.",
    category: "ZK proof",
    icon: LockKeyhole,
    tone: "success",
    href: "#zk-proof"
  },
  {
    id: "payment-hold",
    title: "Payment-hold status",
    description:
      "See what awaiting payment, received, proof ready, verified, and released mean.",
    category: "Payment-hold status",
    icon: WalletCards,
    tone: "warning",
    href: "#payment-hold"
  },
  {
    id: "viewing-codes",
    title: "Viewing codes",
    description:
      "Understand when a viewing code unlocks and why it can expire or be revoked.",
    category: "Viewing codes",
    icon: KeyRound,
    tone: "success",
    href: "#viewing-codes"
  },
  {
    id: "reports",
    title: "Reports",
    description:
      "Report fake listings, suspicious agents, off-platform payment demands, or unsafe access requests.",
    category: "Reports",
    icon: Flag,
    tone: "danger",
    href: "#reports"
  },
  {
    id: "safety-rules",
    title: "Safety rules",
    description:
      "Follow the rules that keep renters, property owners, and agents protected.",
    category: "Safety",
    icon: ShieldAlert,
    tone: "warning",
    href: "#safety-rules"
  },
  {
    id: "known-limitations",
    title: "Known limitations",
    description:
      "Clear MVP boundaries for testnet payments, verification latency, and manual review.",
    category: "Limitations",
    icon: FileWarning,
    tone: "neutral",
    href: "#known-limitations"
  }
];

export const explainerCards: ExplainerCard[] = [
  {
    title: "Stellar testnet",
    description:
      "A safe blockchain testing environment used to demonstrate payment flow without moving real money.",
    icon: Network,
    tone: "success",
    bullets: [
      "Used for demo and hackathon validation.",
      "Shows payment intent, transaction hash, and confirmation status.",
      "Not the same as production real-money settlement."
    ]
  },
  {
    title: "Zero-knowledge proof",
    description:
      "A private proof that confirms the payment condition was met without showing unnecessary wallet details.",
    icon: LockKeyhole,
    tone: "success",
    bullets: [
      "Proves required payment condition.",
      "Reduces exposure of sensitive payment data.",
      "Links proof status to access unlock."
    ]
  },
  {
    title: "Payment-hold status",
    description:
      "A simplified reservation state that helps users know where the viewing request is in the trust flow.",
    icon: WalletCards,
    tone: "warning",
    bullets: [
      "Awaiting payment means no proof can start yet.",
      "Payment received means proof can be generated.",
      "Verified means viewing access can unlock."
    ]
  }
];

export const paymentHoldSteps = [
  {
    title: "Awaiting payment",
    description: "The request exists, but the required viewing fee has not been detected.",
    icon: TimerReset,
    tone: "neutral"
  },
  {
    title: "Payment received",
    description: "The Stellar testnet payment reference is attached to the viewing request.",
    icon: WalletCards,
    tone: "success"
  },
  {
    title: "Proof ready",
    description: "The system can generate a private proof from the confirmed payment condition.",
    icon: LockKeyhole,
    tone: "success"
  },
  {
    title: "Verified",
    description: "The proof has passed verification and access can be unlocked.",
    icon: ShieldCheck,
    tone: "success"
  },
  {
    title: "Released or revoked",
    description: "The hold is either completed safely or revoked due to risk, expiry, or report review.",
    icon: ShieldAlert,
    tone: "warning"
  }
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-01",
    category: "Stellar testnet",
    question: "What is Stellar testnet?",
    answer:
      "Stellar testnet is a safe testing network for demonstrating blockchain payment behavior. In this MVP, it helps show payment intent, payment confirmation, and transaction hash without using production real-money settlement.",
    defaultOpen: true
  },
  {
    id: "faq-02",
    category: "Stellar testnet",
    question: "Does a testnet transaction mean real money moved?",
    answer:
      "No. Testnet assets are used for testing and demo validation. The production version would need a real payment configuration, compliance review, and real operational settlement rules."
  },
  {
    id: "faq-03",
    category: "ZK proof",
    question: "What does the ZK proof prove?",
    answer:
      "The proof confirms that the required viewing-fee payment condition was met for the selected request. It should not expose unrelated wallet history, unrelated balances, or unnecessary private payment details."
  },
  {
    id: "faq-04",
    category: "ZK proof",
    question: "Why not just show the payment receipt?",
    answer:
      "A receipt can expose more information than needed. The ZK proof approach is designed to confirm eligibility while reducing unnecessary exposure of sensitive payment data."
  },
  {
    id: "faq-05",
    category: "Payment-hold status",
    question: "What does payment-hold mean?",
    answer:
      "Payment-hold is a simplified reservation status. It shows whether the request is waiting for payment, payment received, proof ready, verified, released, expired, or revoked."
  },
  {
    id: "faq-06",
    category: "Viewing codes",
    question: "When does a viewing code unlock?",
    answer:
      "The viewing code unlocks after the required payment is received and the payment proof is verified. The code can also expire or be revoked if there is suspicious activity."
  },
  {
    id: "faq-07",
    category: "Reports",
    question: "What should tenants report?",
    answer:
      "Tenants should report fake listings, suspicious property images, agents asking for off-platform payments, wrong viewing details, unsafe behavior, or any listing that appears misleading."
  },
  {
    id: "faq-08",
    category: "Safety",
    question: "What is the safest way to use UrbanRentisha?",
    answer:
      "Use only verified listings, keep payments inside the guided flow, do not send off-platform money, check the property verification badge, and report suspicious activity immediately."
  },
  {
    id: "faq-09",
    category: "Limitations",
    question: "What are the known MVP limitations?",
    answer:
      "The MVP may use Stellar testnet, simplified proof verification, simulated payment-hold states, demo listings, and manual review for some safety events. These limitations should be clearly disclosed in demos."
  }
];

export const safetyRules: SafetyRule[] = [
  {
    title: "Do not pay outside the verified flow",
    description:
      "Off-platform payment requests are a strong fraud signal. Report them immediately.",
    icon: WalletCards,
    severity: "required"
  },
  {
    title: "Check the verified property badge",
    description:
      "Only proceed when the listing has a clear verification status and trusted agent profile.",
    icon: BadgeCheck,
    severity: "required"
  },
  {
    title: "Use viewing codes only after proof verification",
    description:
      "A viewing code should unlock only after payment and proof checks are complete.",
    icon: KeyRound,
    severity: "required"
  },
  {
    title: "Report suspicious agent behavior",
    description:
      "Report pressure tactics, fake urgency, wrong property access, or identity mismatch.",
    icon: Flag,
    severity: "recommended"
  },
  {
    title: "Do not share private wallet data",
    description:
      "The system should not ask tenants to expose unrelated wallet history or seed phrases.",
    icon: LockKeyhole,
    severity: "warning"
  },
  {
    title: "Confirm appointment details",
    description:
      "Check location, date, time, agent identity, and access instructions before traveling.",
    icon: CalendarCheck2,
    severity: "recommended"
  }
];

export const limitations: LimitationItem[] = [
  {
    title: "Testnet payments are for demonstration",
    description:
      "The MVP uses Stellar testnet to demonstrate payment flow. Production settlement requires real payment configuration.",
    status: "mvp"
  },
  {
    title: "Some verification may be simulated",
    description:
      "Depending on implementation depth, proof verification may be recorded through a fallback service before full on-chain verification is complete.",
    status: "known"
  },
  {
    title: "Manual review is still required",
    description:
      "Reports, suspicious listings, and agent disputes may still require human review.",
    status: "known"
  },
  {
    title: "Viewing access can expire",
    description:
      "Viewing codes may expire to reduce code sharing, stale access, and unsafe repeated entry.",
    status: "known"
  },
  {
    title: "Production compliance is not included in MVP",
    description:
      "A live product needs legal, privacy, payment, and jurisdiction-specific compliance review.",
    status: "planned"
  }
];

export const supportOptions = [
  {
    title: "Read the FAQ",
    description: "Find quick answers about payment proof, Stellar, viewing codes, and reports.",
    icon: BookOpenText,
    href: "#faq"
  },
  {
    title: "Report a fake listing",
    description: "Flag suspicious listings, unsafe agents, or off-platform payment requests.",
    icon: Flag,
    href: "/reports/new"
  },
  {
    title: "Contact support",
    description: "Get human help for a payment, proof, access, or viewing-code issue.",
    icon: LifeBuoy,
    href: "/support"
  }
];

export const sidebarItems = [
  { label: "Overview", href: "#overview", icon: HelpCircle, active: true },
  { label: "Stellar Testnet", href: "#stellar-testnet", icon: Network },
  { label: "ZK Proof", href: "#zk-proof", icon: LockKeyhole },
  { label: "Payment Hold", href: "#payment-hold", icon: WalletCards },
  { label: "Viewing Codes", href: "#viewing-codes", icon: KeyRound },
  { label: "Reports", href: "#reports", icon: Flag },
  { label: "Safety Rules", href: "#safety-rules", icon: ShieldAlert },
  { label: "Known Limitations", href: "#known-limitations", icon: FileWarning },
  { label: "FAQ", href: "#faq", icon: MessageCircle },
  { label: "Support", href: "#support", icon: LifeBuoy }
];

export const appSidebarItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Properties", href: "/properties", icon: Building2 },
  { label: "Viewings", href: "/viewings", icon: CalendarCheck2 },
  { label: "Reports", href: "/reports", icon: Flag },
  { label: "Audit Log", href: "/audit-log", icon: Database },
  { label: "API Docs", href: "/api-docs", icon: Code2 },
  { label: "Help Center", href: "/help", icon: HelpCircle, active: true },
  { label: "Settings", href: "/settings", icon: Settings }
];

export const statusVisuals = {
  tone: {
    success: { variant: "success", icon: CheckCircle2 },
    warning: { variant: "warning", icon: AlertTriangle },
    danger: { variant: "danger", icon: ShieldAlert },
    neutral: { variant: "neutral", icon: Info }
  },
  severity: {
    required: { variant: "danger", label: "Required", icon: AlertTriangle },
    recommended: { variant: "success", label: "Recommended", icon: CheckCircle2 },
    warning: { variant: "warning", label: "Warning", icon: ShieldAlert }
  },
  limitation: {
    known: { variant: "warning", label: "Known", icon: AlertTriangle },
    mvp: { variant: "neutral", label: "MVP", icon: Info },
    planned: { variant: "success", label: "Planned", icon: CheckCircle2 }
  }
} as const;
