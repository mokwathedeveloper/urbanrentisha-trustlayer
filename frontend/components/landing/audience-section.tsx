import { audiences } from "@/lib/landing-data";
import { Icon } from "@/components/ui/icon";

export function AudienceSection() {
  return (
    <section id="audience" className="ur-section bg-ur-page">
      <div className="ur-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black tracking-[-0.03em] text-ur-navy sm:text-4xl">
            Built for Everyone in the Rental Journey
          </h2>
          <p className="mt-3 text-base text-ur-text-secondary">
            Tenants, Property Agents, and Owners — connected by trust.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {audiences.map((audience) => (
            <div key={audience.title} className="ur-card p-6">
              <h3 className="font-bold text-ur-primary">{audience.title}</h3>
              <ul className="mt-4 space-y-3">
                {audience.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-ur-text-secondary">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-ur-primary" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <a
                href="#trust-flow"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ur-mint hover:underline"
              >
                Learn more &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
