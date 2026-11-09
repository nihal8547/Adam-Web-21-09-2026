import { getPayload, type Payload } from "payload";
import config from "@payload-config";
import net from "net";

/**
 * Quick reachability check for PostgreSQL.
 * If Docker / Postgres is not running, we immediately return false
 * instead of letting pg-pool hang for 18 seconds and throw unhandled rejections.
 */
let lastDbCheckTime = 0;
let lastDbAvailable = false;
const DB_CHECK_TTL = 10000; // 10 seconds cache

async function isDatabaseReachable(): Promise<boolean> {
  const now = Date.now();
  if (now - lastDbCheckTime < DB_CHECK_TTL) {
    return lastDbAvailable;
  }

  lastDbCheckTime = now;
  lastDbAvailable = await new Promise<boolean>((resolve) => {
    try {
      const uri = process.env.DATABASE_URI;
      if (!uri) return resolve(false);

      const parsedUrl = new URL(uri.replace(/^postgresql:/, "http:"));
      const port = Number(parsedUrl.port) || 5432;
      const host = parsedUrl.hostname || "127.0.0.1";

      const socket = net.createConnection({ host, port, timeout: 300 });

      socket.on("connect", () => {
        socket.destroy();
        resolve(true);
      });

      socket.on("error", () => {
        socket.destroy();
        resolve(false);
      });

      socket.on("timeout", () => {
        socket.destroy();
        resolve(false);
      });
    } catch {
      resolve(false);
    }
  });

  return lastDbAvailable;
}

/**
 * Cached Payload local-API client for reading CMS content from server
 * components. Returns null gracefully if PostgreSQL is unreachable.
 */
let cached: Promise<Payload> | null = null;
export async function getCms(): Promise<Payload | null> {
  const reachable = await isDatabaseReachable();
  if (!reachable) {
    return null;
  }

  if (!cached) {
    cached = getPayload({ config }).catch(() => {
      cached = null;
      lastDbAvailable = false;
      return null as unknown as Payload;
    });
  }
  return cached;
}

/**
 * Run a CMS read and fall back to static content on any failure, offline DB,
 * or empty result. This keeps the site rendering instantly even before the DB
 * is running or in a preview environment without Postgres.
 */
export async function fromCms<T>(
  read: (payload: Payload) => Promise<T | null | undefined>,
  fallback: T,
): Promise<T> {
  try {
    const payload = await getCms();
    if (!payload) return fallback;

    const value = await read(payload);
    if (value === null || value === undefined) return fallback;
    if (Array.isArray(value) && value.length === 0) return fallback;
    return value;
  } catch {
    return fallback;
  }
}

export { mediaUrl, normalizeMediaUrl } from "@/lib/media";
