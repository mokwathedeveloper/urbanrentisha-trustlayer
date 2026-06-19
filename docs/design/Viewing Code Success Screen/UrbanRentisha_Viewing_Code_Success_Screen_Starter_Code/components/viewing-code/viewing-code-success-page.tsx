"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, DoorOpen, ShieldCheck } from "lucide-react";
import { viewingCodeRecord } from "@/lib/viewing-code-data";
import { ViewingCodeHeader } from "@/components/viewing-code/viewing-code-header";
import { UnlockProgress } from "@/components/viewing-code/unlock-progress";
import { ViewingCodeHeroCard } from "@/components/viewing-code/viewing-code-hero-card";
import { AccessDetailsCard } from "@/components/viewing-code/access-details-card";
import { ViewingScheduleCard } from "@/components/viewing-code/viewing-schedule-card";
import { AgentContactCard } from "@/components/viewing-code/agent-contact-card";
import { InstructionsChecklistCard } from "@/components/viewing-code/instructions-checklist-card";
import { SecurityNoticeCard } from "@/components/viewing-code/security-notice-card";
import { VerificationSummaryCard } from "@/components/viewing-code/verification-summary-card";
import { AuditReferencesCard } from "@/components/viewing-code/audit-references-card";
import { TenantNextActionsCard } from "@/components/viewing-code/tenant-next-actions-card";
import { Badge } from "@/components/ui/badge";

type ViewingCodeSuccessPageProps = {
  requestId: string;
};

export function ViewingCodeSuccessPage({ requestId }: ViewingCodeSuccessPageProps) {
  const [visible, setVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const record = { ...viewingCodeRecord, requestId };

  async function copyCode() {
    await navigator.clipboard.writeText(record.viewingCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 code-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <ViewingCodeHeader />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href={`/proof-verification/${record.requestId}`}
              className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to proof verification
            </Link>

            <div className="flex flex-wrap gap-2">
              <Badge variant="success">
                <ShieldCheck className="h-3.5 w-3.5" />
                Proof verified
              </Badge>
              <Badge variant="success">
                <DoorOpen className="h-3.5 w-3.5" />
                Access unlocked
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Viewing code success
            </p>
            <h1 className="mt-3 max-w-[900px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
              Viewing access unlocked successfully.
            </h1>
            <p className="mt-4 max-w-[800px] text-base leading-7 text-white/66">
              Your private payment proof has been verified. Use this viewing code only for the selected property, verified agent, and scheduled viewing window.
            </p>
          </div>

          <UnlockProgress />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-6">
              <ViewingCodeHeroCard
                record={record}
                visible={visible}
                copied={copied}
                onToggleVisible={() => setVisible((current) => !current)}
                onCopy={copyCode}
              />
              <AccessDetailsCard record={record} />
              <ViewingScheduleCard record={record} />
              <InstructionsChecklistCard />
              <SecurityNoticeCard />
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <AgentContactCard record={record} />
              <VerificationSummaryCard record={record} />
              <AuditReferencesCard />
              <TenantNextActionsCard record={record} />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
