import type { ProofVerificationRequest } from "@/lib/proof-verification-data";
import { contractFacts } from "@/lib/proof-verification-data";

type ContractReferenceCardProps = {
  request: ProofVerificationRequest;
};

export function ContractReferenceCard({ request }: ContractReferenceCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Contract reference
      </p>

      <h2 className="mt-2 text-lg font-black text-white">{request.verifierName}</h2>
      <p className="mt-1 text-sm text-white/52">{request.network}</p>

      <div className="mt-5 space-y-3">
        {contractFacts.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-bold text-white/70">{item.label}</p>
              </div>
              <p className="max-w-[150px] truncate font-mono text-xs font-bold text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
