import Link from "next/link";
import { ArrowLeft, BadgeCheck, ShieldCheck } from "lucide-react";
import { agentProfile } from "@/lib/agent-profile-data";
import { AgentProfileHeader } from "@/components/agent-profile/agent-profile-header";
import { AgentHeroCard } from "@/components/agent-profile/agent-hero-card";
import { AgentStatsGrid } from "@/components/agent-profile/agent-stats-grid";
import { TrustScoreCard } from "@/components/agent-profile/trust-score-card";
import { VerificationStatusCard } from "@/components/agent-profile/verification-status-card";
import { ListedPropertiesCard } from "@/components/agent-profile/listed-properties-card";
import { VerifiedViewingRequestsCard } from "@/components/agent-profile/verified-viewing-requests-card";
import { VerificationDocumentsCard } from "@/components/agent-profile/verification-documents-card";
import { TrustTimelineCard } from "@/components/agent-profile/trust-timeline-card";
import { ReportSummaryCard } from "@/components/agent-profile/report-summary-card";
import { AgentContactActionsCard } from "@/components/agent-profile/agent-contact-actions-card";
import { ProfileReferencesCard } from "@/components/agent-profile/profile-references-card";
import { SafetyNotesCard } from "@/components/agent-profile/safety-notes-card";
import { Badge } from "@/components/ui/badge";

type AgentVerificationProfilePageProps = {
  agentId: string;
};

export function AgentVerificationProfilePage({
  agentId
}: AgentVerificationProfilePageProps) {
  const profile = { ...agentProfile, agentId };

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 agent-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <AgentProfileHeader />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href="/agents"
              className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to agents
            </Link>

            <div className="flex flex-wrap gap-2">
              <Badge variant="success">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified agent
              </Badge>
              <Badge variant="outline">
                <ShieldCheck className="h-3.5 w-3.5" />
                Trust profile
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Agent verification profile
            </p>
            <h1 className="mt-3 max-w-[920px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
              Verify the agent before viewing.
            </h1>
            <p className="mt-4 max-w-[820px] text-base leading-7 text-white/66">
              Review agent verification status, trust score, report history, listed properties, and proof-backed viewing activity before engaging.
            </p>
          </div>

          <AgentHeroCard profile={profile} />
          <AgentStatsGrid />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-6">
              <div className="grid gap-6 xl:grid-cols-2">
                <TrustScoreCard profile={profile} />
                <VerificationStatusCard profile={profile} />
              </div>
              <ListedPropertiesCard />
              <VerifiedViewingRequestsCard />
              <VerificationDocumentsCard />
              <TrustTimelineCard />
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <ReportSummaryCard profile={profile} />
              <AgentContactActionsCard profile={profile} />
              <ProfileReferencesCard />
              <SafetyNotesCard />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
