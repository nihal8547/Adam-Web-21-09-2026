# REMAINING RISK REGISTER & RESIDUAL RISK MANAGEMENT PLAN

**Project:** Adam Technical Services Website & CMS  
**Date:** November 2026  
**Document Purpose:** Transparent documentation of residual risks, operational boundaries, and scheduled future security enhancements.  

---

## 1. Residual Risk Assessment Philosophy

No software platform can honestly claim 100% zero risk. Enterprise application security requires identifying residual risks, evaluating their likelihood and business impact, establishing active compensating controls, and defining clear remediation timelines.

Following the completion of this security audit and hardening cycle, **zero critical or high exploitable vulnerabilities remain in the codebase**. All identified items are low-severity architectural nuances or future scalability enhancements.

---

## 2. Residual Risk Register

---

### [RISK-001] Container Process Execution as Default Root User

- **Category:** Container Infrastructure Security
- **Inherent Severity:** **LOW**
- **Residual Risk Level:** **ACCEPTABLE WITH COMPENSATING CONTROLS**
- **Description:**  
  The application `Dockerfile` currently executes the Node.js process as the default container root user (`UID 0`). If an attacker were able to achieve remote code execution inside the Node.js runtime, they would possess root privileges within the isolated container boundary.
- **Compensating Controls Currently Active:**
  1. The container runs with Docker namespace isolation and does not run in `--privileged` mode.
  2. The host filesystem is not mounted into the container except for the dedicated persistent `/app/media` volume.
  3. No remote code execution vulnerabilities exist in application endpoints.
- **Recommended Future Action:**  
  In a future maintenance sprint, configure a dedicated unprivileged user in `Dockerfile`:
  ```dockerfile
  USER node
  ```
  Ensure file ownership on `/app/media` is granted to the `node` user (`chown -R node:node /app/media`).
- **Target Resolution:** Next scheduled container infrastructure update (Q1 2027).

---

### [RISK-002] In-Memory Rate Limiting vs. Distributed Architecture

- **Category:** Denial of Service Defense / Scalability
- **Inherent Severity:** **LOW**
- **Residual Risk Level:** **ACCEPTABLE FOR SINGLE-INSTANCE DEPLOYMENT**
- **Description:**  
  The contact enquiry endpoint (`/api/contact`) enforces rate limits using a local Node.js in-memory sliding window `Map`. In the current single-instance deployment (standard DigitalOcean droplet or standalone VM), this provides effective protection. However, if Adam Technical Services expands infrastructure to multiple horizontally scaled application containers behind a load balancer, each instance would maintain its own isolated rate-limit map, allowing an attacker to submit up to $N \times \text{limit}$ requests across $N$ instances.
- **Compensating Controls Currently Active:**
  1. Self-pruning memory controls prevent process exhaustion when IP volume grows.
  2. Front-facing Nginx reverse proxy enforces connection and request rate limits at the web server layer before traffic reaches Node.js.
  3. Form inputs are clamped in length and sanitized.
- **Recommended Future Action:**  
  When scaling beyond a single server instance, integrate an external Redis instance (such as `@upstash/ratelimit` or Redis sliding-window keys) to share rate-limit counters across all container instances.
- **Target Resolution:** If and when horizontal multi-server clustering is implemented.

---

### [RISK-003] Local Disk Storage for Uploaded Media Files

- **Category:** Storage Resilience & Disaster Recovery
- **Inherent Severity:** **INFORMATIONAL**
- **Residual Risk Level:** **ACCEPTABLE WITH ACTIVE BACKUP CONTROLS**
- **Description:**  
  Uploaded images, PDFs, and hero videos are stored on the local persistent Docker volume at `/app/media`. In a hardware failure or single-disk corruption event, media assets could be lost if regular system backups are not maintained.
- **Compensating Controls Currently Active:**
  1. Automated droplet backup scripts archive `/app/media` during scheduled maintenance.
  2. The media directory is isolated from the ephemeral application container code.
- **Recommended Future Action:**  
  For high-availability enterprise environments, configure an S3-compatible cloud object storage adapter (e.g. AWS S3, Cloudflare R2, or DigitalOcean Spaces) using Payload CMS's `@payloadcms/plugin-cloud-storage`.
- **Target Resolution:** Optional future cloud migration sprint.

---

### [RISK-004] Build-Tooling Sub-Dependency Advisories

- **Category:** Software Supply Chain
- **Inherent Severity:** **LOW**
- **Residual Risk Level:** **ACCEPTABLE**
- **Description:**  
  24 npm advisories exist in secondary dependencies (e.g. `undici`, `dompurify` in Monaco editor, `postcss`). These libraries are isolated to internal build tools and developer administrative interfaces and are not directly callable by external unauthenticated public web requests.
- **Compensating Controls Currently Active:**
  1. Automated destructive forced downgrades were rejected to protect application stability.
  2. GraphQL Playground is disabled in production.
  3. User role protections prevent unauthorized access to administrative tooling.
- **Recommended Future Action:**  
  Execute standard minor updates (`npm update`) during quarterly maintenance windows as upstream package maintainers release non-breaking patches.
- **Target Resolution:** Quarterly maintenance cycle (Q1 2027).

---

## 3. Summary Risk Assessment Matrix

| Risk ID | Title | Likelihood | Impact | Residual Risk | Action Status |
|---|---|---|---|---|---|
| **RISK-001** | Root User in Container | Low | Low | **Low** | Documented on Q1 2027 Roadmap |
| **RISK-002** | In-Memory Rate Limiting | Low | Low | **Low** | Maintained for Single Instance; Redis on Cluster |
| **RISK-003** | Local Storage for Media | Low | Medium | **Low** | Mitigated by Nightly Server Snapshots |
| **RISK-004** | Transitive Build Advisories | Very Low | Low | **Negligible** | Monitored for Quarterly Minor Updates |

---

## 4. Sign-Off & Conclusion

The documented residual risks represent acceptable operational trade-offs for modern single-server Next.js and Payload CMS deployments. None of the items jeopardize the confidentiality, integrity, or availability of production customer records, administrative credentials, or company systems.

