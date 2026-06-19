import { reviewSteps } from "@/lib/report-data";

export function ReviewProcessCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        What happens next
      </p>

      <div className="mt-4 space-y-3">
        {reviewSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black text-white">
                  {index + 1}. {step.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-white/52">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
