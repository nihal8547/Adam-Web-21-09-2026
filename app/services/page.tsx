import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import ProcessTimeline from "@/components/ProcessTimeline";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { servicesItemListSchema } from "@/lib/jsonld";
import { services } from "@/content/services";
import { servicesProcess } from "@/content/company";

export const metadata: Metadata = buildMetadata({
  title: "Services | Fire Protection, HVAC & MEP in Qatar",
  description:
    "Explore Adam Technical Services in Qatar: fire protection, alarms, pumps, sprinklers, fire stop, leak detection, HVAC, ACMV and electrical — QCDD certified.",
  path: "/services",
  keywords: ["MEP company in Qatar", "fire protection company in Qatar"],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesItemListSchema()} />
      <Breadcrumbs crumbs={[{ name: "Services", path: "/services" }]} />

      <section className="bg-[var(--surface-alt)]">
        <Container className="py-14 md:py-16">
          <span className="eyebrow gold-rule">Our Services</span>
          <h1 className="mt-4 max-w-3xl text-[length:var(--text-4xl)]">
            Complete Fire Protection & MEP Services in Qatar
          </h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] text-[var(--body)]">
            From life-safety fire systems to HVAC, ACMV and electrical, we design, install and
            maintain the systems that keep your building safe, comfortable and compliant — all
            engineered to QCDD and NFPA standards by one accountable partner.
          </p>
        </Container>
      </section>

      <section className="bg-[var(--surface)]">
        <Container className="py-16">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, i) => (
              <Reveal as="li" key={svc.slug} delay={(i % 3) * 80}>
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

      <section className="bg-[var(--surface-alt)]">
        <Container className="py-16 md:py-20">
          <SectionHeading
            eyebrow="How We Work"
            title="A clear, four-step process"
            align="center"
            as="h2"
          />
          <div className="mt-12">
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
