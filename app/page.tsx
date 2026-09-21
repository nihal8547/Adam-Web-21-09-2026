import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import StatCounter from "@/components/StatCounter";
import ServiceTile from "@/components/ServiceTile";
import FeatureBlock from "@/components/FeatureBlock";
import TestimonialSlider from "@/components/TestimonialSlider";
import LogoMarquee from "@/components/LogoMarquee";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/Icon";
import { Button } from "@/components/Button";
import { buildMetadata } from "@/lib/seo";
import { featuredServices } from "@/content/services";
import { projects } from "@/content/projects";
import {
  stats,
  whatDrivesUs,
  whatMakesUsBetter,
  groupCredibility,
  qcddBand,
  homeFeatureBlocks,
} from "@/content/company";
import { testimonials } from "@/content/testimonials";
import { clients } from "@/content/clients";

export const metadata: Metadata = buildMetadata({
  title: "Adam Technical Services | Fire Protection & MEP in Qatar",
  description:
    "QCDD-certified fire protection company in Qatar. Fire alarms, pumps, sprinklers, leak detection, HVAC & ACMV — designed, installed & maintained to NFPA standards.",
  path: "/",
  keywords: [
    "fire protection company in Qatar",
    "fire fighting company in Qatar",
    "MEP company in Qatar",
    "HVAC company in Qatar",
  ],
});

