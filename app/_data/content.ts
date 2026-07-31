export type Language = "en" | "zh";

export const tradeMeListingsUrl =
  "https://www.trademe.co.nz/a/property/office/8184652";

export const resourceGroups = [
  {
    id: "healthy-homes",
    audience: { en: "Landlords", zh: "房东" },
    title: { en: "Healthy Homes Standards", zh: "健康家园标准" },
    description: {
      en: "Heating, insulation, ventilation, moisture, drainage and draught-stopping requirements.",
      zh: "供暖、保温、通风、防潮排水与防风标准说明。",
    },
    pages: [
      { label: "中文 1", href: "/resources/brochure-01.jpg" },
      { label: "中文 2", href: "/resources/brochure-02.jpg" },
      { label: "English 1", href: "/resources/brochure-03.jpg" },
      { label: "English 2", href: "/resources/brochure-04.jpg" },
    ],
  },
  {
    id: "management",
    audience: { en: "Landlords", zh: "房东" },
    title: { en: "How We Manage Your Property", zh: "我们如何管理您的物业" },
    description: {
      en: "From onboarding and marketing through tenant selection, rent collection, inspections and maintenance.",
      zh: "从建档、推广、筛选租客，到收租、巡检和维修协调。",
    },
    pages: [
      { label: "中文 1", href: "/resources/brochure-05.jpg" },
      { label: "中文 2", href: "/resources/brochure-06.jpg" },
      { label: "English 2", href: "/resources/brochure-07.jpg" },
      { label: "English 1", href: "/resources/brochure-08.jpg" },
    ],
  },
  {
    id: "tenancy-types",
    audience: { en: "Tenants & landlords", zh: "租客与房东" },
    title: { en: "Tenancy Types & End of Tenancy", zh: "租约类型及租约终止" },
    description: {
      en: "A practical guide to fixed-term and periodic tenancies and their notice requirements.",
      zh: "固定期限和无固定期限租约，以及重要通知期说明。",
    },
    pages: [
      { label: "中文 2", href: "/resources/brochure-09.jpg" },
      { label: "中文 1", href: "/resources/brochure-10.jpg" },
      { label: "English 2", href: "/resources/brochure-11.jpg" },
      { label: "English 1", href: "/resources/brochure-12.jpg" },
    ],
  },
  {
    id: "professional-manager",
    audience: { en: "Landlords", zh: "房东" },
    title: { en: "Why Choose a Professional Manager", zh: "为什么选择专业物业管理" },
    description: {
      en: "Compliance, tenant screening, rent collection, maintenance and time-saving benefits.",
      zh: "合规、租客筛选、稳定收租、主动维修与节省房东时间。",
    },
    pages: [
      { label: "中文 1", href: "/resources/brochure-13.jpg" },
      { label: "中文 2", href: "/resources/brochure-14.jpg" },
      { label: "English 1", href: "/resources/brochure-15.jpg" },
      { label: "English 2", href: "/resources/brochure-16.jpg" },
    ],
  },
  {
    id: "rent-with-gramax",
    audience: { en: "Tenants", zh: "租客" },
    title: { en: "Why Rent With Gramax", zh: "为什么选择 Gramax 管理的房源" },
    description: {
      en: "Clear communication, prompt maintenance, fair processes and regular property care.",
      zh: "清晰沟通、及时维修、规范流程与定期物业维护。",
    },
    pages: [
      { label: "中文 1", href: "/resources/brochure-17.jpg" },
      { label: "English 1", href: "/resources/brochure-18.jpg" },
      { label: "中文 2", href: "/resources/brochure-19.jpg" },
      { label: "English 2", href: "/resources/brochure-20.jpg" },
    ],
  },
  {
    id: "inspections",
    audience: { en: "Tenants", zh: "租客" },
    title: { en: "Routine Property Inspections", zh: "例行物业检查" },
    description: {
      en: "Inspection notice, what we look for, attendance and maintenance reporting.",
      zh: "检查通知、检查内容、租客是否需要出席及维修申报说明。",
    },
    pages: [
      { label: "English 2", href: "/resources/brochure-21.jpg" },
      { label: "English 1", href: "/resources/brochure-22.jpg" },
    ],
  },
  {
    id: "smoke-alarms",
    audience: { en: "Tenants & landlords", zh: "租客与房东" },
    title: { en: "Smoke Alarm Safety", zh: "烟雾报警器安全" },
    description: {
      en: "Legal duties, tenant and landlord responsibilities, plus a declaration form.",
      zh: "法律要求、租客与房东责任，以及报警器确认表。",
    },
    pages: [
      { label: "Safety guide", href: "/resources/brochure-23.jpg" },
      { label: "Declaration form", href: "/resources/brochure-24.jpg" },
    ],
  },
  {
    id: "insurance",
    audience: { en: "Landlords", zh: "房东" },
    title: { en: "Landlord Insurance Tips", zh: "房东保险提示" },
    description: {
      en: "Records and supporting documents for claims, alongside independent insurance advice.",
      zh: "理赔所需物业记录及相关文件，以及独立保险建议提示。",
    },
    pages: [
      { label: "中文", href: "/resources/brochure-25.jpg" },
      { label: "English", href: "/resources/brochure-26.jpg" },
    ],
  },
  {
    id: "commercial",
    audience: { en: "Commercial owners", zh: "商业业主" },
    title: { en: "Commercial Property Management", zh: "商业物业管理" },
    description: {
      en: "Leasing, financials, property operations, compliance, tenant management and asset advisory.",
      zh: "租赁、财务、物业运营、合规、租客管理与资产管理建议。",
    },
    pages: [
      { label: "English", href: "/resources/brochure-27.jpg" },
      { label: "中文", href: "/resources/brochure-28.jpg" },
    ],
  },
  {
    id: "grace-luo",
    audience: { en: "About Gramax", zh: "关于 Gramax" },
    title: { en: "Grace Luo — Leadership Profile", zh: "Grace Luo — 创始人介绍" },
    description: {
      en: "Founder and Managing Director, property management practitioner and Bachelor of Laws candidate.",
      zh: "创始人兼负责人、资深物业管理从业者及法学学士在读。",
    },
    pages: [
      { label: "English", href: "/resources/brochure-29.jpg" },
      { label: "中文", href: "/resources/brochure-30.jpg" },
    ],
  },
] as const;

export const servicePillars = [
  {
    number: "01",
    title: { en: "Understand", zh: "充分了解" },
    body: {
      en: "We begin with the property, your priorities and the management outcome you need.",
      zh: "先了解物业情况、您的重点与期望的管理结果。",
    },
  },
  {
    number: "02",
    title: { en: "Prepare", zh: "合规准备" },
    body: {
      en: "Records, compliance, marketing and tenancy documentation are set up with care.",
      zh: "认真建立档案，完成合规、推广及租约文件准备。",
    },
  },
  {
    number: "03",
    title: { en: "Select", zh: "筛选租客" },
    body: {
      en: "Applications are checked consistently, then suitable candidates are presented for approval.",
      zh: "统一核查申请，并把合适的候选租客提交房东确认。",
    },
  },
  {
    number: "04",
    title: { en: "Manage", zh: "持续管理" },
    body: {
      en: "Rent, communication, inspections, maintenance and reporting stay structured throughout the tenancy.",
      zh: "租期内持续管理租金、沟通、检查、维修与报告。",
    },
  },
] as const;
