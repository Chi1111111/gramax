import type { Language } from "./content";

export type ServiceGroup = "landlords" | "tenants" | "commercial";

type Localized = Record<Language, string>;

export type ServicePageContent = {
  group: ServiceGroup;
  slug: string;
  eyebrow: Localized;
  title: Localized;
  summary: Localized;
  sectionTitle: Localized;
  highlights: Array<{
    title: Localized;
    body: Localized;
  }>;
  resourceId: string;
  form?: "maintenance";
};

export const serviceGroupContent: Record<
  ServiceGroup,
  {
    eyebrow: Localized;
    title: Localized;
    summary: Localized;
  }
> = {
  landlords: {
    eyebrow: { en: "For property owners", zh: "房东服务" },
    title: {
      en: "Property management, divided into clear areas of responsibility.",
      zh: "将物业管理拆分为清晰的责任领域。",
    },
    summary: {
      en: "Choose the service page that matches the information or support you need.",
      zh: "根据您需要了解或处理的事项，进入对应的独立服务页面。",
    },
  },
  tenants: {
    eyebrow: { en: "For tenants", zh: "租客服务" },
    title: {
      en: "Straightforward support throughout the tenancy.",
      zh: "覆盖整个租期的清晰支持。",
    },
    summary: {
      en: "Find information about renting with Gramax, maintenance, inspections, tenancy processes and safety.",
      zh: "分别查看 Gramax 租房、维修、巡检、租约流程及居住安全信息。",
    },
  },
  commercial: {
    eyebrow: { en: "Commercial property", zh: "商业物业" },
    title: {
      en: "Commercial management, organised by operating function.",
      zh: "按运营职能划分的商业物业管理。",
    },
    summary: {
      en: "Each part of the commercial management service has its own focused page.",
      zh: "商业物业管理的每个主要部分都有独立介绍页面。",
    },
  },
};

