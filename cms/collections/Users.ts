import type { CollectionConfig } from "payload";

/**
 * Admin users — Payload's built-in authentication (email + password, sessions,
 * password reset). `role` gates access: admins manage everything incl. users;
 * editors manage content but not other users.
 */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    group: "Admin",
  },
  access: {
    // Only admins can create/update/delete other users.
    admin: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => user?.role === "admin",
    delete: ({ req: { user } }) => user?.role === "admin",
    update: ({ req: { user } }) => user?.role === "admin",
    read: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Administrator", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      access: {
        // Only admins can change roles.
        update: ({ req: { user } }) => user?.role === "admin",
      },
    },
  ],
};
