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
      width={2172}
      height={724}
      className={cn("h-14 w-auto", className)}
      priority
    />
  );
}
