import { CheckCircle2, Clock3 } from "lucide-react";
import { auditEvents, type VerificationStatus } from "@/lib/proof-verification-data";
import { cn } from "@/lib/utils";

type AuditTrailCardProps = {
  status: VerificationStatus;
};

export function AuditTrailCard({ status }: AuditTrailCardProps) {
  const done = status === "verified";

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Audit trail
      </p>

      <div className="mt-4 space-y-3">
        {auditEvents.map((event) => {
          const Icon = event.icon;

          return (
            <div key={event.title} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className={cn(
                "grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm",
                done ? "bg-ur-success-bg text-ur-success" : "bg-white/5 text-white/40"
              )}>
                {done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </div>
              <div>
                <p className="text-sm font-black text-white">{event.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-ur-sm border border-white/10 bg-black/16 p-3">
        <div className="flex items-center gap-2 text-sm font-bold text-white/62">
          <Clock3 className="h-4 w-4 text-ur-primary" />
          {done ? "All events recorded" : "Events will record after successful verification"}
        </div>
      </div>
    </section>
  );
}
