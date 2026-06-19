import { CalendarCheck2, KeyRound, ShieldCheck } from "lucide-react";
import { verifiedViewingRequests, type ViewingStatus } from "@/lib/agent-profile-data";
import { Badge } from "@/components/ui/badge";

function statusVariant(status: ViewingStatus) {
  if (status === "completed") return "success";
  if (status === "verified") return "success";
  return "warning";
}

export function VerifiedViewingRequestsCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Verified viewing requests
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Proof-backed viewing activity
      </h2>

      <div className="mt-5 overflow-hidden rounded-ur-lg border border-white/10">
        <div className="hidden grid-cols-[1fr_1fr_140px_130px] gap-4 border-b border-white/10 bg-black/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/38 lg:grid">
          <span>Request</span>
          <span>Property</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        <div className="divide-y divide-white/10">
          {verifiedViewingRequests.map((request) => (
            <div
              key={request.id}
              className="grid gap-4 bg-black/10 px-4 py-4 lg:grid-cols-[1fr_1fr_140px_130px] lg:items-center"
            >
              <div>
                <p className="font-mono text-sm font-bold text-ur-mint">{request.id}</p>
                <p className="mt-1 flex items-center gap-2 text-xs text-white/46">
                  <ShieldCheck className="h-3.5 w-3.5 text-ur-primary" />
                  {request.proof}
                </p>
              </div>

              <div>
                <p className="font-bold text-white">{request.property}</p>
                <p className="mt-1 flex items-center gap-2 text-xs text-white/46">
                  <KeyRound className="h-3.5 w-3.5 text-ur-primary" />
                  Tenant: {request.tenant}
                </p>
              </div>

              <p className="flex items-center gap-2 text-sm text-white/62">
                <CalendarCheck2 className="h-4 w-4 text-ur-primary" />
                {request.date}
              </p>

              <Badge variant={statusVariant(request.status)}>
                {request.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
