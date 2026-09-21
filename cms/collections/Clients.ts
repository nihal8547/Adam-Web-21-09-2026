import type { CollectionConfig } from "payload";

/** Client / partner logos for the home marquee. */
export const Clients: CollectionConfig = {
  slug: "clients",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
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
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: { description: "Client logo (grayscale on the marquee)." },
    },
    { name: "website", type: "text" },
    { name: "order", type: "number", admin: { position: "sidebar" } },
  ],
};
