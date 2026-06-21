import { Icon } from "@/components/ui/icon";

export function StellarCtaSection() {
  return (
    <section id="stellar" className="border-y border-ur-border bg-ur-surface">
      <div className="ur-container flex flex-col items-center gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl text-center lg:text-left">
          <h2 className="text-2xl font-black tracking-[-0.03em] text-ur-navy">
            Built on Stellar. Powered by Privacy.
          </h2>
          <p className="mt-2 text-sm text-ur-text-secondary">
            UrbanRentisha TrustLayer uses Soroban smart contracts and
            Zero-Knowledge proofs to bring trust and privacy to the rental
            ecosystem.
          </p>
          <a
            href="https://stellar.org"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ur-mint hover:underline"
          >
            Explore on Stellar
            <Icon name="open_in_new" size={14} />
          </a>
        </div>
        <div className="flex items-center gap-3 text-xl font-black text-ur-navy">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-ur-border bg-ur-card text-ur-mint">
            ★
          </span>
          Stellar
        </div>
      </div>
    </section>
  );
}
