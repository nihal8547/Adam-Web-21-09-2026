import type { ClientLogo } from "@/content/clients";

/**
 * Client/partner logo marquee — grayscale, colour on hover. Uses generated
 * placeholder chips until real client logos are supplied (see README).
 * Duplicated track for a seamless CSS loop; pauses on hover and respects
 * prefers-reduced-motion (see globals.css .animate-marquee).
 */
export default function LogoMarquee({ items }: { items: ClientLogo[] }) {
  const track = [...items, ...items];
  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <ul
        className="animate-marquee flex w-max items-center gap-4"
        aria-label="Clients and partners"
      >
        {track.map((client, i) => (
          <li
            key={`${client.name}-${i}`}
            aria-hidden={i >= items.length}
            className="flex h-16 w-40 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-4 grayscale transition-all duration-300 hover:grayscale-0"
          >
            {client.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={client.logo} alt={client.name} className="max-h-8 w-auto object-contain" />
            ) : (
              <span className="text-[0.85rem] font-semibold text-[var(--body)]">{client.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
