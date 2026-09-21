import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Web App Manifest (served at /manifest.webmanifest). Improves installability
 * and the Lighthouse Best-Practices/PWA signals. Icons use the raster logo.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: "Adam",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#d4a017",
    lang: "en",
    dir: "ltr",
    categories: ["business", "utilities"],
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/logo.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/logo.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
