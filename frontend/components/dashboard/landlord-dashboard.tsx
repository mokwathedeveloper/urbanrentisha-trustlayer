"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type Listing, type UserProfile } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { EmptyRow, Panel, Row, StatCard } from "./dashboard-ui";
import { Icon } from "@/components/ui/icon";
import { VerificationProgress } from "@/components/verification/verification-progress";

export function LandlordDashboardView() {
  const { token, user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    Promise.all([api.listings.findMine(token), api.users.me(token)])
      .then(([myListings, me]) => {
        setListings(myListings);
        setProfile(me);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const activeListings = listings.filter((listing) => listing.verificationStatus === "VERIFIED");
  const pendingListings = listings.filter((listing) => listing.verificationStatus !== "VERIFIED");

  return (
    <div className="px-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-black tracking-[-0.02em] text-ur-navy">
            Welcome back, {user?.name?.split(" ")[0] ?? "Landlord"}!
            {profile?.landlordProfile?.verificationStage === "APPROVED" ? (
              <Icon name="verified" size={20} className="text-ur-primary" />
            ) : null}
          </h1>
          <p className="mt-1 text-sm text-ur-text-secondary">Here&apos;s an overview of your properties.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/team"
            className="flex items-center gap-2 rounded-ur-sm border border-ur-border bg-ur-card px-4 py-2 text-sm font-bold text-ur-navy hover:bg-ur-card-soft"
          >
            <Icon name="groups" size={16} />
            My Team
          </Link>
          <Link
            href="/listings/new"
            className="flex items-center gap-2 rounded-ur-sm bg-ur-primary px-4 py-2 text-sm font-bold text-white hover:bg-ur-primary-hover"
          >
            <Icon name="add_circle" size={16} />
            Add New Listing
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon="apartment" label="Total Listings" value={listings.length} color="text-ur-cyan" loading={loading} />
        <StatCard icon="verified_user" label="Active Listings" value={activeListings.length} color="text-ur-primary" loading={loading} />
        <StatCard icon="schedule" label="Pending Review" value={pendingListings.length} color="text-ur-warning" loading={loading} />
        <StatCard
          icon="verified_user"
          label="Trust Score"
          value={`${profile?.landlordProfile?.trustScore ?? 0} / 100`}
          color="text-ur-mint"
          loading={loading}
        />
      </div>

      {profile?.landlordProfile && profile.landlordProfile.verificationStage !== "APPROVED" ? (
        <div className="mt-6">
          <VerificationProgress stage={profile.landlordProfile.verificationStage} />
        </div>
      ) : null}

      <div className="mt-6">
        <Panel title={`My Listings (${activeListings.length} Active)`} viewAllHref="/listings">
          {listings.length === 0 ? (
            <EmptyRow text="No listings yet. Add your first property to get started." />
          ) : (
            listings.map((listing) => (
              <Row key={listing.id}>
                <Link href={`/listings/${listing.id}`}>
                  <p className="text-sm font-bold text-ur-navy hover:underline">{listing.title}</p>
                  <p className="text-xs text-ur-text-secondary">{listing.location}</p>
                </Link>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                    listing.verificationStatus === "VERIFIED"
                      ? "border-ur-primary/40 text-ur-primary"
                      : "border-ur-text-muted text-ur-text-muted"
                  }`}
                >
                  {listing.verificationStatus === "VERIFIED" ? "Active" : listing.verificationStatus}
                </span>
              </Row>
            ))
          )}
        </Panel>
      </div>
    </div>
  );
}
