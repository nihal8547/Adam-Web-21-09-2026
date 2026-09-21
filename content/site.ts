/**
 * Single source of truth for company-wide data (NAP, nav, socials).
 * Typed so it can later be swapped for a headless CMS without touching
 * components. Change the business data here and it updates sitewide.
 */

export const site = {
  legalName: "Adam Technical Services",
  shortName: "Adam Technical Services",
  group: "Faisal Bin Ejayan Group And Partners",
  tagline: "Redefining Technical Excellence in Fire Protection, HVAC & ACMV Systems in Qatar",
  description:
    "QCDD-certified fire protection and MEP contractor in Doha, Qatar — fire alarm systems, fire fighting pumps, sprinkler systems, underground water leak detection, HVAC, ACMV and electrical services.",

  // Contact — VERIFIED business data (see project brief §5).
  email: "info@adam.qa",
  phone: {
    display: "+974 4140 0922",
    href: "tel:+97441400922",
  },
  mobile: {
    display: "+974 7075 5220",
    href: "tel:+97470755220",
  },
  whatsapp: {
    display: "+974 7075 5220",
    // wa.me expects digits only, no + or spaces.
    href: "https://wa.me/97470755220",
  },
  fax: "+974 4142 2911",

  /**
   * IMPORTANT (brief §5): the legacy site's map embed points to a DIFFERENT
   * address ("Office 207, 2nd Floor, Retaj Bin Mahmoud Offices"). We use the
   * Google Business Profile address below EVERYWHERE. Confirm with client
   * before launch — see README "Data conflicts to resolve".
   */
  address: {
    line1: "Suhaim Tower, 6th Floor, Office 604",
    line2: "C Ring Road, Al Sadd",
    city: "Doha",
    country: "Qatar",
    // Approx geo for Al Sadd, Doha — refine to the exact GBP pin before launch.
    geo: { lat: 25.2793, lng: 51.5138 },
    // Lazy-loaded Google Maps embed query.
    mapQuery: "Suhaim Tower, C Ring Road, Al Sadd, Doha, Qatar",
  },

  hours: [
    { days: "Saturday – Wednesday", time: "08:00 – 17:00" },
    { days: "Thursday", time: "08:00 – 14:00" },
    { days: "Friday", time: "Closed" },
  ],

  // Structured openingHoursSpecification for LocalBusiness JSON-LD.
  openingHoursSpec: [
    {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      opens: "08:00",
      closes: "17:00",
    },
    { days: ["Thursday"], opens: "08:00", closes: "14:00" },
  ],

  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    x: "https://x.com/",
  },
} as const;

/** sameAs list for Organization schema (only real, populated profiles). */
export const socialSameAs: string[] = [
  site.social.facebook,
  site.social.instagram,
  site.social.linkedin,
  site.social.x,
];

/** Primary navigation (header). Services opens a mega-menu. */
export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services", hasMegaMenu: true },
  { label: "Projects", href: "/projects" },
  { label: "QCDD Renewal", href: "/qatar-civil-defence-department" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact-us" },
] as const;

export const trustBadges = [
  "QCDD Certified",
  "NFPA Compliant",
  "UL/FM Equipment",
  "24/7 Response",
] as const;
