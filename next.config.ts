import type { NextConfig } from "next";

/**
 * Legacy → new URL redirects (301, permanent) to preserve SEO equity.
 * Every path that changed from the legacy demo.adam.qa site is mapped here.
 * Kept in one place so it can also feed documentation / audits.
 */
const legacyRedirects = [
  // ACMV canonicalisation — old slug folds into the canonical one.
  { source: "/acmv-services-qatar", destination: "/acmv-system-company-in-qatar", permanent: true },
  // Common legacy aliases → new canonical routes.
  { source: "/home", destination: "/", permanent: true },
  { source: "/about", destination: "/about-us", permanent: true },
  { source: "/contact", destination: "/contact-us", permanent: true },
  { source: "/fire-protection", destination: "/fire-protection-services-qatar", permanent: true },
  {
    source: "/fire-alarm",
    destination: "/fire-alarm-system-installation-maintenance",
    permanent: true,
  },
  { source: "/fire-pump", destination: "/fire-fighting-pump-qatar", permanent: true },
  { source: "/fire-sprinkler", destination: "/fire-sprinkler-system-qatar", permanent: true },
  {
    source: "/fire-stop",
    destination: "/fire-stop-insulation-technologies-services-qatar",
    permanent: true,
  },
  {
    source: "/leak-detection",
    destination: "/underground-leakage-detection-system-service-qatar",
    permanent: true,
  },
  { source: "/hvac", destination: "/hvac-services-qatar", permanent: true },
  { source: "/electrical", destination: "/electrical-services-qatar", permanent: true },
  { source: "/qcdd", destination: "/qatar-civil-defence-department", permanent: true },
  { source: "/rfq", destination: "/request-for-quotation", permanent: true },
  { source: "/quote", destination: "/request-for-quotation", permanent: true },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    // The bundled placeholder artwork is first-party SVG. Replace with raster
    // photography before launch; the CSP below neutralises any embedded script.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
