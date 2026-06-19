import Link from "next/link";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import type { StellarPaymentRequest } from "@/lib/stellar-payment-data";
import { Button } from "@/components/ui/button";

type PaymentSuccessActionsProps = {
  request: StellarPaymentRequest;
};

export function PaymentSuccessActions({ request }: PaymentSuccessActionsProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Payment complete
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
              Generate the private payment proof next.
            </h2>
            <p className="mt-2 max-w-[660px] text-sm leading-6 text-white/58">
              The transaction hash confirms payment on Stellar testnet. The next screen should create the ZK proof used to unlock viewing access.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link href={`/zk-proof-generation/${request.requestId}`} className="w-full sm:w-auto">
          <Button size="lg" className="w-full">
            <LockKeyhole className="h-4 w-4" />
            Continue to ZK proof
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>

        <Link href="/tenant/dashboard" className="w-full sm:w-auto">
          <Button size="lg" variant="outline" className="w-full">
            View dashboard
          </Button>
        </Link>
      </div>
    </section>
  );
}
