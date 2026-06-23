"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { LogoMark } from "@/components/landing/logo-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { footerColumns } from "@/lib/landing-data";

export function LandingFooter() {
  return (
    <footer className="border-t border-ur-border bg-ur-page">
      <div id="stellar" className="border-b border-ur-border bg-ur-bg">
        <div className="ur-container flex flex-col items-center gap-8 py-10 lg:flex-row lg:justify-between">
          <div className="max-w-xs text-center lg:text-left">
            <h3 className="text-lg font-bold text-ur-navy sm:text-xl">Built on Stellar. Powered by Privacy.</h3>
            <p className="mt-1 text-sm text-ur-text-secondary">
              UrbanRentisha TrustLayer uses Soroban smart contracts and Zero-Knowledge proofs to
              bring trust and privacy to the rental ecosystem.
            </p>
            <a
              href="https://stellar.org"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-ur-mint hover:underline"
            >
              Explore on Stellar
              <Icon name="open_in_new" size={14} />
            </a>
          </div>

          <Image
            src="/images/banner.png"
            alt="UrbanRentisha TrustLayer - built on Stellar, powered by privacy"
            width={1774}
            height={887}
            className="h-auto w-full max-w-[320px] shrink-0"
            sizes="320px"
          />

          <div className="w-full max-w-xs text-center lg:text-left">
            <h3 className="text-lg font-bold text-ur-navy">Stay Updated</h3>
            <p className="mt-1 text-sm text-ur-text-secondary">
              Get the latest updates, features, and security tips.
            </p>
            <form className="mt-2 flex w-full gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                label="Email address"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                required
              />
              <Button className="self-end" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="ur-container grid gap-8 py-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <LogoMark />
          <p className="mt-3 max-w-xs text-sm text-ur-text-secondary">
            Rental scam prevention. Verified trust. On Stellar.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h4 className="text-sm font-bold text-ur-navy">{column.title}</h4>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-ur-text-secondary hover:text-ur-mint">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="ur-container flex flex-col items-center justify-between gap-3 border-t border-ur-border py-6 text-xs text-ur-text-muted sm:flex-row">
        <p>&copy; {new Date().getFullYear()} UrbanRentisha TrustLayer. All rights reserved.</p>
      </div>
    </footer>
  );
}
