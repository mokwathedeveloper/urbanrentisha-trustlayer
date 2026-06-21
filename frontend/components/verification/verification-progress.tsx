import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import type { VerificationStage } from "@/lib/api";

const STEPS: { stage: VerificationStage; label: string }[] = [
  { stage: "PROFILE_CREATED", label: "Profile Created" },
  { stage: "DOCUMENTS_UPLOADED", label: "Documents Uploaded" },
  { stage: "UNDER_REVIEW", label: "Under Admin Review" },
  { stage: "APPROVED", label: "Approved" },
];

const STEP_ORDER: Record<VerificationStage, number> = {
  PROFILE_CREATED: 1,
  DOCUMENTS_UPLOADED: 2,
  UNDER_REVIEW: 3,
  NEEDS_CORRECTION: 3,
  APPROVED: 4,
  REJECTED: 4,
};

export function VerificationProgress({ stage }: { stage: VerificationStage }) {
  if (stage === "REJECTED") {
    return (
      <div className="ur-card flex items-center gap-3 border-ur-error/30 bg-ur-error-bg p-4">
        <Icon name="warning" size={20} className="text-ur-error" />
        <div>
          <p className="text-sm font-bold text-ur-error">Verification Rejected</p>
          <p className="text-xs text-ur-text-secondary">
            Your verification was not approved. Contact support for details.
          </p>
        </div>
      </div>
    );
  }

  const currentStepNumber = STEP_ORDER[stage];

  return (
    <div className="ur-card p-5">
      {stage === "NEEDS_CORRECTION" ? (
        <div className="mb-4 flex items-center gap-2 rounded-ur border border-ur-warning/30 bg-ur-warning-bg px-3 py-2 text-xs font-semibold text-ur-warning">
          <Icon name="info" size={14} />
          Needs Correction — please re-upload the requested documents.
        </div>
      ) : null}
      <div className="flex items-center">
        {STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const completed = stepNumber < currentStepNumber;
          const active = stepNumber === currentStepNumber;

          return (
            <div key={step.stage} className={cn("flex flex-1 items-center", index === STEPS.length - 1 && "flex-none")}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-full border-2 text-sm font-bold",
                    completed && "border-ur-primary text-ur-primary",
                    active && "border-ur-primary bg-ur-primary text-white",
                    !completed && !active && "border-ur-border text-ur-text-muted",
                  )}
                >
                  {completed ? <Icon name="check" size={16} /> : stepNumber}
                </div>
                <p
                  className={cn(
                    "text-center text-xs font-bold",
                    completed || active ? "text-ur-text" : "text-ur-text-muted",
                  )}
                >
                  {step.label}
                </p>
              </div>
              {index < STEPS.length - 1 ? (
                <div className={cn("mx-3 h-0.5 flex-1", completed ? "bg-ur-primary" : "bg-ur-border")} />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
