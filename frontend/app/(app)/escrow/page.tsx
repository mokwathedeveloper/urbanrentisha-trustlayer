"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api, type ViewingRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { formatDate } from "@/components/dashboard/dashboard-ui";
import { Icon } from "@/components/ui/icon";
import { RoleGuard, useHasRole } from "@/components/auth/role-guard";
import { EscrowManagementView } from "@/components/escrow/escrow-management-view";
import { useRealtimeEvent } from "@/lib/realtime";

const ALLOWED_ROLES = ["TENANT", "LANDLORD", "AGENT", "MANAGER"] as const;

export default function EscrowPage() {
  const { user } = useAuth();

  if (user?.role === "LANDLORD" || user?.role === "AGENT" || user?.role === "MANAGER") {
    return (
      <RoleGuard allow={[...ALLOWED_ROLES]}>
        <EscrowManagementView role={user.role} />
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allow={[...ALLOWED_ROLES]}>
      <TenantEscrowView />
    </RoleGuard>
  );
}

const SECTION_TITLES: Record<string, string> = {
  held: "Currently Held",
  released: "Released",
  refunded: "Refunded",
};

function TenantEscrowView() {
  const { token } = useAuth();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const allowed = useHasRole(["TENANT"]);
  const [requests, setRequests] = useState<ViewingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    if (!token || !allowed) return;
    api.viewingRequests
      .findMine(token)
      .then((response) => setRequests(response.items))
      .finally(() => setLoading(false));
  }

  useEffect(load, [token, allowed]);

  // Escrow funded/released/refunded notifications already push in real
  // time - refetch so this view updates without a manual refresh.
  useRealtimeEvent(token, "notification:new", (notification: { type: string }) => {
    if (notification.type === "PAYMENT") load();
  });

  const held = requests.filter((r) => r.payment?.status === "RECEIVED");
  const released = requests.filter((r) => r.payment?.status === "RELEASED");
  const refunded = requests.filter((r) => r.payment?.status === "REFUNDED");

  if (filter && SECTION_TITLES[filter]) {
    const filteredRequests = filter === "held" ? held : filter === "released" ? released : refunded;
    return (
      <div className="px-6 py-8">
        <Link href="/escrow" className="flex items-center gap-1 text-sm font-semibold text-ur-mint hover:underline">
          <Icon name="arrow_back" size={16} />
          View All Escrow Activity
        </Link>
        <h1 className="mt-4 text-2xl font-black tracking-[-0.02em] text-ur-navy">{SECTION_TITLES[filter]}</h1>
        <RequestSection title={SECTION_TITLES[filter]} requests={filteredRequests} loading={loading} emptyLabel="Nothing here yet." />
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Escrow / Holds</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">
        Viewing fees held in escrow until your zero-knowledge proof is verified and your viewing code unlocks.
      </p>

      <RequestSection title="Currently Held" requests={held} loading={loading} emptyLabel="No active escrow holds." />
      <RequestSection title="Released" requests={released} loading={loading} emptyLabel="No funds released yet." />
      <RequestSection title="Refunded" requests={refunded} loading={loading} emptyLabel="No refunds issued." />
    </div>
  );
}

function RequestSection({
  title,
  requests,
  loading,
  emptyLabel,
}: {
  title: string;
  requests: ViewingRequest[];
  loading: boolean;
  emptyLabel: string;
}) {
  return (
    <div className="mt-6 ur-card">
      <p className="border-b border-ur-border p-4 text-sm font-bold text-ur-navy">
        {title} <span className="text-ur-text-muted">({requests.length})</span>
      </p>
      {loading ? <p className="p-5 text-sm text-ur-text-muted">Loading...</p> : null}
      {!loading && requests.length === 0 ? (
        <div className="flex flex-col items-center gap-3 p-10 text-center">
          <Icon name="lock" size={32} className="text-ur-text-muted" />
          <p className="text-sm text-ur-text-muted">{emptyLabel}</p>
        </div>
      ) : null}
      <div className="divide-y divide-ur-border">
        {requests.map((request) => (
          <Link
            key={request.id}
            href={`/requests/${request.id}/escrow`}
            className="flex items-center justify-between gap-4 p-4 hover:bg-ur-card-hover"
          >
            <div>
              <p className="text-sm font-bold text-ur-navy">{request.listing?.title ?? "Listing"}</p>
              <p className="mt-0.5 font-mono text-xs text-ur-text-secondary">Escrow ID: {request.payment?.id.slice(0, 16)}...</p>
              <p className="mt-0.5 text-xs text-ur-text-muted">{formatDate(request.createdAt)}</p>
            </div>
            <span className="rounded-full border border-ur-cyan/40 px-2.5 py-0.5 text-xs font-semibold text-ur-cyan">
              {request.payment?.amount} {request.payment?.stellarAsset}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
