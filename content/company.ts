/**
 * Reusable marketing copy blocks (home, about, QCDD). Copy is kept short and
 * minimal by design; SEO keywords (QCDD, NFPA, Qatar, service names) are
 * retained. No statistics, certifications or testimonials beyond the brief.
 */

export const hero = {
  eyebrow: "QCDD Approved Contractor · NFPA Compliant Engineering",
  // Keyword-rich H1 targeted to real search intent without "Top" or "Best" fluff
  h1: "QCDD Approved Fire Protection & Underground Leak Detection Contractor in Qatar",
  // Supporting line loaded with high-intent search terms
  sub: "Turnkey Civil Defence approval, automatic fire alarm and sprinkler systems, industrial HVAC, and precision water leak detection across Doha and Qatar.",
  // Descriptive paragraph for life-safety search queries
  body: "QCDD-certified engineers delivering complete life-safety, fire protection, and MEP solutions across Qatar — compliant with NFPA codes and Qatar Civil Defence regulations.",
  primaryCta: { label: "Request a Free Quote", href: "/request-for-quotation" },
  secondaryCta: { label: "Call Now", href: "tel:+97441400922" },
  /**
   * Full-bleed hero background. Set `video` to an .mp4/.webm path in /public to
   * play a muted looping background video; leave it "" to show the poster image
   * only. `poster` is always used as the image fallback / first frame (LCP).
   * Swap these for real assets before launch — no code change needed.
   */
  media: {
    video: "", // e.g. "/videos/hero.mp4"
    poster: "/images/hero-bg.jpg",
    posterAlt: "QCDD approved fire protection and MEP contracting engineers on site in Doha Qatar",
  },
  /** Quick-access credentials bar */
  quickAccess: [
    { icon: "shield", label: "QCDD Approved", sub: "Civil Defence certified contractor", href: "/about-us" },
    { icon: "clock", label: "24/7 Emergency", sub: "Rapid response across Doha", href: "/contact-us" },
    { icon: "grid", label: "1000+ Projects", sub: "Delivered across Qatar", href: "/projects" },
  ],
};

export interface StatItem {
  value?: number;
  text?: string;
  prefix?: string;
  suffix?: string;
  label: string;
}

/** Stat band — 6 key metrics & credentials (no "#1" fluff). */
export const stats: StatItem[] = [
  { text: "QCDD", label: "Civil Defence Approved Contractor" },
  { text: "NFPA", label: "Certified Life Safety Compliance" },
  { text: "24/7", label: "Emergency Breakdown Support in Qatar" },
  { value: 1000, prefix: "", suffix: "+", label: "Completed Fire & MEP Projects" },
  { value: 100, prefix: "", suffix: "+", label: "Certified Engineers & Technicians" },
  { text: "100%", label: "QCDD Inspection Handover Success" },
];

export const whatDrivesUs = {
  eyebrow: "Engineering Capabilities",
  heading: "QCDD Approved Fire Fighting & MEP Contractor in Doha, Qatar",
  body: [
    "Specialized engineering contractor delivering certified Fire Alarm Installation, Fire Fighting Pumps, Automatic Sprinkler Systems, and Acoustic Underground Water Leak Detection across Qatar.",
    "Engineered strictly to NFPA standards and Qatar Civil Defence Department (QCDD) regulations — ensuring seamless government inspections, occupancy approvals, and certified Annual Maintenance Contracts (AMC).",
  ],
};

/** "What Makes Us Better" — 3 high-intent credential cards */
export const whatMakesUsBetter = [
  {
    title: "QCDD Certified Engineers",
    desc: "Qualified engineering specialists for fire fighting systems, HVAC installations, ACMV, and commercial MEP across Qatar.",
    icon: "team",
  },
  {
    title: "Turnkey Life-Safety Solutions",
    desc: "Single-source contractor for design calculations, Civil Defence drawings, equipment supply, installation, testing, and approval.",
    icon: "grid",
  },
  {
    title: "Preventive AMC & 24/7 Response",
    desc: "Scheduled preventive maintenance contracts, mandatory logbook compliance, and 24/7 emergency response throughout Doha.",
    icon: "support",
  },
];

