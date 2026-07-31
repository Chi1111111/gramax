import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailView } from "../../_components/ServicePages";
import { getServicePage } from "../../_data/servicePages";

type Props = {
  params: Promise<{ topic: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const page = getServicePage("landlords", topic);
  return {
    title: page?.title.en ?? "Property Owner Services",
    description: page?.summary.en,
  };
}

export default async function Page({ params }: Props) {
  const { topic } = await params;
  if (!getServicePage("landlords", topic)) {
    notFound();
  }
  return <ServiceDetailView lang="en" group="landlords" slug={topic} />;
}
