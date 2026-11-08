# SECURITY REMEDIATION LOG
**Project:** Adam Technical Services Website & Admin Panel (Next.js 15 + Payload CMS 3.90)  
**Date:** 2026-11-09  
**Auditor:** Senior Application Security & DevSecOps Engineer  
**Status:** All Target Vulnerabilities Remediated & Hardened  

---

## Remediation Summary Table

| Finding ID | Component | Severity | Description | Status |
|---|---|---|---|---|
| **VULN-001** | `app/(payload)/api/seed/route.ts` | **CRITICAL** | Insecure GET method handler & timing attack vulnerability allowing unauthorized re-seeding / schema push | **FIXED & VERIFIED** |
| **VULN-002** | `cms/collections/Media.ts` | **HIGH** | Stored XSS via wildcard MIME type (`image/*` allowing SVGs) & missing upload file size restrictions | **FIXED & VERIFIED** |
| **VULN-003** | `cms/collections/Users.ts` | **HIGH** | Broken Object Level Authorization (BOLA), user enumeration by editors, and default weak auth configuration | **FIXED & VERIFIED** |
| **VULN-004** | `app/(payload)/api/graphql-playground/route.ts` | **HIGH** | GraphQL Playground exposed publicly in production environments without authorization | **FIXED & VERIFIED** |
| **VULN-005** | `app/api/contact/route.ts` | **MEDIUM** | In-memory rate-limiter unbounded memory leak (DoS), CRLF header injection in email subjects, unvalidated inputs, and PII in stdout logs | **FIXED & VERIFIED** |
| **VULN-006** | `next.config.ts` | **MEDIUM** | Missing Content-Security-Policy (CSP), COOP, and defense-in-depth security headers on HTTP responses | **FIXED & VERIFIED** |
| **VULN-007** | `app/robots.ts` | **MEDIUM** | Administrative routes (`/admin/`) missing from `disallow` list, allowing search engines to index login portal | **FIXED & VERIFIED** |
| **VULN-008** | `.gitignore` & `.dockerignore` | **MEDIUM** | Database dumps and media archive files (`/backups`) not excluded from git or docker builds | **FIXED & VERIFIED** |
| **VULN-009** | `deploy/*.nginx.conf` | **LOW** | Missing server token suppression and dotfile (`.git`, `.env`) access denial blocks | **FIXED & VERIFIED** |
| **VULN-010** | `app/global-error.tsx` | **MEDIUM** | Information leakage: raw database connection errors, stack traces, and setup commands exposed to visitors | **FIXED & VERIFIED** |
| **VULN-011** | `payload.config.ts` | **MEDIUM** | Missing `cors`, `csrf`, and `serverURL` allowlist configuration in CMS setup | **FIXED & VERIFIED** |
| **VULN-012** | `docker-compose.dev.yml` | **MEDIUM** | Development PostgreSQL port bound to `0.0.0.0` exposing DB to local area network | **FIXED & VERIFIED** |
| **VULN-013** | `next.config.ts` | **LOW** | CI/CD build misconfiguration: `ignoreDuringBuilds` and `ignoreBuildErrors` masking linter and type errors | **FIXED & VERIFIED** |

---

## Detailed Modifications

### 1. File: `app/(payload)/api/seed/route.ts`
- **Vulnerability**: 
  - Accepted `GET` requests to trigger database schema push and content re-seeding.
  - Secret token extracted exclusively from URL query parameters (`?secret=...`), exposing credentials in access logs, proxy caches, and `Referer` headers.
  - String comparison used `secret !== guard`, vulnerable to timing attacks.
- **Remediation**:
  - Replaced `GET` handler with HTTP 405 Method Not Allowed (`Allow: POST`).
  - Implemented `crypto.timingSafeEqual` with buffer length checking in `safeCompare()`.
  - Added support for reading credentials from `Authorization: Bearer <secret>` and `X-Seed-Secret` headers before query string fallback.
- **Supporting Updates**:
  - Updated `scripts/seed.mjs` and `docker-entrypoint.sh` to pass the secret securely via `Authorization: Bearer <secret>` header.

---

### 2. File: `cms/collections/Media.ts`
- **Vulnerability**:
  - Allowed wildcard `"image/*"`, permitting malicious `.svg` files with embedded scripts (`<script>`, `onload=...`) that execute arbitrary JavaScript when requested directly (Stored XSS).
  - No file size limits in collection options, allowing disk exhaustion DoS.
- **Remediation**:
  - Whitelisted strict, safe MIME types: `["image/jpeg", "image/png", "image/webp", "image/avif", "application/pdf"]`.
  - Added `beforeValidate` hook enforcing a hard 10MB ceiling on uploaded files.

---

