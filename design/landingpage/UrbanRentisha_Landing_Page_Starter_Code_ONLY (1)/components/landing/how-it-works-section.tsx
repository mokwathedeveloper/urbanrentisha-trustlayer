import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { howItWorks } from "@/lib/landing-data";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="ur-section bg-white">
      <div className="ur-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="How it works"
          title="Judges should understand the full demo in under three minutes."
          description="This section mirrors the live demo flow. It keeps the product story practical, visible, and easy to explain."
        />

        <div className="ur-card overflow-hidden">
          {howItWorks.map((item, index) => (
            <div
              key={item}
              className="flex gap-4 border-b border-ur-border p-5 last:border-b-0"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ur-success-bg text-sm font-bold text-ur-primary">
                {index + 1}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-ur-success" />
                  <p className="font-semibold text-ur-navy">{item}</p>
                </div>
                <p className="mt-1 text-sm text-ur-text-secondary">
                  Status remains visible in the tenant dashboard and admin audit log.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
