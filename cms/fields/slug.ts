import type { Field } from "payload";

/** Turn any string into a clean, lowercase, hyphenated URL slug. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * A reusable slug field. Auto-generates from `sourceField` (e.g. "name" or
 * "title") when left blank, but stays editable so existing SEO URLs can be
 * preserved. Unique + indexed so it can drive routing.
 */
export function slugField(sourceField = "name"): Field {
  return {
    name: "slug",
    type: "text",
    required: true,
    unique: true,
    index: true,
    admin: {
      position: "sidebar",
      description: "URL path segment. Leave blank to auto-generate from the title.",
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (typeof value === "string" && value.length > 0) return slugify(value);
          const source = (data?.[sourceField] as string) || "";
          return source ? slugify(source) : value;
        },
      ],
    },
  };
}
