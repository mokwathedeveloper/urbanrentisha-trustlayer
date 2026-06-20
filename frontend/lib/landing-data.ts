import {
  AlertTriangle,
  Building2,
  CreditCard,
  FileCheck2,
  KeyRound,
  ScanSearch,
  ShieldCheck,
  ShieldOff,
  Users,
  Wallet,
} from "lucide-react";

export const landingNavItems = [
  { label: "How it Works", href: "#trust-flow" },
  { label: "Features", href: "#problem" },
  { label: "For Everyone", href: "#audience" },
  { label: "About Us", href: "#stellar" },
  { label: "FAQ", href: "/docs" },
];

export const heroStats = [
  { label: "Users Protected", value: "10K+", icon: Users },
  { label: "Verified Properties", value: "2K+", icon: Building2 },
  { label: "Transactions Secured", value: "5K+", icon: CreditCard },
  { label: "Privacy First", value: "100%", icon: ShieldCheck },
];

export const problems = [
  {
    title: "Fake Listings",
    description: "Fraudulent listings that don't exist.",
    footnote: "No verification",
    icon: ScanSearch,
  },
  {
    title: "Fake Agents",
    description: "Impersonators take your hard-earned money.",
    footnote: "No accountability",
    icon: ShieldOff,
  },
  {
    title: "Unsafe Payments",
    description: "Pay before viewing, no security.",
    footnote: "High financial risk",
    icon: Wallet,
  },
  {
    title: "No Proof",
    description: "No way to prove payment or agreement.",
    footnote: "Disputes & losses",
    icon: AlertTriangle,
  },
];

export const trustFlowSteps = [
  {
    title: "Make Viewing Payment",
    description: "Pay securely on Stellar Network.",
    icon: Wallet,
  },
  {
    title: "Generate ZK Proof",
    description: "Prove payment privately off-chain.",
    icon: FileCheck2,
  },
  {
    title: "Verify on Stellar",
    description: "Proof verified on Soroban contract.",
    icon: ShieldCheck,
  },
  {
    title: "Unlock Access",
    description: "Get verified access to property details.",
    icon: KeyRound,
  },
];

export const audiences = [
  {
    title: "For Tenants",
    bullets: [
      "Pay securely to view properties",
      "Prove payment privately",
      "Access verified property details",
      "Safe from rental scams",
    ],
  },
  {
    title: "For Property Agents",
    bullets: [
      "List properties with credibility",
      "Receive secure payments",
      "Build trust with tenants",
      "Verified, Professional, Reliable",
    ],
  },
  {
    title: "For Property Owners",
    bullets: [
      "Showcase genuine properties",
      "Connect with verified agents",
      "Close deals faster",
      "Grow your rental business",
    ],
  },
];

export const footerColumns = [
  {
    title: "Product",
    links: ["How it Works", "Features", "Pricing", "For Agents", "For Owners"],
  },
  {
    title: "Company",
    links: ["About Us", "Roadmap", "Blog", "Careers"],
  },
  {
    title: "Resources",
    links: ["FAQ", "Documentation", "Security", "Support"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"],
  },
];
