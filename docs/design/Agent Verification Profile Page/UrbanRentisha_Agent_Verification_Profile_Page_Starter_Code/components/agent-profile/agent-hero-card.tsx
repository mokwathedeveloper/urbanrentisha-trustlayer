import { BadgeCheck, CalendarCheck2, MapPin, UserRound, WalletCards } from "lucide-react";
import type { AgentProfile } from "@/lib/agent-profile-data";
import { trustSignals } from "@/lib/agent-profile-data";
import { Badge } from "@/components/ui/badge";

type AgentHeroCardProps = {
  profile: AgentProfile;
};

export function AgentHeroCard({ profile }: AgentHeroCardProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div className="flex gap-5">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-ur-xl border border-ur-primary/30 bg-ur-primary/12 shadow-green-glow">
            <UserRound className="h-10 w-10 text-ur-primary" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-3xl font-black tracking-[-0.05em] text-white">
                {profile.name}
              </h2>
              <Badge variant="success">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified
              </Badge>
            </div>

            <p className="mt-2 text-lg font-bold text-white/72">{profile.company}</p>
            <p className="mt-2 text-sm text-white/52">{profile.role}</p>

            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/16 px-3 py-1.5 text-sm text-white/62">
                <MapPin className="h-4 w-4 text-ur-primary" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/16 px-3 py-1.5 text-sm text-white/62">
                <CalendarCheck2 className="h-4 w-4 text-ur-primary" />
                Joined {profile.joinedAt}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/16 px-3 py-1.5 font-mono text-sm text-ur-mint">
                <WalletCards className="h-4 w-4 text-ur-primary" />
                {profile.walletAddress}
              </span>
            </div>
          </div>
        </div>

        <div className="min-w-[260px] rounded-ur-lg border border-ur-success/20 bg-ur-success-bg p-5 text-right">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/72">
            Trust score
          </p>
          <p className="mt-2 text-5xl font-black tracking-[-0.07em] text-white">
            {profile.trustScore}%
          </p>
          <p className="mt-2 text-sm text-ur-success/72">Stable verified profile</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {trustSignals.map((signal) => {
          const Icon = signal.icon;
          return (
            <div key={signal.label} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <Icon className="mb-3 h-5 w-5 text-ur-primary" />
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                {signal.label}
              </p>
              <p className="mt-1 text-sm font-black text-white">{signal.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
