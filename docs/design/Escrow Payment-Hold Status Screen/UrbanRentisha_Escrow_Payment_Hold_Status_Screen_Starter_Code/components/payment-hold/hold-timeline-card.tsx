import { CheckCircle2, Clock3 } from "lucide-react";
import { holdTimeline, type HoldStatus } from "@/lib/payment-hold-data";

type HoldTimelineCardProps = {
  status: HoldStatus;
};

export function HoldTimelineCard({ status }: HoldTimelineCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Timeline
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Payment-hold activity
      </h2>

      <div className="mt-5 space-y-3">
        {holdTimeline.map((event, index) => {
          const Icon = event.icon;
          return (
            <div key={event.title} className="flex gap-4 rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur bg-ur-success-bg text-ur-success">
                {index < holdTimeline.length - 1 ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-black text-white">{event.title}</p>
                  <p className="inline-flex items-center gap-1 font-mono text-xs font-bold text-ur-mint">
                    <Clock3 className="h-3.5 w-3.5" />
                    {event.time}
                  </p>
                </div>
                <p className="mt-1 text-sm leading-6 text-white/56">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs leading-5 text-white/42">
        Current status: <span className="font-mono text-ur-mint">{status}</span>
      </p>
    </section>
  );
}
