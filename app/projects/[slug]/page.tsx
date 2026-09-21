import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABand from "@/components/CTABand";
import Icon from "@/components/Icon";
import { Button } from "@/components/Button";
import { buildMetadata } from "@/lib/seo";
import { getProject, projects, projectSlugs } from "@/content/projects";
import { getService } from "@/content/services";

export const revalidate = 3600;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.title} | Projects`.slice(0, 60),
    description: project.summary.slice(0, 154),
    path: `/projects/${project.slug}`,
    ogImage: undefined,
  });
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const used = project.servicesUsed
    .map((s) => getService(s))
    .filter((s): s is NonNullable<ReturnType<typeof getService>> => Boolean(s));

  const more = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      />

      <article>
        <section className="bg-[var(--surface-alt)]">
          <Container className="py-14 md:py-16">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[var(--surface-wash)] px-3 py-1 text-[0.78rem] font-semibold uppercase tracking-wide text-[var(--accent-strong)]">
                {project.sector}
              </span>
              <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[0.78rem] font-medium text-[var(--body)]">
                {project.service}
              </span>
            </div>
            <h1 className="mt-4 max-w-3xl text-[length:var(--text-4xl)]">{project.title}</h1>
            <p className="mt-3 flex items-center gap-2 text-[var(--body)]">
              <Icon name="map-pin" size={17} className="text-[var(--accent-strong)]" />
              {project.location}
            </p>
          </Container>
        </section>

        <Container className="py-14">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] shadow-[var(--shadow-card)]">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
            <div className="min-w-0 space-y-10">
              {[
                { h: "The Challenge", b: project.challenge },
                { h: "Our Solution", b: project.solution },
                { h: "The Outcome", b: project.outcome },
              ].map((block) => (
                <section key={block.h}>
                  <h2 className="text-[length:var(--text-2xl)]">{block.h}</h2>
                  <p className="mt-3 prose-measure text-[1.02rem] leading-relaxed text-[var(--body)]">
                    {block.b}
                  </p>
                </section>
              ))}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
                <h2 className="text-[1.1rem] font-semibold text-[var(--heading)]">Services used</h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {used.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/${s.slug}`}
                        className="flex items-center gap-2.5 rounded-[var(--radius-sm)] border border-[var(--border)] border-l-[3px] border-l-[var(--color-brand-500)] px-3 py-2.5 text-[0.9rem] font-semibold text-[var(--heading)] transition-colors hover:bg-[var(--surface-wash)]"
                      >
                        <Icon
                          name={s.icon as never}
                          size={18}
                          className="text-[var(--accent-strong)]"
                        />
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <Button href="/request-for-quotation" className="w-full">
                    Start a similar project
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>

        {/* More projects */}
        <section className="bg-[var(--surface-alt)]">
          <Container className="py-16">
            <h2 className="text-[length:var(--text-2xl)]">More projects</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-3">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]"
                  >
                    <span className="text-[0.75rem] font-semibold uppercase tracking-wide text-[var(--accent-strong)]">
                      {p.sector}
                    </span>
                    <span className="mt-1 font-semibold text-[var(--heading)]">{p.title}</span>
                    <span className="mt-2 text-[0.9rem] text-[var(--body)]">{p.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </article>

      <CTABand
        heading="Let's deliver your project"
        primary={{ label: "Get a Free Quote", href: "/request-for-quotation" }}
        secondary={{ label: "Contact Us", href: "/contact-us" }}
      />
    </>
  );
}
