"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type EscrowSummary, type UserRole } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Icon, type IconName } from "@/components/ui/icon";
import { useRealtimeEvent } from "@/lib/realtime";

interface CardDef {
  label: string;
  icon: IconName;
  color: string;
  value: (s: EscrowSummary) => string;
  subValue?: (s: EscrowSummary) => string | null;
  href: string;
}

function money(amount: number, currency: string) {
  return `${currency} ${amount.toLocaleString()}`;
}

const CARDS_BY_ROLE: Record<string, CardDef[]> = {
  TENANT: [
    {
      label: "Total Amount Spent",
      icon: "credit_card",
      color: "text-ur-navy",
      value: (s) => money(s.totalReceived, s.currency),
      href: "/escrow",
    },
    {
      label: "Funds Currently in Escrow",
      icon: "lock",
      color: "text-ur-cyan",
      value: (s) => money(s.escrowHeldAmount, s.currency),
      subValue: (s) => `${s.escrowHeldCount} transaction${s.escrowHeldCount === 1 ? "" : "s"}`,
      href: "/escrow?filter=held",
    },
    {
      label: "Total Refunded",
      icon: "restart_alt",
      color: "text-ur-warning",
      value: (s) => money(s.totalRefunded, s.currency),
      href: "/escrow?filter=refunded",
    },
    {
      label: "Active Bookings",
      icon: "event_available",
      color: "text-ur-primary",
      value: (s) => String(s.activeBookings),
      href: "/bookings",
    },
    {
      label: "Completed Bookings",
      icon: "check_circle",
      color: "text-ur-mint",
      value: (s) => String(s.completedBookings),
      href: "/bookings",
    },
  ],
  LANDLORD: [
    {
      label: "Total Amount Received",
      icon: "account_balance_wallet",
      color: "text-ur-navy",
      value: (s) => money(s.totalReceived, s.currency),
      href: "/escrow",
    },
    {
      label: "Funds Currently in Escrow",
      icon: "lock",
      color: "text-ur-cyan",
      value: (s) => money(s.escrowHeldAmount, s.currency),
      subValue: (s) => `${s.escrowHeldCount} transaction${s.escrowHeldCount === 1 ? "" : "s"}`,
      href: "/escrow?filter=held",
    },
    {
      label: "Pending Escrow Releases",
      icon: "hourglass_empty",
      color: "text-ur-warning",
      value: (s) => String(s.pendingReleaseCount),
      subValue: (s) => money(s.pendingReleaseAmount, s.currency),
      href: "/escrow?filter=held",
    },
    {
      label: "Total Released Funds",
      icon: "check_circle",
      color: "text-ur-primary",
      value: (s) => money(s.totalReleased, s.currency),
      href: "/escrow?filter=released",
    },
    {
      label: "Active Properties with Escrow Activity",
      icon: "apartment",
      color: "text-ur-mint",
      value: (s) => String(s.activePropertiesWithEscrow),
      href: "/escrow?filter=held",
    },
  ],
  AGENT: [
    {
      label: "Total Amount Received",
      icon: "account_balance_wallet",
      color: "text-ur-navy",
      value: (s) => money(s.totalReceived, s.currency),
      href: "/escrow",
    },
    {
      label: "Funds Currently in Escrow",
      icon: "lock",
      color: "text-ur-cyan",
      value: (s) => money(s.escrowHeldAmount, s.currency),
      subValue: (s) => `${s.escrowHeldCount} transaction${s.escrowHeldCount === 1 ? "" : "s"}`,
      href: "/escrow?filter=held",
    },
    {
      label: "Pending Escrow Transactions",
      icon: "hourglass_empty",
      color: "text-ur-warning",
      value: (s) => String(s.pendingReleaseCount),
      href: "/escrow?filter=held",
    },
    {
      label: "Active Bookings",
      icon: "event_available",
      color: "text-ur-primary",
      value: (s) => String(s.activeBookings),
      href: "/bookings",
    },
    {
      label: "Completed Transactions",
      icon: "check_circle",
      color: "text-ur-mint",
      value: (s) => String(s.completedTransactions),
      href: "/escrow?filter=released",
    },
  ],
  MANAGER: [
    {
      label: "Total Amount Managed",
      icon: "account_balance_wallet",
      color: "text-ur-navy",
      value: (s) => money(s.totalManaged, s.currency),
      href: "/escrow",
    },
    {
      label: "Funds Currently in Escrow",
      icon: "lock",
      color: "text-ur-cyan",
      value: (s) => money(s.escrowHeldAmount, s.currency),
      subValue: (s) => `${s.escrowHeldCount} transaction${s.escrowHeldCount === 1 ? "" : "s"}`,
      href: "/escrow?filter=held",
    },
    {
      label: "Active Escrow Transactions",
      icon: "bolt",
      color: "text-ur-cyan",
      value: (s) => String(s.escrowHeldCount),
      href: "/escrow?filter=held",
    },
    {
      label: "Pending Releases",
      icon: "hourglass_empty",
      color: "text-ur-warning",
      value: (s) => String(s.pendingReleaseCount),
      href: "/escrow?filter=held",
    },
    {
      label: "Completed Transactions",
      icon: "check_circle",
      color: "text-ur-mint",
      value: (s) => String(s.completedTransactions),
      href: "/escrow?filter=released",
    },
  ],
};

/**
 * Financial overview cards for the dashboard - reuses the same escrow
 * summary the full /escrow page is built on, so the numbers can never
 * drift between "quick glance" and "full detail". Updates live: escrow
 * funded/released/refunded notifications already push in real time, this
 * just refetches the (cheap) summary when one lands.
 */
export function EscrowSummaryCards({ role }: { role: UserRole }) {
  const { token } = useAuth();
  const [summary, setSummary] = useState<EscrowSummary | null>(null);

  function load() {
    if (!token) return;
    const fetcher =
      role === "TENANT"
        ? api.viewingRequests.escrowSummary(token)
        : role === "LANDLORD"
          ? api.landlord.escrowSummary(token)
          : api.agents.escrowSummary(token);
    fetcher.then(setSummary).catch(() => undefined);
  }

  useEffect(load, [token, role]);

  useRealtimeEvent(token, "notification:new", (notification: { type: string }) => {
    if (notification.type === "PAYMENT") load();
  });

  const cards = CARDS_BY_ROLE[role] ?? [];
  if (cards.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {cards.map((card) => (
        <Link key={card.label} href={card.href} className="ur-card p-4 transition-colors hover:bg-ur-card-hover">
          <Icon name={card.icon} size={16} className={card.color} />
          <p className="mt-2 text-xs text-ur-text-secondary">{card.label}</p>
          <p className="text-lg font-black text-ur-navy">{summary ? card.value(summary) : "—"}</p>
          {summary && card.subValue ? (
            <p className="text-xs text-ur-text-muted">{card.subValue(summary)}</p>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
