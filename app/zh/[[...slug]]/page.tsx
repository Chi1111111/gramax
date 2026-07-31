import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderView } from "../../_components/PageViews";

const titles: Record<string, string> = {
  home: "贵鑫物业管理",
  landlords: "房东服务",
  tenants: "租客服务",
  commercial: "商业物业管理",
  rentals: "出租房源",
  resources: "资料中心",
  about: "关于 Gramax",
  contact: "联系 Gramax",
  appraisal: "免费租金评估",
  privacy: "隐私声明",
};

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const key = slug?.[0] ?? "home";
  return {
    title: titles[key] ?? titles.home,
    description: "Gramax 贵鑫物业管理：新西兰住宅与商业物业租赁、管理及社区服务。",
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (slug && slug.length > 1) {
    notFound();
  }
  const view = renderView(slug?.[0], "zh");
  if (!view) {
    notFound();
  }
  return view;
}
