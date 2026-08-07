import type { Language } from "./content";

type LocalizedText = Record<Language, string>;

type ServiceHighlight = {
  title: LocalizedText;
  body: LocalizedText;
};

type ServiceContext = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
  items: ServiceHighlight[];
};

export type HomeServicePage = {
  title: LocalizedText;
  eyebrow: LocalizedText;
  summary: LocalizedText;
  sectionTitle: LocalizedText;
  audienceTitle: LocalizedText;
  audienceBody: LocalizedText;
  approach: LocalizedText;
  highlights: ServiceHighlight[];
  context?: ServiceContext;
  reference?: {
    href: string;
    label: LocalizedText;
  };
};

export const homeServicePages = {
  "residential-management": {
    eyebrow: {
      en: "Our services · Residential",
      zh: "我们的服务 · 住宅物业",
    },
    title: {
      en: "Residential property management",
      zh: "住宅物业管理",
    },
    summary: {
      en: "End-to-end management for residential property owners and portfolios across Greater Auckland and Hamilton.",
      zh: "为大奥克兰及汉密尔顿的住宅房东与投资组合提供全流程物业管理。",
    },
    sectionTitle: {
      en: "Practical management at every stage of the tenancy.",
      zh: "覆盖租赁每个阶段的务实管理。",
    },
    audienceTitle: {
      en: "For owners who want clear oversight without managing every detail.",
      zh: "适合希望清晰掌握物业情况、但无需亲自处理每个细节的房东。",
    },
    audienceBody: {
      en: "We support individual owners, investors, family trusts and multi-property residential portfolios.",
      zh: "我们服务个人房东、投资者、家庭信托及多套住宅投资组合。",
    },
    approach: {
      en: "A direct point of contact, clear records and proactive follow-through from leasing to maintenance.",
      zh: "从招租到维修均由明确联系人跟进，并保持清晰记录与主动沟通。",
    },
    highlights: [
      {
        title: { en: "Marketing & letting", zh: "推广与招租" },
        body: {
          en: "Position the property, coordinate advertising and viewings, and keep the leasing process moving.",
          zh: "制定房源定位，协调推广与看房，并持续推进招租流程。",
        },
      },
      {
        title: { en: "Tenant selection", zh: "租客筛选" },
        body: {
          en: "Complete applications, checks, documentation and tenancy onboarding with consistent criteria.",
          zh: "以一致标准完成申请审核、背景核查、文件及入住安排。",
        },
      },
      {
        title: { en: "Rent & reporting", zh: "租金与报告" },
        body: {
          en: "Monitor rent, maintain transaction records and provide owners with clear property reporting.",
          zh: "跟进租金、保存交易记录，并向房东提供清晰的物业报告。",
        },
      },
      {
        title: { en: "Inspections & maintenance", zh: "巡检与维修" },
        body: {
          en: "Coordinate routine inspections, assess issues and manage approved repair work through to completion.",
          zh: "协调例行巡检、评估问题，并跟进获批维修直至完成。",
        },
      },
      {
        title: { en: "Compliance & records", zh: "合规与记录" },
        body: {
          en: "Maintain practical records and processes for tenancy obligations, Healthy Homes and property safety.",
          zh: "围绕租赁义务、健康家园标准及物业安全维护清晰流程与记录。",
        },
      },
    ],
  },
  "commercial-management": {
    eyebrow: {
      en: "Our services · Commercial",
      zh: "我们的服务 · 商业物业",
    },
    title: {
      en: "Commercial property management",
      zh: "商业物业管理",
    },
    summary: {
      en: "Coordinated lease, financial, tenant and operational management for commercial property owners.",
      zh: "为商业物业业主提供协调一致的租约、财务、租户及运营管理。",
    },
    sectionTitle: {
      en: "Protect the asset while keeping day-to-day operations clear.",
      zh: "在清晰管理日常运营的同时保护物业资产。",
    },
    audienceTitle: {
      en: "For owners of office, retail, industrial and mixed-use property.",
      zh: "适用于办公、零售、工业及混合用途物业业主。",
    },
    audienceBody: {
      en: "The service can be adapted to a single commercial property or a broader investment portfolio.",
      zh: "服务可根据单一商业物业或更广泛的投资组合进行调整。",
    },
    approach: {
      en: "One coordinated view of leases, income, tenants, maintenance, compliance and planned work.",
      zh: "统一协调租约、收入、租户、维修、合规及计划工程。",
    },
    highlights: [
      {
        title: { en: "Lease administration", zh: "租约管理" },
        body: {
          en: "Track key dates, obligations, reviews, renewals and the records that support each tenancy.",
          zh: "跟进关键日期、义务、租金审查、续租及每份租约相关记录。",
        },
      },
      {
        title: { en: "Financial management", zh: "财务管理" },
        body: {
          en: "Coordinate rent, outgoings, arrears follow-up, budgets and owner reporting.",
          zh: "协调租金、物业支出、欠款跟进、预算及业主报告。",
        },
      },
      {
        title: { en: "Tenant relationships", zh: "租户关系" },
        body: {
          en: "Maintain clear communication, respond to operational issues and keep agreed actions moving.",
          zh: "保持清晰沟通，响应运营问题，并持续推进约定事项。",
        },
      },
      {
        title: { en: "Property operations", zh: "物业运营" },
        body: {
          en: "Coordinate contractors, maintenance, access and planned works with minimal disruption.",
          zh: "协调承包商、维修、出入安排及计划工程，尽量减少影响。",
        },
      },
      {
        title: { en: "Compliance & risk", zh: "合规与风险" },
        body: {
          en: "Support practical compliance records, issue escalation and risk-aware property decisions.",
          zh: "支持合规记录、问题升级及具备风险意识的物业决策。",
        },
      },
    ],
  },
  "residents-society-management": {
    eyebrow: {
      en: "Our services · Residential Society",
      zh: "我们的服务 · 住户社团",
    },
    title: {
      en: "Residential Society",
      zh: "住户社团管理",
    },
    summary: {
      en: "Clear administration and coordinated shared-property operations for residential communities.",
      zh: "为住宅社区提供清晰的行政管理及公共物业运营协调。",
    },
    sectionTitle: {
      en: "Make shared responsibilities easier to understand and manage.",
      zh: "让共同责任更容易理解与管理。",
    },
    audienceTitle: {
      en: "For established societies and new residential communities.",
      zh: "适用于成熟住户社团及新建住宅社区。",
    },
    audienceBody: {
      en: "We help committees, owners and residents keep administration, common areas and communication organised.",
      zh: "协助委员会、业主与住户有序管理行政事务、公共区域及沟通。",
    },
    approach: {
      en: "Neutral coordination, documented decisions and a reliable process for everyday community matters.",
      zh: "以中立协调、书面决策及可靠流程处理日常社区事务。",
    },
    highlights: [
      {
        title: { en: "Administration & records", zh: "行政与记录" },
        body: {
          en: "Coordinate notices, meeting information, decisions, registers and routine society records.",
          zh: "协调通知、会议信息、决议、名册及社团日常记录。",
        },
      },
      {
        title: { en: "Resident communication", zh: "住户沟通" },
        body: {
          en: "Provide a clear channel for updates, enquiries, common-area issues and agreed follow-up.",
          zh: "为更新、咨询、公共区域问题及后续事项提供清晰沟通渠道。",
        },
      },
      {
        title: { en: "Shared-area operations", zh: "公共区域运营" },
        body: {
          en: "Coordinate maintenance, access, cleaning and services that support shared residential spaces.",
          zh: "协调公共住宅区域的维修、出入、清洁及配套服务。",
        },
      },
      {
        title: { en: "Contractor coordination", zh: "承包商协调" },
        body: {
          en: "Obtain information, schedule approved work and track contractors through to completion.",
          zh: "收集信息、安排获批工程，并跟进承包商直至完成。",
        },
      },
      {
        title: { en: "Budget oversight", zh: "预算监督" },
        body: {
          en: "Support transparent budgets, planned expenditure and straightforward financial reporting.",
          zh: "支持透明预算、计划支出及清晰直接的财务报告。",
        },
      },
    ],
  },
  "build-to-rent-community-housing": {
    eyebrow: {
      en: "Our services · Large-scale housing",
      zh: "我们的服务 · 大型住房项目",
    },
    title: {
      en: "Build-to-rent & community housing",
      zh: "长租开发与社区住房",
    },
    summary: {
      en: "Scalable mobilisation and management support for build-to-rent portfolios and Community Housing Providers (CHPs).",
      zh: "为长租开发投资组合及社区住房提供商（CHP）提供可扩展的启动与管理支持。",
    },
    sectionTitle: {
      en: "Management designed for housing at scale.",
      zh: "为规模化住房项目设计的管理体系。",
    },
    audienceTitle: {
      en: "For developers, institutional owners and Community Housing Providers.",
      zh: "适用于开发商、机构业主及社区住房提供商。",
    },
    audienceBody: {
      en: "Gramax can structure delivery for large portfolios, including programmes of 300 homes or more.",
      zh: "Gramax 可为大型投资组合设计交付方案，包括 300 套及以上的住房项目。",
    },
    approach: {
      en: "Defined workflows, portfolio-level reporting and consistent resident service from mobilisation onward.",
      zh: "从项目启动开始建立明确流程、组合级报告及一致的住户服务。",
    },
    context: {
      eyebrow: {
        en: "Housing models",
        zh: "住房模式",
      },
      title: {
        en: "Different housing models. Clear management boundaries.",
        zh: "不同住房模式，明确的管理边界。",
      },
      body: {
        en: "Build-to-rent and community housing can both involve large-scale, long-term rental operations, but they serve different purposes. Gramax structures tenancy and property management around the requirements of each portfolio.",
        zh: "长租开发与社区住房都可能涉及大规模、长期租赁运营，但服务目标并不相同。Gramax 可根据不同住房组合的要求，建立相应的租赁与物业管理体系。",
      },
      items: [
        {
          title: {
            en: "Build-to-rent portfolios",
            zh: "长租开发项目",
          },
          body: {
            en: "Purpose-built rental portfolios require coordinated leasing, resident communication, maintenance, compliance and reporting across many homes.",
            zh: "专门为长期出租而开发的住宅组合，需要在多套住房之间统一协调招租、住户沟通、维护、合规与报告。",
          },
        },
        {
          title: {
            en: "Community Housing Providers",
            zh: "社区住房提供商",
          },
          body: {
            en: "Community Housing Providers (CHPs) have social rental housing, affordable rental housing, or both, among their objectives. These tenancies are provided under the Residential Tenancies Act 1986, and some registered CHPs also offer other tenure types.",
            zh: "社区住房提供商（CHP）的目标包括提供社会租赁住房、可负担租赁住房，或两者兼有。相关租赁受《1986 年住宅租赁法》规范，部分注册 CHP 也提供其他住房持有或使用方式。",
          },
        },
        {
          title: {
            en: "Clear separation of services",
            zh: "明确区分不同服务",
          },
          body: {
            en: "Housing and tenancy management must be kept separate from support services. A tenant should not feel that declining a support service could place their tenancy at risk. Gramax focuses on the property and tenancy management function while coordinating clearly with the provider’s support teams.",
            zh: "住房及租赁管理必须与支持服务相互独立，租客不应担心拒绝支持服务会影响其租约。Gramax 专注于物业和租赁管理，并与住房提供商的支持团队保持清晰协作。",
          },
        },
        {
          title: {
            en: "Suitable for long-term independent renting",
            zh: "适合长期独立租住",
          },
          body: {
            en: "Community housing should be appropriate for long-term independent rental living and is generally not a boarding house with shared facilities. Local councils may also provide rental housing for people in need within their communities.",
            zh: "社区住房应适合长期、独立租住，通常不属于共享设施的寄宿屋。地方政府也可能为社区内有需要的人群提供租赁住房。",
          },
        },
      ],
    },
    highlights: [
      {
        title: { en: "Programme mobilisation", zh: "项目启动" },
        body: {
          en: "Plan systems, records, responsibilities and handover requirements before residents move in.",
          zh: "在住户入住前规划系统、记录、职责及交接要求。",
        },
      },
      {
        title: { en: "Leasing at scale", zh: "规模化租赁" },
        body: {
          en: "Coordinate marketing, applications, onboarding and availability across multiple homes.",
          zh: "协调多套住房的推广、申请、入住及房源状态。",
        },
      },
      {
        title: { en: "Portfolio operations", zh: "投资组合运营" },
        body: {
          en: "Use consistent processes for rent, inspections, maintenance, safety and contractor delivery.",
          zh: "以一致流程管理租金、巡检、维修、安全及承包商交付。",
        },
      },
      {
        title: { en: "Resident experience", zh: "住户体验" },
        body: {
          en: "Create clear communication and service pathways that can operate reliably at portfolio scale.",
          zh: "建立可在投资组合规模下可靠运行的沟通及服务路径。",
        },
      },
      {
        title: { en: "CHP coordination & reporting", zh: "CHP 协调与报告" },
        body: {
          en: "Provide defined reporting, tenancy records and operational coordination while keeping property management responsibilities separate from resident support services.",
          zh: "提供明确的报告、租赁记录与运营协调，同时确保物业管理职责与住户支持服务相互独立。",
        },
      },
    ],
    reference: {
      href: "https://www.chra.hud.govt.nz/about-chra/what-is-community-housing/",
      label: {
        en: "About Community Housing Providers — CHRA ↗",
        zh: "了解社区住房提供商 — CHRA ↗",
      },
    },
  },
} satisfies Record<string, HomeServicePage>;

export type HomeServiceSlug = keyof typeof homeServicePages;

export const homeServiceSlugs = Object.keys(
  homeServicePages,
) as HomeServiceSlug[];

export function isHomeServiceSlug(value: string): value is HomeServiceSlug {
  return value in homeServicePages;
}

export function getHomeServicePage(
  slug: string,
): HomeServicePage | undefined {
  return isHomeServiceSlug(slug) ? homeServicePages[slug] : undefined;
}
