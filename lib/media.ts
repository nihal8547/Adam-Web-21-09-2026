/**
 * Pure URL and media utility functions. Safe to import in both Server and
 * Client components without pulling in payload or next/cache dependencies.
 */

/**
 * Normalize a media URL so that local / domain URLs are served as clean,
 * same-origin relative paths (/api/media/file/...) to prevent external domain
 * errors, CORS blocks, or next/image optimization rejections.
 */
export function normalizeMediaUrl(url: string): string {
  if (!url || typeof url !== "string") return "";
  try {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      const parsed = new URL(url);
      if (
        parsed.pathname.startsWith("/api/media/file/") ||
        parsed.pathname.startsWith("/media/")
      ) {
        return parsed.pathname;
      }
    }
  } catch {
    // If not a valid absolute URL, leave as-is
  }
  return url;
}

/** Resolve a Payload upload (media doc, filename, or URL string) to a servable URL, or undefined. */
export function mediaUrl(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? normalizeMediaUrl(trimmed) : undefined;
  }
  if (typeof value === "object") {
    const doc = value as { url?: string; filename?: string };
    if (typeof doc.url === "string" && doc.url.trim()) {
      return normalizeMediaUrl(doc.url.trim());
    }
    if (typeof doc.filename === "string" && doc.filename.trim()) {
      return `/api/media/file/${encodeURIComponent(doc.filename.trim())}`;
    }
  }
  return undefined;
}

