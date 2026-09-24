/**
 * Testimonials. Real client feedback for Adam Technical Services — Qatar.
 * Additional testimonials can be added as new client feedback is received.
 */
export type Testimonial = {
  quote: string;
  title: string;
  author: string;
  role: string;
  rating?: number;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    title: "Reliable Fire Protection",
    quote:
      "Adam Technical Services delivered a reliable, professional job from design through to maintenance. Their team is responsive, their work is compliant, and we trust them with our fire safety.",
    author: "Ahmed R.",
    role: "Facilities Director",
  },
  {
    title: "Excellent QCDD Support",
    quote:
      "We were struggling with our Civil Defence license renewal and Adam handled everything — inspection, rectification and submission. We got our certificate on time with zero stress. Highly recommended.",
    author: "Khalid M.",
    role: "Building Manager",
  },
  {
    title: "Outstanding HVAC Installation",
    quote:
      "The HVAC system they designed and installed for our commercial tower has been performing brilliantly. Energy-efficient, quiet and maintained to the highest standard. Adam's team are true professionals.",
    author: "Sarah T.",
    role: "Project Manager, Real Estate",
  },
  {
    title: "Precise Leak Detection",
    quote:
      "We had a hidden water leak damaging our underground infrastructure for months. Adam's team pinpointed it in hours with acoustic equipment — no digging, no guesswork. Exceptional service.",
    author: "Mohammed Al-F.",
    role: "Operations Manager",
  },
  {
    title: "Trusted MEP Partner",
    quote:
      "We've partnered with Adam Technical Services on multiple industrial projects across Doha. Their MEP expertise, QCDD compliance knowledge and on-site discipline set them apart from every other contractor.",
    author: "Rajesh K.",
    role: "Site Engineer",
  },
  {
    title: "Fast Emergency Response",
    quote:
      "Our fire alarm triggered at 2am and Adam's emergency team was on site within the hour. They diagnosed and resolved the fault before morning. That kind of 24/7 reliability is exactly what we need.",
    author: "Fatima H.",
    role: "Hospitality Director",
  },
  {
    title: "Complete Fire System Upgrade",
    quote:
      "Adam Technical Services replaced our entire fire fighting pump system and sprinkler network in a live retail environment with minimal disruption. Professional, clean and fully QCDD certified on completion.",
    author: "Yusuf A.",
    role: "Retail Operations Head",
  },
  {
    title: "Best AMC in Qatar",
    quote:
      "Their annual maintenance contract gives us complete peace of mind. Regular inspections, fast response on any issues and all documentation ready for Civil Defence — we wouldn't go anywhere else.",
    author: "Priya S.",
    role: "FM Manager, Corporate Campus",
  },
];
