import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { jobPostingSchema } from "@/lib/jsonld";
import { getRoleBySlug, getRoleSlugs } from "@/lib/cms/careers";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getRoleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = await getRoleBySlug(slug);
  if (!role) return {};
  return buildMetadata({
    title: `${role.title} | Careers`.slice(0, 60),
    description: role.summary.slice(0, 154),
    path: `/careers/${role.slug}`,
  });
}

export default async function RolePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = await getRoleBySlug(slug);
  if (!role) notFound();

  return (
    <>
      <JsonLd
        data={jobPostingSchema({
          title: role.title,
          description: `${role.summary} Responsibilities: ${role.responsibilities.join("; ")}.`,
          datePosted: role.datePosted,
          employmentType: role.type.toUpperCase().replace(/[^A-Z]/g, "_"),
          path: `/careers/${role.slug}`,
        })}
      />
      <Breadcrumbs
        crumbs={[
          { name: "Careers", path: "/careers" },
          { name: role.title, path: `/careers/${role.slug}` },
        ]}
      />

      <section className="bg-[var(--surface-alt)]">
        <Container className="py-14 md:py-16">
          <h1 className="max-w-3xl text-[length:var(--text-4xl)]">{role.title}</h1>
          <div className="mt-4 flex flex-wrap gap-2 text-[0.82rem] text-[var(--body)]">
            <span className="rounded-full bg-[var(--surface-wash)] px-3 py-1 font-semibold text-[var(--accent-strong)]">
              {role.department}
            </span>
            <span className="rounded-full border border-[var(--border)] px-3 py-1">
              {role.type}
            </span>
            <span className="rounded-full border border-[var(--border)] px-3 py-1">
              {role.location}
            </span>
          </div>
          <p className="mt-5 max-w-2xl text-[1.05rem] text-[var(--body)]">{role.summary}</p>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_400px] lg:gap-16">
        <div className="min-w-0 space-y-10">
          <section>
            <h2 className="text-[length:var(--text-2xl)]">Responsibilities</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {role.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[var(--body)]">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--surface-wash)] text-[var(--accent-strong)]">
                    <Icon name="check" size={15} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-[length:var(--text-2xl)]">Requirements</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {role.requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[var(--body)]">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--surface-wash)] text-[var(--accent-strong)]">
                    <Icon name="check" size={15} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
            <h2 className="text-[1.2rem] font-semibold text-[var(--heading)]">
              Apply for this role
            </h2>
            <p className="mt-1.5 text-[0.9rem] text-[var(--body)]">
              Attach your CV and we&apos;ll be in touch.
            </p>
            <div className="mt-5">
              <ContactForm variant="careers" subjectPrefix={role.title} />
            </div>
          </div>
        </aside>
      </Container>
    </>
  );
}
