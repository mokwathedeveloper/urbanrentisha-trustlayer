import { AlertTriangle, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AuthPanel() {
  return (
    <section id="authentication" className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Authentication</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">Secure server-side integration</h2>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-white/56">External platforms authenticate with a server-side API key, exchange it for a short-lived JWT, and verify signed webhooks.</p>
        </div>
        <Badge variant="success"><ShieldCheck className="h-3.5 w-3.5" /> API key required</Badge>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <AuthCard icon={<KeyRound className="h-5 w-5" />} title="API Key" text="Used only on the partner backend. Never expose it in browser JavaScript." value="ur_live_xxxxxxxxx" />
        <AuthCard icon={<LockKeyhole className="h-5 w-5" />} title="JWT" text="Short-lived bearer token used to call listing, payment, proof, and viewing-code APIs." value="Authorization: Bearer <token>" />
        <AuthCard icon={<AlertTriangle className="h-5 w-5" />} title="Webhook Secret" text="Used to verify webhook signatures before trusting external event updates." value="x-ur-signature" />
      </div>
      <div className="mt-5 rounded-ur-lg border border-ur-warning/25 bg-ur-warning-bg p-4">
        <p className="text-sm font-black text-white">Security warning</p>
        <p className="mt-2 text-sm leading-6 text-ur-warning/76">Live API keys, webhook secrets, and platform tokens must stay on the backend only.</p>
      </div>
    </section>
  );
}

function AuthCard({ icon, title, text, value }: { icon: React.ReactNode; title: string; text: string; value: string }) {
  return (
    <article className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <div className="grid h-10 w-10 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">{icon}</div>
      <h3 className="mt-4 text-lg font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/56">{text}</p>
      <p className="mt-4 truncate rounded-ur-sm border border-white/10 bg-black/24 px-3 py-2 font-mono text-xs font-bold text-ur-mint">{value}</p>
    </article>
  );
}
