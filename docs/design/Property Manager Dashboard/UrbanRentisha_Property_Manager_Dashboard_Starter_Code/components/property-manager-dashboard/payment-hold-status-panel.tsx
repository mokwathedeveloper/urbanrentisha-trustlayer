import { ReceiptText } from "lucide-react";
import { paymentHolds, statusVisuals, type HoldStatus } from "@/lib/property-manager-data";
import { StatusBadge } from "@/components/property-manager-dashboard/status-badge";

export function PaymentHoldStatusPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Escrow / payment-hold status
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Holds and reservation payments
      </h2>

      <div className="mt-5 space-y-3">
        {paymentHolds.map((hold) => {
          const status = statusVisuals.hold[hold.status as HoldStatus];

          return (
            <article key={hold.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-warning-bg text-ur-warning">
                    <ReceiptText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-black text-white">{hold.propertyTitle}</p>
                    <p className="mt-1 text-sm text-white/52">{hold.tenantName}</p>
                    <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{hold.id}</p>
                  </div>
                </div>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-ur-sm border border-white/10 bg-black/20 p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                    Amount
                  </p>
                  <p className="mt-1 text-sm font-black text-white">KES {hold.amountKes.toLocaleString()}</p>
                </div>
                <div className="rounded-ur-sm border border-white/10 bg-black/20 p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                    Hold until
                  </p>
                  <p className="mt-1 text-sm font-black text-white">{hold.holdUntil}</p>
                </div>
              </div>

              <p className="mt-3 truncate font-mono text-xs font-bold text-white/62">
                TX: {hold.txHash}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
