"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/projects";
import Icon from "@/components/Icon";
import { cn } from "@/lib/cn";

interface Props {
  projects?: Project[];
}

interface ShowcaseItem {
  id: string;
  slug: string;
  title: string;
  location: string;
  summary: string;
  image: string;
  imageAlt: string;
  sector: string;
}

const DEFAULT_SHOWCASE_PROJECTS: ShowcaseItem[] = [
  {
    id: "state-audit-bureau",
    slug: "state-audit-bureau-tower",
    title: "State Audit Bureau Tower",
    location: "Onaiza, West Bay, Doha",
    summary:
      "Elevating safety standards at the State Audit Bureau Tower, our team implemented cutting-edge fire protection solutions, advanced addressable alarms, and certified life-safety systems.",
    image: "/images/projects/StateAuditBureauTower.jpg",
    imageAlt: "State Audit Bureau Tower in Doha, Qatar fire protection systems",
    sector: "Commercial & Government",
  },
  {
    id: "abraj-quartier",
    slug: "abraj-quartier-towers",
    title: "Abraj Quartier Towers",
    location: "The Pearl, Qatar",
    summary:
      "Elevating safety in luxury living, our team delivered complete QCDD-compliant fire protection, smoke extraction, and hydraulic life-safety systems at Abraj Quartier Towers in The Pearl Qatar.",
    image: "/images/projects/AbrajQuartierTowers.jpg",
    imageAlt: "Abraj Quartier Towers at The Pearl, Qatar fire safety fit-out",
    sector: "Residential & Luxury High-Rise",
  },
  {
    id: "katara-towers",
    slug: "katara-towers",
    title: "Katara Towers",
    location: "Lusail Marina, Qatar",
    summary:
      "Comprehensive fire suppression, chilled water HVAC coordination, and emergency response life-safety infrastructure engineered for Qatar's most iconic crescent architectural landmark.",
    image: "/images/projects/kataraTower.jpg",
    imageAlt: "Katara Towers in Lusail Marina, Qatar MEP and fire protection",
    sector: "Hospitality & Iconic Landmark",
  },
];

