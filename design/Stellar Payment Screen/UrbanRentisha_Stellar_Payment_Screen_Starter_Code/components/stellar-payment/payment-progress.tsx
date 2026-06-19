import { CheckCircle2 } from "lucide-react";
import { paymentSteps, type PaymentStatus } from "@/lib/stellar-payment-data";
import { cn } from "@/lib/utils";

type PaymentProgressProps = {
  status: PaymentStatus;
};

function getActiveIndex(status: PaymentStatus) {
  if (status === "idle") return 1;
  if (status === "wallet_connected") return 2;
  if (status === "submitting" || status === "confirming") return 3;
  if (status === "confirmed") return 4;
  return 1;
}

export function PaymentProgress({ status }: PaymentProgressProps) {
  const activeIndex = getActiveIndex(status);

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-3 md:grid-cols-5">
        {paymentSteps.map((step, index) => {
          const Icon = step.icon;
          const isDone = index < activeIndex;
          const isActive = index === activeIndex;

          return (
            <div
              key={step.label}
              className={cn(
                "rounded-ur-lg border p-4 transition-colors",
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
                    "grid h-10 w-10 shrink-0 place-items-center rounded-ur",
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
