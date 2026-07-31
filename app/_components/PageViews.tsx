import Image from "next/image";
import Link from "next/link";
import { InquiryForm } from "./InquiryForm";
import {
  ArrowLink,
  PageIntro,
  SectionHeading,
  SiteFrame,
} from "./SiteFrame";
import {
  resourceGroups,
  type Language,
} from "../_data/content";

function t(lang: Language, en: string, zh: string) {
  return lang === "zh" ? zh : en;
}

function path(lang: Language, value: string) {
  return lang === "zh" ? `/zh${value === "/" ? "" : value}` : value;
}

const landlordServices = [
  {
    en: "Property onboarding",
    zh: "物业建档",
    detailEn: "Property information, records and management requirements set up clearly.",
    detailZh: "清晰整理物业信息、档案及管理要求。",
  },
  {
    en: "Compliance support",
    zh: "合规管理",
    detailEn: "Healthy Homes, smoke alarms and tenancy documentation monitored.",
    detailZh: "持续关注健康家园标准、烟雾报警及租约文件。",
  },
  {
    en: "Marketing & viewings",
    zh: "市场推广与看房",
    detailEn: "Advertising preparation, photography coordination and enquiry management.",
    detailZh: "准备广告、协调拍摄并统一管理租客咨询。",
  },
  {
    en: "Tenant selection",
    zh: "租客筛选",
    detailEn: "Employment, rental history, references and credit checks assessed consistently.",
    detailZh: "统一核查就业、租赁历史、推荐人与信用记录。",
  },
  {
    en: "Rent & reporting",
    zh: "租金与报告",
    detailEn: "Rent collection, arrears follow-up and financial records kept structured.",
    detailZh: "规范处理租金收取、欠租跟进及财务记录。",
  },
  {
    en: "Inspections & maintenance",
    zh: "巡检与维修",
    detailEn: "Routine inspections, repair coordination and approved contractor follow-up.",
    detailZh: "安排例行检查、维修协调及合格承包商跟进。",
  },
] as const;

const commercialServices = [
  {
    id: "lease-management",
    en: "Lease management",
    zh: "租赁管理",
    detailEn: "Lease drafting and review, renewals, termination, rent reviews and variations.",
    detailZh: "租约起草审查、续租终止、租金调整与部分租约条款变更。",
  },
  {
    id: "financial-management",
    en: "Financial management",
    zh: "财务管理",
    detailEn: "Rent collection, arrears recovery, outgoings, budgets and reconciliations.",
    detailZh: "租金收取、欠租追收、物业支出、预算及核算。",
  },
  {
    id: "property-operations",
    en: "Property operations",
    zh: "物业运营",
    detailEn: "Inspections, maintenance, contractors and BWOF compliance management.",
    detailZh: "巡检、维修、承包商及 BWOF 合规管理。",
  },
  {
    id: "commercial-compliance",
    en: "Compliance",
    zh: "合规管理",
    detailEn: "Health and safety, fire safety and building code obligations.",
    detailZh: "健康安全、消防安全及建筑法规合规。",
  },
  {
    id: "tenant-management",
    en: "Tenant management",
    zh: "租客管理",
    detailEn: "Communication, dispute resolution, onboarding and vacating.",
    detailZh: "租客沟通、纠纷处理、入住与退租交接。",
  },
  {
    id: "asset-advisory",
    en: "Asset advisory",
    zh: "资产管理建议",
    detailEn: "Market rent assessment, vacancy leasing and practical asset planning.",
    detailZh: "市场租金评估、空置招租及实用资产规划建议。",
  },
] as const;

