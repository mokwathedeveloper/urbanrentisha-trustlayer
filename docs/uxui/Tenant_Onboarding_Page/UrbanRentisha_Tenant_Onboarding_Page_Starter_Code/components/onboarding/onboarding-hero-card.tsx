import { ArrowRight, CheckCircle2 } from "lucide-react";
import { onboardingSteps } from "@/lib/onboarding-data";

type OnboardingHeroCardProps = {
  activeStep: number;
};

export function OnboardingHeroCard({ activeStep }: OnboardingHeroCardProps) {
  const step = onboardingSteps[activeStep];
  const Icon = step.icon;

  return (
    <article className="relative overflow-hidden rounded-ur-xl border border-ur-primary/25 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="absolute right-[-70px] top-[-90px] h-64 w-64 rounded-full bg-ur-primary/16 blur-[80px]" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
            <Icon className="h-7 w-7" />
          </div>

          <span className="rounded-full border border-ur-primary/20 bg-ur-success-bg px-3 py-1 text-xs font-bold text-ur-success">
            {step.eyebrow}
          </span>
        </div>

        <h2 className="text-3xl font-black tracking-[-0.05em] text-white">
          {step.title}
        </h2>

        <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">
          {step.description}
        </p>

        <div className="mt-6 flex items-start gap-3 rounded-ur-lg border border-white/10 bg-black/18 p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ur-primary" />
          <div>
            <p className="text-sm font-black text-white">What this protects</p>
            <p className="mt-1 text-sm leading-6 text-white/58">{step.outcome}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-ur-mint">
          Continue through the verified flow
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </article>
  );
}
