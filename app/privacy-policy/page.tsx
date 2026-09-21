import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Adam Technical Services",
  description:
    "How Adam Technical Services collects, uses and protects your personal information when you use our website or contact us.",
  path: "/privacy-policy",
  noindex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      path="/privacy-policy"
      updated="21 September 2026"
      intro={`This Privacy Policy explains how ${site.legalName} ("we", "us") collects, uses and protects the personal information you provide through this website. This is a template to be reviewed by your legal advisor before launch.`}
      sections={[
        {
          heading: "Information we collect",
          paragraphs: [
            "We collect information you voluntarily provide through our contact, quotation and careers forms — such as your name, email address, phone number, message and any CV you upload.",
            "We may also collect limited technical information (such as anonymised usage data) to operate and improve the website.",
          ],
        },
        {
          heading: "How we use your information",
          paragraphs: [
            "We use your information to respond to your enquiries, prepare quotations, consider job applications, and provide the services you request.",
            "We do not sell your personal information. We only share it with service providers who help us operate (for example, email delivery) and only as necessary.",
          ],
        },
        {
          heading: "Data retention",
          paragraphs: [
            "We keep your information only for as long as necessary to fulfil the purposes described here or as required by law.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            `You may request access to, correction of, or deletion of your personal information by contacting us at ${site.email}.`,
          ],
        },
        {
          heading: "Contact us",
          paragraphs: [
            `If you have any questions about this Privacy Policy, contact us at ${site.email} or ${site.phone.display}.`,
          ],
        },
      ]}
    />
  );
}
