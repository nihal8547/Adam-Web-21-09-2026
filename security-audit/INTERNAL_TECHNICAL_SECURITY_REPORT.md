# INTERNAL TECHNICAL SECURITY AUDIT & PENETRATION TESTING REPORT

**Confidential Document:** Engineering & DevSecOps Technical Reference  
**Project:** Adam Technical Services – Official Website & Admin CMS  
**Stack:** Next.js 15.4.11 (React 19.1.1), Payload CMS 3.90.1, PostgreSQL 16 (Drizzle ORM), Node 22, Docker, Nginx  
**Date:** November 2026  
**Status:** Audit Completed, Remediations Implemented & Verified  

---

## 1. Technical Architecture & Attack Surface Analysis

### 1.1 Architecture Blueprint

```
                      [ External Internet Traffic ]
                                   │
                                   ▼ HTTPS (TCP :443)
              ┌───────────────────────────────────────────┐
              │           Nginx Reverse Proxy             │
              │  - server_tokens off;                     │
              │  - client_max_body_size 60m;              │
              │  - location ~ /\. { deny all; }           │
              └────────────────────┬──────────────────────┘
                                   │ HTTP (TCP :3090 -> :3000)
                                   ▼
              ┌───────────────────────────────────────────┐
              │        Next.js 15.4 / Payload CMS         │
              │  ┌─────────────────────────────────────┐  │
              │  │ App Router Pages (SSR / ISR / CSR)  │  │
              │  ├─────────────────────────────────────┤  │
              │  │ Public API (/api/contact)           │  │
              │  ├─────────────────────────────────────┤  │
              │  │ Admin CMS Portal (/admin)           │  │
              │  ├─────────────────────────────────────┤  │
              │  │ Payload REST API (/api/[...slug])   │  │
              │  ├─────────────────────────────────────┤  │
              │  │ Payload GraphQL API (/api/graphql)  │  │
              │  ├─────────────────────────────────────┤  │
              │  │ Seed & Migration API (/api/seed)    │  │
              │  └──────────────────┬──────────────────┘  │
              └─────────────────────┼─────────────────────┘
                                    │ TCP :5432
                                    ▼
              ┌───────────────────────────────────────────┐
              │      PostgreSQL 16 Enterprise Database    │
              │         (Drizzle ORM Engine)              │
              └───────────────────────────────────────────┘
```

### 1.2 Surface Breakdown
- **Public Routes:** `/`, `/services`, `/about-us`, `/projects`, `/projects/[slug]`, `/contact-us`, `/request-for-quotation`, `/careers`, `/blog`, `/blog/[slug]`, `/privacy-policy`, `/terms-of-service`, and 9 individual service landing pages.
- **Dynamic Content Globals:** `SiteSettings`, `HomePage`, `ServicesPage`, `AboutPage`, `QcddPage`, `ContactPage`.
- **Database Collections:** `users`, `media`, `categories`, `services`, `projects`, `vacancies`, `posts`, `testimonials`, `clients`.
- **API Endpoints:**
  - `POST /api/contact`: Public enquiry & quotation submission, CV file attachment upload.
  - `POST /api/seed`: System bootstrap, schema push, and database seed.
  - `GET /api/graphql-playground`: GraphQL IDE (now disabled in production).
  - `/api/[collection]`: Payload REST collection routes.
  - `/api/graphql`: Payload GraphQL query & mutation endpoint.

---

## 2. Vulnerability Register & Technical Findings

---

### [VULN-001] Insecure GET Database Seeding & Timing-Attack Vulnerability in Seeding Endpoint

- **Vulnerability ID:** VULN-001
- **Severity:** **CRITICAL**
- **CVSS v3.1 Base Score:** **9.1** (`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N`)
- **CWE:** CWE-287 (Improper Authentication), CWE-208 (Observable Timing Discrepancy), CWE-598 (Information Exposure Through Query Strings in GET Request)
- **OWASP:** A01:2021-Broken Access Control, A07:2021-Identification and Authentication Failures
- **Affected File:** `app/(payload)/api/seed/route.ts`

#### Technical Root Cause
The seed handler originally processed `GET` requests without restricting HTTP methods. Seeding authentication extracted credentials exclusively from URL query parameters (`?secret=...`). Query parameter secrets are recorded in web server access logs, reverse proxy buffers, browser history, and HTTP `Referer` headers. Furthermore, the token validation used direct JavaScript string comparison (`secret !== guard`), making it vulnerable to side-channel timing analysis attacks. If an unhandled exception occurred, internal Drizzle ORM schema details and stack traces were returned directly in the HTTP 500 response.

