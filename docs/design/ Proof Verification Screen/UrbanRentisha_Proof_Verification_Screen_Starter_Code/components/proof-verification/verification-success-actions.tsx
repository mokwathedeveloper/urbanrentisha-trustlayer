import Link from "next/link";
import { ArrowRight, KeyRound, ShieldCheck } from "lucide-react";
import type { ProofVerificationRequest } from "@/lib/proof-verification-data";
import { Button } from "@/components/ui/button";

type VerificationSuccessActionsProps = {
  request: ProofVerificationRequest;
};

export function VerificationSuccessActions({
  request
}: VerificationSuccessActionsProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
          <KeyRound className="h-6 w-6" />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Access eligibility ready
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Continue to viewing access unlock.
          </h2>
          <p className="mt-2 max-w-[680px] text-sm leading-6 text-white/58">
            Verification succeeded. The next screen can issue or reveal the viewing code according to platform policy.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link href={`/viewing-code/${request.requestId}`} className="w-full sm:w-auto">
          <Button size="lg" className="w-full">
            Unlock viewing access
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>

        <Link href="/proof-status" className="w-full sm:w-auto">
          <Button size="lg" variant="outline" className="w-full">
            <ShieldCheck className="h-4 w-4" />
            View proof status
          </Button>
        </Link>
      </div>
    </section>
  );
}
