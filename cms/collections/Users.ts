import type { CollectionConfig } from "payload";

/**
 * Admin users — Payload's built-in authentication (email + password, sessions,
 * password reset). `role` gates access: admins manage everything incl. users;
 * editors manage content but not other users.
 */
export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 7200, // 2 hours
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000, // 15 minutes lockout
    cookies: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    },
    forgotPassword: {
      expiration: 1800, // 30 minutes reset token expiration
      minRequestInterval: 60, // Minimum 60s between reset requests
    },
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    group: "Admin",
  },
  access: {
    // Only logged in users can access admin panel
    admin: ({ req: { user } }) => Boolean(user),
    // Only admins can create or delete users
    create: ({ req: { user } }) => user?.role === "admin",
    delete: ({ req: { user } }) => user?.role === "admin",
    // Admins can update any user; users can update their own profile
    update: ({ req: { user } }) => {
      if (user?.role === "admin") return true;
      if (user?.id) return { id: { equals: user.id } };
      return false;
    },
    // Admins can list all users; non-admins can only read their own user record
    read: ({ req: { user } }) => {
      if (user?.role === "admin") return true;
      if (user?.id) return { id: { equals: user.id } };
      return false;
    },
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
        // Only admins can set or change roles (prevent privilege escalation)
        create: ({ req: { user } }) => user?.role === "admin",
        update: ({ req: { user } }) => user?.role === "admin",
      },
    },
  ],
};