export default function HomePage() {
  const showcaseProjects = projects.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Stat band — gold-tinted 6-column credentials grid */}
      <section
        id="company-stats"
        className="border-y border-[var(--color-brand-100)] bg-[linear-gradient(180deg,var(--color-brand-50),var(--color-brand-100))]"
        aria-label="Adam Technical Services key credentials: #1 in Qatar, QCDD, 24/7 Emergency, 1000+ Projects, 100+ Employees, NFPA Compliant"
      >
        <Container className="grid grid-cols-2 gap-y-8 gap-x-4 py-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-2">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col justify-center ${
                i < stats.length - 1 ? "lg:border-r lg:border-[var(--color-brand-300)]/35" : ""
              }`}
            >
              <StatCounter {...s} />
            </div>
          ))}
        </Container>
      </section>

      {/* Who We Are band — image + intro + inline stats */}
      <section id="about" className="bg-white" aria-labelledby="about-heading">
        <Container className="py-16 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] shadow-[var(--shadow-card)] max-h-[400px] lg:max-h-[450px] flex items-center justify-center">
                <Image
                  src="/images/hero-engineering.svg"
                  alt="QCDD-certified fire protection engineers from Adam Technical Services inspecting a fire system on site in Doha, Qatar"
                  width={640}
                  height={450}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-full w-1.5 bg-[var(--color-brand-500)]"
                />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <SectionHeading eyebrow={whatDrivesUs.eyebrow} title={whatDrivesUs.heading} as="h2" />
              <div className="mt-4 space-y-4 text-[1.02rem] text-[var(--body)]">
                {whatDrivesUs.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-7 grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-3 sm:gap-x-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold leading-none text-[var(--accent-strong)]">
                      {s.text ? s.text : `${s.prefix ?? ""}${s.value}${s.suffix ?? ""}`}
                    </div>
                    <div className="mt-1.5 text-[0.85rem] font-semibold text-[var(--subheading)] leading-snug">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button href="/about-us" variant="secondary">
                  About Us →
                </Button>
              </div>
            </Reveal>
          </div>
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
          <div className="mt-10 text-center">
            <Button href="/services" size="lg">
              View all 9 services →
            </Button>
          </div>
        </Container>
      </section>

      {/* What Makes Us Better — 3 cards */}
      <section id="why-us" className="bg-[var(--surface)]" aria-labelledby="why-us-heading">
        <Container className="py-16 md:py-20">
          <SectionHeading
            eyebrow="What Makes Us Better"
            title="Engineering you can rely on"
            align="center"
            as="h2"
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {whatMakesUsBetter.map((card, i) => (
              <Reveal as="li" key={card.title} delay={i * 90}>
                <div className="flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--border)] border-l-[3px] border-l-[var(--color-brand-500)] bg-[var(--surface)] p-7 shadow-[var(--shadow-card)]">
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--surface-wash)] text-[var(--accent-strong)]">
                    <Icon name={card.icon as IconName} size={26} />
                  </span>
                  <h3 className="text-[1.2rem] font-semibold text-[var(--heading)]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--body)]">
                    {card.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Group credibility quote */}
      <section
        id="group-credibility"
        className="bg-[var(--surface-alt)]"
        aria-label="About Faisal Bin Ejayan Group and Adam Technical Services"
      >
        <Container className="py-16">
          <Reveal className="mx-auto max-w-4xl text-center">
            <span className="text-[var(--accent)]">
              <Icon name="quote" size={44} className="mx-auto" />
            </span>
            <blockquote className="mt-4">
              <p className="text-[length:var(--text-2xl)] font-medium leading-snug text-[var(--heading)]">
                {groupCredibility}
              </p>
            </blockquote>
          </Reveal>
        </Container>
      </section>

      {/* QCDD band — gold */}
      <CTABand
        eyebrow={qcddBand.eyebrow}
        heading={qcddBand.heading}
        body={qcddBand.body}
        primary={{ label: qcddBand.cta.label + " →", href: qcddBand.cta.href }}
        tone="gold"
      />

      {/* Feature blocks */}
      <section
        id="expertise"
        className="bg-[var(--surface)]"
        aria-label="HVAC services and water leak detection expertise in Qatar"
      >
        <Container className="flex flex-col gap-20 py-16 md:py-24">
          {homeFeatureBlocks.map((block, i) => (
            <FeatureBlock key={block.heading} {...block} reverse={i % 2 === 1} />
          ))}
        </Container>
      </section>

      {/* Projects showcase — NAFFCO reference tiles */}
      <section id="projects" className="bg-[var(--surface-alt)]" aria-labelledby="projects-heading">
        <Container className="py-16 md:py-20">
          <SectionHeading
            eyebrow="Our Work"
            title="Projects delivered across Qatar"
            description="Fire protection, HVAC, ACMV and leak-detection work across every sector."
            align="center"
            as="h2"
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {showcaseProjects.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group relative isolate flex min-h-[240px] overflow-hidden rounded-[var(--radius-md)] text-white shadow-[var(--shadow-card)]"
                >
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 520px) 100vw, (max-width: 820px) 50vw, 33vw"
                    className="-z-20 object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(15,14,12,0.82) 0%, rgba(15,14,12,0.28) 45%, rgba(15,14,12,0.08) 100%)",
                    }}
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wide">
                    {p.sector}
                  </span>
                  <div className="mt-auto flex w-full items-end justify-between gap-3 p-5">
                    <div>
                      <h3 className="text-[1.15rem] font-semibold text-white">{p.title}</h3>
                      <p className="mt-1 max-w-[30ch] text-[0.85rem] text-white/85">{p.summary}</p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)] text-[var(--color-ink-900)] transition-transform group-hover:translate-x-1">
                      <Icon name="arrow-right" size={18} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Button href="/projects" variant="secondary" size="lg">
              View all projects →
            </Button>
          </div>
        </Container>
      </section>

      {/* Photo Gallery */}
      <section className="bg-white" id="gallery" aria-labelledby="gallery-heading">
        <Container className="py-16 md:py-20">
          <SectionHeading
            eyebrow="Project Gallery"
            title="Fire Protection & MEP Projects in Qatar"
            description="A visual showcase of fire alarm systems, sprinklers, HVAC, ACMV and MEP installations completed by Adam Technical Services across Doha and Qatar."
            align="center"
            as="h2"
          />
          <Reveal>
            <div
              role="list"
              className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>div]:mb-4"
            >
              {[
                {
                  src: "https://placehold.co/800x600/121212/d4a017.webp?text=Fire+Alarm",
                  alt: "Fire alarm panel installation by Adam Technical Services in Qatar",
                },
                {
                  src: "https://placehold.co/800x900/1a1a1a/d4a017.webp?text=Sprinkler+System",
                  alt: "Sprinkler system piping installation in a commercial building, Doha",
                },
                {
                  src: "https://placehold.co/800x600/121212/d4a017.webp?text=HVAC+Unit",
                  alt: "HVAC rooftop unit installed by Adam Technical Services in Qatar",
                },
                {
                  src: "https://placehold.co/800x700/0d0d0d/d4a017.webp?text=Pump+Room",
                  alt: "Fire fighting pump room with QCDD-certified equipment",
                },
                {
                  src: "https://placehold.co/800x600/1a1a1a/d4a017.webp?text=Leak+Detection",
                  alt: "Underground water leak detection service using acoustic sensors in Qatar",
                },
                {
                  src: "https://placehold.co/800x900/121212/d4a017.webp?text=MEP+Works",
                  alt: "MEP mechanical electrical plumbing works on a construction site in Doha",
                },
                {
                  src: "https://placehold.co/800x600/0d0d0d/d4a017.webp?text=ACMV+System",
                  alt: "ACMV air conditioning and mechanical ventilation system installed in Qatar",
                },
                {
                  src: "https://placehold.co/800x700/1a1a1a/d4a017.webp?text=Fire+Suppression",
                  alt: "Fire suppression system installation for industrial facility in Qatar",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  role="listitem"
                  className="group overflow-hidden rounded-[var(--radius-md)] shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={800}
                    height={600}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    unoptimized
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

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
            align="center"
            as="h2"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <TestimonialSlider items={testimonials} />
          </div>
        </Container>
      </section>

      {/* Client logo marquee */}
      <section
        id="clients"
        className="bg-[var(--surface-alt)]"
        aria-label="Trusted clients and partners of Adam Technical Services across Qatar"
      >
        <Container className="py-14">
          <p className="text-center text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-[var(--body)]">
            Trusted by clients and partners across Qatar
          </p>
          <div className="mt-8">
            <LogoMarquee items={clients} />
          </div>
        </Container>
      </section>

      {/* Let's Connect */}
      <section id="contact" className="bg-[var(--surface)]" aria-labelledby="contact-heading">
        <Container className="py-16 md:py-20">
          <SectionHeading
            eyebrow="Let's Connect"
            title="Two ways to get started"
            align="center"
            as="h2"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
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
                className="group flex flex-col rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--surface-wash)] text-[var(--accent-strong)]">
                  <Icon name={path.icon} size={26} />
                </span>
                <h3 className="mt-4 text-[1.3rem] font-semibold text-[var(--heading)]">
                  {path.title}
                </h3>
                <p className="mt-2 text-[var(--body)]">{path.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-[var(--accent-strong)]">
                  {path.cta}
                  <Icon
                    name="arrow-right"
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
