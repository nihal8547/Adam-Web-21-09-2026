import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import LazyMap from "@/components/LazyMap";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { internationalWorking } from "@/content/company";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | Adam Technical Services Qatar",
  description:
    "Contact Adam Technical Services in Doha, Qatar. Call +974 4140 0922, email info@adam.qa, or send us a message. Sat–Wed 8:00–17:00.",
  path: "/contact-us",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs crumbs={[{ name: "Contact Us", path: "/contact-us" }]} />

      <section className="bg-[var(--surface-alt)]">
        <Container className="py-14 md:py-16">
          <span className="eyebrow gold-rule">Contact</span>
          <h1 className="mt-4 max-w-3xl text-[length:var(--text-4xl)]">Get in Touch</h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] text-[var(--body)]">
            Talk to our team about fire protection, HVAC, ACMV or MEP in Qatar. We&apos;ll respond
            quickly — and for emergencies, our 24/7 line is always open.
          </p>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* NAP + hours + WhatsApp */}
        <div>
          <SectionHeading eyebrow="Reach Us" title="Contact details" as="h2" />
          <address className="mt-8 flex flex-col gap-5 not-italic">
            <ContactRow icon="map-pin" label="Visit us">
              {site.address.line1}
              <br />
              {site.address.line2}, {site.address.city}, {site.address.country}
            </ContactRow>
            <ContactRow icon="phone" label="Call us">
              <a href={site.phone.href} className="hover:text-[var(--accent-strong)]">
                {site.phone.display}
              </a>
              <br />
              <a href={site.mobile.href} className="hover:text-[var(--accent-strong)]">
                {site.mobile.display} (Mobile)
              </a>
            </ContactRow>
            <ContactRow icon="mail" label="Email us">
              <a href={`mailto:${site.email}`} className="hover:text-[var(--accent-strong)]">
                {site.email}
              </a>
            </ContactRow>
            <ContactRow icon="clock" label="Opening hours">
              {site.hours.map((h) => (
                <span key={h.days} className="block">
                  <span className="font-medium text-[var(--heading)]">{h.days}:</span> {h.time}
                </span>
              ))}
            </ContactRow>
          </address>

          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 font-semibold text-[var(--heading)] transition-colors hover:bg-[var(--surface-wash)]"
          >
            <span className="text-[var(--accent-strong)]">
              <Icon name="whatsapp" size={22} />
            </span>
            Chat on WhatsApp
          </a>

          <div className="mt-8">
            <LazyMap />
          </div>
        </div>

        {/* Form */}
        <Reveal className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] sm:p-8">
          <h2 className="text-[1.4rem] font-semibold text-[var(--heading)]">Send us a message</h2>
          <p className="mt-1.5 text-[var(--body)]">
            Fields marked <span className="text-[var(--color-alert-600)]">*</span> are required.
          </p>
          <div className="mt-6">
            <ContactForm variant="contact" />
          </div>
        </Reveal>
      </Container>

      {/* International way of working */}
      <section className="bg-[var(--surface-alt)]">
        <Container className="py-16 md:py-20">
          <SectionHeading
            eyebrow={internationalWorking.eyebrow}
            title={internationalWorking.heading}
            align="center"
            as="h2"
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {internationalWorking.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 90}>
                <div className="flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-card)]">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--surface-wash)] text-[var(--accent-strong)]">
                    <Icon name={["grid", "clock", "check"][i] as never} size={24} />
                  </span>
                  <h3 className="mt-4 text-[1.15rem] font-semibold text-[var(--heading)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[var(--body)]">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: "map-pin" | "phone" | "mail" | "clock";
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--surface-wash)] text-[var(--accent-strong)]">
        <Icon name={icon} size={22} />
      </span>
      <div>
        <span className="block text-[0.8rem] font-semibold uppercase tracking-wide text-[var(--body)]">
          {label}
        </span>
        <div className="mt-0.5 text-[1rem] text-[var(--subheading)]">{children}</div>
      </div>
    </div>
  );
}
