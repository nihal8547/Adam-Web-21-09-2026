"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/projects";
import Icon from "@/components/Icon";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";

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
  // Merge showcase towers with dynamic CMS projects
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
  const [containerWidth, setContainerWidth] = useState(1200);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemsLength = items.length;

  // Responsive container measurement
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % itemsLength);
  }, [itemsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + itemsLength) % itemsLength);
  }, [itemsLength]);

  // Auto-cycle
  useEffect(() => {
    if (isPaused || itemsLength <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, itemsLength, handleNext]);

  const current = items[activeIndex];

  // Touch swipe support
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);
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

  // Compute transforms for each image using the "Circular Testimonials" style gap math
  function getImageStyle(index: number): React.CSSProperties {
    const minWidth = 1024;
    const maxWidth = 1456;
    let minGap = 120;
    let maxGap = 160;
    
    // Adjust for smaller screens
    if (containerWidth < 768) {
      minGap = 80;
    }

    let gap = minGap;
    if (containerWidth > minWidth) {
      if (containerWidth >= maxWidth) {
        gap = maxGap;
      } else {
        gap = minGap + (maxGap - minGap) * ((containerWidth - minWidth) / (maxWidth - minWidth));
      }
    }
    
    const maxStickUp = gap * 0.4;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + itemsLength) % itemsLength === index;
    const isRight = (activeIndex + 1) % itemsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        boxShadow: "0 25px 50px -12px rgba(15, 30, 61, 0.28)",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.8,
        pointerEvents: "auto",
        cursor: "pointer",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15)",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.8,
        pointerEvents: "auto",
        cursor: "pointer",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15)",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    
    // Hide others
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div
      className="relative w-full select-none overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Text Info */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--color-brand-500)] mb-0.5">
              Featured Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-slate-900 tracking-tight leading-none">
              Our Projects
            </h2>
          </div>

          <div className="mt-6 sm:mt-8 min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={quoteVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700 mb-3 border border-slate-200/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-500)]" />
                  <span>{current.sector}</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-slate-900 leading-snug">
                  {current.title}
                </h3>
                <motion.p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-4">
                  {current.summary.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{
                        filter: "blur(10px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.22,
                        ease: "easeInOut",
                        delay: 0.015 * i,
                      }}
                      style={{ display: "inline-block" }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
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

        {/* Right Column: 3D Image Carousel */}
        <div 
          className="lg:col-span-7 relative flex items-center justify-center min-h-[400px] sm:min-h-[480px] lg:min-h-[560px] py-4"
          ref={containerRef}
          style={{ perspective: "1000px" }}
        >
          <div className="relative flex items-center justify-center w-full h-[360px] sm:h-[440px] lg:h-[500px]">
            {items.map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  const isLeft = (activeIndex - 1 + itemsLength) % itemsLength === index;
                  const isRight = (activeIndex + 1) % itemsLength === index;
                  if (isLeft) handlePrev();
                  if (isRight) handleNext();
                }}
                className="absolute w-[210px] sm:w-[260px] lg:w-[290px] h-[340px] sm:h-[420px] lg:h-[480px] rounded-[24px] overflow-hidden select-none will-change-transform"
                style={getImageStyle(index)}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 210px, (max-width: 1024px) 260px, 300px"
                  priority={index === 0}
                  className="object-cover"
                />

                {/* Dark gradient overlay for active card text readability */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 text-white transition-opacity duration-500",
                    index === activeIndex ? "opacity-100 delay-150" : "opacity-0",
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
                    index === activeIndex ? "opacity-0 pointer-events-none" : "opacity-100",
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
