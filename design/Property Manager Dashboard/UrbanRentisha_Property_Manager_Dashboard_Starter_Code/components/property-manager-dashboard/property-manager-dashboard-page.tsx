import { BadgeCheck, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ManagerSidebar } from "@/components/property-manager-dashboard/manager-sidebar";
import { ManagerTopbar } from "@/components/property-manager-dashboard/manager-topbar";
import { ManagerStatsGrid } from "@/components/property-manager-dashboard/manager-stats-grid";
import { ManagerOverviewHero } from "@/components/property-manager-dashboard/manager-overview-hero";
import { ListingsOverviewCard } from "@/components/property-manager-dashboard/listings-overview-card";
import { ViewingRequestsPanel } from "@/components/property-manager-dashboard/viewing-requests-panel";
import { VerifiedTenantsPanel } from "@/components/property-manager-dashboard/verified-tenants-panel";
import { PaymentHoldStatusPanel } from "@/components/property-manager-dashboard/payment-hold-status-panel";
import { ViewingCodesPanel } from "@/components/property-manager-dashboard/viewing-codes-panel";
import { ReportsCenterPanel } from "@/components/property-manager-dashboard/reports-center-panel";
import { TrustScorePanel } from "@/components/property-manager-dashboard/trust-score-panel";
import { QuickActionsPanel } from "@/components/property-manager-dashboard/quick-actions-panel";
import { ManagerActivityFeed } from "@/components/property-manager-dashboard/manager-activity-feed";
import { ManagerFlowTimelineCard } from "@/components/property-manager-dashboard/manager-flow-timeline-card";
import { ManagerSafetyRulesCard } from "@/components/property-manager-dashboard/manager-safety-rules-card";
import { AuditReferencesCard } from "@/components/property-manager-dashboard/audit-references-card";

export function PropertyManagerDashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 manager-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10 flex min-h-screen">
        <ManagerSidebar />

        <div className="min-w-0 flex-1">
          <ManagerTopbar />

          <section className="px-5 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="success">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified manager
                  </Badge>
                  <Badge variant="outline">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Trust operations center
                  </Badge>
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
                  Property manager dashboard
                </p>
                <h1 className="mt-3 max-w-[980px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
                  Manage listings, requests, holds, codes, and trust.
                </h1>
                <p className="mt-4 max-w-[900px] text-base leading-7 text-white/66">
                  Monitor manager listings, proof-backed viewing requests, verified tenants, escrow/payment-hold statuses, safety reports, viewing codes, and trust score from one control center.
                </p>
              </div>

              <ManagerOverviewHero />
              <ManagerStatsGrid />

              <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_400px]">
                <section className="space-y-6">
                  <ListingsOverviewCard />
                  <ViewingRequestsPanel />

                  <div className="grid gap-6 lg:grid-cols-2">
                    <VerifiedTenantsPanel />
                    <PaymentHoldStatusPanel />
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <ViewingCodesPanel />
                    <ReportsCenterPanel />
                  </div>
                </section>

                <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
                  <TrustScorePanel />
                  <QuickActionsPanel />
                  <ManagerActivityFeed />
                  <ManagerFlowTimelineCard />
                  <ManagerSafetyRulesCard />
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
