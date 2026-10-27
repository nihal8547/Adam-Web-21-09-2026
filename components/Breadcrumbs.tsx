import Link from "next/link";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/jsonld";

import { cn } from "@/lib/cn";

/**
 * Visible breadcrumb trail + BreadcrumbList JSON-LD. Home is prepended
 * automatically. Pass the trailing crumbs (current page last).
 */
export default function Breadcrumbs({
  crumbs,
  invert = false,
  className,
}: {
  crumbs: Crumb[];
  invert?: boolean;
  className?: string;
}) {
  const full: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <>
      <JsonLd data={breadcrumbSchema(full)} />
      <nav
        aria-label="Breadcrumb"
        className={cn(
          "border-b transition-colors",
          invert
            ? "border-white/10 bg-white/[0.03] text-white/70"
            : "border-[var(--border)] bg-[var(--surface-alt)]",
          className,
        )}
      >
        <Container>
          <ol className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 py-3 text-[0.85rem]", invert ? "text-white/60" : "text-[var(--body)]")}>
            {full.map((crumb, i) => {
              const isLast = i === full.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-2">
                  {isLast ? (
                    <span aria-current="page" className={cn("font-semibold", invert ? "text-white" : "text-[var(--heading)]")}>
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.path}
                      className={cn("transition-colors", invert ? "hover:text-amber-400" : "hover:text-[var(--accent-strong)]")}
                    >
                      {crumb.name}
                    </Link>
                  )}
                  {!isLast ? (
                    <span aria-hidden className={cn(invert ? "text-white/30" : "text-[var(--border)]")}>
                      /
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </Container>
      </nav>
    </>
  );
}
