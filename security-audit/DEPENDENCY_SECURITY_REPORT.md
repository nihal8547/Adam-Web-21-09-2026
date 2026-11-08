# DEPENDENCY & SOFTWARE SUPPLY CHAIN SECURITY REPORT

**Project:** Adam Technical Services Website & CMS  
**Package Manager:** npm (Node.js 22.x LTS runtime)  
**Manifest Files:** `package.json`, `package-lock.json`  
**Core Frameworks:** Next.js 15.4.11, React 19.1.1, Payload CMS 3.90.1  
**Audit Date:** November 2026  

---

## 1. Executive Summary

A comprehensive software supply chain analysis was conducted on all direct dependencies, transitive packages, and development tooling. The project leverages modern, active open-source foundations. 

An `npm audit` assessment flagged **24 advisory notices** occurring entirely within transitive sub-dependencies (packages depended upon by build utilities or developer tooling). 

Importantly, our assessment determined that **zero critical or high vulnerabilities are exposed to unauthenticated public web traffic**. Automated forced fixes (`npm audit fix --force`) were evaluated and deliberately rejected because they would break framework compatibility by forcing destructive downgrades of Payload CMS packages. A safe, planned maintenance path is outlined below.

---

## 2. Direct Dependencies Inventory & Status

| Package Name | Installed Version | Primary Role | Health & Integrity Status |
|---|---|---|---|
| `next` | `15.4.11` | Application Framework (SSR/ISR) | Current release series; healthy |
| `react` / `react-dom` | `19.1.1` | UI Library & Server Components | Current release series; healthy |
| `payload` | `3.90.1` | Headless CMS Core Engine | Active development; healthy |
| `@payloadcms/db-postgres` | `3.90.1` | PostgreSQL Adapter via Drizzle | Parameterized query engine; healthy |
| `@payloadcms/next` | `3.90.1` | Next.js App Router Integration | Current release series; healthy |
| `@payloadcms/richtext-lexical` | `3.90.1` | Lexical Rich Text Editor | Active release; safe against HTML injection |
| `@payloadcms/plugin-seo` | `3.90.1` | SEO Meta Generation Plugin | Active release; healthy |
| `@payloadcms/drizzle` | `3.90.1` | Database Schema Push Engine | Active release; healthy |
| `sharp` | `^0.33.5` | High-Performance Image Processing | Native libvips bindings; secure |
| `framer-motion` | `^12.4.7` | UI Micro-interactions & Animations | Client-side only; healthy |
| `lenis` | `^1.1.20` | Smooth Scrolling Engine | Client-side only; healthy |
| `tailwindcss` | `^4.0.0` | Utility-First CSS Framework | Modern V4 engine; healthy |

---

## 3. Transitive Vulnerabilities Detailed Analysis

The 24 reported npm advisories group into three primary categories:

### 3.1 `undici` (Node.js HTTP Client Sub-Dependency)
- **Reported Severities:** Moderate / High
- **Context:** Transitive dependency pulled in by build-time packaging tools and Next.js internal development utilities.
- **Exposure Analysis:** The application uses native Node `fetch()` for server-to-server operations (`app/api/contact/route.ts` calling Resend API). The vulnerable code paths in legacy `undici` versions relate to HTTP request smuggling in multi-hop reverse proxies where undici acts as an intermediary proxy. In this deployment, Nginx and Next.js handle incoming requests; undici is not deployed as a standalone reverse proxy.
- **Risk Level:** **LOW / MITIGATED** by architectural boundary.

### 3.2 `dompurify` (Bundled within Monaco Editor Dev Tool)
- **Reported Severities:** Moderate
- **Context:** Nested inside Monaco Editor (used in Payload CMS for advanced JSON/code editing inside the authenticated admin panel).
- **Exposure Analysis:** The vulnerability involves specific DOM nesting bypasses when rendering un-sanitized user-supplied HTML. In this application, public visitors cannot submit arbitrary HTML to Monaco; the editor is accessible only to authenticated administrators editing internal JSON schemas.
- **Risk Level:** **LOW / MITIGATED** by administrative authentication.

### 3.3 `postcss` (Build-Time CSS Parser)
- **Reported Severities:** Moderate
- **Context:** Build-time tool used during `npm run build` to compile Tailwind CSS stylesheets.
- **Exposure Analysis:** Exploitation requires supplying malicious, crafted CSS files to the build tool. Style sheets are authored exclusively by project developers and maintained in source control.
- **Risk Level:** **INFORMATIONAL / BUILD-TIME ONLY**.

---

## 4. Evaluation of Automated `npm audit fix --force`

Automated tooling frequently suggests running `npm audit fix --force` to eliminate advisory warnings. Our security team executed a dry-run evaluation:

- **Command Evaluated:** `npm audit fix --force --dry-run`
- **Result:** The automated resolution algorithm attempted to resolve transitive dependencies by rolling back `@payloadcms` packages from version `3.90.1` to `0.1.9` (an obsolete, incompatible release from earlier years).
- **Impact:** This would completely break the database adapter, Lexical editor, App Router bindings, and site rendering.
- **Engineering Decision:** **REJECTED.** Blind automated dependency downgrades violate sound engineering practices. Stability and security are best preserved through controlled, verified updates.

---

## 5. Maintenance Roadmap & Recommendations

To maintain software supply chain integrity:

1. **Regular Minor Cadence:** Schedule quarterly maintenance sprints to run standard non-breaking updates:
   ```bash
   npm update
   ```
2. **Lockfile Integrity:** Maintain `package-lock.json` in version control and always build production images using `npm ci` rather than `npm install` to guarantee deterministic package resolution.
3. **Container Base Image Updates:** The production Dockerfile builds on `node:22-bookworm-slim`. Rebuilding the image periodically ensures operating system patches and OpenSSL updates from the Debian security repository are applied.

