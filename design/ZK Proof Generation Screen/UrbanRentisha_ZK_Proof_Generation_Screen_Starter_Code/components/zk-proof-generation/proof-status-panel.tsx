import { AlertTriangle, CheckCircle2, Clock3, Loader2 } from "lucide-react";
import type { ProofStatus, ZkProofRequest } from "@/lib/zk-proof-data";
import { cn } from "@/lib/utils";

type ProofStatusPanelProps = {
  status: ProofStatus;
  request: ZkProofRequest;
};

const statusCopy: Record<ProofStatus, { title: string; description: string; tone: "neutral" | "success" | "warning" | "danger" }> = {
  ready: {
    title: "Ready to generate",
    description: "Payment is confirmed and proof inputs are available.",
    tone: "neutral"
  },
  generating: {
    title: "Generating private proof",
    description: "The proof circuit is processing the payment condition and private witness values.",
    tone: "warning"
  },
  generated: {
    title: "Proof generated",
    description: "A verifier-ready proof hash is now available for the next verification step.",
    tone: "success"
  },
  failed: {
    title: "Proof generation failed",
    description: "The proof could not be generated. Check payment reference and retry.",
    tone: "danger"
  }
};

export function ProofStatusPanel({ status, request }: ProofStatusPanelProps) {
  const copy = statusCopy[status];
  const Icon =
    status === "generated"
      ? CheckCircle2
      : status === "failed"
        ? AlertTriangle
        : status === "generating"
          ? Loader2
          : Clock3;

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
            <Icon className={cn("h-6 w-6", status === "generating" && "animate-spin")} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Proof status
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
