import { ArrowRight } from "lucide-react";
import { proofFlow } from "@/lib/property-detail-data";

export function PaymentProofFlow() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Viewing access workflow</p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">From request to access unlock</h2>
      <div className="mt-5 grid gap-3 lg:grid-cols-4">{proofFlow.map((item, index) => { const Icon = item.icon; return <div key={item.title} className="relative"><article className="h-full rounded-ur-lg border border-white/10 bg-black/16 p-5"><div className="mb-4 grid h-12 w-12 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary"><Icon className="h-6 w-6" /></div><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">Step {index + 1}</p><h3 className="mt-1 font-black text-white">{item.title}</h3><p className="mt-2 text-sm leading-6 text-white/58">{item.description}</p></article>{index < proofFlow.length - 1 ? <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-ur-primary lg:block" /> : null}</div>; })}</div>
    </section>
  );
}
