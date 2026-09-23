"use client";

/**
 * App-wide error boundary (catches failures in any route group, including the
 * root layouts — e.g. the Payload admin when its database is unreachable).
 * Without it, such a failure renders Next.js's blank "Application error: a
 * client-side exception has occurred" screen. Instead we show what went wrong
 * and how to fix it, so the admin (and site) are diagnosable. Because it can
 * replace a failed root layout, it must render its own <html>/<body>.
 */
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaces the real cause in the browser console and server logs.
    console.error("[app] render error:", error);
  }, [error]);

  const msg = error?.message || "";
  // In production Next.js strips Server Component error messages, so we can't
  // always match on the text. The admin panel is the only part of the app that
  // hard-requires the database (public pages fall back to static content), so
  // treat any /admin failure as the "database unreachable" case — that is by
  // far the usual cause — and also match the message when it survives (dev).
  const onAdmin = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");
  const isDbError =
    onAdmin ||
    /postgres|database|ECONNREFUSED|connect|DATABASE_URI|pool|relation .* does not exist/i.test(
      msg,
    );

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f6f6f4",
          color: "#1a1a1a",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          padding: "24px",
        }}
      >
        <main
          style={{
            maxWidth: 620,
            width: "100%",
            background: "#fff",
            border: "1px solid #e6e6e0",
            borderRadius: 14,
            padding: "32px 28px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#8a6d00",
              background: "#fbf3d5",
              border: "1px solid #f0e2a8",
              borderRadius: 999,
              padding: "4px 12px",
            }}
          >
            Admin unavailable
          </div>

          <h1 style={{ fontSize: 24, margin: "16px 0 8px", lineHeight: 1.25 }}>
            {isDbError
              ? "The CMS can’t reach its database"
              : "Something went wrong loading the admin"}
          </h1>

          {isDbError ? (
            <>
              <p style={{ color: "#4a4a44", lineHeight: 1.6, marginTop: 0 }}>
                The admin panel needs a running PostgreSQL database. It looks like{" "}
                <code style={code}>DATABASE_URI</code> isn’t reachable. To fix it locally:
              </p>
              <ol style={{ color: "#4a4a44", lineHeight: 1.7, paddingLeft: 20 }}>
                <li>
                  Start the dev database: <code style={code}>npm run db:up</code>
                </li>
                <li>
                  If you don’t have a <code style={code}>.env</code> yet:{" "}
                  <code style={code}>npm run setup</code>
                </li>
                <li>
                  Restart the app: <code style={code}>npm run dev</code>
                </li>
                <li>
                  (First time) load content + admin user: <code style={code}>npm run seed</code>
                </li>
              </ol>
            </>
          ) : (
            <p style={{ color: "#4a4a44", lineHeight: 1.6, marginTop: 0 }}>
              An unexpected error occurred while rendering the admin. The details are in the browser
              console and the server logs.
            </p>
          )}

          <pre
            style={{
              marginTop: 16,
              padding: "12px 14px",
              background: "#faf9f6",
              border: "1px solid #ececE6",
              borderRadius: 8,
              fontSize: 12.5,
              color: "#6a6a62",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {msg || "Unknown error"}
            {error?.digest ? `\n(digest: ${error.digest})` : ""}
          </pre>

          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 20,
              appearance: "none",
              border: "none",
              cursor: "pointer",
              background: "#c9a24b",
              color: "#1a1a1a",
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 10,
              padding: "11px 20px",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}

const code: React.CSSProperties = {
  background: "#f1efe8",
  border: "1px solid #e2ddce",
  borderRadius: 6,
  padding: "1px 6px",
  fontSize: "0.9em",
};
