import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";

const defaultSteps = ["Review Details", "Make Payment", "Processing", "Confirmed", "Complete"];

/**
 * Below `sm` (the audit found this cramming 5 full label+status blocks
 * into ~360-430px - readable but visually dense, since each column has
 * barely 60-70px before its connector line) this renders a compact
 * dots-only row plus a single "Step N of T: <label> - <status>" line for
 * the current step, instead of 5 small text blocks side by side. `sm:`
 * and up render the original full layout completely unchanged - step
 * logic (currentStep / completed / active) is identical in both, only the
 * rendering differs.
 *
 * `activeLoading` lets a caller show a rotating ring around the active
 * step's circle while the real action behind that step (paying,
 * generating, verifying) is actually in flight - e.g.
 * `<Stepper currentStep={currentStep} activeLoading={verifying} />` -
 * instead of the circle just sitting there as a static number the whole
 * time. Has no effect on a step that isn't currently active.
 */
export function Stepper({
  currentStep,
  steps = defaultSteps,
  activeLoading = false,
}: {
  currentStep: number;
  steps?: string[];
  activeLoading?: boolean;
}) {
  const currentLabel = steps[currentStep - 1] ?? steps[steps.length - 1];
  const currentDone = currentStep > steps.length;

  return (
    <div className="ur-card p-4 sm:p-5">
      {/* Compact mobile layout - dots only, current step's label called out below. */}
      <div className="sm:hidden">
        <div className="flex items-center">
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const completed = stepNumber < currentStep;
            const active = stepNumber === currentStep;
            return (
              <div key={label} className={cn("flex items-center", index < steps.length - 1 && "flex-1")}>
                <div
                  className={cn(
                    "relative grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 text-xs font-bold",
                    completed && "border-ur-primary text-ur-primary",
                    active && "border-ur-primary bg-ur-primary text-white",
                    !completed && !active && "border-ur-border text-ur-text-muted",
                  )}
                  aria-hidden="true"
                >
                  {active && activeLoading ? (
                    <Spinner size="xs" className="absolute inset-[-3px] h-[calc(100%+6px)] w-[calc(100%+6px)] text-white" />
                  ) : null}
                  {completed ? <Icon name="check" size={12} /> : stepNumber}
                </div>
                {index < steps.length - 1 ? (
                  <div className={cn("mx-1.5 h-0.5 flex-1", completed ? "bg-ur-primary" : "bg-ur-border")} />
                ) : null}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-center text-xs font-bold text-ur-text">
          Step {Math.min(currentStep, steps.length)} of {steps.length}: {currentLabel}
        </p>
        <p
          className={cn(
            "text-center text-xs",
            currentDone ? "text-ur-primary" : "text-ur-warning",
          )}
        >
          {currentDone ? "Completed" : "In Progress"}
        </p>
      </div>

      {/* Original full layout, unchanged, sm and up. */}
      <div className="hidden items-center sm:flex">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const completed = stepNumber < currentStep;
          const active = stepNumber === currentStep;

          return (
            <div key={label} className={cn("flex flex-1 items-center", index === steps.length - 1 && "flex-none")}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "relative grid h-9 w-9 place-items-center rounded-full border-2 text-sm font-bold",
                    completed && "border-ur-primary text-ur-primary",
                    active && "border-ur-primary bg-ur-primary text-white",
                    !completed && !active && "border-ur-border text-ur-text-muted",
                  )}
                >
                  {active && activeLoading ? (
                    <Spinner size="sm" className="absolute inset-[-3px] h-[calc(100%+6px)] w-[calc(100%+6px)] text-white" />
                  ) : null}
                  {completed ? <Icon name="check" size={16} /> : stepNumber}
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
    </div>
  );
}
