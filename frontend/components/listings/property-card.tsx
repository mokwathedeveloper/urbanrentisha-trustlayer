"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Bath, BedDouble, Heart, MapPin, Maximize, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api, type Listing } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export function PropertyCard({
  listing,
  variant = "request",
  initialSaved = false,
  onUnsave,
}: {
  listing: Listing;
  variant?: "request" | "details";
  initialSaved?: boolean;
  onUnsave?: (listingId: string) => void;
}) {
  const { token } = useAuth();
  const [saved, setSaved] = useState(initialSaved);
  const [pending, setPending] = useState(false);

  async function toggleSave(e: React.MouseEvent) {
    e.preventDefault();
    if (!token || pending) return;
    setPending(true);
    try {
      if (saved) {
        await api.listings.unsave(token, listing.id);
        setSaved(false);
        onUnsave?.(listing.id);
      } else {
        await api.listings.save(token, listing.id);
        setSaved(true);
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="ur-card overflow-hidden">
      <div className="relative h-44 bg-ur-card-soft">
        {listing.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={listing.imageUrl} alt={listing.title} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center text-ur-text-muted">No image</div>
        )}
        <button
          type="button"
          aria-label={saved ? "Remove from saved properties" : "Save property"}
          onClick={toggleSave}
          disabled={pending}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur disabled:opacity-60"
        >
          <Heart className={`h-4 w-4 ${saved ? "fill-ur-error text-ur-error" : ""}`} />
        </button>
        {listing.verificationStatus === "VERIFIED" ? (
          <Badge variant="verified" className="absolute bottom-3 left-3">
            Verified
          </Badge>
        ) : null}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-ur-navy">{listing.title}</h3>
          <button type="button" aria-label="More options" className="text-ur-text-muted hover:text-ur-navy">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm text-ur-text-secondary">
          <MapPin className="h-3.5 w-3.5" />
          {listing.location}
        </p>
        <p className="mt-2 text-lg font-black text-ur-navy">
          {listing.currency} {listing.rentAmount.toLocaleString()}
          <span className="text-sm font-medium text-ur-text-muted"> / year</span>
        </p>

        <div className="mt-3 flex items-center gap-4 text-sm text-ur-text-secondary">
          {listing.bedrooms != null ? (
            <span className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" />
              {listing.bedrooms} Beds
            </span>
          ) : null}
          {listing.bathrooms != null ? (
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              {listing.bathrooms} Baths
            </span>
          ) : null}
          <span className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            {listing.propertyType}
          </span>
        </div>

        {variant === "details" ? (
          <div className="mt-4 flex items-center justify-between border-t border-ur-border pt-3">
            <p className="text-xs text-ur-text-secondary">
              Viewing Fee: <span className="font-semibold text-ur-text">{listing.currency} {listing.viewingFee.toLocaleString()}</span>
            </p>
            <Link
              href={`/listings/${listing.id}`}
              className="flex items-center gap-1 text-sm font-semibold text-ur-mint hover:underline"
            >
              View Details
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <Link href={`/listings/${listing.id}`}>
            <Button className="mt-4 w-full">Request Viewing</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
