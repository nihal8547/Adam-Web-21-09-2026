# SECURITY REMEDIATION CHANGELOG

**Project:** Adam Technical Services Website & CMS  
**Repository Branch:** `claude/adam-technical-services-site-s6294v`  
**Audit Cycle:** Comprehensive Security Audit & Hardening 2026  
**Auditor:** Application Security & DevSecOps Engineering Team  

---

## Chronological Change Record

The following log details every file modified during the security hardening and dynamic synchronization process, along with the precise nature of the fix and architectural impact.

---

### 1. `app/(payload)/api/seed/route.ts`
- **Component:** Seed & Schema Migration Handler
- **Vulnerability Addressed:** VULN-001 (Insecure GET method, timing attack vulnerability, plaintext query secret exposure).
- **Modifications:**
  - Replaced `GET` export with an HTTP 405 Method Not Allowed responder returning `Allow: POST`.
  - Added cryptographic constant-time comparison `crypto.timingSafeEqual` in `safeCompare()` to prevent timing analysis.
  - Implemented header extraction parsing `Authorization: Bearer <secret>` and `X-Seed-Secret` prior to query string fallback.
  - Replaced production error reflections with generic sanitized responses while keeping server-side diagnostic logging.
- **Verification:** Re-tested with HTTP GET (returns 405), forged tokens (returns 401 in constant time), and valid Bearer token (executes cleanly).

---

### 2. `cms/collections/Media.ts`
- **Component:** Payload CMS Media Upload Collection
- **Vulnerability Addressed:** VULN-002 (Stored XSS via `.svg` uploads, unrestricted file sizes).
- **Modifications:**
  - Removed wildcard `"image/*"` MIME pattern.
  - Whitelisted strict, non-executable media types: `"image/jpeg"`, `"image/png"`, `"image/webp"`, `"image/avif"`, `"application/pdf"`, `"video/mp4"`, `"video/webm"`, `"video/quicktime"`.
  - Implemented a server-side `beforeValidate` hook that enforces a 10MB ceiling on images/documents and a 50MB ceiling on hero background videos.
- **Verification:** Attempting to upload an SVG or oversized payload is rejected during schema validation before file persistence.

---

### 3. `cms/collections/Users.ts`
- **Component:** User Management & Authentication Schema
- **Vulnerability Addressed:** VULN-003 (BOLA user data leakage, unconstrained privilege escalation, missing brute-force controls).
- **Modifications:**
  - Replaced open `read` access rule with self-or-admin filter (`user.role === 'admin' ? true : { id: { equals: user.id } }`).
  - Added self-or-admin rule to `update` access.
  - Added field-level `create` and `update` guards to `role` so only existing administrators can assign roles.
  - Configured `auth` options: `maxLoginAttempts: 5`, `lockTime: 900000` (15 min), `tokenExpiration: 7200` (2 hours), `cookies: { sameSite: "Lax", secure: process.env.NODE_ENV === "production" }`.
- **Verification:** Editor users can only read and update their own accounts and cannot elevate their role to `admin`.

---

### 4. `app/(payload)/api/graphql-playground/route.ts`
- **Component:** GraphQL Playground IDE Handler
- **Vulnerability Addressed:** VULN-004 (Production exposure of interactive GraphQL schema browser).
- **Modifications:**
  - Added production environment guard: `if (process.env.NODE_ENV === "production") return new Response("Not Found", { status: 404 });`.
- **Verification:** Route returns HTTP 404 in production builds.

---

### 5. `app/api/contact/route.ts`
- **Component:** Public Contact & RFQ Submission API
- **Vulnerability Addressed:** VULN-005 (Unbounded in-memory rate-limiter DoS, CRLF header injection, unvalidated CV uploads, PII logging).
- **Modifications:**
  - Added auto-pruning to the rate-limiter `Map`: purges expired entries when map size exceeds 5,000 IPs.
  - Implemented `sanitizeHeader()` to strip `\r`, `\n`, `\t` and clamp string lengths to prevent email header injection.
  - Added a 5MB maximum file size limit and whitelisted extensions (`.pdf`, `.doc`, `.docx`) on CV file attachments.
  - Redacted personal identifiable information (names, emails, phone numbers) from stdout logs.
- **Verification:** Tested with multiline strings, oversized file attachments, and simulated IP load; all validations enforced.

---

### 6. `next.config.ts`
- **Component:** Next.js Server & Security Header Configuration
- **Vulnerabilities Addressed:** VULN-006 (Missing CSP and security headers), VULN-013 (Linter and compiler bypass).
- **Modifications:**
  - Added comprehensive `Content-Security-Policy` with directives for scripts, styles, fonts, images, frames, and media streaming (`media-src`).
  - Added `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Cross-Origin-Opener-Policy: same-origin-allow-popups`.
  - Removed `ignoreDuringBuilds: true` (ESLint) and `ignoreBuildErrors: true` (TypeScript).
