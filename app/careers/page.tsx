import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { buildMetadata } from "@/lib/seo";
import { culture, roles } from "@/content/careers";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Careers | Join Adam Technical Services Qatar",
  description:
    "Build a safer Qatar with Adam Technical Services. Explore engineering, HVAC and fire-safety careers in Doha and apply online with your CV.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <Breadcrumbs crumbs={[{ name: "Careers", path: "/careers" }]} />

      <section className="bg-[var(--surface-alt)]">
        <Container className="py-14 md:py-16">
          <span className="eyebrow gold-rule">{culture.eyebrow}</span>
          <h1 className="mt-4 max-w-3xl text-[length:var(--text-4xl)]">{culture.heading}</h1>
          <div className="mt-5 max-w-2xl space-y-4 text-[1.05rem] text-[var(--body)]">
            {culture.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-[var(--surface)]">
        <Container className="py-16">
          <ul className="grid gap-6 md:grid-cols-3">
            {culture.values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 90}>
                <div className="flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-card)]">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--surface-wash)] text-[var(--accent-strong)]">
                    <Icon name={["shield", "grid", "support"][i] as never} size={24} />
                  </span>
                  <h2 className="mt-4 text-[1.2rem] font-semibold text-[var(--heading)]">
                    {v.title}
                  </h2>
                  <p className="mt-2 text-[var(--body)]">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Open roles */}
      <section className="bg-[var(--surface-alt)]" id="open-roles">
        <Container className="py-16 md:py-20">
          <SectionHeading eyebrow="Open Roles" title="Current openings" as="h2" />
          <ul className="mt-10 flex flex-col gap-4">
            {roles.map((role) => (
              <li key={role.slug}>
                <Link
                  href={`/careers/${role.slug}`}
                  className="group flex flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--border)] border-l-[3px] border-l-[var(--color-brand-500)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-[1.2rem] font-semibold text-[var(--heading)]">
                      {role.title}
                    </h3>
                    <p className="mt-1 text-[0.9rem] text-[var(--body)]">{role.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-[0.78rem] text-[var(--body)]">
                      <span className="rounded-full bg-[var(--surface-wash)] px-2.5 py-0.5 font-semibold text-[var(--accent-strong)]">
                        {role.department}
                      </span>
                      <span className="rounded-full border border-[var(--border)] px-2.5 py-0.5">
                        {role.type}
                      </span>
                      <span className="rounded-full border border-[var(--border)] px-2.5 py-0.5">
                        {role.location}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-[var(--accent-strong)]">
                    View role
                    <Icon
                      name="arrow-right"
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Speculative application */}
      <section className="bg-[var(--surface)]">
        <Container className="py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow="Apply" title="Don't see the right role?" as="h2" />
              <p className="mt-4 max-w-md text-[var(--body)]">
                We&apos;re always keen to meet talented engineers and technicians. Send us your CV
                and we&apos;ll be in touch when a suitable role opens.
              </p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] sm:p-8">
              <ContactForm variant="careers" subjectPrefix="Speculative application" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
