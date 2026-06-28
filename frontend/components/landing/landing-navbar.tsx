import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/landing/logo-mark";
import { landingNavItems } from "@/lib/landing-data";
import { Icon } from "@/components/ui/icon";
import { HomepageCta } from "@/components/landing/homepage-cta";

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ur-border/80 bg-ur-page/90 backdrop-blur-xl">
      <div className="ur-container flex h-16 items-center justify-between">
        <Link href="/" aria-label="UrbanRentisha home">
          <LogoMark />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {landingNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-ur-sm px-4 py-2 text-sm font-semibold text-ur-text-secondary transition-colors hover:bg-ur-card-soft hover:text-ur-navy ur-focus"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <HomepageCta size="md" />
          <a href="https://stellar.org" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">
              Explore on Stellar
              <Icon name="open_in_new" size={16} />
            </Button>
          </a>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-ur-sm border border-ur-border bg-ur-surface text-ur-navy lg:hidden"
          aria-label="Open navigation"
        >
          <Icon name="menu" size={20} />
        </button>
      </div>
    </header>
  );
}
