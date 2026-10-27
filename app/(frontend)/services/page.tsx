import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import ProcessTimeline from "@/components/ProcessTimeline";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { servicesItemListSchema } from "@/lib/jsonld";
import ServiceTile from "@/components/ServiceTile";
import { getAllServices } from "@/lib/cms/services";
import { servicesProcess } from "@/content/company";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Services | Fire Protection, HVAC & MEP in Qatar",
  description:
    "Explore Adam Technical Services in Qatar: fire protection, alarms, pumps, sprinklers, fire stop, leak detection, HVAC, ACMV and electrical — QCDD certified.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getAllServices();
  return (
    <>
      {/* Hero Section - Architectural Deep Navy + Ambient Glow */}
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
            <Breadcrumbs crumbs={[{ name: "Services", path: "/services" }]} invert />
          </div>
          <div className="max-w-4xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Our Engineering Capabilities
                </span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.15]">
                Complete Fire Protection &amp; MEP Solutions
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed">
                From life-safety fire systems to advanced HVAC and electrical infrastructures, we engineer solutions that ensure total compliance, safety, and operational excellence across Qatar.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Services Showcase — Home Page Model Card Style */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-200/80">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, i) => (
              <Reveal as="li" key={svc.slug} delay={(i % 3) * 80}>
                <ServiceTile
                  name={svc.name}
                  excerpt={svc.excerpt}
                  href={`/${svc.slug}`}
                  icon={svc.icon}
                  image={svc.image}
                  className="h-full min-h-[280px]"
                />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* How We Work Section */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Process Overview"
            title="Our Signature Methodology"
            align="center"
            as="h2"
          />
          <div className="mt-16 mx-auto max-w-5xl">
            <ProcessTimeline steps={servicesProcess} />
          </div>
        </Container>
      </section>

      <CTABand
        heading="Not sure which service you need?"
        body="Tell us about your project and our engineers will recommend the right solution."
        primary={{ label: "Get a Free Quote", href: "/request-for-quotation" }}
        secondary={{ label: "Contact Us", href: "/contact-us" }}
        tone="navy"
      />
    </>
  );
}
