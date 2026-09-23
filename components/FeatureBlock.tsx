import Image from "next/image";
import Icon from "@/components/Icon";
import { Button } from "@/components/Button";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";

/**
 * Alternating image/text feature block. `reverse` flips the media to the right.
 */
export default function FeatureBlock({
  eyebrow,
  heading,
  body,
  bullets,
  cta,
  image,
  imageAlt,
  reverse = false,
}: {
  eyebrow: string;
  heading: string;
  body: string[];
  bullets?: string[];
  cta?: { label: string; href: string };
  image: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={cn(reverse && "lg:order-2")}>
        <div className="group relative">
          {/* Decorative offset background */}
          <div className="absolute -inset-4 z-0 rounded-[28px] bg-[var(--color-brand-50)] opacity-60 transition-transform duration-500 group-hover:scale-[1.03] sm:-inset-6" />
          <div className="relative z-10 overflow-hidden rounded-[20px] shadow-[0_12px_40px_rgb(0,0,0,0.08)] ring-1 ring-[var(--border)] transition-transform duration-500 group-hover:-translate-y-2">
            <Image
              src={image}
              alt={imageAlt}
              width={640}
              height={480}
              className="h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-[1.08]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
          </div>
        </div>
      </Reveal>
      <Reveal className={cn(reverse && "lg:order-1")} delay={80}>
        <span className="eyebrow gold-rule">{eyebrow}</span>
        <h2 className="mt-4 text-[length:var(--text-3xl)]">{heading}</h2>
        <div className="mt-5 space-y-4 prose-measure text-[1.05rem] leading-relaxed text-[var(--body)]">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {bullets ? (
          <ul className="mt-8 grid grid-cols-1 gap-y-4 gap-x-3 sm:grid-cols-2">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-[0.95rem] font-medium text-[var(--subheading)]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-[var(--color-brand-500)] text-white shadow-sm transition-transform hover:scale-110">
                  <Icon name="check" size={16} />
                </span>
                <span className="mt-0.5 leading-snug">{b}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {cta ? (
          <div className="mt-10">
            <Button href={cta.href} variant="primary" size="lg" className="shadow-md">
              {cta.label}
            </Button>
          </div>
        ) : null}
      </Reveal>
    </div>
  );
}
