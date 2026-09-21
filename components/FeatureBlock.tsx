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
        <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] shadow-[var(--shadow-card)]">
          <Image
            src={image}
            alt={imageAlt}
            width={640}
            height={480}
            className="h-full w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </Reveal>
      <Reveal className={cn(reverse && "lg:order-1")} delay={80}>
        <span className="eyebrow gold-rule">{eyebrow}</span>
        <h2 className="mt-4 text-[length:var(--text-3xl)]">{heading}</h2>
        <div className="mt-4 space-y-4 prose-measure text-[var(--body)]">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {bullets ? (
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-center gap-2.5 text-[0.95rem] text-[var(--subheading)]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface-wash)] text-[var(--accent-strong)]">
                  <Icon name="check" size={15} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        ) : null}
        {cta ? (
          <div className="mt-8">
            <Button href={cta.href} variant="secondary">
              {cta.label}
            </Button>
          </div>
        ) : null}
      </Reveal>
    </div>
  );
}
