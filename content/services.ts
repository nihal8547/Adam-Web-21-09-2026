/**
 * Service catalogue — the SEO "spokes". One object per service page.
 * Typed so it can migrate to a headless CMS. Copy is written in the source
 * site's voice; all certifications, brands and standards named here come from
 * the project brief (§4 service template, §6 content SEO) — none invented.
 *
 * `icon` maps to a key in components/ServiceIcon.tsx.
 */

export type ServiceFAQ = { q: string; a: string };

export type Service = {
  slug: string;
  /** Card / nav short name. */
  name: string;
  /** H1 (contains the primary keyword, ends "in Qatar"). */
  h1: string;
  metaTitle: string; // < 60 chars
  metaDescription: string; // < 155 chars
  eyebrow: string;
  primaryKeyword: string;
  icon: string;
  /** One-line description for cards / mega-menu. */
  excerpt: string;
  /** Lead paragraphs (rendered as <p>). */
  intro: string[];
  /** "What's included" icon list. */
  included: { title: string; desc: string }[];
  compliance: { standards: string[]; brands?: { label: string; items: string[] }[] };
  process: { title: string; desc: string }[];
  sectors: string[];
  /** Longer body sections (h2 + paragraphs) for depth / word count. */
  sections: { heading: string; body: string[] }[];
  faqs: ServiceFAQ[];
  /** 3 sibling service slugs for silo internal linking. */
  related: string[];
  /** Featured on the home services grid? */
  featured?: boolean;
  /**
   * Optional background image for the NAFFCO-style image tile. When unset, the
   * tile falls back to a branded gold/ink gradient. Swap in real photography
   * per service before launch — no code change needed.
   */
  image?: string;
};

const INSTALL_PROCESS = [
  {
    title: "Consultation & Survey",
    desc: "Site assessment, risk review and a clear scope aligned to QCDD requirements.",
  },
  {
    title: "Design & Approval",
    desc: "Detailed engineering drawings and calculations submitted for Civil Defence approval.",
  },
  {
    title: "Installation & Commissioning",
    desc: "Certified technicians install, test and commission the system to NFPA standards.",
  },
  {
    title: "AMC & 24/7 Support",
    desc: "Annual maintenance contracts, inspections and emergency response keep you compliant.",
  },
];

