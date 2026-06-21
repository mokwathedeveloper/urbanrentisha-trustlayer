"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type ViewingRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { StatusBadge, activeStatuses, formatDate, nextStepHref, nextStepLabel } from "@/components/dashboard/dashboard-ui";
import { Icon } from "@/components/ui/icon";

export default function ApplicationsPage() {
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

  const active = requests.filter((r) => activeStatuses.includes(r.status));

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Applications</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">
        Viewing requests that are still in progress and need an action from you.
      </p>

      <div className="mt-6 ur-card">
        {loading ? <p className="p-5 text-sm text-ur-text-muted">Loading...</p> : null}
        {!loading && active.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-10 text-center">
            <Icon name="assignment" size={32} className="text-ur-text-muted" />
            <p className="text-sm text-ur-text-muted">No applications in progress right now.</p>
            <Link href="/listings" className="text-sm font-semibold text-ur-primary hover:underline">
              Browse verified properties &rarr;
            </Link>
          </div>
        ) : null}
        <div className="divide-y divide-ur-border">
          {active.map((request) => (
            <div key={request.id} className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="text-sm font-bold text-ur-navy">{request.listing?.title ?? "Listing"}</p>
                <p className="mt-0.5 text-xs text-ur-text-secondary">
                  {request.listing?.location ?? "—"} &middot; Started {formatDate(request.createdAt)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <StatusBadge status={request.status} />
                <Link
                  href={nextStepHref(request.id, request.status)}
                  className="flex items-center gap-1 text-sm font-semibold text-ur-primary hover:underline"
                >
                  {nextStepLabel(request.status)}
                  <Icon name="chevron_right" size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
