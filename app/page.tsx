import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import StatCounter from "@/components/StatCounter";
import ServiceCard from "@/components/ServiceCard";
import FeatureBlock from "@/components/FeatureBlock";
import TestimonialSlider from "@/components/TestimonialSlider";
import LogoMarquee from "@/components/LogoMarquee";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/Icon";
import { Button } from "@/components/Button";
import { buildMetadata } from "@/lib/seo";
import { featuredServices } from "@/content/services";
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
  return (
    <>
      <Hero />

      {/* 3. Stat band */}
      <section className="bg-[var(--color-ink-900)]" aria-label="Company at a glance">
        <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-3">
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </Container>
      </section>

      {/* 4. What Drives Us */}
      <section className="bg-[var(--surface)]">
        <Container className="py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <SectionHeading eyebrow={whatDrivesUs.eyebrow} title={whatDrivesUs.heading} as="h2" />
            </Reveal>
            <Reveal delay={80} className="space-y-4 text-[1.05rem] text-[var(--body)]">
              {whatDrivesUs.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 5. What Makes Us Better */}
      <section className="bg-[var(--surface-alt)]">
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
                <div className="flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-card)]">
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

      {/* 6. Group credibility quote */}
      <section className="bg-[var(--surface)]">
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

      {/* 7. Services grid */}
      <section className="bg-[var(--surface-alt)]" id="services">
        <Container className="py-16 md:py-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Our Services" title="What we do" as="h2" />
            <Button href="/services" variant="ghost">
              View all services →
            </Button>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((svc, i) => (
              <Reveal as="li" key={svc.slug} delay={(i % 3) * 90}>
                <ServiceCard
                  name={svc.name}
                  excerpt={svc.excerpt}
                  href={`/${svc.slug}`}
                  icon={svc.icon}
                />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* 8. QCDD band */}
      <CTABand
        eyebrow={qcddBand.eyebrow}
        heading={qcddBand.heading}
        body={qcddBand.body}
        primary={{ label: qcddBand.cta.label + " →", href: qcddBand.cta.href }}
        tone="gold"
      />

      {/* 9. Feature blocks */}
      <section className="bg-[var(--surface)]">
        <Container className="flex flex-col gap-20 py-16 md:py-24">
          {homeFeatureBlocks.map((block, i) => (
            <FeatureBlock key={block.heading} {...block} reverse={i % 2 === 1} />
          ))}
        </Container>
      </section>

      {/* 10. Testimonials */}
      <section className="bg-[var(--surface-alt)]">
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

      {/* 11. Client logo marquee */}
      <section className="bg-[var(--surface)]">
        <Container className="py-14">
          <p className="text-center text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-[var(--body)]">
            Trusted by clients and partners across Qatar
          </p>
          <div className="mt-8">
            <LogoMarquee items={clients} />
          </div>
        </Container>
      </section>

      {/* 12. Let's Connect */}
      <section className="bg-[var(--surface-alt)]">
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
