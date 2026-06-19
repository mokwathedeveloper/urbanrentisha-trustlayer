import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type { StellarPaymentRequest } from "@/lib/stellar-payment-data";

type PaymentInstructionsProps = {
  request: StellarPaymentRequest;
};

export function PaymentInstructions({ request }: PaymentInstructionsProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Payment instructions
      </p>

      <div className="mt-4 space-y-3">
        <Instruction
          icon={<Info className="h-4 w-4" />}
          title="Use Stellar testnet"
          description="This demo payment must use testnet assets, not mainnet funds."
        />
        <Instruction
          icon={<CheckCircle2 className="h-4 w-4" />}
          title="Use the correct memo"
          description={`Include memo ${request.memo} so the request can match the payment.`}
        />
        <Instruction
          icon={<AlertTriangle className="h-4 w-4" />}
          title="Never share secret keys"
          description="The wallet connector should never ask for or store tenant secret keys."
        />
      </div>
    </section>
  );
}

function Instruction({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
        {icon}
      </div>
      <div>
        <p className="text-sm font-black text-white">{title}</p>
        <p className="mt-1 text-xs leading-5 text-white/52">{description}</p>
      </div>
    </div>
  );
}
