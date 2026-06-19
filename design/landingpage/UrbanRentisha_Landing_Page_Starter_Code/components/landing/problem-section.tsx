import { SectionHeading } from "@/components/ui/section-heading";
import { problems } from "@/lib/landing-data";

export function ProblemSection() {
  return (
    <section id="problem" className="ur-section bg-ur-page">
      <div className="ur-container">
        <SectionHeading
          eyebrow="The rental trust problem"
          title="Tenants need protection before paying for access."
          description="Viewing fees are often confirmed through screenshots, calls, or informal receipts. UrbanRentisha replaces that fragile trust path with verified listings, payment proof, and an auditable access flow."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {problems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="ur-card p-6 transition-colors hover:bg-ur-card-soft">
                <div className="grid h-12 w-12 place-items-center rounded-ur bg-ur-warning-bg text-ur-warning">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.02em] text-ur-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ur-text-secondary">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
