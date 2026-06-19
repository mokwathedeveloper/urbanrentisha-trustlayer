import Link from "next/link";
import { ArrowRight, CalendarCheck2, ShieldCheck, UserRound } from "lucide-react";
import { viewingRequests, statusVisuals, type RequestStatus } from "@/lib/property-manager-data";
import { StatusBadge } from "@/components/property-manager-dashboard/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ViewingRequestsPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Viewing requests
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Tenant request queue
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/56">
            Review tenants, proof status, payment state, and scheduled viewing slots.
          </p>
        </div>

        <Link href="/manager/requests">
          <Button variant="outline" size="sm">
            View all
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {viewingRequests.map((request) => {
          const status = statusVisuals.request[request.status as RequestStatus];

          return (
            <article
              key={request.id}
              className="rounded-ur-lg border border-white/10 bg-black/16 p-4 transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                  <CalendarCheck2 className="h-5 w-5" />
                </div>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
              </div>

              <h3 className="mt-4 font-black text-white">{request.propertyTitle}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/52">
                <UserRound className="h-4 w-4 text-ur-primary" />
                {request.tenantName}
              </p>
              <p className="mt-3 font-mono text-xs font-bold text-ur-mint">{request.id}</p>

              <div className="mt-4 rounded-ur-sm border border-white/10 bg-black/20 p-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                  Viewing slot
                </p>
                <p className="mt-1 text-sm font-bold text-white">{request.viewingSlot}</p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant={request.paymentStatus === "pending" ? "warning" : "success"}>
                  {request.paymentStatus}
                </Badge>
                {request.proofHash ? (
                  <Badge variant="success">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Proof attached
                  </Badge>
                ) : (
                  <Badge variant="warning">No proof yet</Badge>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
