import { BadgeCheck, Database, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AuditSidebar } from "@/components/audit-log/audit-sidebar";
import { AuditTopbar } from "@/components/audit-log/audit-topbar";
import { AuditHero } from "@/components/audit-log/audit-hero";
import { AuditStatsGrid } from "@/components/audit-log/audit-stats-grid";
import { AuditFilterBar } from "@/components/audit-log/audit-filter-bar";
import { AuditTimeline } from "@/components/audit-log/audit-timeline";
import { AuditEventTable } from "@/components/audit-log/audit-event-table";
import { AuditDetailsPanel } from "@/components/audit-log/audit-details-panel";
import { TrustActivityPanel } from "@/components/audit-log/trust-activity-panel";
import { AuditExportPanel } from "@/components/audit-log/audit-export-panel";
import { IntegrityStatusCard } from "@/components/audit-log/integrity-status-card";

export function AuditLogPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 audit-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-cyan/10 blur-[130px]" />

      <div className="relative z-10 flex min-h-screen">
        <AuditSidebar />

        <div className="min-w-0 flex-1">
          <AuditTopbar />

          <section className="px-5 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="success">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Audit trail active
                  </Badge>
                  <Badge variant="outline">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Trust activity monitor
                  </Badge>
                  <Badge variant="outline">
                    <Database className="h-3.5 w-3.5" />
                    Export ready
                  </Badge>
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
                  Audit log screen
                </p>
                <h1 className="mt-3 max-w-[980px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
                  Important system events and trust activity.
                </h1>
                <p className="mt-4 max-w-[900px] text-base leading-7 text-white/66">
                  Review proof verification, payment, report, access, listing, agent, and system events with searchable audit references.
                </p>
              </div>

              <AuditHero />
              <AuditStatsGrid />
              <AuditFilterBar />

              <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_410px]">
                <section className="space-y-6">
                  <AuditTimeline />
                  <AuditEventTable />
                </section>

                <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
                  <AuditDetailsPanel />
                  <TrustActivityPanel />
                  <AuditExportPanel />
                  <IntegrityStatusCard />
                </aside>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
