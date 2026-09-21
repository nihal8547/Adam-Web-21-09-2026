import { getPayload, type Payload } from "payload";
import config from "@payload-config";

/**
 * Cached Payload local-API client for reading CMS content from server
 * components. Never import this into a "use client" file.
 */
let cached: Promise<Payload> | null = null;
export function getCms(): Promise<Payload> {
  if (!cached) cached = getPayload({ config });
  return cached;
}

/**
 * Run a CMS read and fall back to static content on any failure or empty
 * result. This keeps the site rendering even before the DB is seeded (or in a
 * preview without a database), and lets the CMS take over once it has data.
 */
export async function fromCms<T>(
  read: (payload: Payload) => Promise<T | null | undefined>,
  fallback: T,
): Promise<T> {
  try {
    const payload = await getCms();
    const value = await read(payload);
    if (value === null || value === undefined) return fallback;
    if (Array.isArray(value) && value.length === 0) return fallback;
    return value;
  } catch {
    return fallback;
  }
}

/** Resolve a Payload upload (media doc or id) to a servable URL, or undefined. */
export function mediaUrl(value: unknown): string | undefined {
  if (!value || typeof value !== "object") return undefined;
  const doc = value as { url?: string };
  return typeof doc.url === "string" ? doc.url : undefined;
}
