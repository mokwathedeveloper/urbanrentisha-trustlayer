import { BadgeCheck, ShieldCheck } from "lucide-react";
import type { AgentProfile } from "@/lib/agent-profile-data";
import { Badge } from "@/components/ui/badge";

type VerificationStatusCardProps = {
  profile: AgentProfile;
};

export function VerificationStatusCard({ profile }: VerificationStatusCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Verification status
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Agent identity verified
          </h2>
        </div>

        <Badge variant="success">
          <BadgeCheck className="h-3.5 w-3.5" />
          {profile.verificationStatus}
        </Badge>
      </div>

      <div className="mt-6 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-5">
        <ShieldCheck className="mb-4 h-8 w-8 text-ur-primary" />
        <p className="font-black text-white">Verification is active</p>
        <p className="mt-2 text-sm leading-6 text-white/58">
          Identity, license reference, wallet linkage, and listing activity are attached to this trust profile.
        </p>
      </div>

      <div className="mt-4 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
          License reference
        </p>
        <p className="mt-2 font-mono text-sm font-bold text-ur-mint">
          {profile.licenseReference}
        </p>
      </div>
    </section>
  );
}
