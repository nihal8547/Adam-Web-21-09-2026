import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service | Adam Technical Services",
  description:
    "The terms governing your use of the Adam Technical Services website and the information provided on it.",
  path: "/terms-of-service",
  noindex: true,
});

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      path="/terms-of-service"
      updated="21 September 2026"
      intro={`These Terms of Service govern your use of the ${site.legalName} website. By using this website, you agree to these terms. This is a template to be reviewed by your legal advisor before launch.`}
      sections={[
        {
          heading: "Use of the website",
          paragraphs: [
            "This website and its content are provided for general information about our services. You agree to use the website lawfully and not to misuse it or attempt to disrupt its operation.",
          ],
        },
        {
          heading: "No warranty",
          paragraphs: [
            "While we take care to keep the information on this website accurate and current, it is provided without warranties of any kind. Nothing on this website constitutes a binding quotation or professional advice until confirmed in writing by us.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            `All content on this website, including text, graphics and logos, is the property of ${site.legalName} or its licensors and may not be reproduced without permission.`,
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "To the fullest extent permitted by law, we are not liable for any loss arising from your use of, or reliance on, this website or its content.",
          ],
        },
        {
          heading: "Contact us",
          paragraphs: [
            `For any questions about these terms, contact us at ${site.email} or ${site.phone.display}.`,
          ],
        },
      ]}
    />
  );
}
