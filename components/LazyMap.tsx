"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { site } from "@/content/site";

/**
 * Lazy-loaded Google Maps embed. Renders a lightweight placeholder and only
 * injects the iframe when it scrolls into view (or on click), keeping it off
 * the critical path for performance. No API key required for the basic embed.
 */
export default function LazyMap() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [load, setLoad] = useState(false);
  const query = encodeURIComponent(site.address.mapQuery);
  const src = `https://www.google.com/maps?q=${query}&output=embed`;

  useEffect(() => {
    const el = ref.current;
    if (!el || load || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setLoad(true)),
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [load]);

  return (
    <div
      ref={ref}
      className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-wash)]"
    >
      {load ? (
        <iframe
          title={`Map to ${site.legalName}`}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoad(true)}
          className="flex h-full w-full flex-col items-center justify-center gap-2 text-[var(--accent-strong)]"
          aria-label="Load map"
        >
          <Icon name="map-pin" size={32} />
          <span className="text-[0.9rem] font-semibold">View on map</span>
        </button>
      )}
    </div>
  );
}
