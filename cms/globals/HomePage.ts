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
              admin: { description: "Poster image / fallback background image." },
            },
            {
              name: "heroVideoFile",
              type: "upload",
              relationTo: "media",
              admin: { description: "Upload hero background video (.mp4, .webm). Takes priority if provided." },
            },
            {
              name: "heroVideo",
              type: "text",
              admin: { description: "Or external / custom path to a background video (e.g. /video.mp4)." },
            },
            {
              name: "heroSlides",
              type: "array",
              labels: { singular: "Additional Slide", plural: "Additional Rotating Slides" },
              admin: {
                description:
                  "Optional extra rotating slides. Slide 1 is automatically fed by Hero H1, Sub, Image & Video above.",
              },
              fields: [
                { name: "line1", type: "text", required: true, admin: { description: "Heading line 1" } },
                { name: "line2", type: "text", admin: { description: "Heading line 2 (optional)" } },
                { name: "sub", type: "textarea", admin: { description: "Description text" } },
                { name: "image", type: "upload", relationTo: "media", admin: { description: "Slide background image (poster if video is used)" } },
                { name: "imagePath", type: "text", admin: { description: "Or public path, e.g. /images/hero-fire-safety.jpg" } },
                { name: "videoFile", type: "upload", relationTo: "media", admin: { description: "Optional background video upload (.mp4, .webm) for this slide" } },
                { name: "videoPath", type: "text", admin: { description: "Or external / public video path for this slide" } },
              ],
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
        {
          label: "Certifications",
          fields: [
            { name: "certEyebrow", type: "text" },
            { name: "certHeading", type: "text" },
            { name: "certDescription", type: "textarea" },
            {
              name: "certDisplayMode",
              type: "select",
              defaultValue: "both",
              options: [
                { label: "Both (Marquee + Cards Grid)", value: "both" },
                { label: "Marquee Strip Only", value: "marquee" },
                { label: "Detailed Cards Grid Only", value: "grid" },
              ],
              admin: {
                description: "Choose how official certifications and logos are presented on the homepage.",
              },
            },
            {
              name: "certifications",
              type: "array",
              admin: {
                description: "Custom official certificates & approval badges. Upload logo images or specify URLs.",
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "badgeCode", type: "text", required: true, admin: { width: "50%", description: "e.g. QCDD GRADE A, NFPA MEMBER, ISO 9001:2015" } },
                    { name: "title", type: "text", admin: { width: "50%", description: "e.g. Qatar Civil Defence Approved Contractor" } },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    { name: "authority", type: "text", admin: { width: "50%", description: "e.g. Ministry of Interior, State of Qatar" } },
                    { name: "status", type: "text", admin: { width: "50%", description: "e.g. Active & Certified, Code Compliant" } },
                  ],
                },
                {
                  name: "scope",
                  type: "textarea",
                  admin: {
                    description: "Accreditation scope or compliance standard details.",
                  },
                },
                {
                  type: "row",
                  fields: [
                    { name: "logo", type: "upload", relationTo: "media", admin: { width: "50%", description: "Upload certificate badge or authority logo" } },
                    { name: "logoUrl", type: "text", admin: { width: "50%", description: "Or direct logo image URL (e.g. /images/...)" } },
                  ],
                },
                {
                  name: "verifyUrl",
                  type: "text",
                  admin: {
                    description: "Optional verification URL or authority page link (e.g. /qatar-civil-defence-department)",
                  },
                },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "certCtaLabel", type: "text", admin: { width: "50%" } },
                { name: "certCtaHref", type: "text", admin: { width: "50%" } },
                { name: "certCtaDesc", type: "text", admin: { width: "100%" } },
              ],
            },
          ],
        },
        {
          label: "Project Gallery",
          fields: [
            { name: "galleryEyebrow", type: "text", defaultValue: "Project Portfolio" },
            { name: "galleryHeading", type: "text", defaultValue: "Fire Protection & MEP Engineering Gallery in Qatar" },
            { name: "galleryDescription", type: "textarea", defaultValue: "Visual showcase of QCDD approved fire alarms, sprinkler systems, pump rooms, HVAC installations, and underground leak detection projects across Doha and Qatar." },
            {
              name: "galleryImages",
              type: "array",
              labels: { singular: "Gallery Image", plural: "Gallery Images" },
              admin: {
                description:
                  "Project gallery items. Provide an image-specific Title and SEO-based Alt text for each photo.",
              },
              fields: [
                {
                  name: "title",
                  type: "text",
                  required: true,
                  admin: {
                    description: "Descriptive image title matching the equipment / engineering project (e.g. UL/FM Certified Fire Fighting Pump Station).",
                  },
                },
                {
                  name: "altText",
                  type: "text",
                  required: true,
                  admin: {
                    description: "SEO-based Alt text describing the image for Google Image Search (e.g. QCDD certified fire pump station installation in Doha Qatar).",
                  },
                },
                { name: "image", type: "upload", relationTo: "media", required: true },
              ],
            },
          ],
        },
        {
          label: "3D Interactive Showcase",
          fields: [
            { name: "showcaseEyebrow", type: "text" },
            { name: "showcaseHeading", type: "text" },
            { name: "showcaseDescription", type: "textarea" },
            {
              name: "showcaseModels",
              type: "array",
              fields: [
                { name: "modelName", type: "text", required: true },
                { name: "modelTitle", type: "text", required: true },
                { name: "modelDescription", type: "textarea" },
                { name: "modelImage", type: "upload", relationTo: "media" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
