import {
  BadgeCheck,
  Building2,
  Camera,
  Car,
  CheckCircle2,
  Clock3,
  Droplets,
  FileCheck2,
  Home,
  KeyRound,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  Star,
  Trees,
  Wallet,
  Wifi,
  Zap
} from "lucide-react";

export type PropertyDetail = {
  id: string;
  title: string;
  location: string;
  neighborhood: string;
  rentKes: number;
  viewingFeeKes: number;
  depositKes: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  type: string;
  availableFrom: string;
  trustScore: number;
  verificationStatus: "Verified";
  description: string;
  agent: {
    name: string;
    company: string;
    role: string;
    verified: boolean;
    responseTime: string;
    rating: number;
    completedViewings: number;
    phoneMasked: string;
    walletShort: string;
  };
  facts: { label: string; value: string }[];
  amenities: { label: string; icon: typeof Wifi }[];
  verificationChecks: { label: string; description: string; icon: typeof ShieldCheck }[];
};

export const propertyDetail: PropertyDetail = {
  id: "UR-LST-1001",
  title: "Kilimani Green View Apartment",
  location: "Kilimani, Nairobi",
  neighborhood: "Kilimani",
  rentKes: 68000,
  viewingFeeKes: 500,
  depositKes: 68000,
  bedrooms: 2,
  bathrooms: 2,
  sizeSqm: 92,
  type: "Apartment",
  availableFrom: "Available now",
  trustScore: 97,
  verificationStatus: "Verified",
  description: "A verified two-bedroom apartment in Kilimani with secure parking, balcony access, strong natural light, and controlled viewing access. The listing is connected to a verified agent profile and uses the UrbanRentisha payment-proof workflow before private viewing details are unlocked.",
  agent: {
    name: "Amina Njoroge",
    company: "Amina Realty Group",
    role: "Verified Property Agent",
    verified: true,
    responseTime: "Usually replies within 18 minutes",
    rating: 4.9,
    completedViewings: 214,
    phoneMasked: "+254 7•• ••• 418",
    walletShort: "GB7N...K9QP"
  },
  facts: [
    { label: "Property ID", value: "UR-LST-1001" },
    { label: "Type", value: "Apartment" },
    { label: "Bedrooms", value: "2 bedrooms" },
    { label: "Bathrooms", value: "2 bathrooms" },
    { label: "Size", value: "92 sqm" },
    { label: "Deposit", value: "KES 68,000" },
    { label: "Viewing fee", value: "KES 500" },
    { label: "Availability", value: "Available now" }
  ],
  amenities: [
    { label: "Secure parking", icon: Car },
    { label: "Backup power", icon: Zap },
    { label: "Fiber internet", icon: Wifi },
    { label: "Water storage", icon: Droplets },
    { label: "Balcony view", icon: Trees },
    { label: "Verified photos", icon: Camera }
  ],
  verificationChecks: [
    { label: "Property verified", description: "The listing has passed property-level checks before publishing.", icon: Home },
    { label: "Agent verified", description: "The assigned agent profile is verified and connected to this listing.", icon: BadgeCheck },
    { label: "Payment-proof access", description: "Viewing details unlock only after the required payment proof succeeds.", icon: LockKeyhole },
    { label: "Audit trail ready", description: "Viewing request, payment status, proof status, and access status can be reviewed.", icon: FileCheck2 }
  ]
};

export const proofFlow = [
  { title: "Request viewing", description: "Tenant confirms interest in this verified property.", icon: KeyRound },
  { title: "Pay viewing fee", description: "Payment condition is created and tracked before access unlock.", icon: Wallet },
  { title: "Generate payment proof", description: "A private proof confirms payment without exposing unrelated wallet history.", icon: ReceiptText },
  { title: "Unlock access", description: "Viewing code and private access details unlock after verification succeeds.", icon: CheckCircle2 }
];

export const trustMetrics = [
  { label: "Trust score", value: "97%", icon: ShieldCheck },
  { label: "Agent rating", value: "4.9", icon: Star },
  { label: "Viewings", value: "214", icon: Building2 },
  { label: "Response", value: "18m", icon: Clock3 }
];
