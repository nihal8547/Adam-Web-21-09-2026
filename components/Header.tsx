"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/Container";
import Logo from "@/components/Logo";
import PrimaryNav from "@/components/PrimaryNav";

import { cn } from "@/lib/cn";

/**
 * Site header with transparent overlay on the hero across pages,
 * and solid frosted corporate style when scrolled.
 */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isTransparent = !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2.5"
          : "pt-4 md:pt-6 bg-gradient-to-b from-black/40 to-transparent",
      )}
    >
      <Container className="flex h-[40px] md:h-[45px] lg:h-[50px] items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo invert={isTransparent} />
        </div>
        
        {/* Navigation Pills */}
        <div className="flex items-center gap-3">
          <PrimaryNav isTransparent={isTransparent} />
        </div>
      </Container>
    </header>
  );
}
