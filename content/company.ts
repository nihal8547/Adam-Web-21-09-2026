/**
 * Reusable marketing copy blocks (home, about, QCDD). Kept verbatim from the
 * project brief where the brief supplied "source copy". No statistics,
 * certifications or testimonials beyond those in the brief.
 */

export const hero = {
  eyebrow: "Fire Protection · HVAC · ACMV · MEP",
  h1: "Top Fire Protection & Leak Detection Services in Qatar",
  sub: "Redefining Technical Excellence in Fire Protection, HVAC & ACMV Systems in Qatar",
  body: "From hidden underground leaks to complete fire protection systems, we safeguard people and property across Qatar. Our specialists locate leaks in fire-fighting and potable water lines using acoustic sensors and thermal imaging — non-destructive, no-dig, and precise — while our QCDD-certified engineers design, install and maintain the systems that keep your building safe.",
  primaryCta: { label: "Get Started", href: "/request-for-quotation" },
  secondaryCta: { label: "Call Now", href: "tel:+97441400922" },
};

/** Stat band — figures taken directly from the brief (§4 Home ³). */
export const stats = [
  { value: 1, prefix: "#", suffix: "", label: "Qatar firm for safety" },
  { value: 100, prefix: "", suffix: "+", label: "Employees" },
  { value: 1000, prefix: "", suffix: "+", label: "Successful projects" },
];

export const whatDrivesUs = {
  eyebrow: "What Drives Us",
  heading: "Trusted Fire Protection Company in Qatar",
  body: [
    "Adam Technical Services is a trusted name in fire safety across Qatar. Our QCDD-certified team designs, installs and maintains Fire Alarm Systems, Fire Fighting Pumps and Sprinkler Systems — and pinpoints hidden leaks with our Underground Water Leak Detection service.",
    "We bring engineering discipline to life safety: correct design, certified equipment and documented maintenance, so every system passes Civil Defence inspection and performs when it matters.",
  ],
};

/** "What Makes Us Better" — 3 cards (brief §4 Home ⁵). */
export const whatMakesUsBetter = [
  {
    title: "Expert Team",
    desc: "A QCDD-certified team of engineers and technicians with deep experience in fire protection, HVAC, ACMV and MEP across Qatar.",
    icon: "team",
  },
  {
    title: "Comprehensive Coverage",
    desc: "From fire alarms, pumps and sprinklers to leak detection, HVAC and electrical — a single accountable partner for your whole building.",
    icon: "grid",
  },
  {
    title: "Reliable Support",
    desc: "Annual maintenance contracts and 24/7 emergency response keep your systems compliant, dependable and ready.",
    icon: "support",
  },
];

/** Group credibility quote (brief §4 Home ⁶ — verbatim). */
export const groupCredibility =
  'Adam Technical Services is a Building Maintenance and Contracting company under the "Faisal Bin Ejayan Group And Partners" in Qatar, one of the group\'s pioneer establishments, officially registered as a Building Maintenance and Contracting firm.';

export const qcddBand = {
  eyebrow: "QCDD License Renewal",
  heading: "Qatar Civil Defence License Renewal Made Simple",
  body: "Keep your building compliant without the paperwork burden. We manage QCDD (Qatar Civil Defence Department) license renewals end to end — inspection, documentation, remediation and submission — so your fire safety certificate stays valid and your operations stay open.",
  cta: { label: "Know More", href: "/qatar-civil-defence-department" },
};

