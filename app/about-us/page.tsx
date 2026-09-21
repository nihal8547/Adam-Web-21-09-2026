import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import StatCounter from "@/components/StatCounter";
import Accordion from "@/components/Accordion";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/jsonld";
import { about, whyChooseUs, stats, qcddBand } from "@/content/company";

export const metadata: Metadata = buildMetadata({
  title: "About Us | Adam Technical Services Qatar",
  description:
    "Adam Technical Services is a QCDD-certified fire protection and MEP contractor in Doha, part of Faisal Bin Ejayan Group And Partners. Learn who we are.",
  path: "/about-us",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={faqSchema(whyChooseUs)} />
      <Breadcrumbs crumbs={[{ name: "About Us", path: "/about-us" }]} />

      {/* Hero */}
      <section className="bg-[var(--surface-alt)]">
        <Container className="py-14 md:py-16">
          <span className="eyebrow gold-rule">{about.hero.eyebrow}</span>
          <h1 className="mt-4 max-w-4xl text-[length:var(--text-4xl)]">{about.hero.heading}</h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] text-[var(--body)]">{about.hero.body}</p>
        </Container>
      </section>

      {/* Story */}
      <section className="bg-[var(--surface)]">
        <Container className="py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <SectionHeading eyebrow="Our Story" title={about.story.heading} as="h2" />
            </Reveal>
            <Reveal delay={80} className="space-y-4 text-[1.05rem] text-[var(--body)]">
              {about.story.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Mission + Vision */}
      <section className="bg-[var(--surface-alt)]">
        <Container className="grid gap-6 py-16 md:grid-cols-2">
          {[about.mission, about.vision].map((block, i) => (
            <Reveal key={block.heading} delay={i * 90}>
              <div className="flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--border)] border-l-[3px] border-l-[var(--color-brand-500)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)]">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--surface-wash)] text-[var(--accent-strong)]">
                  <Icon name={i === 0 ? "shield" : "star"} size={24} />
                </span>
                <h2 className="mt-4 text-[length:var(--text-xl)]">{block.heading}</h2>
                <p className="mt-3 text-[var(--body)]">{block.body}</p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Stats — gold-tinted band */}
      <section className="border-y border-[var(--color-brand-100)] bg-[linear-gradient(180deg,var(--color-brand-50),var(--color-brand-100))]">
        <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-3">
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </Container>
      </section>

      {/* Why Choose Us — accordion (also FAQ schema) */}
      <section className="bg-[var(--surface)]">
        <Container className="py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Why Choose Us"
                title="Answers to what matters most"
                as="h2"
              />
              <p className="mt-4 text-[var(--body)]">
                We combine engineering rigour, certified equipment and dependable service. Here are
                the questions clients ask us most.
              </p>
            </div>
            <Accordion items={whyChooseUs} />
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow={qcddBand.eyebrow}
        heading={qcddBand.heading}
        body={qcddBand.body}
        primary={{ label: "Know More →", href: qcddBand.cta.href }}
        tone="gold"
      />

      <CTABand
        heading="Let's build something safe together"
        body="Talk to our QCDD-certified team about your fire protection or MEP requirement."
        primary={{ label: "Get a Free Quote", href: "/request-for-quotation" }}
        secondary={{ label: "Contact Us", href: "/contact-us" }}
      />
    </>
  );
}
