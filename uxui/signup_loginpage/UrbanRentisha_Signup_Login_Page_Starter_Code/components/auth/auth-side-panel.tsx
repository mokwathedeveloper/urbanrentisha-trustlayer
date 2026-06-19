import { CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { securityChecks, trustItems } from "@/lib/auth-data";

export function AuthSidePanel() {
  return (
    <aside className="hidden lg:block">
      <div className="max-w-[560px]">
        <Badge variant="success">
          <ShieldCheck className="h-3.5 w-3.5" />
          Private rental access
        </Badge>

        <h2 className="mt-6 text-[56px] font-black leading-[0.96] tracking-[-0.07em] text-white">
          Access verified rentals without exposing more than needed.
        </h2>

        <p className="mt-6 max-w-[500px] text-lg leading-8 text-white/66">
          Login with demo access, email, or wallet. UrbanRentisha keeps the
          product flow clear: request viewing, prove payment, verify status,
          and unlock access.
        </p>

        <div className="mt-8 grid gap-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-ur-lg border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/56">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-5">
          <div className="mb-4 flex items-center gap-2">
            <LockKeyhole className="h-5 w-5 text-ur-primary" />
            <p className="font-black text-white">Security checklist</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {securityChecks.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2 text-sm text-white/70">
                  <Icon className="h-4 w-4 text-ur-primary" />
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 text-sm text-white/48">
          <CheckCircle2 className="h-4 w-4 text-ur-primary" />
          Built for demo readiness, Supabase/Auth integration, and future Stellar wallet access.
        </div>
      </div>
    </aside>
  );
}
