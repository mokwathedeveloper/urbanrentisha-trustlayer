"use client";

import { CheckCircle2, Loader2, Send, ShieldCheck, UploadCloud } from "lucide-react";
import type {
  ProofVerificationRequest,
  VerificationStatus
} from "@/lib/proof-verification-data";
import { Button } from "@/components/ui/button";

type SubmitVerificationCardProps = {
  request: ProofVerificationRequest;
  status: VerificationStatus;
  onSubmit: () => void;
};

export function SubmitVerificationCard({
  request,
  status,
  onSubmit
}: SubmitVerificationCardProps) {
  const busy = status === "submitting" || status === "verifying";
  const verified = status === "verified";

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Submit proof
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Send generated proof to the verifier contract.
        </h2>
        <p className="mt-3 max-w-[760px] text-sm leading-6 text-white/58">
          The proof payload is submitted to the Stellar/Soroban verification layer. A successful result makes the request eligible for viewing access unlock.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <SubmitTile icon={<UploadCloud className="h-5 w-5" />} label="Payload" value="Proof hash + public inputs" />
        <SubmitTile icon={<ShieldCheck className="h-5 w-5" />} label="Contract" value={request.contractId} mono />
        <SubmitTile icon={<Send className="h-5 w-5" />} label="Function" value={request.contractFunction} mono />
      </div>

      <Button
        size="lg"
        className="mt-5 w-full"
        onClick={onSubmit}
        disabled={busy || verified}
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : verified ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
        {verified ? "Proof verified" : busy ? "Submitting for verification..." : "Submit proof for verification"}
      </Button>
    </section>
  );
}

function SubmitTile({
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
      <p className={mono ? "mt-1 truncate font-mono text-sm font-bold text-white" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
