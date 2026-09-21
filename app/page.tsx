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

      {/* Stat band — gold-tinted (no dark backgrounds) */}
      <section
        className="border-y border-[var(--color-brand-100)] bg-[linear-gradient(180deg,var(--color-brand-50),var(--color-brand-100))]"
        aria-label="Company at a glance"
      >
        <Container className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-3">
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </Container>
      </section>

      {/* Who We Are band — image + intro + inline stats */}
      <section className="bg-[var(--surface)]">
        <Container className="py-16 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] shadow-[var(--shadow-card)]">
                <Image
                  src="/images/hero-engineering.svg"
                  alt="Adam Technical Services engineering team on site in Doha, Qatar"
                  width={640}
                  height={512}
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
              <div className="mt-7 flex flex-wrap gap-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-[var(--font-display)] text-[length:var(--text-2xl)] font-bold leading-none text-[var(--accent-strong)]">
                      {s.prefix}
                      {s.value}
                      {s.suffix}
                    </div>
                    <div className="mt-1 text-[0.85rem] font-semibold text-[var(--subheading)]">
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
      <section className="bg-[var(--surface-alt)]" id="services">
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
      <section className="bg-[var(--surface)]">
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
      <section className="bg-[var(--surface-alt)]">
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
      <section className="bg-[var(--surface)]">
        <Container className="flex flex-col gap-20 py-16 md:py-24">
          {homeFeatureBlocks.map((block, i) => (
            <FeatureBlock key={block.heading} {...block} reverse={i % 2 === 1} />
          ))}
        </Container>
      </section>

      {/* Projects showcase — NAFFCO reference tiles */}
      <section className="bg-[var(--surface-alt)]">
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

      {/* Testimonials */}
      <section className="bg-[var(--surface)]">
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
      <section className="bg-[var(--surface-alt)]">
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
      <section className="bg-[var(--surface)]">
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
