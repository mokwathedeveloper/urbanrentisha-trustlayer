"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { LogoMark } from "@/components/onboarding/logo-mark";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { OnboardingHeroCard } from "@/components/onboarding/onboarding-hero-card";
import { VerifiedViewingFlow } from "@/components/onboarding/verified-viewing-flow";
import { PaymentProofExplainer } from "@/components/onboarding/payment-proof-explainer";
import { AccessUnlockRules } from "@/components/onboarding/access-unlock-rules";
import { TenantTrustChecklist } from "@/components/onboarding/tenant-trust-checklist";
import { DemoViewingPreview } from "@/components/onboarding/demo-viewing-preview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { onboardingSteps } from "@/lib/onboarding-data";

export function TenantOnboardingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const completedCount = activeStep + 1;
  const progress = useMemo(
    () => Math.round((completedCount / onboardingSteps.length) * 100),
    [completedCount]
  );

  function handleNext() {
    setActiveStep((current) =>
      current < onboardingSteps.length - 1 ? current + 1 : current
    );
  }

  function handleBack() {
    setActiveStep((current) => (current > 0 ? current - 1 : current));
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 onboarding-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <header className="ur-container flex h-20 items-center justify-between">
          <LogoMark />

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/auth"
              className="rounded-ur-sm px-4 py-2 text-sm font-bold text-white/64 transition-colors hover:bg-white/5 hover:text-white ur-focus"
            >
              Switch account
            </Link>

            <Link
              href="/tenant/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-ur-sm border border-white/14 px-4 text-sm font-bold text-white transition-colors hover:border-ur-primary/60 hover:bg-white/5 ur-focus"
            >
              Skip for now
            </Link>
          </div>
        </header>

        <section className="ur-container pb-12 pt-4">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <section className="lg:sticky lg:top-8 lg:self-start">
              <Badge variant="success">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Tenant onboarding
              </Badge>

              <h1 className="mt-6 max-w-[620px] text-[46px] font-black leading-[0.98] tracking-[-0.07em] text-white sm:text-[60px]">
                Learn how verified viewing works before access unlocks.
              </h1>

              <p className="mt-6 max-w-[560px] text-lg leading-8 text-white/66">
                UrbanRentisha keeps viewing access locked until the required
                payment condition is proven. This protects tenants from fake
                listings, fake agents, and unsafe viewing-fee requests.
              </p>

              <div className="mt-8">
                <OnboardingProgress
                  activeStep={activeStep}
                  progress={progress}
                  onStepChange={setActiveStep}
                />
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={activeStep === onboardingSteps.length - 1}
                >
                  Next step
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Previous
                </Button>
              </div>

              <div className="mt-8 rounded-ur-lg border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
                  Progress
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-ur-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-white/58">
                  {completedCount} of {onboardingSteps.length} onboarding points reviewed.
                </p>
              </div>
            </section>

            <section className="space-y-5">
              <OnboardingHeroCard activeStep={activeStep} />
              <VerifiedViewingFlow activeStep={activeStep} onStepChange={setActiveStep} />
              <PaymentProofExplainer />
              <AccessUnlockRules />
              <TenantTrustChecklist />
              <DemoViewingPreview />
            </section>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 sm:flex-row">
            <div>
              <h2 className="text-lg font-black text-white">Ready to view verified listings?</h2>
              <p className="mt-1 text-sm text-white/58">
                Continue to the property list and request access through the verified flow.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/listings"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-ur-sm bg-ur-primary px-5 text-sm font-bold text-white transition-colors hover:bg-ur-primary-hover ur-focus"
              >
                Browse verified properties
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/demo"
                className="inline-flex h-11 items-center justify-center rounded-ur-sm border border-white/14 px-5 text-sm font-bold text-white transition-colors hover:border-ur-primary/60 hover:bg-white/5 ur-focus"
              >
                Try demo request
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
