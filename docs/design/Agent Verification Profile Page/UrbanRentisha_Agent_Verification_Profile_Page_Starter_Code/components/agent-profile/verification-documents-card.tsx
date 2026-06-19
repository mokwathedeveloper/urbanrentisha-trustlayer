import { CheckCircle2 } from "lucide-react";
import { verificationChecks } from "@/lib/agent-profile-data";
import { Badge } from "@/components/ui/badge";

export function VerificationDocumentsCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Verification checks
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Documents and trust checks
      </h2>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {verificationChecks.map((check) => {
          const Icon = check.icon;
          return (
            <article key={check.title} className="rounded-ur-lg border border-white/10 bg-black/16 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge variant={check.status === "Passed" ? "success" : "warning"}>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {check.status}
                </Badge>
              </div>

              <h3 className="mt-4 font-black text-white">{check.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/56">{check.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
