/**
 * Client / partner logo marquee. The brief specifies 19 logos but does not
 * supply client names, and client names must not be invented. These are
 * neutral placeholders rendered as generated SVG chips; replace `name` and
 * `logo` with the real client logos before launch (see README).
 */
export type ClientLogo = { name: string; logo?: string };

export const clients: ClientLogo[] = Array.from({ length: 19 }, (_, i) => ({
  name: `Client ${String(i + 1).padStart(2, "0")}`,
}));
