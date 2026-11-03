"use client";

import React, { useState, useMemo } from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export interface CmsCertification {
  badgeCode: string;
  title?: string;
  authority?: string;
  status?: string;
  scope?: string;
  logo?: string;
  logoUrl?: string;
  verifyUrl?: string;
}

export interface CertificationItem {
  id: string;
  badgeCode: string;
  title: string;
  authority: string;
  status: string;
  scope: string;
  category: "qatar" | "international" | "quality";
  iconBg: string;
  badgeColor: string;
  logo?: string;
  verifyUrl?: string;
  svgIcon: React.ReactNode;
}

// Authentic vector representations of official safety and regulatory certifications
const DEFAULT_CERTIFICATIONS: CertificationItem[] = [
  {
    id: "qcdd",
    badgeCode: "QCDD GRADE A",
    title: "Qatar Civil Defence Approved Contractor",
    authority: "Ministry of Interior, State of Qatar",
    status: "Active & Licensed",
    category: "qatar",
    scope: "Full authority for Fire Alarm, Fire Fighting Pumps, Sprinkler Systems, Foam, and Smoke Extraction licensing, installation, and final handover.",
    iconBg: "bg-red-50 text-red-700 border-red-200/80",
    badgeColor: "text-red-800 bg-red-50 border-red-200",
    verifyUrl: "/qatar-civil-defence-department",
    svgIcon: (
      <svg viewBox="0 0 56 56" fill="none" className="w-11 h-11" aria-label="Qatar Civil Defence Badge">
        {/* Shield Outer */}
        <path
          d="M28 5L46 11V25C46 37 28 49 28 49C28 49 10 37 10 25V11L28 5Z"
          fill="#8A1538"
          stroke="#D4AF37"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Inner Shield */}
        <path
          d="M28 9L42 14V24C42 34 28 44 28 44C28 44 14 34 14 24V14L28 9Z"
          fill="#5c0e25"
          stroke="#F3E5AB"
          strokeWidth="1"
        />
        {/* Falcon Wings / Flame Motif */}
        <path
          d="M28 17C28 17 32 22 32 27C32 30 30 32 28 34C26 32 24 30 24 27C24 22 28 17 28 17Z"
          fill="#D4AF37"
        />
        <path
          d="M28 24C28 24 30 27 30 29C30 30.5 29 31.5 28 32.5C27 31.5 26 30.5 26 29C26 27 28 24 28 24Z"
          fill="#FFFFFF"
        />
        {/* Grade A Star */}
        <polygon points="28,36 29.5,40 34,40 30.5,42.5 32,46.5 28,44 24,46.5 25.5,42.5 22,40 26.5,40" fill="#D4AF37" />
      </svg>
    ),
  },
  {
    id: "nfpa",
    badgeCode: "NFPA MEMBER",
    title: "National Fire Protection Association",
    authority: "NFPA International Life Safety Code",
    status: "Code Compliant",
    category: "international",
    scope: "Design, hydraulic calculations, and maintenance executed strictly under NFPA 13, 20, 72, 101, and 2001 fire and life safety standards.",
    iconBg: "bg-red-50 text-red-600 border-red-200/80",
    badgeColor: "text-red-700 bg-red-50 border-red-200",
    verifyUrl: "https://www.nfpa.org",
    svgIcon: (
      <svg viewBox="0 0 56 56" fill="none" className="w-11 h-11" aria-label="NFPA Member Badge">
        {/* Diamond Outer */}
        <polygon
          points="28,4 51,28 28,52 5,28"
          fill="#C8102E"
          stroke="#1A1A1A"
          strokeWidth="2"
        />
        {/* Inner Diamond */}
        <polygon
          points="28,9 46,28 28,47 10,28"
          fill="#1A1A1A"
        />
        {/* Stylized Flame */}
        <path
          d="M28 15C28 15 34 22 34 28C34 32.5 31 36 28 38C25 36 22 32.5 22 28C22 22 28 15 28 15Z"
          fill="#F59E0B"
        />
        <path
          d="M28 23C28 23 31 27 31 30C31 32 29.5 34 28 35C26.5 34 25 32 25 30C25 27 28 23 28 23Z"
          fill="#FEF08A"
        />
        <text
          x="28"
          y="44"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="7"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.8"
        >
          NFPA
        </text>
      </svg>
    ),
  },
  {
    id: "iso-9001",
    badgeCode: "ISO 9001:2015",
    title: "Quality Management System (QMS)",
    authority: "International Organization for Standardization",
    status: "QMS Certified",
    category: "quality",
    scope: "Certified quality controls across technical procurement, MEP installation, commissioning, preventive maintenance, and client service handover.",
    iconBg: "bg-blue-50 text-blue-700 border-blue-200/80",
    badgeColor: "text-blue-700 bg-blue-50 border-blue-200",
    verifyUrl: "https://www.iso.org/iso-9001-quality-management.html",
    svgIcon: (
      <svg viewBox="0 0 56 56" fill="none" className="w-11 h-11" aria-label="ISO 9001 Seal">
        <circle cx="28" cy="28" r="23" fill="#0A3A60" stroke="#2563EB" strokeWidth="2" />
        <circle cx="28" cy="28" r="19" stroke="#93C5FD" strokeWidth="1" strokeDasharray="3 2" />
        {/* Checkmark Ribbon */}
        <circle cx="28" cy="24" r="11" fill="#1E40AF" />
        <path
          d="M23 24L26.5 27.5L33.5 20.5"
          stroke="#60A5FA"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="28"
          y="41"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="6.5"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.5"
        >
          ISO 9001
        </text>
      </svg>
    ),
  },
  {
    id: "iso-45001",
    badgeCode: "ISO 45001:2018",
    title: "Occupational Health & Safety (OH&S)",
    authority: "OH&S International Benchmark",
    status: "HSE Certified",
    category: "quality",
    scope: "Zero-harm safety management protecting site engineers, subcontractors, client facilities, and high-risk MEP operations across Qatar.",
    iconBg: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    verifyUrl: "https://www.iso.org/iso-45001-occupational-health-and-safety.html",
    svgIcon: (
      <svg viewBox="0 0 56 56" fill="none" className="w-11 h-11" aria-label="ISO 45001 Seal">
        <circle cx="28" cy="28" r="23" fill="#064E3B" stroke="#059669" strokeWidth="2" />
        <circle cx="28" cy="28" r="19" stroke="#6EE7B7" strokeWidth="1" strokeDasharray="3 2" />
        {/* Safety Cross Shield */}
        <path
          d="M28 13L36 17V24C36 30 28 35 28 35C28 35 20 30 20 24V17L28 13Z"
          fill="#047857"
          stroke="#A7F3D0"
          strokeWidth="1.5"
        />
        <path d="M28 18V28M23 23H33" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <text
          x="28"
          y="41"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="6"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.4"
        >
          ISO 45001
        </text>
      </svg>
    ),
  },
  {
    id: "ul-listed",
    badgeCode: "UL LISTED",
    title: "Underwriters Laboratories Certified",
    authority: "Global Safety Science Standards",
    status: "Equipment Verified",
    category: "international",
    scope: "Exclusive deployment of genuine UL-listed fire alarm panels, heat/smoke detectors, deluge valves, and fire-rated electrical distribution units.",
    iconBg: "bg-purple-50 text-purple-700 border-purple-200/80",
    badgeColor: "text-purple-700 bg-purple-50 border-purple-200",
    verifyUrl: "https://www.ul.com",
    svgIcon: (
      <svg viewBox="0 0 56 56" fill="none" className="w-11 h-11" aria-label="UL Listed Mark">
        <circle cx="28" cy="28" r="23" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
        <circle cx="28" cy="28" r="18" fill="#312E81" />
        <text
          x="28"
          y="31"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="17"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-0.5"
        >
          UL
        </text>
        <text
          x="28"
          y="40"
          textAnchor="middle"
          fill="#C7D2FE"
          fontSize="5.5"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1"
        >
          LISTED
        </text>
      </svg>
    ),
  },
  {
    id: "fm-approved",
    badgeCode: "FM APPROVED",
    title: "FM Global Certified Equipment",
    authority: "Factory Mutual Loss Prevention",
    status: "Industrial Standard",
    category: "international",
    scope: "FM-approved fire fighting pumps, waterflow detectors, deluge and pre-action suppression systems specified for critical commercial facilities.",
    iconBg: "bg-slate-50 text-slate-800 border-slate-300",
    badgeColor: "text-slate-800 bg-slate-100 border-slate-300",
    verifyUrl: "https://www.fmglobal.com",
    svgIcon: (
      <svg viewBox="0 0 56 56" fill="none" className="w-11 h-11" aria-label="FM Approved Diamond">
        <polygon
          points="28,4 52,28 28,52 4,28"
          fill="#0F172A"
          stroke="#EF4444"
          strokeWidth="2.5"
        />
        <polygon
          points="28,9 47,28 28,47 9,28"
          fill="#1E293B"
        />
        <text
          x="28"
          y="30"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="15"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.5"
        >
          FM
        </text>
        <text
          x="28"
          y="39"
          textAnchor="middle"
          fill="#F87171"
          fontSize="5"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.8"
        >
          APPROVED
        </text>
      </svg>
    ),
  },
  {
    id: "iso-14001",
    badgeCode: "ISO 14001:2015",
    title: "Environmental Management System",
    authority: "International Standards for Sustainability",
    status: "EMS Certified",
    category: "quality",
    scope: "Eco-compliant MEP implementation, sustainable refrigerant management (HVAC/ACMV), energy conservation, and responsible waste reduction.",
    iconBg: "bg-teal-50 text-teal-700 border-teal-200/80",
    badgeColor: "text-teal-700 bg-teal-50 border-teal-200",
    verifyUrl: "https://www.iso.org/iso-14001-environmental-management.html",
    svgIcon: (
      <svg viewBox="0 0 56 56" fill="none" className="w-11 h-11" aria-label="ISO 14001 Seal">
        <circle cx="28" cy="28" r="23" fill="#134E4A" stroke="#14B8A6" strokeWidth="2" />
        <circle cx="28" cy="28" r="19" stroke="#5EEAD4" strokeWidth="1" strokeDasharray="3 2" />
        {/* Leaf Graphic */}
        <path
          d="M28 15C22 18 19 25 21 31C24 33 27 33 30 31C35 27 36 20 36 15C33 15 30 15 28 15Z"
          fill="#0D9488"
          stroke="#99F6E4"
          strokeWidth="1.5"
        />
        <path d="M22 30C26 27 29 23 33 18" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <text
          x="28"
          y="41"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="6"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.4"
        >
          ISO 14001
        </text>
      </svg>
    ),
  },
  {
    id: "kahramaa",
    badgeCode: "KAHRAMAA COMPLIANT",
    title: "Qatar General Electricity & Water Standards",
    authority: "State of Qatar Utilities Authority",
    status: "Compliant & Tested",
    category: "qatar",
    scope: "Full engineering compliance for water supply connections, electrical distribution panels, pump motor starters, and energy efficiency benchmarks.",
    iconBg: "bg-sky-50 text-sky-700 border-sky-200/80",
    badgeColor: "text-sky-700 bg-sky-50 border-sky-200",
    verifyUrl: "https://www.km.qa",
    svgIcon: (
      <svg viewBox="0 0 56 56" fill="none" className="w-11 h-11" aria-label="Kahramaa Compliance Badge">
        <circle cx="28" cy="28" r="23" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="2" />
        {/* Water Droplet + Electric Bolt */}
        <path
          d="M28 13C28 13 36 23 36 29C36 33.4 32.4 37 28 37C23.6 37 20 33.4 20 29C20 23 28 13 28 13Z"
          fill="#0284C7"
        />
        <polygon points="28,18 25,27 28,27 27,33 32,25 29,25" fill="#FACC15" />
        <text
          x="28"
          y="44"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="5"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.4"
        >
          KAHRAMAA
        </text>
      </svg>
    ),
  },
];

