"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Project, projects as fallbackStaticProjects } from "@/content/projects";
import { cn } from "@/lib/cn";
import Icon from "@/components/Icon";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  projects?: Project[];
}

const CYCLE_DURATION = 5500; // 5.5 seconds per project cycle

export default function OurWorkSwipeShowcase({ projects = [] }: Props) {
  // Take exactly maximum 4 projects, matching the Project Page details 1:1
  const items: Project[] = useMemo(() => {
    const source = projects && projects.length > 0 ? projects : fallbackStaticProjects;
    // Prefer featured projects or first valid projects
    const featured = source.filter((p) => p && p.title && p.featured);
    const nonFeatured = source.filter((p) => p && p.title && !p.featured);
    const combined = [...featured, ...nonFeatured];

    // Ensure we take strictly up to 4 items
    const selected = combined.slice(0, 4);

    // If less than 4, fill with static projects until 4
    if (selected.length < 4) {
      for (const sp of fallbackStaticProjects) {
        if (!selected.some((p) => p.slug === sp.slug)) {
          selected.push(sp);
        }
        if (selected.length === 4) break;
      }
    }

    return selected.slice(0, 4);
  }, [projects]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const safeIndex = items.length > 0 ? activeIndex % items.length : 0;
  const current = items[safeIndex] || fallbackStaticProjects[0];

  const handleNext = useCallback(() => {
    if (items.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    if (items.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Automatic cycling ("Maari mari kanikkuka") every 5.5 seconds
  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const timer = setInterval(handleNext, CYCLE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, items.length, handleNext, safeIndex]);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Our Featured Projects Showcase"
    >
      {/* Header — clean, aligned with section branding */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-500)]">
            Featured Portfolio
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Our Projects
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
            QCDD-certified life safety, MEP, and HVAC systems engineered across landmark Qatar developments.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Quick cycle controls */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Project"
              className="h-7 w-7 rounded-full flex items-center justify-center text-slate-700 hover:bg-white hover:text-slate-900 transition-colors shadow-xs"
            >
              <Icon name="arrow-left" size={14} />
            </button>
            <span className="text-[0.7rem] font-bold text-slate-600 px-1.5 select-none">
              0{safeIndex + 1} / 0{items.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Project"
              className="h-7 w-7 rounded-full flex items-center justify-center text-slate-700 hover:bg-white hover:text-slate-900 transition-colors shadow-xs"
            >
              <Icon name="arrow-right" size={14} />
            </button>
          </div>

          <Link
            href="/projects"
            className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-[var(--color-brand-500)] transition-colors pb-0.5"
          >
            View all projects →
          </Link>
        </div>
      </div>

      {/* Main Content — 2-column showcase: Left large spotlight, Right 4 rotating cards */}
      <div className="mt-5 grid lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Main Featured Spotlight Card */}
        <div className="group relative lg:col-span-7 xl:col-span-8 block min-h-[380px] sm:min-h-[440px] md:min-h-[480px] rounded-2xl overflow-hidden bg-slate-950 shadow-lg border border-slate-200/80">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={current.image}
                alt={current.imageAlt || current.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Architectural dark gradient overlays for readable text */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"
              />
            </motion.div>
          </AnimatePresence>

          {/* Top Badges (Sector, Service, and Counter) */}
          <div className="absolute top-4 inset-x-4 z-10 flex items-center justify-between pointer-events-none">
            <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
              <span className="rounded-full bg-[var(--color-navy-900)]/90 backdrop-blur-md px-3.5 py-1 text-[0.72rem] font-bold uppercase tracking-wider text-amber-400 border border-amber-400/40 shadow-md">
                {current.sector}
              </span>
              {current.service && (
                <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[0.72rem] font-semibold text-white/90 border border-white/20 flex items-center gap-1.5 shadow-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>{current.service}</span>
                </span>
              )}
            </div>

            {/* Pagination indicator dots */}
            <div className="flex items-center gap-1.5 pointer-events-auto bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/20">
              {items.map((it, idx) => (
                <button
                  key={it.slug}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to project ${idx + 1}: ${it.title}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    idx === safeIndex
                      ? "w-6 bg-amber-400 shadow-xs shadow-amber-400/50"
                      : "w-1.5 bg-white/40 hover:bg-white/70",
                  )}
                />
              ))}
            </div>
          </div>

          {/* Bottom Project Details — Exact details matching Project Page */}
          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 md:p-8 text-white z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug + "-details"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {/* Location indicator */}
                <div className="flex items-center gap-1.5 text-xs font-medium text-amber-300">
                  <Icon name="map-pin" size={13} className="text-amber-400 shrink-0" />
                  <span>{current.location}</span>
                </div>

                {/* Title */}
                <h3 className="mt-2 text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  <Link
                    href={`/projects/${current.slug}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {current.title}
                  </Link>
                </h3>

                {/* Summary */}
                <p className="mt-2.5 text-xs sm:text-sm text-slate-200/90 line-clamp-2 sm:line-clamp-3 max-w-2xl leading-relaxed">
                  {current.summary}
                </p>

                {/* CTA Action matching Project Page */}
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/projects/${current.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 shadow-md hover:bg-amber-300 transition-all hover:gap-2.5"
                  >
                    <span>View Project Details</span>
                    <Icon name="arrow-right" size={14} />
                  </Link>
                  <span className="text-[0.72rem] text-slate-300/80 hidden sm:inline">
                    QCDD &amp; NFPA Certified Engineering
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtle Left/Right Click Chevrons on Hover */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous project"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          >
            <Icon name="arrow-left" size={16} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next project"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          >
            <Icon name="arrow-right" size={16} />
          </button>
        </div>

        {/* Right: Exactly 4 Project Cards with Auto-Cycle Progress Indicator */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between gap-2.5">
          {items.map((item, idx) => {
            const isSelected = idx === safeIndex;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                }}
                className={cn(
                  "relative w-full flex items-start gap-3 p-3 rounded-2xl text-left transition-all duration-300 cursor-pointer overflow-hidden border",
                  isSelected
                    ? "bg-[var(--color-navy-900)] text-white border-amber-400/60 shadow-md ring-1 ring-amber-400/30"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 shadow-xs",
                )}
              >
                {/* Active Progress Bar ("Maari Mari kanikkuka" visual timer) */}
                {isSelected && !isPaused && (
                  <motion.div
                    key={`progress-${item.slug}-${safeIndex}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: CYCLE_DURATION / 1000, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-amber-300 z-10"
                  />
                )}
                {isSelected && isPaused && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-400 z-10" />
                )}

                {/* Thumbnail Image */}
                <div className="relative h-16 w-20 sm:h-20 sm:w-24 shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-black/10">
                  <Image
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                  <div className="absolute top-1 left-1">
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[0.62rem] font-black uppercase tracking-wider",
                        isSelected
                          ? "bg-amber-400 text-slate-950 font-extrabold"
                          : "bg-black/60 text-white backdrop-blur-xs",
                      )}
                    >
                      0{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Details matching Project Page */}
                <div className="min-w-0 flex-1 py-0.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={cn(
                        "text-[0.68rem] font-bold uppercase tracking-wider",
                        isSelected ? "text-amber-400" : "text-amber-700",
                      )}
                    >
                      {item.sector}
                    </span>
                    {item.service && (
                      <>
                        <span
                          className={cn(
                            "h-1 w-1 rounded-full",
                            isSelected ? "bg-amber-400" : "bg-slate-400",
                          )}
                        />
                        <span
                          className={cn(
                            "text-[0.68rem] font-medium truncate",
                            isSelected ? "text-slate-300" : "text-slate-500",
                          )}
                        >
                          {item.service}
                        </span>
                      </>
                    )}
                  </div>

                  <h4
                    className={cn(
                      "text-xs sm:text-sm font-bold truncate leading-snug",
                      isSelected ? "text-white" : "text-slate-900",
                    )}
                  >
                    {item.title}
                  </h4>

                  <p
                    className={cn(
                      "text-[0.72rem] truncate mt-1 flex items-center gap-1",
                      isSelected ? "text-slate-300" : "text-slate-500",
                    )}
                  >
                    <Icon
                      name="map-pin"
                      size={11}
                      className={isSelected ? "text-amber-400" : "text-slate-400"}
                    />
                    <span>{item.location}</span>
                  </p>
                </div>

                {/* Active arrow indicator */}
                <div className="shrink-0 self-center pl-1">
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full transition-transform",
                      isSelected
                        ? "bg-amber-400 text-slate-950 translate-x-0.5"
                        : "text-slate-400 opacity-40",
                    )}
                  >
                    <Icon name="arrow-right" size={13} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
