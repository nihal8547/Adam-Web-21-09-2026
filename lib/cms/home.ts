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

export type HomeData = {
  hero: { h1: string; sub: string; media: { video: string; poster: string; posterAlt: string } };
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
};

const staticHome = (): HomeData => ({
  hero: { h1: staticHero.h1, sub: staticHero.sub, media: { ...staticHero.media } },
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
        h1: g.heroH1 || fallback.hero.h1,
        sub: g.heroSub || fallback.hero.sub,
        media: {
          video: g.heroVideo || "",
          poster: mediaUrl(g.heroImage) || fallback.hero.media.poster,
          posterAlt: g.heroImage?.alt || fallback.hero.media.posterAlt,
        },
      },
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
        body: (g.whoBody ?? []).map((p: any) => p.paragraph),
      },
      whatMakesUsBetter: (g.differentiators ?? []).map((c: any) => ({
        title: c.title,
        desc: c.desc,
        icon: c.icon || "team",
      })),
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
    };
  }, staticHome());
}
