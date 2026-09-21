import { cn } from "@/lib/cn";

/**
 * Standard section heading: gold eyebrow + 3px gold rule motif, then the H2.
 * `as` lets a page use an h1 for the main heading where appropriate.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  invert = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  invert?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto text-center" : "text-left",
        align === "center" && "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "eyebrow gold-rule",
            align === "center" && "inline-flex flex-col items-center",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <Tag
        className={cn("mt-4 text-[length:var(--text-3xl)]", invert && "text-[var(--on-invert)]")}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-4 text-[length:var(--text-base)] leading-relaxed",
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