export interface CertificationsSectionProps {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  displayMode?: "both" | "marquee" | "grid" | null;
  cmsCertifications?: CmsCertification[] | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  ctaDesc?: string | null;
}

export default function CertificationsSection({
  eyebrow,
  heading,
  description,
  displayMode = "both",
  cmsCertifications,
  ctaLabel,
  ctaHref,
  ctaDesc,
}: CertificationsSectionProps) {
  // Merge CMS-provided certifications with defaults
  const mergedItems = useMemo<CertificationItem[]>(() => {
    if (!cmsCertifications || cmsCertifications.length === 0) {
      return DEFAULT_CERTIFICATIONS;
    }

    // Map any custom uploaded CMS certifications
    const cmsItems: CertificationItem[] = cmsCertifications.map((c, idx) => {
      // Check if this matches a default item by badgeCode or id
      const matchedDefault = DEFAULT_CERTIFICATIONS.find(
        (d) =>
          d.badgeCode.toLowerCase() === c.badgeCode.toLowerCase() ||
          d.id.toLowerCase() === c.badgeCode.toLowerCase()
      );

      if (matchedDefault) {
        return {
          ...matchedDefault,
          title: c.title || matchedDefault.title,
          authority: c.authority || matchedDefault.authority,
          status: c.status || matchedDefault.status,
          scope: c.scope || matchedDefault.scope,
          logo: c.logo || c.logoUrl || matchedDefault.logo,
          verifyUrl: c.verifyUrl || matchedDefault.verifyUrl,
        };
      }

      // New custom certification
      return {
        id: `custom-${idx}`,
        badgeCode: c.badgeCode,
        title: c.title || `${c.badgeCode} Certification`,
        authority: c.authority || "Accredited Safety Authority",
        status: c.status || "Verified Active",
        scope: c.scope || "Official technical certification and regulatory approval in Qatar.",
        category: "international",
        iconBg: "bg-slate-50 text-slate-800 border-slate-200",
        badgeColor: "text-slate-800 bg-slate-50 border-slate-200",
        logo: c.logo || c.logoUrl,
        verifyUrl: c.verifyUrl,
        svgIcon: (
          <svg viewBox="0 0 56 56" fill="none" className="w-11 h-11">
            <circle cx="28" cy="28" r="23" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
            <path d="M28 14L37 19V27C37 34 28 40 28 40C28 40 19 34 19 27V19L28 14Z" fill="#334155" />
            <path d="M24 27L27 30L33 23" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      };
    });

    // Merge: Include all CMS items, plus default items that weren't overridden
    const cmsBadgeCodes = new Set(cmsCertifications.map((c) => c.badgeCode.toLowerCase()));
    const remainingDefaults = DEFAULT_CERTIFICATIONS.filter(
      (d) => !cmsBadgeCodes.has(d.badgeCode.toLowerCase()) && !cmsBadgeCodes.has(d.id.toLowerCase())
    );

    return [...cmsItems, ...remainingDefaults];
  }, [cmsCertifications]);

  return (
    <section
      id="certifications"
      className="bg-white py-16 md:py-24 border-b border-[var(--border)] relative overflow-hidden"
      aria-label="Certifications & Regulatory Accreditations in Qatar"
    >
      {/* Decorative ambient gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-slate-100/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-[var(--color-brand-50)]/60 blur-3xl"
      />

      <Container className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={eyebrow || "Compliance & Accreditations"}
          title={heading || "Official Certifications & Safety Approvals"}
          description={
            description ||
            "Adam Technical Services operates under rigorous Qatar government accreditations and international engineering standards, guaranteeing full regulatory approval, life safety, and audit-ready handovers."
          }
          align="center"
          as="h2"
        />

        {/* Official Certificate Logo Moving Swiper / Marquee (Just Logos, No Padding, No Texts) */}
        <div className="mt-8 sm:mt-12 relative flex w-full flex-col gap-8 overflow-hidden py-2">
          {/* Top marquee row */}
          <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <ul className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 sm:gap-16 hover:[animation-play-state:paused]">
              {[...mergedItems, ...mergedItems].map((item, i) => (
                <li
                  key={`${item.id}-row1-${i}`}
                  aria-hidden={i >= mergedItems.length}
                  className="flex shrink-0 items-center justify-center transition-transform duration-300 hover:scale-110"
                >
                  {item.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.logo}
                      alt={item.title || item.badgeCode}
                      className="h-12 sm:h-14 w-auto max-w-[140px] object-contain transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center transition-transform duration-300 [&>svg]:w-12 [&>svg]:h-12 sm:[&>svg]:w-14 sm:[&>svg]:h-14">
                      {item.svgIcon}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom reverse marquee row */}
          <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <ul className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 sm:gap-16 [animation-direction:reverse] hover:[animation-play-state:paused]">
              {[...mergedItems, ...mergedItems].reverse().map((item, i) => (
                <li
                  key={`${item.id}-row2-${i}`}
                  aria-hidden={i >= mergedItems.length}
                  className="flex shrink-0 items-center justify-center transition-transform duration-300 hover:scale-110"
                >
                  {item.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.logo}
                      alt={item.title || item.badgeCode}
                      className="h-12 sm:h-14 w-auto max-w-[140px] object-contain transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center transition-transform duration-300 [&>svg]:w-12 [&>svg]:h-12 sm:[&>svg]:w-14 sm:[&>svg]:h-14">
                      {item.svgIcon}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CMS-managed CTA (if set in admin or fallback) */}
        {ctaLabel && ctaHref && (
          <Reveal className="mt-12 text-center">
            {ctaDesc && (
              <p className="mb-4 text-sm text-slate-600 max-w-xl mx-auto">{ctaDesc}</p>
            )}
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-500)] px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[var(--color-brand-600)] hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>{ctaLabel}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
