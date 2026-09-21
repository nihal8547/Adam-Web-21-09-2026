import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Wordmark logo (inline SVG mark + text). No image request, crisp at any size.
 * `invert` switches text to light for dark footer/hero surfaces.
 */
export default function Logo({
  invert = false,
  className,
}: {
  invert?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Adam Technical Services — home"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden className="shrink-0">
        <rect width="40" height="40" rx="8" fill="var(--color-ink-900)" />
        <path d="M12 28L20 10l8 18h-4l-4-9-4 9h-4z" fill="var(--color-brand-500)" />
        <rect x="17" y="23" width="6" height="2.4" rx="1.2" fill="var(--color-brand-500)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-[var(--font-display)] text-[1.05rem] font-bold tracking-tight",
            invert ? "text-[var(--on-invert)]" : "text-[var(--heading)]",
          )}
        >
          Adam
        </span>
        <span
          className={cn(
            "text-[0.62rem] font-semibold uppercase tracking-[0.16em]",
            invert ? "text-[var(--on-invert-accent)]" : "text-[var(--accent-strong)]",
          )}
        >
          Technical Services
        </span>
      </span>
    </Link>
  );
}
