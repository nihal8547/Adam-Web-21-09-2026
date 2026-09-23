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
    theme_color: "#0f1e3d",
    lang: "en",
    dir: "ltr",
    categories: ["business", "utilities"],
    icons: [
      { src: "/LogoBT.png", sizes: "72x70", type: "image/png", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
