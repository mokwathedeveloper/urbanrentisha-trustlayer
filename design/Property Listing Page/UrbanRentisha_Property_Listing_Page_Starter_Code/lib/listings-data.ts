export type PropertyType = "Apartment" | "Studio" | "Townhouse" | "Bedsitter" | "Maisonette";
export type VerificationStatus = "Verified" | "Pending Review";

export type PropertyListing = {
  id: string;
  title: string;
  location: string;
  neighborhood: string;
  priceKes: number;
  bedrooms: number;
  bathrooms: number;
  type: PropertyType;
  sizeSqm: number;
  agentName: string;
  agentVerified: boolean;
  verificationStatus: VerificationStatus;
  trustScore: number;
  viewingFeeKes: number;
  imageTone: "emerald" | "mint" | "forest" | "cyan" | "lime" | "dark";
  tags: string[];
  availableFrom: string;
  description: string;
};

export const propertyListings: PropertyListing[] = [
  {
    id: "UR-LST-1001",
    title: "Kilimani Green View Apartment",
    location: "Kilimani, Nairobi",
    neighborhood: "Kilimani",
    priceKes: 68000,
    bedrooms: 2,
    bathrooms: 2,
    type: "Apartment",
    sizeSqm: 92,
    agentName: "Amina Realty Group",
    agentVerified: true,
    verificationStatus: "Verified",
    trustScore: 97,
    viewingFeeKes: 500,
    imageTone: "emerald",
    tags: ["Balcony", "Secure parking", "Near malls"],
    availableFrom: "Available now",
    description: "Verified two-bedroom apartment with controlled viewing access and agent verification."
  },
  {
    id: "UR-LST-1002",
    title: "Westlands Executive Studio",
    location: "Westlands, Nairobi",
    neighborhood: "Westlands",
    priceKes: 42000,
    bedrooms: 1,
    bathrooms: 1,
    type: "Studio",
    sizeSqm: 48,
    agentName: "Urban Nest Agents",
    agentVerified: true,
    verificationStatus: "Verified",
    trustScore: 94,
    viewingFeeKes: 300,
    imageTone: "mint",
    tags: ["Lift", "Backup power", "Fiber ready"],
    availableFrom: "Available in 5 days",
    description: "Compact verified studio for tenants needing secure access near business hubs."
  },
  {
    id: "UR-LST-1003",
    title: "Rongai Family Townhouse",
    location: "Ongata Rongai, Kajiado",
    neighborhood: "Rongai",
    priceKes: 85000,
    bedrooms: 3,
    bathrooms: 3,
    type: "Townhouse",
    sizeSqm: 156,
    agentName: "Savanna Homes",
    agentVerified: true,
    verificationStatus: "Verified",
    trustScore: 91,
    viewingFeeKes: 700,
    imageTone: "forest",
    tags: ["Compound", "Water storage", "Family friendly"],
    availableFrom: "Available now",
    description: "Verified townhouse with clear agent accountability and payment-proof viewing request."
  },
  {
    id: "UR-LST-1004",
    title: "Kasarani Smart Bedsitter",
    location: "Kasarani, Nairobi",
    neighborhood: "Kasarani",
    priceKes: 18000,
    bedrooms: 1,
    bathrooms: 1,
    type: "Bedsitter",
    sizeSqm: 28,
    agentName: "Metro Lets Kenya",
    agentVerified: true,
    verificationStatus: "Verified",
    trustScore: 89,
    viewingFeeKes: 200,
    imageTone: "lime",
    tags: ["Affordable", "Close to road", "Prepaid meter"],
    availableFrom: "Available now",
    description: "Affordable verified bedsitter with low viewing fee and controlled access unlock."
  },
  {
    id: "UR-LST-1005",
    title: "Lavington Maisonette Residence",
    location: "Lavington, Nairobi",
    neighborhood: "Lavington",
    priceKes: 145000,
    bedrooms: 4,
    bathrooms: 4,
    type: "Maisonette",
    sizeSqm: 230,
    agentName: "Prime Habitat",
    agentVerified: true,
    verificationStatus: "Verified",
    trustScore: 98,
    viewingFeeKes: 1000,
    imageTone: "dark",
    tags: ["DSQ", "Garden", "Gated community"],
    availableFrom: "Available in 2 weeks",
    description: "Premium verified residence with strong trust score and secure viewing workflow."
  },
  {
    id: "UR-LST-1006",
    title: "Thika Road Two Bedroom",
    location: "Thika Road, Nairobi",
    neighborhood: "Thika Road",
    priceKes: 35000,
    bedrooms: 2,
    bathrooms: 1,
    type: "Apartment",
    sizeSqm: 72,
    agentName: "Greenline Properties",
    agentVerified: false,
    verificationStatus: "Pending Review",
    trustScore: 74,
    viewingFeeKes: 300,
    imageTone: "cyan",
    tags: ["Road access", "Water included", "Shops nearby"],
    availableFrom: "Pending verification",
    description: "Listing pending final agent verification. Viewing request should remain disabled until verified."
  }
];

export const neighborhoods = ["All locations", "Kilimani", "Westlands", "Rongai", "Kasarani", "Lavington", "Thika Road"];
export const propertyTypes = ["All types", "Apartment", "Studio", "Townhouse", "Bedsitter", "Maisonette"] as const;
export const priceRanges = [
  { label: "Any price", min: 0, max: Number.MAX_SAFE_INTEGER },
  { label: "Below KES 30K", min: 0, max: 30000 },
  { label: "KES 30K–60K", min: 30000, max: 60000 },
  { label: "KES 60K–100K", min: 60000, max: 100000 },
  { label: "Above KES 100K", min: 100000, max: Number.MAX_SAFE_INTEGER }
];
export const bedroomFilters = ["Any", "1+", "2+", "3+", "4+"] as const;
export type SortOption = "recommended" | "price-low" | "price-high" | "trust-high";
export const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Recommended", value: "recommended" },
  { label: "Lowest price", value: "price-low" },
  { label: "Highest price", value: "price-high" },
  { label: "Highest trust score", value: "trust-high" }
];
