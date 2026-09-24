import type { GlobalConfig } from "payload";

/**
 * Site Settings — the single source of truth for company-wide data (NAP,
 * contact, hours, socials). Editable in the admin; the frontend reads it for
 * the footer, header, structured data (schema.org) and /llms.txt.
 */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: { group: "Settings" },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Company",
          fields: [
            {
              name: "legalName",
              type: "text",
              required: true,
              defaultValue: "Adam Technical Services",
            },
            { name: "group", type: "text", defaultValue: "Faisal Bin Ejayan Group And Partners" },
            { name: "tagline", type: "text" },
            { name: "description", type: "textarea" },
            { name: "logo", type: "upload", relationTo: "media" },
          ],
        },
        {
          label: "Contact",
          fields: [
            { name: "email", type: "email", required: true },
            { name: "phone", type: "text", label: "Phone (display)" },
            { name: "mobile", type: "text", label: "Mobile / WhatsApp (display)" },
            { name: "fax", type: "text" },
            {
              name: "whatsappNumber",
              type: "text",
              admin: { description: "Digits only, e.g. 97470755220" },
            },
          ],
        },
        {
          label: "Address",
          fields: [
            { name: "addressLine1", type: "text" },
            { name: "addressLine2", type: "text" },
            { name: "city", type: "text", defaultValue: "Doha" },
            { name: "country", type: "text", defaultValue: "Qatar" },
            {
              type: "row",
              fields: [
                { name: "geoLat", type: "number", admin: { width: "50%" } },
                { name: "geoLng", type: "number", admin: { width: "50%" } },
              ],
            },
            {
              name: "mapQuery",
              type: "text",
              admin: { description: "Google Maps search query for the embed." },
            },
          ],
        },
        {
          label: "Hours",
          fields: [
            {
              name: "hours",
              type: "array",
              labels: { singular: "Row", plural: "Rows" },
              fields: [
                { name: "days", type: "text", required: true },
                { name: "time", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "Social",
          fields: [
            { name: "facebook", type: "text" },
            { name: "instagram", type: "text" },
            { name: "linkedin", type: "text" },
            { name: "x", type: "text", label: "X / Twitter" },
          ],
        },
        {
          label: "Splash Screen",
          fields: [
            {
              name: "splashWords",
              type: "array",
              fields: [
                { name: "word", type: "text", required: true },
                { name: "lang", type: "text", required: true },
                { name: "dir", type: "select", options: ["ltr", "rtl"], defaultValue: "ltr", required: true },
              ]
            },
            { name: "splashStepMs", type: "number", defaultValue: 220, admin: { description: "Time each word shows (ms)" } },
          ]
        },
      ],
    },
  ],
};
