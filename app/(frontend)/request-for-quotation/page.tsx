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
      {/* Hero with Architectural Deep Navy + Ambient Glow */}
      <section className="relative overflow-hidden bg-[var(--color-navy-900)] text-white pt-24 pb-14 md:pt-32 md:pb-16">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[var(--color-brand-500)]/25 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-amber-400/10 blur-2xl"
        />

        <Container className="relative z-10">
          <div className="mb-6">
            <Breadcrumbs crumbs={[{ name: "Request a Quotation", path: "/request-for-quotation" }]} invert />
          </div>
          <span className="eyebrow gold-rule !text-amber-400 [&::after]:!bg-amber-400">Free Quotation</span>
          <h1 className="mt-4 max-w-4xl text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Request a Free Quotation
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed">
            Tell us about your project — the building, the systems you need and your timeline — and our engineers will get back to you with a clear, no-obligation quotation.
          </p>
        </Container>
      </section>

      <section className="bg-slate-50 py-16">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Why Partner With Adam Technical Services</h2>
          <ul className="mt-8 flex flex-col gap-3.5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3.5 text-slate-700 font-medium">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--color-navy-900)] text-amber-400 shadow-sm">
                  <Icon name="check" size={13} />
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-md border-l-4 border-l-amber-400">
            <p className="text-[0.85rem] font-bold uppercase tracking-wider text-slate-500">
              Prefer to talk to an engineer?
            </p>
            <a
              href={site.phone.href}
              className="mt-2 flex items-center gap-2.5 text-xl font-bold text-slate-900 hover:text-amber-500 transition-colors"
            >
              <Icon name="phone" size={20} className="text-amber-500" />
              {site.phone.display}
            </a>
          </div>

          <TrustStrip className="mt-8" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-10 shadow-xl shadow-slate-200/60 border-t-4 border-t-[var(--color-navy-900)]">
          <h2 className="text-2xl font-bold text-slate-900">
            Your project details
          </h2>
          <div className="mt-6">
            <ContactForm variant="rfq" />
          </div>
        </div>
      </Container>
      </section>
    </>
  );
}
