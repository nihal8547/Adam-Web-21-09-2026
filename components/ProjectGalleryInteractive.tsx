"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export type Media = any;

const fallbackGalleryImages = [
  {
    src: "https://placehold.co/800x600/0f1e3d/c9a24b.webp?text=Fire+Alarm",
    alt: "Fire alarm panel installation by Adam Technical Services in Qatar",
  },
  {
    src: "https://placehold.co/800x900/16294f/c9a24b.webp?text=Sprinkler+System",
    alt: "Sprinkler system piping installation in a commercial building, Doha",
  },
  {
    src: "https://placehold.co/800x600/0f1e3d/c9a24b.webp?text=HVAC+Unit",
    alt: "HVAC rooftop unit installed by Adam Technical Services in Qatar",
  },
  {
    src: "https://placehold.co/800x700/0f1e3d/c9a24b.webp?text=Pump+Room",
    alt: "Fire fighting pump room with QCDD-certified equipment",
  },
  {
    src: "https://placehold.co/800x600/16294f/c9a24b.webp?text=Leak+Detection",
    alt: "Underground water leak detection service using acoustic sensors in Qatar",
  },
  {
    src: "https://placehold.co/800x900/0f1e3d/c9a24b.webp?text=MEP+Works",
    alt: "MEP mechanical electrical plumbing works on a construction site in Doha",
  },
  {
    src: "https://placehold.co/800x600/0f1e3d/c9a24b.webp?text=ACMV+System",
    alt: "ACMV air conditioning and mechanical ventilation system installed in Qatar",
  },
  {
    src: "https://placehold.co/800x700/16294f/c9a24b.webp?text=Fire+Suppression",
    alt: "Fire suppression system installation for industrial facility in Qatar",
  },
];

export interface GalleryItem {
  image: string | Media;
  altText: string;
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
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const galleryImages = images && images.length > 0
    ? images.map(img => ({
        src: typeof img.image === 'object' && img.image?.url ? img.image.url : fallbackGalleryImages[0].src,
        alt: img.altText || fallbackGalleryImages[0].alt,
      }))
    : fallbackGalleryImages;

  return (
    <section className="bg-white" id="gallery" aria-labelledby="gallery-heading" ref={sectionRef}>
      <Container className="py-16 md:py-20">
        <SectionHeading
          eyebrow={eyebrow || "Project Gallery"}
          title={heading || "Fire Protection & MEP Projects in Qatar"}
          description={description || "A visual showcase of fire alarm systems, sprinklers, HVAC, ACMV and MEP installations completed by Adam Technical Services across Doha and Qatar."}
          align="center"
          as="h2"
        />
        
        <div className="mt-12 relative w-full transition-all duration-700 ease-in-out">
          {!inView ? (
            /* Show only one image initially */
            <div className="relative overflow-hidden rounded-[16px] shadow-[var(--shadow-card)] mx-auto max-w-4xl max-h-[600px] animate-in fade-in zoom-in-95 duration-1000">
              <Image
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                width={800}
                height={600}
                className="w-full h-[500px] object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110"
                unoptimized
                loading="lazy"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-[1.1rem] font-bold leading-snug text-white bg-gradient-to-t from-[var(--color-navy-900)]/90 to-transparent">
                {galleryImages[0].alt}
              </span>
            </div>
          ) : (
            /* Change to existing model (Grid of all images) */
            <div
              role="list"
              className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>div]:mb-4 animate-in fade-in zoom-in-95 duration-1000"
            >
              {galleryImages.map((item, i) => (
                <div
                  key={i}
                  role="listitem"
                  className="group relative overflow-hidden rounded-[16px] shadow-[var(--shadow-card)] ring-1 ring-transparent transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-hover)] hover:ring-2 hover:ring-[var(--color-brand-500)]/60"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={800}
                    height={600}
                    className="w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    unoptimized
                    loading="lazy"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/90 via-[var(--color-navy-900)]/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-4 text-[0.82rem] font-medium leading-snug text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.alt}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
