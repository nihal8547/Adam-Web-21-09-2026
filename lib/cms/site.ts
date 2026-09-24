/* eslint-disable @typescript-eslint/no-explicit-any */
import { fromCms, mediaUrl } from "@/lib/cms/client";
import { site as staticSite } from "@/content/site";

export type SiteHours = { days: string; time: string };
export type SiteSocial = {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  x?: string;
};
export type SplashWord = { word: string; lang: string; dir: "ltr" | "rtl" };

export type SiteData = {
  legalName: string;
  group: string;
  tagline: string;
  description: string;
  logo?: string;
  email: string;
  phone: string;
  phoneHref: string;
  mobile: string;
  mobileHref: string;
  whatsappNumber: string;
  whatsappHref: string;
  fax?: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    country: string;
    geo: { lat: number; lng: number };
    mapQuery: string;
  };
  hours: SiteHours[];
  social: SiteSocial;
  splashWords: SplashWord[];
  splashStepMs: number;
};

function buildFallback(): SiteData {
  return {
    legalName: staticSite.legalName,
    group: staticSite.group,
    tagline: staticSite.tagline,
    description: staticSite.description,
    email: staticSite.email,
    phone: staticSite.phone.display,
    phoneHref: staticSite.phone.href,
    mobile: staticSite.mobile.display,
    mobileHref: staticSite.mobile.href,
    whatsappNumber: "97470755220",
    whatsappHref: staticSite.whatsapp.href,
    fax: staticSite.fax,
    address: {
      line1: staticSite.address.line1,
      line2: staticSite.address.line2,
      city: staticSite.address.city,
      country: staticSite.address.country,
      geo: { lat: staticSite.address.geo.lat, lng: staticSite.address.geo.lng },
      mapQuery: staticSite.address.mapQuery,
    },
    hours: staticSite.hours.map((h) => ({ days: h.days, time: h.time })),
    social: {
      facebook: staticSite.social.facebook,
      instagram: staticSite.social.instagram,
      linkedin: staticSite.social.linkedin,
      x: staticSite.social.x,
    },
    splashWords: [
      { word: "WELCOME", lang: "en", dir: "ltr" },
      { word: "أهلاً وسهلاً", lang: "ar", dir: "rtl" },
      { word: "Mabuhay", lang: "tl", dir: "ltr" },
      { word: "Bienvenue", lang: "fr", dir: "ltr" },
      { word: "Bienvenido", lang: "es", dir: "ltr" },
      { word: "स्वागत है", lang: "hi", dir: "ltr" },
      { word: "സ്വാഗതം", lang: "ml", dir: "ltr" },
    ],
    splashStepMs: 220,
  };
}

export async function getSiteSettings(): Promise<SiteData> {
  const fallback = buildFallback();
  return fromCms(async (payload) => {
    const g: any = await payload.findGlobal({ slug: "site-settings", depth: 1 });
    if (!g || !g.legalName) return null;

    const phone = g.phone || fallback.phone;
    const mobile = g.mobile || fallback.mobile;
    const whatsappNumber = g.whatsappNumber || fallback.whatsappNumber;

    return {
      legalName: g.legalName || fallback.legalName,
      group: g.group || fallback.group,
      tagline: g.tagline || fallback.tagline,
      description: g.description || fallback.description,
      logo: mediaUrl(g.logo),
      email: g.email || fallback.email,
      phone,
      phoneHref: `tel:+${whatsappNumber}`,
      mobile,
      mobileHref: `tel:+${whatsappNumber}`,
      whatsappNumber,
      whatsappHref: `https://wa.me/${whatsappNumber}`,
      fax: g.fax || fallback.fax,
      address: {
        line1: g.addressLine1 || fallback.address.line1,
        line2: g.addressLine2 || fallback.address.line2,
        city: g.city || fallback.address.city,
        country: g.country || fallback.address.country,
        geo: {
          lat: g.geoLat ?? fallback.address.geo.lat,
          lng: g.geoLng ?? fallback.address.geo.lng,
        },
        mapQuery: g.mapQuery || fallback.address.mapQuery,
      },
      hours: (g.hours ?? []).length > 0
        ? (g.hours as any[]).map((h: any) => ({ days: h.days, time: h.time }))
        : fallback.hours,
      social: {
        facebook: g.facebook || fallback.social.facebook,
        instagram: g.instagram || fallback.social.instagram,
        linkedin: g.linkedin || fallback.social.linkedin,
        x: g.x || fallback.social.x,
      },
      splashWords: (g.splashWords ?? []).length > 0
        ? (g.splashWords as any[]).map((w: any) => ({
            word: w.word,
            lang: w.lang,
            dir: (w.dir || "ltr") as "ltr" | "rtl",
          }))
        : fallback.splashWords,
      splashStepMs: g.splashStepMs ?? fallback.splashStepMs,
    };
  }, fallback);
}
