import Link from "next/link";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import ProcessTimeline from "@/components/ProcessTimeline";
import Accordion from "@/components/Accordion";
import ContactForm from "@/components/ContactForm";
import CTABand from "@/components/CTABand";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/Button";
import { getService, type Service } from "@/content/services";
import { projects } from "@/content/projects";
import { serviceSchema, faqSchema } from "@/lib/jsonld";

/**
 * Reusable 9× service-detail template. Emits Service + FAQPage JSON-LD
 * (BreadcrumbList comes from <Breadcrumbs>). Sticky quote form on desktop,
 * 3 sibling-service links for silo internal linking.
 */
export default function ServiceDetailTemplate({ service }: { service: Service }) {
  const siblings = service.related
    .map((slug) => getService(slug))
    .filter((s): s is Service => Boolean(s));

  const relatedProjects = projects.filter((p) => p.servicesUsed.includes(service.slug)).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.name,
            description: service.metaDescription,
            path: `/${service.slug}`,
            serviceType: service.name,
          }),
          faqSchema(service.faqs),
        ]}
      />

      <Breadcrumbs
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.name, path: `/${service.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-[var(--surface-alt)]">
        <Container className="py-14 md:py-16">
          <span className="eyebrow gold-rule">{service.eyebrow}</span>
          <h1 className="mt-4 max-w-3xl text-[length:var(--text-4xl)]">{service.h1}</h1>
          <div className="mt-5 max-w-3xl space-y-4 text-[1.05rem] text-[var(--body)]">
            {service.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/request-for-quotation" size="lg">
              Get a Free Quote
            </Button>
            <Button href="/contact-us" variant="secondary" size="lg">
              Talk to an Engineer
            </Button>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_360px] lg:gap-16">
        {/* Main column */}
        <div className="min-w-0">
          {/* What's included */}
          <section aria-labelledby="included-heading">
            <SectionHeading eyebrow="What's Included" title={`Our ${service.name} scope`} as="h2" />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.included.map((item) => (
                <li
                  key={item.title}
                  className="flex gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--surface-wash)] text-[var(--accent-strong)]">
                    <Icon name="check" size={18} />
                  </span>
                  <span>
                    <span className="block font-semibold text-[var(--heading)]">{item.title}</span>
                    <span className="block text-[0.9rem] leading-relaxed text-[var(--body)]">
                      {item.desc}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Compliance panel */}
          <section aria-labelledby="compliance-heading" className="mt-14">
            <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--color-ink-900)] p-8 text-[var(--on-invert)]">
              <span className="eyebrow text-[var(--on-invert-accent)]">Compliance</span>
              <h2 id="compliance-heading" className="mt-2 text-[length:var(--text-2xl)] text-white">
                Approvals & Standards
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {service.compliance.standards.map((std) => (
                  <li
                    key={std}
                    className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[0.85rem] font-medium text-white/90"
                  >
                    {std}
                  </li>
                ))}
              </ul>
              {service.compliance.brands?.map((group) => (
                <div key={group.label} className="mt-5">
                  <p className="text-[0.8rem] font-semibold uppercase tracking-wide text-[var(--on-invert-accent)]">
                    {group.label}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2.5">
                    {group.items.map((brand) => (
                      <li
                        key={brand}
                        className="rounded-[var(--radius-sm)] bg-white/10 px-3 py-1.5 text-[0.85rem] font-semibold text-white"
                      >
                        {brand}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Depth sections */}
          {service.sections.map((sec) => (
            <section key={sec.heading} className="mt-14">
              <h2 className="text-[length:var(--text-2xl)]">{sec.heading}</h2>
              <div className="mt-4 space-y-4 prose-measure text-[var(--body)]">
                {sec.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          {/* Process */}
          <section aria-labelledby="process-heading" className="mt-14">
            <SectionHeading eyebrow="How We Work" title="Our process" as="h2" />
            <div className="mt-8">
              <ProcessTimeline steps={service.process} />
            </div>
          </section>

          {/* Sectors */}
          <section aria-labelledby="sectors-heading" className="mt-14">
            <SectionHeading eyebrow="Sectors Served" title="Where we deliver" as="h2" />
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {service.sectors.map((sector) => (
                <li
                  key={sector}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-[0.9rem] font-medium text-[var(--subheading)]"
                >
                  {sector}
                </li>
              ))}
            </ul>
          </section>

          {/* Related projects */}
          {relatedProjects.length > 0 ? (
            <section aria-labelledby="related-projects-heading" className="mt-14">
              <SectionHeading eyebrow="Our Work" title="Related projects" as="h2" />
              <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                {relatedProjects.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="group flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]"
                    >
                      <span className="text-[0.78rem] font-semibold uppercase tracking-wide text-[var(--accent-strong)]">
                        {p.sector}
                      </span>
                      <span className="mt-1 font-semibold text-[var(--heading)]">{p.title}</span>
                      <span className="mt-2 text-[0.9rem] text-[var(--body)]">{p.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* FAQ */}
          <section aria-labelledby="faq-heading" className="mt-14">
            <SectionHeading eyebrow="FAQ" title="Frequently asked questions" as="h2" />
            <div className="mt-6">
              <Accordion items={service.faqs} />
            </div>
          </section>

          {/* Sibling services (silo internal links) */}
          <section aria-labelledby="siblings-heading" className="mt-14">
            <h2 id="siblings-heading" className="text-[length:var(--text-xl)]">
              Related services
            </h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-3">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="group flex items-center justify-between gap-2 rounded-[var(--radius-sm)] border border-[var(--border)] border-l-[3px] border-l-[var(--color-brand-500)] bg-[var(--surface)] px-4 py-3 text-[0.95rem] font-semibold text-[var(--heading)] transition-colors hover:bg-[var(--surface-wash)]"
                  >
                    {s.name}
                    <Icon
                      name="arrow-right"
                      size={16}
                      className="text-[var(--accent-strong)] transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sticky sidebar quote form (desktop) */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
            <h2 className="text-[1.2rem] font-semibold text-[var(--heading)]">Request a quote</h2>
            <p className="mt-1.5 text-[0.9rem] text-[var(--body)]">
              Tell us about your {service.name.toLowerCase()} requirement and we&apos;ll get back to
              you.
            </p>
            <div className="mt-5">
              <ContactForm variant="sidebar" subjectPrefix={service.name} />
            </div>
          </Reveal>
        </aside>
      </Container>

      <CTABand
        eyebrow="Ready to start?"
        heading={`Get expert ${service.name.toLowerCase()} in Qatar`}
        body="QCDD-certified design, installation and maintenance — with 24/7 support."
        primary={{ label: "Get a Free Quote", href: "/request-for-quotation" }}
        secondary={{ label: "Call Now", href: "tel:+97441400922" }}
      />
    </>
  );
}
