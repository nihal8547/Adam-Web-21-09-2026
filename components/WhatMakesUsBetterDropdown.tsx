"use client";

import { useState } from "react";
import Icon, { type IconName } from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";

interface FeatureDetail {
  title: string;
  subtitle: string;
  desc: string;
  icon: IconName;
  tag: string;
  bullets: string[];
}

const FEATURES: FeatureDetail[] = [
  {
    title: "Expert Team",
    subtitle: "QCDD-Certified Specialists",
    desc: "Our in-house engineers hold prestigious Grade-A & Grade-B Qatar Civil Defence certifications with decades of combined MEP excellence.",
    icon: "team",
    tag: "Engineering Capability",
    bullets: [
      "Civil Defence Grade A & B certified safety engineers",
      "Rigorous adherence to NFPA, ASHRAE and Qatar Building Code",
      "Dedicated BIM, hydraulic calculation and submittal teams",
    ],
  },
  {
    title: "Comprehensive Coverage",
    subtitle: "Full Lifecycle Capability",
    desc: "Fire protection, HVAC chillers, ACMV air ventilation, MEP and underground leak detection — unified under one single accountable partner.",
    icon: "grid",
    tag: "End-to-End Solutions",
    bullets: [
      "Integrated design, procurement, supply, and installation",
      "Civil Defence compliant equipment from approved manufacturers",
      "Authority liaison, testing, commissioning and approval handover",
    ],
  },
  {
    title: "Reliable Support",
    subtitle: "24/7 Emergency Dispatch",
    desc: "Uninterrupted protection with 24/7 emergency rapid dispatch and scheduled preventive Annual Maintenance Contracts (AMC) across Qatar.",
    icon: "support",
    tag: "Ongoing Assurance",
    bullets: [
      "24/7 emergency response teams on-call across Doha and Qatar",
      "Scheduled AMC periodic audits with documented digital reports",
      "Civil Defence license renewal facilitation & fast remedial works",
    ],
  },
];

export default function WhatMakesUsBetterDropdown() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-[var(--color-navy-900)] text-white py-16 md:py-24"
      aria-labelledby="why-us-heading"
    >
      {/* Subtle ambient light accents */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[var(--color-brand-500)]/10 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[var(--color-brand-500)]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Left Column: Heading + 3 Icons in the same row */}
          <Reveal>
            <SectionHeading
              eyebrow="What Makes Us Better"
              title="Engineering you can rely on"
              description="A trusted partner across Qatar delivering uncompromising safety, full regulatory approvals, and round-the-clock technical reliability."
              align="left"
              as="h2"
              invert
              eyebrowClassName="!text-[var(--color-brand-400)] [&::after]:!bg-[var(--color-brand-400)]"
            />

            {/* 3 Icons in the Same Row */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex items-center gap-4 sm:gap-6">
                {FEATURES.map((item, idx) => {
                  const isActive = openIndex === idx;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setOpenIndex(idx)}
                      className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
                      aria-label={`Show ${item.title}`}
                    >
                      <div
                        className={cn(
                          "relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl transition-all duration-300 shadow-md",
                          isActive
                            ? "bg-[var(--color-brand-500)] text-white shadow-[0_0_24px_rgba(201,162,75,0.45)] scale-105 ring-2 ring-[var(--color-brand-400)]"
                            : "border border-white/15 bg-white/10 text-white/80 hover:bg-white/20 hover:text-white hover:scale-102",
                        )}
                      >
                        <Icon name={item.icon} size={24} />
                        {isActive && (
                          <span
                            aria-hidden
                            className="absolute -bottom-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand-400)]"
                          />
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-xs font-semibold tracking-tight transition-colors text-center line-clamp-1 max-w-[90px]",
                          isActive ? "text-white font-bold" : "text-white/70 group-hover:text-white",
                        )}
                      >
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Right Column: Drop Down Model (Accordion) */}
          <Reveal delay={80} className="space-y-4">
            {FEATURES.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.title}
                  className={cn(
                    "rounded-2xl border transition-all duration-300 backdrop-blur-sm overflow-hidden",
                    isOpen
                      ? "border-[var(--color-brand-500)]/60 bg-white/[0.08] shadow-2xl"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]",
                  )}
                >
                  {/* Dropdown Header Trigger */}
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                          isOpen
                            ? "bg-[var(--color-brand-500)] text-white shadow-sm"
                            : "border border-white/15 bg-white/10 text-white/70",
                        )}
                      >
                        <Icon name={item.icon} size={20} />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-[1.15rem] font-bold text-white truncate">
                            {item.title}
                          </h3>
                          <span className="hidden sm:inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-white border border-white/25">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-white/60 truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-transform duration-300",
                        isOpen && "rotate-180 border-[var(--color-brand-400)] bg-[var(--color-brand-500)] text-white",
                      )}
                    >
                      <Icon name="chevron-down" size={16} />
                    </span>
                  </button>

                  {/* Drop Down Content with Smooth Grid-Row Transition */}
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-white/10 px-5 sm:px-6 pt-4 pb-6">
                        <p className="text-[0.95rem] leading-relaxed text-white/85">
                          {item.desc}
                        </p>

                        {/* Feature Points */}
                        <ul className="mt-4 space-y-2.5">
                          {item.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-[0.88rem] text-white/75">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)]/20 text-[var(--color-brand-300)] mt-0.5">
                                <Icon name="check" size={12} />
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
