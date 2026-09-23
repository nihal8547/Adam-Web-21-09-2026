"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { type BlogPost } from "@/content/blog";
import { cn } from "@/lib/cn";

/** Blog card grid with a category filter (client). Posts passed from server. */
export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState<string>("All");
  const blogCategories = useMemo(() => Array.from(new Set(posts.map((p) => p.category))), [posts]);
  const filtered = category === "All" ? posts : posts.filter((p) => p.category === category);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {["All", ...blogCategories].map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={category === cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-[0.85rem] font-medium transition-colors",
              category === cat
                ? "border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white"
                : "border-[var(--border)] text-[var(--subheading)] hover:border-[var(--accent)]",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-[0.72rem] font-semibold uppercase tracking-wide text-[var(--accent-strong)]">
                  {post.category}
                </span>
                <h3 className="mt-2 text-[1.1rem] font-semibold leading-snug text-[var(--heading)]">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-[0.9rem] text-[var(--body)]">{post.excerpt}</p>
                <span className="mt-4 text-[0.8rem] text-[var(--body)]">
                  {new Date(post.datePublished).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  · {post.readingMinutes} min read
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
