import Link from "next/link";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/jsonld";

/**
 * Visible breadcrumb trail + BreadcrumbList JSON-LD. Home is prepended
 * automatically. Pass the trailing crumbs (current page last).
 */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const full: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <>
      <JsonLd data={breadcrumbSchema(full)} />
      <nav
        aria-label="Breadcrumb"
        className="border-b border-[var(--border)] bg-[var(--surface-alt)]"
      >
        <Container>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 py-3 text-[0.85rem] text-[var(--body)]">
            {full.map((crumb, i) => {
              const isLast = i === full.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-2">
                  {isLast ? (
                    <span aria-current="page" className="font-semibold text-[var(--heading)]">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.path}
                      className="transition-colors hover:text-[var(--accent-strong)]"
                    >
                      {crumb.name}
                    </Link>
                  )}
                  {!isLast ? (
                    <span aria-hidden className="text-[var(--border)]">
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
