import Link from "next/link";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { managerListings, statusVisuals, type ListingStatus } from "@/lib/property-manager-data";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/property-manager-dashboard/status-badge";

export function ListingsOverviewCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Manager listings
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Active verified rental inventory
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/56">
            Track listing verification, request volume, verified viewings, rent, and viewing fees.
          </p>
        </div>

        <Link href="/manager/listings">
          <Button variant="outline" size="sm">
            View listings
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-5 overflow-hidden rounded-ur-lg border border-white/10">
        <div className="hidden grid-cols-[1.35fr_130px_130px_135px_135px_120px] gap-4 border-b border-white/10 bg-black/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/38 xl:grid">
          <span>Property</span>
          <span>Rent</span>
          <span>Viewing fee</span>
          <span>Requests</span>
          <span>Verified views</span>
          <span>Status</span>
        </div>

        <div className="divide-y divide-white/10">
          {managerListings.map((listing) => {
            const status = statusVisuals.listing[listing.status as ListingStatus];

            return (
              <article
                key={listing.id}
                className="grid gap-4 bg-black/10 px-4 py-4 xl:grid-cols-[1.35fr_130px_130px_135px_135px_120px] xl:items-center"
              >
                <div className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <Link
                      href={`/properties/${listing.id}`}
                      className="font-black text-white transition-colors hover:text-ur-mint ur-focus"
                    >
                      {listing.title}
                    </Link>
                    <p className="mt-1 flex items-center gap-2 text-sm text-white/52">
                      <MapPin className="h-4 w-4 text-ur-primary" />
                      {listing.location}
                    </p>
                    <p className="mt-2 font-mono text-xs font-bold text-ur-mint">
                      {listing.id}
                    </p>
                  </div>
                </div>

                <p className="font-bold text-white">KES {listing.rentKes.toLocaleString()}</p>
                <p className="font-bold text-white">KES {listing.viewingFeeKes.toLocaleString()}</p>
                <p className="font-bold text-white">{listing.requests}</p>
                <p className="font-bold text-white">{listing.verifiedViews}</p>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
