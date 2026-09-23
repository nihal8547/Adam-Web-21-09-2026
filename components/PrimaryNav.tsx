"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, site } from "@/content/site";
import { services } from "@/content/services";
import Icon from "@/components/Icon";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

/**
 * Floating pill navigation (QatarFactory style). The menu pill opens a premium
 * navy right-side drawer — on every screen size — listing all pages, the
 * services and quick contact.
 */
export default function PrimaryNav({ isTransparent = false }: { isTransparent?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll + close on Escape while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Pills adapt to the transparent-over-hero vs solid state.
  const pill = cn(
    "flex items-center justify-center gap-2 rounded-[2rem] h-[40px] md:h-[45px] px-4 text-[15px] font-medium transition-all hover:scale-105",
    isTransparent
      ? "bg-white/10 text-white backdrop-blur-md border border-white/25 hover:bg-white/20"
      : "bg-[var(--color-navy-900)] text-white hover:bg-[var(--color-navy-800)]",
  );

  return (
    <>
      <div className="flex items-center gap-2.5">
        <Link href="/services" className={pill}>
          <span>Services</span>
        </Link>

        <button
          type="button"
          className={cn(pill, "px-3 md:px-4")}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="site-drawer"
          onClick={() => setOpen(true)}
        >
          <Icon name="menu" size={22} />
          <span className="hidden md:block">Menu</span>
        </button>
      </div>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[59] bg-[rgba(9,16,32,0.55)] backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Right sidebar drawer */}
      <aside
        id="site-drawer"
        aria-label="Site menu"
        aria-hidden={!open}
        className={cn(
          "fixed right-0 top-0 z-[60] flex h-full w-[88%] max-w-[400px] flex-col overflow-y-auto bg-[var(--color-navy-900)] text-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-300)]">
            Menu
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* All pages */}
        <nav className="px-4 py-4">
          <ul className="flex flex-col">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-[1.05rem] font-semibold transition-colors",
                    isActive(item.href)
                      ? "bg-white/10 text-[var(--color-brand-300)]"
                      : "text-white hover:bg-white/5",
                  )}
                >
                  {item.label}
                  <Icon name="arrow-right" size={16} className="opacity-50" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <div className="border-t border-white/10 px-4 py-4">
          <p className="mb-1 px-4 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/50">
            Services
          </p>
          <ul className="flex flex-col">
            {services.map((svc) => (
              <li key={svc.slug}>
                <Link
                  href={`/${svc.slug}`}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[0.95rem] text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <span className="text-[var(--color-brand-300)]">
                    <Icon name={svc.icon as never} size={18} />
                  </span>
                  {svc.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick contact + CTA */}
        <div className="mt-auto border-t border-white/10 px-6 py-5">
          <a
            href={site.phone.href}
            className="flex items-center gap-3 text-[0.95rem] text-white/85 hover:text-white"
          >
            <Icon name="phone" size={18} className="text-[var(--color-brand-300)]" />
            {site.phone.display}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 flex items-center gap-3 text-[0.95rem] text-white/85 hover:text-white"
          >
            <Icon name="mail" size={18} className="text-[var(--color-brand-300)]" />
            {site.email}
          </a>
          <Button href="/request-for-quotation" size="lg" className="mt-5 w-full">
            Get a Free Quote
          </Button>
        </div>
      </aside>
    </>
  );
}
