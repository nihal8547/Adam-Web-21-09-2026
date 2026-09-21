import type { CollectionConfig } from "payload";
import { slugField } from "@/cms/fields/slug";

const TYPES = ["Full-time", "Part-time", "Contract", "Internship"].map((v) => ({
  label: v,
  value: v,
}));

/**
 * Vacancies — open roles (careers). Emits JobPosting-friendly data; SEO fields
 * added by the SEO plugin.
 */
export const Vacancies: CollectionConfig = {
  slug: "vacancies",
  labels: { singular: "Vacancy", plural: "Vacancies" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "department", "employmentType", "location"],
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
        { name: "department", type: "text", admin: { width: "34%" } },
        {
          name: "employmentType",
          type: "select",
          options: TYPES,
          defaultValue: "Full-time",
          admin: { width: "33%" },
        },
        { name: "location", type: "text", defaultValue: "Doha, Qatar", admin: { width: "33%" } },
      ],
    },
    { name: "datePosted", type: "date", admin: { date: { pickerAppearance: "dayOnly" } } },
    { name: "summary", type: "textarea", required: true },
    {
      name: "responsibilities",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "requirements",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
  ],
};
