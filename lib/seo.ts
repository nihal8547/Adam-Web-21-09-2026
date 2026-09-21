import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL in the environment for
 * production; falls back to the known domain for local/preview builds.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.adam.qa").replace(
  /\/$/,
  "",
);

/** Absolute URL helper for canonicals, OG images and sitemap entries. */
export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type BuildMetadataArgs = {
  title: string;
  description: string;
  /** Route path, e.g. "/about-us". Used for canonical + OG url. */
  path: string;
  /** Optional dynamic OG image path; defaults to the site OG route. */
  ogImage?: string;
  /** Set true on legal/utility pages we don't want indexed heavily. */
  noindex?: boolean;
  keywords?: string[];
  /** OpenGraph object type. Use "article" for blog posts. */
  type?: "website" | "article";
  /** Article-only OpenGraph metadata (ISO dates). */
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
    tags?: string[];
  };
};

/**
 * Central metadata builder — enforces unique title/description, canonical,
 * OpenGraph and Twitter card on every route. Titles should stay < 60 chars,
 * descriptions < 155 (enforced by convention; see per-page content).
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  noindex,
  keywords,
  type = "website",
  article,
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(path);
  const image =
    ogImage ?? absoluteUrl(`/og?title=${encodeURIComponent(title.replace(/\s*\|.*$/, ""))}`);

  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          type: "article",
          siteName: site.legalName,
          locale: "en_QA",
          title,
          description,
          url,
          images: [{ url: image, width: 1200, height: 630, alt: title }],
          publishedTime: article?.publishedTime,
          modifiedTime: article?.modifiedTime ?? article?.publishedTime,
          authors: article?.authors,
          section: article?.section,
          tags: article?.tags,
        }
      : {
          type: "website",
          siteName: site.legalName,
          locale: "en_QA",
          title,
          description,
          url,
          images: [{ url: image, width: 1200, height: 630, alt: title }],
        };

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        "en-QA": url,
        // Arabic locale is planned (RTL-ready); point hreflang at same URL
        // until the /ar tree ships so search engines learn the intent.
        "x-default": url,
      },
    },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