export default function OurWorkSwipeShowcase({ projects = [] }: Props) {
  // Merge showcase towers with dynamic CMS projects (ensuring valid non-empty images)
  const items: ShowcaseItem[] = [
    ...DEFAULT_SHOWCASE_PROJECTS,
    ...projects
      .filter((p) => p && p.title)
      .map((p) => ({
        id: p.slug,
        slug: p.slug,
        title: p.title,
        location: p.location,
        summary: p.summary,
        image:
          p.image && !p.image.endsWith(".svg")
            ? p.image
            : "/images/projects/StateAuditBureauTower.jpg",
        imageAlt: p.imageAlt || p.title,
        sector: p.sector || "Featured Project",
      })),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch swipe support
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Auto-cycle every 3.5 seconds
  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, items.length, handleNext]);

  const current = items[activeIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchStartXRef.current - touchEndXRef.current > 45) {
      handleNext();
    } else if (touchEndXRef.current - touchStartXRef.current > 45) {
      handlePrev();
    }
  };

  return (
    <div
      className="relative w-full select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Title, Active Project Info, Controls, & Bottom "See all projects" link */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Header */}
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--color-brand-500)] mb-0.5">
              Featured Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-slate-900 tracking-tight leading-none">
              Our Projects
            </h2>
          </div>

          {/* Active Project Title & Description with smooth fade animation */}
          <div key={`info-${current.id}`} className="mt-6 sm:mt-8 animate-project-fade">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700 mb-3 border border-slate-200/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-500)]" />
              <span>{current.sector}</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-slate-900 leading-snug">
              {current.title}
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-4 min-h-[72px]">
              {current.summary}
            </p>
          </div>

          {/* Carousel Arrows and Indicator Dots */}
          <div className="mt-8 flex items-center gap-4 w-full">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous project"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition-all duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white active:scale-95 cursor-pointer"
              >
                <Icon name="arrow-left" size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition-all duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white active:scale-95 cursor-pointer"
              >
                <Icon name="arrow-right" size={18} />
              </button>
            </div>

            {/* Slide Indicator Dots */}
            <div className="flex items-center gap-1.5 ml-2">
              {items.map((it, idx) => (
                <button
                  key={it.id}
                  type="button"
                  aria-label={`Go to ${it.title}`}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-500 cursor-pointer",
                    activeIndex === idx
                      ? "w-7 bg-slate-900"
                      : "w-2 bg-slate-300 hover:bg-slate-400",
                  )}
                />
              ))}
            </div>
          </div>

          {/* See More Link placed at the BOTTOM (Adiyil) - NO box (Box type venda) */}
          <div className="mt-8 pt-6 border-t border-slate-200/70">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 transition-colors duration-200 hover:text-[var(--color-brand-500)]"
            >
              <span className="relative">
                See all projects
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-[var(--color-brand-500)] transition-all duration-300 group-hover:w-full" />
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-[var(--color-brand-500)]">
                <Icon name="arrow-right" size={16} />
              </span>
            </Link>
          </div>
        </div>

        {/* Right Column: 3D / Perspective Project Cards Carousel with Smooth Animated Transitions */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px] lg:min-h-[520px] overflow-hidden py-4">
          <div className="relative flex items-center justify-center w-full max-w-[580px] h-[360px] sm:h-[440px] lg:h-[500px]">
            {items.map((item, idx) => {
              // Calculate circular offset relative to active card
              let diff = (idx - activeIndex) % items.length;
              if (diff < -Math.floor(items.length / 2)) diff += items.length;
              if (diff > Math.floor(items.length / 2)) diff -= items.length;

              const isActive = diff === 0;
              const isPrev = diff === -1;
              const isNext = diff === 1;

              // Compute position style for smooth transition
              let transform = "translateX(0%) scale(0.7) rotateY(0deg)";
              let opacity = 0;
              let zIndex = 0;
              let pointerEvents: "auto" | "none" = "none";
              let cursor = "default";
              let shadow = "none";

              if (isActive) {
                transform = "translateX(0%) scale(1) rotateY(0deg)";
                opacity = 1;
                zIndex = 20;
                pointerEvents = "auto";
                shadow = "0 25px 50px -12px rgba(15, 30, 61, 0.28)";
              } else if (isPrev) {
                transform = "translateX(-58%) scale(0.85) rotateY(7deg)";
                opacity = 0.65;
                zIndex = 10;
                pointerEvents = "auto";
                cursor = "pointer";
                shadow = "0 10px 25px -5px rgba(0, 0, 0, 0.15)";
              } else if (isNext) {
                transform = "translateX(58%) scale(0.85) rotateY(-7deg)";
                opacity = 0.65;
                zIndex = 10;
                pointerEvents = "auto";
                cursor = "pointer";
                shadow = "0 10px 25px -5px rgba(0, 0, 0, 0.15)";
              }

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isPrev) handlePrev();
                    if (isNext) handleNext();
                  }}
                  className="absolute w-[210px] sm:w-[260px] lg:w-[290px] h-[340px] sm:h-[420px] lg:h-[480px] rounded-[24px] overflow-hidden select-none will-change-transform ring-1 ring-black/10"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    pointerEvents,
                    cursor,
                    boxShadow: shadow,
                    transition:
                      "transform 700ms cubic-bezier(0.25, 1, 0.5, 1), opacity 700ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow 700ms ease",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 640px) 210px, (max-width: 1024px) 260px, 300px"
                    priority={idx === 0}
                    className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  />

                  {/* Dark gradient overlay for active card text readability */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 text-white transition-opacity duration-500",
                      isActive ? "opacity-100 delay-150" : "opacity-0",
                    )}
                  >
                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-white backdrop-blur-md self-start border border-white/25">
                      {item.sector}
                    </span>
                    <h4 className="mt-2 text-base sm:text-lg font-bold text-white leading-tight">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-white/75 line-clamp-1">
                      {item.location}
                    </p>
                  </div>

                  {/* Dark scrim for inactive side cards */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-black/35 transition-opacity duration-700",
                      isActive ? "opacity-0 pointer-events-none" : "opacity-100",
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
