import type { PropertyDetail } from "@/lib/property-detail-data";

type VerificationPanelProps = { property: PropertyDetail };

export function VerificationPanel({ property }: VerificationPanelProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Verification status</p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">Why this listing is trusted</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">{property.verificationChecks.map((check) => { const Icon = check.icon; return <article key={check.label} className="rounded-ur-lg border border-white/10 bg-black/18 p-5"><div className="flex gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary"><Icon className="h-5 w-5" /></div><div><h3 className="font-black text-white">{check.label}</h3><p className="mt-2 text-sm leading-6 text-white/58">{check.description}</p></div></div></article>; })}</div>
    </section>
  );
}
