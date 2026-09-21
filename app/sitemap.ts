import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getServiceSlugs } from "@/lib/cms/services";
import { getProjectSlugs } from "@/lib/cms/projects";
import { getAllPosts } from "@/lib/cms/blog";
import { getAllRoles } from "@/lib/cms/careers";

/**
 * Auto-generated sitemap with lastModified + priority. Slugs come from the CMS
 * (with a fallback to the typed content) so new services/projects/posts/roles
 * appear automatically. Blog/careers use their real published/posted dates.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const [serviceSlugs, projectSlugs, posts, roles] = await Promise.all([
    getServiceSlugs(),
    getProjectSlugs(),
    getAllPosts(),
    getAllRoles(),
  ]);

  const entries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));

  for (const slug of serviceSlugs) {
    entries.push({
      url: absoluteUrl(`/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }
  for (const slug of projectSlugs) {
    entries.push({
      url: absoluteUrl(`/projects/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const post of posts) {
    entries.push({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.datePublished),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
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
