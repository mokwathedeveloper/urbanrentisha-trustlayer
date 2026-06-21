"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type AdminOverview } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { EmptyRow, Panel, Row, StatCard, formatDate } from "./dashboard-ui";
import { Icon, type IconName } from "@/components/ui/icon";

const reportTypeLabels: Record<string, string> = {
  FAKE_LISTING: "Fake Listing",
  UNSAFE_PAYMENT: "Unsafe Payment",
  AGENT_MISMATCH: "Agent Mismatch",
  WRONG_PROPERTY: "Wrong Property",
  SUSPICIOUS_BEHAVIOR: "Suspicious Behavior",
  OTHER: "Other",
};

export function AdminDashboardView() {
  const { token, user } = useAuth();
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    api.admin
      .overview(token)
      .then(setOverview)
      .finally(() => setLoading(false));
  }, [token]);

  const s = overview?.stats;

  const stats: { label: string; value: number; icon: IconName; color: string }[] = [
    { label: "Pending Listings", value: s?.pendingListings ?? 0, icon: "apartment", color: "text-ur-warning" },
    { label: "Total Reports", value: s?.totalReports ?? 0, icon: "flag", color: "text-ur-error" },
    { label: "Active Agents", value: s?.verifiedAgents ?? 0, icon: "groups", color: "text-ur-cyan" },
    { label: "Proof Verifications", value: s?.verifiedProofs ?? 0, icon: "verified_user", color: "text-ur-mint" },
    { label: "Escrow Holds", value: s?.escrowHoldsCount ?? 0, icon: "lock", color: "text-ur-warning" },
  ];

  return (
    <div className="px-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">
            Welcome back, {user?.name?.split(" ")[0] ?? "Admin"}!
          </h1>
          <p className="mt-1 text-sm text-ur-text-secondary">Here&apos;s what&apos;s happening across the platform.</p>
        </div>
        <Link
          href="/admin/verifications"
          className="flex items-center gap-2 rounded-ur-sm bg-ur-primary px-4 py-2 text-sm font-bold text-white hover:bg-ur-primary-hover"
        >
          <Icon name="verified_user" size={16} />
          Review Verifications
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} color={stat.color} loading={loading} />
        ))}
        <StatCard icon="verified_user" label="Trust Score (Platform)" value={`${s?.platformTrustScore ?? 0} / 100`} color="text-ur-primary" loading={loading} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title={`Platform-wide Approvals (${(overview?.pendingApprovals.listings.length ?? 0) + (overview?.pendingApprovals.agents.length ?? 0)})`}>
          {!overview || overview.pendingApprovals.listings.length === 0 ? (
            <EmptyRow text="No pending listings." />
          ) : (
            overview.pendingApprovals.listings.map((listing) => (
              <Row key={listing.id}>
                <div>
                  <p className="text-sm font-bold text-ur-navy">{listing.title}</p>
                  <p className="text-xs text-ur-text-secondary">Listed by {listing.agencyName}</p>
                </div>
                <span className="text-xs text-ur-text-muted">{formatDate(listing.createdAt)}</span>
              </Row>
            ))
          )}
          {overview && overview.pendingApprovals.agents.length > 0
            ? overview.pendingApprovals.agents.map((agent) => (
                <Row key={agent.id}>
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{agent.name}</p>
                    <p className="text-xs text-ur-text-secondary">{agent.email}</p>
                  </div>
                  <span className="rounded-full border border-ur-warning/40 px-2.5 py-0.5 text-xs font-semibold text-ur-warning">
                    Pending Agent
                  </span>
                </Row>
              ))
            : null}
        </Panel>

        <Panel title="Reports Overview">
          {!overview || overview.topReportCategories.length === 0 ? (
            <EmptyRow text="No reports filed yet." />
          ) : (
            <div className="space-y-2">
              {Object.entries(overview.reportsByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between text-sm">
                  <span className="text-ur-text-secondary">{status.replace(/_/g, " ")}</span>
                  <span className="font-bold text-ur-navy">{count}</span>
                </div>
              ))}
              <div className="my-2 border-t border-ur-border" />
              <p className="text-xs font-bold uppercase text-ur-text-muted">Top Categories</p>
              {overview.topReportCategories.map((category) => (
                <div key={category.type} className="flex items-center justify-between text-sm">
                  <span className="text-ur-text-secondary">{reportTypeLabels[category.type] ?? category.type}</span>
                  <span className="font-bold text-ur-navy">{category.count}</span>
                </div>
              ))}
            </div>
          )}
        </Panel>

        <Panel title="Active Agents">
          {!overview || overview.activeAgents.length === 0 ? (
            <EmptyRow text="No agents yet." />
          ) : (
            overview.activeAgents.slice(0, 5).map((agent) => (
              <Row key={agent.id}>
                <div>
                  <p className="text-sm font-bold text-ur-navy">{agent.agencyName}</p>
                  <p className="text-xs text-ur-text-secondary">{agent.listingCount} listings · trust {agent.trustScore}/100</p>
                </div>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                    agent.verificationStatus === "verified"
                      ? "border-ur-primary/40 text-ur-primary"
                      : "border-ur-warning/40 text-ur-warning"
                  }`}
                >
                  {agent.verificationStatus === "verified" ? "Verified" : "Pending"}
                </span>
              </Row>
            ))
          )}
        </Panel>

        <Panel title="Proof Verification Activity">
          {!overview || overview.recentProofVerifications.length === 0 ? (
            <EmptyRow text="No proof verifications yet." />
          ) : (
            overview.recentProofVerifications.map((proof) => (
              <Row key={proof.id}>
                <div>
                  <p className="text-sm font-bold text-ur-navy">{proof.listingTitle}</p>
                  <p className="text-xs text-ur-text-secondary">{formatDate(proof.createdAt)}</p>
                </div>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                    proof.status === "VERIFIED" ? "border-ur-primary/40 text-ur-primary" : "border-ur-warning/40 text-ur-warning"
                  }`}
                >
                  {proof.status === "VERIFIED" ? "Verified" : proof.status}
                </span>
              </Row>
            ))
          )}
        </Panel>

        <Panel title="Suspicious Activity Alerts">
          {!overview || overview.suspiciousActivity.length === 0 ? (
            <EmptyRow text="No suspicious activity detected." />
          ) : (
            overview.suspiciousActivity.map((alert, index) => (
              <Row key={`${alert.type}-${index}`}>
                <div className="flex items-start gap-2">
                  <Icon name="warning" size={14} className={`mt-0.5 ${alert.severity === "high" ? "text-ur-error" : "text-ur-warning"}`} />
                  <p className="text-sm text-ur-text-secondary">{alert.message}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                    alert.severity === "high" ? "border-ur-error/40 text-ur-error" : "border-ur-warning/40 text-ur-warning"
                  }`}
                >
                  {alert.severity === "high" ? "High" : "Medium"}
                </span>
              </Row>
            ))
          )}
        </Panel>

        <Panel title="Audit Logs (Recent)" viewAllHref="/audit-logs">
          {!overview || overview.recentAuditLogs.length === 0 ? (
            <EmptyRow text="No audit log entries yet." />
          ) : (
            overview.recentAuditLogs.map((log) => (
              <Row key={log.id}>
                <div>
                  <p className="text-sm font-bold text-ur-navy">{log.action.replace(/_/g, " ").replace(/\./g, " · ")}</p>
                  <p className="text-xs text-ur-text-secondary">{log.actorName} · {formatDate(log.createdAt)}</p>
                </div>
              </Row>
            ))
          )}
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="ur-card p-4">
          <p className="text-sm font-bold text-ur-navy">Platform Analytics</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Metric label="Total Users" value={overview?.platformAnalytics.totalUsers ?? 0} />
            <Metric label="Total Properties" value={overview?.platformAnalytics.totalProperties ?? 0} />
            <Metric label="Total Bookings" value={overview?.platformAnalytics.totalBookings ?? 0} />
            <Metric label="Total Revenue" value={`${overview?.platformAnalytics.totalRevenue ?? 0} KES`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div>
      <p className="text-xs text-ur-text-secondary">{label}</p>
      <p className="text-lg font-black text-ur-navy">{value}</p>
    </div>
  );
}
