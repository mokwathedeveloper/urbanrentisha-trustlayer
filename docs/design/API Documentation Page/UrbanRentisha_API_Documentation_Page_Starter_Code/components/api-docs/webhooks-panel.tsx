import { Webhook } from "lucide-react";
import { webhookEvents, webhookStatusVisuals, codeSamples } from "@/lib/api-docs-data";
import { StatusBadge } from "@/components/api-docs/status-badge";
import { CodeBlockSmall } from "@/components/api-docs/code-block-small";

export function WebhooksPanel() {
  return (
    <section id="webhooks" className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Webhooks</p><h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">Real-time trust updates</h2><p className="mt-2 max-w-[760px] text-sm leading-6 text-white/56">Receive payment, proof, access, and report updates inside your rental platform.</p></div>
        <Webhook className="h-7 w-7 text-ur-primary" />
      </div>
      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {webhookEvents.map((event) => {
          const visual = webhookStatusVisuals[event.status];
          return (
            <article key={event.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-sm font-black text-ur-mint">{event.event}</p><p className="mt-2 text-sm leading-6 text-white/56">{event.description}</p><p className="mt-3 font-mono text-xs font-bold text-white/48">payload: {event.payloadKey}</p></div><StatusBadge label={visual.label} variant={visual.variant} icon={visual.icon} /></div>
            </article>
          );
        })}
      </div>
      <div className="mt-5"><CodeBlockSmall label="Example webhook payload" code={codeSamples.webhookPayload} /></div>
    </section>
  );
}
