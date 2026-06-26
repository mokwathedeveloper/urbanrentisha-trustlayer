"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function StellarBannerSection() {
  return (
    <section
      id="stellar"
      className="relative h-[420px] w-full overflow-hidden border-b border-ur-border bg-ur-bg"
    >
      <Image
        src="/images/banner.png"
        alt="UrbanRentisha TrustLayer - built on Stellar, powered by privacy"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 h-full w-full object-fill"
      />

      <div className="absolute inset-0 z-10 bg-ur-bg/10" />

      <div className="ur-container relative z-20 flex h-full items-center justify-between gap-8">
        <div className="max-w-xs text-left">
          <h3 className="text-lg font-bold text-white sm:text-xl">
            Built on Stellar. Powered by Privacy.
          </h3>

          <p className="mt-2 text-sm text-ur-text-secondary">
            UrbanRentisha TrustLayer uses Soroban smart contracts and Zero-Knowledge proofs to
            bring trust and privacy to the rental ecosystem.
          </p>

          <a
            href="https://stellar.org"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ur-mint hover:underline"
          >
            Explore on Stellar
            <Icon name="open_in_new" size={14} />
          </a>
        </div>

        <div className="w-full max-w-xs text-left">
          <h3 className="text-lg font-bold text-white">
            Stay Updated
          </h3>

          <p className="mt-2 text-sm text-ur-text-secondary">
            Get the latest updates, features, and security tips.
          </p>

          <form
            className="mt-3 flex w-full gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
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