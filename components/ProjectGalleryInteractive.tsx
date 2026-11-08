"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

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
  image: string | Media;
  altText: string;
  title?: string;
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
    ? images.map(img => {
        const src = typeof img.image === 'object' && img.image?.url 
          ? img.image.url 
          : (typeof img.image === 'string' && img.image ? img.image : fallbackGalleryImages[0].src);
        return {
          src,
          title: img.title || img.altText || fallbackGalleryImages[0].title,
          alt: img.altText || fallbackGalleryImages[0].alt,
        };
      })
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
                title={galleryImages[0].title}
                width={800}
                height={600}
                className="w-full h-[500px] object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110"
                unoptimized
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[var(--color-navy-900)]/95 via-[var(--color-navy-900)]/60 to-transparent">
                <p className="text-[1.15rem] font-bold leading-snug text-white">
                  {galleryImages[0].title}
                </p>
                <p className="mt-1 text-[0.82rem] font-medium text-amber-400 line-clamp-1">
                  {galleryImages[0].alt}
                </p>
              </div>
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
                    title={item.title}
                    width={800}
                    height={600}
                    className="w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    unoptimized
                    loading="lazy"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/95 via-[var(--color-navy-900)]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[0.95rem] font-bold leading-snug text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[0.78rem] font-medium text-amber-400 line-clamp-2">
                      {item.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
