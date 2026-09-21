/* eslint-disable @typescript-eslint/no-explicit-any */
import { fromCms, mediaUrl } from "@/lib/cms/client";
import {
  services as staticServices,
  serviceSecondaryKeywords,
  type Service,
} from "@/content/services";

/** Service shape used by the site, plus CMS-managed secondary keywords. */
export type CmsService = Service & { secondaryKeywords: string[] };

function mapDoc(doc: any): CmsService {
  return {
    slug: doc.slug,
    name: doc.name,
    h1: doc.h1,
    metaTitle: doc.meta?.title || doc.name,
    metaDescription: doc.meta?.description || doc.excerpt || "",
    eyebrow: doc.eyebrow || "",
    primaryKeyword: doc.primaryKeyword || "",
    icon: doc.icon || "shield",
    excerpt: doc.excerpt || "",
    featured: Boolean(doc.featured),
    image: mediaUrl(doc.image),
    intro: (doc.intro ?? []).map((p: any) => p.paragraph),
    included: (doc.included ?? []).map((i: any) => ({ title: i.title, desc: i.desc })),
    compliance: {
      standards: (doc.complianceStandards ?? []).map((v: any) => v.value),
      brands: (doc.complianceBrands ?? []).map((b: any) => ({
        label: b.label,
        items: (b.items ?? []).map((i: any) => i.value),
      })),
    },
    process: (doc.process ?? []).map((p: any) => ({ title: p.title, desc: p.desc })),
    sectors: (doc.sectors ?? []).map((v: any) => v.value),
    sections: (doc.sections ?? []).map((s: any) => ({
      heading: s.heading,
      body: (s.body ?? []).map((p: any) => p.paragraph),
    })),
    faqs: (doc.faqs ?? []).map((f: any) => ({ q: f.q, a: f.a })),
    related: (doc.related ?? [])
      .map((r: any) => (r && typeof r === "object" ? r.slug : undefined))
      .filter(Boolean),
    secondaryKeywords: (doc.secondaryKeywords ?? []).map((v: any) => v.value),
  };
}

/** Static-content fallback mapped to CmsService. */
function fromStatic(svc: Service): CmsService {
  return { ...svc, secondaryKeywords: serviceSecondaryKeywords[svc.slug] ?? [] };
}
const staticAll = (): CmsService[] => staticServices.map(fromStatic);

export async function getAllServices(): Promise<CmsService[]> {
  return fromCms(async (payload) => {
    const res = await payload.find({ collection: "services", limit: 100, depth: 1, sort: "order" });
    return res.docs.map(mapDoc);
  }, staticAll());
}

export async function getFeaturedServices(): Promise<CmsService[]> {
  const all = await getAllServices();
  const featured = all.filter((s) => s.featured);
  return (featured.length ? featured : all).slice(0, 6);
}

export async function getServiceBySlug(slug: string): Promise<CmsService | undefined> {
  const fallback = staticServices.find((s) => s.slug === slug);
  return fromCms(
    async (payload) => {
      const res = await payload.find({
        collection: "services",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 1,
      });
      return res.docs[0] ? mapDoc(res.docs[0]) : undefined;
    },
    fallback ? fromStatic(fallback) : undefined!,
  );
}

export async function getServiceSlugs(): Promise<string[]> {
  return fromCms(
    async (payload) => {
      const res = await payload.find({
        collection: "services",
        limit: 100,
        depth: 0,
        pagination: false,
      });
      return res.docs.map((d: any) => d.slug as string);
    },
    staticServices.map((s) => s.slug),
  );
}
