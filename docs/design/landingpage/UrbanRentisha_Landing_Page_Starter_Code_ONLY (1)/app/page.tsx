import { LandingNavbar } from "@/components/landing/landing-navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustStrip } from "@/components/landing/trust-strip";
import { ProblemSection } from "@/components/landing/problem-section";
import { SolutionFlowSection } from "@/components/landing/solution-flow-section";
import { FeatureBentoSection } from "@/components/landing/feature-bento-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { DemoPreviewSection } from "@/components/landing/demo-preview-section";
import { ApiIntegrationSection } from "@/components/landing/api-integration-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ur-page text-ur-text-primary">
      <LandingNavbar />
      <HeroSection />
      <TrustStrip />
      <ProblemSection />
      <SolutionFlowSection />
      <FeatureBentoSection />
      <HowItWorksSection />
      <DemoPreviewSection />
      <ApiIntegrationSection />
      <FaqSection />
      <FinalCtaSection />
      <LandingFooter />
    </main>
  );
}
