import Container from "@/components/Container";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

type CTA = { label: string; href: string };

/**
 * Reusable call-to-action band. `tone`:
 *  - "ink"  → dark ink-900 surface (default, high contrast)
 *  - "gold" → brand-50 gold-tinted wash (e.g. QCDD band)
 */
export default function CTABand({
  eyebrow,
  heading,
  body,
  primary,
  secondary,
  tone = "ink",
  className,
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  primary: CTA;
  secondary?: CTA;
  tone?: "ink" | "gold";
  className?: string;
}) {
  const isInk = tone === "ink";
  return (
    <section
      className={cn(isInk ? "bg-[var(--color-ink-900)]" : "bg-[var(--surface-wash)]", className)}
    >
      <Container className="py-14 md:py-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            {eyebrow ? (
              <span className={cn("eyebrow", isInk && "text-[var(--on-invert-accent)]")}>
                {eyebrow}
              </span>
            ) : null}
            <h2
              className={cn(
                "mt-2 text-[length:var(--text-2xl)]",
                isInk ? "text-[var(--on-invert)]" : "text-[var(--heading)]",
              )}
            >
              {heading}
            </h2>
            {body ? (
              <p className={cn("mt-3 text-[1rem]", isInk ? "text-white/75" : "text-[var(--body)]")}>
                {body}
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button href={primary.href} variant="primary" size="lg">
              {primary.label}
            </Button>
            {secondary ? (
              <Button href={secondary.href} variant={isInk ? "invert" : "secondary"} size="lg">
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
