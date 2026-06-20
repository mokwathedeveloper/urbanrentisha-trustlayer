import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const defaultSteps = ["Review Details", "Make Payment", "Processing", "Confirmed", "Complete"];

export function Stepper({ currentStep, steps = defaultSteps }: { currentStep: number; steps?: string[] }) {
  return (
    <div className="ur-card flex items-center p-5">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const completed = stepNumber < currentStep;
        const active = stepNumber === currentStep;

        return (
          <div key={label} className={cn("flex flex-1 items-center", index === steps.length - 1 && "flex-none")}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full border-2 text-sm font-bold",
                  completed && "border-ur-primary text-ur-primary",
                  active && "border-ur-primary bg-ur-primary text-white",
                  !completed && !active && "border-ur-border text-ur-text-muted",
                )}
              >
                {completed ? <Check className="h-4 w-4" /> : stepNumber}
              </div>
              <div className="text-center">
                <p className={cn("text-xs font-bold", completed || active ? "text-ur-text" : "text-ur-text-muted")}>
                  {stepNumber}. {label}
                </p>
                <p className={cn("text-xs", completed ? "text-ur-primary" : active ? "text-ur-warning" : "text-ur-text-muted")}>
                  {completed ? "Completed" : active ? "In Progress" : "Pending"}
                </p>
              </div>
            </div>
            {index < steps.length - 1 ? (
              <div className={cn("mx-3 h-0.5 flex-1", completed ? "bg-ur-primary" : "bg-ur-border")} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
