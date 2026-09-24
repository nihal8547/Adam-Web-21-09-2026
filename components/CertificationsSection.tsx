import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import Link from "next/link";

export interface CmsCertification {
  badgeCode: string;
  logo?: string;
}

interface CertificationItem {
  id: string;
  badgeCode: string;
  title: string;
  authority: string;
  status: string;
  scope: string;
  iconBg: string;
  badgeColor: string;
  svgIcon: React.ReactNode;
}

const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "qcdd",
    badgeCode: "QCDD GRADE A",
    title: "Qatar Civil Defence Approved",
    authority: "Ministry of Interior, State of Qatar",
    status: "Active & Certified",
    scope: "Full authority for Fire Alarm, Fire Fighting Pumps, Sprinkler, Foam, and Smoke Extraction licensing and handover.",
    iconBg: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    badgeColor: "text-amber-700 bg-amber-50 border-amber-200/80",
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 2" opacity="0.6" />
        <path d="M24 6L37 12V22C37 31 24 39 24 39C24 39 11 31 11 22V12L24 6Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M24 16V29M18 22H30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="23" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "nfpa",
    badgeCode: "NFPA MEMBER",
    title: "National Fire Protection Association",
    authority: "NFPA International Life Safety Code",
    status: "Code Compliant",
    scope: "Design, hydraulic calculations, and maintenance executed strictly under NFPA 13, 20, 72, 101, and 2001 standards.",
    iconBg: "bg-red-500/10 text-red-600 border-red-500/20",
    badgeColor: "text-red-700 bg-red-50 border-red-200/80",
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 4L39 14V34L24 44L9 34V14L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
        <path d="M24 13C24 13 28 18 28 22C28 25 26 27 24 29C22 27 20 25 20 22C20 18 24 13 24 13Z" fill="currentColor" />
        <path d="M24 23C24 23 26 26 26 28C26 30 25 31 24 32C23 31 22 30 22 28C22 26 24 23 24 23Z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: "iso-9001",
    badgeCode: "ISO 9001:2015",
    title: "Quality Management System",
    authority: "International Organization for Standardization",
    status: "QMS Certified",
    scope: "Certified quality controls across technical procurement, MEP installation, commissioning, and preventive maintenance.",
    iconBg: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    badgeColor: "text-blue-700 bg-blue-50 border-blue-200/80",
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="20" r="14" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.12" />
        <path d="M19 20L23 24L29 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 31L15 42L24 38L33 42L30 31" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2" />
      </svg>
    ),
  },
  {
    id: "iso-45001",
    badgeCode: "ISO 45001:2018",
    title: "Occupational Health & Safety",
    authority: "OHS International Benchmark",
    status: "HSE Certified",
    scope: "Zero-harm safety management protecting site engineers, client assets, and high-rise construction projects in Doha.",
    iconBg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200/80",
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 6C14 6 8 13 8 22C8 33 24 42 24 42C24 42 40 33 40 22C40 13 34 6 24 6Z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.12" />
        <path d="M24 16V28M18 22H30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "ul-listed",
    badgeCode: "UL LISTED",
    title: "Underwriters Laboratories Certified",
    authority: "Global Safety Science Standards",
    status: "Equipment Verified",
    scope: "Exclusively deploying UL-listed fire alarm panels, heat/smoke detectors, deluge valves, and fire-rated equipment.",
    iconBg: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    badgeColor: "text-purple-700 bg-purple-50 border-purple-200/80",
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.12" />
        <text x="24" y="29" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="bold" fontFamily="sans-serif">UL</text>
      </svg>
    ),
  },
  {
    id: "fm-approved",
    badgeCode: "FM APPROVED",
    title: "FM Global Certified Equipment",
    authority: "Factory Mutual Loss Prevention",
    status: "Industrial Standard",
    scope: "FM-approved fire fighting pumps, waterflow detectors, and suppression systems specified for high-hazard commercial facilities.",
    iconBg: "bg-slate-700/10 text-slate-800 border-slate-700/20",
    badgeColor: "text-slate-800 bg-slate-100 border-slate-300",
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="24" y="5" width="27" height="27" transform="rotate(45 24 5)" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.12" rx="4" />
        <text x="24" y="28" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">FM</text>
      </svg>
    ),
  },
];

export default function CertificationsSection({
  eyebrow,
  heading,
  description,
  cmsCertifications,
  ctaLabel,
  ctaHref,
  ctaDesc,
}: {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cmsCertifications?: CmsCertification[] | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  ctaDesc?: string | null;
}) {
  return (
    <section
      id="certifications"
      className="bg-white py-16 md:py-24 border-b border-[var(--border)] relative overflow-hidden"
      aria-label="Certifications & Regulatory Accreditations in Qatar"
    >
      {/* Subtle geometric background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-slate-100/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[var(--color-brand-50)]/50 blur-3xl"
      />

      <Container className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={eyebrow || undefined}
          title={heading || "Official Certifications & Safety Approvals"}
          description={description || undefined}
          align="center"
          as="h2"
        />

        {/* Certification logo marquee */}
        <div className="mt-12 sm:mt-16 relative flex w-full flex-col gap-6 overflow-hidden py-4">
          <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <ul className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-6">
              {[...CERTIFICATIONS, ...CERTIFICATIONS].map((item, i) => (
                <li
                  key={`${item.id}-1-${i}`}
                  aria-hidden={i >= CERTIFICATIONS.length}
                  className="group/logo relative flex h-[130px] w-[170px] shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 text-center shadow-[0_2px_8px_rgba(15,30,61,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-brand-500)]/50 hover:shadow-[0_12px_30px_rgba(15,30,61,0.08)]"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${item.iconBg}`}>
                    {item.svgIcon}
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide leading-tight">
                    {item.badgeCode}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <ul className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-6 [animation-direction:reverse]">
              {[...CERTIFICATIONS, ...CERTIFICATIONS].reverse().map((item, i) => (
                <li
                  key={`${item.id}-2-${i}`}
                  aria-hidden={i >= CERTIFICATIONS.length}
                  className="group/logo relative flex h-[130px] w-[170px] shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 text-center shadow-[0_2px_8px_rgba(15,30,61,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-brand-500)]/50 hover:shadow-[0_12px_30px_rgba(15,30,61,0.08)]"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${item.iconBg}`}>
                    {item.svgIcon}
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide leading-tight">
                    {item.badgeCode}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CMS-managed CTA (if set in admin) */}
        {ctaLabel && ctaHref && (
          <Reveal className="mt-10 text-center">
            {ctaDesc && (
              <p className="mb-4 text-[0.9rem] text-slate-600">{ctaDesc}</p>
            )}
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-500)] px-7 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[var(--color-brand-600)] hover:shadow-lg"
            >
              {ctaLabel} →
            </Link>
          </Reveal>
        )}

        {/* Extra CMS-managed certifications (uploaded badges beyond the hardcoded set) */}
        {cmsCertifications && cmsCertifications.length > 0 && (
          <Reveal className="mt-8">
            <ul className="flex flex-wrap justify-center gap-4">
              {cmsCertifications.map((cert, i) => (
                <li
                  key={`cms-cert-${i}`}
                  className="flex h-[90px] w-[150px] shrink-0 items-center justify-center rounded-2xl border border-slate-200/90 bg-white px-4 text-center shadow-sm"
                >
                  {cert.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cert.logo} alt={cert.badgeCode} className="max-h-12 object-contain" />
                  ) : (
                    <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide leading-tight">
                      {cert.badgeCode}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
