import Link from "next/link";
import Image from "next/image";
import Icon, { type IconName } from "@/components/Icon";
import { cn } from "@/lib/cn";

/**
 * NAFFCO-style image tile — a full-bleed background (photo or branded gradient),
 * a dark gradient scrim over the imagery, a gold icon chip, and the title +
 * description overlaid at the bottom with a gold "go" affordance.
 *
 * SEO: the title is a real <h3> and the whole tile is a crawlable <Link>; the
 * scrim is CSS over the image, so all text stays in the DOM (never baked in).
 */
export default function ServiceTile({
  name,
  excerpt,
  href,
  icon,
  image,
  featured = false,
  tag,
  className,
}: {
  name: string;
  excerpt: string;
  href: string;
  icon: string;
  image?: string;
  featured?: boolean;
  tag?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative isolate flex overflow-hidden rounded-[var(--radius-md)] text-white shadow-[var(--shadow-card)]",
        featured ? "min-h-[300px]" : "min-h-[240px]",
        className,
      )}
    >
      {/* Background: photo if provided, else branded gradient */}
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 520px) 100vw, (max-width: 820px) 50vw, 33vw"
          className="-z-20 object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 -z-20 transition-transform duration-500 group-hover:scale-[1.06]"
          style={{
            background:
              "linear-gradient(135deg, rgba(212,160,23,0.25), transparent 55%), repeating-linear-gradient(48deg, rgba(255,255,255,0.05) 0 16px, transparent 16px 34px), radial-gradient(120% 120% at 70% 20%, #2f2a1d, #171512)",
          }}
        />
      )}
      {/* Scrim */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(0deg, rgba(15,14,12,0.82) 0%, rgba(15,14,12,0.28) 45%, rgba(15,14,12,0.08) 100%)",
        }}
      />

      {/* Gold icon chip */}
      <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] bg-[color-mix(in_srgb,var(--color-brand-500)_92%,transparent)] text-white">
        <Icon name={icon as IconName} size={22} />
      </span>

      {tag ? (
        <span className="absolute right-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wide">
          {tag}
        </span>
      ) : null}

      {/* Bottom overlay content */}
      <div className="mt-auto flex w-full items-end justify-between gap-3 p-5">
        <div>
          <h3 className="text-[1.25rem] font-semibold text-white">{name}</h3>
          <p className="mt-1 max-w-[30ch] text-[0.85rem] text-white/85">{excerpt}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white transition-transform group-hover:translate-x-1">
          <Icon name="arrow-right" size={18} />
        </span>
      </div>
    </Link>
  );
}
