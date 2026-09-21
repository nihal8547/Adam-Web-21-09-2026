/**
 * Testimonials. Only the testimonial supplied in the brief is included —
 * additional real testimonials should be added by the client before launch
 * (do not invent). See README "Content to supply before launch".
 */
export type Testimonial = {
  quote: string;
  title: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    title: "Reliable Services",
    quote:
      "Adam Technical Services delivered a reliable, professional job from design through to maintenance. Their team is responsive, their work is compliant, and we trust them with our fire safety.",
    author: "Ahmed R.",
    role: "Director",
  },
];
