import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "@/cms/collections/Users";
import { Media } from "@/cms/collections/Media";
import { SiteSettings } from "@/cms/globals/SiteSettings";

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
  collections: [Users, Media],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  // Keep GraphQL available for future headless use; REST is the default.
  telemetry: false,
});
