"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";

export type Media = Record<string, unknown>;

export interface CMSModelInfo {
  modelName: string;
  modelTitle: string;
  modelDescription?: string | null;
  modelImage?: Media | string | null;
}

interface TechItem {
  id: string;
  label: string;
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  metrics: { value: string; label: string }[];
}

const TECH_ITEMS: TechItem[] = [
  {
    id: "hvac",
    label: "HVAC & Climate Plant",
    category: "Climate Engineering",
    title: "Commercial & Industrial HVAC Systems",
    description:
      "High-capacity chilled water, VRF and FAHU ventilation plant engineered specifically for Qatar's extreme climate, delivering continuous comfort and verified thermal efficiency.",
    image: "/images/hero-hvac.jpg",
    imageAlt: "Commercial chilled water HVAC equipment installed in Qatar",
    href: "/hvac-services-qatar",
    metrics: [
      { value: "50°C", label: "Extreme Ambient Rated" },
      { value: "24/7", label: "Emergency Support" },
      { value: "99.8%", label: "Plant Reliability" },
    ],
  },
  {
    id: "leak",
    label: "Acoustic Leak Detection",
    category: "Non-Destructive Testing",
    title: "Precision Underground Leak Detection",
    description:
      "Non-invasive ultrasonic acoustic sensors, tracer gas telemetry, and thermal diagnostics that pinpoint pressurized pipeline leaks without surface excavation or property disruption.",
    image: "/images/about-engineering-team.jpg",
    imageAlt: "Underground acoustic water leak detection survey in Qatar",
    href: "/underground-leakage-detection-system-service-qatar",
    metrics: [
      { value: "±5 cm", label: "Pinpoint Precision" },
      { value: "0%", label: "Excavation Damage" },
      { value: "100%", label: "Pressure Restored" },
    ],
  },
  {
    id: "fire",
    label: "Life Safety & Alarms",
    category: "Life Safety Systems",
    title: "QCDD Addressable Fire Protection",
    description:
      "Intelligent addressable fire alarms, UL/FM certified fire fighting pumps, and automated sprinkler networks designed, tested, and maintained to QCDD and NFPA standards.",
    image: "/images/hero-fire-safety.jpg",
    imageAlt: "QCDD certified fire protection and life safety equipment in Doha",
    href: "/fire-alarm-system-installation-maintenance",
    metrics: [
      { value: "100%", label: "QCDD Approval Rate" },
      { value: "NFPA", label: "Certified Standards" },
      { value: "1000+", label: "Projects Protected" },
    ],
  },
];

export default function ExpertiseShowcase3D({
  models,
  eyebrow,
  heading,
  description,
  className,
}: {
  models?: CMSModelInfo[] | null;
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  className?: string;
} = {}) {
  const items: TechItem[] =
    models && models.length > 0
      ? models.map((m, idx) => {
          let imgSrc = "/images/hero-hvac.jpg";
          if (typeof m.modelImage === "string" && m.modelImage) {
            imgSrc = m.modelImage;
          } else if (typeof m.modelImage === "object" && m.modelImage !== null) {
            imgSrc = (m.modelImage as { url?: string })?.url || imgSrc;
          }
          return {
            id: `model-${idx}`,
            label: m.modelName || `Model ${idx + 1}`,
            category: "Engineering Model",
            title: m.modelTitle || m.modelName,
            description:
              m.modelDescription ||
              "Engineered precision equipment certified to Qatar Civil Defence standards.",
            image: imgSrc,
            imageAlt: m.modelTitle || m.modelName,
            href: "/services",
            metrics: [
              { value: "QCDD", label: "Approved Standard" },
              { value: "24/7", label: "Engineering AMC" },
              { value: "100%", label: "Tested & Certified" },
            ],
          };
        })
      : TECH_ITEMS;

  const [activeTab, setActiveTab] = useState<string>(items[0]?.id || "hvac");

  const current = items.find((item) => item.id === activeTab) || items[0] || TECH_ITEMS[0];

  return (
    <section
      id="expertise"
      className={cn(
        "relative overflow-hidden bg-[var(--surface)] py-12 md:py-16 border-b border-[var(--border)]",
        className,
      )}
      aria-label="Specialized Engineering Technology"
    >
      {/* Dot Abstract Model — Left Blank Side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 sm:left-4 top-0 sm:top-2 w-52 sm:w-72 lg:w-80 h-52 sm:h-72 lg:h-80 select-none z-0 opacity-35 animate-abstract-float"
      >
        <svg className="w-full h-full" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="exp-dots-left" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="1.75" fill="#0f1e3d" fillOpacity="0.30" />
            </pattern>
            <linearGradient id="exp-fade-left" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="65%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="exp-mask-l">
              <rect width="240" height="240" fill="url(#exp-fade-left)" />
            </mask>
          </defs>
          <rect width="240" height="240" fill="url(#exp-dots-left)" mask="url(#exp-mask-l)" />
        </svg>
      </div>

      {/* Dot Abstract Model — Right Blank Side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 sm:right-4 top-0 sm:top-2 w-52 sm:w-72 lg:w-80 h-52 sm:h-72 lg:h-80 select-none z-0 opacity-35 animate-abstract-float-reverse"
      >
        <svg className="w-full h-full" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="exp-dots-right" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="1.75" fill="#c9a24b" fillOpacity="0.38" />
            </pattern>
            <linearGradient id="exp-fade-right" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="65%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="exp-mask-r">
              <rect width="240" height="240" fill="url(#exp-fade-right)" />
            </mask>
          </defs>
          <rect width="240" height="240" fill="url(#exp-dots-right)" mask="url(#exp-mask-r)" />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Clean Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <SectionHeading
            eyebrow={eyebrow || "Specialized Engineering Technology"}
            title={heading || "Precision Engineering & Advanced Diagnostics"}
            description={
              description ||
              "Engineered solutions certified to Qatar Civil Defence and international standards across HVAC, leak detection, and life safety."
            }
            align="center"
            as="h2"
          />

          {/* Minimal Tab Switcher — clean text tabs, no bulky cards or strange buttons */}
          <div className="mt-8 flex items-center justify-center gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200/80 flex-wrap">
            {items.map((item) => {
              const isActive = item.id === activeTab;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean 2-Column Model Layout */}
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Visual: Clean High-Resolution Photography */}
          <Reveal className="lg:col-span-7">
            <div className="relative h-[280px] sm:h-[340px] md:h-[390px] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt={current.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    priority
                    unoptimized
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Content: Clean Typography & Key Metrics */}
          <Reveal delay={80} className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-500)]">
                  {current.category}
                </span>

                <h3 className="mt-2 text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {current.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {current.description}
                </p>

                {/* Minimalist Metrics Strip — clean values, no chunky icon boxes */}
                <div className="my-6 grid grid-cols-3 gap-4 border-y border-slate-200/80 py-4">
                  {current.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="text-lg sm:text-xl font-bold text-slate-900">
                        {m.value}
                      </div>
                      <div className="text-[0.72rem] text-slate-500 mt-0.5 leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Single Clean Link — no unusual buttons, no duplicate cards */}
                <div>
                  <Link
                    href={current.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 hover:text-[var(--color-brand-500)] transition-colors"
                  >
                    <span>Learn more about this technology</span>
                    <span>→</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
