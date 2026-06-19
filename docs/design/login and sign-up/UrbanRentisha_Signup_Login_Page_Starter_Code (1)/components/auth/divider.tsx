type DividerProps = {
  label: string;
};

export function Divider({ label }: DividerProps) {
  return (
    <div className="my-5 flex items-center gap-3">
      <div className="h-px flex-1 bg-white/10" />
      <span className="text-xs font-semibold text-white/38">{label}</span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}
