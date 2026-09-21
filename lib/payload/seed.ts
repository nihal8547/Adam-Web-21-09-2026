import type { Payload } from "payload";
import { services, serviceSecondaryKeywords } from "@/content/services";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { roles } from "@/content/careers";
import { blogPosts } from "@/content/blog";
import { testimonials } from "@/content/testimonials";
import { clients } from "@/content/clients";
import {
  hero,
  stats,
  whatDrivesUs,
  whatMakesUsBetter,
  groupCredibility,
  qcddBand,
  homeFeatureBlocks,
  about,
  whyChooseUs,
  qcddPage,
  internationalWorking,
} from "@/content/company";

/**
 * One-time migration of the typed /content data into the CMS database.
 * Idempotent: existing entries (matched by slug) are updated, not duplicated.
 * Triggered via POST /api/seed (guarded) — see app/(payload)/api/seed/route.ts.
 */

const FIRE_SLUGS = new Set([
  "fire-protection-services-qatar",
  "fire-alarm-system-installation-maintenance",
  "fire-fighting-pump-qatar",
  "fire-sprinkler-system-qatar",
  "fire-stop-insulation-technologies-services-qatar",
  "underground-leakage-detection-system-service-qatar",
]);

const wrap = (values: readonly string[] = []) => values.map((value) => ({ value }));

/** Upsert a doc in a slug-keyed collection (create, or update if slug exists). */
async function upsertBySlug(
  payload: Payload,
  collection: "projects" | "vacancies" | "posts",
  slug: string,
  data: Record<string, unknown>,
): Promise<void> {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
  });
  if (existing.docs[0]) {
    await payload.update({ collection, id: existing.docs[0].id, data });
  } else {
    await payload.create({ collection, data });
  }
}

