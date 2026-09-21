import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABand from "@/components/CTABand";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/jsonld";
import { getBlogPost, blogPosts, blogSlugs } from "@/content/blog";

export const revalidate = 3600;

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    type: "article",
    keywords: [post.category],
    article: {
      publishedTime: post.datePublished,
      modifiedTime: post.datePublished,
      authors: [post.author],
      section: post.category,
      tags: [post.category],
    },
  });
}

/** Slugify a heading for TOC anchors. */
function anchor(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const dateStr = new Date(post.datePublished).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.metaDescription,
          path: `/blog/${post.slug}`,
          datePublished: post.datePublished,
          author: post.author,
          image: post.image,
        })}
      />
      <Breadcrumbs
        crumbs={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <article>
        <section className="bg-[var(--surface-alt)]">
          <Container className="py-14 md:py-16">
            <span className="text-[0.78rem] font-semibold uppercase tracking-wide text-[var(--accent-strong)]">
              {post.category}
            </span>
            <h1 className="mt-3 max-w-3xl text-[length:var(--text-4xl)]">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.9rem] text-[var(--body)]">
              <span className="flex items-center gap-1.5">
                <Icon name="team" size={16} className="text-[var(--accent-strong)]" /> {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="clock" size={16} className="text-[var(--accent-strong)]" />
                {post.readingMinutes} min read
              </span>
              <time dateTime={post.datePublished}>{dateStr}</time>
            </div>
          </Container>
        </section>

        <Container className="py-14">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] shadow-[var(--shadow-card)]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
            {/* TOC */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <nav aria-label="Table of contents">
                <p className="text-[0.78rem] font-semibold uppercase tracking-wide text-[var(--body)]">
                  On this page
                </p>
                <ul className="mt-3 flex flex-col gap-2 border-l border-[var(--border)]">
                  {post.body.map((sec) => (
                    <li key={sec.heading}>
                      <a
                        href={`#${anchor(sec.heading)}`}
                        className="-ml-px block border-l-2 border-transparent pl-4 text-[0.9rem] text-[var(--body)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-strong)]"
                      >
                        {sec.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Body */}
            <div className="min-w-0">
              {post.body.map((sec) => (
                <section key={sec.heading} className="mb-10 scroll-mt-28" id={anchor(sec.heading)}>
                  <h2 className="text-[length:var(--text-2xl)]">{sec.heading}</h2>
                  <div className="mt-3 space-y-4 prose-measure text-[1.02rem] leading-relaxed text-[var(--body)]">
                    {sec.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>

        {related.length > 0 ? (
          <section className="bg-[var(--surface-alt)]">
            <Container className="py-16">
              <h2 className="text-[length:var(--text-2xl)]">Related reading</h2>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]"
                    >
                      <span className="text-[0.75rem] font-semibold uppercase tracking-wide text-[var(--accent-strong)]">
                        {p.category}
                      </span>
                      <span className="mt-1 text-[1.1rem] font-semibold text-[var(--heading)]">
                        {p.title}
                      </span>
                      <span className="mt-2 text-[0.9rem] text-[var(--body)]">{p.excerpt}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}
      </article>

      <CTABand
        heading="Need expert fire protection or MEP in Qatar?"
        primary={{ label: "Get a Free Quote", href: "/request-for-quotation" }}
        secondary={{ label: "Contact Us", href: "/contact-us" }}
      />
    </>
  );
}
