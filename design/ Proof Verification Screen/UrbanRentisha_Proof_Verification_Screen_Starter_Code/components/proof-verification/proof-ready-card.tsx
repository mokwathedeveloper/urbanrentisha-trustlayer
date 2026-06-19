import { CircuitBoard, Hash, ShieldCheck } from "lucide-react";
import type { ProofVerificationRequest } from "@/lib/proof-verification-data";
import { Badge } from "@/components/ui/badge";

type ProofReadyCardProps = {
  request: ProofVerificationRequest;
};

export function ProofReadyCard({ request }: ProofReadyCardProps) {
  return (
    <section className="overflow-hidden rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Generated proof ready
          </Badge>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-white">
            Proof is ready for Soroban verification.
          </h2>

          <p className="mt-3 max-w-[680px] text-sm leading-6 text-ur-success/78">
            The generated payment proof can now be submitted to the verifier contract to confirm access eligibility for this viewing request.
          </p>
        </div>

        <div className="min-w-[260px] rounded-ur-lg border border-ur-success/20 bg-black/18 p-5 text-right">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/64">
            Verification target
          </p>
          <p className="mt-2 font-mono text-lg font-black text-white">
            {request.contractId}
          </p>
          <p className="mt-2 text-sm text-ur-success/76">{request.network}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Info icon={<Hash className="h-5 w-5" />} label="Proof hash" value={`${request.proofHash.slice(0, 14)}...${request.proofHash.slice(-8)}`} mono />
        <Info icon={<CircuitBoard className="h-5 w-5" />} label="Verifier" value={request.verifierName} mono />
        <Info icon={<ShieldCheck className="h-5 w-5" />} label="Function" value={request.contractFunction} mono />
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
      <p className={mono ? "mt-1 truncate font-mono text-sm font-bold text-white" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
