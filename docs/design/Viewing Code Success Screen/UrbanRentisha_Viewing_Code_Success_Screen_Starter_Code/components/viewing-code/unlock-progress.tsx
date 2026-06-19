import { CheckCircle2 } from "lucide-react";
import { unlockSteps } from "@/lib/viewing-code-data";

export function UnlockProgress() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-3 md:grid-cols-4">
        {unlockSteps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.label}
              className="rounded-ur-lg border border-ur-success/25 bg-ur-success-bg p-4"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur bg-ur-primary text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-black text-white">{step.label}</p>
                    <Icon className="h-3.5 w-3.5 text-ur-success" />
                  </div>
                  <p className="mt-1 text-xs text-ur-success/70">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
