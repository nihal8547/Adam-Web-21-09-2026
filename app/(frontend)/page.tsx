import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import StatCounter from "@/components/StatCounter";
import ServiceTile from "@/components/ServiceTile";
import ExpertiseShowcase3D from "@/components/ExpertiseShowcase3D";
import TestimonialSlider from "@/components/TestimonialSlider";
import LogoMarquee from "@/components/LogoMarquee";
import CTABand from "@/components/CTABand";
import OurWorkSwipeShowcase from "@/components/OurWorkSwipeShowcase";
import CertificationsSection from "@/components/CertificationsSection";
import ProjectGalleryInteractive, { type GalleryItem } from "@/components/ProjectGalleryInteractive";
import WhatMakesUsBetterDropdown from "@/components/WhatMakesUsBetterDropdown";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { Button } from "@/components/Button";
import { buildMetadata } from "@/lib/seo";
import { getFeaturedServices } from "@/lib/cms/services";
import { getAllProjects } from "@/lib/cms/projects";
import { getHome } from "@/lib/cms/home";
import { getTestimonials, getClients } from "@/lib/cms/misc";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "QCDD Approved Fire Protection & MEP Contractor in Qatar | Adam",
  description:
    "QCDD approved fire protection and MEP contractor in Qatar. Turnkey fire alarm systems, fire pumps, sprinklers, underground leak detection, HVAC, and 24/7 AMC across Doha.",
  path: "/",
  keywords: [
    "QCDD approved fire fighting company in Qatar",
    "fire protection contractor in Qatar",
    "fire fighting company in Qatar",
    "QCDD approved fire protection Qatar",
    "fire alarm system installation Qatar",
    "fire fighting pump maintenance Qatar",
    "automatic fire sprinkler system Qatar",
    "underground water leak detection Qatar",
    "commercial HVAC company in Qatar",
    "AC service and maintenance Qatar",
    "MEP contractor in Qatar",
    "ACMV ventilation contractor Qatar",
    "fire protection annual maintenance contract AMC Qatar",
    "Civil Defence approved fire contractor Doha",
  ],
});

