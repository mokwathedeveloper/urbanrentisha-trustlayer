import { BadgeCheck, Home, MapPin } from "lucide-react";
import { targetFacts, type ListingReportTarget } from "@/lib/report-data";
import { Badge } from "@/components/ui/badge";

type PropertyUnderReviewCardProps = {
  target: ListingReportTarget;
};

export function PropertyUnderReviewCard({ target }: PropertyUnderReviewCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Listing being reported
          </p>
          <h2 className="mt-2 text-lg font-black text-white">{target.listingTitle}</h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-white/52">
            <MapPin className="h-4 w-4 text-ur-primary" />
            {target.location}
          </p>
        </div>

        <Badge variant="success">
          <BadgeCheck className="h-3.5 w-3.5" />
          {target.verificationStatus}
        </Badge>
      </div>

      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <Home className="mb-3 h-5 w-5 text-ur-primary" />
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
          Monthly rent
        </p>
        <p className="mt-1 text-xl font-black text-white">
          KES {target.monthlyRentKes.toLocaleString()}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {targetFacts.map((fact) => {
          const Icon = fact.icon;
          return (
            <div key={fact.label} className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <Icon className="mb-2 h-4 w-4 text-ur-primary" />
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">{fact.label}</p>
              <p className="mt-1 truncate font-mono text-xs font-bold text-white">{fact.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