- **Verification:** Headers validated on response payloads; TypeScript compiler and ESLint run with zero errors.

---

### 7. `app/robots.ts`
- **Component:** Search Engine Crawler Policy
- **Vulnerability Addressed:** VULN-007 (Search engine indexing of `/admin`).
- **Modifications:**
  - Added `disallow: ["/admin/", "/admin/*"]` to the crawler rules.
- **Verification:** Verified `/robots.txt` output contains disallow directives.

---

### 8. `.gitignore` & `.dockerignore`
- **Component:** Repository and Container Asset Exclusion
- **Vulnerability Addressed:** VULN-008 (Database dump and backup archive exposure).
- **Modifications:**
  - Added entries for `/backups`, `backups/`, `*.sql`, `*.sql.gz`, and `*.tgz`.
- **Verification:** Git status confirms backup files are ignored and excluded from Docker build context.

---

### 9. `deploy/adamtest.webbea.qa.nginx.conf` & `deploy/nginx.conf.sample`
- **Component:** Nginx Reverse Proxy Configuration
- **Vulnerability Addressed:** VULN-009 (Server version banner disclosure, dotfile access, upload size limits).
- **Modifications:**
  - Added `server_tokens off;` to suppress Nginx version numbers.
  - Added `location ~ /\. { deny all; }` to prevent hidden file traversal (`.env`, `.git`).
  - Increased `client_max_body_size` to `60m` to support validated hero video uploads.
- **Verification:** Nginx configuration syntax validated; dotfile requests return HTTP 403.

---

### 10. `app/global-error.tsx`
- **Component:** Next.js Global Error Boundary
- **Vulnerability Addressed:** VULN-010 (Stack trace, database URI, and command disclosure).
- **Modifications:**
  - Gated technical error messages and diagnostic commands behind `process.env.NODE_ENV !== "production"`.
  - Production visitors receive a friendly, non-technical error notification.
- **Verification:** Simulated runtime faults verify that sensitive connection strings are never rendered in production.

---

### 11. `payload.config.ts`
- **Component:** Payload CMS Core Configuration
- **Vulnerability Addressed:** VULN-011 (Missing origin allowlists for CORS and CSRF).
- **Modifications:**
  - Added explicit canonical `serverURL`.
  - Added `cors` and `csrf` origin allowlists (`https://www.adam.qa`, `https://adamtest.webbea.qa`, `http://localhost:3000`).
- **Verification:** Cross-origin requests from unauthorized third-party origins are blocked.

---

### 12. `docker-compose.dev.yml`
- **Component:** Local Development Database Service
- **Vulnerability Addressed:** VULN-012 (PostgreSQL port published to 0.0.0.0 on local network).
- **Modifications:**
  - Bound port `5437` strictly to loopback interface `127.0.0.1:${ADAM_DB_PORT:-5437}:5432`.
- **Verification:** Container port is unroutable from external network interfaces.

---

### 13. `scripts/allow-firewall-port-3000.bat`
- **Component:** Development Firewall Configuration Script
- **Vulnerability Addressed:** VULN-014 (Internal subnet IP address disclosure in script).
- **Modifications:**
  - Replaced hardcoded IP `192.168.1.130` with generic `localhost:3000`.
- **Verification:** Script inspected; no private IP addresses are disclosed.

---

### 14. CMS & Frontend Dynamic Synchronization
- **Component:** Content Globals, Schemas, and Page Templates
- **Finding Addressed:** AUDIT-016 (Hero and subpages hardcoded or decoupled from Admin CMS).
- **Modifications:**
  - `cms/globals/HomePage.ts`: Added `heroVideoFile` upload relation field and `heroSlides` array with `videoFile` upload support.
  - `lib/cms/home.ts`: Updated `getHome()` to resolve `mediaUrl(g.heroVideoFile)` and map dynamic rotating slides.
  - `components/Hero.tsx`: Rewrote hero component to render CMS headline, subtitle, eyebrow, CTA buttons, background video, and custom rotating slides.
  - `app/(frontend)/services/page.tsx`: Connected `getServicesPage()` to dynamically populate hero and process sections from CMS.
  - `app/(frontend)/contact-us/page.tsx`: Replaced static imports with `getSiteSettings()` and `getContactPage()`.
  - `app/(frontend)/request-for-quotation/page.tsx`: Wired `getSiteSettings()` for dynamic engineer direct call numbers.
  - `app/(frontend)/about-us/page.tsx`: Wired `getHome()` stats and QCDD band to update credentials dynamically.
  - `components/Footer.tsx` & `app/(frontend)/layout.tsx`: Passed `getAllServices()` to `Footer` for dynamic navigation.
  - `app/(frontend)/projects/[slug]/page.tsx`: Connected `getAllServices()` to resolve project service relationships.
  - `lib/payload/seed.ts`: Added seed definitions for `heroSlides` and `services-page` global.
- **Verification:** All pages re-tested and verified with TypeScript and ESLint passing cleanly.

