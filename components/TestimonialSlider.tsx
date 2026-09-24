"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Icon from "@/components/Icon";
import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/cn";

/**
 * Continuous Auto-Swiping Multi-Card Testimonial Model.
 * Multiple cards on the same line continuously glide automatically in a seamless loop.
 * Pauses on hover, supports touch/mouse drag, and includes manual Next/Prev controls.
 */
export default function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  // Duplicate items for a seamless infinite scroll loop
  const duplicatedItems = [...items, ...items];

  // Continuous auto-swiping loop via requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 40; // Pixels per second

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const el = scrollRef.current;
      if (el && !isPaused && !isDraggingRef.current) {
        el.scrollLeft += speed * delta;

        // Halfway point (where duplicated list starts)
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Manual Nudge Controls (Prev / Next)
  const nudge = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 380; // card width + gap
    const halfWidth = el.scrollWidth / 2;

    if (direction === "left") {
      if (el.scrollLeft <= 10) {
        el.scrollLeft += halfWidth;
      }
      el.scrollBy({ left: -cardWidth, behavior: "smooth" });
    } else {
      if (el.scrollLeft >= halfWidth - 10) {
        el.scrollLeft -= halfWidth;
      }
      el.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  }, []);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftStartRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    el.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        isDraggingRef.current = false;
      }}
    >
      {/* Prev / Next controls */}
      <div className="mb-4 flex items-center justify-end px-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => nudge("left")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition-all duration-200 hover:bg-slate-50 hover:text-black hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Swipe previous"
          >
            <Icon name="arrow-left" size={15} />
          </button>
          <button
            type="button"
            onClick={() => nudge("right")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition-all duration-200 hover:bg-slate-50 hover:text-black hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Swipe next"
          >
            <Icon name="arrow-right" size={15} />
          </button>
        </div>
      </div>

      {/* Infinite Auto-Swiping Carousel Track */}
      <div className="relative overflow-hidden py-2">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className={cn(
            "flex gap-5 overflow-x-auto select-none",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            "cursor-grab active:cursor-grabbing",
          )}
        >
          {duplicatedItems.map((item, idx) => (
            <div
              key={`${item.author}-${idx}`}
              className="w-[330px] sm:w-[360px] shrink-0"
            >
              <div className="relative flex h-[340px] flex-col justify-between rounded-[20px] border border-white/10 bg-[var(--color-navy-900)] p-7 text-white shadow-lg transition-all duration-300 hover:border-white/30 hover:-translate-y-1.5 hover:shadow-2xl">
                {/* Background quote mark watermark */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-2 font-serif text-[6.5rem] leading-none text-white/5 select-none"
                >
                  &rdquo;
                </span>

                {/* Top: Category Tag & 5 Gold Stars */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-wider text-[var(--color-brand-100)] border border-white/10">
                      {item.title}
                    </span>
                    <div className="flex gap-0.5 text-amber-400">
                      {Array.from({ length: item.rating ?? 5 }).map((_, s) => (
                        <Icon key={s} name="star" size={13} />
                      ))}
                    </div>
                  </div>

                  {/* Quote Body */}
                  <blockquote className="mt-5">
                    <p className="line-clamp-4 text-[0.95rem] font-normal leading-relaxed text-white/90">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </blockquote>
                </div>

                {/* Bottom: Author Credentials */}
                <div className="mt-4 border-t border-white/10 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 border border-white/20 overflow-hidden">
                      {item.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.avatar} alt={item.author} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-[0.92rem] font-bold text-white">{item.author.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-[0.92rem] font-semibold text-white leading-tight">
                        {item.author}
                      </h4>
                      <p className="mt-0.5 text-[0.78rem] text-white/65">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Verified Qatar Badge */}
                  <span className="flex items-center gap-1 text-[0.72rem] font-medium text-emerald-400">
                    <Icon name="check" size={12} />
                    <span>Verified</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