/** Group credibility quote. */
export const groupCredibility =
  'A Building Maintenance and Contracting company under the "Faisal Bin Ejayan Group And Partners" in Qatar — one of the group\'s pioneer establishments.';

export const qcddBand = {
  eyebrow: "Civil Defence Compliance",
  heading: "Qatar Civil Defence Department (QCDD) License Renewal in Qatar",
  body: "Complete QCDD license renewal services across Doha — site inspection, defect rectification, testing certificates, and official Civil Defence submission so your facility stays fully compliant.",
  cta: { label: "Know More", href: "/qatar-civil-defence-department" },
};

/** Two alternating feature blocks on the home page. */
export const homeFeatureBlocks = [
  {
    eyebrow: "Commercial HVAC",
    heading: "Commercial HVAC & Chilled Water Systems in Qatar",
    body: [
      "Design, supply, installation, and maintenance of VRF, chilled-water plants, and FAHU systems tailored for Qatar's high ambient temperatures.",
      "Precision climate engineering, ductwork installation, and 24/7 emergency repair services for commercial, industrial, and high-rise facilities in Doha.",
    ],
    bullets: ["VRF & VRV Multi-Split Systems", "Chilled Water Plant & Piping", "FAHU, AHU & Fresh Air Systems", "24/7 HVAC AMC & Emergency Service"],
    cta: { label: "Explore HVAC", href: "/hvac-services-qatar" },
    image: "/images/feature-hvac.svg",
    imageAlt: "Commercial HVAC chilled-water plant room installed and maintained by Adam Technical Services in Qatar",
  },
  {
    eyebrow: "Pipeline Leak Detection",
    heading: "Underground Water Leak Detection Contractor in Qatar",
    body: [
      "Non-destructive acoustic frequency sensors and thermal imaging to locate concealed leaks in buried fire fighting mains, municipal supply lines, and commercial plumbing networks across Qatar.",
      "Pinpoint depth and position analysis preventing pressure loss, pump cycling, foundation damage, and unnecessary excavation costs.",
    ],
    bullets: [
      "Electro-Acoustic Ground Microphones",
      "Thermal Infrared Pipeline Imaging",
      "Non-Destructive No-Dig Pinpointing",
      "Fire Water Line & Potable Mains",
    ],
    cta: {
      label: "Explore Leak Detection",
      href: "/underground-leakage-detection-system-service-qatar",
    },
    image: "/images/feature-leak.svg",
    imageAlt:
      "Technician performing underground water leak detection with acoustic equipment in Doha Qatar",
  },
];

/** About page content. */
export const about = {
  hero: {
    eyebrow: "About Adam Technical Services",
    heading: "QCDD Approved Fire Protection & MEP Engineering in Qatar",
    body: "A certified fire protection and MEP engineering contractor in Doha, Qatar — engineering life safety, HVAC, and mechanical systems that guarantee total Civil Defence compliance.",
  },
  story: {
    heading: "Our Engineering Heritage",
    body: [
      "Founded in Qatar to bring certified engineering rigour, safety excellence, and accountability to fire protection and building services across Doha.",
      'Operating under the prestigious "Faisal Bin Ejayan Group And Partners", delivering turnkey MEP, HVAC, and Civil Defence approved life-safety infrastructure.',
    ],
  },
  mission: {
    heading: "Our Engineering Mission",
    body: "Protect lives, commercial assets, and industrial infrastructure across Qatar through precision engineering, NFPA compliance, certified equipment, and dependable 24/7 emergency support.",
  },
  vision: {
    heading: "Our Strategic Vision",
    body: "To be Qatar's recognized engineering partner of choice for certified fire protection, HVAC, ACMV, and multi-disciplinary MEP contracting.",
  },
};

