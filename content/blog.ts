/**
 * Blog posts. Educational articles in the brand voice supporting the SEO
 * clusters. Bodies are Markdown-lite (paragraphs + h2 via ## + bullet -).
 * ISR-backed. Replace/extend freely; a future CMS swap needs no component
 * changes.
 */

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  author: string;
  datePublished: string; // ISO
  readingMinutes: number;
  image: string;
  imageAlt: string;
  /** Section blocks: heading (h2) + paragraphs. */
  body: { heading: string; paragraphs: string[] }[];
};

export const blogCategories = [
  "Fire Safety",
  "HVAC & ACMV",
  "Compliance",
  "Leak Detection",
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "choosing-fire-alarm-system-qatar",
    title: "How to Choose the Right Fire Alarm System in Qatar",
    metaTitle: "Choosing a Fire Alarm System in Qatar",
    metaDescription:
      "Addressable vs conventional fire alarm systems in Qatar — how to choose the right one for your building and stay QCDD compliant.",
    excerpt:
      "Addressable or conventional? A practical guide to choosing a QCDD-compliant fire alarm system for your building in Qatar.",
    category: "Fire Safety",
    author: "Adam Technical Services",
    datePublished: "2026-08-18",
    readingMinutes: 5,
    image: "/images/blog-fire-alarm.svg",
    imageAlt: "Addressable fire alarm control panel installed in a building in Qatar",
    body: [
      {
        heading: "Why the right fire alarm system matters",
        paragraphs: [
          "A fire alarm system is the earliest warning a building has. The right system detects fire quickly, tells occupants and responders exactly where it is, and integrates with the building's other life-safety systems. In Qatar, it must also satisfy the Qatar Civil Defence Department (QCDD) and be designed to NFPA 72.",
        ],
      },
      {
        heading: "Addressable vs conventional",
        paragraphs: [
          "Conventional systems divide a building into zones. When a device activates, the panel shows the zone — useful in small buildings but imprecise in large ones. Addressable systems identify the exact device in alarm, which speeds up response and is the norm for larger and high-rise buildings.",
          "The right choice depends on building size, layout and risk. An over-specified system wastes budget; an under-specified one slows response. A QCDD-certified contractor will classify your building and recommend accordingly.",
        ],
      },
      {
        heading: "What to look for",
        paragraphs: [
          "Choose UL/FM-listed equipment from trusted brands, insist on integration with sprinklers, dampers, lifts and BMS, and make sure the installer provides QCDD-compliant design, commissioning and a maintenance contract. Maintenance is not optional — routine testing keeps the system dependable and the certificate valid.",
        ],
      },
    ],
  },
  {
    slug: "underground-water-leak-detection-explained",
    title: "Underground Water Leak Detection Explained",
    metaTitle: "Underground Water Leak Detection in Qatar",
    metaDescription:
      "How acoustic sensors and thermal imaging locate underground water leaks in Qatar — no-dig, non-destructive, precise.",
    excerpt:
      "How acoustic sensors and thermal imaging find hidden leaks in fire and potable water lines — without digging.",
    category: "Leak Detection",
    author: "Adam Technical Services",
    datePublished: "2026-07-30",
    readingMinutes: 4,
    image: "/images/blog-leak.svg",
    imageAlt: "Technician using acoustic equipment to detect an underground water leak",
    body: [
      {
        heading: "The hidden cost of underground leaks",
        paragraphs: [
          "Underground leaks waste water, inflate bills and quietly undermine structures. In fire-fighting lines they are especially dangerous: a buried leak can rob the system of the pressure it needs on the day of a fire.",
        ],
      },
      {
        heading: "How non-destructive detection works",
        paragraphs: [
          "Acoustic detection uses sensitive ground microphones and correlators to hear the sound of water escaping a pressurised pipe. Thermal imaging reveals the temperature anomalies a leak creates near the surface. Together they pinpoint the leak precisely — from the surface, without digging.",
        ],
      },
      {
        heading: "Why no-dig matters",
        paragraphs: [
          "Traditional leak-finding meant excavating until you found the pipe. Non-destructive detection limits excavation to the exact repair point, saving time and cost and protecting landscaping, paving and structures. You also get a clear report with the leak location and remediation guidance.",
        ],
      },
    ],
  },
  {
    slug: "qcdd-license-renewal-guide-qatar",
    title: "A Simple Guide to QCDD License Renewal in Qatar",
    metaTitle: "QCDD License Renewal Guide — Qatar",
    metaDescription:
      "What QCDD license renewal involves in Qatar, the documents you need and how to keep your fire safety certificate valid.",
    excerpt:
      "What Civil Defence license renewal involves, the documents you need, and how to stay compliant without the paperwork burden.",
    category: "Compliance",
    author: "Adam Technical Services",
    datePublished: "2026-07-05",
    readingMinutes: 4,
    image: "/images/blog-qcdd.svg",
    imageAlt: "QCDD fire safety compliance documentation for a building in Qatar",
    body: [
      {
        heading: "What QCDD renewal is",
        paragraphs: [
          "The Qatar Civil Defence Department issues fire safety certificates that must be renewed before they expire. The renewal confirms your fire protection systems are compliant, tested and maintained. Letting the certificate lapse can halt operations and create liability.",
        ],
      },
      {
        heading: "What you need",
        paragraphs: [
          "Renewal typically requires your current certificate and building details, inspection and test records for alarms, pumps and sprinklers, passive fire protection documentation, emergency lighting verification and up-to-date maintenance records with any defects rectified.",
        ],
      },
      {
        heading: "Making it simple",
        paragraphs: [
          "A QCDD-certified contractor can manage the whole process — assessment, inspection and testing, remediation, documentation and submission. An annual maintenance contract keeps the required records current so renewal is straightforward year after year.",
        ],
      },
    ],
  },
];

export const blogSlugs = blogPosts.map((p) => p.slug);
export const getBlogPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
