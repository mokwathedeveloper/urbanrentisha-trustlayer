import { AlertTriangle, CheckCircle2, Clock3, Loader2, RadioTower } from "lucide-react";
import type { PaymentStatus, StellarPaymentRequest } from "@/lib/stellar-payment-data";
import { cn } from "@/lib/utils";

type TransactionStatusPanelProps = {
  status: PaymentStatus;
  request: StellarPaymentRequest;
};

const statusCopy: Record<PaymentStatus, { title: string; description: string; tone: "neutral" | "success" | "warning" | "danger" }> = {
  idle: {
    title: "Awaiting wallet connection",
    description: "Connect a Stellar testnet wallet to begin the payment flow.",
    tone: "neutral"
  },
  wallet_connected: {
    title: "Wallet connected",
    description: "Ready to submit the viewing-fee payment on Stellar testnet.",
    tone: "warning"
  },
  submitting: {
    title: "Submitting payment",
    description: "The transaction is being prepared and submitted to the network.",
    tone: "warning"
  },
  confirming: {
    title: "Confirming on Stellar",
    description: "Waiting for testnet confirmation and transaction hash availability.",
    tone: "warning"
  },
  confirmed: {
    title: "Payment confirmed",
    description: "Transaction hash is available. Continue to ZK proof generation next.",
    tone: "success"
  },
  failed: {
    title: "Payment failed",
    description: "The transaction did not complete. Retry with a funded testnet wallet.",
    tone: "danger"
  }
};

export function TransactionStatusPanel({ status, request }: TransactionStatusPanelProps) {
  const copy = statusCopy[status];
  const Icon =
    status === "confirmed"
      ? CheckCircle2
      : status === "failed"
        ? AlertTriangle
        : status === "submitting" || status === "confirming"
          ? Loader2
          : status === "wallet_connected"
            ? RadioTower
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
            <Icon className={cn("h-6 w-6", (status === "submitting" || status === "confirming") && "animate-spin")} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Transaction status
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
