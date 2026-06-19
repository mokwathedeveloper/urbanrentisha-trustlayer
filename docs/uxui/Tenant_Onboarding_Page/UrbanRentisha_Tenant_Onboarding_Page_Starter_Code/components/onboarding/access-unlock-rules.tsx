import { AlertTriangle, CheckCircle2, KeyRound, XCircle } from "lucide-react";

const unlockRules = [
  {
    title: "Access locked",
    description: "Viewing code remains hidden while payment or proof status is incomplete.",
    icon: XCircle,
    tone: "locked"
  },
  {
    title: "Proof verified",
    description: "Soroban verification or verified proof status confirms the payment condition.",
    icon: CheckCircle2,
    tone: "verified"
  },
  {
    title: "Code unlocked",
    description: "The tenant receives a viewing code only after the trust condition succeeds.",
    icon: KeyRound,
    tone: "unlocked"
  }
] as const;

export function AccessUnlockRules() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Access unlock rules
          </p>
          <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
            No proof, no viewing code.
          </h2>
        </div>

        <div className="hidden rounded-full border border-ur-warning/25 bg-ur-warning-bg px-3 py-1 text-xs font-bold text-ur-warning sm:inline-flex">
          <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
          Anti-scam rule
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {unlockRules.map((rule) => {
          const Icon = rule.icon;

          return (
            <article key={rule.title} className="rounded-ur-lg border border-white/10 bg-black/16 p-5">
              <div className="grid h-11 w-11 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-black text-white">{rule.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/58">{rule.description}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/18 p-4">
        <code className="font-mono text-xs leading-6 text-ur-mint">
          accessStatus = proofStatus === "VERIFIED" ? "UNLOCKED" : "LOCKED"
        </code>
      </div>
    </section>
  );
}
