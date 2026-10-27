import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { buildMetadata } from "@/lib/seo";
import { culture } from "@/content/careers";
import { getAllRoles } from "@/lib/cms/careers";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Careers | Join Adam Technical Services Qatar",
  description:
    "Build a safer Qatar with Adam Technical Services. Explore engineering, HVAC and fire-safety careers in Doha and apply online with your CV.",
  path: "/careers",
});

export default async function CareersPage() {
  const roles = await getAllRoles();
  return (
    <>
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
            <Breadcrumbs crumbs={[{ name: "Careers", path: "/careers" }]} invert />
          </div>
          <span className="eyebrow gold-rule !text-amber-400 [&::after]:!bg-amber-400">{culture.eyebrow}</span>
          <h1 className="mt-4 max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-tight">
            {culture.heading}
          </h1>
          <div className="mt-6 max-w-3xl space-y-4 text-base sm:text-lg text-white/80 leading-relaxed">
            {culture.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-16 md:py-20 border-b border-slate-200/80">
        <Container>
          <ul className="grid gap-6 md:grid-cols-3">
            {culture.values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 90}>
                <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-xl">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-navy-900)] text-amber-400 shadow-md transition-transform duration-300 group-hover:scale-105">
                    <Icon name={["shield", "grid", "support"][i] as never} size={24} />
                  </span>
                  <h2 className="mt-5 text-xl font-bold text-slate-900">
                    {v.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Open roles */}
      <section className="bg-white py-16 md:py-20" id="open-roles">
        <Container>
          <SectionHeading eyebrow="Open Roles" title="Current openings" as="h2" />
          <ul className="mt-10 flex flex-col gap-5">
            {roles.map((role) => (
              <li key={role.slug}>
                <Link
                  href={`/careers/${role.slug}`}
                  className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-xl sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[var(--color-brand-600)] transition-colors">
                      {role.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{role.summary}</p>
                    <div className="mt-3.5 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-[var(--color-navy-900)] px-3 py-1 font-bold uppercase tracking-wider text-amber-400">
                        {role.department}
                      </span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700 font-medium">
                        {role.type}
                      </span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700 font-medium">
                        {role.location}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[var(--color-navy-900)] group-hover:text-amber-500 transition-colors">
                    <span>View role</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-navy-900)] text-amber-400 transition-transform group-hover:scale-105 group-hover:translate-x-1">
                      <Icon name="arrow-right" size={15} />
                    </span>
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
