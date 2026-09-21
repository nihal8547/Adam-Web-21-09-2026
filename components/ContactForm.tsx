"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { ButtonEl } from "@/components/Button";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

type Variant = "contact" | "rfq" | "sidebar" | "careers";

type Field = "name" | "email" | "phone" | "company" | "service" | "message";

const REQUIRED: Field[] = ["name", "phone", "email", "message"];

/**
 * Accessible contact / RFQ / careers form. Client component (interactive
 * validation + submit). Honeypot (`company_website`) + a submit timestamp guard
 * deter bots; the route handler adds server-side rate limiting.
 * Inline errors are text (not colour alone) and wired via aria-describedby.
 */
export default function ContactForm({
  variant = "contact",
  className,
  subjectPrefix,
}: {
  variant?: Variant;
  className?: string;
  /** Pre-fills the subject/context, e.g. a service or role name. */
  subjectPrefix?: string;
}) {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");
  const isCareers = variant === "careers";
  const compact = variant === "sidebar";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Client-side validation.
    const nextErrors: Partial<Record<Field, string>> = {};
    for (const field of REQUIRED) {
      const val = String(data.get(field) ?? "").trim();
      if (!val) nextErrors[field] = "This field is required.";
    }
    const email = String(data.get("email") ?? "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`);
      first?.focus();
      return;
    }

    setStatus("submitting");
    setServerMsg("");
    try {
      data.set("variant", variant);
      if (subjectPrefix) data.set("subjectPrefix", subjectPrefix);
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const json = (await res.json().catch(() => ({}))) as { message?: string };
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setServerMsg(json.message ?? "Something went wrong. Please try again or call us.");
      }
    } catch {
      setStatus("error");
      setServerMsg("Network error. Please try again or call us directly.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-wash)] p-8 text-center",
          className,
        )}
        role="status"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-500)] text-[var(--color-ink-900)]">
          <Icon name="check" size={26} />
        </span>
        <h3 className="mt-4 text-[1.25rem] font-semibold text-[var(--heading)]">Thank you!</h3>
        <p className="mt-2 text-[var(--body)]">
          Your message has been received. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("flex flex-col gap-4", className)}
      aria-label={isCareers ? "Job application form" : "Contact form"}
    >
      {/* Honeypot — hidden from users, tempting to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Do not fill this field</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input
        type="hidden"
        name="ts"
        value={typeof Date !== "undefined" ? Date.now() : 0}
        readOnly
      />

      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <TextField
          name="name"
          label={isCareers ? "Full name" : "Name"}
          required
          error={errors.name}
          autoComplete="name"
        />
        <TextField
          name="phone"
          label="Phone"
          type="tel"
          required
          error={errors.phone}
          autoComplete="tel"
        />
      </div>
      <TextField
        name="email"
        label="Email"
        type="email"
        required
        error={errors.email}
        autoComplete="email"
      />

      {!isCareers ? (
        <div>
          <Label htmlFor="service">Service</Label>
          <select
            id="service"
            name="service"
            defaultValue={subjectPrefix ?? ""}
            className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[0.95rem] text-[var(--heading)]"
          >
            <option value="">Select a service (optional)</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="QCDD License Renewal">QCDD License Renewal</option>
            <option value="Other">Other</option>
          </select>
        </div>
      ) : null}

      {isCareers ? (
        <div>
          <Label htmlFor="cv">CV / Résumé (PDF or Word)</Label>
          <input
            id="cv"
            name="cv"
            type="file"
            accept=".pdf,.doc,.docx"
            className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[0.9rem] text-[var(--body)] file:mr-3 file:rounded-[var(--radius-sm)] file:border-0 file:bg-[var(--surface-wash)] file:px-3 file:py-1.5 file:text-[var(--accent-strong)]"
          />
        </div>
      ) : null}

      <div>
        <Label htmlFor="message" required>
          {variant === "rfq" ? "Project details" : "Message"}
        </Label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 3 : 5}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[0.95rem] text-[var(--heading)]"
        />
        {errors.message ? <FieldError id="message-error">{errors.message}</FieldError> : null}
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="flex items-center gap-2 text-[0.9rem] text-[var(--color-alert-600)]"
        >
          <Icon name="close" size={16} /> {serverMsg}
        </p>
      ) : null}

      <ButtonEl
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="mt-1 w-full sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : isCareers ? "Submit Application" : "Send Message"}
      </ButtonEl>
      <p className="text-[0.78rem] text-[var(--body)]">
        By submitting, you agree to be contacted about your enquiry. We respect your privacy.
      </p>
    </form>
  );
}

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-[0.85rem] font-semibold text-[var(--subheading)]">
      {children}
      {required ? (
        <span className="text-[var(--color-alert-600)]" aria-hidden>
          {" "}
          *
        </span>
      ) : null}
    </label>
  );
}

function TextField({
  name,
  label,
  type = "text",
  required,
  error,
  autoComplete,
}: {
  name: Field;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[0.95rem] text-[var(--heading)]"
      />
      {error ? <FieldError id={`${name}-error`}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p
      id={id}
      className="mt-1.5 flex items-center gap-1.5 text-[0.82rem] text-[var(--color-alert-600)]"
    >
      <Icon name="close" size={13} />
      {children}
    </p>
  );
}
