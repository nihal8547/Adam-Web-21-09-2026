"use client";

import { useId, useState } from "react";
import Icon from "@/components/Icon";
import { cn } from "@/lib/cn";

export type AccordionItem = { q: string; a: string };

/**
 * Accessible accordion (used for FAQ + "Why Choose Us"). One panel open at a
 * time by default; ARIA-wired button/region pairs. The same items should also
 * be emitted as FAQPage JSON-LD by the page (see faqSchema).
 */
export default function Accordion({
  items,
  className,
  headingLevel = "h3",
  invert = false,
}: {
  items: AccordionItem[];
  className?: string;
  headingLevel?: "h2" | "h3" | "h4";
  invert?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const Heading = headingLevel;

  return (
    <div
      className={cn(
        "divide-y border-y",
        invert
          ? "divide-white/15 border-white/20 text-white"
          : "divide-[var(--border)] border-[var(--border)]",
        className,
      )}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.q}>
            <Heading className="m-0">
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer group"
              >
                <span
                  className={cn(
                    "text-[1.05rem] font-semibold transition-colors",
                    invert ? "text-white group-hover:text-amber-400" : "text-[var(--heading)] group-hover:text-[var(--color-brand-600)]",
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    invert
                      ? isOpen
                        ? "rotate-180 border-amber-400 bg-amber-400/20 text-amber-300"
                        : "border-white/20 bg-white/5 text-white/70 group-hover:border-white/40 group-hover:text-white"
                      : isOpen
                        ? "rotate-180 border-[var(--accent)] bg-[var(--surface-wash)] text-[var(--accent-strong)]"
                        : "border-[var(--border)] text-[var(--accent-strong)]",
                  )}
                >
                  <Icon name="chevron-down" size={18} />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pb-5 pr-12"
            >
              <p
                className={cn(
                  "prose-measure text-[0.98rem] leading-relaxed",
                  invert ? "text-white/80" : "text-[var(--body)]",
                )}
              >
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
