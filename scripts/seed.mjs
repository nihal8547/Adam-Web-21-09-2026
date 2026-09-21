// Seed the CMS: imports the /content data and (if ADMIN_EMAIL/ADMIN_PASSWORD
// are set and no user exists) creates the first admin. Calls the running dev
// server's guarded /api/seed route, so start `npm run dev` first.
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Minimal .env reader (no dependency): last value wins, ignores comments.
function readEnv() {
  const out = {};
  for (const file of [".env", ".env.local"]) {
    const p = join(root, file);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
  return out;
}

const env = readEnv();
const secret = process.env.SEED_SECRET || process.env.PAYLOAD_SECRET || env.PAYLOAD_SECRET;
const base = (process.env.SEED_URL || "http://localhost:3000").replace(/\/$/, "");

if (!secret) {
  console.error("No PAYLOAD_SECRET found in env or .env — cannot seed.");
  process.exit(1);
}

const url = `${base}/api/seed?secret=${encodeURIComponent(secret)}`;
console.log(`Seeding via ${base}/api/seed ...`);

try {
  const res = await fetch(url, { method: "POST" });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.ok === false) {
    console.error(`Seed failed (HTTP ${res.status}):`, body.error || body);
    process.exit(1);
  }
  console.log("Seed complete:", JSON.stringify(body));
} catch (err) {
  console.error(
    `Could not reach ${base}. Is \`npm run dev\` running? (${err instanceof Error ? err.message : err})`,
  );
  process.exit(1);
}