async function upsertCategory(
  payload: Payload,
  name: string,
  slug: string,
): Promise<number | string> {
  const existing = await payload.find({
    collection: "categories",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  if (existing.docs[0]) return existing.docs[0].id;
  const created = await payload.create({
    collection: "categories",
    data: { name, slug, description: `${name} services in Qatar.` },
  });
  return created.id;
}

export async function runSeed(payload: Payload) {
  const result = {
    categories: 0,
    services: 0,
    related: 0,
    projects: 0,
    vacancies: 0,
    posts: 0,
    testimonials: 0,
    clients: 0,
    siteSettings: false,
    globals: false,
  };
  const para = (arr: readonly string[]) => arr.map((paragraph) => ({ paragraph }));

  // 1. Categories (two parents; sub-categories can be added in the admin).
  const fireCatId = await upsertCategory(payload, "Fire Protection", "fire-protection");
  const mepCatId = await upsertCategory(payload, "MEP (Mechanical, Electrical & Plumbing)", "mep");
  result.categories = 2;

  // 2. Services — first pass (create/update, no relations yet).
  const slugToId = new Map<string, number | string>();
  for (const [i, svc] of services.entries()) {
    const data = {
      name: svc.name,
      slug: svc.slug,
      h1: svc.h1,
      eyebrow: svc.eyebrow,
      excerpt: svc.excerpt,
      icon: svc.icon,
      featured: Boolean(svc.featured),
      order: i,
      category: FIRE_SLUGS.has(svc.slug) ? fireCatId : mepCatId,
      primaryKeyword: svc.primaryKeyword,
      secondaryKeywords: wrap(serviceSecondaryKeywords[svc.slug]),
      intro: svc.intro.map((paragraph) => ({ paragraph })),
      included: svc.included.map((it) => ({ title: it.title, desc: it.desc })),
      complianceStandards: wrap(svc.compliance.standards),
      complianceBrands: (svc.compliance.brands ?? []).map((b) => ({
        label: b.label,
        items: wrap(b.items),
      })),
      process: svc.process.map((p) => ({ title: p.title, desc: p.desc })),
      sectors: wrap(svc.sectors),
      sections: svc.sections.map((s) => ({
        heading: s.heading,
        body: s.body.map((paragraph) => ({ paragraph })),
      })),
      faqs: svc.faqs.map((f) => ({ q: f.q, a: f.a })),
      meta: { title: svc.metaTitle, description: svc.metaDescription },
    };

    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: svc.slug } },
      limit: 1,
    });
    if (existing.docs[0]) {
      const updated = await payload.update({
        collection: "services",
        id: existing.docs[0].id,
        data,
      });
      slugToId.set(svc.slug, updated.id);
    } else {
      const created = await payload.create({ collection: "services", data });
      slugToId.set(svc.slug, created.id);
    }
    result.services += 1;
  }

  // 3. Services — second pass: wire up `related` now that IDs exist.
  for (const svc of services) {
    const id = slugToId.get(svc.slug);
    if (!id) continue;
    const relatedIds = svc.related
      .map((s) => slugToId.get(s))
      .filter((v): v is number | string => v !== undefined);
    if (relatedIds.length) {
      await payload.update({ collection: "services", id, data: { related: relatedIds } });
      result.related += 1;
    }
  }

  // 4. Projects (link servicesUsed to the service IDs seeded above).
  for (const p of projects) {
    const servicesUsed = (p.servicesUsed ?? [])
      .map((s) => slugToId.get(s))
      .filter((v): v is number | string => v !== undefined);
    await upsertBySlug(payload, "projects", p.slug, {
      title: p.title,
      slug: p.slug,
      sector: p.sector,
      serviceLabel: p.service,
      location: p.location,
      summary: p.summary,
      challenge: p.challenge,
      solution: p.solution,
      outcome: p.outcome,
      servicesUsed,
      meta: { title: `${p.title} | Projects`, description: p.summary },
    });
    result.projects += 1;
  }

  // 5. Vacancies (careers roles).
  for (const r of roles) {
    await upsertBySlug(payload, "vacancies", r.slug, {
      title: r.title,
      slug: r.slug,
      department: r.department,
      employmentType: r.type,
      location: r.location,
      datePosted: r.datePosted,
      summary: r.summary,
      responsibilities: wrap(r.responsibilities),
      requirements: wrap(r.requirements),
      meta: { title: `${r.title} | Careers`, description: r.summary },
    });
    result.vacancies += 1;
  }

  // 6. Blog posts.
  for (const post of blogPosts) {
    await upsertBySlug(payload, "posts", post.slug, {
      title: post.title,
      slug: post.slug,
      category: post.category,
      author: post.author,
      datePublished: post.datePublished,
      readingMinutes: post.readingMinutes,
      excerpt: post.excerpt,
      body: post.body.map((sec) => ({
        heading: sec.heading,
        paragraphs: sec.paragraphs.map((paragraph) => ({ paragraph })),
      })),
      meta: { title: post.metaTitle, description: post.metaDescription },
    });
    result.posts += 1;
  }

  // 7. Testimonials (match by author to stay idempotent).
  for (const [i, t] of testimonials.entries()) {
    const existing = await payload.find({
      collection: "testimonials",
      where: { author: { equals: t.author } },
      limit: 1,
    });
    const data = {
      heading: t.title,
      quote: t.quote,
      author: t.author,
      role: t.role,
      rating: 5,
      order: i,
    };
    if (existing.docs[0]) {
      await payload.update({ collection: "testimonials", id: existing.docs[0].id, data });
    } else {
      await payload.create({ collection: "testimonials", data });
    }
    result.testimonials += 1;
  }

  // 8. Clients (match by name).
  for (const [i, c] of clients.entries()) {
    const existing = await payload.find({
      collection: "clients",
      where: { name: { equals: c.name } },
      limit: 1,
    });
    const data = { name: c.name, order: i };
    if (existing.docs[0]) {
      await payload.update({ collection: "clients", id: existing.docs[0].id, data });
    } else {
      await payload.create({ collection: "clients", data });
    }
    result.clients += 1;
  }

  // 9. Site Settings global.
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      legalName: site.legalName,
      group: site.group,
      tagline: site.tagline,
      description: site.description,
      email: site.email,
      phone: site.phone.display,
      mobile: site.mobile.display,
      fax: site.fax,
      whatsappNumber: site.whatsapp.href.replace(/\D/g, ""),
      addressLine1: site.address.line1,
      addressLine2: site.address.line2,
      city: site.address.city,
      country: site.address.country,
      geoLat: site.address.geo.lat,
      geoLng: site.address.geo.lng,
      mapQuery: site.address.mapQuery,
      hours: site.hours.map((h) => ({ days: h.days, time: h.time })),
      facebook: site.social.facebook,
      instagram: site.social.instagram,
      linkedin: site.social.linkedin,
      x: site.social.x,
    },
  });
  result.siteSettings = true;

  // 10. Home page global.
  await payload.updateGlobal({
    slug: "home",
    data: {
      heroEyebrow: hero.eyebrow,
      heroH1: hero.h1,
      heroSub: hero.sub,
      primaryCtaLabel: hero.primaryCta.label,
      primaryCtaHref: hero.primaryCta.href,
      secondaryCtaLabel: hero.secondaryCta.label,
      secondaryCtaHref: hero.secondaryCta.href,
      heroVideo: hero.media.video,
      quickAccess: hero.quickAccess.map((q) => ({
        icon: q.icon,
        label: q.label,
        sub: q.sub,
        href: q.href,
      })),
      stats: stats.map((s) => ({
        text: s.text,
        value: s.value,
        prefix: s.prefix,
        suffix: s.suffix,
        label: s.label,
      })),
      whoEyebrow: whatDrivesUs.eyebrow,
      whoHeading: whatDrivesUs.heading,
      whoBody: para(whatDrivesUs.body),
      differentiators: whatMakesUsBetter.map((c) => ({
        icon: c.icon,
        title: c.title,
        desc: c.desc,
      })),
      credibilityQuote: groupCredibility,
      qcddEyebrow: qcddBand.eyebrow,
      qcddHeading: qcddBand.heading,
      qcddBody: qcddBand.body,
      qcddCtaLabel: qcddBand.cta.label,
      qcddCtaHref: qcddBand.cta.href,
      featureBlocks: homeFeatureBlocks.map((b) => ({
        eyebrow: b.eyebrow,
        heading: b.heading,
        body: para(b.body),
        bullets: wrap(b.bullets),
        ctaLabel: b.cta.label,
        ctaHref: b.cta.href,
      })),
    },
  });

  // 11. About page global.
  await payload.updateGlobal({
    slug: "about-page",
    data: {
      heroEyebrow: about.hero.eyebrow,
      heroHeading: about.hero.heading,
      heroBody: about.hero.body,
      storyHeading: about.story.heading,
      storyBody: para(about.story.body),
      missionHeading: about.mission.heading,
      missionBody: about.mission.body,
      visionHeading: about.vision.heading,
      visionBody: about.vision.body,
      whyChooseUs: whyChooseUs.map((f) => ({ q: f.q, a: f.a })),
    },
  });

  // 12. QCDD page global.
  await payload.updateGlobal({
    slug: "qcdd-page",
    data: {
      intro: para(qcddPage.intro),
      checklist: wrap(qcddPage.checklist),
      timeline: qcddPage.timeline.map((t) => ({ title: t.title, desc: t.desc })),
      faqs: qcddPage.faqs.map((f) => ({ q: f.q, a: f.a })),
    },
  });

  // 13. Contact page global.
  await payload.updateGlobal({
    slug: "contact-page",
    data: {
      internationalEyebrow: internationalWorking.eyebrow,
      internationalHeading: internationalWorking.heading,
      internationalItems: internationalWorking.items.map((i) => ({
        title: i.title,
        desc: i.desc,
      })),
    },
  });
  result.globals = true;

  return result;
}
