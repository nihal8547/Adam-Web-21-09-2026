"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import { cn } from "@/lib/cn";

export type HeroSlide = {
  id: string;
  line1: string;
  line2: string;
  sub: string;
  image: string;
  alt: string;
};

export type HeroCta = { label: string; href: string };
export type HeroQuickAccess = { icon: string; label: string; sub: string; href: string };

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "fire-protection",
    line1: "Top Fire Protection & Leak Detection",
    line2: "Services in Qatar",
    sub: "Fire · HVAC · ACMV · MEP — engineered to NFPA standards.",
    image: "/images/hero-bg.jpg",
    alt: "Adam Technical Services fire protection and MEP engineers on site in Doha, Qatar",
  },
  {
    id: "life-safety",
    line1: "Civil Defence Certified Fire Alarm",
    line2: "& Life Safety Systems in Qatar",
    sub: "Turnkey design, supply, installation, testing and Civil Defence approval handover.",
    image: "/images/hero-fire-safety.jpg",
    alt: "Qatar Civil Defence approved fire pump room and life safety control station in Doha Qatar",
  },
  {
    id: "hvac-climate",
    line1: "Commercial HVAC Chiller Plant",
    line2: "& Ventilation Engineering in Qatar",
    sub: "Central chillers, VRF modular systems and FAHU air treatment built for Qatar's climate.",
    image: "/images/hero-hvac.jpg",
    alt: "Commercial HVAC cooling chiller plant on Doha skyscraper overlooking West Bay skyline",
  },
];

function Hero({
  primaryCta,
  secondaryCta,
}: {
  eyebrow?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  quickAccess?: HeroQuickAccess[];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    const timer = setTimeout(() => setIsAnimating(false), 700);
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance synchronized slides (text and background image change together)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const active = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative isolate flex h-screen min-h-[600px] items-end overflow-hidden text-white"
      aria-label="Hero Showcase"
    >
      {/* Background Images with smooth synchronized cross-fade animation */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-black">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              currentSlide === idx ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dark legibility scrim for white text readability */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.72) 85%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      {/* Gold accent bar */}
      <span
        aria-hidden
        className="absolute left-0 top-1/2 h-40 w-1.5 -translate-y-1/2 bg-[var(--color-brand-500)]"
      />

      {/* Minimal overlaid content, bottom-left (No extra buttons, icons, or card badges) */}
      <Container className="relative z-10 w-full pb-16 md:pb-20 lg:pb-24">
        <h1
          key={`title-${currentSlide}`}
          className={cn(
            "hero-fade-1 mt-3 max-w-4xl text-lg sm:text-xl md:text-2xl font-semibold !text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.6)] leading-tight transition-all duration-700 ease-out",
            isAnimating
              ? "opacity-0 translate-y-2.5"
              : "opacity-100 translate-y-0",
          )}
          style={{ color: "#ffffff" }}
        >
          <span className="block leading-tight">{active.line1}</span>
          <span className="block leading-tight">{active.line2}</span>
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
      </Container>
    </section>
  );
}

export default Hero;
export { Hero };

