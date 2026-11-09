import { getPayload } from "payload";
import config from "@payload-config";
import { runSeed } from "@/lib/payload/seed";
import { pushDevSchema } from "@payloadcms/drizzle";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

/**
 * POST /api/seed — bootstrap schema push and migration of content into CMS.
 * Guarded: requires Bearer token, X-Seed-Secret header, or ?secret=<PAYLOAD_SECRET>.
 * Idempotent, so it is safe to re-run.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 120;

function safeCompare(a: string, b: string): boolean {
  if (!a || !b) return false;
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

function extractSecret(req: Request): string {
  // Check Authorization header (Bearer <secret>)
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    return authHeader.slice(7).trim();
  }
  // Check custom header
  const customHeader = req.headers.get("x-seed-secret");
  if (customHeader) {
    return customHeader.trim();
  }
  // Fallback to query parameter (for legacy scripts)
  return new URL(req.url).searchParams.get("secret") || "";
}

async function handleSeed(req: Request) {
  const guard = process.env.SEED_SECRET || process.env.PAYLOAD_SECRET || "";
  const secret = extractSecret(req);

  if (!guard || !secret || !safeCompare(secret, guard)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });
    // In production Docker, Payload skips pushDevSchema by default.
    // Ensure all tables and relations are pushed to PostgreSQL:
    try {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      await pushDevSchema(payload.db as any);
    } catch (schemaErr) {
      console.warn("[seed] pushDevSchema notice:", schemaErr);
    }
    const result = await runSeed(payload);
    try {
      revalidatePath("/", "layout");
    } catch (revalErr) {
      console.warn("[seed] revalidatePath warning:", revalErr);
    }
    return Response.json({ ok: true, ...result });
  } catch (err) {
    console.error("[seed] failed:", err);
    const safeError =
      process.env.NODE_ENV === "production"
        ? "Seed process failed. Check server logs."
        : err instanceof Error
          ? err.message
          : "Seed failed";
    return Response.json({ ok: false, error: safeError }, { status: 500 });
  }
}

export async function GET() {
  return Response.json(
    { error: "Method Not Allowed. Database seeding requires a POST request." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

export async function POST(req: Request) {
  return handleSeed(req);
}
