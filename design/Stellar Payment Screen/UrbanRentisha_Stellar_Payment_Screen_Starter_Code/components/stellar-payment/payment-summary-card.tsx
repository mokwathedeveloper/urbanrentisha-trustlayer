import { CheckCircle2, Clock3, LockKeyhole } from "lucide-react";
import type { PaymentStatus, StellarPaymentRequest } from "@/lib/stellar-payment-data";
import { requestSummaryItems } from "@/lib/stellar-payment-data";
import { Badge } from "@/components/ui/badge";

type PaymentSummaryCardProps = {
  request: StellarPaymentRequest;
  status: PaymentStatus;
};

export function PaymentSummaryCard({ request, status }: PaymentSummaryCardProps) {
  const confirmed = status === "confirmed";

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Payment summary
          </p>
          <h2 className="mt-2 text-lg font-black text-white">{request.propertyTitle}</h2>
          <p className="mt-1 text-sm text-white/52">{request.propertyLocation}</p>
        </div>

        <Badge variant={confirmed ? "success" : "warning"}>
          {confirmed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
          {confirmed ? "Paid" : "Pending"}
        </Badge>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <SummaryTile label="Amount" value={`KES ${request.amountKes.toLocaleString()}`} />
        <SummaryTile label="XLM" value={request.amountXlm} mono />
        <SummaryTile label="Memo" value={request.memo} mono />
        <SummaryTile label="Network" value={request.network} />
      </div>

      <div className="mt-5 space-y-3">
        {requestSummaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-bold text-white/70">{item.label}</p>
              </div>
              <p className="text-sm font-black text-white">
                {item.label === "Payment" ? (confirmed ? "Confirmed" : "Pending") : item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
        <div className="flex gap-3">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-ur-primary" />
          <p className="text-sm leading-6 text-white/60">
            Viewing access remains locked until the next proof verification step succeeds.
          </p>
        </div>
      </div>
    </section>
  );
}

function SummaryTile({
  label,
  value,
  mono
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">{label}</p>
      <p className={mono ? "mt-1 font-mono text-xs font-bold text-ur-mint" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
