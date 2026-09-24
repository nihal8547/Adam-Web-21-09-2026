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
            { name: "heroEyebrow", type: "text", defaultValue: "Our Expertise" },
            { name: "heroHeading", type: "text", required: true, defaultValue: "Complete Fire Protection & MEP Solutions" },
            { name: "heroDescription", type: "textarea", required: true, defaultValue: "From life-safety fire systems to advanced HVAC and electrical infrastructures, we engineer solutions that ensure total compliance, safety, and operational excellence across Qatar." },
          ],
        },
        {
          label: "Process Section",
          fields: [
            { name: "processEyebrow", type: "text", defaultValue: "Process Overview" },
            { name: "processHeading", type: "text", defaultValue: "Our Signature Methodology" },
          ],
        },
      ],
    },
  ],
};
