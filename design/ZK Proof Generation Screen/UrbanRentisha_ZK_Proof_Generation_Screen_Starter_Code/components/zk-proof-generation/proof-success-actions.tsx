import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { ZkProofRequest } from "@/lib/zk-proof-data";
import { Button } from "@/components/ui/button";

type ProofSuccessActionsProps = {
  request: ZkProofRequest;
};

export function ProofSuccessActions({ request }: ProofSuccessActionsProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Proof ready
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Continue to proof verification.
          </h2>
          <p className="mt-2 max-w-[680px] text-sm leading-6 text-white/58">
            The proof is generated and ready to be checked by the verifier. Access remains locked until verification succeeds.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link href={`/proof-verification/${request.requestId}`} className="w-full sm:w-auto">
          <Button size="lg" className="w-full">
            Verify proof
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
