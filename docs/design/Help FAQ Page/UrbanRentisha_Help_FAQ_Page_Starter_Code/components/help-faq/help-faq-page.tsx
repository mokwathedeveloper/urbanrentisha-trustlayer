import { BadgeCheck, HelpCircle, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HelpSidebar } from "@/components/help-faq/help-sidebar";
import { HelpTopbar } from "@/components/help-faq/help-topbar";
import { HelpHero } from "@/components/help-faq/help-hero";
import { HelpStatsGrid } from "@/components/help-faq/help-stats-grid";
import { HelpTopicGrid } from "@/components/help-faq/help-topic-grid";
import { ExplainerSection } from "@/components/help-faq/explainer-section";
import { PaymentHoldGuide } from "@/components/help-faq/payment-hold-guide";
import { ViewingCodesReportsSection } from "@/components/help-faq/viewing-codes-reports-section";
import { SafetyRulesPanel } from "@/components/help-faq/safety-rules-panel";
import { KnownLimitationsPanel } from "@/components/help-faq/known-limitations-panel";
import { FaqAccordionSection } from "@/components/help-faq/faq-accordion-section";
import { SupportPanel } from "@/components/help-faq/support-panel";

export function HelpFaqPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 help-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-cyan/10 blur-[130px]" />

      <div className="relative z-10 flex min-h-screen">
        <HelpSidebar />

        <div className="min-w-0 flex-1">
          <HelpTopbar />

          <section className="px-5 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-6" id="overview">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="success">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Help center
                  </Badge>
                  <Badge variant="outline">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Safety-first rental access
                  </Badge>
                  <Badge variant="outline">
                    <HelpCircle className="h-3.5 w-3.5" />
                    FAQ and limitations
                  </Badge>
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
                  Help / FAQ page
                </p>
                <h1 className="mt-3 max-w-[1040px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
                  Understand verified viewing before you unlock access.
                </h1>
                <p className="mt-4 max-w-[940px] text-base leading-7 text-white/66">
                  Learn how Stellar testnet, private payment proof, payment-hold status, viewing codes, reports, safety rules, and MVP limitations work inside UrbanRentisha TrustLayer.
                </p>
              </div>

              <HelpHero />
              <HelpStatsGrid />

              <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_410px]">
                <section className="space-y-6">
                  <HelpTopicGrid />
                  <ExplainerSection />
                  <PaymentHoldGuide />
                  <ViewingCodesReportsSection />
                  <FaqAccordionSection />
                </section>

                <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
                  <SafetyRulesPanel />
                  <KnownLimitationsPanel />
                  <SupportPanel />
                </aside>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
