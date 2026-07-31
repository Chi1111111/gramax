import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderView } from "../../_components/PageViews";
import { ServiceDetailView } from "../../_components/ServicePages";
import {
  getServicePage,
  type ServiceGroup,
} from "../../_data/servicePages";

const titles: Record<string, string> = {
  home: "贵鑫物业管理",
  landlords: "房东服务",
  tenants: "租客服务",
  commercial: "商业物业管理",
  rentals: "出租房源",
  resources: "资料中心",
  team: "Gramax 团队",
  about: "关于 Gramax",
  contact: "联系 Gramax",
  appraisal: "免费租金评估",
  privacy: "隐私声明",
};

type Props = {
  params: Promise<{ slug?: string[] }>;
};

function isServiceGroup(value: string): value is ServiceGroup {
  return ["landlords", "tenants", "commercial"].includes(value);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug?.length === 2 && isServiceGroup(slug[0])) {
    const servicePage = getServicePage(slug[0], slug[1]);
    if (servicePage) {
      return {
        title: servicePage.title.zh,
        description: servicePage.summary.zh,
      };
    }
  }
  const key = slug?.[0] ?? "home";
  return {
    title: titles[key] ?? titles.home,
    description: "Gramax 贵鑫物业管理：新西兰住宅与商业物业租赁、管理及社区服务。",
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (slug?.length === 2 && isServiceGroup(slug[0])) {
    if (!getServicePage(slug[0], slug[1])) {
      notFound();
    }
    return (
      <ServiceDetailView lang="zh" group={slug[0]} slug={slug[1]} />
    );
  }
  if (slug && slug.length > 1) {
    notFound();
  }
  const view = renderView(slug?.[0], "zh");
  if (!view) {
    notFound();
  }
  return view;
}
