import { CheckCircle2 } from "lucide-react";
import { viewingInstructions } from "@/lib/viewing-code-data";

export function InstructionsChecklistCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Access checklist
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Before you arrive
      </h2>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {viewingInstructions.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-ur-lg border border-white/10 bg-black/16 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <CheckCircle2 className="h-5 w-5 text-ur-success" />
              </div>
              <h3 className="font-black text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/58">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
