import { BadgeCheck, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AdminSidebar } from "@/components/admin-dashboard/admin-sidebar";
import { AdminTopbar } from "@/components/admin-dashboard/admin-topbar";
import { AdminOverviewHero } from "@/components/admin-dashboard/admin-overview-hero";
import { AdminStatsGrid } from "@/components/admin-dashboard/admin-stats-grid";
import { ApprovalsQueuePanel } from "@/components/admin-dashboard/approvals-queue-panel";
import { ReportsCenterPanel } from "@/components/admin-dashboard/reports-center-panel";
import { AgentsPanel } from "@/components/admin-dashboard/agents-panel";
import { ProofVerificationActivityPanel } from "@/components/admin-dashboard/proof-verification-activity-panel";
import { SuspiciousActivityPanel } from "@/components/admin-dashboard/suspicious-activity-panel";
import { AuditLogsPanel } from "@/components/admin-dashboard/audit-logs-panel";
import { AnalyticsPanel } from "@/components/admin-dashboard/analytics-panel";
import { QuickActionsPanel } from "@/components/admin-dashboard/quick-actions-panel";
import { AdminFlowTimelineCard } from "@/components/admin-dashboard/admin-flow-timeline-card";
import { AdminSafetyRulesCard } from "@/components/admin-dashboard/admin-safety-rules-card";
import { AuditReferencesCard } from "@/components/admin-dashboard/audit-references-card";

export function AdminDashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 admin-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-error/10 blur-[130px]" />

      <div className="relative z-10 flex min-h-screen">
        <AdminSidebar />

        <div className="min-w-0 flex-1">
          <AdminTopbar />

          <section className="px-5 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="success">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Admin access
                  </Badge>
                  <Badge variant="outline">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Platform trust operations
                  </Badge>
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
                  Admin dashboard
                </p>
                <h1 className="mt-3 max-w-[1040px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
                  Monitor approvals, reports, proofs, risks, and audits.
                </h1>
                <p className="mt-4 max-w-[930px] text-base leading-7 text-white/66">
                  Oversee platform-wide approvals, report triage, agent trust, proof verification activity, suspicious activity, audit logs, and analytics from one command center.
                </p>
              </div>

              <AdminOverviewHero />
              <AdminStatsGrid />

              <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_400px]">
                <section className="space-y-6">
                  <ApprovalsQueuePanel />

                  <div className="grid gap-6 lg:grid-cols-2">
                    <ReportsCenterPanel />
                    <AgentsPanel />
                  </div>

                  <ProofVerificationActivityPanel />
                  <SuspiciousActivityPanel />
                  <AuditLogsPanel />
                </section>

                <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
                  <AnalyticsPanel />
                  <QuickActionsPanel />
                  <AdminFlowTimelineCard />
                  <AdminSafetyRulesCard />
                  <AuditReferencesCard />
                </aside>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