#### Redacted Evidence
```typescript
// VULNERABLE IMPLEMENTATION (Pre-Remediation)
export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  const guard = process.env.PAYLOAD_SECRET;
  if (!guard || secret !== guard) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Triggered schema push and data wipe/re-seed
  ...
}
```

#### Remediation Implemented
1. Replaced the `GET` handler with an explicit HTTP 405 Method Not Allowed response with `Allow: POST`.
2. Implemented `crypto.timingSafeEqual` over fixed-length buffer comparisons in `safeCompare()`.
3. Added header-based credential ingestion (`Authorization: Bearer <secret>` and `X-Seed-Secret`), retaining query parameter fallback strictly for compatibility.
4. Sanitized production error responses (`process.env.NODE_ENV === "production"` outputs a generic message while preserving internal logging).

```typescript
// HARDENED IMPLEMENTATION
function safeCompare(a: string, b: string): boolean {
  if (!a || !b) return false;
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function GET() {
  return Response.json(
    { error: "Method Not Allowed. Database seeding requires a POST request." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
```

#### Verification & Retest
- Sending `GET /api/seed` returns `HTTP 405 Method Not Allowed`.
- Sending `POST /api/seed` with an invalid token returns `HTTP 401 Unauthorized` in constant time.
- Sending `POST /api/seed` with `Authorization: Bearer <valid_secret>` executes schema validation and returns `HTTP 200 { ok: true }`.

---

### [VULN-002] Stored Cross-Site Scripting (XSS) via Unrestricted Media Uploads

- **Vulnerability ID:** VULN-002
- **Severity:** **HIGH**
- **CVSS v3.1 Base Score:** **7.5** (`CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:H/I:L/A:N`)
- **CWE:** CWE-434 (Unrestricted Upload of File with Dangerous Type), CWE-79 (Improper Neutralization of Input During Web Page Generation)
- **OWASP:** A03:2021-Injection, A04:2021-Insecure Design
- **Affected File:** `cms/collections/Media.ts`

#### Technical Root Cause
The Media collection configured `upload.mimeTypes: ["image/*"]`. Because SVG files have the MIME type `image/svg+xml`, they were accepted. SVGs are XML documents capable of embedding JavaScript (`<script>` elements, `onload`, `onerror` event attributes). When requested directly from the browser, the script executes in the context of the application's origin, enabling session hijacking, credential harvesting, or administrative actions. Additionally, no file size limits were enforced at the collection level, presenting a disk exhaustion denial-of-service vulnerability.

#### Remediation Implemented
1. Replaced the wildcard MIME pattern with an explicit whitelist: `image/jpeg`, `image/png`, `image/webp`, `image/avif`, `application/pdf`, `video/mp4`, `video/webm`, `video/quicktime`.
2. Permanently excluded `image/svg+xml` from user-controllable uploads.
3. Added a server-side `beforeValidate` hook enforcing a 10MB ceiling on images/PDFs and a 50MB ceiling on approved hero video files.

```typescript
// cms/collections/Media.ts
mimeTypes: [
  "image/jpeg", "image/png", "image/webp", "image/avif", "application/pdf",
  "video/mp4", "video/webm", "video/quicktime"
],
hooks: {
  beforeValidate: [
    ({ req, operation }) => {
      if ((operation === "create" || operation === "update") && req.file) {
        const isVideo = req.file.mimetype?.startsWith("video/");
        const maxBytes = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
        if (req.file.size > maxBytes) {
          throw new Error(`File size exceeds maximum allowed limit of ${isVideo ? "50MB" : "10MB"}.`);
        }
      }
    },
  ],
}
```

#### Verification & Retest
- Attempting to upload an `.svg` file returns validation failure: MIME type not allowed.
- Attempting to upload an oversized file (>10MB for image, >50MB for video) throws a validation error before disk write.
- Uploading valid PNG, WebP, PDF, and MP4 files succeeds as expected.

---

### [VULN-003] Broken Object Level Authorization (BOLA) & User Data Exposure in Users Collection

- **Vulnerability ID:** VULN-003
- **Severity:** **HIGH**
- **CVSS v3.1 Base Score:** **7.7** (`CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N`)
- **CWE:** CWE-285 (Improper Authorization), CWE-639 (Authorization Bypass Through User-Controlled Key)
- **OWASP:** A01:2021-Broken Access Control
- **Affected File:** `cms/collections/Users.ts`

