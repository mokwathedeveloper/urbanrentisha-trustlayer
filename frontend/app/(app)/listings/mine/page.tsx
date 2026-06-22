"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type Listing } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { PropertyCard } from "@/components/listings/property-card";
import { Icon } from "@/components/ui/icon";
import { RoleGuard, useHasRole } from "@/components/auth/role-guard";

const ALLOWED_ROLES = ["LANDLORD", "AGENT", "MANAGER"] as const;

export default function MyPropertiesPage() {
  const { token, user } = useAuth();
  const allowed = useHasRole([...ALLOWED_ROLES]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !allowed) return;
    api.listings
      .findMine(token)
      .then(setListings)
      .finally(() => setLoading(false));
  }, [token, allowed]);

  const heading =
    user?.role === "LANDLORD" ? "My Properties" : "Properties Assigned To Me";
  const subheading =
    user?.role === "LANDLORD"
      ? "Properties you own and have listed."
      : "Properties your landlord has assigned to you. You won't see other landlords' listings here.";

  return (
    <RoleGuard allow={[...ALLOWED_ROLES]}>
      <div className="px-6 py-8">
        <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">{heading}</h1>
        <p className="mt-1 text-sm text-ur-text-secondary">{subheading}</p>

        {loading ? (
          <p className="mt-6 text-sm text-ur-text-muted">Loading...</p>
        ) : listings.length === 0 ? (
          <div className="ur-card mt-6 flex flex-col items-center gap-3 p-10 text-center">
            <Icon name="apartment" size={32} className="text-ur-text-muted" />
            <p className="text-sm text-ur-text-muted">
              {user?.role === "LANDLORD"
                ? "You haven't listed any properties yet."
                : "No properties have been assigned to you yet."}
            </p>
            {user?.role === "LANDLORD" ? (
              <Link href="/listings/new" className="text-sm font-semibold text-ur-primary hover:underline">
                List a property &rarr;
              </Link>
            ) : null}
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} variant="details" />
            ))}
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
