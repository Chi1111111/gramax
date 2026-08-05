import Image from "next/image";
import Link from "next/link";
import { InquiryForm } from "./InquiryForm";
import { ServiceOverviewView } from "./ServicePages";
import {
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

type TeamMember = {
  name: string;
  roleEn: string;
  roleZh: string;
  hideRole?: boolean;
  categoryEn: string;
  categoryZh: string;
  bioEn: string;
  bioZh: string;
  photo: string;
  photoAltEn: string;
  photoAltZh: string;
  photoWidth: number;
  photoHeight: number;
  photoClassName?: string;
};

const TEAM_MEMBERS: readonly (TeamMember | null)[] = [
  {
    name: "Grace Luo",
    roleEn: "Founder & Managing Director",
    roleZh: "创始人兼董事总经理",
    categoryEn: "Leadership",
    categoryZh: "管理团队",
    bioEn:
      "Grace founded Gramax to give property owners clear, practical and reliable management. With extensive residential property experience and ongoing Bachelor of Laws studies, she brings informed advice, proactive oversight and a long-term view to every tenancy.",
    bioZh:
      "Grace 创立 Gramax，致力于为业主提供清晰、务实且可靠的物业管理服务。凭借丰富的住宅物业管理经验及正在攻读的法学学士课程，她以专业建议、主动管理和长期视角认真对待每一段租赁关系。",
    photo: "/team/grace-luo-clean.png",
    photoAltEn: "Portrait of Grace Luo",
    photoAltZh: "Grace Luo 肖像照",
    photoWidth: 1086,
    photoHeight: 1448,
  },
  {
    name: "Kevin Jiao",
    roleEn: "Property Manager",
    roleZh: "物业经理",
    categoryEn: "Residential",
    categoryZh: "住宅物业",
    bioEn:
      "Kevin is a University of Auckland graduate in Accounting and Taxation. Based in East Auckland, he brings clear communication, careful organisation and a practical approach to inspections, maintenance and everyday tenancy matters. He is fluent in English, Mandarin and Cantonese.",
    bioZh:
      "Kevin 毕业于奥克兰大学会计与税务专业，现常驻奥克兰东区。他以清晰沟通、细致执行和务实方式处理检查、维修及日常租务，并精通英语、普通话和粤语。",
    photo: "/team/kevin-jiao-clean.png",
    photoAltEn: "Portrait of Kevin Jiao",
    photoAltZh: "Kevin Jiao 肖像照",
    photoWidth: 1254,
    photoHeight: 1254,
  },
  {
    name: "Leo Han",
    roleEn: "Property Manager",
    roleZh: "物业经理",
    categoryEn: "Residential",
    categoryZh: "住宅物业",
    bioEn:
      "Leo graduated from Massey University and AUT in Marketing and Business. He takes a proactive, detail-focused approach to maintenance, inspections and everyday tenancy matters. Fluent in English and Mandarin, he values clear communication and lasting relationships with landlords and tenants.",
    bioZh:
      "Leo 毕业于梅西大学及奥克兰理工大学，拥有市场营销与商业背景。他以主动、细致的方式处理维修、检查及日常租务，并通过英语和普通话与房东及租客保持清晰沟通。",
    photo: "/team/leo-han.jpg",
    photoAltEn: "Portrait of Leo Han",
    photoAltZh: "Leo Han 肖像照",
    photoWidth: 1280,
    photoHeight: 1280,
  },
  {
    name: "Cindy",
    roleEn: "Property Manager",
    roleZh: "物业经理",
    categoryEn: "Commercial & Residential Society",
    categoryZh: "商业及住宅社区",
    bioEn:
      "Cindy holds a Master's degree from Lincoln University and has several years of property management experience. She manages commercial offices and retail spaces, along with Residential Society properties on Auckland's North Shore, combining practical problem-solving with responsive, hands-on service.",
    bioZh:
      "Cindy 拥有林肯大学硕士学位及多年物业管理经验。她负责商业办公楼、零售空间及奥克兰北岸的 Residential Society 物业，以务实的问题解决能力提供及时、细致的服务。",
    photo: "/team/cindy.jpg",
    photoAltEn: "Portrait of Cindy",
    photoAltZh: "Cindy 肖像照",
    photoWidth: 1600,
    photoHeight: 1600,
  },
  {
    name: "Tao",
    roleEn: "Property Manager",
    roleZh: "物业经理",
    categoryEn: "Residential",
    categoryZh: "住宅物业",
    bioEn:
      "A University of Auckland graduate, Tao has extensive experience managing residential properties across Auckland. He coordinates tenancies, inspections, maintenance and compliance with an organised, practical approach. Fluent in English and Mandarin, he is committed to reliable, responsive service.",
    bioZh:
      "Tao 毕业于奥克兰大学，拥有丰富的奥克兰住宅物业管理经验。他以有条理、务实的方式协调租务、检查、维修及合规工作，并以英语和普通话提供及时可靠的服务。",
    photo: "/team/tao.png",
    photoAltEn: "Portrait of Tao",
    photoAltZh: "Tao 肖像照",
    photoWidth: 1254,
    photoHeight: 1254,
  },
  {
    name: "Cera",
    roleEn: "Office Administrator",
    roleZh: "办公室行政主管",
    categoryEn: "Operations",
    categoryZh: "运营支持",
    bioEn:
      "Cera holds a New Zealand Bachelor of International Business and has more than ten years of experience in office administration and project support. She coordinates teams, clients and stakeholders with strong organisation, time management and accountability.",
    bioZh:
      "Cera 在新西兰取得国际商务学士学位，并拥有十余年办公室行政及项目支持经验。她以出色的组织、时间管理和责任意识协调团队、客户及相关方。",
    photo: "/team/cera-clean.png",
    photoAltEn: "Portrait of Cera",
    photoAltZh: "Cera 肖像照",
    photoWidth: 1254,
    photoHeight: 1254,
  },
  {
    name: "Shawn",
    roleEn: "Assistant Property Manager",
    roleZh: "助理物业经理",
    categoryEn: "Property Support",
    categoryZh: "物业支持",
    bioEn:
      "Shawn holds a New Zealand Bachelor of Communication and brings strong communication, organisation and administration skills to the team. He supports property inspections, tenant communication, maintenance coordination and daily administration to keep property matters moving smoothly.",
    bioZh:
      "Shawn 在新西兰取得传播学学士学位，具备良好的沟通、组织及行政能力。他协助处理物业检查、租客沟通、维修协调和日常行政事务，确保管理工作顺畅推进。",
    photo: "/team/shawn.png",
    photoAltEn: "Portrait of Shawn",
    photoAltZh: "Shawn 肖像照",
    photoWidth: 1254,
    photoHeight: 1254,
  },
  {
    name: "Office Admin",
    roleEn: "Office Admin",
    roleZh: "办公室行政",
    hideRole: true,
    categoryEn: "Administration",
    categoryZh: "行政支持",
    bioEn:
      "Holding a Master's degree in Chemistry, he brings an analytical and methodical mindset to Gramax's daily administration. He approaches every task with care, reliability and a strong sense of responsibility, supporting accurate records, clear coordination and efficient office operations.",
    bioZh:
      "他拥有化学硕士学位，将严谨的分析思维和有条理的工作方式带入 Gramax 的日常行政工作。他认真对待每一项任务，注重准确记录、清晰协调与高效执行，并以强烈的责任心为团队提供可靠支持。",
    photo: "/team/office-admin-clean.png",
    photoAltEn: "Portrait of the Gramax Office Admin",
    photoAltZh: "Gramax 办公室行政人员肖像照",
    photoWidth: 1086,
    photoHeight: 1448,
  },
];

export function HomeView({ lang }: { lang: Language }) {
  return (
    <SiteFrame lang={lang} currentPath="/">
      <section className="hero brand-hero">
        <div className="container brand-hero-shell">
          <div className="brand-hero-roof" aria-hidden="true">
            <span />
          </div>
          <p className="brand-hero-name">
            {t(lang, "Gramax Property Management", "Gramax 贵鑫物业管理")}
          </p>
          <h1>
            {t(
              lang,
              "Professional property management. Clear, compliant, dependable.",
              "专业物业管理。清晰、合规、可靠。",
            )}
          </h1>
          <p className="brand-hero-lead">
            {t(
              lang,
              "Personal, practical property management across Greater Auckland and Hamilton.",
              "为大奥克兰及汉密尔顿提供务实、细致的物业管理服务。",
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

      <section className="section home-links-section" id="our-services">
        <div className="container">
          <SectionHeading
            eyebrow={t(lang, "Greater Auckland & Hamilton", "大奥克兰及汉密尔顿")}
            title={t(lang, "Our services.", "我们的服务。")}
            body={t(
              lang,
              "Practical property management for residential, commercial, residential society, build-to-rent and community housing portfolios.",
              "为住宅、商业、住户社团、长租开发及社区住房项目提供务实的物业管理支持。",
            )}
          />
          <div className="audience-grid services-grid">
            <Link
              className="audience-card"
              href={path(lang, "/services/residential-management")}
            >
              <span className="card-index">01</span>
              <h3>{t(lang, "Residential Management", "住宅物业管理")}</h3>
              <p>
                {t(
                  lang,
                  "End-to-end letting, tenant selection, rent, inspections, maintenance and compliance.",
                  "涵盖招租、租客筛选、收租、巡检、维修及合规管理的全流程服务。",
                )}
              </p>
              <span className="arrow-link">
                {t(lang, "View residential services", "查看住宅服务")}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
            <Link
              className="audience-card"
              href={path(lang, "/services/commercial-management")}
            >
              <span className="card-index">02</span>
              <h3>{t(lang, "Commercial Management", "商业物业管理")}</h3>
              <p>
                {t(
                  lang,
                  "Lease, financial, tenant, compliance and day-to-day property operations management.",
                  "提供租约、财务、租户、合规及日常物业运营管理。",
                )}
              </p>
              <span className="arrow-link">
                {t(lang, "View commercial services", "查看商业服务")}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
            <Link
              className="audience-card"
              href={path(lang, "/services/residents-society-management")}
            >
              <span className="card-index">03</span>
              <h3>{t(lang, "Residential Society", "住户社团管理")}</h3>
              <p>
                {t(
                  lang,
                  "Clear administration, shared-property coordination, contractor oversight and resident communication.",
                  "提供清晰的行政管理、公共区域协调、承包商监督及住户沟通。",
                )}
              </p>
              <span className="arrow-link">
                {t(lang, "View society services", "查看社团服务")}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
            <Link
              className="audience-card"
              href={path(lang, "/services/build-to-rent-community-housing")}
            >
              <span className="card-index">04</span>
              <h3>{t(lang, "Build-to-Rent & Community Housing", "长租开发与社区住房")}</h3>
              <p>
                {t(
                  lang,
                  "Scalable support for build-to-rent portfolios and Community Housing Providers (CHPs), including programmes of 300 homes or more.",
                  "为长租开发及社区住房提供商（CHP）提供可扩展的管理支持，包括 300 套及以上的大型项目。",
                )}
              </p>
              <span className="arrow-link">
                {t(lang, "View large-scale services", "查看大型项目服务")}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
          <a
            className="service-reference-link"
            href="https://www.chra.hud.govt.nz/about-chra/what-is-community-housing/"
            target="_blank"
            rel="noreferrer"
          >
            {t(
              lang,
              "About Community Housing Providers (CHPs) — CHRA ↗",
              "了解社区住房提供商（CHP）— CHRA ↗",
            )}
          </a>
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
          "Meet the eight people responsible for practical property care, clear communication, compliance and dependable follow-through.",
          "认识 Gramax 的八位团队成员，他们共同负责务实的物业管理、清晰沟通、合规执行与可靠跟进。",
        )}
      />
      <section className="section team-directory-section">
        <div className="container">
          <div className="team-directory-header">
            <p className="eyebrow">{t(lang, "Our people", "我们的团队")}</p>
          </div>
          <div className="team-grid">
            {TEAM_MEMBERS.map((member, index) => {
              const slot = index + 1;

              return (
                <article
                  className={`team-card${member ? " team-card-populated" : ""}`}
                  key={member?.name ?? slot}
                  aria-label={
                    member
                      ? member.hideRole
                        ? member.name
                        : `${member.name}, ${t(lang, member.roleEn, member.roleZh)}`
                      : t(
                          lang,
                          `Team member position ${slot}`,
                          `团队成员位置 ${slot}`,
                        )
                  }
                >
                  <span className="team-card-index" aria-hidden="true">
                    {String(slot).padStart(2, "0")}
                  </span>
                  <div
                    className={`team-photo-placeholder${member ? " team-photo-filled" : ""}`}
                    aria-hidden={member ? undefined : true}
                  >
                    {member ? (
                      <Image
                        className={member.photoClassName ?? "team-profile-photo"}
                        src={member.photo}
                        alt={t(lang, member.photoAltEn, member.photoAltZh)}
                        width={member.photoWidth}
                        height={member.photoHeight}
                      />
                    ) : null}
                  </div>
                  <div
                    className={`team-card-content${member ? " team-card-content-filled" : ""}`}
                    aria-hidden={member ? undefined : true}
                  >
                    {member ? (
                      <>
                        <p className="team-member-overline">
                          {t(lang, member.categoryEn, member.categoryZh)}
                        </p>
                        <h2>{member.name}</h2>
                        {!member.hideRole ? (
                          <p className="team-member-role">
                            {t(lang, member.roleEn, member.roleZh)}
                          </p>
                        ) : null}
                        <p className="team-member-bio">
                          {t(lang, member.bioEn, member.bioZh)}
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="team-name-rule" />
                        <span className="team-role-rule" />
                        <div className="team-bio-rules">
                          <span />
                          <span />
                          <span />
                        </div>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
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
