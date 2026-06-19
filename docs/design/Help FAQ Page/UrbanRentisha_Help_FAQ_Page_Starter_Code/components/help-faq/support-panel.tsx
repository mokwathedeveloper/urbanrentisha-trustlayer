import { ExternalLink, LifeBuoy, Mail, Phone } from "lucide-react";
import { supportOptions } from "@/lib/help-faq-data";
import { Button } from "@/components/ui/button";

export function SupportPanel() {
  return (
    <section id="support" className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Support
          </p>
          <h2 className="mt-2 text-lg font-black text-white">Still need help?</h2>
        </div>
        <LifeBuoy className="h-6 w-6 text-ur-primary" />
      </div>

      <div className="mt-4 space-y-3">
        {supportOptions.map((option) => {
          const Icon = option.icon;

          return (
            <a
              key={option.title}
              href={option.href}
              className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3 transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04] ur-focus"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-white">{option.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{option.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-white/32" />
            </a>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3">
        <Button className="w-full">
          <Mail className="h-4 w-4" />
          Email support
        </Button>
        <Button className="w-full" variant="outline">
          <Phone className="h-4 w-4" />
          Emergency safety help
        </Button>
      </div>
    </section>
  );
}
