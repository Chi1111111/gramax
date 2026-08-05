import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeServiceDetailView } from "../../../_components/HomeServicePages";
import {
  getHomeServicePage,
  homeServiceSlugs,
  isHomeServiceSlug,
} from "../../../_data/homeServices";

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
    title: page?.title.zh ?? "物业管理服务",
    description: page?.summary.zh,
  };
}

export default async function Page({ params }: Props) {
  const { service } = await params;

  if (!isHomeServiceSlug(service)) {
    notFound();
  }

  return <HomeServiceDetailView lang="zh" slug={service} />;
}
