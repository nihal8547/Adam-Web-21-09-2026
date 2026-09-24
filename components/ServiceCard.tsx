import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { cn } from "@/lib/cn";

/**
 * Service card with the signature motif: a gold left-border that animates to a
 * full-card gold tint on hover, plus a subtle lift shadow.
 */
export default function ServiceCard({
  name,
  excerpt,
  href,
  icon,
  className,
}: {
  name: string;
  excerpt: string;
  href: string;
  icon: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] border-l-[3px] border-l-[var(--color-brand-500)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-l-[var(--color-brand-500)] hover:bg-[var(--surface-wash)] hover:shadow-[var(--shadow-hover)]",
        className,
      )}
    >
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--surface-wash)] text-[var(--accent-strong)] transition-colors group-hover:bg-[var(--color-brand-500)] group-hover:text-white">
        <Icon name={icon as IconName} size={26} />
      </span>
      <h3 className="text-[1.15rem] font-semibold text-[var(--heading)] transition-colors duration-200 group-hover:text-[var(--color-brand-500)]">{name}</h3>
      <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-[var(--body)]">{excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-[var(--accent-strong)]">
        <span className="link-underline">Learn More</span>
        <Icon
          name="arrow-right"
          size={17}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
