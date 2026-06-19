import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Play,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { LogoMark } from "@/components/landing/logo-mark";

const navItems = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "For Everyone", href: "#audiences" },
  { label: "About Us", href: "#about" },
  { label: "FAQ", href: "#faq" }
];

const stats = [
  { label: "Users Protected", value: "10K+" },
  { label: "Verified Properties", value: "2K+" },
  { label: "Transactions Secured", value: "5K+" },
  { label: "Privacy First", value: "100%" }
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-ur-bg">
      <div className="absolute inset-0 hero-grid-bg opacity-50" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_70%_20%,rgba(22,163,74,0.22),transparent_34%),radial-gradient(circle_at_18%_35%,rgba(52,211,153,0.12),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,11,10,1)_0%,rgba(6,11,10,0.92)_34%,rgba(6,11,10,0.58)_62%,rgba(6,11,10,0.96)_100%)]" />

      <div className="relative z-10">
        <header className="ur-container flex h-20 items-center justify-between">
          <Link href="/" aria-label="UrbanRentisha TrustLayer home" className="ur-focus rounded-ur-sm">
            <LogoMark />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Hero navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-ur-sm text-sm font-semibold text-white/82 transition-colors hover:text-ur-primary ur-focus"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/demo"
              className="inline-flex h-11 items-center justify-center rounded-ur-sm bg-ur-primary px-6 text-sm font-bold text-white transition-colors hover:bg-ur-primary-hover ur-focus"
            >
              Get Started
            </Link>
            <Link
              href="/stellar"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-ur-sm border border-white/20 px-6 text-sm font-bold text-white transition-colors hover:border-ur-primary/60 hover:bg-white/5 ur-focus"
            >
              Explore on Stellar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <div className="ur-container grid min-h-[calc(100vh-80px)] items-center gap-10 pb-16 pt-10 lg:grid-cols-[0.86fr_1.14fr] lg:pb-20">
          <div className="relative z-20 max-w-[600px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-ur-primary/20 bg-ur-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-ur-mint">
              <Sparkles className="h-3.5 w-3.5" />
              ZK Proof + Stellar Blockchain
            </div>

            <h1 className="mt-8 text-[46px] font-black leading-[0.98] tracking-[-0.07em] text-white sm:text-[64px] lg:text-[72px]">
              Safe Rentals.
              <span className="block text-ur-primary">Verified Trust.</span>
              <span className="block">Zero Compromise.</span>
            </h1>

            <p className="mt-7 max-w-[560px] text-lg leading-8 text-white/78">
              Stop rental scams. Prove payments privately with zero-knowledge
              proofs and unlock verified property access on Stellar.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex h-[52px] items-center justify-center gap-3 rounded-ur-sm bg-ur-primary px-8 text-base font-bold text-white transition-colors hover:bg-ur-primary-hover ur-focus"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex h-[52px] items-center justify-center gap-3 rounded-ur-sm border border-white/22 px-8 text-base font-bold text-white transition-colors hover:border-ur-primary/70 hover:bg-white/5 ur-focus"
              >
                <Play className="h-4 w-4" />
                How it Works
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="border-l border-white/10 pl-4 first:border-l-0 first:pl-0">
                  <p className="text-2xl font-black tracking-[-0.04em] text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-ur-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex min-h-[420px] items-center justify-center lg:min-h-[620px]">
            <div className="absolute inset-0 rounded-full bg-ur-primary/20 blur-[110px]" />
            <div className="relative h-[360px] w-full sm:h-[460px] lg:h-[620px]">
              <Image
                src="/images/hero-ilustration.png"
                alt="UrbanRentisha TrustLayer hero illustration showing ZK proof, Stellar blockchain, verified access, and secure rental buildings"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 56vw"
                className="object-contain drop-shadow-[0_30px_70px_rgba(22,163,74,0.22)]"
              />
            </div>
          </div>
        </div>

        <div className="ur-container pb-8">
          <div className="grid gap-4 rounded-ur-lg border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm sm:grid-cols-3">
            {[
              "Verified properties before access",
              "Private payment proof without wallet exposure",
              "Soroban-backed verification trail"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-semibold text-white/78">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-ur-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
