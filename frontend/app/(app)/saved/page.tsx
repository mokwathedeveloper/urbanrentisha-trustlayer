"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type SavedListingItem } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { PropertyCard } from "@/components/listings/property-card";
import { Icon } from "@/components/ui/icon";
import { RoleGuard, useHasRole } from "@/components/auth/role-guard";

const ALLOWED_ROLES = ["TENANT"] as const;

export default function SavedPropertiesPage() {
  const { token } = useAuth();
  const allowed = useHasRole([...ALLOWED_ROLES]);
  const [saved, setSaved] = useState<SavedListingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !allowed) return;
    api.listings
      .findSaved(token)
      .then(setSaved)
      .finally(() => setLoading(false));
  }, [token, allowed]);

  function handleUnsave(listingId: string) {
    setSaved((prev) => prev.filter((item) => item.listingId !== listingId));
  }

  return (
    <RoleGuard allow={[...ALLOWED_ROLES]}>
    <div className="px-6 py-8">
      <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Saved Properties</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">Properties you have saved to review later.</p>

      {loading ? <p className="mt-6 text-sm text-ur-text-muted">Loading...</p> : null}

      {!loading && saved.length === 0 ? (
        <div className="ur-card mt-6 flex flex-col items-center gap-3 p-10 text-center">
          <Icon name="favorite" size={32} className="text-ur-text-muted" />
          <p className="text-sm text-ur-text-muted">You haven&apos;t saved any properties yet.</p>
          <Link href="/listings" className="text-sm font-semibold text-ur-primary hover:underline">
            Browse verified properties &rarr;
          </Link>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {saved.map((item) => (
          <PropertyCard key={item.id} listing={item.listing} initialSaved onUnsave={handleUnsave} />
        ))}
      </div>
    </div>
  </RoleGuard>
  );
}
