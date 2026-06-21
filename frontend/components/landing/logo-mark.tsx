import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-ur-primary/25 bg-ur-success-bg">
        <Icon name="verified_user" size={36} className="absolute text-ur-primary" />
        <Icon name="home" size={16} className="text-ur-primary" />
        <Icon name="eco" size={16} className="absolute bottom-1 right-1 text-ur-accent" />
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
