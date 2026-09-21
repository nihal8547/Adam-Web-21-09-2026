/**
 * Project portfolio (case studies). These entries are REPRESENTATIVE
 * placeholders describing the type of work delivered — they contain no real
 * client names and no invented statistics. Replace with real, client-approved
 * case studies before launch (see README "Content to supply before launch").
 *
 * ISR: pages using this data set `revalidate` so a future CMS swap needs no
 * component changes.
 */

export type Project = {
  slug: string;
  title: string;
  sector: string; // filter dimension
  service: string; // filter dimension (service slug label)
  serviceSlug: string;
  location: string;
  summary: string;
  image: string;
  imageAlt: string;
  challenge: string;
  solution: string;
  outcome: string;
  servicesUsed: string[]; // service slugs
  gallery: { src: string; alt: string }[];
};

export const sectors = [
  "Residential",
  "Commercial",
  "Industrial",
  "Warehouse",
  "High-rise",
] as const;

export const projects: Project[] = [
  {
    slug: "residential-tower-fire-protection-al-sadd",
    title: "Residential Tower Fire Protection, Al Sadd",
    sector: "Residential",
    service: "Fire Protection",
    serviceSlug: "fire-protection-services-qatar",
    location: "Al Sadd, Doha",
    summary:
      "Complete fire protection fit-out for a residential tower — detection, sprinklers and pumps, designed and certified to QCDD.",
    image: "/images/project-residential.svg",
    imageAlt:
      "Residential tower in Al Sadd, Doha protected by Adam Technical Services fire systems",
    challenge:
      "A multi-storey residential tower required a fully integrated, QCDD-compliant fire protection system delivered on a tight fit-out programme.",
    solution:
      "We designed and installed an addressable fire alarm system, an NFPA 13 sprinkler system and a fire pump set sized to the building's hydraulic demand, coordinating with the other trades and preparing the Civil Defence submission.",
    outcome:
      "The building achieved Civil Defence approval and was handed over with full documentation and an annual maintenance contract to keep the certificate valid.",
    servicesUsed: [
      "fire-protection-services-qatar",
      "fire-alarm-system-installation-maintenance",
      "fire-sprinkler-system-qatar",
      "fire-fighting-pump-qatar",
    ],
    gallery: [],
  },
  {
    slug: "commercial-office-hvac-west-bay",
    title: "Commercial Office HVAC, West Bay",
    sector: "Commercial",
    service: "HVAC",
    serviceSlug: "hvac-services-qatar",
    location: "West Bay, Doha",
    summary:
      "Chilled-water HVAC and fresh-air systems for a commercial office, engineered for comfort and energy efficiency.",
    image: "/images/project-commercial.svg",
    imageAlt: "Commercial office building in West Bay, Doha served by Adam Technical Services HVAC",
    challenge:
      "An office development needed reliable comfort cooling and healthy fresh-air delivery while controlling running cost in Qatar's climate.",
    solution:
      "We delivered a chilled-water system with AHUs and FCUs, FAHU fresh-air units and BMS-integrated controls, commissioned and air-balanced across the floors.",
    outcome:
      "The building was handed over with stable comfort conditions, efficient operation and a preventive maintenance contract with 24/7 support.",
    servicesUsed: ["hvac-services-qatar", "electrical-services-qatar"],
    gallery: [],
  },
  {
    slug: "warehouse-leak-detection-industrial-area",
    title: "Warehouse Leak Detection, Industrial Area",
    sector: "Warehouse",
    service: "Water Leak Detection",
    serviceSlug: "underground-leakage-detection-system-service-qatar",
    location: "Industrial Area, Doha",
    summary:
      "Non-destructive leak survey that pinpointed a hidden fire-main leak sapping system pressure.",
    image: "/images/project-warehouse.svg",
    imageAlt: "Warehouse in Doha Industrial Area surveyed for underground water leaks",
    challenge:
      "A warehouse's buried fire-fighting main was losing pressure, but the leak's location was unknown and excavation would have been costly and disruptive.",
    solution:
      "Using acoustic sensors and thermal imaging, our specialists located the leak precisely from the surface and marked the exact repair point.",
    outcome:
      "The leak was repaired with minimal excavation, restoring fire-system pressure and avoiding unnecessary disruption to operations.",
    servicesUsed: [
      "underground-leakage-detection-system-service-qatar",
      "fire-fighting-pump-qatar",
    ],
    gallery: [],
  },
  {
    slug: "high-rise-acmv-smoke-control-lusail",
    title: "High-Rise ACMV & Smoke Control, Lusail",
    sector: "High-rise",
    service: "ACMV",
    serviceSlug: "acmv-system-company-in-qatar",
    location: "Lusail",
    summary:
      "Integrated ACMV with car-park ventilation, smoke extraction and stairwell pressurisation for a high-rise development.",
    image: "/images/project-highrise.svg",
    imageAlt:
      "High-rise development in Lusail with ACMV and smoke control by Adam Technical Services",
    challenge:
      "A high-rise required life-safety ventilation — smoke extraction and pressurisation — coordinated with comfort cooling and the building's fire strategy.",
    solution:
      "We designed and installed an integrated ACMV solution covering comfort cooling, car-park ventilation, smoke extraction and stair/lobby pressurisation, coordinated with the fire protection systems.",
    outcome:
      "The life-safety ventilation was commissioned and approved as part of a coordinated fire and mechanical strategy, ready for Civil Defence inspection.",
    servicesUsed: [
      "acmv-system-company-in-qatar",
      "hvac-services-qatar",
      "fire-protection-services-qatar",
    ],
    gallery: [],
  },
  {
    slug: "industrial-facility-fire-alarm-mesaieed",
    title: "Industrial Facility Fire Alarm, Mesaieed",
    sector: "Industrial",
    service: "Fire Alarm System",
    serviceSlug: "fire-alarm-system-installation-maintenance",
    location: "Mesaieed",
    summary:
      "Addressable fire alarm and detection for an industrial facility, integrated with plant systems.",
    image: "/images/project-industrial.svg",
    imageAlt: "Industrial facility in Mesaieed with addressable fire alarm system",
    challenge:
      "An industrial facility needed reliable early detection across large spaces with integration to plant and life-safety systems.",
    solution:
      "We installed an addressable fire alarm system with detection selected per area risk, integrated with suppression, ventilation and shutdown interfaces.",
    outcome:
      "The facility gained fast, precise detection and integrated life-safety response, delivered to NFPA 72 and QCDD requirements.",
    servicesUsed: [
      "fire-alarm-system-installation-maintenance",
      "fire-protection-services-qatar",
      "electrical-services-qatar",
    ],
    gallery: [],
  },
  {
    slug: "commercial-fit-out-passive-fire-msheireb",
    title: "Commercial Fit-out Passive Fire, Msheireb",
    sector: "Commercial",
    service: "Fire Stop Insulation",
    serviceSlug: "fire-stop-insulation-technologies-services-qatar",
    location: "Msheireb, Doha",
    summary:
      "Fire-stop sealing and compartmentation for a commercial fit-out, restoring fire-rated integrity around services.",
    image: "/images/project-fitout.svg",
    imageAlt: "Commercial fit-out in Msheireb, Doha with passive fire protection",
    challenge:
      "A commercial fit-out breached fire compartmentation as new services passed through rated walls and floors.",
    solution:
      "We surveyed every penetration and reinstated compartmentation with tested fire-stop systems, documenting each seal for inspection.",
    outcome:
      "Compartmentation was fully restored and certified, giving the client an auditable passive fire protection record for Civil Defence.",
    servicesUsed: [
      "fire-stop-insulation-technologies-services-qatar",
      "fire-protection-services-qatar",
    ],
    gallery: [],
  },
];

export const projectSlugs = projects.map((p) => p.slug);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