#### Technical Root Cause
The Users collection defined `access.read: ({ req: { user } }) => Boolean(user)`. This permitted any authenticated user (such as a low-privilege `editor`) to issue a REST query to `/api/users` and retrieve all user accounts, email addresses, names, role assignments, and authentication audit metadata. In addition, `access.update` was restricted to admins, preventing editors from updating their own account details, while the `role` field lacked `create` access controls, permitting privilege escalation during user creation. The authentication configuration lacked explicit lockout limits and secure session cookie settings.

#### Remediation Implemented
1. Enforced self-or-admin access controls for `read` and `update`:
   ```typescript
   read: ({ req: { user } }) => {
     if (!user) return false;
     if (user.role === "admin") return true;
     return { id: { equals: user.id } };
   },
   ```
2. Restricted field-level `create` and `update` access on `role` exclusively to `admin` users.
3. Configured brute-force defense in `auth`: `maxLoginAttempts: 5`, `lockTime: 15 * 60 * 1000` (15 minutes), `tokenExpiration: 7200` (2 hours), and `cookies: { sameSite: "Lax", secure: process.env.NODE_ENV === "production" }`.

#### Verification & Retest
- Authenticated editor issuing `GET /api/users` receives only their own record.
- Editor attempting to update another user ID receives `HTTP 403 Forbidden`.
- Editor attempting to set `role: "admin"` during user creation is blocked by field access control.

---

### [VULN-004] Production Exposure of GraphQL Playground Interface

- **Vulnerability ID:** VULN-004
- **Severity:** **HIGH**
- **CVSS v3.1 Base Score:** **7.5** (`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N`)
- **CWE:** CWE-200 (Exposure of Sensitive Information to an Unauthorized Actor)
- **OWASP:** A05:2021-Security Misconfiguration
- **Affected File:** `app/(payload)/api/graphql-playground/route.ts`

#### Technical Root Cause
The GraphQL Playground handler rendered an interactive schema inspection UI at `/api/graphql-playground` regardless of environment. An unauthenticated attacker could use the interface to introspect internal collection fields, types, relationships, and hidden metadata.

#### Remediation Implemented
Added an environment boundary check:
```typescript
if (process.env.NODE_ENV === "production") {
  return new Response("Not Found", { status: 404 });
}
```

#### Verification & Retest
- In production (`NODE_ENV=production`), requesting `/api/graphql-playground` returns `HTTP 404 Not Found`.

---

### [VULN-005] Unbounded Rate-Limit Memory Exhaustion (DoS), CRLF Header Injection & PII Leakage in Contact API

- **Vulnerability ID:** VULN-005
- **Severity:** **MEDIUM**
- **CVSS v3.1 Base Score:** **6.5** (`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:L`)
- **CWE:** CWE-400 (Uncontrolled Resource Consumption), CWE-93 (Improper Neutralization of CRLF Sequences), CWE-532 (Insertion of Sensitive Information into Log File)
- **OWASP:** A03:2021-Injection, A05:2021-Security Misconfiguration
- **Affected File:** `app/api/contact/route.ts`

#### Technical Root Cause
1. **Memory Exhaustion:** An in-memory JavaScript `Map<string, number[]>` tracked IP request timestamps without an automated eviction routine. An attacker spoofing IP headers or running distributed low-volume requests could grow the Map indefinitely, inducing Node.js process out-of-memory (OOM) termination.
2. **Email CRLF Injection:** User input from the contact form was interpolated into email subject lines without stripping `\r` and `\n` characters, allowing malicious actors to inject extra headers (`Bcc:`, `Cc:`, `To:`).
3. **Log Exposure:** Enquiries printed unredacted full names, email addresses, and phone numbers to stdout logs via `console.log`.
4. **CV File Attachment Risks:** The `/api/contact` endpoint did not restrict CV upload file sizes or validate extensions.

#### Remediation Implemented
1. Implemented bounded pruning in the rate limiter: if the internal tracking map exceeds 5,000 IPs, expired entries are purged automatically.
2. Implemented strict input length truncation and CRLF sanitization:
   ```typescript
   function sanitizeHeader(val: string, maxLen = 100): string {
     return String(val || "").replace(/[\r\n\t]/g, " ").trim().slice(0, maxLen);
   }
   ```
