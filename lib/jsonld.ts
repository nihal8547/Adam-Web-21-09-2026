import { site, socialSameAs } from "@/content/site";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

/**
 * JSON-LD schema builders. Each returns a plain object rendered by <JsonLd>.
 * Validate output in Google's Rich Results Test before launch.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const LOCALBUSINESS_ID = `${SITE_URL}/#localbusiness`;

/** Publisher/organization logo as an ImageObject (Google rich-results req). */
const LOGO_IMAGE = {
  "@type": "ImageObject",
  url: absoluteUrl("/logo.png"),
  width: 512,
  height: 512,
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.legalName,
    legalName: site.legalName,
    parentOrganization: { "@type": "Organization", name: site.group },
    url: SITE_URL,
    logo: LOGO_IMAGE,
    image: absoluteUrl("/logo.png"),
    email: site.email,
    telephone: site.phone.display,
    faxNumber: site.fax,
    sameAs: socialSameAs,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressCountry: "QA",
    },
    areaServed: { "@type": "Country", name: "Qatar" },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": LOCALBUSINESS_ID,
    name: site.legalName,
    image: absoluteUrl("/logo.png"),
    logo: LOGO_IMAGE,
    url: SITE_URL,
    telephone: site.phone.display,
    email: site.email,
    faxNumber: site.fax,
    priceRange: "$$",
    parentOrganization: { "@type": "Organization", name: site.group },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressCountry: "QA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.geo.lat,
      longitude: site.address.geo.lng,
    },
    areaServed: { "@type": "Country", name: "Qatar" },
    sameAs: socialSameAs,
    openingHoursSpecification: site.openingHoursSpec.map((o) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: o.days,
      opens: o.opens,
      closes: o.closes,
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: site.legalName,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    url: absoluteUrl(input.path),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Qatar" },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { "@type": "Organization", name: input.author, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      logo: LOGO_IMAGE,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(input.path) },
    image: input.image ? absoluteUrl(input.image) : absoluteUrl("/og"),
  };
}

export function jobPostingSchema(input: {
  title: string;
  description: string;
  datePosted: string;
  employmentType: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: input.title,
    description: input.description,
    datePosted: input.datePosted,
    employmentType: input.employmentType,
    hiringOrganization: { "@id": ORG_ID },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: site.address.city,
        addressCountry: "QA",
      },
    },
    applicantLocationRequirements: { "@type": "Country", name: "Qatar" },
    url: absoluteUrl(input.path),
  };
}
