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
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0]!.trim() : "unknown";
}

function esc(s: string): string {
  return s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c] ?? c);
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

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  const service = String(form.get("service") ?? "").trim();
  const variant = String(form.get("variant") ?? "contact").trim();
  const subjectPrefix = String(form.get("subjectPrefix") ?? "").trim();
  const cv = form.get("cv");

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ message: "Please complete all required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const label = variant === "rfq" ? "RFQ" : variant === "careers" ? "Job Application" : "Contact";
  const subject = `[${label}] ${subjectPrefix || service || "Website enquiry"} — ${name}`;
  const cvNote =
    cv && typeof cv === "object" && "name" in cv && (cv as File).name
      ? `\nCV attached: ${(cv as File).name} (${Math.round((cv as File).size / 1024)} KB)`
      : "";

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
      // No provider configured — log so nothing is lost in dev/preview.
      console.info("[contact] (no email provider configured)\n", subject, "\n", text);
    }
    return NextResponse.json({ message: "Received" }, { status: 200 });
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return NextResponse.json(
      { message: "We couldn't send your message right now. Please call us or try again." },
      { status: 502 },
    );
  }
}
