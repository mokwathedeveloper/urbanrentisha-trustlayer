import { BadgeCheck, Phone, Star, Timer, UserRound, WalletCards } from "lucide-react";
import type { PropertyDetail } from "@/lib/property-detail-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type AgentProfileCardProps = { agent: PropertyDetail["agent"] };

export function AgentProfileCard({ agent }: AgentProfileCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start gap-4"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-ur-lg border border-ur-primary/25 bg-ur-primary/10 text-ur-primary"><UserRound className="h-7 w-7" /></div><div className="min-w-0"><div className="mb-2 flex flex-wrap items-center gap-2"><h2 className="text-lg font-black text-white">{agent.name}</h2>{agent.verified ? <Badge variant="success"><BadgeCheck className="h-3.5 w-3.5" />Verified</Badge> : null}</div><p className="text-sm font-semibold text-white/62">{agent.role}</p><p className="mt-1 text-xs text-white/42">{agent.company}</p></div></div>
      <div className="mt-5 grid grid-cols-2 gap-3"><AgentMetric icon={<Star className="h-4 w-4" />} label="Rating" value={agent.rating.toString()} /><AgentMetric icon={<Timer className="h-4 w-4" />} label="Response" value="18 min" /><AgentMetric icon={<Phone className="h-4 w-4" />} label="Phone" value={agent.phoneMasked} /><AgentMetric icon={<WalletCards className="h-4 w-4" />} label="Wallet" value={agent.walletShort} mono /></div>
      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/16 p-4"><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">Agent note</p><p className="mt-2 text-sm leading-6 text-white/58">Contact details are protected until the viewing access flow is completed.</p></div>
      <Button variant="outline" className="mt-5 w-full">View agent profile</Button>
    </section>
  );
}

function AgentMetric({ icon, label, value, mono }: { icon: React.ReactNode; label: string; value: string; mono?: boolean }) {
  return <div className="rounded-ur-sm border border-white/10 bg-black/16 p-3"><div className="mb-2 text-ur-primary">{icon}</div><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">{label}</p><p className={mono ? "mt-1 font-mono text-xs font-bold text-ur-mint" : "mt-1 text-sm font-black text-white"}>{value}</p></div>;
}
