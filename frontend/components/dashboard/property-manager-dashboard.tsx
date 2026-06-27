"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ApiError, api, type AgentDashboard } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { EmptyRow, Panel, Row, StatCard, StatusBadge, formatDate } from "./dashboard-ui";
import { Icon, type IconName } from "@/components/ui/icon";
import { ListRowSkeletonGroup } from "@/components/ui/skeleton";
import { VerificationProgress } from "@/components/verification/verification-progress";
import { EscrowSummaryCards } from "@/components/escrow/escrow-summary-cards";

export function PropertyManagerDashboardView() {
  const { token, user } = useAuth();
  const [dashboard, setDashboard] = useState<AgentDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    api.agents
      .myDashboard(token)
      .then(setDashboard)
      .catch((err) => {
        setError(err instanceof ApiError ? err.message : "Could not load your agent dashboard.");
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (error) {
    return (
      <div className="px-6 py-8">
        <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">
          Welcome back, {user?.name?.split(" ")[0] ?? "Manager"}!
        </h1>
        <p className="mt-4 text-sm text-ur-error">{error}</p>
        <p className="mt-1 text-sm text-ur-text-secondary">
          Your agent profile may still be setting up. Try again shortly or contact support if this persists.
        </p>
      </div>
    );
  }

  const stats: { label: string; value: number; icon: IconName; color: string }[] = [
    { label: "Total Listings", value: dashboard?.stats.totalListings ?? 0, icon: "apartment", color: "text-ur-cyan" },
    { label: "Viewing Requests", value: dashboard?.stats.totalViewingRequests ?? 0, icon: "credit_card", color: "text-ur-mint" },
    { label: "Verified Tenants", value: dashboard?.stats.verifiedTenants ?? 0, icon: "person_check", color: "text-ur-primary" },
    { label: "Escrow / Holds", value: dashboard?.stats.escrowHolds ?? 0, icon: "lock", color: "text-ur-warning" },
    { label: "Viewing Codes", value: dashboard?.stats.activeViewingCodes ?? 0, icon: "key", color: "text-ur-cyan" },
    { label: "Reports", value: (dashboard?.stats.openReports ?? 0) + (dashboard?.stats.resolvedReports ?? 0), icon: "flag", color: "text-ur-error" },
  ];

  return (
    <div className="px-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-black tracking-[-0.02em] text-ur-navy">
            Welcome back, {user?.name?.split(" ")[0] ?? "Manager"}!
            {dashboard?.verificationStatus === "VERIFIED" ? (
              <Icon name="verified" size={20} className="text-ur-primary" />
            ) : null}
          </h1>
          <p className="mt-1 text-sm text-ur-text-secondary">Here&apos;s what&apos;s happening across your properties.</p>
        </div>
        <Link
          href="/listings/new"
          className="flex items-center gap-2 rounded-ur-sm bg-ur-primary px-4 py-2 text-sm font-bold text-white hover:bg-ur-primary-hover"
        >
          <Icon name="add_circle" size={16} />
          Add New Listing
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
        {stats.map((stat) => (
          <StatCard key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} color={stat.color} loading={loading} />
        ))}
        <StatCard icon="verified_user" label="Trust Score" value={`${dashboard?.trustScore ?? 0} / 100`} color="text-ur-mint" loading={loading} />
      </div>

      <p className="mt-6 text-sm font-bold text-ur-navy">Financial Overview</p>
      <div className="mt-2">
        <EscrowSummaryCards role={user?.role === "MANAGER" ? "MANAGER" : "AGENT"} />
      </div>

      {dashboard && dashboard.verificationStage !== "APPROVED" ? (
        <div className="mt-6">
          <VerificationProgress stage={dashboard.verificationStage} />
        </div>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Panel title={`My Listings (${dashboard?.stats.activeListings ?? 0} Active)`} viewAllHref="/listings/mine">
            {loading ? (
              <ListRowSkeletonGroup />
            ) : !dashboard || dashboard.listings.length === 0 ? (
              <EmptyRow text="No listings yet." />
            ) : (
              dashboard.listings.slice(0, 4).map((listing) => (
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

          <Panel title="Escrow / Payment Hold Status" viewAllHref="/escrow">
            {loading ? (
              <ListRowSkeletonGroup />
            ) : !dashboard || dashboard.escrowHolds.length === 0 ? (
              <EmptyRow text="No active escrow holds." />
            ) : (
              dashboard.escrowHolds.map((hold) => (
                <Row key={hold.id}>
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{hold.listingTitle}</p>
                    <p className="font-mono text-xs text-ur-text-secondary">Escrow ID: {hold.paymentId.slice(0, 12)}...</p>
                  </div>
                  <span className="rounded-full border border-ur-cyan/40 px-2.5 py-0.5 text-xs font-semibold text-ur-cyan">
                    {hold.amount} {hold.currency} Held
                  </span>
                </Row>
              ))
            )}
          </Panel>

          <Panel title="Reports Overview" viewAllHref="/reports">
            {loading ? (
              <ListRowSkeletonGroup />
            ) : !dashboard || dashboard.reports.length === 0 ? (
              <EmptyRow text="No reports filed against your listings." />
            ) : (
              dashboard.reports.slice(0, 4).map((report) => (
                <Row key={report.id}>
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{report.listingTitle}</p>
                    <p className="text-xs text-ur-text-secondary">{report.reportType.replace(/_/g, " ")} · {formatDate(report.createdAt)}</p>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      report.status === "OPEN" ? "border-ur-warning/40 text-ur-warning" : "border-ur-primary/40 text-ur-primary"
                    }`}
                  >
                    {report.status === "OPEN" ? "Under Review" : report.status}
                  </span>
                </Row>
              ))
            )}
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Recent Viewing Requests" viewAllHref="/listings">
            {loading ? (
              <ListRowSkeletonGroup />
            ) : !dashboard || dashboard.viewingRequests.length === 0 ? (
              <EmptyRow text="No viewing requests yet." />
            ) : (
              dashboard.viewingRequests.slice(0, 4).map((request) => (
                <Row key={request.id}>
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{request.tenantName}</p>
                    <p className="text-xs text-ur-text-secondary">
                      {request.listingTitle} · {formatDate(request.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={request.status} />
                </Row>
              ))
            )}
          </Panel>

          <Panel title={`Verified Tenants (${dashboard?.stats.verifiedTenants ?? 0})`}>
            {loading ? (
              <ListRowSkeletonGroup />
            ) : !dashboard || dashboard.verifiedTenants.length === 0 ? (
              <EmptyRow text="No tenants have viewed your listings yet." />
            ) : (
              dashboard.verifiedTenants.map((tenant) => (
                <Row key={tenant.email}>
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{tenant.name}</p>
                    <p className="text-xs text-ur-text-secondary">{tenant.email}</p>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      tenant.status === "ACTIVE" ? "border-ur-primary/40 text-ur-primary" : "border-ur-text-muted text-ur-text-muted"
                    }`}
                  >
                    {tenant.status === "ACTIVE" ? "Verified" : tenant.status}
                  </span>
                </Row>
              ))
            )}
          </Panel>

          <Panel title="Active Viewing Codes">
            {loading ? (
              <ListRowSkeletonGroup />
            ) : !dashboard || dashboard.activeViewingCodes.length === 0 ? (
              <EmptyRow text="No active viewing codes." />
            ) : (
              dashboard.activeViewingCodes.map((code) => (
                <Row key={code.id}>
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{code.listingTitle}</p>
                    <p className="font-mono text-xs text-ur-text-secondary">Code: {code.code}</p>
                  </div>
                  <span className="text-xs text-ur-text-muted">
                    Expires {code.expiresAt ? formatDate(code.expiresAt) : "—"}
                  </span>
                </Row>
              ))
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}
