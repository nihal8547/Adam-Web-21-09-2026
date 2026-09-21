import type { GlobalConfig } from "payload";

const readPublic = {
  read: () => true,
  update: ({ req: { user } }: { req: { user: unknown } }) => Boolean(user),
};
const paragraphs = (name: string) => ({
  name,
  type: "array" as const,
  fields: [{ name: "paragraph", type: "textarea" as const, required: true }],
});
const qa = (name: string) => ({
  name,
  type: "array" as const,
  labels: { singular: "Q&A", plural: "FAQs" },
  fields: [
    { name: "q", type: "text" as const, required: true },
    { name: "a", type: "textarea" as const, required: true },
  ],
});

/** About page content (hero, story, mission, vision, why-choose-us FAQ). */
export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About Page",
  admin: { group: "Pages" },
  access: readPublic,
  fields: [
    { name: "heroEyebrow", type: "text" },
    { name: "heroHeading", type: "text" },
    { name: "heroBody", type: "textarea" },
    { name: "storyHeading", type: "text" },
    paragraphs("storyBody"),
    {
      type: "row",
      fields: [
        { name: "missionHeading", type: "text", admin: { width: "50%" } },
        { name: "visionHeading", type: "text", admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "missionBody", type: "textarea", admin: { width: "50%" } },
        { name: "visionBody", type: "textarea", admin: { width: "50%" } },
      ],
    },
    qa("whyChooseUs"),
  ],
};

/** QCDD license-renewal page content. */
export const QcddPage: GlobalConfig = {
  slug: "qcdd-page",
  label: "QCDD Page",
  admin: { group: "Pages" },
  access: readPublic,
  fields: [
    paragraphs("intro"),
    { name: "checklist", type: "array", fields: [{ name: "value", type: "text", required: true }] },
    {
      name: "timeline",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
      ],
    },
    qa("faqs"),
  ],
};

/** Contact page extras (the "International way of working" trio). */
export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Contact Page",
  admin: { group: "Pages" },
  access: readPublic,
  fields: [
    { name: "internationalEyebrow", type: "text" },
    { name: "internationalHeading", type: "text" },
    {
      name: "internationalItems",
      type: "array",
      maxRows: 3,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
      ],
    },
  ],
};