### 3. File: `cms/collections/Users.ts`
- **Vulnerability**:
  - `access.read` allowed any authenticated user (including low-privilege `editor` users) to read all user records, emails, roles, and account metadata.
  - `access.update` was restricted to admins, preventing editors from updating their own passwords/profiles, while the `role` field lacked `create` access restrictions.
  - Relied on default `auth: true` without explicit session durations, cookie flags, or lockout policies.
- **Remediation**:
  - Hardened `access.read`: Admins can read all users; editors can only read their own user record (`{ id: { equals: user.id } }`).
  - Hardened `access.update`: Users can update their own account details, but `role` field has explicit `create: admin` and `update: admin` field-level guards to prevent privilege escalation.
  - Configured explicit `auth` parameters:
    - 5 max login attempts with 15-minute lockout (`lockTime: 900000`).
    - 2-hour token expiration (`tokenExpiration: 7200`).
    - `secure: true` in production and `sameSite: "lax"` cookie flags.
    - Password reset token validity limited to 30 minutes with a 60-second rate-limit interval.

---

### 4. File: `app/(payload)/api/graphql-playground/route.ts`
- **Vulnerability**:
  - Exposed GraphQL Playground in production, allowing unauthenticated attackers to introspect the schema and test unauthorized queries.
- **Remediation**:
  - Wrapped `GET` handler to return HTTP 404 Not Found when `NODE_ENV === "production"`, unless explicitly enabled via `ENABLE_GRAPHQL_PLAYGROUND=true`.

---

### 5. File: `app/api/contact/route.ts`
- **Vulnerability**:
  - In-memory `hits` Map had no expiration pruning or size bounds, causing an unbounded memory leak and process crash under sustained request volume.
  - Missing field length constraints on `name`, `email`, `phone`, `service`, `message`.
  - Single-line fields interpolated directly into email subject lines without CRLF sanitization, allowing SMTP header injection.
  - `cv` file upload had no file size or extension checking.
  - User PII was logged to console in cleartext.
- **Remediation**:
  - Added bounded LRU-style pruning (`pruneOldHits`) when `hits` exceeds 5,000 entries.
  - Sanitized IP representations.
  - Added strict character length limits (`name: 100`, `email: 100`, `phone: 30`, `service: 100`, `subjectPrefix: 100`, `message: 5000`).
  - Added `sanitizeHeader()` to strip carriage returns (`\r`), line feeds (`\n`), and tabs from subject parameters.
  - Enforced 5MB file size limit on CV uploads and rejected executable/script extensions (`.exe`, `.sh`, `.bat`, `.cmd`, `.js`, `.vbs`, `.ps1`, `.svg`, `.htm`, `.html`, `.php`, `.dll`).
  - Replaced PII logging with safe operational event logs.

---

### 6. File: `next.config.ts`
- **Vulnerability**:
  - Missing Content Security Policy (CSP) on HTML page responses.
  - Missing cross-origin protection headers.
- **Remediation**:
  - Implemented comprehensive `Content-Security-Policy` header allowing necessary first-party resources, Next.js inline styles/scripts, and Chatbase widget resources.
  - Added `Cross-Origin-Opener-Policy: same-origin-allow-popups`.
  - Added `X-Permitted-Cross-Domain-Policies: none`.
  - Kept HSTS, `X-Content-Type-Options: nosniff`, and `X-Frame-Options: SAMEORIGIN`.

---

### 7. File: `app/robots.ts`
- **Vulnerability**:
  - Allowed search engines and automated crawlers to discover and index `/admin/` routes.
- **Remediation**:
  - Added `/admin/` and `/admin/*` to the `disallow` array across all crawler user agents.

---

### 8. Files: `.gitignore` and `.dockerignore`
- **Vulnerability**:
  - `./backups` directory created by `deploy/backup.sh` was not excluded, risking accidental commitment of database dumps and customer data into git or container layers.
- **Remediation**:
  - Added `/backups`, `backups/`, `*.sql`, `*.sql.gz`, and `*.tgz` to both `.gitignore` and `.dockerignore`.

---

### 9. Files: `deploy/adamtest.webbea.qa.nginx.conf` and `deploy/nginx.conf.sample`
- **Vulnerability**:
  - Missing `server_tokens off;` exposing Nginx version.
  - No explicit deny rule for hidden dotfiles (`.git`, `.env`).
- **Remediation**:
  - Added `server_tokens off;`.
  - Added `location ~ /\. { deny all; access_log off; log_not_found off; }`.

---

### 10. File: `app/global-error.tsx`
- **Vulnerability**:
  - Printed internal database connection error strings, stack traces, and local shell commands (`npm run setup`, `npm run seed`, `npm run db:up`) to site visitors when database errors occurred.
- **Remediation**:
  - Configured conditional rendering: in production (`NODE_ENV === "production"`), raw errors and internal commands are suppressed, displaying a clean generic error page and optional error digest ID.

---

