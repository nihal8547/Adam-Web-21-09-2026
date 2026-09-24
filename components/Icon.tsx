import { cn } from "@/lib/cn";

/**
 * Inline SVG icon set (stroke-based, currentColor). No icon library dependency,
 * so nothing extra ships to the client. `name` maps to the service/feature keys
 * used across the content files.
 */
export type IconName =
  | "shield"
  | "bell"
  | "pump"
  | "sprinkler"
  | "layers"
  | "droplet"
  | "wind"
  | "fan"
  | "bolt"
  | "team"
  | "grid"
  | "support"
  | "check"
  | "arrow-right"
  | "arrow-left"
  | "phone"
  | "mail"
  | "map-pin"
  | "clock"
  | "whatsapp"
  | "menu"
  | "close"
  | "chevron-down"
  | "quote"
  | "search"
  | "star";

const paths: Record<IconName, React.ReactNode> = {
  shield: <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
  bell: (
    <>
      <path d="M6 9a6 6 0 1112 0c0 4 1.5 5 2 6H4c.5-1 2-2 2-6z" />
      <path d="M10 20a2 2 0 004 0" />
    </>
  ),
  pump: (
    <>
      <rect x="3" y="10" width="10" height="8" rx="1" />
      <path d="M13 12h4l3-3v10l-3-3h-4" />
      <path d="M8 10V6h4" />
    </>
  ),
  sprinkler: (
    <>
      <path d="M12 3v4" />
      <path d="M12 7c-3 0-5 2-5 5" />
      <path d="M12 7c3 0 5 2 5 5" />
      <path d="M7 12l-2 3M12 12v4M17 12l2 3" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  droplet: <path d="M12 3s6 6.5 6 10a6 6 0 11-12 0c0-3.5 6-10 6-10z" />,
  wind: (
    <>
      <path d="M3 8h10a2.5 2.5 0 10-2.5-2.5" />
      <path d="M3 16h13a2.5 2.5 0 11-2.5 2.5" />
      <path d="M3 12h7" />
    </>
  ),
  fan: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 10c0-4 1-6 3-6s2 3 0 5" />
      <path d="M14 12c4 0 6 1 6 3s-3 2-5 0" />
      <path d="M12 14c0 4-1 6-3 6s-2-3 0-5" />
      <path d="M10 12c-4 0-6-1-6-3s3-2 5 0" />
    </>
  ),
  bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  team: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0112 0" />
      <path d="M16 6a3 3 0 010 6" />
      <path d="M21 20a6 6 0 00-4-5.6" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  support: (
    <>
      <path d="M4 13a8 8 0 0116 0" />
      <rect x="3" y="13" width="4" height="6" rx="1" />
      <rect x="17" y="13" width="4" height="6" rx="1" />
      <path d="M19 19a4 4 0 01-4 3h-3" />
    </>
  ),
  check: <path d="M4 12l5 5L20 6" />,
  "arrow-right": (
    <>
      <path d="M4 12h16" />
      <path d="M14 6l6 6-6 6" />
    </>
  ),
  "arrow-left": (
    <>
      <path d="M20 12H4" />
      <path d="M10 18l-6-6 6-6" />
    </>
  ),
  phone: (
    <path d="M5 3h3l2 5-2 1a11 11 0 005 5l1-2 5 2v3a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  whatsapp: (
    <path d="M20.52 3.48A11.93 11.93 0 0012.04 0C5.41 0 .02 5.39.02 12.02c0 2.11.55 4.18 1.6 6L0 24l6.17-1.62a11.99 11.99 0 005.87 1.52h.01c6.63 0 12.02-5.39 12.02-12.02 0-3.21-1.25-6.23-3.55-8.4zM12.04 21.88a9.88 9.88 0 01-5.04-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.86 9.86 0 01-1.52-5.23c0-5.46 4.45-9.91 9.91-9.91 2.65 0 5.13 1.03 7 2.9 1.88 1.87 2.91 4.36 2.91 7.01 0 5.46-4.44 9.86-9.93 9.86zm5.44-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.23-.65.08-.3-.15-1.27-.47-2.41-1.49-1.05-.93-1.76-2.09-1.96-2.44-.2-.35-.02-.54.13-.69.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.08-.8.38-.27.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.23 5.13 4.53 3.01 1.3 3.01.87 3.56.81.55-.05 1.78-.72 2.03-1.42.25-.7.25-1.3.17-1.43-.07-.12-.27-.2-.57-.35z" />
  ),
  menu: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6L6 18" />,
  "chevron-down": <path d="M6 9l6 6 6-6" />,
  quote: (
    <path d="M7 7h4v6a4 4 0 01-4 4V15a2 2 0 002-2H7V7zm8 0h4v6a4 4 0 01-4 4V15a2 2 0 002-2h-2V7z" />
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  star: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.9L12 16.9 6.8 19.2l1-5.9L3.5 9.2l5.9-.9L12 3z" />,
};

const filled: Partial<Record<IconName, boolean>> = { quote: true, star: true, whatsapp: true };

export default function Icon({
  name,
  className,
  size = 24,
  "aria-hidden": ariaHidden = true,
  title,
}: {
  name: IconName;
  className?: string;
  size?: number;
  "aria-hidden"?: boolean;
  title?: string;
}) {
  const isFilled = filled[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("shrink-0", className)}
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
