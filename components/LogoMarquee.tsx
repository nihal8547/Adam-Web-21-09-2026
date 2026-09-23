import type { ClientLogo } from "@/content/clients";

/**
 * Client/partner logo marquee — grayscale, colour on hover. Uses generated
 * placeholder chips until real client logos are supplied (see README).
 * Duplicated track for a seamless CSS loop; pauses on hover and respects
 * prefers-reduced-motion (see globals.css .animate-marquee).
 */
export default function LogoMarquee({ items }: { items: ClientLogo[] }) {
  const track = [...items, ...items];
  const track2 = [...items, ...items].reverse();

  return (
    <div className="relative flex w-full flex-col gap-6 overflow-hidden py-4">
      <div
        className="group relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <ul
          className="animate-marquee flex w-max items-center gap-5"
          aria-label="Clients and partners"
        >
          {track.map((client, i) => (
            <li
              key={`${client.name}-1-${i}`}
              aria-hidden={i >= items.length}
              className="group/logo relative flex h-[130px] w-[170px] shrink-0 items-center justify-center rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-brand-500)]/50 hover:shadow-[var(--shadow-hover)]"
            >
              {client.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-center text-[0.85rem] font-semibold text-[var(--body)]">
                  {client.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="group relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <ul
          className="animate-marquee-reverse flex w-max items-center gap-5"
          aria-label="Clients and partners row 2"
        >
          {track2.map((client, i) => (
            <li
              key={`${client.name}-2-${i}`}
              aria-hidden={i >= items.length}
              className="group/logo relative flex h-[130px] w-[170px] shrink-0 items-center justify-center rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-brand-500)]/50 hover:shadow-[var(--shadow-hover)]"
            >
              {client.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-center text-[0.85rem] font-semibold text-[var(--body)]">
                  {client.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
