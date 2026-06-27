"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api, type EscrowOverviewItem } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { formatDate } from "@/components/dashboard/dashboard-ui";
import { Icon } from "@/components/ui/icon";
import { useRealtimeEvent } from "@/lib/realtime";
import { ListRowSkeletonGroup } from "@/components/ui/skeleton";

const FILTER_TITLES: Record<string, string> = {
  held: "Active Escrow Holds",
  released: "Released",
  refunded: "Refunded",
};

const statusTone: Record<string, string> = {
  RECEIVED: "border-ur-cyan/40 text-ur-cyan",
  RELEASED: "border-ur-primary/40 text-ur-primary",
  REFUNDED: "border-ur-warning/40 text-ur-warning",
  FAILED: "border-ur-error/40 text-ur-error",
  EXPIRED: "border-ur-text-muted text-ur-text-muted",
};

const statusLabel: Record<string, string> = {
  CREATED: "Created",
  AWAITING_PAYMENT: "Awaiting Payment",
  RECEIVED: "Held in Escrow",
  RELEASED: "Released",
  REFUNDED: "Refunded",
  FAILED: "Failed",
  EXPIRED: "Expired",
};

function actionLabel(action: string): string {
  return action.replace(/^payment\./, "").replace(/_/g, " ");
}

function TransactionRow({ item }: { item: EscrowOverviewItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-ur-sm bg-ur-card-soft">
            {item.listingImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.listingImageUrl} alt={item.listingTitle} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center text-ur-text-muted">
                <Icon name="apartment" size={16} />
              </div>
            )}
          </div>
          <div>
            <Link href={`/listings/${item.listingId}`} className="text-sm font-bold text-ur-navy hover:underline">
              {item.listingTitle}
            </Link>
            <p className="mt-0.5 text-xs text-ur-text-secondary">Tenant: {item.tenantName}</p>
            <p className="mt-0.5 font-mono text-xs text-ur-text-muted">
              {item.amount} {item.stellarAsset} {item.isEscrow ? "(on-chain escrow)" : "(direct payment)"}
            </p>
            <p className="mt-1 text-xs text-ur-text-muted">Created {formatDate(item.createdAt)}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusTone[item.status] ?? "border-ur-border text-ur-text-muted"}`}>
            {statusLabel[item.status] ?? item.status}
          </span>
          {item.proofStatus ? (
            <span className="text-xs text-ur-text-muted">Proof: {item.proofStatus.replace(/_/g, " ").toLowerCase()}</span>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 flex items-center gap-1 text-xs font-semibold text-ur-primary hover:underline"
      >
        <Icon name={expanded ? "expand_less" : "expand_more"} size={14} />
        {expanded ? "Hide timeline" : `View timeline (${item.timeline.length})`}
      </button>

      {expanded ? (
        <div className="mt-3 space-y-2 rounded-ur border border-ur-border bg-ur-card-soft p-3">
          {item.timeline.length === 0 ? (
            <p className="text-xs text-ur-text-muted">No activity recorded yet.</p>
          ) : (
            item.timeline.map((entry, i) => (
              <div key={i} className="flex items-center justify-between gap-3 text-xs">
                <span className="font-semibold capitalize text-ur-navy">{actionLabel(entry.action)}</span>
                <span className="text-ur-text-muted">{formatDate(entry.createdAt)}</span>
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

function Section({ title, items, emptyLabel }: { title: string; items: EscrowOverviewItem[]; emptyLabel: string }) {
  if (items.length === 0) {
    return (
      <div className="mt-6 ur-card">
        <p className="border-b border-ur-border p-4 text-sm font-bold text-ur-navy">
          {title} <span className="text-ur-text-muted">(0)</span>
        </p>
        <p className="p-5 text-sm text-ur-text-muted">{emptyLabel}</p>
      </div>
    );
  }
  return (
    <div className="mt-6 ur-card">
      <p className="border-b border-ur-border p-4 text-sm font-bold text-ur-navy">
        {title} <span className="text-ur-text-muted">({items.length})</span>
      </p>
      <div className="divide-y divide-ur-border">
        {items.map((item) => (
          <TransactionRow key={item.paymentId} item={item} />
        ))}
      </div>
    </div>
  );
}

/**
 * Full escrow management view for landlords, agents, and managers - active
 * holds, releases, refunds, and a per-transaction activity timeline. Each
 * role calls a different scoped backend endpoint, but the shape and
 * grouping logic is identical, so this component is shared.
 */
export function EscrowManagementView({ role }: { role: "LANDLORD" | "AGENT" | "MANAGER" }) {
  const { token } = useAuth();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const [items, setItems] = useState<EscrowOverviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    if (!token) return;
    const fetcher = role === "LANDLORD" ? api.landlord.escrowOverview(token) : api.agents.escrowOverview(token);
    fetcher.then(setItems).finally(() => setLoading(false));
  }

  useEffect(load, [token, role]);

  // Escrow notifications already push in real time - refetch the overview
  // whenever a PAYMENT-type one lands, so this view updates without a
  // manual refresh.
  useRealtimeEvent(token, "notification:new", (notification: { type: string }) => {
    if (notification.type === "PAYMENT") load();
  });

  const active = items.filter((i) => i.status === "RECEIVED");
  const released = items.filter((i) => i.status === "RELEASED");
  const refunded = items.filter((i) => i.status === "REFUNDED");
  const other = items.filter((i) => !["RECEIVED", "RELEASED", "REFUNDED"].includes(i.status));

  // Coming from a dashboard card - show only that section instead of
  // everything, with a way back to the full view.
  if (filter && FILTER_TITLES[filter]) {
    const filteredItems = filter === "held" ? active : filter === "released" ? released : refunded;
    return (
      <div className="px-6 py-8">
        <Link href="/escrow" className="flex items-center gap-1 text-sm font-semibold text-ur-mint hover:underline">
          <Icon name="arrow_back" size={16} />
          View All Escrow Activity
        </Link>
        <h1 className="mt-4 text-2xl font-black tracking-[-0.02em] text-ur-navy">{FILTER_TITLES[filter]}</h1>
        {loading ? (
          <div className="mt-6 ur-card p-2">
            <ListRowSkeletonGroup rows={4} />
          </div>
        ) : (
          <Section title={FILTER_TITLES[filter]} items={filteredItems} emptyLabel="Nothing here yet." />
        )}
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Escrow Management</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">
        Every payment and escrow transaction tied to your properties - status, amounts, tenants, and full activity history.
      </p>

      {loading ? (
        <div className="mt-6 ur-card p-2">
          <ListRowSkeletonGroup rows={5} />
        </div>
      ) : null}

      {!loading && items.length === 0 ? (
        <div className="ur-card mt-6 flex flex-col items-center gap-3 p-10 text-center">
          <Icon name="lock" size={32} className="text-ur-text-muted" />
          <p className="text-sm text-ur-text-muted">No escrow or payment activity yet for your properties.</p>
        </div>
      ) : (
        <>
          <Section title="Active Escrow Holds" items={active} emptyLabel="No funds currently held in escrow." />
          <Section title="Released" items={released} emptyLabel="No funds released yet." />
          <Section title="Refunded" items={refunded} emptyLabel="No refunds issued." />
          {other.length > 0 ? <Section title="Other" items={other} emptyLabel="" /> : null}
        </>
      )}
    </div>
  );
}
