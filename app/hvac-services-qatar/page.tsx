import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

const SLUG = "hvac-services-qatar";

export function generateMetadata(): Metadata {
  const service = getService(SLUG);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/${service.slug}`,
    keywords: [service.primaryKeyword],
  });
}

export default function Page() {
  const service = getService(SLUG);
  if (!service) notFound();
  return <ServiceDetailTemplate service={service} />;
}
