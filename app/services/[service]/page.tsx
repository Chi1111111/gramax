import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeServiceDetailView } from "../../_components/HomeServicePages";
import {
  getHomeServicePage,
  homeServiceSlugs,
  isHomeServiceSlug,
} from "../../_data/homeServices";

type Props = {
  params: Promise<{ service: string }>;
};

export function generateStaticParams() {
  return homeServiceSlugs.map((service) => ({ service }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const page = getHomeServicePage(service);

  return {
    title: page?.title.en ?? "Property Management Services",
    description: page?.summary.en,
  };
}

export default async function Page({ params }: Props) {
  const { service } = await params;

  if (!isHomeServiceSlug(service)) {
    notFound();
  }

  return <HomeServiceDetailView lang="en" slug={service} />;
}
