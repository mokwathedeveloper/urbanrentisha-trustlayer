"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Flag, ShieldAlert, ShieldCheck } from "lucide-react";
import {
  reportTarget,
  reportReasons,
  sampleReportReference,
  type ReportSeverity,
  type ReportType,
  type ReporterMode
} from "@/lib/report-data";
import { ReportHeader } from "@/components/fake-listing-report/report-header";
import { SafetyWarningBanner } from "@/components/fake-listing-report/safety-warning-banner";
import { ReportTypeSelector } from "@/components/fake-listing-report/report-type-selector";
import { ReportReasonGrid } from "@/components/fake-listing-report/report-reason-grid";
import { ReportDetailsFormCard } from "@/components/fake-listing-report/report-details-form-card";
import { EvidenceUploadCard } from "@/components/fake-listing-report/evidence-upload-card";
import { ReporterPrivacyCard } from "@/components/fake-listing-report/reporter-privacy-card";
import { SubmissionSuccessCard } from "@/components/fake-listing-report/submission-success-card";
import { PropertyUnderReviewCard } from "@/components/fake-listing-report/property-under-review-card";
import { AgentSafetyCard } from "@/components/fake-listing-report/agent-safety-card";
import { ReportSummaryCard } from "@/components/fake-listing-report/report-summary-card";
import { ReviewProcessCard } from "@/components/fake-listing-report/review-process-card";
import { SafetyGuidelinesCard } from "@/components/fake-listing-report/safety-guidelines-card";
import { ReportQualityTipsCard } from "@/components/fake-listing-report/report-quality-tips-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type FakeListingReportPageProps = {
  listingId: string;
};

export function FakeListingReportPage({ listingId }: FakeListingReportPageProps) {
  const [reportType, setReportType] = useState<ReportType>("listing");
  const [selectedReasons, setSelectedReasons] = useState<string[]>([
    "agent-pressure"
  ]);
  const [severity, setSeverity] = useState<ReportSeverity>("medium");
  const [reporterMode, setReporterMode] = useState<ReporterMode>("private");
  const [description, setDescription] = useState(
    "The agent asked me to send an extra fee outside UrbanRentisha before confirming the viewing."
  );
  const [contactBack, setContactBack] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const target = { ...reportTarget, listingId };

  const selectedReasonTitles = useMemo(() => {
    return reportReasons
      .filter((reason) => selectedReasons.includes(reason.id))
      .map((reason) => reason.title);
  }, [selectedReasons]);

  function toggleReason(reasonId: string) {
    setSelectedReasons((current) =>
      current.includes(reasonId)
        ? current.filter((id) => id !== reasonId)
        : [...current, reasonId]
    );
  }

  function submitReport() {
    setSubmitted(true);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 report-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-error/8 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-primary/10 blur-[130px]" />

      <div className="relative z-10">
        <ReportHeader />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href={`/properties/${target.listingId}`}
              className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to property detail
            </Link>

            <div className="flex flex-wrap gap-2">
              <Badge variant="danger">
                <ShieldAlert className="h-3.5 w-3.5" />
                Safety report
              </Badge>
              <Badge variant="outline">
                <ShieldCheck className="h-3.5 w-3.5" />
                Tenant protected
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Fake listing report
            </p>
            <h1 className="mt-3 max-w-[920px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
              Report a suspicious listing or agent.
            </h1>
            <p className="mt-4 max-w-[820px] text-base leading-7 text-white/66">
              Help protect tenants by reporting fake listings, unsafe viewing requests, agent identity issues, or off-platform payment pressure.
            </p>
          </div>

          <SafetyWarningBanner />

          {submitted ? (
            <SubmissionSuccessCard
              reportReference={sampleReportReference}
              target={target}
            />
          ) : null}

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-6">
              <ReportTypeSelector value={reportType} onChange={setReportType} />
              <ReportReasonGrid
                selectedReasons={selectedReasons}
                onToggle={toggleReason}
              />
              <ReportDetailsFormCard
                severity={severity}
                description={description}
                contactBack={contactBack}
                onSeverityChange={setSeverity}
                onDescriptionChange={setDescription}
                onContactBackChange={setContactBack}
              />
              <EvidenceUploadCard />
              <ReporterPrivacyCard
                value={reporterMode}
                onChange={setReporterMode}
              />

              <div className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={submitReport}
                    disabled={selectedReasons.length === 0 || description.trim().length < 10}
                  >
                    <Flag className="h-4 w-4" />
                    Submit safety report
                  </Button>

                  <Link href={`/properties/${target.listingId}`} className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>

                <p className="mt-3 text-xs leading-5 text-white/42">
                  Reports are reviewed by the UrbanRentisha safety team. Submission does not automatically prove fraud; it starts a safety review.
                </p>
              </div>
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <PropertyUnderReviewCard target={target} />
              <AgentSafetyCard target={target} />
              <ReportSummaryCard
                reportType={reportType}
                severity={severity}
                reporterMode={reporterMode}
                selectedReasonTitles={selectedReasonTitles}
                description={description}
              />
              <ReviewProcessCard />
              <SafetyGuidelinesCard />
              <ReportQualityTipsCard />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
