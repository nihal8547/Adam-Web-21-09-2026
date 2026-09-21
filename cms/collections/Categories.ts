import type { CollectionConfig } from "payload";
import { slugField } from "@/cms/fields/slug";

/**
 * Categories — group services (and, later, other content). A category can have
 * a `parent`, which makes it a sub-category, giving you a two-level taxonomy
 * (e.g. "Fire Protection" → "Detection"). SEO fields are added by the SEO
 * plugin (see payload.config.ts).
 */
export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "parent", "slug"],
    group: "Content",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name"),
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      admin: {
        position: "sidebar",
        description: "Optional. Set a parent to make this a sub-category.",
      },
      // Prevent a category being its own parent.
      filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
    },
    { name: "description", type: "textarea" },
    { name: "image", type: "upload", relationTo: "media" },
  ],
};
