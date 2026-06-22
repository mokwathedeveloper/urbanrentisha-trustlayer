"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type ViewingRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { formatDate } from "@/components/dashboard/dashboard-ui";
import { Icon } from "@/components/ui/icon";
import { RoleGuard } from "@/components/auth/role-guard";

const statusTone: Record<string, string> = {
  CREATED: "border-ur-text-muted text-ur-text-muted",
  AWAITING_PAYMENT: "border-ur-warning/40 text-ur-warning",
  RECEIVED: "border-ur-primary/40 text-ur-primary",
  FAILED: "border-ur-error/40 text-ur-error",
  REFUNDED: "border-ur-cyan/40 text-ur-cyan",
  EXPIRED: "border-ur-text-muted text-ur-text-muted",
};

export default function PaymentsPage() {
  const { token } = useAuth();
  const [requests, setRequests] = useState<ViewingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    api.viewingRequests
      .findMine(token)
      .then(setRequests)
      .finally(() => setLoading(false));
  }, [token]);

  const payments = requests.filter((r) => r.payment);

  return (
    <RoleGuard allow={["TENANT"]}>
    <div className="px-6 py-8">
      <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Payments</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">Every Stellar testnet payment you have made for a viewing fee.</p>

      <div className="mt-6 ur-card">
        {loading ? <p className="p-5 text-sm text-ur-text-muted">Loading...</p> : null}
        {!loading && payments.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-10 text-center">
            <Icon name="credit_card" size={32} className="text-ur-text-muted" />
            <p className="text-sm text-ur-text-muted">No payments yet.</p>
            <Link href="/listings" className="text-sm font-semibold text-ur-primary hover:underline">
              Browse verified properties &rarr;
            </Link>
          </div>
        ) : null}
        <div className="divide-y divide-ur-border">
          {payments.map((request) => (
            <Link
              key={request.id}
              href={`/requests/${request.id}/payment`}
              className="flex items-center justify-between gap-4 p-4 hover:bg-ur-card-hover"
            >
              <div>
                <p className="text-sm font-bold text-ur-navy">{request.listing?.title ?? "Listing"}</p>
                <p className="mt-0.5 font-mono text-xs text-ur-text-secondary">
                  {request.payment?.amount} {request.payment?.stellarAsset} &middot; Tx:{" "}
                  {request.payment?.txHash ? `${request.payment.txHash.slice(0, 14)}...` : "pending"}
                </p>
                <p className="mt-0.5 text-xs text-ur-text-muted">
                  {request.payment?.paidAt ? formatDate(request.payment.paidAt) : `Created ${formatDate(request.createdAt)}`}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                  statusTone[request.payment?.status ?? ""] ?? "border-ur-border text-ur-text-muted"
                }`}
              >
                {request.payment?.status}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </RoleGuard>
  );
}
