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
      {/* Hero Section - Minimal Professional */}
      <section className="bg-white pt-24 pb-16 md:pt-32 md:pb-24 border-b border-slate-100">
        <Container>
          <div className="mb-6">
            <Breadcrumbs crumbs={[{ name: "Services", path: "/services" }]} />
          </div>
          <div className="max-w-4xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-500)]" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Our Expertise
                </span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Complete Fire Protection & MEP Solutions
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
                From life-safety fire systems to advanced HVAC and electrical infrastructures, we engineer solutions that ensure total compliance, safety, and operational excellence across Qatar.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Services Showcase - Minimal Grid */}
      <section className="bg-slate-50 py-16 md:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, i) => (
              <Reveal as="div" key={svc.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/${svc.slug}`}
                  className="group flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
                >
                  <div>
                    {/* Top: Icon */}
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[var(--color-navy-900)] transition-colors duration-300 group-hover:bg-[var(--color-brand-50)] group-hover:border-[var(--color-brand-100)] group-hover:text-[var(--color-brand-600)]">
                      <Icon name={svc.icon as IconName} size={28} />
                    </div>

                    {/* Text Content */}
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[var(--color-brand-600)] transition-colors">
                      {svc.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {svc.excerpt}
                    </p>
                  </div>

                  {/* Bottom: Link Arrow */}
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[var(--color-navy-900)] transition-colors group-hover:text-[var(--color-brand-600)]">
                    <span>Explore Service</span>
                    <Icon name="arrow-right" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* How We Work Section - Clean White */}
      <section className="bg-white py-16 md:py-24 border-t border-slate-100">
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
      />
    </>
  );
}