export const services: Service[] = [
  {
    slug: "fire-protection-services-qatar",
    name: "Fire Protection",
    h1: "Fire Protection Services in Qatar",
    metaTitle: "Fire Protection Services in Qatar | Adam",
    metaDescription:
      "QCDD-certified fire protection company in Qatar. Design, installation & AMC for alarms, sprinklers, pumps and suppression systems to NFPA standards.",
    eyebrow: "Fire Protection",
    primaryKeyword: "fire protection company in Qatar",
    icon: "shield",
    featured: true,
    excerpt:
      "End-to-end fire protection — detection, suppression, pumps and passive systems — designed, installed and maintained to QCDD and NFPA standards.",
    intro: [
      "Adam Technical Services is a trusted fire protection company in Qatar, delivering complete life-safety systems for residential, commercial and industrial buildings across Doha and the wider country. From the first risk assessment to ongoing annual maintenance, our QCDD-certified team designs and installs fire protection that keeps people, property and operations safe.",
      "We engineer every system to NFPA standards and Qatar Civil Defence Department (QCDD) requirements, using UL/FM-listed equipment and manufacturer-trained technicians. Whether you need a new build fitted out, an existing system upgraded, or a compliant AMC to keep your Civil Defence certificate current, we are your single accountable partner.",
    ],
    included: [
      {
        title: "Fire Alarm & Detection",
        desc: "Addressable and conventional alarm systems, smoke and heat detection, and voice evacuation.",
      },
      {
        title: "Fire Fighting Pumps",
        desc: "Diesel, electric and jockey pump sets sized to your hydraulic demand.",
      },
      {
        title: "Sprinkler & Suppression",
        desc: "Wet, dry and pre-action sprinklers plus clean-agent and gas suppression.",
      },
      {
        title: "Fire Stop & Passive",
        desc: "Fire-rated penetration sealing and insulation to contain fire spread.",
      },
      {
        title: "Hydrants & Hose Reels",
        desc: "Landing valves, hose reels and external hydrant networks.",
      },
      {
        title: "Inspection & AMC",
        desc: "Scheduled testing, certification and 24/7 emergency support.",
      },
    ],
    compliance: {
      standards: [
        "QCDD (Qatar Civil Defence) approvals",
        "NFPA standards",
        "UL / FM-listed equipment",
      ],
    },
    process: INSTALL_PROCESS,
    sectors: [
      "Residential towers",
      "Commercial buildings",
      "Industrial facilities",
      "Warehouses",
      "High-rise developments",
    ],
    sections: [
      {
        heading: "Why choose Adam for fire protection in Qatar",
        body: [
          "As a QCDD-certified contractor, we hold the approvals needed to design and certify fire protection systems that pass Civil Defence inspection first time. Our engineers understand the local code, the approval workflow and the documentation Qatar Civil Defence expects — so your project stays on schedule.",
          "We take a systems view. Detection, suppression, pumps and passive fire stopping are engineered to work together, commissioned as one, and documented for handover. That integrated approach is what separates a compliant building from a genuinely safe one.",
        ],
      },
      {
        heading: "Maintenance that keeps you compliant",
        body: [
          "A fire protection system is only as good as its last inspection. Our annual maintenance contracts (AMC) cover functional testing of detectors, alarms, pumps and sprinklers, battery and valve checks, and the certification your insurer and the QCDD require. If something fails, our 24/7 response team is on call.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are your fire protection systems QCDD approved?",
        a: "Yes. We are a QCDD-certified contractor and design, install and certify every system to Qatar Civil Defence Department requirements and NFPA standards.",
      },
      {
        q: "Do you provide annual maintenance contracts?",
        a: "We offer tailored AMCs covering inspection, testing, certification and 24/7 emergency support to keep your Civil Defence certificate valid.",
      },
      {
        q: "Which buildings do you work on?",
        a: "Residential towers, commercial and industrial buildings, warehouses and high-rise developments across Doha and Qatar.",
      },
      {
        q: "Can you upgrade an existing fire system?",
        a: "Yes. We survey the existing installation, identify non-compliances and upgrade or retrofit to current QCDD and NFPA requirements.",
      },
      {
        q: "How fast can you respond to an emergency?",
        a: "Our 24/7 response team supports clients on active maintenance contracts with rapid emergency attendance across Qatar.",
      },
    ],
    related: [
      "fire-alarm-system-installation-maintenance",
      "fire-sprinkler-system-qatar",
      "fire-fighting-pump-qatar",
    ],
  },

  {
    slug: "fire-alarm-system-installation-maintenance",
    name: "Fire Alarm System",
    h1: "Fire Alarm System Installation & Maintenance in Qatar",
    metaTitle: "Fire Alarm System Qatar | Install & Maintain",
    metaDescription:
      "Fire alarm system installation & maintenance in Qatar. Addressable & conventional systems from Honeywell, Simplex & Shield — QCDD approved, NFPA compliant.",
    eyebrow: "Fire Alarm Systems",
    primaryKeyword: "fire alarm system Qatar",
    icon: "bell",
    featured: true,
    excerpt:
      "Addressable and conventional fire alarm systems — supplied, installed, integrated and maintained to QCDD and NFPA standards.",
    intro: [
      "A reliable fire alarm system is the first line of defence in any building. Adam Technical Services designs, installs, integrates and maintains addressable and conventional fire alarm systems across Qatar, giving occupants the earliest possible warning and giving you a QCDD-compliant, fully documented installation.",
      "We work with trusted, UL/FM-listed brands including Honeywell, Simplex and Shield, and integrate detection with voice evacuation, BMS and access control so your life-safety systems act as one. Our QCDD-approved fire alarm maintenance in Qatar and annual maintenance contracts (AMC) keep the system tested, certified and ready.",
    ],
    included: [
      {
        title: "Addressable Panels",
        desc: "Intelligent panels that pinpoint the exact device and location in alarm.",
      },
      {
        title: "Detection Devices",
        desc: "Optical smoke, heat, multi-sensor and beam detectors selected per risk.",
      },
      {
        title: "Manual Call Points",
        desc: "Break-glass call points positioned to code on every escape route.",
      },
      {
        title: "Sounders & Voice Evac",
        desc: "Sounder-beacons and intelligible voice evacuation for phased egress.",
      },
      {
        title: "Integration",
        desc: "Interfacing with sprinklers, dampers, lifts, BMS and access control.",
      },
      {
        title: "Testing & AMC",
        desc: "Scheduled functional testing, battery checks and certification.",
      },
    ],
    compliance: {
      standards: ["QCDD approvals", "NFPA 72 (fire alarm code)"],
      brands: [{ label: "Alarm equipment", items: ["Honeywell", "Simplex", "Shield"] }],
    },
    process: INSTALL_PROCESS,
    sectors: [
      "Residential towers",
      "Offices & retail",
      "Hotels & hospitality",
      "Warehouses",
      "High-rise developments",
    ],
    sections: [
      {
        heading: "Addressable vs conventional — the right system for your building",
        body: [
          "Conventional systems group devices into zones and suit smaller buildings. Addressable systems identify the exact device in alarm, dramatically speeding up response in larger or high-rise buildings. We assess your building size, layout and risk profile and specify the system that keeps you compliant without over-engineering the cost.",
        ],
      },
      {
        heading: "Maintenance and monitoring",
        body: [
          "Fire alarm systems require routine functional testing to remain compliant and dependable. Our maintenance contracts cover panel checks, device testing, battery and standby-supply verification, and full certification — with 24/7 support for faults and emergencies.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which fire alarm brands do you install?",
        a: "We install and maintain UL/FM-listed systems from Honeywell, Simplex and Shield, selected to suit your building and QCDD requirements.",
      },
      {
        q: "Do you install addressable and conventional systems?",
        a: "Yes. We specify addressable systems for larger and high-rise buildings and conventional systems where they are the right fit, always to NFPA 72.",
      },
      {
        q: "Can you integrate the alarm with other systems?",
        a: "We integrate detection with sprinklers, dampers, lifts, BMS and access control so all life-safety systems respond together.",
      },
      {
        q: "Do you maintain existing fire alarm systems?",
        a: "Yes. We service and certify existing systems and can upgrade non-compliant installations to current QCDD standards.",
      },
      {
        q: "Is the installation QCDD approved?",
        a: "Every system is designed, installed and certified to Qatar Civil Defence Department requirements.",
      },
    ],
    related: [
      "fire-protection-services-qatar",
      "fire-sprinkler-system-qatar",
      "fire-stop-insulation-technologies-services-qatar",
    ],
  },

  {
    slug: "fire-fighting-pump-qatar",
    name: "Fire Fighting Pump",
    h1: "Fire Fighting Pump Systems in Qatar",
    metaTitle: "Fire Fighting Pump Qatar | Supply & Install",
    metaDescription:
      "Fire fighting pump supply, installation & maintenance in Qatar. Diesel, electric & jockey pump sets from Grundfos, NAFFCO & Aurora — QCDD approved.",
    eyebrow: "Fire Fighting Pumps",
    primaryKeyword: "fire fighting pump Qatar",
    icon: "pump",
    featured: true,
    excerpt:
      "Diesel, electric and jockey fire pump sets sized to your hydraulic demand and certified to QCDD and NFPA 20.",
    intro: [
      "The fire pump is the heart of a building's fire protection — it delivers water at the pressure and flow that sprinklers, hydrants and hose reels need to work. Adam Technical Services supplies, installs and maintains complete fire fighting pump sets in Qatar, sized precisely to your hydraulic demand and certified to QCDD and NFPA 20.",
      "We work with leading pump manufacturers including Grundfos, NAFFCO and Aurora, and deliver turnkey pump rooms — pumps, controllers, pipework, valves and testing — ready for Civil Defence approval.",
    ],
    included: [
      {
        title: "Electric Fire Pumps",
        desc: "UL/FM-listed electric-driven pumps for reliable primary duty.",
      },
      {
        title: "Diesel Fire Pumps",
        desc: "Engine-driven pumps for standby duty where power reliability is critical.",
      },
      {
        title: "Jockey Pumps",
        desc: "Pressure-maintenance pumps that hold system pressure and prevent false starts.",
      },
      {
        title: "Controllers",
        desc: "Listed pump controllers with automatic and manual operation.",
      },
      {
        title: "Pump Room Fit-out",
        desc: "Pipework, valves, gauges and flow-testing arrangements.",
      },
      { title: "Testing & AMC", desc: "Weekly/annual flow testing, servicing and certification." },
    ],
    compliance: {
      standards: ["QCDD approvals", "NFPA 20 (stationary fire pumps)"],
      brands: [{ label: "Pump manufacturers", items: ["Grundfos", "NAFFCO", "Aurora"] }],
    },
    process: INSTALL_PROCESS,
    sectors: [
      "High-rise developments",
      "Commercial buildings",
      "Industrial facilities",
      "Warehouses",
      "Residential compounds",
    ],
    sections: [
      {
        heading: "Correctly sized pumps, first time",
        body: [
          "An undersized pump leaves sprinklers and hydrants starved of water; an oversized one wastes capital and space. We perform full hydraulic calculations against your building's demand so the pump set delivers exactly the flow and pressure the system requires, then document it for QCDD approval.",
        ],
      },
      {
        heading: "Reliability you can test",
        body: [
          "Fire pumps must start on demand, every time. Our maintenance contracts include the routine flow and functional testing NFPA 20 requires, plus servicing of engines, controllers and valves — with 24/7 support so a fault is never left unattended.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which fire pump brands do you supply?",
        a: "We supply and install pump sets from Grundfos, NAFFCO and Aurora, all listed and certified to NFPA 20 and QCDD requirements.",
      },
      {
        q: "Do you provide diesel and electric pumps?",
        a: "Yes. We design pump rooms with electric primary pumps, diesel standby pumps and jockey pumps to suit your reliability requirements.",
      },
      {
        q: "Can you size a pump for my building?",
        a: "We carry out full hydraulic calculations against your sprinkler and hydrant demand to size the pump set correctly.",
      },
      {
        q: "Do you service existing fire pumps?",
        a: "Yes. We service, flow-test and certify existing pump sets and can replace or upgrade pumps that no longer meet demand.",
      },
      {
        q: "Is testing included in maintenance?",
        a: "Our AMCs include the routine flow and functional testing required by NFPA 20, with full certification.",
      },
    ],
    related: [
      "fire-sprinkler-system-qatar",
      "fire-protection-services-qatar",
      "underground-leakage-detection-system-service-qatar",
    ],
  },

  {
    slug: "fire-sprinkler-system-qatar",
    name: "Fire Sprinkler System",
    h1: "Fire Sprinkler System Installation in Qatar",
    metaTitle: "Fire Sprinkler System Qatar | Design & Install",
    metaDescription:
      "Fire sprinkler system design, installation & maintenance in Qatar. Wet, dry & pre-action systems engineered to NFPA 13 and QCDD approval.",
    eyebrow: "Fire Sprinkler Systems",
    primaryKeyword: "fire sprinkler system Qatar",
    icon: "sprinkler",
    featured: true,
    excerpt:
      "Wet, dry and pre-action automatic sprinkler systems, hydraulically designed to NFPA 13 and approved by QCDD.",
    intro: [
      "Automatic sprinklers control and suppress fire at its source, protecting life and limiting damage before the fire brigade arrives. Adam Technical Services designs, installs and maintains fire sprinkler systems across Qatar — hydraulically calculated to NFPA 13 and approved by the Qatar Civil Defence Department.",
      "From wet-pipe systems for occupied buildings to dry-pipe and pre-action systems for car parks, cold stores and sensitive areas, we engineer the right sprinkler solution for your hazard classification.",
    ],
    included: [
      {
        title: "Wet-Pipe Systems",
        desc: "The standard choice for heated, occupied buildings — always charged and ready.",
      },
      {
        title: "Dry-Pipe Systems",
        desc: "For unheated spaces and car parks where freezing or heat is a risk.",
      },
      {
        title: "Pre-Action Systems",
        desc: "Double-interlock protection for data centres and sensitive assets.",
      },
      {
        title: "Hydraulic Design",
        desc: "NFPA 13 calculations matched to your hazard classification.",
      },
      {
        title: "Pipework & Heads",
        desc: "Listed pipework, valves and concealed or upright/pendent heads.",
      },
      { title: "Testing & AMC", desc: "Valve testing, flow checks and certification." },
    ],
    compliance: {
      standards: ["QCDD approvals", "NFPA 13 (sprinkler systems)"],
    },
    process: INSTALL_PROCESS,
    sectors: [
      "Residential towers",
      "Commercial buildings",
      "Car parks",
      "Warehouses & cold stores",
      "High-rise developments",
    ],
    sections: [
      {
        heading: "The right system for the hazard",
        body: [
          "Sprinkler design starts with hazard classification — light, ordinary or high hazard — which determines head spacing, pipe sizes and water demand. We classify your occupancy correctly, run the NFPA 13 hydraulic calculations and design a system that protects the building without over-specifying.",
        ],
      },
      {
        heading: "Integrated with pumps and detection",
        body: [
          "A sprinkler system depends on the fire pump for water and can be linked to detection for monitoring and alarm. Because we deliver pumps, detection and passive fire protection under one roof, your sprinkler system is designed, installed and commissioned as part of a coherent whole.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which sprinkler systems do you install?",
        a: "Wet-pipe, dry-pipe and pre-action systems, each selected for the building's occupancy, temperature and risk, and designed to NFPA 13.",
      },
      {
        q: "Are your sprinkler designs QCDD approved?",
        a: "Yes. We produce hydraulically calculated designs and drawings submitted for and approved by the Qatar Civil Defence Department.",
      },
      {
        q: "Can you protect a car park or cold store?",
        a: "Yes. Dry-pipe and pre-action systems are ideal for unheated or freezing environments where wet systems are unsuitable.",
      },
      {
        q: "Do you maintain sprinkler systems?",
        a: "We provide AMCs covering valve testing, flow checks, head inspection and certification.",
      },
      {
        q: "Do sprinklers work with the fire pump?",
        a: "Yes — we size the fire pump to the sprinkler demand and commission both together as one integrated system.",
      },
    ],
    related: [
      "fire-fighting-pump-qatar",
      "fire-protection-services-qatar",
      "fire-alarm-system-installation-maintenance",
    ],
  },

  {
    slug: "fire-stop-insulation-technologies-services-qatar",
    name: "Fire Stop Insulation",
    h1: "Fire Stop Insulation Technologies & Services in Qatar",
    metaTitle: "Fire Stop Insulation Qatar | Passive Fire",
    metaDescription:
      "Passive fire protection in Qatar — fire stop insulation, penetration sealing & fire-rated barriers to contain fire and smoke. QCDD compliant.",
    eyebrow: "Fire Stop Insulation",
    primaryKeyword: "fire stop insulation Qatar",
    icon: "layers",
    excerpt:
      "Passive fire protection — fire-stop sealing of penetrations and joints that contains fire and smoke to protect escape routes.",
    intro: [
      "When fire breaks out, passive fire protection buys the time people need to escape and firefighters need to respond. Adam Technical Services delivers fire stop insulation technologies and services across Qatar — sealing the penetrations, joints and voids that would otherwise let fire and smoke spread between compartments.",
      "Every fire-rated wall and floor is only as good as the seals around the cables, pipes and ducts that pass through it. We restore that compartmentation with tested, certified fire-stop systems installed to QCDD requirements.",
    ],
    included: [
      {
        title: "Penetration Sealing",
        desc: "Fire-rated sealing of cable, pipe and duct penetrations through rated walls and floors.",
      },
      {
        title: "Linear Joint Seals",
        desc: "Fire and smoke sealing of construction joints and head-of-wall gaps.",
      },
      {
        title: "Fire Batts & Coatings",
        desc: "Coated fire batts, mortars and intumescent sealants matched to the rating.",
      },
      {
        title: "Duct & Damper Support",
        desc: "Fire-rated support and sealing around HVAC ductwork and dampers.",
      },
      {
        title: "Cable Coating",
        desc: "Intumescent coatings that protect cable trays and limit flame spread.",
      },
      {
        title: "Survey & Certification",
        desc: "Compartmentation surveys, remediation and documented certification.",
      },
    ],
    compliance: {
      standards: ["QCDD approvals", "Fire-rated / tested fire-stop systems"],
    },
    process: INSTALL_PROCESS,
    sectors: [
      "Residential towers",
      "Commercial buildings",
      "Industrial facilities",
      "Data centres",
      "High-rise developments",
    ],
    sections: [
      {
        heading: "Compartmentation done properly",
        body: [
          "Buildings are divided into fire compartments to slow the spread of fire. Every service that crosses a compartment boundary breaks that seal unless it is fire-stopped correctly. We survey the building, identify breaches and reinstate compartmentation with tested systems appropriate to each penetration and rating.",
        ],
      },
      {
        heading: "Documented and certified",
        body: [
          "Passive fire protection is scrutinised at Civil Defence inspection. We document every fire-stop with its location, system and rating so your compartmentation is auditable and your certificate is defensible.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is fire stop insulation?",
        a: "It is passive fire protection that seals gaps around pipes, cables and ducts where they pass through fire-rated walls and floors, stopping fire and smoke from spreading.",
      },
      {
        q: "Why is passive fire protection important?",
        a: "It maintains compartmentation, protecting escape routes and limiting fire spread even before active systems and the fire brigade respond.",
      },
      {
        q: "Do you survey existing buildings?",
        a: "Yes. We carry out compartmentation surveys, identify breaches and remediate them with certified fire-stop systems.",
      },
      {
        q: "Are the systems certified?",
        a: "We install tested, fire-rated systems and document each one for QCDD inspection and audit.",
      },
      {
        q: "Do you coordinate with MEP trades?",
        a: "Yes. We coordinate fire-stopping around HVAC ducts, electrical cabling and plumbing so every penetration is sealed correctly.",
      },
    ],
    related: [
      "fire-protection-services-qatar",
      "fire-alarm-system-installation-maintenance",
      "hvac-services-qatar",
    ],
  },

  {
    slug: "underground-leakage-detection-system-service-qatar",
    name: "Water Leak Detection",
    h1: "Underground Water Leak Detection in Qatar",
    metaTitle: "Underground Leak Detection Qatar | No-Dig",
    metaDescription:
      "Underground water leak detection in Qatar. Acoustic sensors & thermal imaging locate fire-fighting and potable water line leaks — no-dig, non-destructive.",
    eyebrow: "Water Leak Detection",
    primaryKeyword: "underground water leak detection Qatar",
    icon: "droplet",
    featured: true,
    excerpt:
      "Non-destructive underground leak detection using acoustic sensors and thermal imaging — pinpoint fire-line and potable-water leaks without digging.",
    intro: [
      "Hidden underground leaks waste water, undermine fire-fighting reliability and quietly damage structures and foundations. Adam Technical Services provides expert underground water leak detection across Qatar, pinpointing leaks in fire-fighting lines and potable water lines without excavation.",
      "Using acoustic sensors and thermal imaging, our specialists provide precise acoustic leak detection in Qatar, locating the exact position of a leak so it can be repaired precisely — no-dig, non-destructive, and far cheaper than exploratory excavation.",
    ],
    included: [
      {
        title: "Acoustic Detection",
        desc: "Ground microphones and correlators that hear the sound of escaping water.",
      },
      {
        title: "Thermal Imaging",
        desc: "Infrared surveys that reveal temperature anomalies from hidden leaks.",
      },
      {
        title: "Fire-Line Leaks",
        desc: "Locating leaks in buried fire-fighting mains that sap system pressure.",
      },
      {
        title: "Potable Water Leaks",
        desc: "Finding leaks in domestic and irrigation supply lines.",
      },
      {
        title: "Pinpoint Marking",
        desc: "Precise surface marking so repairs are targeted, not exploratory.",
      },
      {
        title: "Reporting",
        desc: "Clear reports with leak locations and recommended remediation.",
      },
    ],
    compliance: {
      standards: [
        "Non-destructive, no-dig methodology",
        "Fire-fighting & potable water line surveys",
      ],
    },
    process: [
      {
        title: "Consultation & Survey",
        desc: "We review your network, symptoms and drawings to plan the survey.",
      },
      {
        title: "Detection",
        desc: "Acoustic sensors and thermal imaging locate and pinpoint the leak.",
      },
      { title: "Reporting", desc: "You receive precise leak locations and remediation guidance." },
      { title: "Support", desc: "We can coordinate or advise on the targeted repair and re-test." },
    ],
    sectors: [
      "Residential compounds",
      "Commercial buildings",
      "Industrial facilities",
      "Warehouses",
      "District networks",
    ],
    sections: [
      {
        heading: "Why leaks in fire-fighting lines are so dangerous",
        body: [
          "A leak in a buried fire main can go unnoticed until the day the system is needed — then it may not hold pressure. Detecting and repairing fire-line leaks early protects both your water bill and the reliability of your entire fire protection system.",
        ],
      },
      {
        heading: "No-dig, non-destructive, precise",
        body: [
          "Traditional leak-finding meant digging until you found the pipe. Our acoustic and thermal methods locate the leak from the surface, so excavation is limited to the exact repair point. That saves time, cost and disruption — and protects landscaping, paving and structures.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do you find leaks without digging?",
        a: "We use acoustic sensors that detect the sound of escaping water and thermal imaging that reveals temperature anomalies, pinpointing the leak from the surface.",
      },
      {
        q: "Can you find leaks in fire-fighting lines?",
        a: "Yes. Locating leaks in buried fire mains is a core service — undetected they can rob the system of the pressure it needs in an emergency.",
      },
      {
        q: "Do you detect potable water leaks too?",
        a: "Yes. We locate leaks in domestic, irrigation and district water supply lines as well as fire lines.",
      },
      {
        q: "Will you damage my property?",
        a: "No. The survey is non-destructive; excavation, if any, is limited to the exact repair point we mark.",
      },
      {
        q: "What do I receive after the survey?",
        a: "A clear report with precise leak locations and recommended remediation, so repairs are targeted and cost-effective.",
      },
    ],
    related: ["fire-fighting-pump-qatar", "fire-protection-services-qatar", "hvac-services-qatar"],
  },

  {
    slug: "hvac-services-qatar",
    name: "HVAC",
    h1: "HVAC Services in Qatar",
    metaTitle: "HVAC Company in Qatar | Design & AMC",
    metaDescription:
      "Expert HVAC company in Qatar. VRF, chilled water, FAHU and ventilation design, installation & 24/7 maintenance for comfort, air quality and efficiency.",
    eyebrow: "HVAC",
    primaryKeyword: "HVAC company in Qatar",
    icon: "wind",
    featured: true,
    excerpt:
      "VRF, chilled-water, FAHU and ventilation systems — designed, installed and maintained 24/7 for comfort, air quality and energy efficiency.",
    intro: [
      "In Qatar's climate, HVAC is not a luxury — it is essential infrastructure. Adam Technical Services is an expert HVAC company in Qatar, delivering heating, ventilation and air-conditioning systems that keep buildings comfortable, healthy and energy-efficient all year round.",
      "We design, install, commission and maintain the full range of systems — VRF, chilled water, fresh-air handling units (FAHU) and ventilation — with 24/7 support to keep them running when it matters most. From complete AC service and maintenance in Qatar to fast AC repair in Doha, we keep your cooling reliable and efficient.",
    ],
    included: [
      {
        title: "VRF / VRV Systems",
        desc: "Variable refrigerant flow systems for flexible, efficient zoning.",
      },
      {
        title: "Chilled Water Systems",
        desc: "Chillers, AHUs, FCUs and pumping for large and central plant.",
      },
      {
        title: "FAHU & Ventilation",
        desc: "Fresh-air handling and ventilation for healthy indoor air quality.",
      },
      {
        title: "Ductwork & Distribution",
        desc: "Designed, fabricated and balanced air distribution.",
      },
      {
        title: "Controls & BMS",
        desc: "Smart controls and BMS integration for efficiency and monitoring.",
      },
      { title: "24/7 Maintenance", desc: "Preventive maintenance and rapid emergency response." },
    ],
    compliance: {
      standards: [
        "QCDD / Qatar authority approvals where applicable",
        "Energy-efficient, ASHRAE-aligned design",
      ],
    },
    process: INSTALL_PROCESS,
    sectors: [
      "Residential towers",
      "Offices & retail",
      "Hotels & hospitality",
      "Industrial facilities",
      "Healthcare",
    ],
    sections: [
      {
        heading: "Systems engineered for Qatar's climate",
        body: [
          "Cooling loads in Qatar are demanding and sustained. We size and select systems — VRF for flexible zoning, chilled water for larger central plant, FAHU for fresh-air quality — to deliver reliable comfort while controlling energy consumption and running cost.",
        ],
      },
      {
        heading: "Maintenance that protects your investment",
        body: [
          "HVAC is one of a building's largest energy consumers and capital assets. Our preventive maintenance keeps equipment efficient, extends its life and heads off breakdowns — with a 24/7 team ready when cooling fails in peak summer.",
        ],
      },
    ],
    faqs: [
      {
        q: "What HVAC systems do you install?",
        a: "VRF/VRV, chilled-water systems with chillers, AHUs and FCUs, FAHU fresh-air units and full ventilation and ductwork.",
      },
      {
        q: "Do you provide AC service, maintenance and repair in Qatar?",
        a: "Yes. We provide AC service and maintenance in Qatar and fast AC repair in Doha — from routine servicing and preventive maintenance to breakdown repairs, backed by 24/7 support.",
      },
      {
        q: "Do you offer 24/7 HVAC maintenance?",
        a: "Yes. Our preventive maintenance contracts include scheduled servicing and 24/7 emergency response across Qatar.",
      },
      {
        q: "Can you improve energy efficiency?",
        a: "We design efficient systems and add smart controls and BMS integration to reduce energy use and running cost.",
      },
      {
        q: "Do you handle both design and installation?",
        a: "Yes. We deliver turnkey HVAC — design, supply, installation, commissioning and ongoing maintenance.",
      },
      {
        q: "Which buildings do you serve?",
        a: "Residential, commercial, hospitality, healthcare and industrial buildings throughout Doha and Qatar.",
      },
    ],
    related: [
      "acmv-system-company-in-qatar",
      "electrical-services-qatar",
      "fire-protection-services-qatar",
    ],
  },

  {
    slug: "acmv-system-company-in-qatar",
    name: "ACMV",
    h1: "ACMV System Company in Qatar",
    metaTitle: "ACMV System Company in Qatar | Adam",
    metaDescription:
      "ACMV system company in Qatar. Air conditioning & mechanical ventilation design, installation and maintenance for comfort, safety and air quality.",
    eyebrow: "ACMV",
    primaryKeyword: "ACMV company Qatar",
    icon: "fan",
    featured: true,
    excerpt:
      "Air Conditioning & Mechanical Ventilation — integrated ACMV design, installation and maintenance for comfort, safety and indoor air quality.",
    intro: [
      "ACMV — Air Conditioning and Mechanical Ventilation — is the backbone of a comfortable, safe and healthy building. Adam Technical Services is a specialist ACMV system company in Qatar, integrating air conditioning with mechanical ventilation, smoke control and fresh-air systems into one coordinated whole.",
      "From car-park ventilation and smoke extraction to comfort cooling, we design, install and maintain smoke control and pressurization systems in Qatar and complete ACMV systems that meet Qatar's codes and keep occupants safe and comfortable.",
    ],
    included: [
      {
        title: "Air Conditioning",
        desc: "VRF and chilled-water cooling engineered for Qatar's climate.",
      },
      {
        title: "Mechanical Ventilation",
        desc: "Supply, extract and car-park ventilation for healthy air movement.",
      },
      {
        title: "Smoke Control",
        desc: "Smoke extraction and stair/lobby pressurisation for life safety.",
      },
      {
        title: "Fresh Air Systems",
        desc: "FAHU and treated fresh-air delivery for indoor air quality.",
      },
      {
        title: "Ductwork & Balancing",
        desc: "Fabricated, installed and air-balanced distribution.",
      },
      { title: "Maintenance", desc: "Preventive maintenance and 24/7 emergency support." },
    ],
    compliance: {
      standards: [
        "QCDD approvals for smoke control / life-safety ventilation",
        "ASHRAE-aligned design",
      ],
    },
    process: INSTALL_PROCESS,
    sectors: [
      "High-rise developments",
      "Car parks",
      "Commercial buildings",
      "Industrial facilities",
      "Hospitality",
    ],
    sections: [
      {
        heading: "Where ventilation meets life safety",
        body: [
          "ACMV is not only about comfort. Car-park ventilation, smoke extraction and stairwell pressurisation are life-safety systems that must perform in a fire. Because we deliver both fire protection and ACMV, we coordinate these systems so ventilation and fire strategy work together and pass QCDD inspection.",
        ],
      },
      {
        heading: "Integrated, coordinated delivery",
        body: [
          "ACMV touches almost every other trade — fire dampers, BMS, electrical supply and structure. We coordinate the design and installation across disciplines to avoid clashes, meet code and deliver a system that is efficient to run and easy to maintain.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does ACMV stand for?",
        a: "ACMV means Air Conditioning and Mechanical Ventilation — the combined systems that cool, ventilate and control air and smoke in a building.",
      },
      {
        q: "How is ACMV different from HVAC?",
        a: "The scope overlaps; ACMV emphasises the integration of air conditioning with mechanical ventilation and smoke control, common in Qatar and the wider Gulf.",
      },
      {
        q: "Do you handle smoke control systems?",
        a: "Yes. We design and install smoke extraction and pressurisation systems coordinated with the building's fire strategy and approved by QCDD.",
      },
      {
        q: "Do you maintain ACMV systems?",
        a: "We provide preventive maintenance and 24/7 support to keep comfort and life-safety ventilation performing.",
      },
      {
        q: "Can you ventilate car parks?",
        a: "Yes. Car-park supply/extract and smoke-clearance ventilation is a core part of our ACMV work.",
      },
    ],
    related: ["hvac-services-qatar", "electrical-services-qatar", "fire-protection-services-qatar"],
  },

  {
    slug: "electrical-services-qatar",
    name: "Electrical Systems",
    h1: "Electrical Services in Qatar",
    metaTitle: "Electrical Services in Qatar | MEP",
    metaDescription:
      "Electrical services in Qatar — power distribution, lighting, containment, controls and testing for commercial, residential and industrial buildings.",
    eyebrow: "Electrical Systems",
    primaryKeyword: "MEP company in Qatar",
    icon: "bolt",
    excerpt:
      "Power distribution, lighting, containment and controls — safe, code-compliant electrical installations for every building type.",
    intro: [
      "Reliable, safe electrical infrastructure powers every other system in a building. As part of our MEP capability in Qatar, Adam Technical Services delivers electrical services — power distribution, lighting, containment, controls and testing — for commercial, residential and industrial projects.",
      "We install to the local wiring regulations and coordinate electrical works with fire protection, HVAC and ACMV so the whole building performs as one integrated system.",
    ],
    included: [
      {
        title: "Power Distribution",
        desc: "LV distribution boards, sub-mains and final circuits.",
      },
      { title: "Lighting", desc: "General, architectural and emergency/escape lighting." },
      { title: "Containment", desc: "Cable tray, trunking and conduit installed to standard." },
      {
        title: "Controls & Automation",
        desc: "Lighting control, small power and BMS interfacing.",
      },
      {
        title: "Life-Safety Power",
        desc: "Supplies for fire pumps, alarms, smoke control and emergency lighting.",
      },
      {
        title: "Testing & Certification",
        desc: "Inspection, testing and documented certification.",
      },
    ],
    compliance: {
      standards: [
        "Local wiring regulations / Kahramaa requirements",
        "Coordinated with QCDD life-safety systems",
      ],
    },
    process: INSTALL_PROCESS,
    sectors: [
      "Residential towers",
      "Commercial buildings",
      "Industrial facilities",
      "Warehouses",
      "Fit-out projects",
    ],
    sections: [
      {
        heading: "Electrical as part of coordinated MEP",
        body: [
          "Electrical works underpin fire pumps, alarms, smoke control and emergency lighting — all life-safety loads that must stay powered. Because we deliver electrical alongside fire protection and mechanical services, we design supplies and back-up so critical systems never lose power when they are needed.",
        ],
      },
      {
        heading: "Safe, tested, certified",
        body: [
          "Every installation is inspected, tested and certified to the applicable regulations, giving you documented assurance for authority approval, insurance and safe operation.",
        ],
      },
    ],
    faqs: [
      {
        q: "What electrical services do you provide?",
        a: "Power distribution, lighting, emergency lighting, cable containment, controls and full testing and certification.",
      },
      {
        q: "Do you power fire and life-safety systems?",
        a: "Yes. We design and install the electrical supplies and back-up for fire pumps, alarms, smoke control and emergency lighting.",
      },
      {
        q: "Are installations tested and certified?",
        a: "Every installation is inspected, tested and documented to the applicable wiring regulations.",
      },
      {
        q: "Do you work on fit-outs?",
        a: "Yes. We deliver electrical works for new builds, fit-outs and refurbishments across Qatar.",
      },
      {
        q: "Do you coordinate with other trades?",
        a: "We coordinate electrical with HVAC, ACMV and fire protection so the building's systems integrate cleanly.",
      },
    ],
    related: [
      "hvac-services-qatar",
      "acmv-system-company-in-qatar",
      "fire-protection-services-qatar",
    ],
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Featured subset for the home services grid (6 cards). */
export const featuredServices = services.filter((s) => s.featured).slice(0, 6);

/**
 * Secondary keywords per service — competitor-validated Qatar search terms
 * (QCDD approved, AMC, AC service/repair, acoustic, smoke control, Doha
 * variants). Fed into each service page's `keywords` metadata alongside the
 * primary keyword. On-page copy carries the important ones too.
 */
export const serviceSecondaryKeywords: Record<string, string[]> = {
  "fire-protection-services-qatar": [
    "top fire protection company in Qatar",
    "fire fighting company in Qatar",
    "QCDD approved fire protection Qatar",
    "fire safety company Qatar",
    "fire protection company in Doha",
    "annual maintenance contract AMC Qatar",
  ],
  "fire-alarm-system-installation-maintenance": [
    "fire alarm maintenance Qatar",
    "fire alarm AMC Qatar",
    "QCDD approved fire alarm Qatar",
    "addressable fire alarm system Doha",
  ],
  "fire-fighting-pump-qatar": [
    "fire pump maintenance Qatar",
    "diesel fire pump Qatar",
    "NFPA 20 fire pump Doha",
    "QCDD approved fire pump Qatar",
  ],
  "fire-sprinkler-system-qatar": [
    "automatic sprinkler system Qatar",
    "fire suppression system Qatar",
    "NFPA 13 sprinkler Doha",
    "sprinkler AMC Qatar",
  ],
  "fire-stop-insulation-technologies-services-qatar": [
    "passive fire protection Qatar",
    "fire stopping Qatar",
    "penetration sealing Doha",
    "fire rated compartmentation Qatar",
  ],
  "underground-leakage-detection-system-service-qatar": [
    "acoustic leak detection Qatar",
    "water leak detection Doha",
    "fire line leak detection Qatar",
    "non-destructive leak detection Qatar",
  ],
  "hvac-services-qatar": [
    "HVAC contractor Qatar",
    "AC service and maintenance Qatar",
    "AC repair Doha",
    "chilled water VRF FAHU Qatar",
    "HVAC maintenance company Doha",
  ],
  "acmv-system-company-in-qatar": [
    "air conditioning and mechanical ventilation Qatar",
    "smoke control system Qatar",
    "pressurization system Doha",
    "car park ventilation Qatar",
  ],
  "electrical-services-qatar": [
    "electrical contractor Qatar",
    "MEP contractor in Qatar",
    "LV distribution Doha",
    "emergency lighting Qatar",
  ],
};

/** Primary + secondary keywords for a service page's metadata. */
export function getServiceKeywords(slug: string): string[] {
  const svc = getService(slug);
  if (!svc) return [];
  return [svc.primaryKeyword, ...(serviceSecondaryKeywords[slug] ?? [])];
}
