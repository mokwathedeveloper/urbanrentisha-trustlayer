import { BadgeCheck } from "lucide-react";
import type { ViewingProperty } from "@/lib/request-viewing-data";
import { safetyItems } from "@/lib/request-viewing-data";

type AgentSafetyCardProps = {
  property: ViewingProperty;
};

export function AgentSafetyCard({ property }: AgentSafetyCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Agent and safety
      </p>

      <div className="mt-4 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
            <BadgeCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="font-black text-white">{property.agent.name}</p>
            <p className="mt-1 text-sm text-white/52">{property.agent.company}</p>
            <p className="mt-2 text-xs font-bold text-ur-mint">{property.agent.responseTime}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {safetyItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