/** About "Why Choose Us" 8-item accordion → also FAQPage schema. */
export const whyChooseUs = [
  {
    q: "Are you QCDD certified?",
    a: "Yes — a QCDD-certified contractor qualified to design, install and certify fire protection systems to Qatar Civil Defence requirements.",
  },
  {
    q: "What services do you provide?",
    a: "Fire protection, fire alarms, fire fighting pumps, sprinklers, fire stop insulation, underground water leak detection, HVAC, ACMV and electrical.",
  },
  {
    q: "Do you offer annual maintenance contracts?",
    a: "Yes — AMCs covering inspection, testing, certification and 24/7 emergency support.",
  },
  {
    q: "Which standards do you work to?",
    a: "NFPA standards and QCDD requirements, using UL/FM-listed equipment.",
  },
  {
    q: "Do you handle QCDD license renewals?",
    a: "Yes — Civil Defence renewals end to end: inspection, documentation, remediation and submission.",
  },
  {
    q: "What areas do you serve?",
    a: "Doha and across Qatar — residential, commercial, industrial and high-rise projects.",
  },
  {
    q: "Can you locate hidden water leaks?",
    a: "Yes — acoustic sensors and thermal imaging pinpoint leaks in fire and potable lines without digging.",
  },
  {
    q: "How quickly can you respond to emergencies?",
    a: "Clients on active maintenance contracts get 24/7 emergency response across Qatar.",
  },
];

/** Services hub 4-step process strip. */
export const servicesProcess = [
  {
    title: "Consultation",
    desc: "Site, risk and requirements assessed against QCDD and NFPA standards.",
  },
  {
    title: "Design",
    desc: "Engineering, calculations and drawings for Civil Defence approval.",
  },
  {
    title: "Installation",
    desc: "Certified technicians install, test and commission with UL/FM-listed equipment.",
  },
  {
    title: "AMC & Support",
    desc: "Annual maintenance and 24/7 emergency response keep you compliant.",
  },
];

/** Contact page "International: Our Standard Way of Working" trio. */
export const internationalWorking = {
  eyebrow: "International",
  heading: "Our Standard Way of Working",
  items: [
    {
      title: "Global delivery strategy",
      desc: "An engineering-led approach that scales from one system to a full building programme.",
    },
    {
      title: "Diverse time zones",
      desc: "Coordinated across time zones to keep projects moving.",
    },
    {
      title: "Efficient project delivery",
      desc: "Clear scopes, documented milestones, accountable handover — on time.",
    },
  ],
};

/** QCDD page content. */
export const qcddPage = {
  intro: [
    "The Qatar Civil Defence Department (QCDD) requires a valid fire safety certificate, renewed on schedule. We manage the whole QCDD license renewal so your building stays compliant and open.",
    "As a QCDD-certified contractor, we know exactly what Civil Defence expects — and handle it for you.",
  ],
  checklist: [
    "Current fire safety certificate and building details",
    "Fire alarm system inspection and test records",
    "Fire fighting pump and sprinkler test certificates",
    "Passive fire protection / fire-stop documentation",
    "Emergency lighting and signage verification",
    "Maintenance (AMC) records and rectification of any defects",
  ],
  timeline: [
    {
      title: "Assessment",
      desc: "We review certificate status, systems and documentation to scope the renewal.",
    },
    {
      title: "Inspection & Testing",
      desc: "We inspect and test fire systems and identify non-compliances.",
    },
    {
      title: "Remediation",
      desc: "We correct defects and meet current QCDD requirements.",
    },
    {
      title: "Documentation & Submission",
      desc: "We compile the records and submit the renewal to Civil Defence.",
    },
  ],
  faqs: [
    {
      q: "What is QCDD license renewal?",
      a: "Periodic renewal of your building's fire safety certificate with the Qatar Civil Defence Department, confirming systems are compliant and maintained.",
    },
    {
      q: "How often must I renew?",
      a: "Certificates run for a fixed term and must be renewed before they expire; we track this and manage it for you.",
    },
    {
      q: "What happens if my certificate lapses?",
      a: "An expired certificate can halt operations and create liability. We renew on time and rectify blocking issues.",
    },
    {
      q: "Can you fix issues found during inspection?",
      a: "Yes — we remediate alarm, pump, sprinkler and fire-stopping defects, then re-test before submission.",
    },
    {
      q: "Do I need a maintenance contract?",
      a: "An AMC keeps systems compliant year-round and keeps the test records QCDD requires already in place.",
    },
  ],
};
