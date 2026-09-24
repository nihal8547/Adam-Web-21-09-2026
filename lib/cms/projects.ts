/* eslint-disable @typescript-eslint/no-explicit-any */
import { fromCms, mediaUrl } from "@/lib/cms/client";
import { projects as staticProjects, type Project } from "@/content/projects";

const FALLBACK_IMG = "/images/project-commercial.svg";

function mapDoc(doc: any): Project {
  const used = (doc.servicesUsed ?? [])
    .map((s: any) => (s && typeof s === "object" ? s.slug : undefined))
    .filter(Boolean);
  return {
    slug: doc.slug,
    title: doc.title,
    sector: doc.sector,
    service: doc.serviceLabel || "",
    serviceSlug: used[0] || "",
    location: doc.location || "",
    summary: doc.summary || "",
    image: mediaUrl(doc.image) || FALLBACK_IMG,
    imageAlt: doc.image?.alt || doc.title,
    challenge: doc.challenge || "",
    solution: doc.solution || "",
    outcome: doc.outcome || "",
    servicesUsed: used,
    featured: Boolean(doc.featured),
    gallery: (doc.gallery ?? [])
      .map((g: any) => ({ src: mediaUrl(g.image), alt: g.alt || doc.title }))
      .filter((g: any) => g.src),
  };
}

export async function getAllProjects(): Promise<Project[]> {
  return fromCms(
    async (payload) => {
      const res = await payload.find({ collection: "projects", limit: 100, depth: 1, sort: "order" });
      return res.docs.map(mapDoc);
    },
    staticProjects as unknown as Project[],
  );
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getAllProjects();
  const featured = all.filter((p) => (p as any).featured);
  return featured.length ? featured : all.slice(0, 6);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const fallback = staticProjects.find((p) => p.slug === slug);
  return fromCms(async (payload) => {
    const res = await payload.find({
      collection: "projects",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });
    return res.docs[0] ? mapDoc(res.docs[0]) : undefined;
  }, fallback);
}

export async function getProjectSlugs(): Promise<string[]> {
  return fromCms(
    async (payload) => {
      const res = await payload.find({
        collection: "projects",
        limit: 100,
        depth: 0,
        pagination: false,
      });
      return res.docs.map((d: any) => d.slug as string);
    },
    staticProjects.map((p) => p.slug),
  );
}
