import { CheckCircle2 } from "lucide-react";
import { trustFlowSteps } from "@/lib/tenant-dashboard-data";
import { Badge } from "@/components/ui/badge";

export function TrustFlowTimelineCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Current trust flow
      </p>

      <div className="mt-4 space-y-3">
        {trustFlowSteps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-success-bg text-ur-success">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-white">{step.title}</p>
                  <Badge variant={step.status === "Active" ? "warning" : "success"}>
                    {step.status}
                  </Badge>
                </div>
                <p className="mt-1 text-xs leading-5 text-white/52">{step.description}</p>
                <Icon className="mt-2 h-4 w-4 text-ur-primary" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
