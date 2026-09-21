import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import type { GenerateTitle, GenerateDescription } from "@payloadcms/plugin-seo/types";
import sharp from "sharp";

import { Users } from "@/cms/collections/Users";
import { Media } from "@/cms/collections/Media";
import { Categories } from "@/cms/collections/Categories";
import { Services } from "@/cms/collections/Services";
import { SiteSettings } from "@/cms/globals/SiteSettings";

// SEO defaults: title/description are auto-filled from the content so every
// entry ships with SEO metadata out of the box (editable in the SEO section).
const generateTitle: GenerateTitle = ({ doc }) =>
  doc?.name ? `${doc.name} | Adam Technical Services` : "Adam Technical Services";
const generateDescription: GenerateDescription = ({ doc }) =>
  doc?.excerpt || doc?.description || "";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Payload CMS configuration. Self-hosted: PostgreSQL for data, local disk for
 * media (a persistent volume in production), admin panel at /admin.
 *
 * Phase 1: authentication (Users), Media library and Site Settings. Content
 * collections (Categories, Services, Projects, Vacancies, Blog) and the SEO
 * plugin are added in later phases.
 */
export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "· Adam Technical Services",
    },
  },
  collections: [Users, Media, Categories, Services],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
  }),
  plugins: [
    seoPlugin({
      collections: ["services", "categories"],
      uploadsCollection: "media",
      tabbedUI: false,
      generateTitle,
      generateDescription,
    }),
  ],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  // Keep GraphQL available for future headless use; REST is the default.
  telemetry: false,
});
