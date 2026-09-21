import Image from "next/image";
import Container from "@/components/Container";
import { hero as fallbackHero } from "@/content/company";

type HeroData = {
  h1: string;
  sub: string;
  media: { video: string; poster: string; posterAlt: string };
};

/**
 * Home hero — NAFFCO-style full-bleed background (video or photo) with minimal
 * overlaid copy and a gold quick-access bar. The background stays clearly
 * visible; only a light bottom scrim keeps the short text legible.
 *
 * SEO: the <h1> is real text over the media (not baked into an image) and keeps
 * the primary keyword. Set hero.media.video to switch the background to video.
 */
export default function Hero({ hero = fallbackHero }: { hero?: HeroData }) {
  const { media } = hero;
  return (
    <section className="relative isolate flex h-screen min-h-[600px] items-end overflow-hidden text-white">
      {/* Background media (video if provided, else poster image) */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-white">
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

      {/* Dark legibility scrim — for white text readability */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.72) 85%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Gold accent bar */}
      <span
        aria-hidden
        className="absolute left-0 top-1/2 h-40 w-1.5 -translate-y-1/2 bg-[var(--color-brand-500)]"
      />

      {/* Minimal overlaid content, bottom-left */}
      <Container className="relative z-10 w-full pb-16 md:pb-20 lg:pb-24">
        <h1
          className="hero-fade-1 mt-3 max-w-[18ch] text-2xl md:text-3xl font-bold !text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]"
          style={{ color: "#ffffff" }}
        >
          {hero.h1}
        </h1>
        <p
          className="hero-fade-2 mt-3 max-w-[45ch] text-sm md:text-base font-semibold !text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]"
          style={{ color: "rgba(255, 255, 255, 0.9)" }}
        >
          {hero.sub}
        </p>
      </Container>
    </section>
  );
}
