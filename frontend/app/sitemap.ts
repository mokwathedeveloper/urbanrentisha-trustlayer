import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Only the genuinely public, server-renderable pages - everything under the
// (app) route group redirects an unauthenticated visitor (and therefore a
// crawler) straight to /login, so it has nothing indexable to offer.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/login`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/api-docs`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
