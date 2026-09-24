"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Standard section heading: gold eyebrow + 3px gold rule motif, then the H2/H1.
 * Features automatic staggered scroll-in entrance animations across the whole site.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  invert = false,
  className,
  eyebrowClassName,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  invert?: boolean;
  className?: string;
  eyebrowClassName?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        align === "center" ? "mx-auto text-center" : "text-left",
        align === "center" && "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "eyebrow gold-rule text-fade-up",
            visible && "is-visible",
            align === "center" && "inline-flex flex-col items-center",
            invert && "!text-white [&::after]:!bg-white",
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <Tag
        className={cn(
          "mt-4 text-[length:var(--text-3xl)] text-fade-up text-delay-1",
          visible && "is-visible",
          invert && "text-[var(--on-invert)]",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-4 text-[length:var(--text-base)] leading-relaxed text-fade-up text-delay-2",
            visible && "is-visible",
            align === "center" ? "mx-auto" : "prose-measure",
            invert ? "text-[var(--on-invert)]/80" : "text-[var(--body)]",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
