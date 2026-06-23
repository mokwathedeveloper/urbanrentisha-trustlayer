"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api, type Listing } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/ui/icon";

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
  const { token, user } = useAuth();
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved);
  const [pending, setPending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isAdmin = user?.role === "ADMIN" || user?.role === "PLATFORM";
  const isOwner =
    Boolean(user) &&
    (listing.ownerId === user?.id || listing.agent?.user.id === user?.id || listing.manager?.user.id === user?.id);

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
    } catch {
      // Best-effort toggle - if the request fails, leave the saved state
      // as it was rather than surfacing an unhandled rejection from this
      // click handler.
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
          <Icon name="favorite" size={16} className={`${saved ? "fill-ur-error text-ur-error" : ""}`} />
        </button>
        {listing.verificationStatus === "VERIFIED" ? (
          <Badge variant="verified" className="absolute bottom-3 left-3">
            Verified
          </Badge>
        ) : null}
        {listing.availabilityStatus === "RESERVED" ? (
          <Badge variant="warning" className="absolute bottom-3 right-3">
            Reserved
          </Badge>
        ) : listing.availabilityStatus === "RENTED" ? (
          <Badge variant="neutral" className="absolute bottom-3 right-3">
            Rented
          </Badge>
        ) : null}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-ur-navy">{listing.title}</h3>
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              aria-label="More options"
              onClick={() => setMenuOpen((open) => !open)}
              className="text-ur-text-muted hover:text-ur-navy"
            >
              <Icon name="more_vert" size={16} />
            </button>
            {menuOpen ? (
              <div className="absolute right-0 top-full z-10 mt-1 w-44 overflow-hidden rounded-ur-sm border border-ur-border bg-ur-card shadow-lg">
                <Link
                  href={`/listings/${listing.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-ur-text-secondary hover:bg-ur-card-soft"
                >
                  <Icon name="visibility" size={14} />
                  View Details
                </Link>
                {isAdmin ? (
                  <Link
                    href={`/listings/${listing.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-ur-text-secondary hover:bg-ur-card-soft"
                  >
                    <Icon name="verified_user" size={14} />
                    Review Listing
                  </Link>
                ) : !isOwner ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      router.push(`/reports/new?listingId=${listing.id}`);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-ur-error hover:bg-ur-card-soft"
                  >
                    <Icon name="flag" size={14} />
                    Report Listing
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm text-ur-text-secondary">
          <Icon name="location_on" size={14} />
          {listing.location}
        </p>
        <p className="mt-2 text-lg font-black text-ur-navy">
          {listing.currency} {listing.rentAmount.toLocaleString()}
          <span className="text-sm font-medium text-ur-text-muted"> / year</span>
        </p>

        <div className="mt-3 flex items-center gap-4 text-sm text-ur-text-secondary">
          {listing.bedrooms != null ? (
            <span className="flex items-center gap-1">
              <Icon name="bed" size={16} />
              {listing.bedrooms} Beds
            </span>
          ) : null}
          {listing.bathrooms != null ? (
            <span className="flex items-center gap-1">
              <Icon name="bathtub" size={16} />
              {listing.bathrooms} Baths
            </span>
          ) : null}
          <span className="flex items-center gap-1">
            <Icon name="open_in_full" size={16} />
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
              <Icon name="arrow_forward" size={14} />
            </Link>
          </div>
        ) : isOwner ? (
          <Link href={`/listings/${listing.id}`}>
            <Button variant="secondary" className="mt-4 w-full">
              This is your listing
            </Button>
          </Link>
        ) : isAdmin ? (
          <Link href={`/listings/${listing.id}`}>
            <Button variant="secondary" className="mt-4 w-full">
              Review Listing
            </Button>
          </Link>
        ) : (
          <Link href={`/listings/${listing.id}`}>
            <Button className="mt-4 w-full">
              {listing.availabilityStatus === "RESERVED"
                ? "Reserved - View Details"
                : listing.availabilityStatus === "RENTED"
                  ? "Already Rented"
                  : "Request Viewing"}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
