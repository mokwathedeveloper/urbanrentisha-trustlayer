import { AlertTriangle, Flag, KeyRound, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ViewingCodesReportsSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <article id="viewing-codes" className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
        <Badge variant="success">
          <KeyRound className="h-3.5 w-3.5" />
          Viewing codes
        </Badge>
        <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-white">
          Viewing access unlocks only after trust checks.
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/56">
          A viewing code is released after payment is detected and proof verification succeeds. Codes can expire, be revoked, or be blocked if a report or suspicious activity appears.
        </p>

        <div className="mt-5 space-y-3">
          <RuleRow icon={<ShieldCheck className="h-4 w-4" />} title="Unlocked" text="Proof verified and viewing access is available." />
          <RuleRow icon={<AlertTriangle className="h-4 w-4" />} title="Expired" text="The code is no longer valid after the allowed time window." />
          <RuleRow icon={<Flag className="h-4 w-4" />} title="Revoked" text="Access was removed due to report, risk, or manual review." />
        </div>
      </article>

      <article id="reports" className="rounded-ur-xl border border-ur-error/20 bg-ur-error-bg p-6 shadow-soft-dark backdrop-blur-xl">
        <Badge variant="danger">
          <Flag className="h-3.5 w-3.5" />
          Reports
        </Badge>
        <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-white">
          Report fake listings and unsafe payment requests.
        </h2>
        <p className="mt-3 text-sm leading-6 text-ur-error/76">
          Report any agent who asks for off-platform payment, changes viewing details suspiciously, uses mismatched identity, or shares misleading property information.
        </p>

        <Button className="mt-5" variant="danger">
          <Flag className="h-4 w-4" />
          Report suspicious activity
        </Button>
      </article>
    </section>
  );
}

function RuleRow({
  icon,
  title,
  text
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
        {icon}
      </div>
      <div>
        <p className="text-sm font-black text-white">{title}</p>
        <p className="mt-1 text-xs leading-5 text-white/52">{text}</p>
      </div>
    </div>
  );
}
