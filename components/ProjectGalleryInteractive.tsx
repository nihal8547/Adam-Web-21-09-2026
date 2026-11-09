"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { normalizeMediaUrl } from "@/lib/cms/client";

export interface Media {
  url?: string | null;
  [key: string]: unknown;
}

const fallbackGalleryImages = [
  {
    src: "https://placehold.co/800x600/0f1e3d/c9a24b.webp?text=Fire+Alarm",
    title: "Addressable Fire Alarm Control Panel Installation",
    alt: "QCDD approved addressable fire alarm control panel installation in commercial facility Doha Qatar",
  },
  {
    src: "https://placehold.co/800x900/16294f/c9a24b.webp?text=Sprinkler+System",
    title: "Automatic Fire Sprinkler System Piping Network",
    alt: "NFPA 13 automatic fire sprinkler system piping network installation in commercial building Doha Qatar",
  },
  {
    src: "https://placehold.co/800x600/0f1e3d/c9a24b.webp?text=HVAC+Unit",
    title: "Commercial Rooftop HVAC & FAHU Package Unit",
    alt: "Commercial rooftop HVAC and FAHU air conditioning package unit installed in Doha Qatar",
  },
  {
    src: "https://placehold.co/800x700/0f1e3d/c9a24b.webp?text=Pump+Room",
    title: "UL/FM Certified Fire Fighting Pump Station",
    alt: "QCDD certified diesel and electric fire fighting pump station with jockey pump in Doha Qatar",
  },
  {
    src: "https://placehold.co/800x600/16294f/c9a24b.webp?text=Leak+Detection",
    title: "Electro-Acoustic Underground Water Leak Detection",
    alt: "Electro-acoustic underground water pipe leak detection inspection for commercial infrastructure Qatar",
  },
  {
    src: "https://placehold.co/800x900/0f1e3d/c9a24b.webp?text=MEP+Works",
    title: "Turnkey Commercial MEP Electrical & Plumbing Works",
    alt: "Turnkey mechanical electrical and plumbing MEP infrastructure installation on construction site Doha Qatar",
  },
  {
    src: "https://placehold.co/800x600/0f1e3d/c9a24b.webp?text=ACMV+System",
    title: "ACMV Mechanical Ventilation & Smoke Extract System",
    alt: "ACMV air conditioning and mechanical ventilation smoke extract ductwork installation in Qatar",
  },
  {
    src: "https://placehold.co/800x700/16294f/c9a24b.webp?text=Fire+Suppression",
    title: "Clean Agent FM-200 Gas Fire Suppression System",
    alt: "Clean agent gas fire suppression system cylinder installation for industrial data server room Qatar",
  },
];

export interface GalleryItem {
  id?: string;
  image?: string | Media | null;
  src?: string;
  altText?: string;
  title?: string;
}

interface ResolvedImage {
  src: string;
  title: string;
  alt: string;
}

export default function ProjectGalleryInteractive({
  images,
  eyebrow,
  heading,
  description,
}: {
  images?: GalleryItem[] | null;
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
}) {
  const [selectedImage, setSelectedImage] = useState<ResolvedImage | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const galleryImages: ResolvedImage[] =
    images && images.length > 0
      ? images
          .map((img, idx) => {
            let src = img.src || "";
            if (!src) {
              if (typeof img.image === "object" && img.image !== null) {
                src = (img.image as { url?: string })?.url || "";
              } else if (typeof img.image === "string") {
                src = img.image;
              }
            }
            if (src) {
              src = normalizeMediaUrl(src);
            } else {
              src = fallbackGalleryImages[idx % fallbackGalleryImages.length].src;
            }

            const title =
              img.title?.trim() ||
              img.altText?.trim() ||
              fallbackGalleryImages[idx % fallbackGalleryImages.length].title;
            const alt =
              img.altText?.trim() ||
              img.title?.trim() ||
              fallbackGalleryImages[idx % fallbackGalleryImages.length].alt;

            return { src, title, alt };
          })
          .filter((item) => Boolean(item.src))
      : fallbackGalleryImages;

  return (
    <section className="bg-white" id="gallery" aria-labelledby="gallery-heading">
      <Container className="py-16 md:py-20">
        <SectionHeading
          eyebrow={eyebrow || "Project Gallery"}
          title={heading || "Fire Protection & MEP Engineering Projects in Qatar"}
          description={
            description ||
            "Visual showcase of QCDD approved fire alarm systems, fire pumps, sprinklers, HVAC, ACMV, and MEP installations completed across Doha and Qatar."
          }
          align="center"
          as="h2"
        />

        {/* Gallery Grid */}
        <div className="mt-12 relative w-full">
          <div
            role="list"
            className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>div]:mb-5"
          >
            {galleryImages.map((item, i) => (
              <div
                key={i}
                role="listitem"
                tabIndex={0}
                onClick={() => setSelectedImage(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedImage(item);
                  }
                }}
                className="group relative overflow-hidden rounded-[16px] shadow-[var(--shadow-card)] border border-slate-200/80 bg-slate-900 cursor-pointer break-inside-avoid transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] hover:border-[var(--color-brand-500)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-800">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    title={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    unoptimized
                    loading="lazy"
                  />
                  {/* Subtle permanent dark gradient at bottom for text legibility */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent transition-opacity duration-300 group-hover:from-slate-950/95"
                  />
                </div>

                {/* Caption / Title & Alt */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-sm font-bold leading-snug text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-300 line-clamp-1">
                    {item.alt}
                  </p>
                </div>

                {/* View Icon Pill */}
                <div
                  aria-hidden
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fullscreen Lightbox Modal */}
        {selectedImage && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedImage.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Large Image Preview */}
              <div className="relative w-full max-h-[75vh] h-[550px] bg-black">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  unoptimized
                  priority
                />
              </div>

              {/* Modal Details Footer */}
              <div className="w-full p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {selectedImage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-400 mt-0.5">
                    {selectedImage.alt}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="self-end sm:self-auto px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
