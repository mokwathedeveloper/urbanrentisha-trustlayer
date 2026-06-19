import { privacyNotes } from "@/lib/zk-proof-data";

export function PrivacyExplainerCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Privacy explanation
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          What the proof reveals and what it hides.
        </h2>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {privacyNotes.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-ur-lg border border-white/10 bg-black/16 p-5">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-black text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/58">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
