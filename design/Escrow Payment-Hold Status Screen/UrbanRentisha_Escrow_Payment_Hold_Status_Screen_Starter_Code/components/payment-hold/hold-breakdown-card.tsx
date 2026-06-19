import { Banknote, ReceiptText, RefreshCcw, WalletCards } from "lucide-react";
import type { PaymentHoldRecord } from "@/lib/payment-hold-data";

type HoldBreakdownCardProps = {
  record: PaymentHoldRecord;
};

export function HoldBreakdownCard({ record }: HoldBreakdownCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Hold breakdown
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Payment-hold amount and policy view
      </h2>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <BreakdownTile icon={<WalletCards className="h-5 w-5" />} label="Total held" value={`KES ${record.holdAmountKes.toLocaleString()}`} />
        <BreakdownTile icon={<Banknote className="h-5 w-5" />} label="Network asset" value={record.holdAmountXlm} mono />
        <BreakdownTile icon={<ReceiptText className="h-5 w-5" />} label="Platform fee" value={`KES ${record.platformFeeKes.toLocaleString()}`} />
        <BreakdownTile icon={<RefreshCcw className="h-5 w-5" />} label="Refundable" value={`KES ${record.refundableAmountKes.toLocaleString()}`} />
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
        <p className="text-sm font-black text-white">Simplified MVP status</p>
        <p className="mt-2 text-sm leading-6 text-white/58">
          This screen explains the reservation hold in clear tenant-friendly language. Connect the final business rules to your backend, legal policy, and payment contract implementation.
        </p>
      </div>
    </section>
  );
}

function BreakdownTile({
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
      <p className={mono ? "mt-1 font-mono text-sm font-bold text-ur-mint" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
