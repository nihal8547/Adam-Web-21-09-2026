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
import { Projects } from "@/cms/collections/Projects";
import { Vacancies } from "@/cms/collections/Vacancies";
import { Posts } from "@/cms/collections/Posts";
import { Testimonials } from "@/cms/collections/Testimonials";
import { Clients } from "@/cms/collections/Clients";
import { SiteSettings } from "@/cms/globals/SiteSettings";
import { HomePage } from "@/cms/globals/HomePage";
import { AboutPage, QcddPage, ContactPage } from "@/cms/globals/ContentPages";
import {
  revalidateAfterChange,
  revalidateAfterDelete,
  revalidateGlobalAfterChange,
} from "@/cms/hooks/revalidate";

// SEO defaults: title/description are auto-filled from the content so every
// entry ships with SEO metadata out of the box (editable in the SEO section).
const generateTitle: GenerateTitle = ({ doc }) => {
  const name = doc?.name || doc?.title;
  return name ? `${name} | Adam Technical Services` : "Adam Technical Services";
};
const generateDescription: GenerateDescription = ({ doc }) =>
  doc?.excerpt || doc?.summary || doc?.description || "";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Payload CMS configuration. Self-hosted: PostgreSQL for data, local disk for
 * media (a persistent volume in production), admin panel at /admin.
 *
 * Phase 1: authentication (Users), Media library and Site Settings. Content
 * collections (Categories, Services, Projects, Vacancies, Blog) and the SEO
 * plugin are added in later phases.
 */
// Inject a site-revalidation hook into every content collection/global so
// edits publish to the live site immediately (Users/Media excluded).
/* eslint-disable @typescript-eslint/no-explicit-any */
const withRevalidate = (c: any) => ({
  ...c,
  hooks: {
    ...(c.hooks ?? {}),
    afterChange: [...(c.hooks?.afterChange ?? []), revalidateAfterChange],
    afterDelete: [...(c.hooks?.afterDelete ?? []), revalidateAfterDelete],
  },
});
const withRevalidateGlobal = (g: any) => ({
  ...g,
  hooks: {
    ...(g.hooks ?? {}),
    afterChange: [...(g.hooks?.afterChange ?? []), revalidateGlobalAfterChange],
  },
});

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "· Adam Technical Services",
    },
  },
  collections: [
    Users,
    Media,
    ...[Categories, Services, Projects, Vacancies, Posts, Testimonials, Clients].map(
      withRevalidate,
    ),
  ],
  globals: [SiteSettings, HomePage, AboutPage, QcddPage, ContactPage].map(withRevalidateGlobal),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
  }),
  plugins: [
    seoPlugin({
      collections: ["services", "categories", "projects", "vacancies", "posts"],
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
