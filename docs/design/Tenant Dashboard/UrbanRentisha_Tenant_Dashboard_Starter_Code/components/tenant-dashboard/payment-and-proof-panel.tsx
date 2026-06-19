import Link from "next/link";
import { ArrowRight, Hash, LockKeyhole, ReceiptText, ShieldCheck, WalletCards } from "lucide-react";
import { tenantRequests } from "@/lib/tenant-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PaymentAndProofPanel() {
  const request = tenantRequests[0];

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Payment and proof
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Payment proof is verified.
      </h2>

      <div className="mt-5 grid gap-3">
        <StatusRow
          icon={<WalletCards className="h-5 w-5" />}
          label="Payment status"
          value="Paid"
          badge={<Badge variant="success">KES {request.paymentAmountKes}</Badge>}
        />
        <StatusRow
          icon={<ReceiptText className="h-5 w-5" />}
          label="Transaction"
          value={request.txHash ?? "Not available"}
          mono
        />
        <StatusRow
          icon={<LockKeyhole className="h-5 w-5" />}
          label="Proof reference"
          value={request.proofHash ?? "Not available"}
          mono
        />
        <StatusRow
          icon={<ShieldCheck className="h-5 w-5" />}
          label="Verification"
          value="Accepted by verification layer"
          badge={<Badge variant="success">Verified</Badge>}
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link href={`/stellar-payment/${request.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View payment
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href={`/proof-verification/${request.id}`} className="w-full">
          <Button className="w-full">
            View proof
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

function StatusRow({
  icon,
  label,
  value,
  badge,
  mono
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
            {label}
          </p>
          <p className={mono ? "mt-1 truncate font-mono text-sm font-bold text-ur-mint" : "mt-1 text-sm font-bold text-white"}>
            {value}
          </p>
        </div>
      </div>
      {badge}
    </div>
  );
}
