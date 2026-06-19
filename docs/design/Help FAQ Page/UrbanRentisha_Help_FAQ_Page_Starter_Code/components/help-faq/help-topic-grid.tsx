import { ChevronRight } from "lucide-react";
import { helpTopics, statusVisuals, type HelpTopicTone } from "@/lib/help-faq-data";
import { cn } from "@/lib/utils";

export function HelpTopicGrid() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Help topics
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Choose what you need to understand
        </h2>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {helpTopics.map((topic) => {
          const Icon = topic.icon;
          const visual = statusVisuals.tone[topic.tone as HelpTopicTone];

          return (
            <a
              key={topic.id}
              href={topic.href}
              className="group rounded-ur-lg border border-white/10 bg-black/16 p-4 transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04] ur-focus"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={cn(
                    "grid h-12 w-12 shrink-0 place-items-center rounded-ur",
                    visual.variant === "danger"
                      ? "bg-ur-error-bg text-ur-error"
                      : visual.variant === "warning"
                        ? "bg-ur-warning-bg text-ur-warning"
                        : visual.variant === "success"
                          ? "bg-ur-success-bg text-ur-success"
                          : "bg-white/5 text-white/62"
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <ChevronRight className="h-5 w-5 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-ur-primary" />
              </div>

              <h3 className="mt-4 text-lg font-black text-white">{topic.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/56">{topic.description}</p>
            </a>
          );
        })}
      </div>
    </section>
  );
}
