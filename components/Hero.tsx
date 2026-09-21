import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { Button } from "@/components/Button";
import Icon, { type IconName } from "@/components/Icon";
import { hero } from "@/content/company";

/**
 * Home hero — NAFFCO-style full-bleed background (video or photo) with minimal
 * overlaid copy and a gold quick-access bar. The background stays clearly
 * visible; only a light bottom scrim keeps the short text legible.
 *
 * SEO: the <h1> is real text over the media (not baked into an image) and keeps
 * the primary keyword. Set hero.media.video to switch the background to video.
 */
export default function Hero() {
  const { media } = hero;
  return (
    <section className="relative isolate flex min-h-[560px] items-end overflow-hidden text-white md:min-h-[620px]">
      {/* Background media (video if provided, else poster image) */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[var(--color-ink-900)]">
        {media.video ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={media.poster}
          >
            <source src={media.video} />
          </video>
        ) : (
          <Image
            src={media.poster}
            alt={media.posterAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>

      {/* Light legibility scrim — fades in near the bottom only */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,14,12,0.10) 0%, rgba(15,14,12,0) 26%, rgba(15,14,12,0) 50%, rgba(15,14,12,0.62) 88%, rgba(15,14,12,0.80) 100%)",
        }}
      />

      {/* Gold accent bar */}
      <span
        aria-hidden
        className="absolute left-0 top-1/2 h-40 w-1.5 -translate-y-1/2 bg-[var(--color-brand-500)]"
      />

      {/* Minimal overlaid content, bottom-left */}
      <Container className="relative z-10 w-full pb-28 md:pb-32">
        <span className="eyebrow gold-rule !text-[var(--color-brand-300)] [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
          {hero.eyebrow}
        </span>
        <h1 className="mt-4 max-w-[15ch] text-[length:var(--text-4xl)] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.45)]">
          {hero.h1}
        </h1>
        <p className="mt-4 max-w-[40ch] text-[length:var(--text-lg)] font-semibold text-white/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
          {hero.sub}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href={hero.primaryCta.href} size="lg">
            {hero.primaryCta.label} →
          </Button>
          <Button
            href={hero.secondaryCta.href}
            size="lg"
            className="border border-white/70 text-white hover:bg-white hover:text-[var(--color-ink-900)]"
          >
            {hero.secondaryCta.label}
          </Button>
        </div>
      </Container>

      {/* Gold quick-access bar */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-[var(--color-brand-500)]">
        <Container className="grid grid-cols-1 sm:grid-cols-3">
          {hero.quickAccess.map((q, i) => (
            <Link
              key={q.label}
              href={q.href}
              className={`flex items-center gap-3 px-1 py-4 text-[var(--color-ink-900)] transition-colors hover:bg-[var(--color-brand-600)] sm:px-4 ${
                i < hero.quickAccess.length - 1 ? "sm:border-r sm:border-[rgba(18,18,18,0.12)]" : ""
              }`}
            >
              <Icon name={q.icon as IconName} size={22} className="shrink-0" />
              <span className="font-[var(--font-display)] text-[0.95rem] font-bold leading-tight">
                {q.label}
                <span className="block font-[var(--font-inter)] text-[0.72rem] font-medium text-[rgba(18,18,18,0.7)]">
                  {q.sub}
                </span>
              </span>
            </Link>
          ))}
        </Container>
      </div>
    </section>
  );
}
