import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";

export type LegalSection = { heading: string; paragraphs: string[] };

/** Shared layout for privacy / terms pages. */
export default function LegalLayout({
  title,
  path,
  updated,
  intro,
  sections,
}: {
  title: string;
  path: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Breadcrumbs crumbs={[{ name: title, path }]} />
      <Container className="py-16">
        <div className="prose-measure">
          <h1 className="text-[length:var(--text-4xl)]">{title}</h1>
          <p className="mt-2 text-[0.9rem] text-[var(--body)]">Last updated: {updated}</p>
          <p className="mt-6 text-[1.02rem] leading-relaxed text-[var(--body)]">{intro}</p>
          {sections.map((sec) => (
            <section key={sec.heading} className="mt-9">
              <h2 className="text-[length:var(--text-xl)]">{sec.heading}</h2>
              <div className="mt-3 space-y-3 text-[1rem] leading-relaxed text-[var(--body)]">
                {sec.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
