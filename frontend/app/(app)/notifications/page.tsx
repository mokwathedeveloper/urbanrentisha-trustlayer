"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api, type NotificationItem } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Icon, type IconName } from "@/components/ui/icon";
import { broadcastNotificationsChanged, getNotificationLink } from "@/lib/notifications";

type FilterType = "ALL" | "PAYMENT" | "PROOF" | "VIEWING_CODE" | "REPORT" | "SYSTEM";

const typeMeta: Record<string, { label: string; icon: IconName; color: string }> = {
  PAYMENT: { label: "Payment", icon: "account_balance_wallet", color: "text-ur-primary" },
  PROOF: { label: "Proof", icon: "verified_user", color: "text-ur-cyan" },
  VIEWING_CODE: { label: "Viewing Code", icon: "key", color: "text-ur-mint" },
  REPORT: { label: "Report", icon: "flag", color: "text-ur-warning" },
  SYSTEM: { label: "System", icon: "settings", color: "text-ur-muted" },
};

const filters: FilterType[] = ["ALL", "PAYMENT", "PROOF", "VIEWING_CODE", "REPORT", "SYSTEM"];

function dayLabel(iso: string): string {
  const date = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function truncate(value: string, head = 10, tail = 6): string {
  if (value.length <= head + tail + 3) return value;
  return `${value.slice(0, head)}...${value.slice(-tail)}`;
}

export default function NotificationsPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    api.notifications
      .findMine(token)
      .then((items) => {
        setNotifications(items);
        if (items.length > 0) setSelectedId(items[0].id);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { ALL: notifications.length };
    for (const n of notifications) {
      c[n.type] = (c[n.type] ?? 0) + 1;
    }
    return c;
  }, [notifications]);

  const filtered = filter === "ALL" ? notifications : notifications.filter((n) => n.type === filter);

  const grouped = useMemo(() => {
    const groups = new Map<string, NotificationItem[]>();
    for (const n of filtered) {
      const label = dayLabel(n.createdAt);
      if (!groups.has(label)) groups.set(label, []);
      groups.get(label)!.push(n);
    }
    return Array.from(groups.entries());
  }, [filtered]);

  const selected = notifications.find((n) => n.id === selectedId) ?? null;

  async function markRead(id: string) {
    if (!token) return;
    const updated = await api.notifications.markRead(token, id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, ...updated } : n)));
    broadcastNotificationsChanged();
  }

  function handleSelect(notification: NotificationItem) {
    setSelectedId(notification.id);
    if (!notification.readAt) markRead(notification.id);

    const link = getNotificationLink(notification);
    if (link) router.push(link);
  }

  async function markAllRead() {
    if (!token) return;
    await Promise.all(notifications.filter((n) => !n.readAt).map((n) => api.notifications.markRead(token, n.id)));
    const refreshed = await api.notifications.findMine(token);
    setNotifications(refreshed);
    broadcastNotificationsChanged();
  }

  return (
    <div className="px-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Notifications</h1>
          <p className="mt-1 text-sm text-ur-text-secondary">
            Stay updated on your payments, proofs, access, reports and viewing codes.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={markAllRead}
            className="flex items-center gap-2 rounded-ur-sm border border-ur-border bg-ur-card px-4 py-2 text-sm font-semibold text-ur-navy"
          >
            <Icon name="done_all" size={16} />
            Mark all as read
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-ur-sm border border-ur-border bg-ur-card px-4 py-2 text-sm font-semibold text-ur-navy"
          >
            <Icon name="settings" size={16} />
            Notification Preferences
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`flex items-center gap-2 rounded-ur-sm border px-4 py-2 text-sm font-semibold ${
              filter === f ? "border-ur-primary bg-ur-success-bg text-ur-primary" : "border-ur-border text-ur-text-secondary"
            }`}
          >
            {f === "ALL" ? "All" : typeMeta[f]?.label ?? f}
            <span className="rounded-full bg-ur-card-soft px-2 text-xs">{counts[f] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="ur-card">
          {loading ? <p className="p-5 text-sm text-ur-text-muted">Loading...</p> : null}
          {!loading && filtered.length === 0 ? (
            <p className="p-5 text-sm text-ur-text-muted">No notifications yet.</p>
          ) : null}
          {grouped.map(([label, items]) => (
            <div key={label}>
              <p className="border-b border-ur-border px-4 py-2 text-xs font-bold uppercase tracking-wide text-ur-text-muted">
                {label}
              </p>
              <div className="divide-y divide-ur-border">
                {items.map((notification) => {
                  const meta = typeMeta[notification.type] ?? typeMeta.SYSTEM;
                  const unread = !notification.readAt;
                  return (
                    <button
                      key={notification.id}
                      type="button"
                      onClick={() => handleSelect(notification)}
                      className={`flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-ur-card-hover ${
                        selectedId === notification.id ? "bg-ur-card-hover" : ""
                      }`}
                    >
                      <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${unread ? "bg-ur-cyan" : "bg-transparent"}`} />
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ur-card-soft ${meta.color}`}>
                        <Icon name={meta.icon} size={16} />
                      </span>
                      <span className="flex-1">
                        <span className="text-sm font-bold text-ur-text">{notification.title}</span>
                        <p className="mt-0.5 text-sm text-ur-text-secondary">{notification.message}</p>
                        <p className="mt-1 font-mono text-xs text-ur-text-muted">{formatTime(notification.createdAt)}</p>
                      </span>
                      <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold ${meta.color} border-current`}>
                        {meta.label}
                      </span>
                      <Icon name="chevron_right" size={16} className="mt-1 shrink-0 text-ur-text-muted" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="ur-card p-5">
          {selected ? <NotificationDetail notification={selected} onMarkRead={() => markRead(selected.id)} /> : (
            <p className="text-sm text-ur-text-muted">Select a notification to see details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationDetail({
  notification,
  onMarkRead,
}: {
  notification: NotificationItem;
  onMarkRead: () => void;
}) {
  const meta = typeMeta[notification.type] ?? typeMeta.SYSTEM;
  const vr = notification.viewingRequest;

  return (
    <>
      <div className="flex items-center gap-3">
        <span className={`grid h-10 w-10 place-items-center rounded-full bg-ur-card-soft ${meta.color}`}>
          <Icon name={meta.icon} size={20} />
        </span>
        <div>
          <p className="font-bold text-ur-navy">{notification.title}</p>
          <p className="text-xs text-ur-text-secondary">
            {dayLabel(notification.createdAt)}, {formatTime(notification.createdAt)}
          </p>
        </div>
      </div>

      {!notification.readAt ? (
        <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-ur-cyan">
          <span className="h-1.5 w-1.5 rounded-full bg-ur-cyan" />
          Unread
        </span>
      ) : null}

      <p className="mt-3 text-sm text-ur-text-secondary">{notification.message}</p>

      {vr ? (
        <div className="mt-5 border-t border-ur-border pt-4">
          {notification.type === "PAYMENT" && vr.payment ? (
            <DetailSection title="Payment Details">
              <DetailRow label="Amount" value={`${vr.payment.amount} ${vr.payment.stellarAsset}`} mono />
              <DetailRow label="Transaction Hash" value={truncate(vr.payment.txHash ?? "—")} mono copy={vr.payment.txHash ?? undefined} />
              <DetailRow label="For Property" value={vr.listing?.title ?? "—"} />
              <DetailRow label="Booking ID" value={truncate(vr.id, 12, 6)} mono />
              <DetailRow
                label="Received At"
                value={vr.payment.paidAt ? new Date(vr.payment.paidAt).toLocaleString() : "—"}
              />
            </DetailSection>
          ) : null}

          {notification.type === "PROOF" && vr.proofVerification ? (
            <DetailSection title="Proof Details">
              <DetailRow label="Status" value={vr.proofVerification.status} />
              <DetailRow
                label="Soroban Tx Hash"
                value={truncate(vr.proofVerification.sorobanTxHash ?? "—")}
                mono
                copy={vr.proofVerification.sorobanTxHash ?? undefined}
              />
              <DetailRow label="Verifier" value={vr.proofVerification.verifierAddress ?? "—"} mono />
              <DetailRow
                label="Verified At"
                value={vr.proofVerification.verifiedAt ? new Date(vr.proofVerification.verifiedAt).toLocaleString() : "—"}
              />
            </DetailSection>
          ) : null}

          {notification.type === "VIEWING_CODE" && vr.viewingCode ? (
            <DetailSection title="Viewing Code Details">
              <DetailRow label="Code" value={vr.viewingCode.code} mono copy={vr.viewingCode.code} />
              <DetailRow label="Status" value={vr.viewingCode.status} />
              <DetailRow label="For Property" value={vr.listing?.title ?? "—"} />
              <DetailRow label="Expires At" value={new Date(vr.viewingCode.expiresAt).toLocaleString()} />
            </DetailSection>
          ) : null}

          {notification.type === "REPORT" ? (
            <DetailSection title="Report Details">
              <DetailRow label="Listing" value={vr.listing?.title ?? "—"} />
              <DetailRow label="Booking ID" value={truncate(vr.id, 12, 6)} mono />
            </DetailSection>
          ) : null}

          {vr.listing ? (
            <Link
              href={`/listings/${vr.listingId}`}
              className="mt-4 flex items-center gap-2 rounded-ur border border-ur-primary/25 bg-ur-success-bg p-3 text-sm text-ur-primary"
            >
              <Icon name="lock" size={16} />
              Your access details are securely held until all verification conditions are met.
            </Link>
          ) : null}
        </div>
      ) : null}

      <button
        type="button"
        onClick={onMarkRead}
        disabled={Boolean(notification.readAt)}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-ur-sm border border-ur-border px-4 py-2 text-sm font-semibold text-ur-navy disabled:opacity-50"
      >
        <Icon name="check" size={16} />
        {notification.readAt ? "Already Read" : "Mark as Read"}
      </button>
    </>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="mb-2 text-sm font-bold text-ur-navy">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono,
  copy,
}: {
  label: string;
  value: string;
  mono?: boolean;
  copy?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-ur-text-secondary">{label}</span>
      <span className={`flex items-center gap-1.5 text-right text-ur-text ${mono ? "font-mono text-xs" : "font-semibold"}`}>
        {value}
        {copy ? (
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(copy)}
            className="text-ur-text-muted hover:text-ur-primary"
          >
            <Icon name="content_copy" size={12} />
          </button>
        ) : null}
      </span>
    </div>
  );
}
