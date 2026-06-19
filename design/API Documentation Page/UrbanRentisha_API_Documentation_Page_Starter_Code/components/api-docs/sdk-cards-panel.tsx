import { Download } from "lucide-react";
import { sdkCards } from "@/lib/api-docs-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SdkCardsPanel() {
  return (
    <section id="sdks" className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">SDK and integration options</p><h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">Choose the integration path</h2></div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {sdkCards.map((sdk) => {
          const Icon = sdk.icon;
          return (
            <article key={sdk.language} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4"><div className="grid h-11 w-11 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary"><Icon className="h-5 w-5" /></div><Badge variant={sdk.status === "recommended" ? "success" : "neutral"}>{sdk.status}</Badge></div>
              <h3 className="mt-4 text-lg font-black text-white">{sdk.language}</h3>
              <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{sdk.packageName}</p>
              <p className="mt-3 rounded-ur-sm border border-white/10 bg-black/24 px-3 py-2 font-mono text-xs text-white/64">{sdk.installCommand}</p>
              <Button variant="outline" className="mt-4 w-full"><Download className="h-4 w-4" /> View setup</Button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
