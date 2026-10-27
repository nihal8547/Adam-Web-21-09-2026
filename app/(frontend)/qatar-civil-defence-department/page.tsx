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
import { getQcddPage } from "@/lib/cms/pages";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "QCDD License Renewal in Qatar | Adam",
  description:
    "QCDD license renewal in Qatar made simple. We manage Civil Defence fire safety certificate renewal end to end — inspection, remediation, documentation & submission.",
  path: "/qatar-civil-defence-department",
  keywords: ["QCDD license renewal Qatar"],
});

export default async function QcddPage() {
  const qcddPage = await getQcddPage();
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
            <Breadcrumbs
              crumbs={[{ name: "QCDD License Renewal", path: "/qatar-civil-defence-department" }]}
              invert
            />
          </div>
          <span className="eyebrow gold-rule !text-amber-400 [&::after]:!bg-amber-400">QCDD License Renewal</span>
          <h1 className="mt-4 max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-tight">
            Qatar Civil Defence License Renewal in Qatar
          </h1>
          <div className="mt-6 max-w-3xl space-y-4 text-base sm:text-lg text-white/80 leading-relaxed">
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
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {qcddPage.checklist.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-amber-400/60"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--color-navy-900)] text-amber-400 shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Icon name="check" size={16} />
                  </span>
                  <span className="text-[0.95rem] font-medium text-slate-800 leading-snug">{item}</span>
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
          <Reveal className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 border-t-4 border-t-[var(--color-navy-900)]">
            <h2 className="text-[1.3rem] font-bold text-slate-900">
              Start your renewal
            </h2>
            <p className="mt-1.5 text-[0.9rem] text-slate-600">
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
        tone="navy"
      />
    </>
  );
}
