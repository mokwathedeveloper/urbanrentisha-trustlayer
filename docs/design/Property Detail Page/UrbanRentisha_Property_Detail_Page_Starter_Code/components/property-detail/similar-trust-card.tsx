import { CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";

export function SimilarTrustCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Tenant protection</p>
      <h2 className="mt-2 text-lg font-black tracking-[-0.03em] text-white">Safe viewing rule</h2>
      <div className="mt-5 space-y-3"><TrustRow icon={<ShieldCheck className="h-4 w-4" />} title="Verified listing" description="Property checks are visible before payment." /><TrustRow icon={<LockKeyhole className="h-4 w-4" />} title="Access locked" description="Private details remain hidden until proof succeeds." /><TrustRow icon={<CheckCircle2 className="h-4 w-4" />} title="Audit ready" description="Request and verification events are tracked." /></div>
    </section>
  );
}

function TrustRow({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return <div className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">{icon}</div><div><p className="text-sm font-black text-white">{title}</p><p className="mt-1 text-xs leading-5 text-white/52">{description}</p></div></div>;
}
