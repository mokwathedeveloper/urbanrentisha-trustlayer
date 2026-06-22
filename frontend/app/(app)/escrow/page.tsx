"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type ViewingRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { formatDate } from "@/components/dashboard/dashboard-ui";
import { Icon } from "@/components/ui/icon";
import { RoleGuard, useHasRole } from "@/components/auth/role-guard";

const ALLOWED_ROLES = ["TENANT"] as const;

export default function EscrowPage() {
  const { token } = useAuth();
  const allowed = useHasRole([...ALLOWED_ROLES]);
  const [requests, setRequests] = useState<ViewingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !allowed) return;
    api.viewingRequests
      .findMine(token)
      .then(setRequests)
      .finally(() => setLoading(false));
  }, [token, allowed]);

  const held = requests.filter((r) => r.payment?.status === "RECEIVED" && r.viewingCode?.status !== "ACTIVE");
  const released = requests.filter((r) => r.payment?.status === "RECEIVED" && r.viewingCode?.status === "ACTIVE");

  return (
    <RoleGuard allow={[...ALLOWED_ROLES]}>
    <div className="px-6 py-8">
      <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Escrow / Holds</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">
        Viewing fees held in escrow until your zero-knowledge proof is verified and your viewing code unlocks.
      </p>

      <div className="mt-6 ur-card">
        <p className="border-b border-ur-border p-4 text-sm font-bold text-ur-navy">Currently Held</p>
        {loading ? <p className="p-5 text-sm text-ur-text-muted">Loading...</p> : null}
        {!loading && held.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-10 text-center">
            <Icon name="lock" size={32} className="text-ur-text-muted" />
            <p className="text-sm text-ur-text-muted">No active escrow holds.</p>
          </div>
        ) : null}
        <div className="divide-y divide-ur-border">
          {held.map((request) => (
            <Link
              key={request.id}
              href={`/requests/${request.id}/escrow`}
              className="flex items-center justify-between gap-4 p-4 hover:bg-ur-card-hover"
            >
              <div>
                <p className="text-sm font-bold text-ur-navy">{request.listing?.title ?? "Listing"}</p>
                <p className="mt-0.5 font-mono text-xs text-ur-text-secondary">Escrow ID: {request.payment?.id.slice(0, 16)}...</p>
              </div>
              <span className="rounded-full border border-ur-cyan/40 px-2.5 py-0.5 text-xs font-semibold text-ur-cyan">
                {request.payment?.amount} {request.payment?.stellarAsset} Held
              </span>
            </Link>
          ))}
        </div>
      </div>

      {released.length > 0 ? (
        <div className="mt-6 ur-card">
          <p className="border-b border-ur-border p-4 text-sm font-bold text-ur-navy">Released</p>
          <div className="divide-y divide-ur-border">
            {released.map((request) => (
              <div key={request.id} className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-bold text-ur-navy">{request.listing?.title ?? "Listing"}</p>
                  <p className="mt-0.5 text-xs text-ur-text-muted">Released {formatDate(request.createdAt)}</p>
                </div>
                <span className="rounded-full border border-ur-primary/40 px-2.5 py-0.5 text-xs font-semibold text-ur-primary">
                  Released
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  </RoleGuard>
  );
}
