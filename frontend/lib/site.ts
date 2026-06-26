// Canonical production domain per docs/deployment/UrbanRentisha_TrustLayer_Final_Vercel_Supabase_Deployment_Documentation.md.
// Override via NEXT_PUBLIC_SITE_URL for staging/preview deployments.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://urbanrentisha.app";
