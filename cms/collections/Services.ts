import type { CollectionConfig } from "payload";
import { slugField } from "@/cms/fields/slug";

const ICON_OPTIONS = [
  "shield",
  "bell",
  "pump",
  "sprinkler",
  "layers",
  "droplet",
  "wind",
  "fan",
  "bolt",
].map((v) => ({ label: v, value: v }));

/**
 * Services — the SEO "spoke" pages. Mirrors the typed content model so the site
 * can read services from the CMS. SEO fields (meta title/description/image) are
 * added by the SEO plugin with sensible defaults; primary/secondary keywords
 * live here too.
 */
export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "featured", "slug"],
    group: "Content",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: { description: "Short name (nav/cards)." },
    },
    slugField("name"),
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      admin: { position: "sidebar" },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "Show on the home services grid." },
    },
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Sort order (low = first)." },
    },
    {
      name: "icon",
      type: "select",
      options: ICON_OPTIONS,
      defaultValue: "shield",
      admin: { position: "sidebar" },
    },
    { name: "image", type: "upload", relationTo: "media", admin: { position: "sidebar" } },
    {
      type: "tabs",
      tabs: [
        {
          label: "Overview",
          fields: [
            {
              name: "h1",
              type: "text",
              required: true,
              admin: { description: 'Page H1 (contains the keyword, ends "in Qatar").' },
            },
            { name: "eyebrow", type: "text" },
            {
              name: "excerpt",
              type: "textarea",
              required: true,
              admin: { description: "One-line summary for cards & mega-menu." },
            },
            {
              name: "intro",
              type: "array",
              labels: { singular: "Paragraph", plural: "Paragraphs" },
              fields: [{ name: "paragraph", type: "textarea", required: true }],
            },
          ],
        },
        {
          label: "What's included",
          fields: [
            {
              name: "included",
              type: "array",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "desc", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Compliance",
          fields: [
            {
              name: "complianceStandards",
              type: "array",
              labels: { singular: "Standard", plural: "Standards" },
              fields: [{ name: "value", type: "text", required: true }],
            },
            {
              name: "complianceBrands",
              type: "array",
              labels: { singular: "Brand group", plural: "Brand groups" },
              fields: [
                { name: "label", type: "text", required: true },
                {
                  name: "items",
                  type: "array",
                  fields: [{ name: "value", type: "text", required: true }],
                },
              ],
            },
          ],
        },
        {
          label: "Process & Sectors",
          fields: [
            {
              name: "process",
              type: "array",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "desc", type: "textarea", required: true },
              ],
            },
            {
              name: "sectors",
              type: "array",
              labels: { singular: "Sector", plural: "Sectors" },
              fields: [{ name: "value", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Depth sections",
          fields: [
            {
              name: "sections",
              type: "array",
              fields: [
                { name: "heading", type: "text", required: true },
                {
                  name: "body",
                  type: "array",
                  labels: { singular: "Paragraph", plural: "Paragraphs" },
                  fields: [{ name: "paragraph", type: "textarea", required: true }],
                },
              ],
            },
          ],
        },
        {
          label: "FAQ",
          fields: [
            {
              name: "faqs",
              type: "array",
              labels: { singular: "Q&A", plural: "FAQs" },
              fields: [
                { name: "q", type: "text", required: true },
                { name: "a", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Keywords & Links",
          fields: [
            {
              name: "primaryKeyword",
              type: "text",
              admin: { description: "One primary keyword per page." },
            },
            {
              name: "secondaryKeywords",
              type: "array",
              labels: { singular: "Keyword", plural: "Keywords" },
              fields: [{ name: "value", type: "text", required: true }],
            },
            {
              name: "related",
              type: "relationship",
              relationTo: "services",
              hasMany: true,
              maxDepth: 1,
              admin: { description: "3 sibling services for internal linking." },
            },
          ],
        },
      ],
    },
  ],
};
