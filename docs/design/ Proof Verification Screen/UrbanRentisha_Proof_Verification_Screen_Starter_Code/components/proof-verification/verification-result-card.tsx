"use client";

import { Check, CheckCircle2, Copy, Hash, UnlockKeyhole } from "lucide-react";
import type { ProofVerificationRequest } from "@/lib/proof-verification-data";
import { verificationOutputs } from "@/lib/proof-verification-data";
import { Button } from "@/components/ui/button";

type VerificationResultCardProps = {
  request: ProofVerificationRequest;
  copied: boolean;
  onCopy: () => void;
};

export function VerificationResultCard({
  request,
  copied,
  onCopy
}: VerificationResultCardProps) {
  return (
    <section className="rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-5 flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-success">
            Verification result
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Proof verified successfully.
          </h2>
          <p className="mt-2 text-sm leading-6 text-ur-success/78">
            The verifier accepted the proof. The request is now eligible for viewing access unlock.
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {verificationOutputs.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-ur-sm border border-ur-success/20 bg-black/16 p-3">
              <div className="mb-2 text-ur-success"><Icon className="h-4 w-4" /></div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ur-success/64">{item.label}</p>
              <p className="mt-1 text-sm font-black text-white">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-success/20 bg-black/18 p-4">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ur-success/64">
          <Hash className="h-4 w-4" />
          Verification hash
        </p>
        <p className="mt-2 break-all font-mono text-sm leading-6 text-white">{request.verificationHash}</p>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button className="w-full" onClick={onCopy}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy verification hash"}
        </Button>

        <Button variant="outline" className="w-full">
          <UnlockKeyhole className="h-4 w-4" />
          Prepare access unlock
        </Button>
      </div>
    </section>
  );
}
