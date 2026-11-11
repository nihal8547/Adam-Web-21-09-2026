"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { cn } from "@/lib/cn";

export interface HeroSlide {
  image: string;
  alt?: string;
  line1: string;
  line2?: string;
  sub: string;
  video?: string;
}

export interface HeroProps {
  eyebrow?: string;
  h1?: string;
  sub?: string;
  media?: { video?: string; poster?: string; posterAlt?: string };
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  quickAccess?: Array<{ icon?: string; label: string; sub?: string; href: string }>;
  slides?: HeroSlide[];
}

const ROTATION_INTERVAL = 6000;

function splitHeading(text: string): { line1: string; line2?: string } {
  if (!text) return { line1: "", line2: "" };
  if (text.includes("\n")) {
    const [l1, ...rest] = text.split("\n");
    return { line1: l1.trim(), line2: rest.join(" ").trim() };
  }
  if (text.includes(" & ")) {
    const idx = text.indexOf(" & ");
    return { line1: text.slice(0, idx).trim(), line2: text.slice(idx).trim() };
  }
  return { line1: text, line2: "" };
}

function Hero({
  eyebrow,
  h1,
  sub,
  media,
  primaryCta,
  secondaryCta,
  slides,
}: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Dynamic slides driven by the Admin Panel CMS
  const heroSlides: HeroSlide[] = useMemo(() => {
    // 1. Primary slide constructed from CMS Hero H1, Sub & Media
    const cmsH1 = h1 || "QCDD Approved Fire Protection & Underground Leak Detection Contractor in Qatar";
    const cmsSub = sub || "Turnkey Civil Defence approval, automatic fire alarm and sprinkler systems, industrial HVAC, and precision water leak detection across Doha and Qatar.";
    const cmsImage = media?.poster || "/images/hero-bg.jpg";
    const cmsAlt = media?.posterAlt || cmsH1;
    const { line1: primaryLine1, line2: primaryLine2 } = splitHeading(cmsH1);

    const primarySlide: HeroSlide = {
      image: cmsImage,
      alt: cmsAlt,
      line1: primaryLine1,
      line2: primaryLine2,
      sub: cmsSub,
      video: media?.video || undefined,
    };

    // If admin explicitly configured custom rotating slides in CMS
    if (slides && slides.length > 0) {
      return [primarySlide, ...slides];
    }

    // Default: Single authoritative primary hero slide from CMS
    return [primarySlide];
  }, [h1, sub, media, slides]);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsAnimating(false);
      }, 350);
    }, ROTATION_INTERVAL);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const active = heroSlides[currentSlide] || heroSlides[0];

  return (
    <section
      aria-label="Hero"
      className="relative flex h-screen min-h-screen h-[100dvh] min-h-[100dvh] items-end overflow-hidden"
    >
      {/* Background slide images or video */}
      {heroSlides.map((slide, idx) => (
        <div
          key={`${slide.image}-${idx}`}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            idx === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none",
          )}
        >
          {slide.video ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={slide.image || "/images/hero-bg.jpg"}
            >
              <source src={slide.video} />
            </video>
          ) : (
            <Image
              src={slide.image}
              alt={slide.alt || slide.line1 || "Adam Technical Services"}
              fill
              sizes="100vw"
              priority={idx === 0}
              unoptimized
              className="object-cover object-center"
            />
          )}
        </div>
      ))}

      {/* Cinematic dark gradients for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--color-navy-950)] via-[var(--color-navy-950)]/60 to-black/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-r from-[var(--color-navy-950)]/80 via-transparent to-transparent"
      />

      {/* Subtle brand bar */}
      <div
        aria-hidden
        className="absolute left-0 top-1/2 h-40 w-1.5 -translate-y-1/2 bg-[var(--color-brand-500)]"
      />

      {/* Overlaid content, bottom-left */}
      <Container className="relative z-10 w-full pb-16 md:pb-20 lg:pb-24">
        {eyebrow && (
          <div className="hero-fade-1 mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--color-brand-500)]/40 bg-[var(--color-navy-950)]/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-400)] backdrop-blur-md">
            {eyebrow}
          </div>
        )}

        <h1
          key={`title-${currentSlide}`}
          className={cn(
            "hero-fade-1 mt-3 max-w-4xl text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold !text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.6)] leading-tight transition-all duration-700 ease-out",
            isAnimating
              ? "opacity-0 translate-y-2.5"
              : "opacity-100 translate-y-0",
          )}
          style={{ color: "#ffffff" }}
        >
          <span className="block leading-tight">{active.line1}</span>
          {active.line2 && <span className="block leading-tight">{active.line2}</span>}
        </h1>

        <p
          key={`sub-${currentSlide}`}
          className={cn(
            "hero-fade-2 mt-2.5 max-w-[45ch] text-sm md:text-base font-normal !text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out",
            isAnimating
              ? "opacity-0 translate-y-2.5"
              : "opacity-100 translate-y-0",
          )}
          style={{ color: "rgba(255, 255, 255, 0.9)" }}
        >
          {active.sub}
        </p>

        {/* Action CTAs configured from Admin Panel */}
        {(primaryCta?.label || secondaryCta?.label) && (
          <div className="hero-fade-2 mt-5 flex flex-wrap items-center gap-3">
            {primaryCta?.label && (
              <Link
                href={primaryCta.href || "/request-for-quotation"}
                className="inline-flex items-center justify-center rounded-lg bg-amber-500 hover:bg-amber-400 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta?.label && (
              <Link
                href={secondaryCta.href || "/contact-us"}
                className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/40"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

export default Hero;
export { Hero };
