import Image from "next/image";
import Link from "next/link";
import { InquiryForm } from "./InquiryForm";
import { ServiceOverviewView } from "./ServicePages";
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
  return <ServiceOverviewView lang={lang} group="landlords" />;
}

export function TenantsView({ lang }: { lang: Language }) {
  return <ServiceOverviewView lang={lang} group="tenants" />;
}

export function CommercialView({ lang }: { lang: Language }) {
  return <ServiceOverviewView lang={lang} group="commercial" />;
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
