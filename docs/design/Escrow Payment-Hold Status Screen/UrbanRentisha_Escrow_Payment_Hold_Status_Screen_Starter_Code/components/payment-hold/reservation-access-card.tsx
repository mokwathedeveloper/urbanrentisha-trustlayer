import { KeyRound, LockKeyhole, UnlockKeyhole } from "lucide-react";
import type { PaymentHoldRecord } from "@/lib/payment-hold-data";
import { Badge } from "@/components/ui/badge";

type ReservationAccessCardProps = {
  record: PaymentHoldRecord;
};

export function ReservationAccessCard({ record }: ReservationAccessCardProps) {
  const unlocked = record.accessStatus === "Unlocked";

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Viewing access
          </p>
          <h2 className="mt-2 text-lg font-black text-white">
            {unlocked ? "Access unlocked" : "Access locked"}
          </h2>
        </div>

        <Badge variant={unlocked ? "success" : "warning"}>
          {unlocked ? <UnlockKeyhole className="h-3.5 w-3.5" /> : <LockKeyhole className="h-3.5 w-3.5" />}
          {record.accessStatus}
        </Badge>
      </div>

      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <KeyRound className="mb-3 h-5 w-5 text-ur-primary" />
        <p className="text-sm font-black text-white">Viewing code status</p>
        <p className="mt-2 text-sm leading-6 text-white/56">
          {unlocked
            ? "The tenant can proceed to the viewing code screen. The payment hold remains visible until the reservation is resolved."
            : "Viewing code is hidden until proof verification and access policy requirements are met."}
        </p>
      </div>
    </section>
  );
}
