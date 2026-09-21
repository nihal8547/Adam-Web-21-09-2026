import type { CollectionConfig } from "payload";
import { slugField } from "@/cms/fields/slug";

const CATEGORIES = ["Fire Safety", "HVAC & ACMV", "Compliance", "Leak Detection"].map((v) => ({
  label: v,
  value: v,
}));

/**
 * Blog posts. Body is structured into heading + paragraph sections so the
 * public page can build a table of contents and Article schema. SEO fields
 * added by the SEO plugin.
 */
export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Blog post", plural: "Blog posts" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "datePublished", "slug"],
    group: "Content",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    {
      type: "row",
      fields: [
        {
          name: "category",
          type: "select",
          options: CATEGORIES,
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "author",
          type: "text",
          defaultValue: "Adam Technical Services",
          admin: { width: "50%" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "datePublished",
          type: "date",
          admin: { width: "50%", date: { pickerAppearance: "dayOnly" } },
        },
        { name: "readingMinutes", type: "number", admin: { width: "50%" } },
      ],
    },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "excerpt", type: "textarea", required: true },
    {
      name: "body",
      type: "array",
      labels: { singular: "Section", plural: "Sections" },
      fields: [
        { name: "heading", type: "text", required: true },
        {
          name: "paragraphs",
          type: "array",
          fields: [{ name: "paragraph", type: "textarea", required: true }],
        },
      ],
    },
  ],
};
