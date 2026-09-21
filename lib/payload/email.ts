import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

/**
 * Email transport for Payload (password resets, verification, admin notices).
 *
 * When SMTP_* env vars are set (production on the Digital Ocean droplet) mail
 * is sent over SMTP — the same credentials the contact form uses. When they
 * are absent, `undefined` is returned so Payload falls back to its built-in
 * dev transport, which logs a preview URL to the console instead of sending,
 * so local development never needs a mail server.
 */
export function buildEmail() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    return undefined;
  }

  const port = Number(process.env.SMTP_PORT || 587);

  return nodemailerAdapter({
    defaultFromName: process.env.SMTP_FROM_NAME || "Adam Technical Services",
    defaultFromAddress: process.env.CONTACT_FROM_EMAIL || user,
    transportOptions: {
      host,
      port,
      // Implicit TLS on 465; STARTTLS on 587/other.
      secure: port === 465,
      auth: { user, pass },
    },
  });
}
