import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { getServiceBySlug } from "@/lib/cms/services";
import { buildMetadata } from "@/lib/seo";

const SLUG = "electrical-services-qatar";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const service = await getServiceBySlug(SLUG);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/${service.slug}`,
    keywords: [service.primaryKeyword, ...service.secondaryKeywords],
  });
}

export default async function Page() {
  const service = await getServiceBySlug(SLUG);
  if (!service) notFound();
  return <ServiceDetailTemplate service={service} />;
}
