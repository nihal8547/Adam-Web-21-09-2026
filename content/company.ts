/**
 * Reusable marketing copy blocks (home, about, QCDD). Copy is kept short and
 * minimal by design; SEO keywords (QCDD, NFPA, Qatar, service names) are
 * retained. No statistics, certifications or testimonials beyond the brief.
 */

export const hero = {
  eyebrow: "",
  // Keyword-rich H1 kept for SEO even though the hero reads short/minimal.
  h1: "Top Fire Protection & Leak Detection Services in Qatar",
  // Short supporting line (NAFFCO-style minimal hero copy).
  sub: "Fire · HVAC · ACMV · MEP — engineered to NFPA standards.",
  // Longer descriptive paragraph — moved out of the hero into the About band
  // below so the hero stays minimal and the background stays visible.
  body: "QCDD-certified engineers protecting people and property across Qatar — from underground leak detection to complete fire protection systems.",
  primaryCta: { label: "Get Started", href: "/request-for-quotation" },
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
    posterAlt: "Adam Technical Services fire protection and MEP engineers on site in Doha, Qatar",
  },
  /** Gold quick-access bar riding the bottom of the hero (NAFFCO motif). */
  quickAccess: [
    { icon: "shield", label: "QCDD Certified", sub: "Civil Defence approved", href: "/about-us" },
    { icon: "clock", label: "24/7 Emergency", sub: "Rapid response in Qatar", href: "/contact-us" },
    { icon: "grid", label: "1000+ Projects", sub: "Delivered across Doha", href: "/projects" },
  ],
};

export interface StatItem {
  value?: number;
  text?: string;
  prefix?: string;
  suffix?: string;
  label: string;
}

/** Stat band — 6 key metrics & credentials. */
export const stats: StatItem[] = [
  { value: 1, prefix: "#", suffix: "", label: "Qatar firm for safety" },
  { text: "QCDD", label: "Civil Defence approved" },
  { text: "24/7", label: "Emergency response" },
  { value: 1000, prefix: "", suffix: "+", label: "Successful projects" },
  { value: 100, prefix: "", suffix: "+", label: "Qualified employees" },
  { text: "100%", label: "NFPA compliant" },
];

export const whatDrivesUs = {
  eyebrow: "What Drives Us",
  heading: "Trusted Fire Protection Company in Qatar",
  body: [
    "QCDD-certified specialists in Fire Alarm Systems, Fire Fighting Pumps, Sprinkler Systems and Underground Water Leak Detection.",
    "Correct design, certified equipment, documented maintenance — every system passes Civil Defence inspection.",
  ],
};

/** "What Makes Us Better" — 3 cards (brief §4 Home ⁵). */
export const whatMakesUsBetter = [
  {
    title: "Expert Team",
    desc: "QCDD-certified engineers across fire protection, HVAC, ACMV and MEP in Qatar.",
    icon: "team",
  },
  {
    title: "Comprehensive Coverage",
    desc: "Fire alarms, pumps, sprinklers, leak detection, HVAC and electrical — one accountable partner.",
    icon: "grid",
  },
  {
    title: "Reliable Support",
    desc: "Annual maintenance contracts and 24/7 emergency response keep systems compliant.",
    icon: "support",
  },
];

/** Group credibility quote. */
export const groupCredibility =
  'A Building Maintenance and Contracting company under the "Faisal Bin Ejayan Group And Partners" in Qatar — one of the group\'s pioneer establishments.';

export const qcddBand = {
  eyebrow: "QCDD License Renewal",
  heading: "Qatar Civil Defence License Renewal Made Simple",
  body: "We manage QCDD license renewals end to end — inspection, documentation, remediation and submission — so your fire safety certificate stays valid.",
  cta: { label: "Know More", href: "/qatar-civil-defence-department" },
};

/** Two alternating feature blocks on the home page. */
export const homeFeatureBlocks = [
  {
    eyebrow: "HVAC",
    heading: "Expert HVAC Company in Qatar",
    body: [
      "VRF, chilled-water and FAHU systems designed, installed and maintained for Qatar's climate.",
      "24/7 maintenance and smart controls for reliable, efficient performance.",
    ],
    bullets: ["VRF & VRV systems", "Chilled water plant", "FAHU & ventilation", "24/7 maintenance"],
    cta: { label: "Explore HVAC", href: "/hvac-services-qatar" },
    image: "/images/feature-hvac.svg",
    imageAlt: "HVAC chilled-water plant room maintained by Adam Technical Services in Qatar",
  },
  {
    eyebrow: "Leak Detection",
    heading: "Expert Water Leak Detection Services",
    body: [
      "Hidden leaks located in fire-fighting and potable water lines with acoustic sensors and thermal imaging — no-dig, non-destructive.",
      "Exact leak location for targeted repairs that protect supply, pressure and property.",
    ],
    bullets: [
      "Acoustic sensors",
      "Thermal imaging",
      "No-dig, non-destructive",
      "Fire-line & potable lines",
    ],
    cta: {
      label: "Explore Leak Detection",
      href: "/underground-leakage-detection-system-service-qatar",
    },
    image: "/images/feature-leak.svg",
    imageAlt:
      "Technician performing underground water leak detection with acoustic equipment in Doha",
  },
];

/** About page content. */
export const about = {
  hero: {
    eyebrow: "Who We Are",
    heading: "Engineering excellence for a safer Qatar.",
    body: "A QCDD-certified fire protection and MEP contractor in Doha, Qatar — keeping buildings safe, comfortable and compliant.",
  },
  story: {
    heading: "Our Story",
    body: [
      "Founded by Qatari and Indian entrepreneurs to bring engineering rigour to fire protection and building services in Qatar.",
      'A Building Maintenance and Contracting company under the "Faisal Bin Ejayan Group And Partners", focused on life safety and MEP.',
    ],
  },
  mission: {
    heading: "Our Mission",
    body: "Protect people and property across Qatar with fire and building systems designed correctly, installed with certified equipment and maintained reliably.",
  },
  vision: {
    heading: "Our Vision",
    body: "To be Qatar's most trusted partner for fire protection, HVAC, ACMV and MEP.",
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
