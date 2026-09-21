# Adam Technical Services — Corporate Website

A production-ready, SEO-optimised corporate website for **Adam Technical Services**, a
QCDD-certified fire protection and MEP contractor in Doha, Qatar.

Built with **Next.js 15 (App Router, TypeScript strict)**, **Tailwind CSS v4** with a custom
design-token theme, self-hosted fonts via `next/font`, and static generation (SSG) for marketing
pages with ISR for Blog, Projects and Careers.

---

## 1. Tech stack

| Area            | Choice                                                                       |
| --------------- | ---------------------------------------------------------------------------- |
| Framework       | Next.js 15 (App Router), React 19, TypeScript (strict)                       |
| Styling         | Tailwind CSS v4 (`@theme` tokens in `app/globals.css`)                       |
| Fonts           | `next/font` self-hosted — Sora (display) + Inter (body)                      |
| Rendering       | SSG for marketing pages; ISR (`revalidate = 3600`) for blog/projects/careers |
| Images          | `next/image` (AVIF/WebP), priority hero, explicit dimensions                 |
| Forms           | Route Handler `app/api/contact` + Resend/SMTP, honeypot + rate limit         |
| Structured data | JSON-LD via `components/JsonLd.tsx` + `lib/jsonld.ts`                        |
| Deploy target   | Vercel, Node 20+                                                             |

---

## 2. Getting started

```bash
npm install
cp .env.example .env.local   # optional — site builds & renders without it
npm run dev                  # http://localhost:3000
```

Scripts:

```bash
npm run dev            # dev server
npm run build          # production build
npm run start          # serve the production build
npm run lint           # ESLint (next/core-web-vitals + typescript + prettier)
npm run format         # Prettier write
npm run format:check   # Prettier check

# Backend / CMS admin (needs Docker running):
npm run setup          # create .env + start the dev database
npm run db:up          # start the dev PostgreSQL (Docker)
npm run db:down        # stop it
npm run seed           # import content + create the first admin (run dev first)
```

Node 20+ required (developed on Node 22).

### Admin / CMS at `/admin`

The public site runs with no database (it falls back to the typed `/content`
files), but the **Payload admin at `/admin` needs PostgreSQL**. To use it
locally, with **Docker running**:

```bash
npm run setup          # writes .env + starts the dev database
npm run dev            # http://localhost:3000/admin
npm run seed           # first time: content + admin (admin@adam.qa / changeme123)
```

If `/admin` shows **"Application error"** it means the database isn't reachable
— run `npm run db:up` (start Docker Desktop first). Full guide: `docs/CMS.md`.
Payload manages its own schema via the `@payloadcms/db-postgres` adapter — no
Prisma or manual migrations.

---

## 3. Environment variables

All optional — see `.env.example`. Without them the site builds and the forms succeed by logging
the submission server-side (so previews work). For production set:

- `NEXT_PUBLIC_SITE_URL` — canonical origin (e.g. `https://www.adam.qa`), used for canonicals,
  sitemap, robots and OG image URLs.
- `RESEND_API_KEY` **or** `SMTP_*` — email delivery for the contact/RFQ/careers forms.
- `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` — where submissions are delivered / sent from.

---

## 4. Content editing guide

All content lives in typed files under **`/content`** so it can later swap to a headless CMS
(Sanity / Payload) without touching components.

| File                      | What it holds                                                     |
| ------------------------- | ----------------------------------------------------------------- |
| `content/site.ts`         | NAP (name/address/phone), nav, socials, hours, trust badges       |
| `content/company.ts`      | Home / About / QCDD marketing copy blocks, stats, process         |
| `content/services.ts`     | The 9 services (copy, included, compliance, process, FAQs, links) |
| `content/projects.ts`     | Project case studies (challenge/solution/outcome)                 |
| `content/blog.ts`         | Blog posts (sections, category, author, reading time)             |
| `content/careers.ts`      | Culture + open roles                                              |
| `content/testimonials.ts` | Testimonials                                                      |
| `content/clients.ts`      | Client/partner logos                                              |

**To add a service:** append an object to `services` in `content/services.ts`, create a thin page
at `app/<slug>/page.tsx` (copy an existing one — they all delegate to `ServiceDetailTemplate`), and
add the redirect if replacing a legacy URL in `next.config.ts`.

**To add a blog post / project / role:** append to the relevant content array — the list page,
detail page, sitemap and JSON-LD update automatically (ISR revalidates hourly).

---

## 5. Design system

Tokens are defined once in `app/globals.css` under `@theme` and semantic `:root` roles
(with dark-mode overrides). Key rules baked in:

- **Colour ratio** ~70% white/off-white, ~20% ink, ~10% gold. Gold is an accent only.
- **Accessibility:** gold buttons use gold fill + `--ink-900` text (never white on gold, which
  fails contrast). Body copy is `--ink-500/700` on white. Focus rings are 2px gold at 2px offset.
- **Motif:** gold eyebrow + 3px gold rule; gold left-border on service cards animating to a full
  tint on hover.
- **Motion:** 200–300ms ease-out; everything respects `prefers-reduced-motion`.

---

## 6. SEO

- **Metadata API** on every route (unique `<title>` < 60, description < 155, canonical,
  OpenGraph + Twitter, 1200×630 OG image via `app/og`). Helper: `lib/seo.ts` → `buildMetadata()`.
- **`generateMetadata()`** on all dynamic routes (blog, projects, careers).
- **`app/sitemap.ts`** (auto, lastModified + priority) and **`app/robots.ts`**.
- **Structured data (JSON-LD):** Organization + LocalBusiness + WebSite on the shell;
  BreadcrumbList sitewide; Service + FAQPage on service pages; FAQPage on About & QCDD;
  Article on blog posts; JobPosting on careers. Validate in Google's Rich Results Test.
