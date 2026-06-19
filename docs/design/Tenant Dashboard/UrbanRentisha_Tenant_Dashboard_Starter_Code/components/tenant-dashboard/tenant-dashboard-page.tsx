import { BadgeCheck, ShieldCheck } from "lucide-react";
import { DashboardSidebar } from "@/components/tenant-dashboard/dashboard-sidebar";
import { DashboardTopbar } from "@/components/tenant-dashboard/dashboard-topbar";
import { DashboardStatsGrid } from "@/components/tenant-dashboard/dashboard-stats-grid";
import { ActiveRequestOverviewCard } from "@/components/tenant-dashboard/active-request-overview-card";
import { RequestStatusTable } from "@/components/tenant-dashboard/request-status-table";
import { PaymentAndProofPanel } from "@/components/tenant-dashboard/payment-and-proof-panel";
import { ViewingCodePanel } from "@/components/tenant-dashboard/viewing-code-panel";
import { NotificationSummaryPanel } from "@/components/tenant-dashboard/notification-summary-panel";
import { ReportsPanel } from "@/components/tenant-dashboard/reports-panel";
import { ViewingHistoryPanel } from "@/components/tenant-dashboard/viewing-history-panel";
import { QuickActionsPanel } from "@/components/tenant-dashboard/quick-actions-panel";
import { TrustFlowTimelineCard } from "@/components/tenant-dashboard/trust-flow-timeline-card";
import { SafetyRulesCard } from "@/components/tenant-dashboard/safety-rules-card";
import { AuditReferencesCard } from "@/components/tenant-dashboard/audit-references-card";
import { Badge } from "@/components/ui/badge";

export function TenantDashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 dashboard-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10 flex min-h-screen">
        <DashboardSidebar />

        <div className="min-w-0 flex-1">
          <DashboardTopbar />

          <section className="px-5 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="success">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Verified tenant
                    </Badge>
                    <Badge variant="outline">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Payment proof protected
                    </Badge>
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
                    Tenant dashboard
                  </p>
                  <h1 className="mt-3 max-w-[920px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
                    Track every viewing request from payment to access.
                  </h1>
                  <p className="mt-4 max-w-[860px] text-base leading-7 text-white/66">
                    Monitor tenant requests, payment statuses, proof statuses, payment holds, viewing codes, notifications, safety reports, and viewing history from one trust dashboard.
                  </p>
                </div>
              </div>

              <DashboardStatsGrid />

              <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_400px]">
                <section className="space-y-6">
                  <ActiveRequestOverviewCard />
                  <RequestStatusTable />

                  <div className="grid gap-6 lg:grid-cols-2">
                    <PaymentAndProofPanel />
                    <ViewingCodePanel />
                  </div>

                  <ViewingHistoryPanel />
                </section>

                <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
                  <QuickActionsPanel />
                  <NotificationSummaryPanel />
                  <ReportsPanel />
                  <TrustFlowTimelineCard />
                  <SafetyRulesCard />
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
