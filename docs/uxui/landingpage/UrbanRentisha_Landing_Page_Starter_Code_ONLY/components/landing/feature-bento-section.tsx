import { SectionHeading } from "@/components/ui/section-heading";
import { bentoFeatures } from "@/lib/landing-data";

export function FeatureBentoSection() {
  return (
    <section id="features" className="ur-section bg-ur-page">
      <div className="ur-container">
        <SectionHeading
          eyebrow="Core platform features"
          title="Built as a trust layer, not another generic rental board."
          description="Each feature supports the central access-control promise: payment proof first, Stellar verification second, viewing access last."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {bentoFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className={`ur-card p-6 transition-colors hover:bg-ur-card-soft ${feature.className}`}
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur bg-ur-success-bg text-ur-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-[-0.02em] text-ur-navy">
                      {feature.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-ur-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
