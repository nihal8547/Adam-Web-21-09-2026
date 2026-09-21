import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import TrustStrip from "@/components/TrustStrip";
import Icon from "@/components/Icon";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Request a Quotation | Adam Technical Services",
  description:
    "Request a free quotation for fire protection, HVAC, ACMV or MEP services in Qatar. Tell us about your project and our engineers will respond quickly.",
  path: "/request-for-quotation",
});

const points = [
  "QCDD-certified, NFPA-compliant engineering",
  "One accountable partner for design, install & AMC",
  "24/7 emergency response across Qatar",
  "Clear, itemised quotations — no surprises",
];

export default function RfqPage() {
  return (
    <>
      <Breadcrumbs crumbs={[{ name: "Request a Quotation", path: "/request-for-quotation" }]} />

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <span className="eyebrow gold-rule">Free Quotation</span>
          <h1 className="mt-4 text-[length:var(--text-4xl)]">Request a Free Quotation</h1>
          <p className="mt-5 max-w-xl text-[1.05rem] text-[var(--body)]">
            Tell us about your project — the building, the systems you need and your timeline — and
            our engineers will get back to you with a clear, no-obligation quotation.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[var(--subheading)]">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--surface-wash)] text-[var(--accent-strong)]">
                  <Icon name="check" size={15} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-wash)] p-6">
            <p className="text-[0.85rem] font-semibold uppercase tracking-wide text-[var(--body)]">
              Prefer to talk?
            </p>
            <a
              href={site.phone.href}
              className="mt-1 flex items-center gap-2 text-[1.25rem] font-bold text-[var(--heading)]"
            >
              <Icon name="phone" size={22} className="text-[var(--accent-strong)]" />
              {site.phone.display}
            </a>
          </div>

          <TrustStrip className="mt-8" />
        </div>

        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] sm:p-8">
          <h2 className="text-[1.4rem] font-semibold text-[var(--heading)]">
            Your project details
          </h2>
          <div className="mt-6">
            <ContactForm variant="rfq" />
          </div>
        </div>
      </Container>
    </>
  );
}
