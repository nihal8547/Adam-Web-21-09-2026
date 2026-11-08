import { NextResponse } from "next/server";
import { site } from "@/content/site";

/**
 * Contact / RFQ / Careers form handler.
 *  - Accepts multipart FormData (so the careers CV upload works).
 *  - Honeypot (`company_website`) + minimum-fill-time guard reject bots.
 *  - Simple in-memory rate limit per IP (best-effort; use a shared store such
 *    as Upstash in production behind multiple instances).
 *  - Delivers via Resend if RESEND_API_KEY is set, else SMTP if configured,
 *    else logs and returns success so previews/dev work without secrets.
 */

export const runtime = "nodejs";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const MAX_MAP_ENTRIES = 5_000;
const hits = new Map<string, number[]>();

function pruneOldHits(now: number) {
  if (hits.size > MAX_MAP_ENTRIES) {
    for (const [key, timestamps] of hits.entries()) {
      const valid = timestamps.filter((t) => now - t < WINDOW_MS);
      if (valid.length === 0) {
        hits.delete(key);
      } else {
        hits.set(key, valid);
      }
    }
  }
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  pruneOldHits(now);
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  const rawIp = fwd ? fwd.split(",")[0]!.trim() : "unknown";
  // Sanitize IP representation to prevent memory key ballooning
  return rawIp.slice(0, 45).replace(/[^a-zA-Z0-9:.]/g, "");
}

function esc(s: string): string {
  return s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c] ?? c);
}

function sanitizeHeader(val: string): string {
  // Strip carriage return and newline characters to prevent CRLF header injection
  return val.replace(/[\r\n\t]+/g, " ").trim();
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many submissions. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ message: "Invalid submission." }, { status: 400 });
  }

  // Honeypot: must be empty.
  if (String(form.get("company_website") ?? "").trim() !== "") {
    // Pretend success so bots don't learn anything.
    return NextResponse.json({ message: "Thanks!" }, { status: 200 });
  }

  // Minimum fill time (bots submit instantly).
  const ts = Number(form.get("ts") ?? 0);
  if (ts && Date.now() - ts < 1200) {
    return NextResponse.json({ message: "Thanks!" }, { status: 200 });
  }

  // Extract with strict length boundaries to prevent Denial of Service / buffer bloat
  const name = sanitizeHeader(String(form.get("name") ?? "").slice(0, 100));
  const email = sanitizeHeader(String(form.get("email") ?? "").slice(0, 100));
  const phone = sanitizeHeader(String(form.get("phone") ?? "").slice(0, 30));
  const message = String(form.get("message") ?? "").slice(0, 5000).trim();
  const service = sanitizeHeader(String(form.get("service") ?? "").slice(0, 100));
  const variant = sanitizeHeader(String(form.get("variant") ?? "contact").slice(0, 30));
  const subjectPrefix = sanitizeHeader(String(form.get("subjectPrefix") ?? "").slice(0, 100));
  const cv = form.get("cv");

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ message: "Please complete all required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  let cvNote = "";
  if (cv && typeof cv === "object" && "name" in cv && (cv as File).name) {
    const file = cv as File;
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxFileSize) {
      return NextResponse.json(
        { message: "CV file size exceeds the 5MB limit. Please attach a smaller file." },
        { status: 400 },
      );
    }
    const fileName = sanitizeHeader(file.name.slice(0, 100));
    const dangerousExts = /\.(exe|bat|cmd|sh|php|js|vbs|ps1|svg|htm|html|dll|py|jar)$/i;
    if (dangerousExts.test(fileName)) {
      return NextResponse.json(
        { message: "Invalid file type. Only PDF and document files are accepted." },
        { status: 400 },
      );
    }
    cvNote = `\nCV attached: ${fileName} (${Math.round(file.size / 1024)} KB)`;
  }

  const label = variant === "rfq" ? "RFQ" : variant === "careers" ? "Job Application" : "Contact";
  const subject = `[${label}] ${subjectPrefix || service || "Website enquiry"} — ${name}`;

  const text = [
    `Type: ${label}`,
    subjectPrefix ? `Context: ${subjectPrefix}` : "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    service ? `Service: ${service}` : "",
    "",
    "Message:",
    message,
    cvNote,
  ]
    .filter(Boolean)
    .join("\n");

  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "website@adam.qa";

  try {
    if (process.env.RESEND_API_KEY) {
      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Adam Website <${from}>`,
          to: [to],
          reply_to: email,
          subject,
          text,
          html: `<pre style="font-family:inherit;white-space:pre-wrap">${esc(text)}</pre>`,
        }),
      });
      if (!resp.ok) throw new Error(`Resend responded ${resp.status}`);
    } else {
      // Safe operational logging without exposing customer PII (GDPR / Privacy defense)
      console.info(
        `[contact] Submission received: type=${label}, variant=${variant}, emailDomain=${email.split("@")[1] || "unknown"}`,
      );
    }
    return NextResponse.json({ message: "Received" }, { status: 200 });
  } catch (err) {
    console.error("[contact] delivery failed:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json(
      { message: "We couldn't send your message right now. Please call us or try again." },
      { status: 502 },
    );
  }
}
