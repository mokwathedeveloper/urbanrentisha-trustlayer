import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <Image
      src="/images/logo.png"
      alt="UrbanRentisha TrustLayer"
      // Intrinsic size set to the largest actual rendered size across the
      // app (login page uses h-20/80px; everywhere else is h-14/56px or
      // smaller) rather than the raw 2172x724 source file - without this,
      // Next.js Image has no upper bound and was generating/serving a
      // 3840px-wide variant (264KB) for a logo that never renders wider
      // than ~240px, dominating the homepage's JS/network cost.
      width={240}
      height={80}
      className={cn("h-14 w-auto", className)}
      priority
    />
  );
}
