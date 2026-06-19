import { CheckCircle2, Hash, ReceiptText, Wallet } from "lucide-react";
import type { ZkProofRequest } from "@/lib/zk-proof-data";
import { Badge } from "@/components/ui/badge";

type PaymentConfirmedCardProps = {
  request: ZkProofRequest;
};

export function PaymentConfirmedCard({ request }: PaymentConfirmedCardProps) {
  return (
    <section className="overflow-hidden rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <Badge variant="success">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Payment confirmed
          </Badge>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-white">
            Payment is ready for proof generation.
          </h2>

          <p className="mt-3 max-w-[680px] text-sm leading-6 text-ur-success/78">
            The Stellar payment has been received. This screen prepares the private witness values and generates a proof for the viewing-fee condition.
          </p>
        </div>

        <div className="min-w-[260px] rounded-ur-lg border border-ur-success/20 bg-black/18 p-5 text-right">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/64">
            Paid amount
          </p>
          <p className="mt-2 text-4xl font-black tracking-[-0.05em] text-white">
            KES {request.paymentAmountKes.toLocaleString()}
          </p>
          <p className="mt-2 font-mono text-lg font-bold text-ur-mint">
            {request.paymentAmountXlm}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Info icon={<Wallet className="h-5 w-5" />} label="Request" value={request.requestId} mono />
        <Info icon={<ReceiptText className="h-5 w-5" />} label="Property" value={request.propertyId} mono />
        <Info icon={<Hash className="h-5 w-5" />} label="Transaction" value={`${request.transactionHash.slice(0, 12)}...${request.transactionHash.slice(-8)}`} mono />
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
    <div className="rounded-ur-lg border border-ur-success/20 bg-black/16 p-4">
      <div className="mb-3 text-ur-success">{icon}</div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/60">{label}</p>
      <p className={mono ? "mt-1 font-mono text-sm font-bold text-white" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
