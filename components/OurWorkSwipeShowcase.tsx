"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  projects?: Project[];
}

export interface ShowcaseProject {
  id: string;
  slug: string;
  title: string;
  location: string;
  summary: string;
  image: string;
  imageAlt: string;
  sector: string;
}

const DEFAULT_PROJECTS: ShowcaseProject[] = [
  {
    id: "state-audit-bureau-tower",
    slug: "state-audit-bureau-tower",
    title: "State Audit Bureau Tower",
    location: "West Bay, Doha",
    summary:
      "Advanced addressable fire alarm network, NFPA 13 sprinkler systems, and certified life-safety engineering.",
    image: "/images/projects/StateAuditBureauTower.jpg",
    imageAlt: "State Audit Bureau Tower in Doha, Qatar fire protection systems",
    sector: "Commercial",
  },
  {
    id: "abraj-quartier-towers",
    slug: "abraj-quartier-towers",
    title: "Abraj Quartier Towers",
    location: "The Pearl, Qatar",
    summary:
      "QCDD-compliant fire protection, smoke extraction, and high-capacity hydraulic systems across luxury twin towers.",
    image: "/images/projects/AbrajQuartierTowers.jpg",
    imageAlt: "Abraj Quartier Towers at The Pearl, Qatar fire safety fit-out",
    sector: "Residential",
  },
  {
    id: "katara-towers",
    slug: "katara-towers",
    title: "Katara Towers",
    location: "Lusail Marina, Qatar",
    summary:
      "Clean agent fire suppression and chilled water HVAC coordination engineered for Qatar's iconic landmark.",
    image: "/images/projects/kataraTower.jpg",
    imageAlt: "Katara Towers in Lusail Marina, Qatar MEP and fire protection",
    sector: "Hospitality",
  },
  {
    id: "commercial-office-west-bay",
    slug: "commercial-office-hvac-west-bay",
    title: "Commercial Office HVAC",
    location: "West Bay, Doha",
    summary:
      "Chilled-water HVAC and fresh-air systems engineered for comfort, indoor air quality, and low running cost.",
    image: "/images/hero-hvac.jpg",
    imageAlt: "Commercial office building in West Bay, Doha served by Adam Technical Services HVAC",
    sector: "Commercial",
  },
];

export default function OurWorkSwipeShowcase({ projects = [] }: Props) {
  const items: ShowcaseProject[] = useMemo(() => {
    const list: ShowcaseProject[] = [...DEFAULT_PROJECTS];
    projects.forEach((p) => {
      if (!p || !p.title) return;
      if (list.some((item) => item.slug === p.slug)) return;
      list.push({
        id: p.slug,
        slug: p.slug,
        title: p.title,
        location: p.location || "Doha, Qatar",
        summary: p.summary,
        image:
          p.image && !p.image.endsWith(".svg")
            ? p.image
            : "/images/projects/StateAuditBureauTower.jpg",
        imageAlt: p.imageAlt || p.title,
        sector: p.sector || "Commercial",
      });
    });
    return list.slice(0, 5); // Keep it compact (max 5 featured items)
  }, [projects]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const safeIndex = activeIndex % items.length;
  const current = items[safeIndex];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  // Subtle auto-advance every 6 seconds
  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [isPaused, items.length, handleNext]);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header — clean, minimal */}
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

        <Link
          href="/projects"
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-[var(--color-brand-500)] transition-colors pb-0.5 shrink-0"
        >
          View all projects →
        </Link>
      </div>

      {/* Main Content — compact 2-column split with reduced height */}
      <div className="mt-5 grid lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Compact Featured Spotlight */}
        <Link
          href={`/projects/${current.slug}`}
          className="group relative lg:col-span-8 block h-[280px] sm:h-[340px] md:h-[380px] rounded-2xl overflow-hidden bg-slate-900 shadow-md"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={current.image}
                alt={current.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle dark gradient overlay */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
              />
            </motion.div>
          </AnimatePresence>

          {/* Minimal text at bottom — no boxes, no extra tags */}
          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white z-10">
            <div className="text-xs font-medium text-amber-300">
              {current.sector} • {current.location}
            </div>
            <h3 className="mt-1 text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
              {current.title}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-200/90 line-clamp-2 max-w-xl">
              {current.summary}
            </p>
          </div>

          {/* Minimalist dot indicators at top right */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
            {items.map((it, idx) => (
              <span
                key={it.id}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === safeIndex
                    ? "w-5 bg-amber-400"
                    : "w-1.5 bg-white/50",
                )}
              />
            ))}
          </div>
        </Link>

        {/* Right: Clean, compact project list */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-2">
          <div className="space-y-2">
            {items.map((item, idx) => {
              const isSelected = idx === safeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer",
                    isSelected
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100",
                  )}
                >
                  <div className="relative h-12 w-16 sm:h-14 sm:w-18 shrink-0 rounded-lg overflow-hidden bg-slate-200">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className={cn(
                        "text-[0.68rem] font-semibold uppercase tracking-wider",
                        isSelected ? "text-amber-400" : "text-slate-500",
                      )}
                    >
                      {item.sector}
                    </div>
                    <div
                      className={cn(
                        "text-xs sm:text-sm font-bold truncate mt-0.5",
                        isSelected ? "text-white" : "text-slate-900",
                      )}
                    >
                      {item.title}
                    </div>
                    <div
                      className={cn(
                        "text-[0.72rem] truncate",
                        isSelected ? "text-slate-300" : "text-slate-500",
                      )}
                    >
                      {item.location}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
