"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type ViewingRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { formatDate } from "@/components/dashboard/dashboard-ui";
import { Icon } from "@/components/ui/icon";
import { RoleGuard } from "@/components/auth/role-guard";

const statusTone: Record<string, string> = {
  LOCKED: "border-ur-text-muted text-ur-text-muted",
  ACTIVE: "border-ur-primary/40 text-ur-primary",
  USED: "border-ur-cyan/40 text-ur-cyan",
  EXPIRED: "border-ur-error/40 text-ur-error",
  REVOKED: "border-ur-error/40 text-ur-error",
};

export default function ViewingCodePage() {
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

  const codes = requests.filter((r) => r.viewingCode);

  return (
    <RoleGuard allow={["TENANT"]}>
    <div className="px-6 py-8">
      <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Viewing Codes</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">Codes unlocked after your proof was verified, used to access a viewing.</p>

      <div className="mt-6 ur-card">
        {loading ? <p className="p-5 text-sm text-ur-text-muted">Loading...</p> : null}
        {!loading && codes.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-10 text-center">
            <Icon name="key" size={32} className="text-ur-text-muted" />
            <p className="text-sm text-ur-text-muted">No viewing codes unlocked yet.</p>
          </div>
        ) : null}
        <div className="divide-y divide-ur-border">
          {codes.map((request) => (
            <Link
              key={request.id}
              href={`/requests/${request.id}/code`}
              className="flex items-center justify-between gap-4 p-4 hover:bg-ur-card-hover"
            >
              <div>
                <p className="text-sm font-bold text-ur-navy">{request.listing?.title ?? "Listing"}</p>
                <p className="mt-0.5 font-mono text-sm font-bold text-ur-primary">{request.viewingCode?.code}</p>
                <p className="mt-0.5 text-xs text-ur-text-muted">
                  Expires {request.viewingCode ? formatDate(request.viewingCode.expiresAt) : "—"}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                  statusTone[request.viewingCode?.status ?? ""] ?? "border-ur-border text-ur-text-muted"
                }`}
              >
                {request.viewingCode?.status}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </RoleGuard>
  );
}
