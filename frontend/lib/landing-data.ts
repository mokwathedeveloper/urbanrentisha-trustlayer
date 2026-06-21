import type { IconName } from "@/components/ui/icon";

export const landingNavItems = [
  { label: "How It Works", href: "#trust-flow" },
  { label: "Features", href: "#problem" },
  { label: "For Everyone", href: "#audience" },
  { label: "About Us", href: "#stellar" },
  { label: "FAQ", href: "/help" },
];

export const heroStats: { label: string; value: string; icon: IconName }[] = [
  { label: "Users Protected", value: "10K+", icon: "groups" },
  { label: "Verified Properties", value: "2K+", icon: "apartment" },
  { label: "Transactions Secured", value: "5K+", icon: "credit_card" },
  { label: "Privacy First", value: "100%", icon: "verified_user" },
];

export const problems: { title: string; description: string; footnote: string; icon: IconName }[] = [
  {
    title: "Fake Listings",
    description: "Fraudulent listings that don't exist.",
    footnote: "No verification",
    icon: "search",
  },
  {
    title: "Fake Agents",
    description: "Impersonators take your hard-earned money.",
    footnote: "No accountability",
    icon: "gpp_maybe",
  },
  {
    title: "Unsafe Payments",
    description: "Pay before viewing, no security.",
    footnote: "High financial risk",
    icon: "account_balance_wallet",
  },
  {
    title: "No Proof",
    description: "No way to prove payment or agreement.",
    footnote: "Disputes & losses",
    icon: "warning",
  },
];

export const trustFlowSteps: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Make Viewing Payment",
    description: "Pay securely on Stellar Network.",
    icon: "account_balance_wallet",
  },
  {
    title: "Generate ZK Proof",
    description: "Prove payment privately off-chain.",
    icon: "description",
  },
  {
    title: "Verify on Stellar",
    description: "Proof verified on Soroban contract.",
    icon: "verified_user",
  },
  {
    title: "Unlock Access",
    description: "Get verified access to property details.",
    icon: "key",
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
