import { CheckCircle2, CreditCard, FileCheck2, KeyRound, LockKeyhole } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Request", description: "Create viewing request", icon: FileCheck2 },
  { label: "Payment", description: "Pay viewing fee", icon: CreditCard },
  { label: "Proof", description: "Generate private proof", icon: LockKeyhole },
  { label: "Unlock", description: "Access viewing details", icon: KeyRound }
];

type RequestProgressProps = {
  activeStep: number;
};

export function RequestProgress({ activeStep }: RequestProgressProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-3 md:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isDone = index < activeStep;
          const isActive = index === activeStep;

          return (
            <div
              key={step.label}
              className={cn(
                "rounded-ur-lg border p-4",
                isActive
                  ? "border-ur-primary/70 bg-ur-primary/10"
                  : isDone
                    ? "border-ur-success/25 bg-ur-success-bg"
                    : "border-white/10 bg-black/16"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-ur",
                    isActive || isDone ? "bg-ur-primary text-white" : "bg-white/5 text-white/40"
                  )}
                >
                  {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <div>
                  <p className="text-sm font-black text-white">{step.label}</p>
                  <p className="mt-1 text-xs text-white/45">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
