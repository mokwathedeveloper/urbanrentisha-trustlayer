export type VerificationStatus = "Verified" | "Pending Review" | "Flagged";
export type PropertyType = "Apartment" | "Studio" | "Townhouse" | "Bedsitter" | "Maisonette";
export type SortMode = "recommended" | "rent-low" | "rent-high" | "trust-high" | "viewing-fee-low";

export type SearchProperty = {
  id: string;
  title: string;
  location: string;
  neighborhood: string;
  rentKes: number;
  viewingFeeKes: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  type: PropertyType;
  verificationStatus: VerificationStatus;
  trustScore: number;
  agentVerified: boolean;
  imageTone: "emerald" | "mint" | "forest" | "cyan" | "lime" | "dark";
  tags: string[];
};

export const searchProperties: SearchProperty[] = [
  {
    id: "UR-LST-1001",
    title: "Kilimani Green View Apartment",
    location: "Kilimani, Nairobi",
    neighborhood: "Kilimani",
    rentKes: 68000,
    viewingFeeKes: 500,
    bedrooms: 2,
    bathrooms: 2,
    sizeSqm: 92,
    type: "Apartment",
    verificationStatus: "Verified",
    trustScore: 97,
    agentVerified: true,
    imageTone: "emerald",
    tags: ["Balcony", "Secure parking", "Near malls"]
  },
  {
    id: "UR-LST-1002",
    title: "Westlands Executive Studio",
    location: "Westlands, Nairobi",
    neighborhood: "Westlands",
    rentKes: 42000,
    viewingFeeKes: 300,
    bedrooms: 1,
    bathrooms: 1,
    sizeSqm: 48,
    type: "Studio",
    verificationStatus: "Verified",
    trustScore: 94,
    agentVerified: true,
    imageTone: "mint",
    tags: ["Lift", "Backup power", "Fiber ready"]
  },
  {
    id: "UR-LST-1003",
    title: "Rongai Family Townhouse",
    location: "Ongata Rongai, Kajiado",
    neighborhood: "Rongai",
    rentKes: 85000,
    viewingFeeKes: 700,
    bedrooms: 3,
    bathrooms: 3,
    sizeSqm: 156,
    type: "Townhouse",
    verificationStatus: "Verified",
    trustScore: 91,
    agentVerified: true,
    imageTone: "forest",
    tags: ["Compound", "Water storage", "Family friendly"]
  },
  {
    id: "UR-LST-1004",
    title: "Kasarani Smart Bedsitter",
    location: "Kasarani, Nairobi",
    neighborhood: "Kasarani",
    rentKes: 18000,
    viewingFeeKes: 200,
    bedrooms: 1,
    bathrooms: 1,
    sizeSqm: 28,
    type: "Bedsitter",
    verificationStatus: "Verified",
    trustScore: 89,
    agentVerified: true,
    imageTone: "lime",
    tags: ["Affordable", "Close to road", "Prepaid meter"]
  },
  {
    id: "UR-LST-1005",
    title: "Lavington Maisonette Residence",
    location: "Lavington, Nairobi",
    neighborhood: "Lavington",
    rentKes: 145000,
    viewingFeeKes: 1000,
    bedrooms: 4,
    bathrooms: 4,
    sizeSqm: 230,
    type: "Maisonette",
    verificationStatus: "Verified",
    trustScore: 98,
    agentVerified: true,
    imageTone: "dark",
    tags: ["DSQ", "Garden", "Gated community"]
  },
  {
    id: "UR-LST-1006",
    title: "Thika Road Two Bedroom",
    location: "Thika Road, Nairobi",
    neighborhood: "Thika Road",
    rentKes: 35000,
    viewingFeeKes: 300,
    bedrooms: 2,
    bathrooms: 1,
    sizeSqm: 72,
    type: "Apartment",
    verificationStatus: "Pending Review",
    trustScore: 74,
    agentVerified: false,
    imageTone: "cyan",
    tags: ["Road access", "Water included", "Shops nearby"]
  }
];

export const locations = ["All locations", "Kilimani", "Westlands", "Rongai", "Kasarani", "Lavington", "Thika Road"];
export const propertyTypes = ["All types", "Apartment", "Studio", "Townhouse", "Bedsitter", "Maisonette"];
export const verificationStatuses = ["Any status", "Verified", "Pending Review", "Flagged"];
export const rentRanges = [
  { label: "Any rent", min: 0, max: Number.MAX_SAFE_INTEGER },
  { label: "Below KES 30K", min: 0, max: 30000 },
  { label: "KES 30K–60K", min: 30000, max: 60000 },
  { label: "KES 60K–100K", min: 60000, max: 100000 },
  { label: "Above KES 100K", min: 100000, max: Number.MAX_SAFE_INTEGER }
];
export const viewingFeeRanges = [
  { label: "Any viewing fee", min: 0, max: Number.MAX_SAFE_INTEGER },
  { label: "KES 0–300", min: 0, max: 300 },
  { label: "KES 301–700", min: 301, max: 700 },
  { label: "KES 701–1,000", min: 701, max: 1000 },
  { label: "Above KES 1,000", min: 1001, max: Number.MAX_SAFE_INTEGER }
];
export const bedroomOptions = ["Any", "1+", "2+", "3+", "4+"];
export const sortOptions: { label: string; value: SortMode }[] = [
  { label: "Recommended", value: "recommended" },
  { label: "Rent: low to high", value: "rent-low" },
  { label: "Rent: high to low", value: "rent-high" },
  { label: "Highest trust score", value: "trust-high" },
  { label: "Lowest viewing fee", value: "viewing-fee-low" }
];
