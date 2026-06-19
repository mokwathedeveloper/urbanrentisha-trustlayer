import { explainerCards, statusVisuals, type HelpTopicTone } from "@/lib/help-faq-data";
import { cn } from "@/lib/utils";

export function ExplainerSection() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Core explainers
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Stellar, ZK proof, and payment status
        </h2>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {explainerCards.map((card) => {
          const Icon = card.icon;
          const visual = statusVisuals.tone[card.tone as HelpTopicTone];

          return (
            <article key={card.title} id={card.title.toLowerCase().replaceAll(" ", "-")} className="rounded-ur-lg border border-white/10 bg-black/16 p-5">
              <div
                className={cn(
                  "grid h-12 w-12 place-items-center rounded-ur",
                  visual.variant === "warning"
                    ? "bg-ur-warning-bg text-ur-warning"
                    : "bg-ur-success-bg text-ur-success"
                )}
              >
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-lg font-black text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/56">{card.description}</p>

              <ul className="mt-4 space-y-2">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm leading-6 text-white/58">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ur-primary" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
