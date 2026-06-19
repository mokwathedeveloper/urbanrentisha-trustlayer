import { CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusNoticeTone = "success" | "warning" | "info";

type StatusNoticeProps = {
  tone?: StatusNoticeTone;
  title: string;
  description: string;
  className?: string;
  icon?: React.ReactNode;
};

const toneStyles: Record<StatusNoticeTone, string> = {
  success: "border-ur-success/20 bg-ur-success-bg text-ur-success",
  warning: "border-ur-warning/25 bg-ur-warning-bg text-ur-warning",
  info: "border-ur-cyan/20 bg-ur-cyan/8 text-ur-cyan"
};

const defaultIcons: Record<StatusNoticeTone, React.ReactNode> = {
  success: <CheckCircle2 className="h-4 w-4" />,
  warning: <TriangleAlert className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />
};

export function StatusNotice({
  tone = "info",
  title,
  description,
  className,
  icon
}: StatusNoticeProps) {
  return (
    <div className={cn("rounded-ur-sm border p-3", toneStyles[tone], className)}>
      <div className="flex gap-3">
        <div className="mt-0.5 shrink-0">{icon ?? defaultIcons[tone]}</div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.12em]">{title}</p>
          <p className="mt-1 text-xs leading-5 opacity-80">{description}</p>
        </div>
      </div>
    </div>
  );
}
