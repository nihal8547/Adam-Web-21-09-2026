import type { GlobalConfig } from "payload";

export const ServicesPage: GlobalConfig = {
  slug: "services-page",
  label: "Services Page",
  admin: { group: "Pages" },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero Section",
          fields: [
            { name: "heroEyebrow", type: "text", defaultValue: "QCDD Approved Contractor · NFPA Compliant" },
            { name: "heroHeading", type: "text", required: true, defaultValue: "Fire Protection, MEP Engineering & Leak Detection Services in Qatar" },
            { name: "heroDescription", type: "textarea", required: true, defaultValue: "Turnkey Qatar Civil Defence Department (QCDD) approved fire alarm installation, automatic sprinkler systems, fire pumps, underground pipe leak detection, and commercial HVAC engineering across Doha and Qatar." },
          ],
        },
        {
          label: "Process Section",
          fields: [
            { name: "processEyebrow", type: "text", defaultValue: "Execution Methodology" },
            { name: "processHeading", type: "text", defaultValue: "QCDD-Compliant Engineering & Handover Process" },
          ],
        },
      ],
    },
  ],
};
