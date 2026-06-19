import { Home, Leaf, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-ur-primary/25 bg-ur-success-bg">
        <ShieldCheck className="absolute h-9 w-9 text-ur-primary" strokeWidth={1.8} />
        <Home className="h-4 w-4 text-ur-primary" strokeWidth={2.4} />
        <Leaf className="absolute bottom-1 right-1 h-4 w-4 text-ur-accent" strokeWidth={2.2} />
      </div>

      <div className="leading-tight">
        <p className="text-xl font-black tracking-[-0.04em] text-ur-navy">
          Urban<span className="text-ur-primary">Rentisha</span>
        </p>
        <p className="text-sm font-semibold text-ur-text-secondary">
          TrustLayer
        </p>
      </div>
    </div>
  );
}
