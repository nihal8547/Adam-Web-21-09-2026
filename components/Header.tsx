"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/Container";
import Logo from "@/components/Logo";
import PrimaryNav from "@/components/PrimaryNav";

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
    <header className="fixed inset-x-0 top-0 z-50 pt-4 transition-all duration-300">
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
