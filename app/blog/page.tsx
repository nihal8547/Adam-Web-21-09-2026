import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogList from "@/components/BlogList";
import CTABand from "@/components/CTABand";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Blog | Fire Safety & MEP Insights in Qatar",
  description:
    "Practical guides on fire safety, HVAC, ACMV, leak detection and QCDD compliance in Qatar from the Adam Technical Services team.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs crumbs={[{ name: "Blog", path: "/blog" }]} />

      <section className="bg-[var(--surface-alt)]">
        <Container className="py-14 md:py-16">
          <span className="eyebrow gold-rule">Insights</span>
          <h1 className="mt-4 max-w-3xl text-[length:var(--text-4xl)]">
            Fire Safety & MEP Insights
          </h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] text-[var(--body)]">
            Guides and advice on fire protection, HVAC, ACMV, leak detection and QCDD compliance —
            written by our engineers for building owners and facilities teams in Qatar.
          </p>
        </Container>
      </section>

      <section className="bg-[var(--surface)]">
        <Container className="py-16">
          <BlogList />
        </Container>
      </section>

      <CTABand
        heading="Questions about your building's fire safety?"
        primary={{ label: "Contact Us", href: "/contact-us" }}
        secondary={{ label: "Get a Free Quote", href: "/request-for-quotation" }}
      />
    </>
  );
}
