"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function StellarBannerSection() {
  return (
    <section id="stellar" className="relative min-h-[360px] overflow-hidden border-b border-ur-border bg-ur-bg">
      <Image
        src="/images/banner.png"
        alt="UrbanRentisha TrustLayer - built on Stellar, powered by privacy"
        fill
        unoptimized
        className="object-contain"
      />
      <div className="absolute inset-0 bg-ur-bg/70" />

      <div className="ur-container relative flex min-h-[360px] flex-col items-center justify-center gap-8 py-10 lg:flex-row lg:justify-between">
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

        <div className="w-full max-w-xs text-center lg:text-left">
          <h3 className="text-lg font-bold text-ur-navy">Stay Updated</h3>
          <p className="mt-1 text-sm text-ur-text-secondary">Get the latest updates, features, and security tips.</p>
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
    </section>
  );
}
