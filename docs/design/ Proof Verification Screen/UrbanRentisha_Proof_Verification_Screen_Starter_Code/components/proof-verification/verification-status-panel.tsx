import { AlertTriangle, CheckCircle2, Clock3, Loader2, RadioTower } from "lucide-react";
import type {
  ProofVerificationRequest,
  VerificationStatus
} from "@/lib/proof-verification-data";
import { cn } from "@/lib/utils";

type VerificationStatusPanelProps = {
  status: VerificationStatus;
  request: ProofVerificationRequest;
};

const statusCopy: Record<VerificationStatus, { title: string; description: string; tone: "neutral" | "success" | "warning" | "danger" }> = {
  ready: {
    title: "Ready to submit",
    description: "The generated proof is available and ready for contract verification.",
    tone: "neutral"
  },
  submitting: {
    title: "Submitting proof",
    description: "The proof payload is being sent to the Stellar/Soroban verification flow.",
    tone: "warning"
  },
  verifying: {
    title: "Verifying on Soroban",
    description: "The verifier is checking proof validity and payment-condition public inputs.",
    tone: "warning"
  },
  verified: {
    title: "Proof verified",
    description: "The proof is valid. The request is now eligible for access unlock.",
    tone: "success"
  },
  failed: {
    title: "Verification failed",
    description: "The verifier rejected the proof or the payment condition did not match.",
    tone: "danger"
  }
};

export function VerificationStatusPanel({
  status,
  request
}: VerificationStatusPanelProps) {
  const copy = statusCopy[status];
  const Icon =
    status === "verified"
      ? CheckCircle2
      : status === "failed"
        ? AlertTriangle
        : status === "submitting" || status === "verifying"
          ? Loader2
          : status === "ready"
            ? Clock3
            : RadioTower;

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div className={cn(
            "grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg",
            copy.tone === "success" && "bg-ur-success-bg text-ur-success",
            copy.tone === "warning" && "bg-ur-warning-bg text-ur-warning",
            copy.tone === "danger" && "bg-ur-error-bg text-ur-error",
            copy.tone === "neutral" && "bg-white/5 text-white/58"
          )}>
            <Icon className={cn("h-6 w-6", (status === "submitting" || status === "verifying") && "animate-spin")} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Verification status
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
              {copy.title}
            </h2>
            <p className="mt-2 max-w-[640px] text-sm leading-6 text-white/58">
              {copy.description}
            </p>
          </div>
        </div>

        <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4 sm:min-w-[180px] sm:text-right">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
            Request ID
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-ur-mint">{request.requestId}</p>
        </div>
      </div>
    </section>
  );
}
