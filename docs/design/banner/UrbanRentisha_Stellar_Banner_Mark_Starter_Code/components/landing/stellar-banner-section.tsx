import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Mail, ShieldCheck } from "lucide-react";

const privacyItems = [
  "No spam.",
  "Unsubscribe anytime.",
  "We respect your privacy."
];

export function StellarBannerSection() {
  return (
    <section className="ur-container">
      <div className="relative overflow-hidden rounded-ur-lg border border-white/10 bg-white/[0.035] px-5 py-5 shadow-soft-dark backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(22,163,74,0.14),transparent_44%)]" />
        <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/10 lg:block" />
        <div className="absolute inset-y-0 left-[67%] hidden w-px bg-white/10 lg:block" />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.08fr_1.05fr_1.22fr]">
          <div className="max-w-[360px]">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-ur-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-ur-mint">
              <ShieldCheck className="h-3.5 w-3.5" />
              Stellar-backed trust
            </div>

            <h2 className="text-xl font-black tracking-[-0.04em] text-white sm:text-2xl">
              Built on Stellar. Powered by Privacy.
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/70">
              UrbanRentisha TrustLayer uses Stellar smart contracts and
              zero-knowledge proofs to bring trust, privacy, and transparency
              to the rental ecosystem.
            </p>

            <Link
              href="/stellar"
              className="mt-5 inline-flex h-9 items-center justify-center gap-2 rounded-ur-sm border border-white/20 px-4 text-xs font-bold text-white transition-colors hover:border-ur-primary/60 hover:bg-white/5 ur-focus"
            >
              Explore on Stellar
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex min-h-[120px] items-center justify-center">
            <div className="relative h-[80px] w-[240px] md:h-[100px] md:w-[300px] lg:h-[120px] lg:w-[360px]">
              <Image
                src="/images/stellar-banner-mark.png"
                alt="Stellar logo"
                fill
                priority
                sizes="(max-width: 768px) 240px, (max-width: 1024px) 300px, 360px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="lg:pl-4">
            <div className="mb-4 flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                <Mail className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-xl font-black tracking-[-0.04em] text-white">
                  Stay Updated
                </h3>
                <p className="mt-1 text-xs leading-5 text-white/62">
                  Get the latest updates, features, and security tips.
                </p>
              </div>
            </div>

            <form className="flex flex-col gap-3 sm:flex-row" aria-label="Newsletter subscription">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-11 min-w-0 flex-1 rounded-ur-sm border border-white/14 bg-black/20 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-ur-primary"
              />

              <button
                type="submit"
                className="h-11 rounded-ur-sm bg-ur-primary px-6 text-sm font-bold text-white transition-colors hover:bg-ur-primary-hover ur-focus"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {privacyItems.map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs font-medium text-white/62">
                  <Check className="h-3.5 w-3.5 text-ur-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
