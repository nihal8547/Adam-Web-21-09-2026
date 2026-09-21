import Link from "next/link";
import Container from "@/components/Container";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import { site } from "@/content/site";
import { services } from "@/content/services";

const quickLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Projects", href: "/projects" },
  { label: "QCDD License Renewal", href: "/qatar-civil-defence-department" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Request a Quotation", href: "/request-for-quotation" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--color-ink-900)] text-[var(--on-invert)]">
      {/* Gold top hairline */}
      <div className="h-[3px] w-full bg-[var(--color-brand-500)]" />
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand + blurb + social */}
          <div>
            <Logo invert />
            <p className="mt-4 max-w-xs text-[0.9rem] leading-relaxed text-white/70">
              QCDD-certified fire protection and MEP contractor in Doha, Qatar — fire alarms, pumps,
              sprinklers, leak detection, HVAC, ACMV and electrical services, engineered to NFPA
              standards.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { label: "LinkedIn", href: site.social.linkedin },
                { label: "Facebook", href: site.social.facebook },
                { label: "Instagram", href: site.social.instagram },
                { label: "X", href: site.social.x },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-[var(--color-brand-500)] hover:text-[var(--on-invert-accent)]"
                >
                  <span className="text-[0.7rem] font-bold">{s.label.slice(0, 2)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[var(--on-invert-accent)]">
              Services
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-[0.9rem] text-white/75">
              {services.map((svc) => (
                <li key={svc.slug}>
                  <Link href={`/${svc.slug}`} className="transition-colors hover:text-white">
                    {svc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[var(--on-invert-accent)]">
              Company
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-[0.9rem] text-white/75">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* NAP + hours */}
          <div>
            <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[var(--on-invert-accent)]">
              Get in Touch
            </h2>
            <address className="mt-4 flex flex-col gap-3 text-[0.9rem] not-italic text-white/75">
              <span className="flex items-start gap-2.5">
                <Icon name="map-pin" size={17} className="mt-0.5 text-[var(--on-invert-accent)]" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}, {site.address.city}, {site.address.country}
                </span>
              </span>
              <a href={site.phone.href} className="flex items-center gap-2.5 hover:text-white">
                <Icon name="phone" size={17} className="text-[var(--on-invert-accent)]" />
                {site.phone.display}
              </a>
              <a href={site.mobile.href} className="flex items-center gap-2.5 hover:text-white">
                <Icon name="phone" size={17} className="text-[var(--on-invert-accent)]" />
                {site.mobile.display} (Mobile)
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 hover:text-white"
              >
                <Icon name="mail" size={17} className="text-[var(--on-invert-accent)]" />
                {site.email}
              </a>
              <span className="flex items-start gap-2.5">
                <Icon name="clock" size={17} className="mt-0.5 text-[var(--on-invert-accent)]" />
                <span>
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </span>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-[0.82rem] text-white/60 sm:flex-row">
          <p>
            © {year} {site.legalName}. Part of {site.group}. All rights reserved.
          </p>
          <ul className="flex items-center gap-5">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