export function HomeView({ lang }: { lang: Language }) {
  return (
    <SiteFrame lang={lang} currentPath="/">
      <section className="hero brand-hero">
        <div className="container brand-hero-shell">
          <Image
            className="brand-hero-logo"
            src={
              lang === "zh"
                ? "/brand/gramax-logo-zh.png"
                : "/brand/gramax-logo-en.png"
            }
            alt={t(lang, "Gramax Property Management", "Gramax 贵鑫物业管理")}
            width={568}
            height={406}
            priority
          />
          <div className="brand-hero-roof" aria-hidden="true">
            <span />
          </div>
          <h1>
            {t(
              lang,
              "Professional property management. Clear, compliant, dependable.",
              "专业物业管理。清晰、合规、可靠。",
            )}
          </h1>
          <p className="brand-hero-name">
            {t(lang, "Gramax Property Management", "Gramax 贵鑫物业管理")}
          </p>
          <p className="brand-hero-lead">
            {t(
              lang,
              "Personal, practical property management for Auckland owners and tenants.",
              "为奥克兰房东与租客提供务实、细致的物业管理服务。",
            )}
          </p>
          <div className="button-row">
            <Link className="button" href={path(lang, "/rentals")}>
              {t(lang, "View available properties", "查看可租房源")}
            </Link>
            <Link className="button button-secondary" href={path(lang, "/team")}>
              {t(lang, "Meet our team", "认识我们的团队")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-links-section">
        <div className="container">
          <SectionHeading
            eyebrow={t(lang, "Essential pages", "核心入口")}
            title={t(lang, "Start where you need.", "从您需要的页面开始。")}
          />
          <div className="audience-grid">
            <article className="audience-card audience-card-dark">
              <span className="card-index">01</span>
              <h3>{t(lang, "Current rentals", "当前房源")}</h3>
              <p>
                {t(
                  lang,
                  "Browse Gramax-managed residential rentals and commercial spaces.",
                  "查看由 Gramax 管理的住宅出租及商业物业。",
                )}
              </p>
              <ArrowLink href={path(lang, "/rentals")}>
                {t(lang, "View properties", "查看房源")}
              </ArrowLink>
            </article>
            <article className="audience-card">
              <span className="card-index">02</span>
              <h3>{t(lang, "Our team", "团队介绍")}</h3>
              <p>
                {t(
                  lang,
                  "Meet the people responsible for the care, communication and follow-through.",
                  "了解负责物业维护、沟通与持续跟进的 Gramax 团队。",
                )}
              </p>
              <ArrowLink href={path(lang, "/team")}>
                {t(lang, "Meet Gramax", "认识 Gramax")}
              </ArrowLink>
            </article>
            <article className="audience-card">
              <span className="card-index">03</span>
              <h3>{t(lang, "For property owners", "房东服务")}</h3>
              <p>
                {t(
                  lang,
                  "Letting, tenant selection, rent, inspections, maintenance and compliance.",
                  "招租、租客筛选、收租、巡检、维修及合规管理。",
                )}
              </p>
              <ArrowLink href={path(lang, "/landlords")}>
                {t(lang, "Explore owner services", "查看房东服务")}
              </ArrowLink>
            </article>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner">
          <div>
            <p className="eyebrow">{t(lang, "A clearer next step", "从清晰的一步开始")}</p>
            <h2>{t(lang, "Find out what your property could achieve.", "了解您的物业可以实现怎样的回报。")}</h2>
          </div>
          <Link className="button button-light" href={path(lang, "/appraisal")}>
            {t(lang, "Request an appraisal", "申请租金评估")}
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}

export function LandlordsView({ lang }: { lang: Language }) {
  return (
    <SiteFrame lang={lang} currentPath="/landlords">
      <PageIntro
        eyebrow={t(lang, "For landlords", "房东服务")}
        title={t(lang, "Protect the asset. Reduce the operational load.", "保护资产，减少房东的日常负担。")}
        body={t(
          lang,
          "Gramax provides a structured management system for the full tenancy — from preparation and letting through ongoing rent, inspections, maintenance and compliance.",
          "Gramax 为整个租赁周期提供系统化管理：从出租准备与招租，到持续收租、巡检、维修及合规。",
        )}
      />
      <section className="section" id="management">
        <div className="container">
          <SectionHeading
            eyebrow={t(lang, "Complete management", "完整管理服务")}
            title={t(lang, "Every stage, clearly owned.", "每个阶段都有清晰责任。")}
          />
          <div className="service-grid">
            {landlordServices.map((service, index) => (
              <article key={service.en}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{service[lang]}</h3>
                <p>{lang === "zh" ? service.detailZh : service.detailEn}</p>
              </article>
            ))}
          </div>
          <div className="section-follow-link">
            <ArrowLink href={`${path(lang, "/resources")}#management`}>
              {t(lang, "View the complete management guide", "查看完整物业管理指南")}
            </ArrowLink>
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">{t(lang, "Risk & compliance", "风险与合规")}</p>
            <h2>{t(lang, "The details matter long before a dispute.", "在纠纷发生前，细节就已经很重要。")}</h2>
          </div>
          <div className="dark-copy">
            <p>
              {t(
                lang,
                "New Zealand rental management requires documented processes, correct notices and ongoing attention to Healthy Homes and safety obligations.",
                "新西兰出租管理需要可追溯的流程、正确通知，并持续关注健康家园与安全责任。",
              )}
            </p>
            <ul>
              <li>{t(lang, "Correct tenancy procedures", "正确的租赁程序")}</li>
              <li>{t(lang, "Documented compliance records", "合规记录与文件")}</li>
              <li>{t(lang, "Early identification of property issues", "尽早识别物业问题")}</li>
              <li>{t(lang, "Consistent tenant communication", "持续、清晰的租客沟通")}</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section owner-guide-section" id="compliance-guides">
        <div className="container">
          <SectionHeading
            eyebrow={t(lang, "Owner knowledge centre", "房东实用指南")}
            title={t(
              lang,
              "Compliance, property care and records are part of the service.",
              "合规、物业维护与记录管理都是服务的一部分。",
            )}
            body={t(
              lang,
              "These sections turn the key information from Gramax’s landlord guides into practical web pages. The original bilingual guides remain available in Resources.",
              "以下内容将 Gramax 房东宣传资料中的重点转为实用网页；中英双语原版仍保留在资料中心。",
            )}
          />
          <div className="guide-grid">
            <article id="healthy-homes">
              <p className="guide-label">{t(lang, "Compliance", "合规")}</p>
              <h3>{t(lang, "Healthy Homes Standards", "健康家园标准")}</h3>
              <p>
                {t(
                  lang,
                  "Rental properties must address heating, insulation, ventilation, moisture ingress and drainage, and draught stopping. Gramax helps identify requirements, retain records and coordinate approved work.",
                  "出租物业需要符合供暖、保温、通风、防潮排水及防风标准。Gramax 协助识别要求、保留记录并协调合格施工。",
                )}
              </p>
              <ArrowLink href={`${path(lang, "/resources")}#healthy-homes`}>
                {t(lang, "Read the original guide", "查看原始指南")}
              </ArrowLink>
            </article>
            <article id="inspections-maintenance">
              <p className="guide-label">{t(lang, "Property care", "物业维护")}</p>
              <h3>{t(lang, "Inspections & maintenance", "巡检与维修")}</h3>
              <p>
                {t(
                  lang,
                  "Routine inspections use proper written notice and documented condition records. Issues are identified early, owners are kept informed and approved repairs are coordinated with qualified contractors.",
                  "例行检查会按要求提前书面通知并记录物业状况。问题会尽早识别、及时告知房东，并由合格承包商协调获批维修。",
                )}
              </p>
              <ArrowLink href={`${path(lang, "/resources")}#inspections`}>
                {t(lang, "View inspection information", "查看巡检资料")}
              </ArrowLink>
            </article>
            <article id="insurance">
              <p className="guide-label">{t(lang, "Risk records", "风险记录")}</p>
              <h3>{t(lang, "Landlord insurance support", "房东保险资料支持")}</h3>
              <p>
                {t(
                  lang,
                  "Good tenancy files, inspection reports, payment records, notices and property photographs can support an insurance claim. Insurance cover remains a decision for the owner and their independent adviser.",
                  "完整租约档案、检查报告、付款记录、通知及物业照片有助于保险理赔。具体保险方案仍应由房东与独立保险顾问决定。",
                )}
              </p>
              <ArrowLink href={`${path(lang, "/resources")}#insurance`}>
                {t(lang, "Read the insurance tips", "查看保险提示")}
              </ArrowLink>
            </article>
          </div>
        </div>
      </section>
      <section className="section" id="professional-management">
        <div className="container split-layout">
          <SectionHeading
            eyebrow={t(lang, "Less work, more clarity", "更省心、更清晰")}
            title={t(lang, "Professional management is more than collecting rent.", "专业物业管理不只是收租。")}
            body={t(
              lang,
              "It is the combined discipline of choosing suitable tenants, keeping records, communicating consistently, coordinating repairs and protecting the property’s long-term value.",
              "它是筛选合适租客、保留记录、持续沟通、协调维修并保护物业长期价值的一套完整体系。",
            )}
          />
          <div className="stacked-actions">
            <Link className="button" href={path(lang, "/appraisal")}>
              {t(lang, "Request a rental appraisal", "申请租金评估")}
            </Link>
            <ArrowLink href={`${path(lang, "/resources")}#professional-manager`}>
              {t(lang, "Read landlord guides", "阅读房东指南")}
            </ArrowLink>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}

export function TenantsView({ lang }: { lang: Language }) {
  return (
    <SiteFrame lang={lang} currentPath="/tenants">
      <PageIntro
        eyebrow={t(lang, "For tenants", "租客服务")}
        title={t(lang, "Clear processes. Responsive support. A well-cared-for home.", "清晰流程、及时支持、用心维护的居住环境。")}
        body={t(
          lang,
          "Gramax-managed tenancies are built around consistent communication, fair processes, organised maintenance and clear safety responsibilities.",
          "Gramax 以持续沟通、公平流程、规范维修及明确安全责任来管理每一段租赁关系。",
        )}
      />
      <section className="section" id="rent-with-gramax">
        <div className="container">
          <SectionHeading
            eyebrow={t(lang, "Tenant support", "租客支持")}
            title={t(lang, "Know what to expect throughout the tenancy.", "租期内的每一步都清楚可预期。")}
          />
          <div className="service-grid service-grid-four">
            {[
              [t(lang, "Clear communication", "清晰沟通"), t(lang, "Consistent information and proper tenancy processes.", "统一信息与规范租赁流程。")],
              [t(lang, "Maintenance support", "维修支持"), t(lang, "Issues reported to our team and coordinated with qualified contractors.", "向团队申报问题，并协调合格承包商处理。")],
              [t(lang, "Routine inspections", "例行检查"), t(lang, "Proper written notice and documented property condition.", "提前书面通知并记录物业状况。")],
              [t(lang, "Safety & compliance", "安全与合规"), t(lang, "Healthy Homes and smoke alarm responsibilities kept visible.", "明确健康家园及烟雾报警器责任。")],
            ].map(([title, body], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="section-follow-link">
            <ArrowLink href={`${path(lang, "/resources")}#rent-with-gramax`}>
              {t(lang, "Read why tenants choose Gramax", "了解租客为什么选择 Gramax")}
            </ArrowLink>
          </div>
        </div>
      </section>
      <section className="section section-muted" id="maintenance">
        <div className="container form-layout">
          <div>
            <SectionHeading
              eyebrow={t(lang, "Report maintenance", "维修申报")}
              title={t(lang, "Tell us what needs attention.", "请告诉我们需要处理的问题。")}
              body={t(
                lang,
                "Early reporting helps prevent a small issue becoming a larger repair. For any immediate danger, contact emergency services first.",
                "尽早申报有助于避免小问题演变成更大的维修。如有即时危险，请先联系紧急服务。",
              )}
            />
          </div>
          <InquiryForm kind="maintenance" lang={lang} />
        </div>
      </section>
      <section className="section" id="tenant-guides">
        <div className="container">
          <SectionHeading
            eyebrow={t(lang, "Tenant guides", "租客指南")}
            title={t(lang, "Practical information, ready when you need it.", "需要时随时查看实用信息。")}
            body={t(
              lang,
              "The key points from the Gramax tenant material are available below as readable web content, with the original guides linked for reference.",
              "Gramax 租客宣传资料的重点已经整理成以下网页内容，并保留原始指南入口以供参考。",
            )}
          />
          <div className="guide-grid tenant-guide-grid">
            <article id="tenancy-types">
              <p className="guide-label">{t(lang, "Tenancy process", "租约流程")}</p>
              <h3>{t(lang, "Tenancy types & ending a tenancy", "租约类型与租约终止")}</h3>
              <p>
                {t(
                  lang,
                  "Fixed-term and periodic tenancies have different rules. Ending a tenancy requires the correct written notice, timing and process, followed by the final inspection, key return and bond steps.",
                  "固定期限与无固定期限租约适用不同规则。终止租约需要正确的书面通知、时间和流程，并完成最终检查、钥匙归还及押金手续。",
                )}
              </p>
              <ArrowLink href={`${path(lang, "/resources")}#tenancy-types`}>
                {t(lang, "Read the tenancy guide", "查看租约指南")}
              </ArrowLink>
            </article>
            <article id="inspections">
              <p className="guide-label">{t(lang, "Property care", "物业维护")}</p>
              <h3>{t(lang, "Routine property inspections", "例行物业检查")}</h3>
              <p>
                {t(
                  lang,
                  "Tenants receive written notice before an inspection. The visit records property condition, maintenance needs and safety concerns; tenants do not normally need to be present.",
                  "检查前租客会收到书面通知。检查将记录物业状况、维修需求及安全问题，租客通常不需要留在现场。",
                )}
              </p>
              <ArrowLink href={`${path(lang, "/resources")}#inspections`}>
                {t(lang, "View inspection details", "查看巡检说明")}
              </ArrowLink>
            </article>
            <article id="smoke-alarms">
              <p className="guide-label">{t(lang, "Safety", "居住安全")}</p>
              <h3>{t(lang, "Smoke alarm responsibilities", "烟雾报警器责任")}</h3>
              <p>
                {t(
                  lang,
                  "Owners are responsible for compliant alarms at the start of a tenancy. Tenants must not damage, remove or disable alarms and should report faults promptly.",
                  "房东需要在租约开始时提供合规报警器；租客不得损坏、拆除或停用报警器，并应及时报告故障。",
                )}
              </p>
              <ArrowLink href={`${path(lang, "/resources")}#smoke-alarms`}>
                {t(lang, "Read the safety guide", "查看安全指南")}
              </ArrowLink>
            </article>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}

export function CommercialView({ lang }: { lang: Language }) {
  return (
    <SiteFrame lang={lang} currentPath="/commercial">
      <PageIntro
        eyebrow={t(lang, "Commercial property management", "商业物业管理")}
        title={t(lang, "End-to-end commercial management, without unnecessary complexity.", "全方位商业物业管理，减少不必要的复杂。")}
        body={t(
          lang,
          "Leasing, financials, operations, compliance and asset advisory — coordinated through one clear management relationship.",
          "租赁、财务、运营、合规及资产管理建议，由一套清晰的管理关系统一协调。",
        )}
      />
      <section className="section" id="commercial-services">
        <div className="container">
          <SectionHeading
            eyebrow={t(lang, "Our services", "服务内容")}
            title={t(lang, "The operating detail your investment depends on.", "您的商业投资所依赖的运营细节。")}
          />
          <div className="service-grid">
            {commercialServices.map((service, index) => (
              <article id={service.id} key={service.en}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{service[lang]}</h3>
                <p>{lang === "zh" ? service.detailZh : service.detailEn}</p>
              </article>
            ))}
          </div>
          <div className="section-follow-link">
            <ArrowLink href={`${path(lang, "/resources")}#commercial`}>
              {t(lang, "View the commercial management guide", "查看商业物业管理指南")}
            </ArrowLink>
          </div>
        </div>
      </section>
      <section className="section section-blue">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">{t(lang, "Why Gramax", "为什么选择 Gramax")}</p>
            <h2>{t(lang, "Bilingual, transparent and responsive.", "双语、透明、高效响应。")}</h2>
          </div>
          <div className="blue-list">
            <p>{t(lang, "Mandarin and English communication", "中英文沟通，减少文化隔阂")}</p>
            <p>{t(lang, "Clear financial records and reporting", "清晰准确的财务记录与报告")}</p>
            <p>{t(lang, "Direct communication with practical follow-up", "直接沟通与务实跟进")}</p>
            <p>{t(lang, "Residential experience supporting commercial delivery", "以住宅管理经验支持商业服务执行")}</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split-layout">
          <SectionHeading
            title={t(lang, "Let’s discuss the property and the outcome you need.", "让我们了解您的物业及期望实现的结果。")}
          />
          <Link className="button" href={path(lang, "/contact")}>
            {t(lang, "Commercial enquiry", "提交商业物业咨询")}
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}

export function RentalsView({ lang }: { lang: Language }) {
  return (
    <SiteFrame lang={lang} currentPath="/rentals">
      <PageIntro
        eyebrow={t(lang, "Available properties", "可租房源")}
        title={t(
          lang,
          "Find a property managed by Gramax.",
          "寻找由 Gramax 管理的合适物业。",
        )}
        body={t(
          lang,
          "This page is the home for residential rentals, commercial spaces, viewing information and application links.",
          "这里将集中展示住宅出租、商业物业、看房安排及申请入口。",
        )}
      />
      <section className="section listings-section">
        <div className="container">
          <SectionHeading
            eyebrow={t(lang, "Property categories", "房源分类")}
            title={t(lang, "Everything needed to start a property search.", "开始找房所需的信息集中在这里。")}
          />
          <div className="listing-category-grid">
            <article>
              <span>01</span>
              <h2>{t(lang, "Residential rentals", "住宅出租")}</h2>
              <p>
                {t(
                  lang,
                  "Houses, townhouses and apartments managed by Gramax.",
                  "由 Gramax 管理的独立屋、联排住宅及公寓。",
                )}
              </p>
            </article>
            <article>
              <span>02</span>
              <h2>{t(lang, "Commercial property", "商业物业")}</h2>
              <p>
                {t(
                  lang,
                  "Office, retail and industrial leasing opportunities.",
                  "办公室、零售及工业物业租赁机会。",
                )}
              </p>
            </article>
            <article>
              <span>03</span>
              <h2>{t(lang, "Viewings & applications", "看房与申请")}</h2>
              <p>
                {t(
                  lang,
                  "Each published listing will include its viewing details and application link.",
                  "每个正式发布的房源都会附有看房信息及申请入口。",
                )}
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="section listings-link-section">
        <div className="container listings-link-panel">
          <div>
            <p className="eyebrow">{t(lang, "Current listings", "当前房源")}</p>
            <h2>{t(lang, "The official listings link will be added here.", "正式房源链接将在这里添加。")}</h2>
            <p>
              {t(
                lang,
                "The page structure is ready. When the final listing link is confirmed, this area will take visitors directly to the current properties.",
                "页面结构已经准备完成。确认最终房源链接后，这一区域将直接带访客查看当前房源。",
              )}
            </p>
          </div>
          <span className="listing-link-status">
            {t(lang, "Link ready to add", "等待添加链接")}
          </span>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container form-layout">
          <SectionHeading
            eyebrow={t(lang, "Rental enquiry", "租房咨询")}
            title={t(lang, "Tell us what you are looking for.", "告诉我们您的找房需求。")}
            body={t(
              lang,
              "Your enquiry can be recorded now, even before a suitable property is published.",
              "即使合适房源尚未发布，也可以先登记您的需求。",
            )}
          />
          <InquiryForm kind="rental-alert" lang={lang} />
        </div>
      </section>
    </SiteFrame>
  );
}

export function ResourcesView({ lang }: { lang: Language }) {
  return (
    <SiteFrame lang={lang} currentPath="/resources">
      <PageIntro
        eyebrow={t(lang, "Guides & forms", "资料与表格")}
        title={t(lang, "Practical information for owners and tenants.", "为房东与租客准备的实用资料。")}
        body={t(
          lang,
          "Bilingual guides covering property management, tenancy, compliance, inspections, safety, insurance and commercial services.",
          "中英双语资料覆盖物业管理、租约、合规、巡检、安全、保险及商业物业服务。",
        )}
      />
      <section className="section">
        <div className="container resource-grid">
          {resourceGroups.map((group) => (
            <article className="resource-card" id={group.id} key={group.id}>
              <div className="resource-cover">
                <Image
                  src={group.pages[0].href}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 100vw, 33vw"
                />
              </div>
              <div className="resource-content">
                <p className="resource-audience">{group.audience[lang]}</p>
                <h2>{group.title[lang]}</h2>
                <p>{group.description[lang]}</p>
                <div className="resource-links">
                  {group.pages.map((page) => (
                    <a href={page.href} target="_blank" rel="noreferrer" key={page.href}>
                      {page.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}

export function TeamView({ lang }: { lang: Language }) {
  return (
    <SiteFrame lang={lang} currentPath="/team">
      <PageIntro
        eyebrow={t(lang, "Our team", "团队介绍")}
        title={t(lang, "Meet the people behind Gramax.", "认识 Gramax 背后的团队。")}
        body={t(
          lang,
          "Led by founder and managing director Grace Luo, the Gramax team combines practical property management experience with clear communication, compliance and personal accountability.",
          "Gramax 团队由创始人兼负责人 Grace Luo 带领，将实际物业管理经验、清晰沟通、合规意识与责任落实相结合。",
        )}
      />
      <section className="section">
        <div className="container founder-profile">
          <div className="founder-mark founder-mark-large" aria-hidden="true">GL</div>
          <div>
            <p className="eyebrow">{t(lang, "Founder & Managing Director", "创始人兼负责人")}</p>
            <h2>Grace Luo</h2>
            <p>
              {t(
                lang,
                "Grace has extensive experience in residential property management and is committed to helping owners protect their investments through professional advice, proactive management and dependable service.",
                "Grace 拥有丰富的住宅物业管理经验，致力于通过专业建议、主动管理及可靠服务协助房东保护投资。",
              )}
            </p>
            <p>
              {t(
                lang,
                "Alongside her property management career, Grace is completing a Bachelor of Laws. Her legal study strengthens her understanding of New Zealand tenancy law, contract law, regulatory compliance and dispute resolution.",
                "在物业管理实践之外，Grace 正在攻读法学学士。法律学习进一步加强了她对新西兰租赁法、合同法、法规合规及纠纷解决的理解。",
              )}
            </p>
            <p>
              {t(
                lang,
                "Her approach is built on simple principles: choose the right tenants, protect the property, communicate clearly, reduce risk and remain accountable.",
                "她的管理原则很清晰：选择合适的租客、保护物业、清晰沟通、降低风险并承担责任。",
              )}
            </p>
            <ArrowLink href={`${path(lang, "/resources")}#grace-luo`}>
              {t(lang, "View the original leadership profile", "查看原始人物介绍")}
            </ArrowLink>
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container">
          <SectionHeading
            eyebrow={t(lang, "How our team works", "团队工作方式")}
            title={t(lang, "Reliable service is built in the details.", "可靠服务来自每一个细节。")}
          />
          <div className="values-grid">
            {[
              [t(lang, "Clarity", "清晰"), t(lang, "Owners and tenants should know what is happening and what comes next.", "让房东与租客清楚了解当前情况及下一步。")],
              [t(lang, "Compliance", "合规"), t(lang, "Processes and records should stand up to legal and practical scrutiny.", "流程与记录经得起法律与实际检验。")],
              [t(lang, "Responsiveness", "响应"), t(lang, "Issues are acknowledged, assessed and followed through.", "对问题及时确认、评估并跟进处理。")],
              [t(lang, "Improvement", "持续改进"), t(lang, "Systems evolve with legislation, the market and client needs.", "管理体系随法规、市场与客户需求持续更新。")],
            ].map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}

export function ContactView({ lang }: { lang: Language }) {
  return (
    <SiteFrame lang={lang} currentPath="/contact">
      <PageIntro
        eyebrow={t(lang, "Contact Gramax", "联系 Gramax")}
        title={t(lang, "Tell us what you need managed.", "告诉我们您需要怎样的物业管理支持。")}
        body={t(
          lang,
          "Use this form for residential, commercial, tenant or general enquiries. The information goes directly into our enquiry register for follow-up.",
          "住宅、商业、租客或一般咨询都可通过此表提交。信息会直接进入我们的咨询记录以便跟进。",
        )}
      />
      <section className="section">
        <div className="container form-layout">
          <div className="contact-aside">
            <h2>{t(lang, "A useful first message includes:", "为了更快了解情况，建议提供：")}</h2>
            <ul>
              <li>{t(lang, "Whether you are an owner or tenant", "您是房东、商业业主还是租客")}</li>
              <li>{t(lang, "The property suburb or address", "物业所在区域或地址")}</li>
              <li>{t(lang, "The outcome or issue you need help with", "需要协助实现的目标或处理的问题")}</li>
              <li>{t(lang, "Any important timing", "相关时间要求")}</li>
            </ul>
          </div>
          <InquiryForm kind="contact" lang={lang} />
        </div>
      </section>
    </SiteFrame>
  );
}

export function AppraisalView({ lang }: { lang: Language }) {
  return (
    <SiteFrame lang={lang} currentPath="/appraisal">
      <PageIntro
        eyebrow={t(lang, "Complimentary rental appraisal", "免费租金评估")}
        title={t(lang, "Start with a clearer view of your property.", "先更清楚地了解您的物业。")}
        body={t(
          lang,
          "Share the essential property details and our team will have the information needed to prepare a personalised rental discussion.",
          "提供基本物业信息，我们的团队即可据此准备更有针对性的租金评估沟通。",
        )}
      />
      <section className="section">
        <div className="container form-layout">
          <div className="appraisal-aside">
            <h2>{t(lang, "What happens next", "提交后会怎样")}</h2>
            <ol>
              <li>{t(lang, "We review the property information.", "我们查看物业信息。")}</li>
              <li>{t(lang, "We identify any details needed for an informed appraisal.", "确认评估所需的补充细节。")}</li>
              <li>{t(lang, "A Gramax representative follows up with you.", "Gramax 负责人将与您跟进。")}</li>
            </ol>
          </div>
          <InquiryForm kind="appraisal" lang={lang} />
        </div>
      </section>
    </SiteFrame>
  );
}

export function PrivacyView({ lang }: { lang: Language }) {
  return (
    <SiteFrame lang={lang} currentPath="/privacy">
      <PageIntro
        eyebrow={t(lang, "Privacy", "隐私声明")}
        title={t(lang, "How enquiry information is handled.", "我们如何处理咨询信息。")}
        body={t(
          lang,
          "Gramax collects only the information submitted through this website for the purpose of responding to property management, tenancy, maintenance and appraisal enquiries.",
          "Gramax 仅收集您通过本网站提交的信息，用于回复物业管理、租赁、维修及租金评估咨询。",
        )}
      />
      <section className="section">
        <div className="container prose">
          <h2>{t(lang, "Information we receive", "我们接收的信息")}</h2>
          <p>
            {t(
              lang,
              "Forms may include your name, email, phone number, property address and the details you choose to provide about your enquiry.",
              "表单可能包括姓名、电子邮箱、联系电话、物业地址及您主动提供的咨询内容。",
            )}
          </p>
          <h2>{t(lang, "How it is used", "信息用途")}</h2>
          <p>
            {t(
              lang,
              "The information is used to assess and respond to the request, maintain an enquiry record and coordinate any follow-up you have asked for.",
              "这些信息用于评估并回复您的请求、保留咨询记录，以及协调您所要求的后续事项。",
            )}
          </p>
          <h2>{t(lang, "Your choices", "您的选择")}</h2>
          <p>
            {t(
              lang,
              "You may ask Gramax to correct or remove enquiry information, subject to any legal record-keeping obligations.",
              "在符合法律记录保存义务的前提下，您可以要求 Gramax 更正或删除咨询信息。",
            )}
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}

export function renderView(slug: string | undefined, lang: Language) {
  switch (slug) {
    case undefined:
      return <HomeView lang={lang} />;
    case "landlords":
      return <LandlordsView lang={lang} />;
    case "tenants":
      return <TenantsView lang={lang} />;
    case "commercial":
      return <CommercialView lang={lang} />;
    case "rentals":
      return <RentalsView lang={lang} />;
    case "resources":
      return <ResourcesView lang={lang} />;
    case "team":
      return <TeamView lang={lang} />;
    case "about":
      return <TeamView lang={lang} />;
    case "contact":
      return <ContactView lang={lang} />;
    case "appraisal":
      return <AppraisalView lang={lang} />;
    case "privacy":
      return <PrivacyView lang={lang} />;
    default:
      return null;
  }
}