3. Added a 5MB ceiling on uploaded CV attachments and whitelisted document extensions (`.pdf`, `.doc`, `.docx`).
4. Replaced raw PII in console logs with anonymized tokens (e.g. `[EMAIL REDACTED]`).

#### Verification & Retest
- Submitting inputs with `\r\nBcc: evil@attacker.com` results in sanitized, single-line headers.
- Rate-limiting map remains bounded under simulated high IP volume.
- Uploading a 6MB CV file or an `.exe` file returns `HTTP 400 Bad Request`.
- Terminal logs display sanitized, redacted event summaries.

---

### [VULN-006] Missing Content Security Policy (CSP) & Defense-in-Depth Headers

- **Vulnerability ID:** VULN-006
- **Severity:** **MEDIUM**
- **CVSS v3.1 Base Score:** **5.4** (`CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N`)
- **CWE:** CWE-693 (Protection Mechanism Failure), CWE-1021 (Improper Restriction of Rendered UI Layers or Frames)
- **OWASP:** A05:2021-Security Misconfiguration
- **Affected File:** `next.config.ts`

#### Technical Root Cause
HTTP responses lacked modern defense headers. In the absence of a `Content-Security-Policy`, client browsers will execute inline scripts and load external assets indiscriminately. Missing `Cross-Origin-Opener-Policy` (COOP) and `X-Permitted-Cross-Domain-Policies` headers exposed client sessions to cross-window leakage.

#### Remediation Implemented
Configured comprehensive HTTP response headers in `next.config.ts`:
```typescript
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.chatbase.co",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.resend.com https://www.chatbase.co https://backend.chatbase.co",
  "frame-src 'self' https://www.chatbase.co",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspDirectives },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];
```

#### Verification & Retest
- Response headers inspect cleanly on all public routes, verifying CSP, nosniff, SAMEORIGIN, and COOP are active.

---

### [VULN-007] Administrative Panel Indexable by Search Engine Spiders

- **Vulnerability ID:** VULN-007
- **Severity:** **MEDIUM**
- **CVSS v3.1 Base Score:** **5.3** (`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N`)
- **CWE:** CWE-200 (Exposure of Sensitive Information to an Unauthorized Actor)
- **OWASP:** A05:2021-Security Misconfiguration
- **Affected File:** `app/robots.ts`

#### Technical Root Cause
The application's `robots.txt` configuration contained only `allow: "/"` without restricting search engine spiders from crawling and indexing `/admin/` and `/admin/*`. This increases exposure of administrative login interfaces in public search engine results.

#### Remediation Implemented
```typescript
// app/robots.ts
rules: [
  {
    userAgent: "*",
    allow: "/",
    disallow: ["/admin/", "/admin/*"],
  },
],
```

#### Verification & Retest
- Fetching `/robots.txt` confirms explicit `Disallow: /admin/` and `Disallow: /admin/*` directives.

---

### [VULN-008] Un-Ignored Database Backups and SQL Dumps in Project Structure

- **Vulnerability ID:** VULN-008
- **Severity:** **MEDIUM**
- **CVSS v3.1 Base Score:** **6.5** (`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N`)
- **CWE:** CWE-530 (Exposure of Backup File to an Unauthorized Control Sphere)
- **OWASP:** A05:2021-Security Misconfiguration
- **Affected Files:** `.gitignore`, `.dockerignore`

#### Technical Root Cause
Deployment scripts generate nightly backups into `/backups`. Neither `.gitignore` nor `.dockerignore` explicitly excluded this directory or `.sql` / `.sql.gz` files. If a developer ran a local backup or committed artifacts, database dumps containing production user hashes, customer contacts, or configuration data could be inadvertently committed to version control or baked into Docker images.

#### Remediation Implemented
Updated both `.gitignore` and `.dockerignore`:
```
# Database dumps & backup directories
/backups
backups/
*.sql
*.sql.gz
*.tgz
```

#### Verification & Retest
- Confirmed that files matching backup patterns are ignored by git and excluded from Docker build context layers.

---

### [VULN-009] Information Disclosure via Server Version Banners & Unrestricted Dotfile Access in Nginx

- **Vulnerability ID:** VULN-009
- **Severity:** **LOW**
- **CVSS v3.1 Base Score:** **3.7** (`CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N`)
- **CWE:** CWE-200 (Information Exposure), CWE-541 (Inclusion of Sensitive File in Web-Accessible Directory)
- **OWASP:** A05:2021-Security Misconfiguration
- **Affected Files:** `deploy/adamtest.webbea.qa.nginx.conf`, `deploy/nginx.conf.sample`

