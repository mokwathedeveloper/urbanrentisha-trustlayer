import { Star, TrendingUp } from "lucide-react";
import type { AgentProfile } from "@/lib/agent-profile-data";

type TrustScoreCardProps = {
  profile: AgentProfile;
};

export function TrustScoreCard({ profile }: TrustScoreCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Trust score
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            {profile.trustScore}% verified trust
          </h2>
        </div>
        <Star className="h-7 w-7 text-ur-success" />
      </div>

      <div className="mt-6">
        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-ur-primary"
            style={{ width: `${profile.trustScore}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs font-bold">
          <span className="text-white/40">Review needed</span>
          <span className="text-ur-mint">Strong</span>
        </div>
      </div>

      <div className="mt-6 rounded-ur-lg border border-ur-success/20 bg-ur-success-bg p-4">
        <div className="flex gap-3">
          <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-ur-success" />
          <p className="text-sm leading-6 text-ur-success/78">
            Trust score is based on verification checks, report history, listing quality, and verified viewing activity.
          </p>
        </div>
      </div>
    </section>
  );
}
