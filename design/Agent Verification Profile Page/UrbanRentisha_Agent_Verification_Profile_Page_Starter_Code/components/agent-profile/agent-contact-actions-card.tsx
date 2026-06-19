import type { AgentProfile } from "@/lib/agent-profile-data";
import { contactActions } from "@/lib/agent-profile-data";
import { Button } from "@/components/ui/button";

type AgentContactActionsCardProps = {
  profile: AgentProfile;
};

export function AgentContactActionsCard({ profile }: AgentContactActionsCardProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Contact and actions
      </p>

      <h2 className="mt-2 text-lg font-black text-white">{profile.name}</h2>
      <p className="mt-2 text-sm leading-6 text-white/58">
        Use verified platform channels first when arranging property viewing.
      </p>

      <div className="mt-5 space-y-3">
        {contactActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant={index === 3 ? "danger" : index === 0 ? "primary" : "outline"}
              className="w-full"
            >
              <Icon className="h-4 w-4" />
              {action.label}
            </Button>
          );
        })}
      </div>

      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
          Verified phone
        </p>
        <p className="mt-2 font-mono text-sm font-bold text-ur-mint">{profile.phone}</p>
      </div>
    </section>
  );
}
