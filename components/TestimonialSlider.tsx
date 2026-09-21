"use client";

import { useEffect, useState, useRef } from "react";
import Icon from "@/components/Icon";
import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/cn";

const INTERVAL = 6000;

/**
 * Auto-advancing testimonial carousel — no dots, no prev/next buttons.
 * Fades between slides every 6s, pauses on hover, respects prefers-reduced-motion.
 * A thin gold progress bar beneath each card shows time remaining.
 */
export default function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const count = items.length;
  const startRef = useRef<number>(Date.now());
  const rafRef = useRef<number | null>(null);

  // Animate gold progress bar via requestAnimationFrame
  const animateProgress = () => {
    const elapsed = Date.now() - startRef.current;
    const pct = Math.min((elapsed / INTERVAL) * 100, 100);
    setProgress(pct);
    if (pct < 100) {
      rafRef.current = requestAnimationFrame(animateProgress);
    }
  };

  useEffect(() => {
    if (count <= 1 || paused) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    startRef.current = Date.now();
    setProgress(0);
    rafRef.current = requestAnimationFrame(animateProgress);

    const id = setInterval(() => {
      // Fade out → swap → fade in
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % count);
        startRef.current = Date.now();
        setProgress(0);
        setVisible(true);
      }, 400);
    }, INTERVAL);

    return () => {
      clearInterval(id);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, paused, index]);

  const active = items[index];
  if (!active) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client testimonials — auto-advancing"
    >
      <figure
        className={cn(
          "rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)] sm:p-10 transition-opacity duration-[400ms]",
          visible ? "opacity-100" : "opacity-0",
        )}
        aria-live="polite"
        aria-atomic="true"
      >
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
            &ldquo;{active.quote}&rdquo;
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

        {/* Gold progress bar — no dots, no buttons */}
        {count > 1 && (
          <div
            className="mt-6 h-0.5 w-full overflow-hidden rounded-full bg-[var(--border)]"
            aria-hidden
          >
            <div
              className="h-full bg-[var(--color-brand-500)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </figure>
    </div>
  );
}
