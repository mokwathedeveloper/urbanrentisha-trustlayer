import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { platformApprovals, statusVisuals, type ApprovalStatus } from "@/lib/admin-dashboard-data";
import { StatusBadge } from "@/components/admin-dashboard/status-badge";
import { Button } from "@/components/ui/button";

export function ApprovalsQueuePanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Platform-wide approvals
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Approval queue
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/56">
            Review listings, agents, property documents, and API partner access requests.
          </p>
        </div>

        <Link href="/admin/approvals">
          <Button variant="outline" size="sm">
            View all
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-5 overflow-hidden rounded-ur-lg border border-white/10">
        <div className="hidden grid-cols-[1.25fr_150px_130px_110px_120px] gap-4 border-b border-white/10 bg-black/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/38 xl:grid">
          <span>Approval item</span>
          <span>Type</span>
          <span>Risk score</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        <div className="divide-y divide-white/10">
          {platformApprovals.map((approval) => {
            const status = statusVisuals.approval[approval.status as ApprovalStatus];

            return (
              <article
                key={approval.id}
                className="grid gap-4 bg-black/10 px-4 py-4 xl:grid-cols-[1.25fr_150px_130px_110px_120px] xl:items-center"
              >
                <div className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                    <ClipboardCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-black text-white">{approval.title}</p>
                    <p className="mt-1 text-sm text-white/52">Submitted by {approval.submittedBy}</p>
                    <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{approval.id}</p>
                  </div>
                </div>

                <p className="text-sm font-bold capitalize text-white/70">
                  {approval.type.replace("_", " ")}
                </p>

                <p className="font-mono text-sm font-black text-white">{approval.riskScore}/100</p>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />

                <Link href={`/admin/approvals/${approval.id}`}>
                  <Button size="sm" variant="outline" className="w-full">
                    Review
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
