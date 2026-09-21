import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { getService, getServiceKeywords } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

const SLUG = "fire-alarm-system-installation-maintenance";

export function generateMetadata(): Metadata {
  const service = getService(SLUG);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/${service.slug}`,
    keywords: getServiceKeywords(service.slug),
  });
}

export default function Page() {
  const service = getService(SLUG);
  if (!service) notFound();
  return <ServiceDetailTemplate service={service} />;
}
