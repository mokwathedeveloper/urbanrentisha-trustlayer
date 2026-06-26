import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Authenticated app routes and one-time invite links have nothing
        // to offer a crawler and shouldn't be indexed.
        disallow: ["/dashboard", "/listings/", "/admin", "/activate"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
