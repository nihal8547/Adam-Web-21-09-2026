"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/content/site";
import { services } from "@/content/services";
import Icon from "@/components/Icon";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

/**
 * Mobile drawer nav (QatarFactory pill style for desktop).
 */
export default function PrimaryNav({ isTransparent = false }: { isTransparent?: boolean }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Close menus on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mega-menu on outside click / Escape.
  // (Removed since megaOpen state is gone)

  // Lock scroll while mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* QatarFactory-style Pill Navigation */}
      <div className="flex items-center gap-3">
        {/* Search Pill */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-[2rem] bg-[#323232] px-4 py-2 text-white h-[40px] md:h-[45px] transition-transform hover:scale-105"
        >
          <Icon name="search" size={20} />
          <span className="hidden md:block text-[15px] font-medium">Search</span>
        </button>

        {/* Services Pill */}
        <Link
          href="/services"
          className="flex items-center justify-center rounded-[2rem] bg-[#323232] px-4 py-2 text-white h-[40px] md:h-[45px] transition-transform hover:scale-105"
        >
          <span className="text-[15px] font-medium">Services</span>
        </Link>

        {/* Menu Toggle Pill */}
        <button
          type="button"
          className="flex items-center justify-center rounded-[2rem] bg-[#323232] px-3 md:px-4 py-2 text-white h-[40px] md:h-[45px] transition-transform hover:scale-105"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <Icon name={mobileOpen ? "close" : "menu"} size={22} />
        </button>
      </div>

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
