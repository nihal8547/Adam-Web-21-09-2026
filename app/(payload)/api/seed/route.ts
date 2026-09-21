import { getPayload } from "payload";
import config from "@payload-config";
import { runSeed } from "@/lib/payload/seed";

/**
 * POST /api/seed — one-time migration of the /content data into the CMS.
 * Guarded: requires ?secret=<PAYLOAD_SECRET> (or a SEED_SECRET env if set).
 * Idempotent, so it is safe to re-run. Remove or disable once migrated.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: Request) {
  const guard = process.env.SEED_SECRET || process.env.PAYLOAD_SECRET || "";
  const secret = new URL(req.url).searchParams.get("secret");
  if (!guard || secret !== guard) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const payload = await getPayload({ config });
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
