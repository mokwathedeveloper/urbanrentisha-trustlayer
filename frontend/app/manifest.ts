import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "UrbanRentisha TrustLayer",
    short_name: "UrbanRentisha",
    description:
      "Privacy-preserving rental trust infrastructure on Stellar - prove a viewing payment with a real ZK proof, verified on-chain, before private property access is unlocked.",
    start_url: "/",
    display: "standalone",
    background_color: "#060B0A",
    theme_color: "#16A34A",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