export const servicePages: ServicePageContent[] = [
  {
    group: "landlords",
    slug: "management",
    eyebrow: { en: "Property owners", zh: "房东服务" },
    title: { en: "Complete property management", zh: "完整物业管理" },
    summary: {
      en: "One structured service from property preparation and marketing through ongoing tenancy management.",
      zh: "从物业准备和市场推广，到租期内持续管理的一套完整服务。",
    },
    sectionTitle: {
      en: "Every stage has a clear owner and process.",
      zh: "每个阶段都有明确负责人和流程。",
    },
    highlights: [
      {
        title: { en: "Preparation & marketing", zh: "准备与市场推广" },
        body: {
          en: "Property information, compliance records, presentation, photography, advertising and viewing enquiries are prepared and coordinated.",
          zh: "整理物业信息与合规记录，并协调房源展示、摄影、广告及看房咨询。",
        },
      },
      {
        title: { en: "Tenant selection", zh: "租客筛选" },
        body: {
          en: "Applications are assessed consistently across employment, rental history, references and credit information.",
          zh: "统一核查申请人的就业、租赁历史、推荐资料及信用信息。",
        },
      },
      {
        title: { en: "Rent & tenancy records", zh: "租金与租约记录" },
        body: {
          en: "Rent collection, arrears follow-up, notices, tenancy documents and owner reporting remain organised.",
          zh: "规范管理租金收取、欠租跟进、通知、租约文件及房东报告。",
        },
      },
      {
        title: { en: "Ongoing property care", zh: "持续物业维护" },
        body: {
          en: "Routine inspections, maintenance requests, owner approvals and contractor follow-up are coordinated throughout the tenancy.",
          zh: "在租期内持续协调例行检查、维修申请、房东批准及承包商跟进。",
        },
      },
    ],
    resourceId: "management",
  },
  {
    group: "landlords",
    slug: "compliance",
    eyebrow: { en: "Property owners", zh: "房东服务" },
    title: { en: "Healthy Homes & tenancy compliance", zh: "健康家园与租赁合规" },
    summary: {
      en: "Practical support for property standards, notices, safety duties and compliance records.",
      zh: "围绕物业标准、通知、安全责任及合规记录提供实际支持。",
    },
    sectionTitle: {
      en: "Compliance should be documented, monitored and followed through.",
      zh: "合规需要有记录、有跟进并持续落实。",
    },
    highlights: [
      {
        title: { en: "Healthy Homes Standards", zh: "健康家园标准" },
        body: {
          en: "Heating, insulation, ventilation, moisture ingress and drainage, and draught stopping requirements are identified and recorded.",
          zh: "识别并记录供暖、保温、通风、防潮排水及防风方面的要求。",
        },
      },
      {
        title: { en: "Correct tenancy procedures", zh: "正确租赁流程" },
        body: {
          en: "Tenancy documents, written notices and process timing are handled with attention to New Zealand requirements.",
          zh: "按照新西兰相关要求处理租约文件、书面通知及流程时间。",
        },
      },
      {
        title: { en: "Safety & records", zh: "安全与记录" },
        body: {
          en: "Smoke alarm responsibilities, property records and compliance follow-up remain visible throughout the tenancy.",
          zh: "在整个租期内持续关注烟雾报警器责任、物业记录及合规跟进。",
        },
      },
    ],
    resourceId: "healthy-homes",
  },
  {
    group: "landlords",
    slug: "inspections-maintenance",
    eyebrow: { en: "Property owners", zh: "房东服务" },
    title: { en: "Inspections & maintenance", zh: "巡检与维修" },
    summary: {
      en: "Regular condition records and practical repair coordination help protect the property.",
      zh: "定期记录物业状况并务实协调维修，有助于保护物业。",
    },
    sectionTitle: {
      en: "Identify issues early and keep decisions clear.",
      zh: "尽早发现问题，让每个决定保持清晰。",
    },
    highlights: [
      {
        title: { en: "Routine inspections", zh: "例行检查" },
        body: {
          en: "Inspections use proper written notice and document condition, maintenance needs and visible safety concerns.",
          zh: "检查会提前书面通知，并记录物业状况、维修需求及可见安全问题。",
        },
      },
      {
        title: { en: "Owner communication", zh: "房东沟通" },
        body: {
          en: "Material issues are reported with practical information so owners can make informed approval decisions.",
          zh: "针对重要问题提供实际信息，协助房东作出知情批准决定。",
        },
      },
      {
        title: { en: "Repair coordination", zh: "维修协调" },
        body: {
          en: "Approved work is coordinated with suitable contractors and followed through to completion.",
          zh: "与合适承包商协调获批维修，并持续跟进直至完成。",
        },
      },
    ],
    resourceId: "inspections",
  },
  {
    group: "landlords",
    slug: "insurance",
    eyebrow: { en: "Property owners", zh: "房东服务" },
    title: { en: "Insurance records & claim support", zh: "保险记录与理赔资料支持" },
    summary: {
      en: "Well-kept tenancy and property records can make insurance discussions and claims easier.",
      zh: "完整的租约与物业记录可以让保险沟通和理赔更顺畅。",
    },
    sectionTitle: {
      en: "Reliable records support a stronger evidence trail.",
      zh: "可靠记录能够形成更完整的证据链。",
    },
    highlights: [
      {
        title: { en: "Tenancy documentation", zh: "租约文件" },
        body: {
          en: "Signed agreements, notices, communication and payment information are retained in an organised tenancy file.",
          zh: "在规范租约档案中保留已签协议、通知、沟通及付款信息。",
        },
      },
      {
        title: { en: "Condition evidence", zh: "物业状况证据" },
        body: {
          en: "Inspection reports, photographs and maintenance records help show property condition over time.",
          zh: "检查报告、照片及维修记录有助于证明物业在不同时间的状况。",
        },
      },
      {
        title: { en: "Independent insurance advice", zh: "独立保险建议" },
        body: {
          en: "Gramax supports the property records; owners should confirm policy scope and claim advice with their insurer or adviser.",
          zh: "Gramax 负责协助整理物业记录；保单范围和理赔建议应由房东与保险公司或独立顾问确认。",
        },
      },
    ],
    resourceId: "insurance",
  },
  {
    group: "tenants",
    slug: "renting",
    eyebrow: { en: "Tenant support", zh: "租客服务" },
    title: { en: "Renting with Gramax", zh: "选择 Gramax 管理的房源" },
    summary: {
      en: "Clear communication, fair processes and practical support throughout the tenancy.",
      zh: "在整个租期内提供清晰沟通、公平流程及实际支持。",
    },
    sectionTitle: {
      en: "A well-managed tenancy should feel predictable.",
      zh: "管理良好的租约关系应当清楚、可预期。",
    },
    highlights: [
      {
        title: { en: "Clear communication", zh: "清晰沟通" },
        body: {
          en: "Tenancy information, responsibilities and next steps are communicated consistently.",
          zh: "持续清晰说明租约信息、双方责任及下一步安排。",
        },
      },
      {
        title: { en: "Fair processes", zh: "规范公平流程" },
        body: {
          en: "Applications, notices, inspections and tenancy matters follow organised processes.",
          zh: "申请、通知、检查及租约事项均按照规范流程处理。",
        },
      },
      {
        title: { en: "Property care", zh: "物业维护" },
        body: {
          en: "Maintenance requests are recorded and suitable approved work is coordinated.",
          zh: "维修申请会被记录，并协调合适的获批维修工作。",
        },
      },
    ],
    resourceId: "rent-with-gramax",
  },
  {
    group: "tenants",
    slug: "maintenance",
    eyebrow: { en: "Tenant support", zh: "租客服务" },
    title: { en: "Report a maintenance issue", zh: "申报维修问题" },
    summary: {
      en: "Early, specific reporting helps the team assess and coordinate the right response.",
      zh: "尽早提供具体信息，有助于团队评估并协调正确处理方式。",
    },
    sectionTitle: {
      en: "What makes a useful maintenance report.",
      zh: "怎样提交有效的维修申报。",
    },
    highlights: [
      {
        title: { en: "Describe the issue", zh: "说明问题" },
        body: {
          en: "Explain what happened, where it is located, when it began and whether the issue is changing.",
          zh: "说明发生了什么、具体位置、开始时间，以及问题是否正在变化。",
        },
      },
      {
        title: { en: "Add useful evidence", zh: "补充有效资料" },
        body: {
          en: "Clear photographs and access information can help assessment and contractor planning.",
          zh: "清晰照片及进门安排有助于评估问题并安排承包商。",
        },
      },
      {
        title: { en: "Immediate danger", zh: "紧急危险" },
        body: {
          en: "For an immediate threat to people or property, contact emergency services first, then notify Gramax.",
          zh: "如对人员或物业构成立即危险，请先联系紧急服务，再通知 Gramax。",
        },
      },
    ],
    resourceId: "rent-with-gramax",
    form: "maintenance",
  },
  {
    group: "tenants",
    slug: "tenancy-types",
    eyebrow: { en: "Tenant guide", zh: "租客指南" },
    title: { en: "Tenancy types & ending a tenancy", zh: "租约类型与租约终止" },
    summary: {
      en: "Fixed-term and periodic tenancies have different rules, notice requirements and ending processes.",
      zh: "固定期限与无固定期限租约适用不同规则、通知要求及终止流程。",
    },
    sectionTitle: {
      en: "Understand the agreement before planning the next step.",
      zh: "在安排下一步前，先了解租约类型。",
    },
    highlights: [
      {
        title: { en: "Fixed-term tenancy", zh: "固定期限租约" },
        body: {
          en: "The agreement runs to a stated date and can only end early in the circumstances allowed by law or agreement.",
          zh: "租约持续至约定日期，只有在法律或协议允许的情况下才可提前终止。",
        },
      },
      {
        title: { en: "Periodic tenancy", zh: "无固定期限租约" },
        body: {
          en: "The tenancy continues until the correct party gives valid written notice using the required timing.",
          zh: "租约持续有效，直至相关一方按照规定时间发出有效书面通知。",
        },
      },
      {
        title: { en: "Final steps", zh: "退租最后步骤" },
        body: {
          en: "Plan for notice, cleaning, final inspection, key return, outstanding payments and bond processing.",
          zh: "需要安排通知、清洁、最终检查、钥匙归还、未结款项及押金手续。",
        },
      },
    ],
    resourceId: "tenancy-types",
  },
  {
    group: "tenants",
    slug: "inspections",
    eyebrow: { en: "Tenant guide", zh: "租客指南" },
    title: { en: "Routine property inspections", zh: "例行物业检查" },
    summary: {
      en: "What inspections cover, how notice works and what tenants can expect.",
      zh: "了解检查内容、通知方式以及租客可以预期的流程。",
    },
    sectionTitle: {
      en: "A documented check of property condition and care.",
      zh: "对物业状况和维护情况进行有记录的检查。",
    },
    highlights: [
      {
        title: { en: "Written notice", zh: "书面通知" },
        body: {
          en: "Tenants receive notice before the inspection in line with the required process.",
          zh: "租客会按照规定流程在检查前收到通知。",
        },
      },
      {
        title: { en: "What is checked", zh: "检查内容" },
        body: {
          en: "The inspection records general condition, visible damage, maintenance needs and safety concerns.",
          zh: "检查会记录整体状况、可见损坏、维修需求及安全问题。",
        },
      },
      {
        title: { en: "Attendance & reporting", zh: "是否到场与问题申报" },
        body: {
          en: "Tenants do not usually need to attend and should report maintenance issues before or during the process.",
          zh: "租客通常不需要到场，并应在检查前或检查过程中申报维修问题。",
        },
      },
    ],
    resourceId: "inspections",
  },
  {
    group: "tenants",
    slug: "smoke-alarms",
    eyebrow: { en: "Tenant guide", zh: "租客指南" },
    title: { en: "Smoke alarm safety", zh: "烟雾报警器安全" },
    summary: {
      en: "Clear owner and tenant responsibilities help keep alarms compliant and working.",
      zh: "明确房东与租客责任，有助于保持报警器合规并正常工作。",
    },
    sectionTitle: {
      en: "Safety depends on installation, care and early reporting.",
      zh: "安全取决于正确安装、日常保护及及时报告。",
    },
    highlights: [
      {
        title: { en: "Owner responsibilities", zh: "房东责任" },
        body: {
          en: "Owners must provide the required compliant alarms at the start of the tenancy and address reported faults.",
          zh: "房东需要在租约开始时提供符合要求的报警器，并处理已报告故障。",
        },
      },
      {
        title: { en: "Tenant responsibilities", zh: "租客责任" },
        body: {
          en: "Tenants must not damage, remove or disable alarms and should replace batteries where required.",
          zh: "租客不得损坏、拆除或停用报警器，并应在需要时更换电池。",
        },
      },
      {
        title: { en: "Report faults promptly", zh: "及时报告故障" },
        body: {
          en: "A missing, damaged or non-working alarm should be reported to the property manager without delay.",
          zh: "如报警器缺失、损坏或无法工作，应立即向物业经理报告。",
        },
      },
    ],
    resourceId: "smoke-alarms",
  },
  {
    group: "commercial",
    slug: "lease-management",
    eyebrow: { en: "Commercial management", zh: "商业物业管理" },
    title: { en: "Lease management", zh: "租约管理" },
    summary: {
      en: "Structured administration across lease documentation, renewals, reviews and changes.",
      zh: "规范管理租约文件、续租、租金审查及条款变更。",
    },
    sectionTitle: {
      en: "Keep lease obligations and important dates visible.",
      zh: "让租约义务和重要日期保持清晰。",
    },
    highlights: [
      {
        title: { en: "Lease documentation", zh: "租约文件" },
        body: {
          en: "Coordinate drafting, review, signing and the supporting information needed for the tenancy file.",
          zh: "协调起草、审查、签署及商业租约档案所需支持资料。",
        },
      },
      {
        title: { en: "Renewals & termination", zh: "续租与终止" },
        body: {
          en: "Monitor key dates and coordinate renewal, expiry or termination processes.",
          zh: "跟踪关键日期并协调续租、到期或终止流程。",
        },
      },
      {
        title: { en: "Rent reviews & variations", zh: "租金审查与条款变更" },
        body: {
          en: "Track review dates and document agreed rent or lease variations clearly.",
          zh: "跟踪审查日期并清晰记录已达成的租金或租约变更。",
        },
      },
    ],
    resourceId: "commercial",
  },
  {
    group: "commercial",
    slug: "financial-management",
    eyebrow: { en: "Commercial management", zh: "商业物业管理" },
    title: { en: "Financial management", zh: "财务管理" },
    summary: {
      en: "Rent, arrears, outgoings, budgets and reconciliations kept organised.",
      zh: "规范管理租金、欠款、物业支出、预算及核算。",
    },
    sectionTitle: {
      en: "Clear records support better property decisions.",
      zh: "清晰记录有助于作出更好的物业决策。",
    },
    highlights: [
      {
        title: { en: "Rent & arrears", zh: "租金与欠款" },
        body: {
          en: "Collect rent, monitor payment status and follow up arrears through the agreed process.",
          zh: "收取租金、监控付款状态并按约定流程跟进欠款。",
        },
      },
      {
        title: { en: "Outgoings & budgets", zh: "物业支出与预算" },
        body: {
          en: "Coordinate recoverable outgoings, property budgets and supporting financial information.",
          zh: "协调可回收物业支出、物业预算及相关财务资料。",
        },
      },
      {
        title: { en: "Reporting & reconciliation", zh: "报告与核算" },
        body: {
          en: "Maintain clear owner reporting and periodic reconciliation records.",
          zh: "保持清晰的业主报告及定期核算记录。",
        },
      },
    ],
    resourceId: "commercial",
  },
  {
    group: "commercial",
    slug: "property-operations",
    eyebrow: { en: "Commercial management", zh: "商业物业管理" },
    title: { en: "Property operations", zh: "物业运营" },
    summary: {
      en: "Day-to-day inspections, maintenance and contractor coordination.",
      zh: "负责日常检查、维修及承包商协调。",
    },
    sectionTitle: {
      en: "Practical follow-through keeps the building operating.",
      zh: "务实跟进让物业保持正常运营。",
    },
    highlights: [
      {
        title: { en: "Property inspections", zh: "物业检查" },
        body: {
          en: "Monitor visible condition, operational issues and maintenance priorities.",
          zh: "检查可见状况、运营问题及维修优先级。",
        },
      },
      {
        title: { en: "Maintenance planning", zh: "维修规划" },
        body: {
          en: "Assess reported issues, seek approval and coordinate suitable work.",
          zh: "评估已报告问题、申请批准并协调合适维修。",
        },
      },
      {
        title: { en: "Contractor coordination", zh: "承包商协调" },
        body: {
          en: "Arrange access, communication and practical follow-up with contractors.",
          zh: "与承包商协调进场、沟通及后续跟进。",
        },
      },
    ],
    resourceId: "commercial",
  },
  {
    group: "commercial",
    slug: "compliance",
    eyebrow: { en: "Commercial management", zh: "商业物业管理" },
    title: { en: "Commercial compliance", zh: "商业物业合规" },
    summary: {
      en: "Health and safety, fire safety, building obligations and compliance records.",
      zh: "管理健康安全、消防安全、建筑义务及合规记录。",
    },
    sectionTitle: {
      en: "Keep obligations, evidence and follow-up visible.",
      zh: "让义务、证据及后续跟进保持清晰。",
    },
    highlights: [
      {
        title: { en: "Health & safety", zh: "健康与安全" },
        body: {
          en: "Coordinate relevant property information, reported hazards and agreed follow-up actions.",
          zh: "协调相关物业信息、已报告风险及约定的跟进行动。",
        },
      },
      {
        title: { en: "Fire & building obligations", zh: "消防与建筑义务" },
        body: {
          en: "Monitor relevant fire safety, building code and BWOF requirements.",
          zh: "关注相关消防安全、建筑规范及 BWOF 要求。",
        },
      },
      {
        title: { en: "Compliance records", zh: "合规记录" },
        body: {
          en: "Retain supporting documents, service information and follow-up records.",
          zh: "保留支持文件、服务资料及后续记录。",
        },
      },
    ],
    resourceId: "commercial",
  },
  {
    group: "commercial",
    slug: "tenant-management",
    eyebrow: { en: "Commercial management", zh: "商业物业管理" },
    title: { en: "Commercial tenant management", zh: "商业租客管理" },
    summary: {
      en: "Consistent communication from onboarding through the end of occupation.",
      zh: "从入驻到退租保持一致、清晰的沟通。",
    },
    sectionTitle: {
      en: "One clear contact point for tenancy matters.",
      zh: "为租赁事项提供统一清晰的联系窗口。",
    },
    highlights: [
      {
        title: { en: "Onboarding", zh: "入驻交接" },
        body: {
          en: "Coordinate lease information, contacts, access and initial property requirements.",
          zh: "协调租约信息、联系人、进出安排及初始物业要求。",
        },
      },
      {
        title: { en: "Ongoing communication", zh: "持续沟通" },
        body: {
          en: "Manage questions, operational issues and documented tenancy communication.",
          zh: "管理咨询、运营问题及有记录的租约沟通。",
        },
      },
      {
        title: { en: "Disputes & vacating", zh: "纠纷与退租" },
        body: {
          en: "Support practical issue resolution and coordinate end-of-lease handover.",
          zh: "协助实际解决问题并协调租约结束交接。",
        },
      },
    ],
    resourceId: "commercial",
  },
  {
    group: "commercial",
    slug: "asset-advisory",
    eyebrow: { en: "Commercial management", zh: "商业物业管理" },
    title: { en: "Asset advisory", zh: "资产管理建议" },
    summary: {
      en: "Practical input on rent, vacancy, leasing and longer-term property planning.",
      zh: "围绕租金、空置、招租及长期物业规划提供实际建议。",
    },
    sectionTitle: {
      en: "Connect day-to-day information with longer-term outcomes.",
      zh: "将日常运营信息与长期结果相连接。",
    },
    highlights: [
      {
        title: { en: "Market rent assessment", zh: "市场租金评估" },
        body: {
          en: "Review available market evidence and the property’s current position.",
          zh: "结合市场资料及物业当前状况评估租金。",
        },
      },
      {
        title: { en: "Vacancy & leasing", zh: "空置与招租" },
        body: {
          en: "Plan practical marketing and leasing activity for available space.",
          zh: "针对空置空间规划务实的市场推广及招租工作。",
        },
      },
      {
        title: { en: "Property planning", zh: "物业规划" },
        body: {
          en: "Use operational, maintenance and tenancy information to support future priorities.",
          zh: "利用运营、维修及租客信息支持未来物业优先事项。",
        },
      },
    ],
    resourceId: "commercial",
  },
];

export function getServicePages(group: ServiceGroup) {
  return servicePages.filter((page) => page.group === group);
}

export function getServicePage(group: ServiceGroup, slug: string) {
  return servicePages.find(
    (page) => page.group === group && page.slug === slug,
  );
}
