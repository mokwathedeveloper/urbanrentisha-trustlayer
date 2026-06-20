import Link from "next/link";
import { ArrowRight, ExternalLink, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroStats } from "@/lib/landing-data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-ur-border bg-ur-page">
      <div className="absolute inset-0 ur-muted-grid" aria-hidden="true" />
      <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-ur-primary/10 blur-3xl" />

      <div className="ur-container relative grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-ur-primary/30 bg-ur-success-bg px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-ur-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
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
            Real estate rentals powered by Zero-Knowledge proofs and Stellar
            blockchain. Pay safely, prove ownership privately, and access
            verified properties with confidence.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/login">
              <Button size="lg">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="https://stellar.org" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline">
                Explore on Stellar
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-ur-primary/10 text-ur-primary">
                    <stat.icon className="h-4 w-4" />
                  </span>
                  <dd className="text-xl font-black text-ur-navy">{stat.value}</dd>
                </div>
                <dt className="mt-1 text-xs text-ur-text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute right-6 top-2 rounded-ur border border-ur-border bg-ur-card px-4 py-2 text-xs font-semibold text-ur-navy shadow-ur-soft">
            Zero-Knowledge Proof
          </div>
          <div className="absolute bottom-6 left-2 flex items-center gap-2 rounded-ur border border-ur-border bg-ur-card px-4 py-2 text-xs font-semibold text-ur-navy shadow-ur-soft">
            <span className="h-2 w-2 rounded-full bg-ur-mint" />
            Stellar Blockchain
          </div>
          <div className="grid h-48 w-48 place-items-center rounded-full border border-ur-primary/30 bg-ur-success-bg shadow-[0_0_80px_rgba(22,163,74,0.25)]">
            <div className="grid h-28 w-28 place-items-center rounded-full bg-ur-primary/15">
              <Lock className="h-12 w-12 text-ur-primary" strokeWidth={1.6} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
