/* eslint-disable @typescript-eslint/no-explicit-any */
import { fromCms, mediaUrl } from "@/lib/cms/client";
import { blogPosts as staticPosts, type BlogPost } from "@/content/blog";

const FALLBACK_IMG = "/images/blog-fire-alarm.svg";

function mapDoc(doc: any): BlogPost {
  return {
    slug: doc.slug,
    title: doc.title,
    metaTitle: doc.meta?.title || doc.title,
    metaDescription: doc.meta?.description || doc.excerpt || "",
    excerpt: doc.excerpt || "",
    category: doc.category,
    author: doc.author || "Adam Technical Services",
    datePublished: doc.datePublished || new Date().toISOString(),
    readingMinutes: doc.readingMinutes || 4,
    image: mediaUrl(doc.image) || FALLBACK_IMG,
    imageAlt: doc.image?.alt || doc.title,
    body: (doc.body ?? []).map((s: any) => ({
      heading: s.heading,
      paragraphs: (s.paragraphs ?? []).map((p: any) => p.paragraph),
    })),
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return fromCms(
    async (payload) => {
      const res = await payload.find({
        collection: "posts",
        limit: 100,
        depth: 1,
        sort: "-datePublished",
      });
      return res.docs.map(mapDoc);
    },
    staticPosts as unknown as BlogPost[],
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const fallback = staticPosts.find((p) => p.slug === slug);
  return fromCms(async (payload) => {
    const res = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });
    return res.docs[0] ? mapDoc(res.docs[0]) : undefined;
  }, fallback);
}

export async function getPostSlugs(): Promise<string[]> {
  return fromCms(
    async (payload) => {
      const res = await payload.find({
        collection: "posts",
        limit: 100,
        depth: 0,
        pagination: false,
      });
      return res.docs.map((d: any) => d.slug as string);
    },
    staticPosts.map((p) => p.slug),
  );
}
