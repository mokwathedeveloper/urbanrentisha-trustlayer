import { CheckCircle2 } from "lucide-react";
import { reportReasons } from "@/lib/report-data";
import { cn } from "@/lib/utils";

type ReportReasonGridProps = {
  selectedReasons: string[];
  onToggle: (reasonId: string) => void;
};

export function ReportReasonGrid({
  selectedReasons,
  onToggle
}: ReportReasonGridProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Suspicious signals
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        What made it suspicious?
      </h2>
      <p className="mt-2 text-sm leading-6 text-white/56">
        Select one or more reasons. This helps route the case correctly.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {reportReasons.map((reason) => {
          const Icon = reason.icon;
          const selected = selectedReasons.includes(reason.id);

          return (
            <button
              key={reason.id}
              type="button"
              onClick={() => onToggle(reason.id)}
              className={cn(
                "rounded-ur-lg border p-4 text-left transition-colors ur-focus",
                selected
                  ? "border-ur-primary bg-ur-primary/10"
                  : "border-white/10 bg-black/16 hover:border-ur-primary/40 hover:bg-white/[0.04]"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className={cn(
                  "grid h-11 w-11 shrink-0 place-items-center rounded-ur",
                  selected ? "bg-ur-primary text-white" : "bg-white/5 text-white/52"
                )}>
                  <Icon className="h-5 w-5" />
                </div>

                {selected ? <CheckCircle2 className="h-5 w-5 text-ur-success" /> : null}
              </div>

              <p className="mt-4 font-black text-white">{reason.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/52">{reason.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
