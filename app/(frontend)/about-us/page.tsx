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
import { stats, qcddBand } from "@/content/company";
import { getAboutPage } from "@/lib/cms/pages";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "About Us | Adam Technical Services Qatar",
  description:
    "Adam Technical Services is a QCDD-certified fire protection and MEP contractor in Doha, part of Faisal Bin Ejayan Group And Partners. Learn who we are.",
  path: "/about-us",
});

export default async function AboutPage() {
  const about = await getAboutPage();
  const whyChooseUs = about.whyChooseUs;
  return (
    <>
      <JsonLd data={faqSchema(whyChooseUs)} />

      {/* Hero with Architectural Deep Navy + Ambient Glow */}
      <section className="relative overflow-hidden bg-[var(--color-navy-900)] text-white pt-24 pb-16 md:pt-32 md:pb-20">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[var(--color-brand-500)]/25 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-amber-400/10 blur-2xl"
        />

        <Container className="relative z-10">
          <div className="mb-6">
            <Breadcrumbs crumbs={[{ name: "About Us", path: "/about-us" }]} invert />
          </div>
          <Reveal>
            <span className="eyebrow gold-rule !text-amber-400 [&::after]:!bg-amber-400">
              {about.hero.eyebrow}
            </span>
            <h1 className="mt-4 max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-tight">
              {about.hero.heading}
            </h1>
            <p className="mt-6 max-w-3xl text-base sm:text-lg text-white/80 leading-relaxed">
              {about.hero.body}
            </p>
          </Reveal>
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

      {/* Mission + Vision — Home Page Model Card Style */}
      <section className="bg-slate-50 py-16 md:py-24 border-y border-slate-200/80">
        <Container className="grid gap-8 md:grid-cols-2">
          {[about.mission, about.vision].map((block, i) => (
            <Reveal key={block.heading} delay={i * 90}>
              <div className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-xl">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-navy-900)] text-amber-400 shadow-md transition-transform duration-300 group-hover:scale-105">
                  <Icon name={i === 0 ? "shield" : "star"} size={26} />
                </span>
                <h2 className="mt-6 text-2xl font-bold text-slate-900 leading-snug">
                  {block.heading}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {block.body}
                </p>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span>Adam Core Pillar</span>
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Stats — 6-column credentials grid */}
      <section className="bg-white border-y border-[var(--border)] shadow-sm">
        <Container className="grid grid-cols-2 gap-y-8 gap-x-4 py-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-2">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col justify-center ${
                i < stats.length - 1 ? "lg:border-r lg:border-[var(--border)]" : ""
              }`}
            >
              <StatCounter {...s} />
            </div>
          ))}
        </Container>
      </section>

      {/* Why Choose Us — matching Home Page What Makes Us Better Dropdown Model */}
      <section className="relative overflow-hidden bg-[var(--color-navy-900)] text-white py-16 md:py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[var(--color-brand-500)]/15 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl"
        />
        <Container className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16 items-start">
            <Reveal>
              <SectionHeading
                eyebrow="Why Choose Us"
                title="Answers to what matters most"
                as="h2"
                invert
                eyebrowClassName="!text-amber-400 [&::after]:!bg-amber-400"
              />
              <p className="mt-4 text-white/80 text-base sm:text-lg leading-relaxed">
                We combine engineering rigour, certified equipment and dependable service. Here are
                the questions clients ask us most.
              </p>
            </Reveal>
            <Reveal delay={80} className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <Accordion items={whyChooseUs} invert />
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow={qcddBand.eyebrow}
        heading={qcddBand.heading}
        body={qcddBand.body}
        primary={{ label: "Know More →", href: qcddBand.cta.href }}
        tone="surface"
      />

      <CTABand
        heading="Let's build something safe together"
        body="Talk to our QCDD-certified team about your fire protection or MEP requirement."
        primary={{ label: "Get a Free Quote", href: "/request-for-quotation" }}
        secondary={{ label: "Contact Us", href: "/contact-us" }}
        tone="navy"
      />
    </>
  );
}
