import type { CollectionConfig } from "payload";

/** Client testimonials shown in the home slider. */
export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "author",
    defaultColumns: ["author", "role", "heading"],
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
      name: "heading",
      type: "text",
      label: "Title",
      admin: { description: 'Short label, e.g. "Reliable Services".' },
    },
    { name: "quote", type: "textarea", required: true },
    {
      type: "row",
      fields: [
        { name: "author", type: "text", required: true, admin: { width: "50%" } },
        { name: "role", type: "text", admin: { width: "50%" } },
      ],
    },
    { name: "rating", type: "number", min: 1, max: 5, defaultValue: 5 },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      admin: { description: "Optional author photo (shown as circular avatar in slider)." },
    },
    { name: "order", type: "number", admin: { position: "sidebar" } },
  ],
};
