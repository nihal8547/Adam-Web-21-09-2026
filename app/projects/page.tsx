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
      <Breadcrumbs crumbs={[{ name: "Projects", path: "/projects" }]} />

      <section className="bg-[var(--surface-alt)]">
        <Container className="py-14 md:py-16">
          <span className="eyebrow gold-rule">Our Work</span>
          <h1 className="mt-4 max-w-3xl text-[length:var(--text-4xl)]">
            Projects Delivered Across Qatar
          </h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] text-[var(--body)]">
            A selection of fire protection, HVAC, ACMV and leak-detection work across residential,
            commercial, industrial and high-rise sectors. Filter by sector or service to explore.
          </p>
        </Container>
      </section>

      <section className="bg-[var(--surface)]">
        <Container className="py-16">
          <ProjectsGrid projects={projects} />
        </Container>
      </section>

      <CTABand
        heading="Have a project in mind?"
        body="Tell us about your building and requirements — we'll scope the right solution."
        primary={{ label: "Get a Free Quote", href: "/request-for-quotation" }}
        secondary={{ label: "Contact Us", href: "/contact-us" }}
      />
    </>
  );
}
