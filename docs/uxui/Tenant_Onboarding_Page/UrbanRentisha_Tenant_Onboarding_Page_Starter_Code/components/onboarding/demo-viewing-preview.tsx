import { CheckCircle2, Copy, KeyRound } from "lucide-react";
import { flowSummary } from "@/lib/onboarding-data";
import { Button } from "@/components/ui/button";

export function DemoViewingPreview() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 backdrop-blur-xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Demo outcome preview
          </p>

          <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
            This is what successful access unlock looks like.
          </h2>
        </div>

        <Button variant="outline">
          Copy demo code
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-4">
        {flowSummary.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="rounded-ur-lg border border-white/10 bg-black/18 p-4">
              <div className="mb-4 flex items-center justify-between">
                <Icon className="h-5 w-5 text-ur-primary" />
                <CheckCircle2 className="h-4 w-4 text-ur-success" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">
                {item.label}
              </p>
              <p className="mt-1 text-lg font-black text-white">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-black/20 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-ur bg-ur-primary text-white">
              <KeyRound className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-black text-white">Viewing code</p>
              <p className="text-xs text-white/48">Unlocked after proof verification</p>
            </div>
          </div>

          <code className="w-fit rounded-ur-sm border border-ur-primary/20 bg-ur-success-bg px-4 py-2 font-mono text-sm font-bold text-ur-success">
            VIEW-8K29XQ
          </code>
        </div>
      </div>
    </section>
  );
}
