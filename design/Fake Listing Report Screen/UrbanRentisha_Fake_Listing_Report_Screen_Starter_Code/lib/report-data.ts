import {
  AlertTriangle,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarClock,
  Camera,
  CheckCircle2,
  Clock3,
  Database,
  EyeOff,
  FileText,
  Flag,
  Home,
  ImagePlus,
  KeyRound,
  LockKeyhole,
  MailWarning,
  MapPin,
  MessageSquareWarning,
  PhoneCall,
  ReceiptText,
  ShieldAlert,
  ShieldCheck,
  Siren,
  UploadCloud,
  UserRound,
  WalletCards,
  XCircle
} from "lucide-react";

export type ReportType = "listing" | "agent" | "payment" | "access" | "other";
export type ReportSeverity = "low" | "medium" | "high" | "urgent";
export type ReporterMode = "named" | "private";

export type ListingReportTarget = {
  listingId: string;
  listingTitle: string;
  location: string;
  monthlyRentKes: number;
  viewingFeeKes: number;
  verificationStatus: "Verified" | "Review needed";
  agentName: string;
  agentCompany: string;
  agentPhone: string;
  agentStatus: "Verified agent";
  propertyType: string;
  postedAt: string;
};

export const reportTarget: ListingReportTarget = {
  listingId: "UR-LST-1001",
  listingTitle: "Kilimani Green View Apartment",
  location: "Kilimani, Nairobi",
  monthlyRentKes: 85000,
  viewingFeeKes: 500,
  verificationStatus: "Verified",
  agentName: "Amina Njoroge",
  agentCompany: "Amina Realty Group",
  agentPhone: "+254 700 000 000",
  agentStatus: "Verified agent",
  propertyType: "2 Bedroom Apartment",
  postedAt: "12 Jun 2026"
};

export const reportTypes = [
  {
    value: "listing",
    label: "Suspicious listing",
    description: "Wrong photos, fake address, copied listing, or misleading details.",
    icon: Home
  },
  {
    value: "agent",
    label: "Suspicious agent",
    description: "Agent identity, contact, behaviour, or verification concern.",
    icon: UserRound
  },
  {
    value: "payment",
    label: "Payment concern",
    description: "Extra off-platform fee, cash demand, or suspicious payment request.",
    icon: WalletCards
  },
  {
    value: "access",
    label: "Access issue",
    description: "Viewing code rejected, wrong access point, or unsafe viewing condition.",
    icon: KeyRound
  },
  {
    value: "other",
    label: "Other safety issue",
    description: "Any other concern that could affect tenant safety or trust.",
    icon: ShieldAlert
  }
] as const;

export const reportReasons = [
  {
    id: "fake-photos",
    title: "Photos look fake or stolen",
    description: "Images appear copied, inconsistent, or unrelated to the property.",
    icon: Camera
  },
  {
    id: "wrong-location",
    title: "Location does not match",
    description: "Address, map pin, or viewing location does not match the listing.",
    icon: MapPin
  },
  {
    id: "agent-pressure",
    title: "Agent is pressuring payment",
    description: "Agent asks for fast payment, cash, or off-platform transfer.",
    icon: MessageSquareWarning
  },
  {
    id: "extra-payment",
    title: "Extra payment requested",
    description: "Someone asked for a fee outside the verified UrbanRentisha flow.",
    icon: Banknote
  },
  {
    id: "identity-mismatch",
    title: "Agent identity mismatch",
    description: "The person contacting you does not match the verified agent profile.",
    icon: BadgeCheck
  },
  {
    id: "unsafe-viewing",
    title: "Unsafe viewing condition",
    description: "Viewing location, timing, or access instruction feels unsafe.",
    icon: Siren
  }
];

export const severityOptions = [
  {
    value: "low",
    label: "Low",
    description: "Minor inconsistency or unclear information.",
    icon: FileText
  },
  {
    value: "medium",
    label: "Medium",
    description: "Potentially misleading listing or agent behaviour.",
    icon: AlertTriangle
  },
  {
    value: "high",
    label: "High",
    description: "Likely scam, suspicious payment request, or identity mismatch.",
    icon: ShieldAlert
  },
  {
    value: "urgent",
    label: "Urgent",
    description: "Immediate safety risk, threat, or active fraud attempt.",
    icon: Siren
  }
] as const;

export const evidenceTypes = [
  {
    title: "Screenshots",
    description: "Chat messages, payment requests, or conflicting listing photos.",
    icon: ImagePlus
  },
  {
    title: "Receipts",
    description: "Proof of payment request, invoice, or suspicious transaction reference.",
    icon: ReceiptText
  },
  {
    title: "Contact details",
    description: "Phone number, email, or username used by the suspicious person.",
    icon: PhoneCall
  },
  {
    title: "Viewing details",
    description: "Unsafe meeting instruction, wrong address, or changed access point.",
    icon: CalendarClock
  }
];

export const reviewSteps = [
  {
    title: "Report submitted",
    description: "Your report receives a case reference for tracking.",
    icon: Flag
  },
  {
    title: "Safety review",
    description: "The UrbanRentisha safety team reviews listing, agent, and payment signals.",
    icon: ShieldCheck
  },
  {
    title: "Listing action",
    description: "The listing may be paused, flagged, or escalated if risk is confirmed.",
    icon: XCircle
  },
  {
    title: "Tenant update",
    description: "You receive a notification when the report status changes.",
    icon: MailWarning
  }
];

export const safetyGuidelines = [
  {
    title: "Do not send extra money",
    description: "Keep payments inside the verified UrbanRentisha flow.",
    icon: Banknote
  },
  {
    title: "Do not meet alone if unsafe",
    description: "Cancel or reschedule if the viewing location feels suspicious.",
    icon: Siren
  },
  {
    title: "Keep evidence",
    description: "Screenshots and transaction details help the safety team review faster.",
    icon: UploadCloud
  },
  {
    title: "Protect your identity",
    description: "Use private reporting if you do not want your name shown in the case record.",
    icon: EyeOff
  }
];

export const targetFacts = [
  {
    label: "Listing ID",
    value: "UR-LST-1001",
    icon: Database
  },
  {
    label: "Property type",
    value: "2 Bedroom",
    icon: Building2
  },
  {
    label: "Verification",
    value: "Verified",
    icon: ShieldCheck
  },
  {
    label: "Viewing fee",
    value: "KES 500",
    icon: ReceiptText
  }
];

export const reportQualityTips = [
  {
    title: "Be specific",
    description: "Mention what happened, who contacted you, and when it happened.",
    icon: FileText
  },
  {
    title: "Attach evidence",
    description: "Screenshots and references make the report easier to review.",
    icon: UploadCloud
  },
  {
    title: "Avoid exposing private secrets",
    description: "Do not paste wallet secrets, passwords, or full personal documents.",
    icon: LockKeyhole
  }
];

export const sampleReportReference = "RPT-UR-3310";
export const sampleReportHash = "rpt_0x3c9d12ef7b4a6c8d91e402f77a12c6f8";
