import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { tenantRequests, statusVisuals } from "@/lib/tenant-dashboard-data";
import { StatusBadge } from "@/components/tenant-dashboard/status-badge";
import { Button } from "@/components/ui/button";

export function RequestStatusTable() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Tenant requests
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Request status center
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/56">
            Payment, proof, hold, and viewing code status for every active request.
          </p>
        </div>

        <Link href="/tenant/requests">
          <Button variant="outline" size="sm">
            View all
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-5 overflow-hidden rounded-ur-lg border border-white/10">
        <div className="hidden grid-cols-[1.4fr_140px_140px_140px_150px_90px] gap-4 border-b border-white/10 bg-black/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/38 xl:grid">
          <span>Property</span>
          <span>Payment</span>
          <span>Proof</span>
          <span>Hold</span>
          <span>Viewing code</span>
          <span>Action</span>
        </div>

        <div className="divide-y divide-white/10">
          {tenantRequests.map((request) => {
            const payment = statusVisuals.payment[request.paymentStatus];
            const proof = statusVisuals.proof[request.proofStatus];
            const hold = statusVisuals.hold[request.holdStatus];
            const code = statusVisuals.code[request.viewingCodeStatus];

            return (
              <article
                key={request.id}
                className="grid gap-4 bg-black/10 px-4 py-4 xl:grid-cols-[1.4fr_140px_140px_140px_150px_90px] xl:items-center"
              >
                <div>
                  <p className="font-black text-white">{request.propertyTitle}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-white/52">
                    <MapPin className="h-4 w-4 text-ur-primary" />
                    {request.location}
                  </p>
                  <p className="mt-2 font-mono text-xs font-bold text-ur-mint">
                    {request.id}
                  </p>
                </div>

                <StatusBadge label={payment.label} variant={payment.variant} icon={payment.icon} />
                <StatusBadge label={proof.label} variant={proof.variant} icon={proof.icon} />
                <StatusBadge label={hold.label} variant={hold.variant} icon={hold.icon} />
                <StatusBadge label={code.label} variant={code.variant} icon={code.icon} />

                <Link href={`/viewing-requests/${request.id}`}>
                  <Button size="sm" variant="outline" className="w-full xl:w-auto">
                    Open
                  </Button>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
