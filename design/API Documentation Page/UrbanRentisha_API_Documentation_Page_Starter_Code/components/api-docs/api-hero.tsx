import { ArrowRight, Code2, Globe2, ShieldCheck, Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ApiHero() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
        <div>
          <Badge variant="success"><ShieldCheck className="h-3.5 w-3.5" /> Partner integration layer</Badge>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">Build verified viewing into any rental platform.</h2>
          <p className="mt-3 max-w-[760px] text-sm leading-6 text-white/62">External platforms can create viewing requests, collect Stellar testnet payment references, trigger private proof generation, verify proof status, unlock viewing codes, and receive webhooks without becoming a full marketplace.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button>Start integration <ArrowRight className="h-4 w-4" /></Button>
            <Button variant="outline">View OpenAPI</Button>
          </div>
        </div>
        <div className="rounded-ur-lg border border-white/10 bg-black/18 p-5">
          <div className="grid gap-3">
            <TechRow icon={<Globe2 className="h-4 w-4" />} label="Base URL" value="https://api.urbanrentisha.dev" />
            <TechRow icon={<Code2 className="h-4 w-4" />} label="Version" value="/api/v1/external" />
            <TechRow icon={<Webhook className="h-4 w-4" />} label="Webhook header" value="x-ur-signature" />
            <TechRow icon={<ShieldCheck className="h-4 w-4" />} label="Auth" value="API key + JWT" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TechRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/20 p-3">
      <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">{icon}</div><p className="text-sm font-bold text-white/70">{label}</p></div>
      <p className="max-w-[230px] truncate font-mono text-xs font-bold text-ur-mint">{value}</p>
    </div>
  );
}
