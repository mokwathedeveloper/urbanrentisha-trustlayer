"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Flag, Share2 } from "lucide-react";
import { propertyDetail } from "@/lib/property-detail-data";
import { DetailHeader } from "@/components/property-detail/detail-header";
import { PropertyGallery } from "@/components/property-detail/property-gallery";
import { PropertyHeroInfo } from "@/components/property-detail/property-hero-info";
import { PriceViewingCard } from "@/components/property-detail/price-viewing-card";
import { AgentProfileCard } from "@/components/property-detail/agent-profile-card";
import { PropertyFacts } from "@/components/property-detail/property-facts";
import { AmenitiesGrid } from "@/components/property-detail/amenities-grid";
import { VerificationPanel } from "@/components/property-detail/verification-panel";
import { PaymentProofFlow } from "@/components/property-detail/payment-proof-flow";
import { SimilarTrustCard } from "@/components/property-detail/similar-trust-card";
import { ReportListingModal } from "@/components/property-detail/report-listing-modal";
import { Button } from "@/components/ui/button";

type PropertyDetailPageProps = { propertyId: string };

export function PropertyDetailPage({ propertyId }: PropertyDetailPageProps) {
  const [reportOpen, setReportOpen] = useState(false);
  const property = propertyDetail;

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 detail-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />
      <div className="relative z-10">
        <DetailHeader />
        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link href="/listings" className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"><ArrowLeft className="h-4 w-4" />Back to listings</Link>
            <div className="flex gap-3">
              <Button variant="outline" size="sm"><Share2 className="h-4 w-4" />Share</Button>
              <Button variant="danger" size="sm" onClick={() => setReportOpen(true)}><Flag className="h-4 w-4" />Report listing</Button>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <section className="space-y-6">
              <PropertyGallery />
              <PropertyHeroInfo property={property} currentId={propertyId} />
              <PropertyFacts property={property} />
              <AmenitiesGrid property={property} />
              <VerificationPanel property={property} />
              <PaymentProofFlow />
            </section>
            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <PriceViewingCard property={property} />
              <AgentProfileCard agent={property.agent} />
              <SimilarTrustCard />
            </aside>
          </div>
        </section>
      </div>
      <ReportListingModal open={reportOpen} propertyTitle={property.title} onClose={() => setReportOpen(false)} />
    </main>
  );
}
