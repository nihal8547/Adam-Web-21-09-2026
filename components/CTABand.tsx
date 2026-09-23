import Container from "@/components/Container";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

type CTA = { label: string; href: string };

/**
 * Reusable call-to-action band — always a light, gold-tinted surface (no dark
 * backgrounds per the current design direction). `tone` only varies the depth
 * of the gold wash:
 *  - "gold" → soft brand-50 wash (default look)
 *  - "ink"  → slightly richer brand-50→brand-100 wash with a gold top rule
 * Both keep ink text and gold accents.
 */
export default function CTABand({
  eyebrow,
  heading,
  body,
  primary,
  secondary,
  tone = "navy",
  className,
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  primary: CTA;
  secondary?: CTA;
  tone?: "ink" | "gold" | "surface" | "navy";
  className?: string;
}) {
  const isSurface = tone === "surface";
  // Default all other tones (ink, gold, navy) to the navy style to remove yellow sections
  const isNavy = !isSurface;
  
  return (
    <section
      className={cn(
        !isSurface && !isNavy && "border-y border-[var(--color-brand-100)]",
        isNavy
          ? "bg-[var(--color-navy-900)] text-white"
          : "bg-[var(--surface)]",
        className,
      )}
    >
      <Container className="py-14 md:py-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
            <h2 className={cn("mt-2 text-[length:var(--text-2xl)]", isNavy ? "text-white" : "text-[var(--heading)]")}>{heading}</h2>
            {body ? <p className={cn("mt-3 text-[1rem]", isNavy ? "text-white/80" : "text-[var(--body)]")}>{body}</p> : null}
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button href={primary.href} variant="primary" size="lg">
              {primary.label}
            </Button>
            {secondary ? (
              <Button href={secondary.href} variant="secondary" size="lg">
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
