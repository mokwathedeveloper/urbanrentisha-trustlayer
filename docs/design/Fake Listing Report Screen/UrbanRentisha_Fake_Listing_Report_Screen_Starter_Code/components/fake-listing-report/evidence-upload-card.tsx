import { UploadCloud } from "lucide-react";
import { evidenceTypes } from "@/lib/report-data";

export function EvidenceUploadCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Evidence
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Add evidence if available.
      </h2>
      <p className="mt-2 text-sm leading-6 text-white/56">
        This UI is ready for upload integration. For the MVP, it shows the intended upload and evidence categories.
      </p>

      <div className="mt-5 rounded-ur-xl border border-dashed border-ur-primary/35 bg-ur-primary/8 p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
          <UploadCloud className="h-7 w-7" />
        </div>
        <p className="mt-4 text-lg font-black text-white">Drag screenshots or receipts here</p>
        <p className="mt-2 text-sm leading-6 text-white/52">
          PNG, JPG, PDF, or screenshots up to 10MB each.
        </p>
        <button
          type="button"
          className="mt-5 h-10 rounded-ur-sm border border-white/14 px-5 text-sm font-bold text-white transition-colors hover:border-ur-primary/60 hover:bg-white/5 ur-focus"
        >
          Browse files
        </button>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {evidenceTypes.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <Icon className="mb-3 h-5 w-5 text-ur-primary" />
              <p className="text-sm font-black text-white">{item.title}</p>
              <p className="mt-2 text-xs leading-5 text-white/52">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
