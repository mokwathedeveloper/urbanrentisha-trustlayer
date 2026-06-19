"use client";

import { CircuitBoard, Database, Loader2, LockKeyhole, Play, ShieldCheck } from "lucide-react";
import type { ProofStatus, ZkProofRequest } from "@/lib/zk-proof-data";
import { Button } from "@/components/ui/button";

type GenerateProofCardProps = {
  request: ZkProofRequest;
  status: ProofStatus;
  onGenerate: () => void;
};

export function GenerateProofCard({
  request,
  status,
  onGenerate
}: GenerateProofCardProps) {
  const generating = status === "generating";
  const generated = status === "generated";

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Private proof action
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Generate proof for this payment condition.
        </h2>
        <p className="mt-3 max-w-[760px] text-sm leading-6 text-white/58">
          The proof confirms that the tenant paid the required viewing fee for this request without showing unrelated wallet history.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <GenerationTile
          icon={<Database className="h-5 w-5" />}
          label="Witness"
          value="Private inputs prepared"
        />
        <GenerationTile
          icon={<CircuitBoard className="h-5 w-5" />}
          label="Circuit"
          value={request.circuitName}
          mono
        />
        <GenerationTile
          icon={<ShieldCheck className="h-5 w-5" />}
          label="Verifier"
          value={request.verifier}
          mono
        />
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
        <div className="flex gap-3">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-ur-primary" />
          <div>
            <p className="text-sm font-black text-white">What remains private</p>
            <p className="mt-1 text-sm leading-6 text-white/58">
              Payment secret, nonce, and wallet context are used as private witness data. They are not displayed in the final verification record.
            </p>
          </div>
        </div>
      </div>

      <Button
        size="lg"
        className="mt-5 w-full"
        onClick={onGenerate}
        disabled={generating || generated}
      >
        {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
        {generated ? "Proof generated" : generating ? "Generating proof..." : "Generate private payment proof"}
      </Button>
    </section>
  );
}

function GenerationTile({
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
      <p className={mono ? "mt-1 break-all font-mono text-sm font-bold text-white" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
