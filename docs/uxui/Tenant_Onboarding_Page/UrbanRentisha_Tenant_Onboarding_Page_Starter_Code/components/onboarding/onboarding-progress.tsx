"use client";

import { CheckCircle2 } from "lucide-react";
import { onboardingSteps } from "@/lib/onboarding-data";
import { cn } from "@/lib/utils";

type OnboardingProgressProps = {
  activeStep: number;
  progress: number;
  onStepChange: (step: number) => void;
};

export function OnboardingProgress({
  activeStep,
  progress,
  onStepChange
}: OnboardingProgressProps) {
  return (
    <div className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm font-black text-white">Verified viewing path</p>
        <span className="rounded-full border border-ur-primary/20 bg-ur-primary/10 px-3 py-1 text-xs font-bold text-ur-mint">
          {progress}% complete
        </span>
      </div>

      <div className="grid gap-2">
        {onboardingSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStep === index;
          const isDone = activeStep > index;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepChange(index)}
              className={cn(
                "flex items-center gap-3 rounded-ur-sm border p-3 text-left transition-colors ur-focus",
                isActive
                  ? "border-ur-primary/70 bg-ur-primary/10"
                  : "border-white/10 bg-black/12 hover:border-white/20 hover:bg-white/5"
              )}
            >
              <div
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm",
                  isActive || isDone ? "bg-ur-primary text-white" : "bg-white/5 text-ur-muted"
                )}
              >
                {isDone ? <CheckCircle2 className="h-4.5 w-4.5" /> : <Icon className="h-4.5 w-4.5" />}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">
                  {step.eyebrow}
                </p>
                <p className="mt-0.5 text-sm font-bold text-white">{step.title}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
