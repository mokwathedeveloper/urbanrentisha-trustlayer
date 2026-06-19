import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { solutionSteps } from "@/lib/landing-data";

export function SolutionFlowSection() {
  return (
    <section className="ur-section bg-white">
      <div className="ur-container">
        <SectionHeading
          eyebrow="Trust flow"
          title="A simple path from verified property to unlocked viewing code."
          description="The product flow is intentionally focused for the MVP. A tenant should understand exactly when payment happens, when proof is generated, and when access unlocks."
          align="center"
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {solutionSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative">
                <div className="h-full rounded-ur-lg border border-ur-border bg-ur-page p-5 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-ur-success-bg text-ur-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-ur-text-muted">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 font-bold text-ur-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ur-text-secondary">
                    {step.description}
                  </p>
                </div>

                {index < solutionSteps.length - 1 ? (
                  <ArrowRight className="absolute -right-5 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-ur-primary lg:block" />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