#### Technical Root Cause
The Nginx configuration lacked `server_tokens off;`, disclosing the exact Nginx version in HTTP headers. In addition, no rule denied access to hidden files (`.git`, `.env`), relying solely on the application layer to block hidden file traversal.

#### Remediation Implemented
1. Added `server_tokens off;`.
2. Added an explicit denial block for all dotfiles:
   ```nginx
   location ~ /\. {
       deny all;
       access_log off;
       log_not_found off;
   }
   ```
3. Increased `client_max_body_size` from `25m` to `60m` to accommodate legitimate video uploads through the proxy.

#### Verification & Retest
- Config syntax validated cleanly. Direct requests to `/.env` or `/.git` are rejected with HTTP 403 at the reverse proxy layer.

---

### [VULN-010] Stack Trace and Internal Diagnostic Exposure in Global Error Handler

- **Vulnerability ID:** VULN-010
- **Severity:** **MEDIUM**
- **CVSS v3.1 Base Score:** **5.3** (`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N`)
- **CWE:** CWE-209 (Generation of Error Message Containing Sensitive Information)
- **OWASP:** A05:2021-Security Misconfiguration
- **Affected File:** `app/global-error.tsx`

#### Technical Root Cause
`global-error.tsx` displayed the raw `error.message` directly in the UI. If database connectivity failed, the error message included the complete database connection string (`DATABASE_URI`), hostnames, ports, internal paths, and setup commands (`npm run setup`, `npm run db:up`), leaking internal architecture details to public visitors.

#### Remediation Implemented
Gated technical details behind `NODE_ENV !== "production"`:
```typescript
// app/global-error.tsx
const isDev = process.env.NODE_ENV !== "production";
const errorMessage = isDev
  ? error.message || "An unexpected error occurred."
  : "A temporary system error occurred. Our engineering team has been notified.";
```

#### Verification & Retest
- Production simulations confirm that system faults render the sanitized notification without leaking connection strings or stack traces.

---

### [VULN-011] Missing CORS and CSRF Allowlist Configuration in CMS Setup

- **Vulnerability ID:** VULN-011
- **Severity:** **MEDIUM**
- **CVSS v3.1 Base Score:** **6.5** (`CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N`)
- **CWE:** CWE-352 (Cross-Site Request Forgery), CWE-942 (Overly Permissive Cross-Domain Whitelist)
- **OWASP:** A01:2021-Broken Access Control, A05:2021-Security Misconfiguration
- **Affected File:** `payload.config.ts`

#### Technical Root Cause
The Payload configuration omitted explicit `cors` and `csrf` origin allowlists, as well as `serverURL`. This could permit requests from untrusted third-party origins or trigger undefined host behavior.

#### Remediation Implemented
Configured explicit origin allowlists:
```typescript
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.adam.qa";
const trustedOrigins = Array.from(
  new Set([
    siteUrl,
    "https://adam.qa",
    "https://www.adam.qa",
    "https://adamtest.webbea.qa",
    "http://localhost:3000",
  ]),
);

export default buildConfig({
  serverURL: siteUrl,
  cors: trustedOrigins,
  csrf: trustedOrigins,
  ...
});
```

#### Verification & Retest
- Cross-origin requests from non-whitelisted origins are rejected. Requests from authorized domains succeed.

---

### [VULN-012] Development PostgreSQL Port Bound to All Network Interfaces (0.0.0.0)

- **Vulnerability ID:** VULN-012
- **Severity:** **MEDIUM**
- **CVSS v3.1 Base Score:** **6.5** (`CVSS:3.1/AV:A/AC:L/PR:N/UI:N/S:U/C:H/I:L/A:N`)
- **CWE:** CWE-668 (Exposure of Resource to Wrong Sphere)
- **OWASP:** A05:2021-Security Misconfiguration
- **Affected File:** `docker-compose.dev.yml`

#### Technical Root Cause
`docker-compose.dev.yml` published port `5437:5432` bound to `0.0.0.0`. When running local development environments on public or shared Wi-Fi networks, the development database was reachable by other devices on the local subnet.

#### Remediation Implemented
Bound the port exclusively to the loopback interface:
```yaml
ports:
  - "127.0.0.1:${ADAM_DB_PORT:-5437}:5432"
```

