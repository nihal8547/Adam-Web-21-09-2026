"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { Button } from "@/components/Button";
import Interactive3DViewer, { ModelType } from "@/components/Interactive3DViewer";
import { cn } from "@/lib/cn";

export type Media = any;

interface ModelInfo {
  type: ModelType;
  title: string;
  badge: string;
  summary: string;
  metrics: { label: string; value: string }[];
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

const MODELS: Record<ModelType, ModelInfo> = {
  hvac: {
    type: "hvac",
    title: "Commercial & Industrial HVAC Systems",
    badge: "Climate Engineering",
    summary: "High-capacity chilled water, VRF and FAHU ventilation plant engineered specifically for Qatar's extreme climate.",
    metrics: [
      { value: "50°C", label: "Extreme Ambient Rated" },
      { value: "24/7", label: "Emergency Response" },
      { value: "99.8%", label: "Plant Reliability" },
    ],
    features: [
      "Water-cooled & air-cooled central chillers",
      "VRF / VRV modular multi-zone systems",
      "FAHU fresh air treatment with heat recovery",
      "BMS / DDC smart energy control integration",
    ],
    ctaLabel: "Explore HVAC Services",
    ctaHref: "/hvac-services-qatar",
  },
  leak: {
    type: "leak",
    title: "Precision Acoustic Leak Detection",
    badge: "Non-Destructive Testing",
    summary: "Non-invasive ultrasonic acoustic sensors and thermal telemetry pinpointing pressurized leaks without excavation.",
    metrics: [
      { value: "±5 cm", label: "Pinpoint Precision" },
      { value: "0%", label: "Excavation Damage" },
      { value: "100%", label: "Pressure Restored" },
    ],
    features: [
      "Subsurface acoustic ground microphone surveys",
      "Hydrogen tracer gas & helium sniffing testing",
      "High-resolution FLIR infrared thermal imaging",
      "Fire-protection ring main pressure loss diagnosis",
    ],
    ctaLabel: "Explore Leak Detection",
    ctaHref: "/underground-leakage-detection-system-service-qatar",
  },
};

export interface CMSModelInfo {
  modelName: string;
  modelTitle: string;
  modelDescription?: string | null;
  modelImage?: Media | string | null;
}

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
  const [selectedModel, setSelectedModel] = useState<ModelType>("hvac");
  
  let current = MODELS[selectedModel];
  if (models && models.length > 0) {
    const cmsMatch = models.find(m => m.modelName.toLowerCase() === selectedModel);
    if (cmsMatch) {
      current = {
        ...current,
        title: cmsMatch.modelTitle,
        summary: cmsMatch.modelDescription || current.summary,
      };
    }
  }

  return (
    <section
      id="expertise"
      className={cn(
        "bg-[var(--surface)] pt-8 pb-16 md:pt-10 md:pb-20 border-b border-[var(--border)]",
        className,
      )}
      aria-label="Specialized Engineering Technology - 3D Equipment Inspection"
    >
      <Container>
        {/* Minimalist Section Header */}
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            eyebrow={eyebrow || "Specialized Engineering Technology"}
            title={heading || "Interactive 3D Equipment Inspection"}
            description={description || "Rotate to inspect our Qatar-certified central cooling plant and underground acoustic sensors."}
            align="center"
            as="h2"
          />

          {/* Minimalist Segmented Pill Switcher */}
          <div className="mt-7 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100/90 p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setSelectedModel("hvac")}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200",
                selectedModel === "hvac"
                  ? "bg-white text-[var(--color-navy-900)] shadow-sm"
                  : "text-slate-600 hover:text-slate-900",
              )}
            >
              <Icon name="wind" size={16} />
              <span>HVAC Chiller Plant</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedModel("leak")}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200",
                selectedModel === "leak"
                  ? "bg-white text-[var(--color-navy-900)] shadow-sm"
                  : "text-slate-600 hover:text-slate-900",
              )}
            >
              <Icon name="droplet" size={16} />
              <span>Acoustic Leak Detection</span>
            </button>
          </div>
        </div>

        {/* Minimalist 3D Showcase Grid */}
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left: 3D Interactive Canvas */}
          <Reveal className="lg:col-span-7 flex items-center justify-center">
            <Interactive3DViewer modelType={selectedModel} />
          </Reveal>

          {/* Right: Technical Engineering Specifications */}
          <Reveal delay={80} className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex flex-col justify-center">
              {/* Badge */}
              <div className="flex items-center gap-2.5">
                <span className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
                  {current.badge}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[0.75rem] font-medium text-slate-500">
                  QCDD & NFPA Standards
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-2.5 text-[length:var(--text-2xl)] font-bold text-[var(--heading)] leading-snug">
                {current.title}
              </h3>

              {/* Summary */}
              <p className="mt-3 text-[0.98rem] leading-relaxed text-[var(--body)]">
                {current.summary}
              </p>

              {/* Clean Minimalist Stats Strip */}
              <div className="my-6 grid grid-cols-3 divide-x divide-slate-200 border-y border-slate-200/80 py-4">
                {current.metrics.map((m) => (
                  <div key={m.label} className="px-3 first:pl-0 last:pr-0">
                    <div className="font-[var(--font-display)] text-xl font-bold text-[var(--heading)]">
                      {m.value}
                    </div>
                    <div className="mt-0.5 text-[0.72rem] text-[var(--body)] leading-tight">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Capabilities */}
              <ul className="space-y-2.5">
                {current.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-[0.92rem] text-[var(--heading)] font-medium">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[var(--accent-strong)]">
                      <Icon name="check" size={11} />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="mt-8 flex items-center gap-4">
                <Button href={current.ctaHref} size="lg">
                  {current.ctaLabel} →
                </Button>
                <Link
                  href="/request-for-quotation"
                  className="text-sm font-semibold text-slate-600 hover:text-[var(--color-navy-900)] transition-colors underline-offset-4 hover:underline"
                >
                  Request a Free Quote
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
