/* eslint-disable @typescript-eslint/no-explicit-any */
import { fromCms, mediaUrl } from "@/lib/cms/client";
import { testimonials as staticTestimonials, type Testimonial } from "@/content/testimonials";
import { clients as staticClients, type ClientLogo } from "@/content/clients";

export async function getTestimonials(): Promise<Testimonial[]> {
  return fromCms(
    async (payload) => {
      const res = await payload.find({
        collection: "testimonials",
        limit: 50,
        depth: 0,
        sort: "order",
      });
      return res.docs.map((d: any) => ({
        title: d.heading || "",
        quote: d.quote,
        author: d.author,
        role: d.role || "",
      }));
    },
    staticTestimonials as unknown as Testimonial[],
  );
}

export async function getClients(): Promise<ClientLogo[]> {
  return fromCms(
    async (payload) => {
      const res = await payload.find({
        collection: "clients",
        limit: 100,
        depth: 1,
        sort: "order",
      });
      return res.docs.map((d: any) => ({ name: d.name, logo: mediaUrl(d.logo) }));
    },
    staticClients as unknown as ClientLogo[],
  );
}