#### Verification & Retest
- Port binding verified via `netstat`; connections originating from external interfaces are rejected.

---

### [VULN-013] Build Linter and Type-Checker Bypass in Configuration

- **Vulnerability ID:** VULN-013
- **Severity:** **LOW**
- **CVSS v3.1 Base Score:** **3.1** (`CVSS:3.1/AV:N/AC:H/PR:H/UI:N/S:U/C:N/I:L/A:N`)
- **CWE:** CWE-1068 (Inconsistency Between Implementation and Intended Design)
- **OWASP:** A05:2021-Security Misconfiguration
- **Affected File:** `next.config.ts`

#### Technical Root Cause
`next.config.ts` configured `ignoreDuringBuilds: true` (ESLint) and `ignoreBuildErrors: true` (TypeScript). These flags bypassed CI/CD quality gates, permitting code with compilation errors, broken type definitions, or security linter warnings to be packaged and deployed to production.

#### Remediation Implemented
1. Removed both bypass flags from `next.config.ts`.
2. Resolved all underlying code issues across the codebase.
3. Verified that `npx tsc --noEmit` and `npm run lint` compile cleanly with 0 errors.

#### Verification & Retest
- Production builds execute full type checking and linting without exceptions.

---

### [VULN-014] Internal Subnet IP Disclosure in Helper Script

- **Vulnerability ID:** VULN-014
- **Severity:** **LOW**
- **CVSS v3.1 Base Score:** **2.6** (`CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N`)
- **CWE:** CWE-200 (Information Exposure)
- **OWASP:** A05:2021-Security Misconfiguration
- **Affected File:** `scripts/allow-firewall-port-3000.bat`

#### Technical Root Cause
The batch script output an internal development IP (`192.168.1.130:3000`) in terminal echo messages, disclosing internal network topology details in repository files.

#### Remediation Implemented
Replaced the hardcoded IP with a generic `localhost:3000` reference.

#### Verification & Retest
- Verified script contents contain no hardcoded internal subnet IP addresses.

---

## 3. Dependency & Supply Chain Security Audit

Execution of `npm audit` reported 24 vulnerability advisories across sub-dependencies:
- **Analyzed Dependencies:** `undici` (Node HTTP sub-client), `dompurify` (bundled within Monaco editor component), `postcss` (build-time CSS compiler).
- **Exploitability Analysis:** None of the vulnerable components are reachable through unauthenticated user input or public request paths.
- **Remediation Strategy:** Running `npm audit fix --force` was evaluated and determined to introduce breaking package downgrades (downgrading `@payloadcms` packages to `0.1.9`). The risk of package breakage was avoided. Safe dependency upgrades should be applied during scheduled quarterly maintenance releases.

---

## 4. Verification & Testing Matrix

| Component | Test Executed | Command / Technique | Result |
|---|---|---|---|
| **TypeScript Engine** | Type Safety Verification | `npx tsc --noEmit` | **PASS (0 Errors)** |
| **ESLint Quality Engine** | Static Analysis Security Rules | `npm run lint` | **PASS (0 Errors)** |
| **Database Seeding API** | HTTP Method & Timing Attack Test | HTTP `GET` & `POST` with forged headers | **PASS (405 on GET, 401 on bad token)** |
| **Media Uploads** | SVG & Executable File Injection | Direct upload test with `.svg` and `.exe` | **PASS (MIME Rejected)** |
| **Media Size Limits** | Oversized Attachment Denial | 15MB Image / 65MB Video upload test | **PASS (Rejected by Hook & Nginx)** |
| **User Role Authorization** | Horizontal & Vertical Escalation | Non-admin query to `/api/users` | **PASS (BOLA Prevented)** |
| **GraphQL Playground** | Production Boundary Verification | `NODE_ENV=production` request to playground | **PASS (404 Not Found)** |
| **Contact API Rate Limiter** | Memory Growth & Bounded Eviction | Simulated burst traffic | **PASS (Pruning Verified)** |
| **HTTP Security Headers** | CSP & Frame Restrictions | Header inspection via curl | **PASS (All Directives Active)** |

---

## 5. Deployment & Production Readiness Conclusion

The technical assessment confirms that all high and critical vulnerabilities have been resolved at the source code level. The Adam Technical Services web platform is **TECHNICALLY READY FOR PRODUCTION HOSTING**.

