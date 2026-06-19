import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/help-faq-data";
import { Badge } from "@/components/ui/badge";

export function FaqAccordionItem({ item }: { item: FaqItem }) {
  return (
    <details
      className="group rounded-ur-lg border border-white/10 bg-black/16 p-4 open:border-ur-primary/35 open:bg-white/[0.04]"
      open={item.defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 ur-focus">
        <div>
          <Badge variant="outline">{item.category}</Badge>
          <h3 className="mt-3 text-lg font-black text-white">{item.question}</h3>
        </div>
        <ChevronDown className="mt-2 h-5 w-5 shrink-0 text-white/42 transition-transform group-open:rotate-180 group-open:text-ur-primary" />
      </summary>

      <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-white/58">
        {item.answer}
      </p>
    </details>
  );
}
