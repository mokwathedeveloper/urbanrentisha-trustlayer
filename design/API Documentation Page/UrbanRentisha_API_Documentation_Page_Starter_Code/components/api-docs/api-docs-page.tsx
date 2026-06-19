import { BadgeCheck, Code2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ApiDocsSidebar } from "@/components/api-docs/api-docs-sidebar";
import { ApiDocsTopbar } from "@/components/api-docs/api-docs-topbar";
import { ApiHero } from "@/components/api-docs/api-hero";
import { ApiStatsGrid } from "@/components/api-docs/api-stats-grid";
import { AuthPanel } from "@/components/api-docs/auth-panel";
import { EndpointCatalog } from "@/components/api-docs/endpoint-catalog";
import { CodeExamplePanel } from "@/components/api-docs/code-example-panel";
import { IntegrationFlowPanel } from "@/components/api-docs/integration-flow-panel";
import { WebhooksPanel } from "@/components/api-docs/webhooks-panel";
import { SdkCardsPanel } from "@/components/api-docs/sdk-cards-panel";
import { SecurityRulesPanel } from "@/components/api-docs/security-rules-panel";
import { ApiPlaygroundPanel } from "@/components/api-docs/api-playground-panel";

export function ApiDocsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 api-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-cyan/10 blur-[130px]" />
      <div className="relative z-10 flex min-h-screen">
        <ApiDocsSidebar />
        <div className="min-w-0 flex-1">
          <ApiDocsTopbar />
          <section className="px-5 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-6" id="overview">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="success"><BadgeCheck className="h-3.5 w-3.5" /> API documentation</Badge>
                  <Badge variant="outline"><ShieldCheck className="h-3.5 w-3.5" /> Secure rental-platform integration</Badge>
                  <Badge variant="outline"><Code2 className="h-3.5 w-3.5" /> REST + Webhooks</Badge>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">API documentation page</p>
                <h1 className="mt-3 max-w-[1040px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">External rental platforms can plug into verified viewing.</h1>
                <p className="mt-4 max-w-[940px] text-base leading-7 text-white/66">Use UrbanRentisha TrustLayer APIs to create listing records, viewing requests, Stellar payment intents, private proof workflows, viewing-code unlocks, suspicious listing reports, and webhook updates.</p>
              </div>
              <ApiHero />
              <ApiStatsGrid />
              <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
                <section className="space-y-6">
                  <AuthPanel />
                  <EndpointCatalog />
                  <WebhooksPanel />
                  <SdkCardsPanel />
                </section>
                <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
                  <CodeExamplePanel />
                  <IntegrationFlowPanel />
                  <ApiPlaygroundPanel />
                  <SecurityRulesPanel />
                </aside>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
