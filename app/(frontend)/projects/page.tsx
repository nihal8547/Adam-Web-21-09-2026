import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProjectsGrid from "@/components/ProjectsGrid";
import CTABand from "@/components/CTABand";
import { buildMetadata } from "@/lib/seo";
import { getAllProjects } from "@/lib/cms/projects";

// ISR — regenerate the portfolio periodically; reads from the CMS.
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Projects | Fire Protection & MEP in Qatar",
  description:
    "Explore Adam Technical Services projects across Qatar — fire protection, HVAC, ACMV and leak detection case studies by sector and service.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getAllProjects();
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
            <Breadcrumbs crumbs={[{ name: "Projects", path: "/projects" }]} invert />
          </div>
          <span className="eyebrow gold-rule !text-amber-400 [&::after]:!bg-amber-400">Our Work</span>
          <h1 className="mt-4 max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-tight">
            Projects Delivered Across Qatar
          </h1>
          <p className="mt-6 max-w-3xl text-base sm:text-lg text-white/80 leading-relaxed">
            A selection of fire protection, HVAC, ACMV and leak-detection work across residential,
            commercial, industrial and high-rise sectors. Filter by sector or service to explore.
          </p>
        </Container>
      </section>

      <section className="bg-slate-50 py-16">
        <Container>
          <ProjectsGrid projects={projects} />
        </Container>
      </section>

      <CTABand
        heading="Have a project in mind?"
        body="Tell us about your building and requirements — we'll scope the right solution."
        primary={{ label: "Get a Free Quote", href: "/request-for-quotation" }}
        secondary={{ label: "Contact Us", href: "/contact-us" }}
        tone="navy"
      />
    </>
  );
}
