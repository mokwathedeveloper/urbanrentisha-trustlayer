import { CheckCircle2 } from "lucide-react";
import { trustTimeline } from "@/lib/agent-profile-data";

export function TrustTimelineCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Trust timeline
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Agent verification history
      </h2>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {trustTimeline.map((event) => {
          const Icon = event.icon;
          return (
            <article key={event.title} className="flex gap-4 rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-success-bg text-ur-success">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-black text-white">{event.title}</p>
                <p className="mt-1 text-sm leading-6 text-white/56">{event.description}</p>
                <p className="mt-2 flex items-center gap-2 font-mono text-xs font-bold text-ur-mint">
                  <Icon className="h-3.5 w-3.5" />
                  {event.time}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
