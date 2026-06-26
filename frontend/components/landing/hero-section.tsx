import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { heroStats } from "@/lib/landing-data";
import { Icon } from "@/components/ui/icon";

export function HeroSection() {
  return (
    <section className="relative min-h-[640px] overflow-hidden border-b border-ur-border bg-ur-page">
      <Image
        src="/images/hero-illustration.png"
        alt="Zero-knowledge proof verified on Stellar blockchain, unlocking verified rental access"
        fill
        priority
        // `priority` alone does not set the fetchpriority HTML attribute in
        // this Next.js version - confirmed by reading
        // next/dist/shared/lib/get-img-props.js, and by Lighthouse flagging
        // priorityHinted: false on this exact element despite `priority`.
        fetchPriority="high"
        sizes="100vw"
        className="object-contain object-right"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ur-page via-ur-page/95 to-ur-page/60" />

      <div className="ur-container relative flex min-h-[640px] flex-col justify-center py-16 lg:py-20">
        <div className="flex max-w-xl flex-col">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-ur-primary/30 bg-ur-success-bg px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-ur-primary">
            <Icon name="verified_user" size={14} />
            ZK Proof &middot; Stellar Blockchain
          </div>

          <h1 className="mt-5 max-w-xl text-4xl font-black tracking-[-0.04em] text-ur-navy sm:text-5xl lg:text-6xl">
            Safe Rentals.
            <br />
            <span className="text-ur-primary">Verified Trust.</span>
            <br />
            Zero Compromise.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-ur-text-secondary">
            Stop rental scams. Prove payments privately with Zero-Knowledge proofs and
            unlock verified property access on Stellar.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/login">
              <Button size="lg">
                Get Started
                <Icon name="arrow_forward" size={16} />
              </Button>
            </Link>
            <a href="#trust-flow">
              <Button size="lg" variant="outline">
                <Icon name="play_arrow" size={16} />
                How It Works
              </Button>
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-ur-text-muted">{stat.label}</dt>
                <dd className="flex items-center gap-2 text-xl font-black text-ur-navy">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-ur-primary/10 text-ur-primary">
                    <Icon name={stat.icon} size={16} />
                  </span>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
