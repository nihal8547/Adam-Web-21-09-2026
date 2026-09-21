import type { CollectionConfig } from "payload";
import { slugField } from "@/cms/fields/slug";

const SECTORS = ["Residential", "Commercial", "Industrial", "Warehouse", "High-rise"].map((v) => ({
  label: v,
  value: v,
}));

/**
 * Projects — case studies (challenge / solution / outcome), filterable by
 * sector and service. SEO fields added by the SEO plugin.
 */
export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "sector", "serviceLabel", "slug"],
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
          name: "sector",
          type: "select",
          options: SECTORS,
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "serviceLabel",
          type: "text",
          label: "Service",
          admin: { width: "50%", description: "Primary service label (e.g. Fire Protection)." },
        },
      ],
    },
    { name: "location", type: "text" },
    { name: "summary", type: "textarea", required: true },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "challenge", type: "textarea" },
    { name: "solution", type: "textarea" },
    { name: "outcome", type: "textarea" },
    {
      name: "servicesUsed",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
      admin: { description: "Services delivered on this project." },
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true },
        { name: "alt", type: "text" },
      ],
    },
  ],
};
