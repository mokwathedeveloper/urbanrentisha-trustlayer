"use client";

import { ArrowRight } from "lucide-react";
import { onboardingSteps } from "@/lib/onboarding-data";
import { cn } from "@/lib/utils";

type VerifiedViewingFlowProps = {
  activeStep: number;
  onStepChange: (step: number) => void;
};

export function VerifiedViewingFlow({
  activeStep,
  onStepChange
}: VerifiedViewingFlowProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Verified viewing flow
        </p>
        <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
          Access stays locked until proof verification succeeds.
        </h2>
      </div>

      <div className="grid gap-3 lg:grid-cols-5">
        {onboardingSteps.map((step, index) => {
          const Icon = step.icon;
          const selected = activeStep === index;

          return (
            <div key={step.id} className="relative">
              <button
                type="button"
                onClick={() => onStepChange(index)}
                className={cn(
                  "h-full w-full rounded-ur-lg border p-4 text-left transition-all ur-focus",
                  selected
                    ? "border-ur-primary/75 bg-ur-primary/10 shadow-card-hover"
                    : "border-white/10 bg-black/12 hover:border-white/20 hover:bg-white/5"
                )}
              >
                <div
                  className={cn(
                    "mb-4 grid h-11 w-11 place-items-center rounded-ur",
                    selected ? "bg-ur-primary text-white" : "bg-white/5 text-ur-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                  {step.eyebrow}
                </p>
                <h3 className="mt-1 text-sm font-black leading-5 text-white">
                  {step.title}
                </h3>
              </button>

              {index < onboardingSteps.length - 1 ? (
                <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-ur-primary lg:block" />
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
