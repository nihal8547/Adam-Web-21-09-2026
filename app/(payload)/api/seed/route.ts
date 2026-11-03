import { getPayload } from "payload";
import config from "@payload-config";
import { runSeed } from "@/lib/payload/seed";
import { pushDevSchema } from "@payloadcms/drizzle";

/**
 * POST /api/seed — bootstrap schema push and migration of content into CMS.
 * Guarded: requires ?secret=<PAYLOAD_SECRET> (or a SEED_SECRET env if set).
 * Idempotent, so it is safe to re-run.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 120;

async function handleSeed(req: Request) {
  const guard = process.env.SEED_SECRET || process.env.PAYLOAD_SECRET || "";
  const secret = new URL(req.url).searchParams.get("secret");
  if (!guard || secret !== guard) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const payload = await getPayload({ config });
    // In production Docker, Payload skips pushDevSchema by default.
    // Ensure all tables and relations are pushed to PostgreSQL:
    try {
      await pushDevSchema(payload.db as any);
    } catch (schemaErr) {
      console.warn("[seed] pushDevSchema notice:", schemaErr);
    }
    const result = await runSeed(payload);
    return Response.json({ ok: true, ...result });
  } catch (err) {
    console.error("[seed] failed:", err);
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "Seed failed" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  return handleSeed(req);
}

export async function POST(req: Request) {
  return handleSeed(req);
}
