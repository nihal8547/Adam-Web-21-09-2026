import type { Payload } from "payload";
import { services, serviceSecondaryKeywords } from "@/content/services";
import { site } from "@/content/site";

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
  const result = { categories: 0, services: 0, related: 0, siteSettings: false };

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

  // 4. Site Settings global.
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

  return result;
}
