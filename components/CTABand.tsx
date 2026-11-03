import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

type CTA = { label: string; href: string };

/**
 * Reusable call-to-action band with optional background image support.
 */
export default function CTABand({
  eyebrow,
  heading,
  body,
  primary,
  secondary,
  tone = "surface",
  backgroundImage,
  className,
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  primary: CTA;
  secondary?: CTA;
  tone?: "ink" | "gold" | "surface" | "navy";
  backgroundImage?: string;
  className?: string;
}) {
  const hasBgImage = Boolean(backgroundImage);
  const isNavy = tone === "navy" || hasBgImage;

  return (
    <section
      className={cn(
        "relative overflow-hidden border-y border-[var(--border)]",
        hasBgImage
          ? "bg-[var(--color-navy-900)] text-white"
          : isNavy
          ? "bg-[var(--color-navy-900)] text-white"
          : "bg-white",
        className,
      )}
    >
      {hasBgImage && (
        <>
          <Image
            src={backgroundImage!}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
          {/* Rich navy-to-dark gradient overlay for optimal readability */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy-900)]/95 via-[var(--color-navy-900)]/88 to-[var(--color-navy-900)]/75 backdrop-blur-[1px]"
          />
        </>
      )}

      <Container className="relative z-10 py-14 md:py-16">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              {eyebrow ? (
                <span
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider",
                    isNavy ? "text-amber-400" : "text-[var(--color-brand-500)]",
                  )}
                >
                  {eyebrow}
                </span>
              ) : null}
              <h2
                className={cn(
                  "mt-2 text-[length:var(--text-2xl)] font-bold tracking-tight",
                  isNavy ? "text-white" : "text-[var(--heading)]",
                )}
              >
                {heading}
              </h2>
              {body ? (
                <p
                  className={cn(
                    "mt-3 text-[1rem] leading-relaxed",
                    isNavy ? "text-white/85" : "text-[var(--body)]",
                  )}
                >
                  {body}
                </p>
              ) : null}
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button href={primary.href} variant="primary" size="lg">
                {primary.label}
              </Button>
              {secondary ? (
                <Button
                  href={secondary.href}
                  variant={isNavy ? "invert" : "secondary"}
                  size="lg"
                >
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
