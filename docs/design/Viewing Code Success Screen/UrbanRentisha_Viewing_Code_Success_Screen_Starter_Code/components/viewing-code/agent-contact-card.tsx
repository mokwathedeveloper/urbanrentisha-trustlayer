import { BadgeCheck, MessageCircle, Phone, UserRound } from "lucide-react";
import type { ViewingCodeRecord } from "@/lib/viewing-code-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type AgentContactCardProps = {
  record: ViewingCodeRecord;
};

export function AgentContactCard({ record }: AgentContactCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Verified agent
          </p>
          <h2 className="mt-2 text-lg font-black text-white">{record.agentName}</h2>
          <p className="mt-1 text-sm text-white/52">{record.agentCompany}</p>
        </div>

        <Badge variant="success">
          <BadgeCheck className="h-3.5 w-3.5" />
          Verified
        </Badge>
      </div>

      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <div className="flex gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
            <UserRound className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-black text-white">Contact for arrival</p>
            <p className="mt-1 font-mono text-sm text-ur-mint">{record.agentPhone}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <Button className="w-full">
          <Phone className="h-4 w-4" />
          Call agent
        </Button>
        <Button variant="outline" className="w-full">
          <MessageCircle className="h-4 w-4" />
          Message agent
        </Button>
      </div>
    </section>
  );
}