export default async function HomePage() {
  const [home, featuredServices, allProjects, testimonials, clients] = await Promise.all([
    getHome(),
    getFeaturedServices(),
    getAllProjects(),
    getTestimonials(),
    getClients(),
  ]);
  const { stats, whatDrivesUs, groupCredibility, qcddBand } = home;

  return (
    <>
      <Hero
        eyebrow={home.hero.eyebrow}
        h1={home.hero.h1}
        sub={home.hero.sub}
        media={home.hero.media}
        primaryCta={home.hero.primaryCta}
        secondaryCta={home.hero.secondaryCta}
        quickAccess={home.hero.quickAccess}
        slides={home.hero.slides}
      />

      {/* Stat band — 6-column credentials grid */}
      <section
        id="company-stats"
        className="bg-white border-y border-[var(--border)] shadow-sm"
        aria-label="Adam Technical Services key credentials: #1 in Qatar, QCDD, 24/7 Emergency, 1000+ Projects, 100+ Employees, NFPA Compliant"
      >
        <Container>
          <Reveal className="grid grid-cols-2 gap-y-8 gap-x-4 py-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-2">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col justify-center ${i < stats.length - 1 ? "lg:border-r lg:border-[var(--border)]" : ""
                  }`}
              >
                <StatCounter {...s} />
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Who We Are / What Drives Us band — modern architectural layout */}
      <section
        id="about"
        className="relative overflow-hidden bg-[var(--color-navy-900)] text-white pt-16 pb-24 sm:pb-32 lg:pb-36"
        aria-labelledby="about-heading"
      >
        {/* Subtle decorative background blur */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-[var(--color-brand-500)]/10 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-[var(--color-brand-400)]/5 blur-2xl"
        />

        <Container className="relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1.1fr] lg:gap-16">
            {/* Visual Column */}
            <Reveal>
              <div className="group relative">
                {/* Main Photo Container */}
                <div className="relative overflow-hidden rounded-[24px] border border-white/15 bg-white/5 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
                  <Image
                    src={home.whoImage || "/images/about-engineering-team.jpg"}
                    alt="QCDD-certified fire protection engineers from Adam Technical Services inspecting a fire pump room and alarm panel in Doha, Qatar"
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {/* Subtle gradient vignette */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/80 via-transparent to-black/20"
                  />

                  {/* Top-Right Location Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3.5 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-md">
                    <Icon name="map-pin" size={13} className="text-[var(--color-brand-400)]" />
                    <span>Doha, Qatar</span>
                  </div>

                  {/* Bottom Floating Glassmorphic Compliance Card */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm rounded-2xl border border-white/30 bg-[var(--color-navy-900)]/90 p-4 text-white shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:bg-[var(--color-navy-900)]">
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-500)] text-white shadow-md">
                        <Icon name="shield" size={24} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-wider text-[var(--color-brand-300)]">
                          <span>Civil Defence Approved</span>
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <div className="text-sm font-bold text-white">
                          QCDD License &amp; NFPA Certified
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative gold edge accent */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-[26px] border-2 border-[var(--color-brand-400)]/30"
                />
              </div>
            </Reveal>

            {/* Content Column */}
            <Reveal delay={80}>
              <div>
                <SectionHeading
                    eyebrow={whatDrivesUs.eyebrow}
                    title={whatDrivesUs.heading}
                    as="h2"
                    invert
                    eyebrowClassName="!text-[var(--color-brand-400)] [&::after]:!bg-[var(--color-brand-400)]"
                  />

                <div className="mt-5 space-y-3.5 text-[1.02rem] leading-relaxed text-white/80">
                  {whatDrivesUs.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* Curved Wave Transition to the White Section Below (Matching Reference Site) */}
        <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none rotate-180">
          <svg
            viewBox="0 0 1920 272"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto min-h-[50px] max-h-[140px] block"
            preserveAspectRatio="none"
          >
            <path
              d="M-34.4998 0H1921L1977 49H1921C1259 -32 388.5 84 -1.99982 236C-392.5 388 -34.4998 0 -34.4998 0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Our Projects Section — Directly After About Section with Curved Model & White Background */}
      {/* Our Projects Section with Abstract Architectural Graphics on the White Flanks */}
      <section
        id="projects"
        className="relative bg-white py-10 md:py-14 text-slate-900 overflow-hidden"
        aria-labelledby="projects-heading"
      >
        {/* Abstract Background Model — Left Side Architectural Arcs & Dot Matrix */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 sm:left-2 lg:left-6 top-1 sm:top-3 w-48 sm:w-64 lg:w-80 h-56 sm:h-72 lg:h-88 z-0 select-none opacity-35 animate-abstract-float"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 320 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="arch-dots-left"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="3" cy="3" r="2" fill="#0f1e3d" fillOpacity="0.28" />
              </pattern>
              <linearGradient id="fade-left-diag" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="70%" stopColor="white" stopOpacity="0.6" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="arch-mask-left">
                <rect width="320" height="320" fill="url(#fade-left-diag)" />
              </mask>
            </defs>
            <rect width="320" height="320" fill="url(#arch-dots-left)" mask="url(#arch-mask-left)" />
            <circle cx="40" cy="80" r="70" stroke="#c9a24b" strokeWidth="1.5" strokeOpacity="0.45" strokeDasharray="5 3" />
            <circle cx="40" cy="80" r="110" stroke="#0f1e3d" strokeWidth="1.2" strokeOpacity="0.3" />
            <circle cx="40" cy="80" r="150" stroke="#c9a24b" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="8 5" />
            <circle cx="40" cy="80" r="190" stroke="#0f1e3d" strokeWidth="0.8" strokeOpacity="0.2" />
          </svg>
        </div>

        {/* Abstract Background Model — Right Side Engineering Waves & Dot Matrix */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 sm:right-2 lg:right-6 top-1 sm:top-3 w-48 sm:w-64 lg:w-80 h-56 sm:h-72 lg:h-88 z-0 select-none opacity-35 animate-abstract-float-reverse"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 320 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="arch-dots-right"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="3" cy="3" r="2" fill="#c9a24b" fillOpacity="0.35" />
              </pattern>
              <linearGradient id="fade-right-diag" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="70%" stopColor="white" stopOpacity="0.6" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="arch-mask-right">
                <rect width="320" height="320" fill="url(#fade-right-diag)" />
              </mask>
            </defs>
            <rect width="320" height="320" fill="url(#arch-dots-right)" mask="url(#arch-mask-right)" />
            <circle cx="280" cy="80" r="70" stroke="#0f1e3d" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="5 3" />
            <circle cx="280" cy="80" r="110" stroke="#c9a24b" strokeWidth="1.2" strokeOpacity="0.45" />
            <circle cx="280" cy="80" r="150" stroke="#0f1e3d" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="8 5" />
            <circle cx="280" cy="80" r="190" stroke="#c9a24b" strokeWidth="0.8" strokeOpacity="0.22" />
          </svg>
        </div>

        {/* Soft Ambient Radial Accents */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl z-0 animate-abstract-pulse"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[var(--color-navy-900)]/5 blur-3xl z-0 animate-abstract-pulse"
        />

        <Container className="relative z-10">
          <Reveal>
            <OurWorkSwipeShowcase projects={allProjects} />
          </Reveal>
        </Container>
      </section>

      {/* Services — NAFFCO image tiles (titles are real headings for SEO) */}
      <section className="relative overflow-hidden bg-[var(--surface-alt)]" id="services" aria-labelledby="services-heading">
        {/* Dot Abstract Model — Left Blank Side */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 sm:left-4 top-0 sm:top-1 w-52 sm:w-72 lg:w-80 h-52 sm:h-72 lg:h-80 select-none z-0 opacity-35 animate-abstract-float"
        >
          <svg className="w-full h-full" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="svc-dots-left" width="18" height="18" patternUnits="userSpaceOnUse">
                <circle cx="2.5" cy="2.5" r="1.75" fill="#0f1e3d" fillOpacity="0.30" />
              </pattern>
              <linearGradient id="svc-fade-left" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="65%" stopColor="white" stopOpacity="0.5" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="svc-mask-l">
                <rect width="240" height="240" fill="url(#svc-fade-left)" />
              </mask>
            </defs>
            <rect width="240" height="240" fill="url(#svc-dots-left)" mask="url(#svc-mask-l)" />
          </svg>
        </div>

        {/* Dot Abstract Model — Right Blank Side */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 sm:right-4 top-0 sm:top-1 w-52 sm:w-72 lg:w-80 h-52 sm:h-72 lg:h-80 select-none z-0 opacity-35 animate-abstract-float-reverse"
        >
          <svg className="w-full h-full" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="svc-dots-right" width="18" height="18" patternUnits="userSpaceOnUse">
                <circle cx="2.5" cy="2.5" r="1.75" fill="#c9a24b" fillOpacity="0.38" />
              </pattern>
              <linearGradient id="svc-fade-right" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="65%" stopColor="white" stopOpacity="0.5" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="svc-mask-r">
                <rect width="240" height="240" fill="url(#svc-fade-right)" />
              </mask>
            </defs>
            <rect width="240" height="240" fill="url(#svc-dots-right)" mask="url(#svc-mask-r)" />
          </svg>
        </div>

        <Container className="relative z-10 py-16 md:py-20">
          <SectionHeading
            eyebrow="Our Services"
            title="Complete fire protection & MEP capability"
            description="Nine specialist services, one accountable partner — engineered to QCDD and NFPA standards."
            align="center"
            as="h2"
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((svc, i) => (
              <Reveal as="li" key={svc.slug} delay={(i % 3) * 80}>
                <ServiceTile
                  name={svc.name}
                  excerpt={svc.excerpt}
                  href={`/${svc.slug}`}
                  icon={svc.icon}
                  image={svc.image}
                  tag={i === 0 ? "Featured" : undefined}
                  className="h-full"
                />
              </Reveal>
            ))}
          </ul>
          <Reveal delay={100} className="mt-10 text-center">
            <Button href="/services" size="lg">
              View all 9 services →
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* What Makes Us Better — Left Side 3 Icons + Right Side Dropdown Model */}
      <WhatMakesUsBetterDropdown />

      {/* Group credibility quote */}
      <section
        id="group-credibility"
        className="border-t border-[var(--border)] bg-[var(--surface-alt)]"
        aria-label="About Faisal Bin Ejayan Group and Adam Technical Services"
      >
        <Container className="py-16">
          <Reveal className="mx-auto max-w-4xl text-center">
            <span className="text-[var(--color-brand-500)]">
              <Icon name="quote" size={44} className="mx-auto" />
            </span>
            <blockquote className="mt-4">
              <p className="text-[length:var(--text-xl)] sm:text-[length:var(--text-2xl)] font-semibold leading-snug text-[var(--color-navy-900)]">
                {groupCredibility}
              </p>
            </blockquote>
          </Reveal>
        </Container>
      </section>

      {/* QCDD band — white */}
      <CTABand
        eyebrow={qcddBand.eyebrow}
        heading={qcddBand.heading}
        body={qcddBand.body}
        primary={{ label: qcddBand.cta.label + " →", href: qcddBand.cta.href }}
        backgroundImage="/images/hero-fire-safety.jpg"
      />



      {/* 3D Interactive Equipment Inspection Showcase (HVAC & Leak Detection) */}
      <ExpertiseShowcase3D 
        models={home.showcaseModels}
        eyebrow={home.showcaseEyebrow}
        heading={home.showcaseHeading}
        description={home.showcaseDescription}
      />

      {/* Official Certifications & Regulatory Approvals */}
      <CertificationsSection
        eyebrow={home.certEyebrow}
        heading={home.certHeading}
        description={home.certDescription}
        displayMode={home.certDisplayMode}
        cmsCertifications={home.certifications}
        ctaLabel={home.certCtaLabel}
        ctaHref={home.certCtaHref}
        ctaDesc={home.certCtaDesc}
      />

      {/* Project Gallery - Interactive */}
      <ProjectGalleryInteractive 
        images={home.galleryImages as unknown as GalleryItem[]} 
        eyebrow={home.galleryEyebrow} 
        heading={home.galleryHeading} 
        description={home.galleryDescription} 
      />

      {/* Testimonials */}
      <section
        id="testimonials"
        className="bg-[var(--surface)]"
        aria-labelledby="testimonials-heading"
      >
        <Container className="py-16 md:py-20">
          <SectionHeading
            eyebrow="Testimonials"
            title="What our clients say"
            description="Real feedback from property owners, facility managers, and contractors across Qatar who trust our engineering standards."
            align="center"
            as="h2"
          />
          <Reveal delay={80} className="mt-12 w-full">
            <TestimonialSlider items={testimonials} />
          </Reveal>
        </Container>
      </section>

      {/* Client logo marquee */}
      <section
        id="clients"
        className="bg-[var(--surface-alt)]"
        aria-label="Trusted clients and partners of Adam Technical Services across Qatar"
      >
        <Container className="py-14">
          <Reveal>
            <p className="text-center text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-[var(--body)]">
              Trusted by clients and partners across Qatar
            </p>
            <div className="mt-8">
              <LogoMarquee items={clients} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Let's Connect — Clean Architectural Consultation Model */}
      <section
        id="contact"
        className="relative bg-[var(--color-navy-900)] text-white py-14 md:py-20 border-t border-white/10"
        aria-labelledby="contact-heading"
      >
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Let&apos;s Connect
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Direct Support &amp; Inquiries
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed">
              Connect directly with our engineering team for projects, QCDD certifications, or career opportunities in Qatar.
            </p>
          </div>

          <Reveal delay={80} className="mx-auto mt-10 max-w-4xl">
            <div className="grid md:grid-cols-2 rounded-2xl border border-white/15 bg-white/[0.03] divide-y md:divide-y-0 md:divide-x divide-white/15 overflow-hidden">
              {/* Column 1: Engineering & Projects */}
              <div className="p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Client Inquiries
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-white">
                    Engineering &amp; Projects
                  </h3>
                  <p className="mt-2.5 text-sm text-white/75 leading-relaxed">
                    Speak directly with our team for fire protection systems, HVAC engineering, and Civil Defence certification.
                  </p>

                  <div className="mt-6 pt-5 border-t border-white/10 space-y-1.5 text-sm text-white/80">
                    <div>
                      <span className="text-white/50 text-xs uppercase tracking-wider block">Phone:</span>
                      <a href="tel:+97441400922" className="font-semibold text-white hover:text-amber-400 transition-colors">
                        +974 4140 0922
                      </a>
                    </div>
                    <div className="pt-2">
                      <span className="text-white/50 text-xs uppercase tracking-wider block">Email:</span>
                      <a href="mailto:info@adam.qa" className="font-semibold text-white hover:text-amber-400 transition-colors">
                        info@adam.qa
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>Contact our engineers →</span>
                  </Link>
                </div>
              </div>

              {/* Column 2: Careers & Talent */}
              <div className="p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Join Our Team
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-white">
                    Careers &amp; Opportunities
                  </h3>
                  <p className="mt-2.5 text-sm text-white/75 leading-relaxed">
                    Build your career with a QCDD-certified contractor delivering life safety and MEP infrastructure across Qatar.
                  </p>

                  <div className="mt-6 pt-5 border-t border-white/10 space-y-1.5 text-sm text-white/80">
                    <div>
                      <span className="text-white/50 text-xs uppercase tracking-wider block">Location:</span>
                      <span className="font-semibold text-white">
                        Doha, Qatar
                      </span>
                    </div>
                    <div className="pt-2">
                      <span className="text-white/50 text-xs uppercase tracking-wider block">Availability:</span>
                      <span className="font-semibold text-white">
                        Immediate openings for engineers &amp; technicians
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/careers"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>Explore career openings →</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
