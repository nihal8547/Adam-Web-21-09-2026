/* eslint-disable @typescript-eslint/no-explicit-any */
import { fromCms } from "@/lib/cms/client";
import { roles as staticRoles, type Role } from "@/content/careers";

function mapDoc(doc: any): Role {
  return {
    slug: doc.slug,
    title: doc.title,
    department: doc.department || "",
    type: doc.employmentType || "Full-time",
    location: doc.location || "Doha, Qatar",
    summary: doc.summary || "",
    datePosted: doc.datePosted || new Date().toISOString(),
    responsibilities: (doc.responsibilities ?? []).map((v: any) => v.value),
    requirements: (doc.requirements ?? []).map((v: any) => v.value),
  };
}

export async function getAllRoles(): Promise<Role[]> {
  return fromCms(
    async (payload) => {
      const res = await payload.find({ collection: "vacancies", limit: 100, depth: 0 });
      return res.docs.map(mapDoc);
    },
    staticRoles as unknown as Role[],
  );
}

export async function getRoleBySlug(slug: string): Promise<Role | undefined> {
  const fallback = staticRoles.find((r) => r.slug === slug);
  return fromCms(async (payload) => {
    const res = await payload.find({
      collection: "vacancies",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    });
    return res.docs[0] ? mapDoc(res.docs[0]) : undefined;
  }, fallback);
}

export async function getRoleSlugs(): Promise<string[]> {
  return fromCms(
    async (payload) => {
      const res = await payload.find({
        collection: "vacancies",
        limit: 100,
        depth: 0,
        pagination: false,
      });
      return res.docs.map((d: any) => d.slug as string);
    },
    staticRoles.map((r) => r.slug),
  );
}
