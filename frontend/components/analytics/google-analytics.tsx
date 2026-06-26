import Script from "next/script";

/**
 * Renders nothing until NEXT_PUBLIC_GA_MEASUREMENT_ID is set - no GA4
 * property exists yet, so this is a deliberate no-op rather than a script
 * pointed at a fake/placeholder ID. Once a real "G-XXXXXXXXXX" ID is added
 * to Vercel's env vars, this activates with no further code changes.
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
