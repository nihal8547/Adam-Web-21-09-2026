import type { GlobalConfig } from "payload";

const ICON_OPTIONS = ["shield", "clock", "grid", "team", "support", "droplet", "wind", "bolt"].map(
  (v) => ({ label: v, value: v }),
);

/**
 * Home page content — every hero/section heading, paragraph and image on the
 * home page is editable here. Images use the Media library; the hero can use a
 * background video (path) or the poster image.
 */
export const HomePage: GlobalConfig = {
  slug: "home",
  label: "Home Page",
  admin: { group: "Pages" },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "heroEyebrow", type: "text" },
            { name: "heroH1", type: "text", required: true },
            { name: "heroSub", type: "textarea" },
            {
              type: "row",
              fields: [
                { name: "primaryCtaLabel", type: "text", admin: { width: "50%" } },
                { name: "primaryCtaHref", type: "text", admin: { width: "50%" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "secondaryCtaLabel", type: "text", admin: { width: "50%" } },
                { name: "secondaryCtaHref", type: "text", admin: { width: "50%" } },
              ],
            },
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              admin: { description: "Poster image / hero background." },
            },
            {
              name: "heroVideo",
              type: "text",
              admin: { description: "Optional /public path to a background video (.mp4)." },
            },
            {
              name: "quickAccess",
              type: "array",
              maxRows: 3,
              fields: [
                { name: "icon", type: "select", options: ICON_OPTIONS, defaultValue: "shield" },
                { name: "label", type: "text", required: true },
                { name: "sub", type: "text" },
                { name: "href", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Stat band",
          fields: [
            {
              name: "stats",
              type: "array",
              fields: [
                {
                  name: "text",
                  type: "text",
                  admin: {
                    description:
                      "Use for non-numeric values (e.g. QCDD, 24/7). Overrides the number.",
                  },
                },
                {
                  type: "row",
                  fields: [
                    { name: "value", type: "number", admin: { width: "34%" } },
                    { name: "prefix", type: "text", admin: { width: "33%" } },
                    { name: "suffix", type: "text", admin: { width: "33%" } },
                  ],
                },
                { name: "label", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "Who We Are",
          fields: [
            { name: "whoEyebrow", type: "text" },
            { name: "whoHeading", type: "text" },
            {
              name: "whoBody",
              type: "array",
              fields: [{ name: "paragraph", type: "textarea", required: true }],
            },
            { name: "whoImage", type: "upload", relationTo: "media" },
          ],
        },
        {
          label: "What Makes Us Better",
          fields: [
            {
              name: "differentiators",
              type: "array",
              fields: [
                { name: "icon", type: "select", options: ICON_OPTIONS, defaultValue: "team" },
                { name: "title", type: "text", required: true },
                { name: "desc", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Credibility & QCDD",
          fields: [
            { name: "credibilityQuote", type: "textarea" },
            { name: "qcddEyebrow", type: "text" },
            { name: "qcddHeading", type: "text" },
            { name: "qcddBody", type: "textarea" },
            {
              type: "row",
              fields: [
                { name: "qcddCtaLabel", type: "text", admin: { width: "50%" } },
                { name: "qcddCtaHref", type: "text", admin: { width: "50%" } },
              ],
            },
          ],
        },
        {
          label: "Feature blocks",
          fields: [
            {
              name: "featureBlocks",
              type: "array",
              fields: [
                { name: "eyebrow", type: "text" },
                { name: "heading", type: "text", required: true },
                {
                  name: "body",
                  type: "array",
                  fields: [{ name: "paragraph", type: "textarea", required: true }],
                },
                {
                  name: "bullets",
                  type: "array",
                  fields: [{ name: "value", type: "text", required: true }],
                },
                { name: "image", type: "upload", relationTo: "media" },
                {
                  type: "row",
                  fields: [
                    { name: "ctaLabel", type: "text", admin: { width: "50%" } },
                    { name: "ctaHref", type: "text", admin: { width: "50%" } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
