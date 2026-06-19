import { ReceiptText, ShieldCheck, Sparkles, Zap } from "lucide-react";
import type { StellarPaymentRequest } from "@/lib/stellar-payment-data";
import { Badge } from "@/components/ui/badge";

type PaymentAmountCardProps = {
  request: StellarPaymentRequest;
};

export function PaymentAmountCard({ request }: PaymentAmountCardProps) {
  return (
    <section className="overflow-hidden rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Payment amount locked
          </Badge>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-white">
            Viewing fee payment
          </h2>

          <p className="mt-3 max-w-[660px] text-sm leading-6 text-white/62">
            This payment is linked to the viewing request. After confirmation, the transaction hash is used for the private proof step.
          </p>
        </div>

        <div className="min-w-[260px] rounded-ur-lg border border-white/10 bg-black/20 p-5 text-right">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/42">
            Required viewing fee
          </p>
          <p className="mt-2 text-4xl font-black tracking-[-0.05em] text-white">
            KES {request.amountKes.toLocaleString()}
          </p>
          <p className="mt-2 font-mono text-lg font-bold text-ur-mint">
            {request.amountXlm} {request.asset}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Info icon={<Sparkles className="h-5 w-5" />} label="Network" value={request.network} />
        <Info icon={<Zap className="h-5 w-5" />} label="Asset" value={request.asset} />
        <Info icon={<ReceiptText className="h-5 w-5" />} label="Memo" value={request.memo} mono />
      </div>
    </section>
  );
}

function Info({
  icon,
  label,
  value,
  mono
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <div className="mb-3 text-ur-primary">{icon}</div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p>
      <p className={mono ? "mt-1 font-mono text-sm font-bold text-white" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