- **Semantic HTML:** one `<h1>`/page, logical `h2→h3`, `<nav>`, `<main>`, `<article>`, `<address>`,
  descriptive `alt` on every image, visible breadcrumbs on all non-home pages.
- **Silo internal linking:** hub → spokes → hub, plus 3 sibling links per service page.

### SEO launch checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production origin.
- [ ] Replace placeholder imagery (see §8) and add real `og:image` photography if desired.
- [ ] Validate every JSON-LD type in the Rich Results Test.
- [ ] Submit `sitemap.xml` in Google Search Console; confirm `robots.txt`.
- [ ] Verify all legacy → new 301s resolve (see §7).
- [ ] Run Lighthouse (targets: ≥95 Perf / 100 SEO / ≥95 A11y / ≥95 Best Practices).
- [ ] Confirm the single sitewide NAP matches the Google Business Profile exactly (see §9).

---

## 7. Redirects map (legacy → new)

Configured in `next.config.ts` (`redirects()`), all **301 permanent**:

| Legacy path            | New path                                              |
| ---------------------- | ----------------------------------------------------- |
| `/acmv-services-qatar` | `/acmv-system-company-in-qatar` (canonical)           |
| `/home`                | `/`                                                   |
| `/about`               | `/about-us`                                           |
| `/contact`             | `/contact-us`                                         |
| `/fire-protection`     | `/fire-protection-services-qatar`                     |
| `/fire-alarm`          | `/fire-alarm-system-installation-maintenance`         |
| `/fire-pump`           | `/fire-fighting-pump-qatar`                           |
| `/fire-sprinkler`      | `/fire-sprinkler-system-qatar`                        |
| `/fire-stop`           | `/fire-stop-insulation-technologies-services-qatar`   |
| `/leak-detection`      | `/underground-leakage-detection-system-service-qatar` |
| `/hvac`                | `/hvac-services-qatar`                                |
| `/electrical`          | `/electrical-services-qatar`                          |
| `/qcdd`                | `/qatar-civil-defence-department`                     |
| `/rfq`, `/quote`       | `/request-for-quotation`                              |

Add any additional legacy URLs from the old `demo.adam.qa` site to the `legacyRedirects` array.

---

## 8. Content to supply before launch (placeholders in place)

The following are **on-brand placeholders** — replace with real, client-approved assets/content.
None fabricate statistics, client names, certifications or testimonials beyond the project brief.

- **Imagery** (`/public/images/*.svg`, `/public/logo.svg`): generated placeholder artwork. Replace
  with real photography (raster AVIF/WebP recommended) and the official logo. Then remove
  `dangerouslyAllowSVG` from `next.config.ts` if no longer needed.
- **Hero background (video or photo)**: the homepage hero (`components/Hero.tsx`) is driven by
  `hero.media` in `content/company.ts`. Drop an `.mp4`/`.webm` into `/public` and set
  `media.video` to play a muted, looping background video; leave it `""` to show `media.poster`
  (the image) only. The poster is always the LCP image / video first frame. The `<h1>` stays real
  text over the media (not baked into the image) so hero SEO is preserved.
- **Service tile images** (`content/services.ts` → each service's optional `image`): the homepage
  service tiles and projects use the NAFFCO-style overlay-on-image treatment; set a per-service
  `image` path to use real photography, otherwise a branded gold/ink gradient is shown.
- **Client logos** (`content/clients.ts`): 19 neutral placeholders — swap in real client logos.
- **Projects** (`content/projects.ts`): representative case studies with no real client names or
  invented metrics — replace with real case studies.
- **Careers** (`content/careers.ts`): representative roles — replace with live vacancies.
- **Testimonials** (`content/testimonials.ts`): only the one testimonial from the brief is
  included. Add more real testimonials (do not invent).
- **Legal pages**: `privacy-policy` and `terms-of-service` are templates — have them reviewed by
  legal counsel.

---

## 9. Data conflicts to resolve (flagged from the brief)

⚠️ **Address conflict.** The verified business data lists **Suhaim Tower, 6th Floor, Office 604,
C Ring Road, Al Sadd, Doha** — used sitewide in this build. The legacy site's map embed instead
pointed to **Office 207, 2nd Floor, Retaj Bin Mahmoud Offices, Doha**. These conflict. Confirm the
correct address with the client and ensure it is **identical to the Google Business Profile** before
launch. Update it once in `content/site.ts` (`address`, `geo`, `mapQuery`) and it propagates
everywhere (NAP, footer, LocalBusiness schema, map).

Other verified data used as-is: phone `+974 4140 0922`, mobile `+974 7075 5220`,
fax `+974 4142 2911`, email `info@adam.qa`, hours (Sat–Wed 08:00–17:00 · Thu 08:00–14:00 · Fri
closed).

---

## 10. Deployment (Vercel)

1. Push to GitHub and import the repo in Vercel.
2. Set the environment variables from §3 (at minimum `NEXT_PUBLIC_SITE_URL`).
3. Framework preset: **Next.js**. Build command `next build` (default). Node 20+.
4. Deploy. ISR pages revalidate every hour automatically.

---

## 11. Project structure

```
app/                 # routes (App Router) + sitemap.ts, robots.ts, og/, api/contact
components/          # Header, MegaMenu (PrimaryNav), Hero, ServiceCard, Accordion, …
content/             # typed content data (CMS-ready)
lib/                 # seo.ts (metadata), jsonld.ts (schema), cn.ts
public/              # logo, favicon, placeholder imagery
```

Client components (`"use client"`) are limited to the interactive nav, forms, accordion,
counters, sliders, filters and the lazy map — everything else is a Server Component.
