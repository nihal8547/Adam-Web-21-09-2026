/**
 * Careers content — culture + open roles. Roles are REPRESENTATIVE openings
 * reflecting the company's disciplines; confirm/replace with live vacancies
 * before launch (see README).
 */

export type Role = {
  slug: string;
  title: string;
  department: string;
  type: string; // employment type
  location: string;
  summary: string;
  datePosted: string; // ISO
  responsibilities: string[];
  requirements: string[];
};

export const culture = {
  eyebrow: "Careers",
  heading: "Build a Safer Qatar With Us",
  body: [
    "At Adam Technical Services we take pride in engineering that protects people and property. We invest in our people, work to the highest standards, and give our team the training and responsibility to do their best work.",
    "If you are an engineer, technician or professional who values quality, safety and integrity, we would like to hear from you.",
  ],
  values: [
    { title: "Safety first", desc: "We hold ourselves to the standards we design and install." },
    {
      title: "Engineering excellence",
      desc: "We do the calculations, follow the code and document our work.",
    },
    { title: "Dependability", desc: "We show up, respond 24/7 and stand behind what we deliver." },
  ],
};

export const roles: Role[] = [
  {
    slug: "fire-protection-engineer",
    title: "Fire Protection Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Doha, Qatar",
    summary:
      "Design fire protection systems — detection, sprinklers and pumps — to NFPA and QCDD requirements, and support Civil Defence approvals.",
    datePosted: "2026-08-20",
    responsibilities: [
      "Prepare fire protection designs, calculations and drawings",
      "Coordinate submissions and approvals with the QCDD",
      "Support installation, testing and commissioning on site",
    ],
    requirements: [
      "Degree in mechanical, fire or building services engineering",
      "Experience with NFPA standards and QCDD approvals",
      "Strong coordination and documentation skills",
    ],
  },
  {
    slug: "hvac-technician",
    title: "HVAC Technician",
    department: "Operations",
    type: "Full-time",
    location: "Doha, Qatar",
    summary:
      "Install and maintain VRF, chilled-water and ventilation systems and provide preventive and emergency HVAC service.",
    datePosted: "2026-08-20",
    responsibilities: [
      "Install, service and troubleshoot HVAC equipment",
      "Carry out preventive maintenance and respond to breakdowns",
      "Record works and support commissioning and balancing",
    ],
    requirements: [
      "Diploma or trade qualification in HVAC/refrigeration",
      "Hands-on experience with VRF and chilled-water systems",
      "Valid Qatar driving licence preferred",
    ],
  },
  {
    slug: "fire-alarm-service-technician",
    title: "Fire Alarm Service Technician",
    department: "Operations",
    type: "Full-time",
    location: "Doha, Qatar",
    summary:
      "Install, test and maintain addressable and conventional fire alarm systems and support 24/7 emergency response.",
    datePosted: "2026-08-20",
    responsibilities: [
      "Install and commission fire alarm panels and devices",
      "Perform scheduled testing and certification",
      "Diagnose and rectify faults, including on emergency call-out",
    ],
    requirements: [
      "Experience with Honeywell, Simplex or Shield systems",
      "Knowledge of NFPA 72 and QCDD requirements",
      "Willingness to participate in the 24/7 rota",
    ],
  },
];

export const roleSlugs = roles.map((r) => r.slug);
export const getRole = (slug: string) => roles.find((r) => r.slug === slug);
