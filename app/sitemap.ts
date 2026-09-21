import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { serviceSlugs } from "@/content/services";
import { projectSlugs } from "@/content/projects";
import { blogPosts } from "@/content/blog";
import { roles } from "@/content/careers";

/**
 * Auto-generated sitemap with lastModified + priority. Static marketing pages
 * rank highest; dynamic content uses its real published/updated date so search
 * engines see accurate freshness signals.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: Array<{
    path: string;
    priority: number;
    freq: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/about-us", priority: 0.8, freq: "monthly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/projects", priority: 0.8, freq: "weekly" },
    { path: "/qatar-civil-defence-department", priority: 0.8, freq: "monthly" },
    { path: "/blog", priority: 0.7, freq: "weekly" },
    { path: "/careers", priority: 0.6, freq: "weekly" },
    { path: "/contact-us", priority: 0.7, freq: "monthly" },
    { path: "/request-for-quotation", priority: 0.7, freq: "monthly" },
    { path: "/privacy-policy", priority: 0.3, freq: "yearly" },
    { path: "/terms-of-service", priority: 0.3, freq: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));

  // Service pages — the SEO "spokes", high priority.
  for (const slug of serviceSlugs) {
    entries.push({
      url: absoluteUrl(`/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }
  // Projects.
  for (const slug of projectSlugs) {
    entries.push({
      url: absoluteUrl(`/projects/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  // Blog posts — use each post's published date as lastModified.
  for (const post of blogPosts) {
    entries.push({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.datePublished),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  // Careers — use each role's posted date.
  for (const role of roles) {
    entries.push({
      url: absoluteUrl(`/careers/${role.slug}`),
      lastModified: new Date(role.datePosted),
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  return entries;
}