/** Two alternating feature blocks on the home page. */
export const homeFeatureBlocks = [
  {
    eyebrow: "HVAC",
    heading: "Expert HVAC Company in Qatar",
    body: [
      "We design, install and maintain VRF, chilled-water and FAHU systems that keep buildings cool, healthy and efficient in Qatar's demanding climate.",
      "With 24/7 maintenance and smart controls, your HVAC performs reliably and economically all year round.",
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
      "Our specialists locate hidden leaks in fire-fighting and potable water lines using acoustic sensors and thermal imaging — non-destructive and no-dig.",
      "We pinpoint the exact leak location so repairs are targeted, protecting your water supply, your fire system's pressure and your property.",
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
    heading: "Empowering global innovations through exceptional engineering design.",
    body: "Adam Technical Services is a QCDD-certified fire protection and MEP contractor based in Doha, Qatar — trusted by developers, facilities teams and industry to keep buildings safe, comfortable and compliant.",
  },
  story: {
    heading: "Our Story",
    body: [
      "Founded by Qatari and Indian entrepreneurs and serving Doha and the wider country, Adam Technical Services was established to bring engineering rigour and dependable service to fire protection and building services in Qatar.",
      'As a Building Maintenance and Contracting company under the "Faisal Bin Ejayan Group And Partners", we combine the backing of one of the group\'s pioneer establishments with a specialist focus on life safety and MEP.',
    ],
  },
  mission: {
    heading: "Our Mission",
    body: "To protect people and property across Qatar with fire protection and building services engineered to the highest standards — designed correctly, installed with certified equipment, and maintained reliably.",
  },
  vision: {
    heading: "Our Vision",
    body: "To be Qatar's most trusted partner for fire protection, HVAC, ACMV and MEP — known for engineering excellence, compliance and 24/7 dependability.",
  },
};

/** About "Why Choose Us" 8-item accordion → also FAQPage schema. */
export const whyChooseUs = [
  {
    q: "Are you QCDD certified?",
    a: "Yes. Adam Technical Services is a QCDD-certified contractor, qualified to design, install and certify fire protection systems to Qatar Civil Defence Department requirements.",
  },
  {
    q: "What services do you provide?",
    a: "Fire protection, fire alarm systems, fire fighting pumps, sprinkler systems, fire stop insulation, underground water leak detection, HVAC, ACMV and electrical services — a complete life-safety and MEP capability.",
  },
  {
    q: "Do you offer annual maintenance contracts?",
    a: "Yes. We provide tailored AMCs covering inspection, testing, certification and 24/7 emergency support so your systems stay compliant and dependable.",
  },
  {
    q: "Which standards do you work to?",
    a: "We design and install to NFPA standards and QCDD requirements, using UL/FM-listed equipment throughout.",
  },
  {
    q: "Do you handle QCDD license renewals?",
    a: "Yes. We manage Civil Defence license renewals end to end — inspection, documentation, remediation and submission — so your certificate stays valid.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve Doha and the wider Qatar, working on residential, commercial, industrial and high-rise projects.",
  },
  {
    q: "Can you locate hidden water leaks?",
    a: "Yes. Our specialists use acoustic sensors and thermal imaging to pinpoint leaks in fire-fighting and potable water lines without digging.",
  },
  {
    q: "How quickly can you respond to emergencies?",
    a: "Clients on active maintenance contracts benefit from our 24/7 emergency response team across Qatar.",
  },
];

/** Services hub 4-step process strip. */
export const servicesProcess = [
  {
    title: "Consultation",
    desc: "We assess your site, risk and requirements against QCDD and NFPA standards.",
  },
  {
    title: "Design",
    desc: "Detailed engineering, calculations and drawings prepared for Civil Defence approval.",
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
      desc: "A structured, engineering-led approach that scales from a single system to a full building programme.",
    },
    {
      title: "Diverse time zones",
      desc: "We coordinate across time zones to keep projects moving and stakeholders aligned.",
    },
    {
      title: "Efficient project delivery",
      desc: "Clear scopes, documented milestones and accountable handover — delivered on time.",
    },
  ],
};

/** QCDD page content. */
export const qcddPage = {
  intro: [
    "The Qatar Civil Defence Department (QCDD) requires buildings to hold a valid fire safety certificate, renewed on schedule. Letting it lapse can halt operations and expose you to liability. Adam Technical Services manages the whole QCDD license renewal process so your building stays compliant and open.",
    "As a QCDD-certified contractor, we know exactly what Civil Defence expects — from system inspection to documentation and submission — and we handle it for you.",
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
      desc: "We review your certificate status, systems and documentation to scope the renewal.",
    },
    {
      title: "Inspection & Testing",
      desc: "We inspect and test fire systems and identify any non-compliances to rectify.",
    },
    {
      title: "Remediation",
      desc: "We correct defects and bring systems up to current QCDD requirements.",
    },
    {
      title: "Documentation & Submission",
      desc: "We compile the required records and submit the renewal to Civil Defence.",
    },
  ],
  faqs: [
    {
      q: "What is QCDD license renewal?",
      a: "It is the periodic renewal of your building's fire safety certificate with the Qatar Civil Defence Department, confirming your fire protection systems are compliant and maintained.",
    },
    {
      q: "How often must I renew?",
      a: "Certificates are issued for a fixed term and must be renewed before they expire; we track this and manage the renewal on your behalf.",
    },
    {
      q: "What happens if my certificate lapses?",
      a: "An expired certificate can halt operations and create liability. We help you renew on time and rectify any issues that would block approval.",
    },
    {
      q: "Can you fix issues found during inspection?",
      a: "Yes. We remediate defects — from alarm faults to pump or sprinkler issues and fire-stopping — and re-test before submission.",
    },
    {
      q: "Do I need a maintenance contract?",
      a: "An AMC keeps your systems compliant year-round and makes renewal straightforward, with the test records QCDD requires already in place.",
    },
  ],
};
