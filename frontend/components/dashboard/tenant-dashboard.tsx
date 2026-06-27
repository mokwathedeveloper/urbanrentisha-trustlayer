"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type NotificationItem, type ReportItem, type UserProfile, type ViewingRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { EmptyRow, Panel, Row, StatCard, StatusBadge, formatDate } from "./dashboard-ui";
import { Icon, type IconName } from "@/components/ui/icon";
import { VerificationProgress } from "@/components/verification/verification-progress";
import { EscrowSummaryCards } from "@/components/escrow/escrow-summary-cards";

export function TenantDashboardView() {
  const { token, user } = useAuth();
  const [requests, setRequests] = useState<ViewingRequest[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    Promise.all([
      api.viewingRequests.findMine(token),
      api.notifications.findMine(token),
      api.reports.findMine(token),
      api.users.me(token),
    ])
      .then(([req, notif, rep, me]) => {
        setRequests(req.items);
        setNotifications(notif.items);
        setReports(rep.items);
        setProfile(me);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const payments = requests.filter((r) => r.payment);
  const proofs = requests.filter((r) => r.zkProof);
  const escrowHolds = requests.filter((r) => r.payment?.status === "RECEIVED" && r.viewingCode?.status !== "ACTIVE");
  const viewingCodes = requests.filter((r) => r.viewingCode);
  const unreadNotifications = notifications.filter((n) => !n.readAt);

  const stats: { label: string; value: number; icon: IconName; color: string }[] = [
    { label: "Total Requests", value: requests.length, icon: "description", color: "text-ur-cyan" },
    { label: "Payments", value: payments.length, icon: "credit_card", color: "text-ur-primary" },
    { label: "Proofs", value: proofs.length, icon: "verified_user", color: "text-ur-mint" },
    { label: "Escrow / Holds", value: escrowHolds.length, icon: "lock", color: "text-ur-warning" },
    { label: "Viewing Codes", value: viewingCodes.length, icon: "key", color: "text-ur-cyan" },
    { label: "Notifications", value: notifications.length, icon: "notifications", color: "text-ur-mint" },
    { label: "Reports", value: reports.length, icon: "flag", color: "text-ur-error" },
  ];

  return (
    <div className="px-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-black tracking-[-0.02em] text-ur-navy">
            Welcome back, {user?.name?.split(" ")[0] ?? "Tenant"}!
            {profile?.tenantProfile?.verifiedBadge ? (
              <Icon name="verified" size={20} className="text-ur-primary" />
            ) : null}
          </h1>
          <p className="mt-1 text-sm text-ur-text-secondary">Here&apos;s what&apos;s happening with your rentals and requests.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-ur-sm border border-ur-border bg-ur-card px-4 py-2 text-sm font-semibold text-ur-navy"
          >
            <Icon name="auto_awesome" size={16} />
            Quick Actions
          </button>
          <Link
            href="/listings"
            className="flex items-center gap-2 rounded-ur-sm bg-ur-primary px-4 py-2 text-sm font-bold text-white hover:bg-ur-primary-hover"
          >
            Find Verified Properties
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {stats.map((stat) => (
          <StatCard key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} color={stat.color} loading={loading} />
        ))}
      </div>

      <p className="mt-6 text-sm font-bold text-ur-navy">Financial Overview</p>
      <div className="mt-2">
        <EscrowSummaryCards role="TENANT" />
      </div>

      {profile?.tenantProfile && profile.tenantProfile.verificationStage !== "APPROVED" ? (
        <div className="mt-6">
          <VerificationProgress stage={profile.tenantProfile.verificationStage} />
        </div>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Panel title="My Requests" viewAllHref="/listings">
            {requests.length === 0 ? (
              <EmptyRow text="No viewing requests yet." />
            ) : (
              requests.slice(0, 4).map((r) => (
                <Row key={r.id}>
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{r.listing?.title ?? "Listing"}</p>
                    <p className="text-xs text-ur-text-secondary">
                      Agent: {r.listing?.agent?.user.name ?? "—"} · {formatDate(r.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={r.status} />
                </Row>
              ))
            )}
          </Panel>

          <Panel title="Escrow / Payment Hold Status" viewAllHref="/escrow">
            {escrowHolds.length === 0 ? (
              <EmptyRow text="No active escrow holds." />
            ) : (
              escrowHolds.slice(0, 4).map((r) => (
                <Row key={r.id}>
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{r.listing?.title ?? "Listing"}</p>
                    <p className="font-mono text-xs text-ur-text-secondary">Escrow ID: {r.payment?.id.slice(0, 12)}...</p>
                  </div>
                  <span className="rounded-full border border-ur-cyan/40 px-2.5 py-0.5 text-xs font-semibold text-ur-cyan">
                    Held
                  </span>
                </Row>
              ))
            )}
          </Panel>

          <Panel title="Recent Viewing History">
            {requests.length === 0 ? (
              <EmptyRow text="No viewing history yet." />
            ) : (
              requests.slice(0, 4).map((r) => (
                <Row key={r.id}>
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{r.listing?.title ?? "Listing"}</p>
                    <p className="text-xs text-ur-text-secondary">
                      {r.listing?.agent?.user.name ?? "—"} · {r.preferredDate ? formatDate(r.preferredDate) : "No date"}
                    </p>
                  </div>
                  <StatusBadge status={r.status} />
                </Row>
              ))
            )}
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Payment Status" viewAllHref="/payments">
            {payments.length === 0 ? (
              <EmptyRow text="No payments yet." />
            ) : (
              payments.slice(0, 4).map((r) => (
                <Row key={r.id}>
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{r.listing?.title ?? "Listing"}</p>
                    <p className="font-mono text-xs text-ur-text-secondary">Booking ID: {r.id.slice(0, 12)}...</p>
                  </div>
                  <StatusBadge status={r.payment?.status === "RECEIVED" ? "ACCESS_UNLOCKED" : "AWAITING_PAYMENT"} />
                </Row>
              ))
            )}
          </Panel>

          <Panel title="Proof Status" viewAllHref="/verifications">
            {proofs.length === 0 ? (
              <EmptyRow text="No proofs generated yet." />
            ) : (
              proofs.slice(0, 4).map((r) => (
                <Row key={r.id}>
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{r.listing?.title ?? "Listing"}</p>
                    <p className="font-mono text-xs text-ur-text-secondary">Proof ID: {r.zkProof?.id.slice(0, 14)}...</p>
                  </div>
                  <StatusBadge status={r.zkProof?.status === "VERIFIED" ? "PROOF_VERIFIED" : r.zkProof?.status ?? "PROOF_GENERATING"} />
                </Row>
              ))
            )}
          </Panel>

          <Panel title="Viewing Codes" viewAllHref="/viewing-code">
            {viewingCodes.length === 0 ? (
              <EmptyRow text="No viewing codes yet." />
            ) : (
              viewingCodes.slice(0, 4).map((r) => (
                <Row key={r.id}>
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{r.listing?.title ?? "Listing"}</p>
                    <p className="font-mono text-xs text-ur-text-secondary">Code: {r.viewingCode?.code}</p>
                  </div>
                  <span className="text-xs text-ur-text-muted">
                    Expires {r.viewingCode ? formatDate(r.viewingCode.expiresAt) : "—"}
                  </span>
                </Row>
              ))
            )}
          </Panel>

          <Panel title={`Notifications (${unreadNotifications.length} Unread)`} viewAllHref="/notifications">
            {notifications.length === 0 ? (
              <EmptyRow text="No notifications yet." />
            ) : (
              notifications.slice(0, 4).map((n) => (
                <Row key={n.id}>
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{n.title}</p>
                    <p className="text-xs text-ur-text-secondary">{formatDate(n.createdAt)}</p>
                  </div>
                  {!n.readAt ? <span className="h-2 w-2 rounded-full bg-ur-cyan" /> : null}
                </Row>
              ))
            )}
          </Panel>

          <Panel title="Reports Overview" viewAllHref="/reports">
            {reports.length === 0 ? (
              <EmptyRow text="You haven't filed any reports." />
            ) : (
              reports.slice(0, 4).map((r) => (
                <Row key={r.id}>
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{r.listing?.title ?? "Report"}</p>
                    <p className="text-xs text-ur-text-secondary">{formatDate(r.createdAt)}</p>
                  </div>
                  <span className="rounded-full border border-ur-warning/40 px-2.5 py-0.5 text-xs font-semibold text-ur-warning">
                    {r.status === "OPEN" ? "Under Review" : r.status}
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
