"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count-up statistic. Animates from 0 to `value` when scrolled into view.
 * Respects prefers-reduced-motion (shows the final value immediately).
 */
export default function StatCounter({
  value,
  text,
  prefix = "",
  suffix = "",
  label,
  durationMs = 1600,
}: {
  value?: number;
  text?: string;
  prefix?: string;
  suffix?: string;
  label: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (value === undefined) return;
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (prefersReduced) {
        setDisplay(value);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / durationMs, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(eased * value));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return (
    <div ref={ref} className="text-center px-2">
      <div className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-[2.35rem] xl:text-[2.6rem] font-semibold leading-none text-[var(--color-brand-700)]">
        {text ? text : `${prefix}${display.toLocaleString("en-US")}${suffix}`}
      </div>
      <div className="mt-2 text-[0.8rem] sm:text-[0.875rem] font-semibold text-[var(--subheading)] leading-snug">
        {label}
      </div>
    </div>
  );
}
