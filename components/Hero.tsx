"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import { cn } from "@/lib/cn";

export interface HeroProps {
  eyebrow?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  quickAccess?: Array<{ icon?: string; label: string; sub?: string; href: string }>;
}

const HERO_SLIDES = [
  {
    image: "/images/hero-bg.jpg",
    alt: "QCDD-approved fire pump room and suppression infrastructure engineered by Adam Technical Services in Doha, Qatar",
    line1: "Civil Defence Certified Fire Alarm",
    line2: "& Life Safety Systems in Qatar",
    sub: "Turnkey design, supply, installation, testing and Civil Defence approval handover.",
  },
  {
    image: "/images/hero-fire-safety.jpg",
    alt: "Commercial MEP and industrial HVAC chilled-water plant installation in Qatar",
    line1: "Turnkey MEP & Mechanical Engineering",
    line2: "Across Qatar's Premier Developments",
    sub: "Specialized mechanical, electrical and plumbing infrastructure built to NFPA standards.",
  },
  {
    image: "/images/hero-hvac.jpg",
    alt: "Acoustic and thermal non-destructive water leak detection inspection in Doha",
    line1: "Advanced Underground Leak Detection",
    line2: "& Non-Destructive Diagnostics",
    sub: "Pinpoint accuracy saving water, structural integrity and capital costs nationwide.",
  },
];

const ROTATION_INTERVAL = 6000;

function Hero({
  eyebrow: _eyebrow,
  primaryCta: _primaryCta,
  secondaryCta: _secondaryCta,
  quickAccess: _quickAccess,
}: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        setIsAnimating(false);
      }, 350);
    }, ROTATION_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const active = HERO_SLIDES[currentSlide];

  return (
    <section
      aria-label="Hero"
      className="relative flex h-screen min-h-screen h-[100dvh] min-h-[100dvh] items-end overflow-hidden"
    >
      {/* Background slide images */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.image}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            idx === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10",
          )}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            sizes="100vw"
            priority={idx === 0}
            className="object-cover object-center"
          />
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

      {/* Minimal overlaid content, bottom-left (No extra buttons, icons, or card badges) */}
      <Container className="relative z-10 w-full pb-16 md:pb-20 lg:pb-24">
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
