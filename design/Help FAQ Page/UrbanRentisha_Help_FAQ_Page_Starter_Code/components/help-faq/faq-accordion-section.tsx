import { FaqAccordionItem } from "@/components/help-faq/faq-accordion-item";
import { faqItems } from "@/lib/help-faq-data";

export function FaqAccordionSection() {
  return (
    <section id="faq" className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          FAQ
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Frequently asked questions
        </h2>
        <p className="mt-2 max-w-[820px] text-sm leading-6 text-white/56">
          Clear answers about how UrbanRentisha TrustLayer handles proof, payment status, reports, access, and limitations.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {faqItems.map((item) => (
          <FaqAccordionItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
