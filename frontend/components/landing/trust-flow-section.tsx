import { ArrowRight } from "lucide-react";
import { trustFlowSteps } from "@/lib/landing-data";

export function TrustFlowSection() {
  return (
    <section id="trust-flow" className="ur-section bg-ur-surface">
      <div className="ur-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black tracking-[-0.03em] text-ur-navy sm:text-4xl">
            Our ZK + Stellar Trust Flow
          </h2>
          <p className="mt-3 text-base text-ur-text-secondary">
            Private by design. Transparent by verification.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustFlowSteps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              {index < trustFlowSteps.length - 1 ? (
                <ArrowRight className="absolute -right-4 top-6 hidden h-5 w-5 text-ur-border-strong lg:block" />
              ) : null}
              <div className="grid h-12 w-12 place-items-center rounded-full border border-ur-primary/30 bg-ur-success-bg text-ur-primary">
                <span className="text-sm font-black">{index + 1}</span>
              </div>
              <step.icon className="mt-3 h-5 w-5 text-ur-primary" />
              <h3 className="mt-3 font-bold text-ur-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ur-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
