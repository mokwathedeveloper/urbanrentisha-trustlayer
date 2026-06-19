import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileCheck2,
  Home,
  KeyRound,
  LockKeyhole,
  MapPin,
  ReceiptText,
  ShieldCheck,
  UserRound,
  Wallet
} from "lucide-react";

export type ViewingProperty = {
  id: string;
  title: string;
  location: string;
  rentKes: number;
  viewingFeeKes: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  trustScore: number;
  verificationStatus: "Verified";
  agent: {
    name: string;
    company: string;
    verified: boolean;
    responseTime: string;
  };
};

export const selectedProperty: ViewingProperty = {
  id: "UR-LST-1001",
  title: "Kilimani Green View Apartment",
  location: "Kilimani, Nairobi",
  rentKes: 68000,
  viewingFeeKes: 500,
  bedrooms: 2,
  bathrooms: 2,
  sizeSqm: 92,
  trustScore: 97,
  verificationStatus: "Verified",
  agent: {
    name: "Amina Njoroge",
    company: "Amina Realty Group",
    verified: true,
    responseTime: "Usually replies within 18 minutes"
  }
};

export const viewingDates = [
  "Today",
  "Tomorrow",
  "Fri, 21 Jun",
  "Sat, 22 Jun",
  "Mon, 24 Jun"
];

export const viewingTimes = [
  "09:00 AM",
  "11:30 AM",
  "02:00 PM",
  "04:30 PM"
];

export const contactPreferences = [
  "In-app notification",
  "Email update",
  "Phone call after proof",
  "WhatsApp after proof"
];

export const requestFlow = [
  {
    title: "Create request",
    description: "Tenant confirms property and preferred viewing slot.",
    icon: FileCheck2
  },
  {
    title: "Pay viewing fee",
    description: "The required viewing fee is paid through the Stellar payment step.",
    icon: Wallet
  },
  {
    title: "Generate proof",
    description: "A private payment proof confirms the payment condition.",
    icon: LockKeyhole
  },
  {
    title: "Unlock access",
    description: "Viewing code and private access details unlock after verification.",
    icon: KeyRound
  }
];

export const feeBreakdown = [
  {
    label: "Viewing fee",
    value: "KES 500",
    icon: ReceiptText
  },
  {
    label: "Payment network",
    value: "Stellar testnet",
    icon: CreditCard
  },
  {
    label: "Access status",
    value: "Locked until proof",
    icon: LockKeyhole
  }
];

export const safetyItems = [
  {
    title: "Property verified",
    description: "The property has a visible trust status before viewing.",
    icon: Home
  },
  {
    title: "Agent verified",
    description: "The assigned agent profile is connected to the request.",
    icon: UserRound
  },
  {
    title: "Private access protected",
    description: "Contact and viewing details are hidden until proof succeeds.",
    icon: ShieldCheck
  },
  {
    title: "Audit-ready request",
    description: "Request, payment, proof, and unlock status are tracked.",
    icon: CheckCircle2
  }
];

export const summaryStats = [
  {
    label: "Property",
    value: "Verified",
    icon: BadgeCheck
  },
  {
    label: "Location",
    value: "Kilimani",
    icon: MapPin
  },
  {
    label: "Fee",
    value: "KES 500",
    icon: ReceiptText
  },
  {
    label: "Slot",
    value: "Selectable",
    icon: CalendarDays
  },
  {
    label: "Proof",
    value: "Required",
    icon: LockKeyhole
  },
  {
    label: "Response",
    value: "18m",
    icon: Clock3
  }
];
