# Backend / CMS (Payload) — setup & deployment

The site now includes a self-hosted **Payload CMS** admin, embedded in the same
Next.js app. Content lives in **PostgreSQL**; uploaded media lives on the
**server's disk** (a Docker volume). The admin panel is at **`/admin`**.

> **Status — Phase 1 (done):** login/auth, roles (admin/editor), Media library
> (with required alt text), and Site Settings (NAP, hours, socials).
> **Next phases:** Categories → Services → Projects → Vacancies → Blog →
> Home-page CMS, each with SEO fields by default, then wiring the public pages
> to read from the CMS.

---

## 1. Run it locally

Prereqs: Node 20+ and a PostgreSQL 14+ database.

```bash
cp .env.example .env.local        # or .env
# set at minimum:
#   DATABASE_URI=postgresql://user:pass@localhost:5432/adam_cms
#   PAYLOAD_SECRET=<node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
npm install
npm run dev
```

Open **http://localhost:3000/admin** — on first run it prompts you to create the
first admin user. Payload creates its database tables automatically in dev.

Public site is unchanged and still fast: the admin bundle is only loaded under
`/admin`, never on the marketing pages.

---

## 2. Deploy on a Digital Ocean droplet (Docker)

The repo ships a `Dockerfile` and `docker-compose.yml` (app + Postgres +
persistent volumes for the database and media).

**On the droplet (Ubuntu):**

```bash
# 1. Install Docker + compose plugin (once)
curl -fsSL https://get.docker.com | sh

# 2. Get the code
git clone <your-repo-url> adam && cd adam

# 3. Configure secrets
cp .env.docker.example .env
nano .env      # set POSTGRES_PASSWORD, PAYLOAD_SECRET, NEXT_PUBLIC_SITE_URL=https://www.adam.qa

# 4. Build & run
docker compose up -d --build

# App is now on 127.0.0.1:3000. Create the first admin at /admin.
```

**Put Nginx + HTTPS in front (for adam.qa):**

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
sudo cp deploy/nginx.conf.sample /etc/nginx/sites-available/adam.qa
sudo ln -s /etc/nginx/sites-available/adam.qa /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d adam.qa -d www.adam.qa      # free SSL, auto-renew
```

Point the **adam.qa** DNS A record (and `www`) at the droplet's IP first.

**Updates:** `git pull && docker compose up -d --build`.

---

## 3. Backups (important)

- **Database:** `docker compose exec db pg_dump -U adam adam_cms > backup-$(date +%F).sql`
  (schedule via cron). Restore: `docker compose exec -T db psql -U adam adam_cms < backup.sql`.
- **Media:** the `media` Docker volume — back it up with
  `docker run --rm -v adam_media:/m -v $PWD:/b alpine tar czf /b/media-$(date +%F).tgz -C /m .`
  (adjust the volume name from `docker volume ls`).

---

## 4. Architecture notes

- **Config:** `payload.config.ts` (root). Collections in `cms/collections/`,
  globals in `cms/globals/`.
- **Admin routes:** `app/(payload)/` route group — separate from the public
  site's layout; do not add site chrome there.
- **API coexistence:** Payload serves `/api/*`; the site's own
  `/api/contact` (a static route) takes precedence over Payload's catch-all, so
  both work.
- **Media path:** `PAYLOAD_MEDIA_DIR` (default `./media`, `/app/media` in
  Docker) — a persistent volume. Uploads never touch git.
- **Next version:** pinned to 15.4.x for Payload 3 peer compatibility.
- **Email:** no email adapter is configured yet, so password-reset emails print
  to the server console. Add Resend/SMTP before go-live if you want reset links.
