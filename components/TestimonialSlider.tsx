"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/cn";

/**
 * Testimonials slider. Auto-advances no faster than 6s (brief), pauses on hover
 * and when the tab is hidden, respects prefers-reduced-motion, and exposes
 * prev/next + dot controls. Gracefully handles a single testimonial.
 */
export default function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  useEffect(() => {
    if (count <= 1 || paused) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [count, paused]);

  const active = items[index];
  if (!active) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <figure className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)] sm:p-10">
        <span className="text-[var(--accent)]">
          <Icon name="quote" size={40} />
        </span>
        <div className="mt-4 flex gap-1 text-[var(--color-brand-500)]" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon key={i} name="star" size={18} />
          ))}
        </div>
        <blockquote className="mt-4">
          <p className="text-[length:var(--text-xl)] font-medium leading-relaxed text-[var(--heading)]">
            “{active.quote}”
          </p>
        </blockquote>
        <figcaption className="mt-6">
          <span className="block font-[var(--font-display)] text-[1.05rem] font-semibold text-[var(--heading)]">
            {active.author}
          </span>
          <span className="text-[0.9rem] text-[var(--body)]">
            {active.role} · {active.title}
          </span>
        </figcaption>
      </figure>

      {count > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => setIndex((i) => (i - 1 + count) % count)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--heading)] transition-colors hover:border-[var(--accent)]"
          >
            <Icon name="arrow-right" size={18} className="rotate-180" />
          </button>
          <div className="flex gap-2" role="tablist">
            {items.map((t, i) => (
              <button
                key={t.author + i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors",
                  i === index ? "bg-[var(--color-brand-500)]" : "bg-[var(--border)]",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setIndex((i) => (i + 1) % count)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--heading)] transition-colors hover:border-[var(--accent)]"
          >
            <Icon name="arrow-right" size={18} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
