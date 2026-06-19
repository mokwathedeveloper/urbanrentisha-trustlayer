import { CheckCircle2, Clock3 } from "lucide-react";
import type { HoldStatus } from "@/lib/payment-hold-data";

type HoldAuditTrailCardProps = {
  status: HoldStatus;
};

export function HoldAuditTrailCard({ status }: HoldAuditTrailCardProps) {
  const items = [
    "Payment received",
    "Proof verified",
    "Viewing access unlocked",
    status === "release_eligible"
      ? "Release eligible"
      : status === "refund_pending"
        ? "Refund review opened"
        : "Reservation active"
  ];

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Audit trail
      </p>

      <div className="mt-4 space-y-3">
        {items.map((item, index) => (
          <div key={item} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-success-bg text-ur-success">
              {index < items.length - 1 ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
            </div>
            <div>
              <p className="text-sm font-black text-white">{item}</p>
              <p className="mt-1 text-xs leading-5 text-white/52">
                Recorded against the reservation and hold reference.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
