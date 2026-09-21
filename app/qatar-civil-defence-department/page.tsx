import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import ProcessTimeline from "@/components/ProcessTimeline";
import Accordion from "@/components/Accordion";
import ContactForm from "@/components/ContactForm";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, serviceSchema } from "@/lib/jsonld";
import { qcddPage } from "@/content/company";

export const metadata: Metadata = buildMetadata({
  title: "QCDD License Renewal in Qatar | Adam",
  description:
    "QCDD license renewal in Qatar made simple. We manage Civil Defence fire safety certificate renewal end to end — inspection, remediation, documentation & submission.",
  path: "/qatar-civil-defence-department",
  keywords: ["QCDD license renewal Qatar"],
});

export default function QcddPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "QCDD License Renewal",
            description:
              "End-to-end Qatar Civil Defence Department fire safety certificate renewal.",
            path: "/qatar-civil-defence-department",
            serviceType: "QCDD License Renewal",
          }),
          faqSchema(qcddPage.faqs),
        ]}
      />
      <Breadcrumbs
        crumbs={[{ name: "QCDD License Renewal", path: "/qatar-civil-defence-department" }]}
      />

      <section className="bg-[var(--surface-alt)]">
        <Container className="py-14 md:py-16">
          <span className="eyebrow gold-rule">QCDD License Renewal</span>
          <h1 className="mt-4 max-w-3xl text-[length:var(--text-4xl)]">
            Qatar Civil Defence License Renewal in Qatar
          </h1>
          <div className="mt-5 max-w-3xl space-y-4 text-[1.05rem] text-[var(--body)]">
            {qcddPage.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_360px] lg:gap-16">
        <div className="min-w-0">
          {/* Documents checklist */}
          <section aria-labelledby="checklist-heading">
            <SectionHeading eyebrow="What You Need" title="Documents checklist" as="h2" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {qcddPage.checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--surface-wash)] text-[var(--accent-strong)]">
                    <Icon name="check" size={16} />
                  </span>
                  <span className="text-[0.95rem] text-[var(--subheading)]">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Timeline */}
          <section aria-labelledby="timeline-heading" className="mt-14">
            <SectionHeading eyebrow="The Process" title="How renewal works" as="h2" />
            <div className="mt-8">
              <ProcessTimeline steps={qcddPage.timeline} />
            </div>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq-heading" className="mt-14">
            <SectionHeading eyebrow="FAQ" title="QCDD renewal questions" as="h2" />
            <div className="mt-6">
              <Accordion items={qcddPage.faqs} />
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
            <h2 className="text-[1.2rem] font-semibold text-[var(--heading)]">
              Start your renewal
            </h2>
            <p className="mt-1.5 text-[0.9rem] text-[var(--body)]">
              Send us your details and we&apos;ll handle the QCDD renewal for you.
            </p>
            <div className="mt-5">
              <ContactForm variant="sidebar" subjectPrefix="QCDD License Renewal" />
            </div>
          </Reveal>
        </aside>
      </Container>

      <CTABand
        heading="Keep your building compliant"
        body="Let our QCDD-certified team manage your Civil Defence renewal end to end."
        primary={{ label: "Get a Free Quote", href: "/request-for-quotation" }}
        secondary={{ label: "Call Now", href: "tel:+97441400922" }}
      />
    </>
  );
}
