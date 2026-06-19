import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/lib/landing-data";

export function FaqSection() {
  return (
    <section id="faq" className="ur-section bg-ur-page">
      <div className="ur-container">
        <SectionHeading
          eyebrow="FAQ"
          title="Simple answers for tenants, builders, and judges."
          align="center"
        />

        <div className="mx-auto mt-10 grid max-w-4xl gap-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-ur-lg border border-ur-border bg-white p-5"
            >
              <summary className="cursor-pointer list-none font-bold text-ur-navy">
                <span>{faq.question}</span>
                <span className="float-right text-ur-primary group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-ur-text-secondary">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
