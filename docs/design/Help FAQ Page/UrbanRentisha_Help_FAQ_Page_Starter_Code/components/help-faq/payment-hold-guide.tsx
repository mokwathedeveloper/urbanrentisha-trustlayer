import { paymentHoldSteps } from "@/lib/help-faq-data";
import { cn } from "@/lib/utils";

export function PaymentHoldGuide() {
  return (
    <section id="payment-hold" className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Payment-hold status guide
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          What each payment-hold state means
        </h2>
        <p className="mt-2 max-w-[820px] text-sm leading-6 text-white/56">
          Payment-hold does not need to feel confusing. It is a simple status layer that shows whether payment, proof, and access checks are complete.
        </p>
      </div>

      <div className="mt-5 grid gap-3">
        {paymentHoldSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <article key={step.title} className="grid gap-4 rounded-ur-lg border border-white/10 bg-black/16 p-4 sm:grid-cols-[54px_1fr] sm:items-start">
              <div className="relative">
                <div
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-ur",
                    step.tone === "warning"
                      ? "bg-ur-warning-bg text-ur-warning"
                      : step.tone === "success"
                        ? "bg-ur-success-bg text-ur-success"
                        : "bg-white/5 text-white/62"
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-ur-primary text-xs font-black text-white">
                  {index + 1}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/56">{step.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
