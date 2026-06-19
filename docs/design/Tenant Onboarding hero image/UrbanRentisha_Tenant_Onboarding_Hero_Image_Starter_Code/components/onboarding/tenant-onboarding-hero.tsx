import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  ShieldCheck,
  UsersRound
} from "lucide-react";

const benefitItems = [
  {
    title: "Secure & Private",
    description: "Payment proof is verified without exposing sensitive wallet activity.",
    icon: ShieldCheck
  },
  {
    title: "Fair & Transparent",
    description: "Only verified requests can move toward property viewing access.",
    icon: Clock3
  },
  {
    title: "Respect for Everyone",
    description: "Tenants and property owners get a safer, more accountable viewing process.",
    icon: UsersRound
  }
];

export function TenantOnboardingHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-ur-bg py-10 text-ur-text">
      <div className="absolute inset-0 onboarding-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-14%] top-[-10%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="ur-container relative z-10">
        <div className="relative overflow-hidden rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(22,163,74,0.20),transparent_35%)]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[0.84fr_1.16fr]">
            <div className="max-w-[560px]">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ur-primary/20 bg-ur-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-ur-mint">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Welcome to UrbanRentisha
              </div>

              <h1 className="text-[44px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px] lg:text-[64px]">
                Verified viewing.
                <span className="block">
                  Built on <span className="text-ur-primary">trust</span>,
                </span>
                <span className="block">privacy & fairness.</span>
              </h1>

              <p className="mt-6 max-w-[540px] text-lg leading-8 text-white/68">
                We verify your payment before granting access to property
                viewings, protecting tenants, respecting privacy, and ensuring
                a fair experience for everyone.
              </p>

              <div className="mt-8 grid gap-4">
                {benefitItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 text-ur-primary">
                        <Icon className="h-7 w-7" />
                      </div>

                      <div>
                        <h2 className="text-lg font-black text-white">{item.title}</h2>
                        <p className="mt-1 text-base leading-7 text-white/62">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/tenant/onboarding"
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-ur-sm bg-ur-primary px-8 text-base font-bold text-white transition-colors hover:bg-ur-primary-hover ur-focus"
                >
                  Continue onboarding
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/listings"
                  className="inline-flex h-[52px] items-center justify-center rounded-ur-sm border border-white/14 px-8 text-base font-bold text-white transition-colors hover:border-ur-primary/60 hover:bg-white/5 ur-focus"
                >
                  Browse verified listings
                </Link>
              </div>
            </div>

            <div className="relative min-h-[340px] sm:min-h-[430px] lg:min-h-[560px]">
              <div className="absolute inset-0 rounded-full bg-ur-primary/20 blur-[95px]" />
              <div className="relative h-[340px] w-full sm:h-[430px] lg:h-[560px]">
                <Image
                  src="/images/tenant-onboarding-hero-illustration.png"
                  alt="Tenant onboarding hero illustration showing access unlocked, verified property, shield protection, and private payment proof"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 56vw, 680px"
                  className="object-contain drop-shadow-[0_28px_90px_rgba(22,163,74,0.22)]"
                />
              </div>
            </div>
          </div>

          <div className="relative mt-8 grid gap-3 rounded-ur-lg border border-white/10 bg-black/18 p-4 sm:grid-cols-3">
            {[
              "Payment verified by proof",
              "Private data stays protected",
              "Access unlocks after verification"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-bold text-white/72">
                <LockKeyhole className="h-4 w-4 shrink-0 text-ur-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
