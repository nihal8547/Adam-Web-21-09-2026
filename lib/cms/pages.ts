/* eslint-disable @typescript-eslint/no-explicit-any */
import { fromCms } from "@/lib/cms/client";
import { about, whyChooseUs, qcddPage, internationalWorking } from "@/content/company";

export type AboutData = {
  hero: { eyebrow: string; heading: string; body: string };
  story: { heading: string; body: string[] };
  mission: { heading: string; body: string };
  vision: { heading: string; body: string };
  whyChooseUs: { q: string; a: string }[];
};

export async function getAboutPage(): Promise<AboutData> {
  const fallback: AboutData = {
    hero: { ...about.hero },
    story: { heading: about.story.heading, body: [...about.story.body] },
    mission: { ...about.mission },
    vision: { ...about.vision },
    whyChooseUs: whyChooseUs.map((f) => ({ q: f.q, a: f.a })),
  };
  return fromCms(async (payload) => {
    const g: any = await payload.findGlobal({ slug: "about-page", depth: 0 });
    if (!g || (!g.storyHeading && !(g.whyChooseUs ?? []).length)) return null;
    return {
      hero: {
        eyebrow: g.heroEyebrow || fallback.hero.eyebrow,
        heading: g.heroHeading || fallback.hero.heading,
        body: g.heroBody || fallback.hero.body,
      },
      story: {
        heading: g.storyHeading || fallback.story.heading,
        body: (g.storyBody ?? []).map((p: any) => p.paragraph),
      },
      mission: {
        heading: g.missionHeading || fallback.mission.heading,
        body: g.missionBody || fallback.mission.body,
      },
      vision: {
        heading: g.visionHeading || fallback.vision.heading,
        body: g.visionBody || fallback.vision.body,
      },
      whyChooseUs: (g.whyChooseUs ?? []).map((f: any) => ({ q: f.q, a: f.a })),
    };
  }, fallback);
}

export type QcddData = {
  intro: string[];
  checklist: string[];
  timeline: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
};

export async function getQcddPage(): Promise<QcddData> {
  const fallback: QcddData = {
    intro: [...qcddPage.intro],
    checklist: [...qcddPage.checklist],
    timeline: qcddPage.timeline.map((t) => ({ title: t.title, desc: t.desc })),
    faqs: qcddPage.faqs.map((f) => ({ q: f.q, a: f.a })),
  };
  return fromCms(async (payload) => {
    const g: any = await payload.findGlobal({ slug: "qcdd-page", depth: 0 });
    if (!g || !(g.intro ?? []).length) return null;
    return {
      intro: (g.intro ?? []).map((p: any) => p.paragraph),
      checklist: (g.checklist ?? []).map((v: any) => v.value),
      timeline: (g.timeline ?? []).map((t: any) => ({ title: t.title, desc: t.desc })),
      faqs: (g.faqs ?? []).map((f: any) => ({ q: f.q, a: f.a })),
    };
  }, fallback);
}

export type ContactExtras = {
  eyebrow: string;
  heading: string;
  items: { title: string; desc: string }[];
};

export async function getContactPage(): Promise<ContactExtras> {
  const fallback: ContactExtras = {
    eyebrow: internationalWorking.eyebrow,
    heading: internationalWorking.heading,
    items: internationalWorking.items.map((i) => ({ title: i.title, desc: i.desc })),
  };
  return fromCms(async (payload) => {
    const g: any = await payload.findGlobal({ slug: "contact-page", depth: 0 });
    if (!g || !(g.internationalItems ?? []).length) return null;
    return {
      eyebrow: g.internationalEyebrow || fallback.eyebrow,
      heading: g.internationalHeading || fallback.heading,
      items: (g.internationalItems ?? []).map((i: any) => ({ title: i.title, desc: i.desc })),
    };
  }, fallback);
}

export type ServicesPageData = {
  hero: { eyebrow: string; heading: string; description: string };
  process: { eyebrow: string; heading: string };
};

export async function getServicesPage(): Promise<ServicesPageData> {
  const fallback: ServicesPageData = {
    hero: {
      eyebrow: "Our Expertise",
      heading: "Complete Fire Protection & MEP Solutions",
      description:
        "From life-safety fire systems to advanced HVAC and electrical infrastructures, we engineer solutions that ensure total compliance, safety, and operational excellence across Qatar.",
    },
    process: {
      eyebrow: "Process Overview",
      heading: "Our Signature Methodology",
    },
  };
  return fromCms(async (payload) => {
    const g: any = await payload.findGlobal({ slug: "services-page", depth: 0 });
    if (!g || !g.heroHeading) return null;
    return {
      hero: {
        eyebrow: g.heroEyebrow || fallback.hero.eyebrow,
        heading: g.heroHeading || fallback.hero.heading,
        description: g.heroDescription || fallback.hero.description,
      },
      process: {
        eyebrow: g.processEyebrow || fallback.process.eyebrow,
        heading: g.processHeading || fallback.process.heading,
      },
    };
  }, fallback);
}

