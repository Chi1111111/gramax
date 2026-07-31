import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailView } from "../../_components/ServicePages";
import { getServicePage } from "../../_data/servicePages";

type Props = {
  params: Promise<{ topic: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const page = getServicePage("tenants", topic);
  return {
    title: page?.title.en ?? "Tenant Services",
    description: page?.summary.en,
  };
}

export default async function Page({ params }: Props) {
  const { topic } = await params;
  if (!getServicePage("tenants", topic)) {
    notFound();
  }
  return <ServiceDetailView lang="en" group="tenants" slug={topic} />;
}
