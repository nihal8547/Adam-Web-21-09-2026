/* eslint-disable @typescript-eslint/no-explicit-any */
import { fromCms, mediaUrl } from "@/lib/cms/client";
import { projects as staticProjects, type Project } from "@/content/projects";

const FALLBACK_IMG = "/images/project-commercial.svg";

function mapDoc(doc: any): Project {
  const used = (doc.servicesUsed ?? [])
    .map((s: any) => (s && typeof s === "object" ? s.slug : undefined))
    .filter(Boolean);
  const fallback = staticProjects.find((p) => p.slug === doc.slug);
  return {
    slug: doc.slug,
    title: doc.title || fallback?.title || "",
    sector: doc.sector || fallback?.sector || "Commercial",
    service: doc.serviceLabel || fallback?.service || "",
    serviceSlug: used[0] || fallback?.serviceSlug || "",
    location: doc.location || fallback?.location || "",
    summary: doc.summary || fallback?.summary || "",
    image: mediaUrl(doc.image) || fallback?.image || FALLBACK_IMG,
    imageAlt: doc.image?.alt || fallback?.imageAlt || doc.title,
    challenge: doc.challenge || fallback?.challenge || "",
    solution: doc.solution || fallback?.solution || "",
    outcome: doc.outcome || fallback?.outcome || "",
    servicesUsed: used.length ? used : (fallback?.servicesUsed || []),
    featured: Boolean(doc.featured ?? fallback?.featured),
    gallery: (doc.gallery ?? [])
      .map((g: any) => ({ src: mediaUrl(g.image), alt: g.alt || doc.title }))
      .filter((g: any) => g.src),
  };
}

export async function getAllProjects(): Promise<Project[]> {
  return fromCms(
    async (payload) => {
      const res = await payload.find({ collection: "projects", limit: 100, depth: 2, sort: "order" });
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
      depth: 2,
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
