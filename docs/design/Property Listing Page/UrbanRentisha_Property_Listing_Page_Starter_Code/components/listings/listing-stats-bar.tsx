import { BadgeCheck, Building2, ShieldCheck } from "lucide-react";
import type { PropertyListing } from "@/lib/listings-data";

type ListingStatsBarProps = { listings: PropertyListing[] };

export function ListingStatsBar({ listings }: ListingStatsBarProps) {
  const verifiedCount = listings.filter((listing) => listing.verificationStatus === "Verified").length;
  const averageTrust = Math.round(listings.reduce((total, listing) => total + listing.trustScore, 0) / listings.length);
  return (
    <div className="grid min-w-[320px] grid-cols-3 gap-2 rounded-ur-lg border border-white/10 bg-white/[0.035] p-3 backdrop-blur-xl">
      <Stat icon={<Building2 className="h-4 w-4" />} label="Listings" value={listings.length.toString()} />
      <Stat icon={<BadgeCheck className="h-4 w-4" />} label="Verified" value={verifiedCount.toString()} />
      <Stat icon={<ShieldCheck className="h-4 w-4" />} label="Trust" value={`${averageTrust}%`} />
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
      <div className="mb-2 text-ur-primary">{icon}</div>
      <p className="text-lg font-black text-white">{value}</p>
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">{label}</p>
    </div>
  );
}
