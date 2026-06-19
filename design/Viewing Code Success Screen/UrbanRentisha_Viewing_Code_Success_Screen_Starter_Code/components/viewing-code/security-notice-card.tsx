import { ShieldAlert } from "lucide-react";
import { accessRules } from "@/lib/viewing-code-data";

export function SecurityNoticeCard() {
  return (
    <section className="rounded-ur-xl border border-ur-warning/25 bg-ur-warning-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-warning/15 text-ur-warning">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-warning">
            Security notice
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Keep this viewing code private.
          </h2>
          <p className="mt-2 text-sm leading-6 text-ur-warning/78">
            UrbanRentisha will never ask for extra off-platform payments to keep this viewing code active.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {accessRules.map((rule) => {
          const Icon = rule.icon;
          return (
            <article key={rule.title} className="rounded-ur-lg border border-ur-warning/20 bg-black/16 p-4">
              <Icon className="mb-3 h-5 w-5 text-ur-warning" />
              <h3 className="text-sm font-black text-white">{rule.title}</h3>
              <p className="mt-2 text-xs leading-5 text-ur-warning/74">{rule.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
