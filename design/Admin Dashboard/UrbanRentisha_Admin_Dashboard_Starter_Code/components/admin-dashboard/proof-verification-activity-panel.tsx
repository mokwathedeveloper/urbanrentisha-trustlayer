import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { proofActivities, statusVisuals, type ProofStatus } from "@/lib/admin-dashboard-data";
import { StatusBadge } from "@/components/admin-dashboard/status-badge";
import { Button } from "@/components/ui/button";

export function ProofVerificationActivityPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Proof verification activity
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Stellar / Soroban proof monitor
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/56">
            Track proof status, request IDs, hashes, tenant activity, and failed verification cases.
          </p>
        </div>

        <Link href="/admin/proofs">
          <Button variant="outline" size="sm">
            View proofs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-5 overflow-hidden rounded-ur-lg border border-white/10">
        <div className="hidden grid-cols-[1.2fr_1fr_135px_140px_120px] gap-4 border-b border-white/10 bg-black/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/38 xl:grid">
          <span>Request</span>
          <span>Listing</span>
          <span>Network</span>
          <span>Status</span>
          <span>Time</span>
        </div>

        <div className="divide-y divide-white/10">
          {proofActivities.map((proof) => {
            const status = statusVisuals.proof[proof.status as ProofStatus];

            return (
              <article
                key={proof.id}
                className="grid gap-4 bg-black/10 px-4 py-4 xl:grid-cols-[1.2fr_1fr_135px_140px_120px] xl:items-center"
              >
                <div className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                    <LockKeyhole className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-bold text-ur-mint">{proof.requestId}</p>
                    <p className="mt-1 text-sm text-white/52">{proof.tenant}</p>
                    <p className="mt-2 truncate font-mono text-xs font-bold text-white/62">{proof.proofHash}</p>
                  </div>
                </div>

                <p className="text-sm font-bold text-white">{proof.listing}</p>
                <p className="font-mono text-xs font-bold text-white/72">{proof.network}</p>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
                <p className="text-sm text-white/52">{proof.time}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
