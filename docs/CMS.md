# Backend / CMS (Payload) — setup & deployment

The site now includes a self-hosted **Payload CMS** admin, embedded in the same
Next.js app. Content lives in **PostgreSQL**; uploaded media lives on the
**server's disk** (a Docker volume). The admin panel is at **`/admin`**.

> **Status — complete:** login/auth + roles, Media library (required alt text),
> Site Settings, **Categories (+ sub-categories), Services, Projects, Vacancies
> (careers), Blog posts, Testimonials and Clients**, plus **Home-page and page
> content globals** (hero/section images + copy) — all with SEO fields by
> default (the SEO plugin auto-fills meta title/description). Every public page
> reads from the CMS with a fall back to the typed `/content` files when the
> database is empty, edits revalidate the live pages instantly, and email
> (password reset / verification) is wired to SMTP.

## Migrate the existing content into the CMS (one-time)

All of the current site content (categories, 9 services + related links, 6
projects, 3 vacancies, 3 blog posts, 8 testimonials, 19 clients, Site Settings
and the four page globals) is imported into the database in one call:

```bash
curl -X POST "https://www.adam.qa/api/seed?secret=$PAYLOAD_SECRET"
# → {"ok":true,"categories":2,"services":9,"related":9,"projects":6,
#    "vacancies":3,"posts":3,"testimonials":8,"clients":19,
#    "siteSettings":true,"globals":true,"adminCreated":true}
```

It is idempotent (safe to re-run; matches by slug). The guard secret is
`SEED_SECRET` if set, otherwise `PAYLOAD_SECRET`. Remove the route once migrated
if you prefer.

**First admin, hands-free:** if `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set and
no user exists yet, the same seed call creates that admin (`adminCreated:true`)
so a fresh deploy needs no interactive setup. Leave them unset to use Payload's
"create first user" screen at `/admin` instead. Unset/rotate the password after
first login.

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

A ready-to-use script backs up both the database and the media volume and
prunes old copies:

```bash
./deploy/backup.sh          # writes ./backups/db-*.sql.gz and media-*.tgz
```

Schedule it nightly with cron (keeps 14 days by default; `KEEP_DAYS` overrides):

```cron
30 2 * * * cd /root/adam && ./deploy/backup.sh >> /var/log/adam-backup.log 2>&1
```

**Restore:**

- **Database:** `gunzip -c backups/db-YYYY-MM-DD_HHMM.sql.gz | docker compose exec -T db psql -U adam adam_cms`
- **Media:** `docker run --rm -v adam_media:/m -v $PWD/backups:/b alpine tar xzf /b/media-YYYY-MM-DD_HHMM.tgz -C /m`
  (confirm the volume name with `docker volume ls`).

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
- **Email:** the nodemailer adapter (`lib/payload/email.ts`) sends Payload's
  password-reset / verification mail over SMTP when `SMTP_HOST` / `SMTP_USER` /
  `SMTP_PASSWORD` are set. When they are unset (local dev) Payload logs a
  preview URL to the console instead of sending, so no mail server is needed to
  develop. Set the SMTP vars in `.env` before go-live so reset links work.
- **Revalidation:** content collections and globals carry an `afterChange` /
  `afterDelete` hook (`cms/hooks/revalidate.ts`) that calls `revalidatePath`, so
  an edit in `/admin` refreshes the live pages without a redeploy. ISR
  (`revalidate = 3600`) is the fallback baseline.
