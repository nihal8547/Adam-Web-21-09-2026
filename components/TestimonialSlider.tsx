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
          "relative overflow-hidden rounded-[20px] bg-[var(--color-navy-900)] p-8 text-white shadow-[0_24px_60px_-24px_rgba(15,30,61,0.55)] sm:p-12 transition-opacity duration-[400ms]",
          visible ? "opacity-100" : "opacity-0",
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Oversized gold quote mark watermark */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 -top-6 font-serif text-[9rem] leading-none text-[var(--color-brand-500)]/15 select-none"
        >
          &rdquo;
        </span>
        <span className="text-[var(--color-brand-300)]">
          <Icon name="quote" size={40} />
        </span>
        <div className="mt-4 flex gap-1 text-[var(--color-brand-300)]" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon key={i} name="star" size={18} />
          ))}
        </div>
        <blockquote className="mt-5">
          <p className="text-[length:var(--text-xl)] font-medium leading-relaxed text-white">
            &ldquo;{active.quote}&rdquo;
          </p>
        </blockquote>
        <figcaption className="mt-7 flex items-center gap-4">
          <span
            aria-hidden
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-500)] text-[1.1rem] font-bold text-[var(--color-navy-900)]"
          >
            {active.author.charAt(0)}
          </span>
          <span>
            <span className="block text-[1.05rem] font-semibold text-white">{active.author}</span>
            <span className="text-[0.9rem] text-white/65">
              {active.role} · {active.title}
            </span>
          </span>
        </figcaption>

        {/* Gold progress bar — no dots, no buttons */}
        {count > 1 && (
          <div className="mt-7 h-0.5 w-full overflow-hidden rounded-full bg-white/15" aria-hidden>
            <div
              className="h-full bg-[var(--color-brand-500)] transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </figure>
    </div>
  );
}
