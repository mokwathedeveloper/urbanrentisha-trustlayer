import { LandingNavbar } from "@/components/landing/landing-navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { TrustFlowSection } from "@/components/landing/trust-flow-section";
import { AudienceSection } from "@/components/landing/audience-section";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ur-page text-ur-text">
      <LandingNavbar />
      <HeroSection />
      <ProblemSection />
      <TrustFlowSection />
      <AudienceSection />
      <LandingFooter />
    </main>
  );
}
