import Image from "next/image";
import Container from "@/components/Container";
import { Button } from "@/components/Button";
import TrustStrip from "@/components/TrustStrip";
import { hero } from "@/content/company";

/**
 * Home hero — split 60/40. Priority hero image (LCP), thin gold offset frame.
 * H1 carries the primary keyword.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface)]">
      {/* Subtle top wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[var(--surface-wash)] opacity-60"
        style={{ maskImage: "linear-gradient(#000, transparent)" }}
      />
      <Container className="relative grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[3fr_2fr] lg:gap-14">
        <div>
          <span className="eyebrow gold-rule">{hero.eyebrow}</span>
          <h1 className="mt-5 text-[length:var(--text-4xl)] text-[var(--heading)]">{hero.h1}</h1>
          <p className="mt-5 text-[length:var(--text-lg)] font-medium text-[var(--subheading)]">
            {hero.sub}
          </p>
          <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-[var(--body)]">
            {hero.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label} →
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <TrustStrip className="mt-10 border-t border-[var(--border)] pt-6" />
        </div>

        <div className="relative">
          {/* Gold offset frame */}
          <div
            aria-hidden
            className="absolute -right-3 -top-3 hidden h-full w-full rounded-[var(--radius-md)] border-2 border-[var(--color-brand-500)] sm:block"
          />
          <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] shadow-[var(--shadow-hover)]">
            <Image
              src="/images/hero-engineering.svg"
              alt="Adam Technical Services fire protection and MEP engineers on site in Doha, Qatar"
              width={640}
              height={720}
              priority
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
