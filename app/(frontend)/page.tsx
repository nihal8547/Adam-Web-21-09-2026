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
import ProjectGalleryInteractive from "@/components/ProjectGalleryInteractive";
import WhatMakesUsBetterDropdown from "@/components/WhatMakesUsBetterDropdown";
import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/Icon";
import { Button } from "@/components/Button";
import { buildMetadata } from "@/lib/seo";
import { getFeaturedServices } from "@/lib/cms/services";
import { getAllProjects } from "@/lib/cms/projects";
import { getHome } from "@/lib/cms/home";
import { getTestimonials, getClients } from "@/lib/cms/misc";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Adam Technical Services | Fire Protection & MEP in Qatar",
  description:
    "QCDD-certified fire protection company in Qatar. Fire alarms, pumps, sprinklers, leak detection, HVAC & ACMV — designed, installed & maintained to NFPA standards.",
  path: "/",
  keywords: [
    "top fire protection company in Qatar",
    "fire protection company in Qatar",
    "fire fighting company in Qatar",
    "QCDD approved fire protection Qatar",
    "fire alarm system Qatar",
    "fire fighting pump Qatar",
    "fire sprinkler system Qatar",
    "underground water leak detection Qatar",
    "HVAC company in Qatar",
    "AC service and maintenance Qatar",
    "MEP company in Qatar",
    "ACMV company Qatar",
    "annual maintenance contract AMC Qatar",
    "fire protection company in Doha",
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
        primaryCta={home.hero.primaryCta}
        secondaryCta={home.hero.secondaryCta}
        quickAccess={home.hero.quickAccess}
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
      <section
        id="projects"
        className="relative bg-white py-14 md:py-20 text-slate-900"
        aria-labelledby="projects-heading"
      >
        <Container className="relative">
          <Reveal>
            <OurWorkSwipeShowcase projects={allProjects} />
          </Reveal>
        </Container>
      </section>

      {/* Services — NAFFCO image tiles (titles are real headings for SEO) */}
      <section className="bg-[var(--surface-alt)]" id="services" aria-labelledby="services-heading">
        <Container className="py-16 md:py-20">
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
        tone="surface"
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
        cmsCertifications={home.certifications}
        ctaLabel={home.certCtaLabel}
        ctaHref={home.certCtaHref}
        ctaDesc={home.certCtaDesc}
      />

      {/* Project Gallery - Interactive */}
      <ProjectGalleryInteractive 
        images={home.galleryImages as any} 
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

      {/* Let's Connect */}
      <section
        id="contact"
        className="relative overflow-hidden bg-[var(--color-navy-900)]"
        aria-labelledby="contact-heading"
      >
        {/* subtle gold glow accents */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[var(--color-brand-500)]/10 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[var(--color-brand-500)]/10 blur-3xl"
        />
        <Container className="relative py-16 md:py-24">
          <SectionHeading
            eyebrow="Let's Connect"
            title="Two ways to get started"
            align="center"
            as="h2"
            invert
            eyebrowClassName="!text-white [&::after]:!bg-white"
          />
          <Reveal delay={80} className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {[
              {
                title: "Contact Us",
                desc: "Talk to our team about your fire protection, HVAC or MEP requirement.",
                href: "/contact-us",
                cta: "Get in touch",
                icon: "mail" as IconName,
              },
              {
                title: "Explore Careers",
                desc: "Join a QCDD-certified team building a safer Qatar.",
                href: "/careers",
                cta: "View openings",
                icon: "team" as IconName,
              },
            ].map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="group relative flex flex-col overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.07]"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-white/30 group-hover:bg-white/20">
                  <Icon name={path.icon} size={26} />
                </span>
                <h3 className="mt-5 text-[1.35rem] font-semibold text-white">{path.title}</h3>
                <p className="mt-2 text-white/70">{path.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-white transition-colors group-hover:text-white/90">
                  {path.cta}
                  <Icon
                    name="arrow-right"
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>
    </>
  );
}
