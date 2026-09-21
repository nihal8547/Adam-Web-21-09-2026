"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/Container";
import Logo from "@/components/Logo";
import PrimaryNav from "@/components/PrimaryNav";
import Icon from "@/components/Icon";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Site header with transparent overlay on the Home page hero,
 * and solid white corporate style on internal pages or when scrolled.
 */
export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "z-50 transition-all duration-300",
        isHome
          ? isTransparent
            ? "fixed inset-x-0 top-0 bg-transparent"
            : "fixed inset-x-0 top-0 bg-white/95 backdrop-blur-md shadow-md border-b border-[var(--border)]"
          : "sticky top-0 bg-[var(--surface)]"
      )}
    >
      {/* Utility bar */}
      <div
        className={cn(
          "transition-colors duration-300",
          isTransparent
            ? "border-b-0 bg-black/35 backdrop-blur-sm text-white"
            : "border-b border-[var(--color-brand-100)] bg-[var(--color-brand-50)] text-[var(--ink-700)]"
        )}
      >
        <Container className="flex h-9 items-center justify-between gap-4 text-[0.8rem]">
          <div className="flex items-center gap-4">
            <a
              href={site.phone.href}
              className={cn(
                "inline-flex items-center gap-1.5 font-semibold transition-colors",
                isTransparent
                  ? "text-white/90 hover:text-[var(--color-brand-300)]"
                  : "text-[var(--subheading)] hover:text-[var(--accent-strong)]"
              )}
            >
              <Icon
                name="phone"
                size={15}
                className={isTransparent ? "text-[var(--color-brand-300)]" : "text-[var(--accent-strong)]"}
              />
              <span>{site.phone.display}</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className={cn(
                "hidden items-center gap-1.5 font-medium transition-colors sm:inline-flex",
                isTransparent
                  ? "text-white/80 hover:text-[var(--color-brand-300)]"
                  : "text-[var(--subheading)] hover:text-[var(--accent-strong)]"
              )}
            >
              <Icon
                name="mail"
                size={15}
                className={isTransparent ? "text-[var(--color-brand-300)]" : "text-[var(--accent-strong)]"}
              />
              <span>{site.email}</span>
            </a>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-wide text-[var(--color-alert-600)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-alert-600)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-alert-600)]" />
            </span>
            <span className={isTransparent ? "text-white/95" : ""}>24/7 Emergency</span>
          </span>
        </Container>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "transition-all duration-300",
          isTransparent
            ? "border-b-0 bg-transparent text-white"
            : "border-b border-[var(--border)] shadow-[var(--shadow-card)]"
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <Logo invert={isTransparent} />
          <div className="flex items-center gap-3">
            <PrimaryNav isTransparent={isTransparent} />
          </div>
        </Container>
      </div>
    </header>
  );
}
