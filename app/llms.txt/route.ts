import { site } from "@/content/site";
import { services } from "@/content/services";
import { blogPosts } from "@/content/blog";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

/**
 * /llms.txt — the emerging standard (llmstxt.org) that gives AI/answer engines
 * (ChatGPT, Perplexity, Gemini, Claude, Google AI Overviews) a clean, curated,
 * plain-text map of the site's key facts and pages. Generated from the same
 * typed content as the site, so it never drifts. This is the core AIO/GEO file.
 */
export const dynamic = "force-static";

export function GET() {
  const hours = site.hours.map((h) => `${h.days}: ${h.time}`).join("; ");

  const body = `# ${site.legalName}

> ${site.description}

${site.legalName} is a QCDD-certified fire protection and MEP contractor based in Doha, Qatar,
operating as part of the ${site.group}. We design, install and maintain fire and building-services
systems to NFPA standards and Qatar Civil Defence Department (QCDD) requirements.

## Key facts
- Legal name: ${site.legalName}
- Group: ${site.group}
- Location: ${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.country}
- Phone: ${site.phone.display}
- Mobile / WhatsApp: ${site.mobile.display}
- Email: ${site.email}
- Opening hours: ${hours}
- Service area: Qatar (Doha, Al Sadd, West Bay, Lusail, Al Wakrah, Mesaieed)
- Certifications & standards: QCDD (Qatar Civil Defence) approved, NFPA compliant, UL/FM-listed equipment
- Emergency response: 24/7

## Services
${services
  .map((s) => `- [${s.name} — ${s.h1}](${absoluteUrl(`/${s.slug}`)}): ${s.excerpt}`)
  .join("\n")}
- [QCDD License Renewal](${absoluteUrl("/qatar-civil-defence-department")}): End-to-end Qatar Civil Defence fire-safety certificate renewal — inspection, remediation, documentation and submission.

## Company
- [About Us](${absoluteUrl("/about-us")}): Who we are, mission, vision and why choose us.
- [Services hub](${absoluteUrl("/services")}): All nine services and our four-step process.
- [Projects](${absoluteUrl("/projects")}): Case studies across residential, commercial, industrial and high-rise sectors.
- [Careers](${absoluteUrl("/careers")}): Open engineering, HVAC and fire-safety roles in Doha.
- [Contact](${absoluteUrl("/contact-us")}): Address, hours, map and enquiry form.
- [Request a Quotation](${absoluteUrl("/request-for-quotation")}): Free, no-obligation quote.

## Blog
${blogPosts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.excerpt}`).join("\n")}

## Contact
Email ${site.email} or call ${site.phone.display} (24/7 emergency line available).
Website: ${SITE_URL}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
