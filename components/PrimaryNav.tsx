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
    "flex items-center justify-center gap-2 rounded-[2rem] h-[40px] md:h-[45px] px-4 text-[15px] font-medium transition-all duration-300 hover:scale-105 active:scale-95",
    isTransparent
      ? "bg-white/10 text-white backdrop-blur-md border border-white/25 hover:bg-white/20"
      : "bg-[var(--color-navy-900)] text-white hover:bg-[var(--color-navy-800)] shadow-sm",
  );

  return (
    <>
      <div className="flex items-center gap-2.5">
        <Link href="/services" className={pill}>
          <span>Services</span>
        </Link>

        <button
          type="button"
          className={cn(pill, "px-3 md:px-4 group")}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="site-drawer"
          onClick={() => setOpen(true)}
        >
          {/* Animated Hamburger Icon */}
          <div className="flex flex-col justify-center items-center gap-[4px] w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110">
            <span className="h-[2px] w-[18px] rounded-full bg-current transition-all duration-300 group-hover:w-[13px]" />
            <span className="h-[2px] w-[18px] rounded-full bg-current transition-all duration-300" />
            <span className="h-[2px] w-[13px] self-start rounded-full bg-current transition-all duration-300 group-hover:w-[18px]" />
          </div>
          <span className="hidden md:block">Menu</span>
        </button>
      </div>

      {/* Overlay Backdrop - transparent click-to-close with no black shade */}
      <div
        className={cn(
          "fixed inset-0 z-[59] bg-transparent transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Right sidebar drawer with smooth slide and scrolling support */}
      <aside
        id="site-drawer"
        aria-label="Site menu"
        aria-hidden={!open}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className={cn(
          "fixed right-0 top-0 z-[60] flex h-screen h-[100dvh] max-h-screen w-[88%] max-w-[420px] flex-col overflow-y-auto drawer-scrollbar bg-[var(--color-navy-900)] text-white border-l border-white/10",
          "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "translate-x-full opacity-90 pointer-events-none",
        )}
      >
        {/* Drawer header */}
        <div
          className={cn(
            "flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
          )}
          style={{ transitionDelay: open ? "100ms" : "0ms" }}
        >
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse" />
            <span className="text-[0.75rem] font-bold uppercase tracking-[0.22em] text-white">
              Menu Navigation
            </span>
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="group flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-white/20 hover:rotate-90 active:scale-90"
          >
            <Icon name="close" size={20} className="transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

        {/* All pages with staggered entrance */}
        <nav className="shrink-0 px-4 py-4">
          <ul className="flex flex-col gap-1">
            {primaryNav.map((item, idx) => {
              const active = isActive(item.href);
              return (
                <li
                  key={item.href}
                  className={cn(
                    "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
                  )}
                  style={{ transitionDelay: open ? `${120 + idx * 40}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group flex items-center justify-between rounded-xl px-4 py-3 text-[1.05rem] font-semibold transition-all duration-200",
                      active
                        ? "bg-white/15 text-white shadow-[inset_3px_0_0_0_#ffffff]"
                        : "text-white/90 hover:bg-white/10 hover:text-white hover:translate-x-1",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                      {item.label}
                    </span>
                    <Icon
                      name="arrow-right"
                      size={16}
                      className={cn(
                        "transition-all duration-200 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 text-white",
                        active && "opacity-100 text-white",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Services with staggered entrance */}
        <div
          className={cn(
            "shrink-0 border-t border-white/10 px-4 py-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: open ? `${140 + primaryNav.length * 40}ms` : "0ms" }}
        >
          <p className="mb-2 px-4 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white/70">
            Services & Solutions
          </p>
          <ul className="flex flex-col gap-0.5">
            {services.map((svc) => (
              <li key={svc.slug}>
                <Link
                  href={`/${svc.slug}`}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 rounded-xl px-4 py-2.5 text-[0.92rem] text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white hover:translate-x-1"
                >
                  <span className="text-white/90 transition-transform duration-200 group-hover:scale-115 group-hover:text-white">
                    <Icon name={svc.icon as never} size={18} />
                  </span>
                  <span>{svc.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick contact + CTA with staggered entrance */}
        <div
          className={cn(
            "shrink-0 mt-auto border-t border-white/10 px-6 py-6 pb-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: open ? `${200 + primaryNav.length * 40}ms` : "0ms" }}
        >
          <div className="space-y-2.5">
            <a
              href={site.phone.href}
              className="group flex items-center gap-3 text-[0.95rem] text-white/90 transition-all duration-200 hover:text-white hover:translate-x-1"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition-transform duration-200 group-hover:scale-110 group-hover:bg-white/20">
                <Icon name="phone" size={16} />
              </span>
              <span>{site.phone.display}</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-3 text-[0.95rem] text-white/90 transition-all duration-200 hover:text-white hover:translate-x-1"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition-transform duration-200 group-hover:scale-110 group-hover:bg-white/20">
                <Icon name="mail" size={16} />
              </span>
              <span>{site.email}</span>
            </a>
          </div>
          <Button
            href="/request-for-quotation"
            size="lg"
            className="mt-5 w-full shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => setOpen(false)}
          >
            Get a Free Quote
          </Button>
        </div>
      </aside>
    </>
  );
}
