/* eslint-disable @typescript-eslint/no-explicit-any */
import { fromCms, mediaUrl } from "@/lib/cms/client";
import {
  hero as staticHero,
  stats as staticStats,
  whatDrivesUs,
  whatMakesUsBetter,
  groupCredibility,
  qcddBand,
  homeFeatureBlocks,
} from "@/content/company";

export type HeroCta = { label: string; href: string };
export type HeroQuickAccess = { icon: string; label: string; sub: string; href: string };

export type HomeData = {
  hero: {
    eyebrow: string;
    h1: string;
    sub: string;
    primaryCta: HeroCta;
    secondaryCta: HeroCta;
    quickAccess: HeroQuickAccess[];
    media: { video: string; poster: string; posterAlt: string };
  };
  whoImage?: string;
  stats: { value?: number; text?: string; prefix?: string; suffix?: string; label: string }[];
  whatDrivesUs: { eyebrow: string; heading: string; body: string[] };
  whatMakesUsBetter: { title: string; desc: string; icon: string }[];
  groupCredibility: string;
  qcddBand: {
    eyebrow: string;
    heading: string;
    body: string;
    cta: { label: string; href: string };
  };
  homeFeatureBlocks: {
    eyebrow: string;
    heading: string;
    body: string[];
    bullets: string[];
    cta: { label: string; href: string };
    image: string;
    imageAlt: string;
  }[];
  // 3D Interactive Showcase
  showcaseModels?: any;
  showcaseEyebrow?: string;
  showcaseHeading?: string;
  showcaseDescription?: string;
  // Project Gallery
  galleryImages?: any;
  galleryEyebrow?: string;
  galleryHeading?: string;
  galleryDescription?: string;
  // Certifications section
  certEyebrow?: string;
  certHeading?: string;
  certDescription?: string;
  certifications?: { badgeCode: string; logo?: string }[];
  certCtaLabel?: string;
  certCtaHref?: string;
  certCtaDesc?: string;
};

const staticHome = (): HomeData => ({
  hero: {
    eyebrow: staticHero.eyebrow,
    h1: staticHero.h1,
    sub: staticHero.sub,
    primaryCta: { ...staticHero.primaryCta },
    secondaryCta: { ...staticHero.secondaryCta },
    quickAccess: staticHero.quickAccess.map((q) => ({ ...q })),
    media: { ...staticHero.media },
  },
  stats: staticStats as any,
  whatDrivesUs: { ...whatDrivesUs, body: [...whatDrivesUs.body] },
  whatMakesUsBetter: whatMakesUsBetter.map((c) => ({ ...c })),
  groupCredibility,
  qcddBand: { ...qcddBand, cta: { ...qcddBand.cta } },
  homeFeatureBlocks: homeFeatureBlocks.map((b) => ({
    eyebrow: b.eyebrow,
    heading: b.heading,
    body: [...b.body],
    bullets: [...b.bullets],
    cta: { ...b.cta },
    image: b.image,
    imageAlt: b.imageAlt,
  })),
});

export async function getHome(): Promise<HomeData> {
  return fromCms(async (payload) => {
    const g: any = await payload.findGlobal({ slug: "home", depth: 1 });
    if (!g || !g.heroH1) return null;
    const fallback = staticHome();
    return {
      hero: {
        eyebrow: g.heroEyebrow || fallback.hero.eyebrow,
        h1: g.heroH1 || fallback.hero.h1,
        sub: g.heroSub || fallback.hero.sub,
        primaryCta: {
          label: g.primaryCtaLabel || fallback.hero.primaryCta.label,
          href: g.primaryCtaHref || fallback.hero.primaryCta.href,
        },
        secondaryCta: {
          label: g.secondaryCtaLabel || fallback.hero.secondaryCta.label,
          href: g.secondaryCtaHref || fallback.hero.secondaryCta.href,
        },
        quickAccess: (g.quickAccess ?? []).length > 0
          ? (g.quickAccess as any[]).map((q: any) => ({
              icon: q.icon || "shield",
              label: q.label,
              sub: q.sub || "",
              href: q.href || "#",
            }))
          : fallback.hero.quickAccess,
        media: {
          video: g.heroVideo || "",
          poster: mediaUrl(g.heroImage) || fallback.hero.media.poster,
          posterAlt: g.heroImage?.alt || fallback.hero.media.posterAlt,
        },
      },
      whoImage: mediaUrl(g.whoImage),
      stats: (g.stats ?? fallback.stats).map((s: any) => ({
        value: s.value ?? undefined,
        text: s.text || undefined,
        prefix: s.prefix || "",
        suffix: s.suffix || "",
        label: s.label,
      })),
      whatDrivesUs: {
        eyebrow: g.whoEyebrow || fallback.whatDrivesUs.eyebrow,
        heading: g.whoHeading || fallback.whatDrivesUs.heading,
        body: (g.whoBody ?? []).length > 0
          ? (g.whoBody as any[]).map((p: any) => p.paragraph)
          : fallback.whatDrivesUs.body,
      },
      whatMakesUsBetter: (g.differentiators ?? []).length > 0
        ? (g.differentiators as any[]).map((c: any) => ({
            title: c.title,
            desc: c.desc,
            icon: c.icon || "team",
          }))
        : fallback.whatMakesUsBetter,
      groupCredibility: g.credibilityQuote || fallback.groupCredibility,
      qcddBand: {
        eyebrow: g.qcddEyebrow || fallback.qcddBand.eyebrow,
        heading: g.qcddHeading || fallback.qcddBand.heading,
        body: g.qcddBody || fallback.qcddBand.body,
        cta: {
          label: g.qcddCtaLabel || fallback.qcddBand.cta.label,
          href: g.qcddCtaHref || fallback.qcddBand.cta.href,
        },
      },
      homeFeatureBlocks: (g.featureBlocks ?? []).map((b: any, i: number) => ({
        eyebrow: b.eyebrow || "",
        heading: b.heading,
        body: (b.body ?? []).map((p: any) => p.paragraph),
        bullets: (b.bullets ?? []).map((v: any) => v.value),
        cta: { label: b.ctaLabel || "", href: b.ctaHref || "#" },
        image:
          mediaUrl(b.image) || fallback.homeFeatureBlocks[i]?.image || "/images/feature-hvac.svg",
        imageAlt: b.image?.alt || b.heading,
      })),
      showcaseModels: g.showcaseModels,
      showcaseEyebrow: g.showcaseEyebrow,
      showcaseHeading: g.showcaseHeading,
      showcaseDescription: g.showcaseDescription,
      galleryImages: g.galleryImages,
      galleryEyebrow: g.galleryEyebrow,
      galleryHeading: g.galleryHeading,
      galleryDescription: g.galleryDescription,
      certEyebrow: g.certEyebrow,
      certHeading: g.certHeading,
      certDescription: g.certDescription,
      certifications: (g.certifications ?? []).map((c: any) => ({
        badgeCode: c.badgeCode,
        logo: mediaUrl(c.logo),
      })),
      certCtaLabel: g.certCtaLabel,
      certCtaHref: g.certCtaHref,
      certCtaDesc: g.certCtaDesc,
    };
  }, staticHome());
}
