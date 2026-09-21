"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/content/site";
import { services } from "@/content/services";
import Icon from "@/components/Icon";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

/**
 * Desktop navigation with an accessible Services mega-menu, plus the mobile
 * drawer. Client component (interactive menu + focus management) — the only
 * interactive nav per the brief.
 */
export default function PrimaryNav() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaRef = useRef<HTMLLIElement | null>(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Close menus on route change.
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Close mega-menu on outside click / Escape.
  useEffect(() => {
    if (!megaOpen) return;
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [megaOpen]);

  // Lock scroll while mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop nav */}
      <nav aria-label="Primary" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {primaryNav.map((item) => {
            if ("hasMegaMenu" in item && item.hasMegaMenu) {
              return (
                <li key={item.href} ref={megaRef} className="relative">
                  <button
                    type="button"
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onClick={() => setMegaOpen((v) => !v)}
                    className={cn(
                      "flex items-center gap-1 rounded-[var(--radius-sm)] px-3 py-2 text-[0.95rem] font-medium transition-colors",
                      isActive(item.href)
                        ? "text-[var(--accent-strong)]"
                        : "text-[var(--subheading)] hover:text-[var(--accent-strong)]",
                    )}
                  >
                    {item.label}
                    <Icon
                      name="chevron-down"
                      size={16}
                      className={cn("transition-transform", megaOpen && "rotate-180")}
                    />
                  </button>
                  {megaOpen ? (
                    <div className="absolute left-1/2 top-[calc(100%+0.5rem)] z-50 w-[640px] -translate-x-1/2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-hover)]">
                      <div className="grid grid-cols-2 gap-1">
                        {services.map((svc) => (
                          <Link
                            key={svc.slug}
                            href={`/${svc.slug}`}
                            className="group flex items-start gap-3 rounded-[var(--radius-sm)] p-3 transition-colors hover:bg-[var(--surface-wash)]"
                          >
                            <span className="mt-0.5 text-[var(--accent-strong)]">
                              <Icon name={svc.icon as never} size={22} />
                            </span>
                            <span>
                              <span className="block text-[0.92rem] font-semibold text-[var(--heading)]">
                                {svc.name}
                              </span>
                              <span className="block text-[0.8rem] leading-snug text-[var(--body)]">
                                {svc.excerpt.slice(0, 62)}…
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 border-t border-[var(--border)] pt-3">
                        <Link
                          href="/services"
                          className="inline-flex items-center gap-1 text-[0.9rem] font-semibold text-[var(--accent-strong)] hover:underline"
                        >
                          View all services <Icon name="arrow-right" size={16} />
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            }
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-[var(--radius-sm)] px-3 py-2 text-[0.95rem] font-medium transition-colors",
                    isActive(item.href)
                      ? "text-[var(--accent-strong)]"
                      : "text-[var(--subheading)] hover:text-[var(--accent-strong)]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Desktop CTA */}
      <div className="hidden lg:block">
        <Button href="/request-for-quotation" size="md">
          Get a Free Quote
        </Button>
      </div>

      {/* Mobile toggle */}
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-[var(--radius-sm)] p-2 text-[var(--heading)] lg:hidden"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
      >
        <Icon name={mobileOpen ? "close" : "menu"} size={26} />
      </button>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-[rgba(18,18,18,0.5)]"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-[var(--surface)] p-6 shadow-[var(--shadow-hover)]">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="rounded-[var(--radius-sm)] p-2 text-[var(--heading)]"
              >
                <Icon name="close" size={26} />
              </button>
            </div>
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-[var(--radius-sm)] px-3 py-3 text-[1.05rem] font-medium",
                      isActive(item.href)
                        ? "bg-[var(--surface-wash)] text-[var(--accent-strong)]"
                        : "text-[var(--heading)]",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-[var(--border)] pt-4">
              <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-wider text-[var(--body)]">
                Services
              </p>
              <ul className="flex flex-col gap-0.5">
                {services.map((svc) => (
                  <li key={svc.slug}>
                    <Link
                      href={`/${svc.slug}`}
                      className="flex items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2.5 text-[0.95rem] text-[var(--subheading)]"
                    >
                      <span className="text-[var(--accent-strong)]">
                        <Icon name={svc.icon as never} size={18} />
                      </span>
                      {svc.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <Button href="/request-for-quotation" size="lg" className="w-full">
                Get a Free Quote
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