### 11. File: `payload.config.ts`
- **Vulnerability**:
  - Missing `cors`, `csrf`, and `serverURL` declarations in Payload CMS configuration, allowing arbitrary origins to attempt cross-origin requests.
- **Remediation**:
  - Added explicit origin allowlists (`cors` and `csrf`) restricted to canonical company domains (`https://www.adam.qa`, `https://adamtest.webbea.qa`, `http://localhost:3000`).
  - Added canonical `serverURL`.

---

### 12. File: `docker-compose.dev.yml`
- **Vulnerability**:
  - Development PostgreSQL container bound port `5437` to `0.0.0.0` (all network interfaces), exposing local development databases and default passwords to the local network / Wi-Fi.
- **Remediation**:
  - Bound port `5437` strictly to loopback interface `127.0.0.1:${ADAM_DB_PORT:-5437}:5432`.

---

### 13. File: `next.config.ts`
- **Vulnerability**:
  - `ignoreDuringBuilds: true` and `ignoreBuildErrors: true` prevented build failures when linting or TypeScript type errors were introduced, masking bugs and security oversights.
- **Remediation**:
  - Removed both bypass flags. Validated that `npx tsc --noEmit` and `npm run lint` pass cleanly with 0 errors.

---

### 14. Frontend & CMS Full Dynamic Synchronization
- **Issue**:
  - Hero slider had hardcoded static content disconnected from the Payload CMS `HomePage` global.
  - Multiple subpages (`/services`, `/contact-us`, `/request-for-quotation`, `/about-us`, `/projects/[slug]`, and `Footer`) used hardcoded text or static fallback imports from `@/content/*` instead of consuming live CMS database records and globals.
- **Remediation**:
  - **Hero Slider (`cms/globals/HomePage.ts`, `lib/cms/home.ts`, `components/Hero.tsx`, `app/(frontend)/page.tsx`)**:
    - Added `heroSlides` array to Payload CMS `HomePage` schema.
    - Updated `Hero.tsx` to dynamically prioritize CMS slides, headline (`h1`), subtitle (`sub`), eyebrow, CTA buttons, and background media.
  - **Services Page (`app/(frontend)/services/page.tsx`)**:
    - Wired `getServicesPage()` to dynamically populate hero eyebrow, heading, description, and process section text from the CMS `ServicesPage` global.
  - **Contact Us Page (`app/(frontend)/contact-us/page.tsx`)**:
    - Replaced static company imports with dynamic `getSiteSettings()` and `getContactPage()` for address, phone numbers, mobile, email, opening hours, and WhatsApp link.
  - **Request for Quotation Page (`app/(frontend)/request-for-quotation/page.tsx`)**:
    - Connected `getSiteSettings()` for dynamic engineer direct call phone numbers.
  - **About Us Page (`app/(frontend)/about-us/page.tsx`)**:
    - Replaced static stats and QCDD band imports with `getHome()` data (`home.stats` and `home.qcddBand`), ensuring live admin edits update site credentials immediately.
  - **Footer Component (`components/Footer.tsx`, `app/(frontend)/layout.tsx`)**:
    - Updated `RootLayout` to load `getAllServices()` and pass live services to `Footer`, making footer service navigation dynamically reflect CMS changes.
  - **Projects Detail (`app/(frontend)/projects/[slug]/page.tsx`)**:
    - Connected `getAllServices()` dynamically to resolve project `servicesUsed` relationships.
  - **Seed & Migration (`lib/payload/seed.ts`)**:
    - Added seed entries for `heroSlides` and `services-page` global so initial database deployments match schema definitions.

---

### 15. Admin Hero Section Video Upload & Secure Streaming
- **Feature & Enhancement**:
  - Added direct video upload capability for the Hero section and custom rotating hero slides in the Payload CMS Admin Panel.
- **Implementation & Security Hardening**:
  - `cms/collections/Media.ts`: Whitelisted safe video MIME types (`video/mp4`, `video/webm`, `video/quicktime`) while keeping executable file types (`.svg`, `.html`, `.exe`) strictly blocked. Enforced a 50MB size limit for video uploads (10MB for standard media).
  - `cms/globals/HomePage.ts`: Added `heroVideoFile` upload relation field to the Hero tab and `videoFile` upload relation fields to individual rotating slides in `heroSlides`.
  - `lib/cms/home.ts`: Updated `getHome()` data pipeline to resolve `mediaUrl(g.heroVideoFile)` as the primary video source with custom path fallbacks.
  - `components/Hero.tsx`: Rewrote hero video renderer so active video slides autoplay inline, muted, and loop with smooth fallback to poster images.
  - `next.config.ts`: Added `media-src 'self' data: blob: https:` to CSP headers to allow secure video playback.
  - `deploy/*.nginx.conf`: Increased `client_max_body_size` to `60m` to permit large video uploads through the reverse proxy.




