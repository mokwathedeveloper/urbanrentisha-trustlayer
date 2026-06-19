import { LockKeyhole, ReceiptText, ShieldCheck } from "lucide-react";
import type { ViewingProperty } from "@/lib/request-viewing-data";

type ViewingFeeCardProps = {
  property: ViewingProperty;
};

export function ViewingFeeCard({ property }: ViewingFeeCardProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Required viewing fee
      </p>

      <div className="mt-4 rounded-ur-lg border border-white/10 bg-black/18 p-5">
        <ReceiptText className="mb-4 h-6 w-6 text-ur-primary" />
        <p className="text-sm text-white/48">Amount due before proof</p>
        <p className="mt-1 text-4xl font-black tracking-[-0.05em] text-white">
          KES {property.viewingFeeKes.toLocaleString()}
        </p>
        <p className="mt-2 text-sm text-white/48">
          This fee starts the secure viewing workflow.
        </p>
      </div>

      <div className="mt-4 rounded-ur-lg border border-ur-success/20 bg-ur-success-bg p-4">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ur-success" />
          <div>
            <p className="text-sm font-black text-ur-success">Proof-gated access</p>
            <p className="mt-1 text-sm leading-6 text-ur-success/76">
              The platform verifies the payment condition before revealing private viewing details.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <div className="flex gap-3">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-ur-primary" />
          <div>
            <p className="text-sm font-black text-white">Access status</p>
            <p className="mt-1 text-sm leading-6 text-white/56">
              Locked until Stellar payment and ZK proof verification are completed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
