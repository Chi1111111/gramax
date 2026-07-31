import Link from "next/link";
import type { Language } from "../_data/content";
import {
  getServicePage,
  getServicePages,
  serviceGroupContent,
  type ServiceGroup,
} from "../_data/servicePages";
import { InquiryForm } from "./InquiryForm";
import {
  ArrowLink,
  PageIntro,
  SectionHeading,
  SiteFrame,
} from "./SiteFrame";

function t(lang: Language, en: string, zh: string) {
  return lang === "zh" ? zh : en;
}

function path(lang: Language, value: string) {
  return lang === "zh" ? `/zh${value}` : value;
}

export function ServiceOverviewView({
  lang,
  group,
}: {
  lang: Language;
  group: ServiceGroup;
}) {
  const content = serviceGroupContent[group];
  const pages = getServicePages(group);

  return (
    <SiteFrame lang={lang} currentPath={`/${group}`}>
      <PageIntro
        eyebrow={content.eyebrow[lang]}
        title={content.title[lang]}
        body={content.summary[lang]}
      />
      <section className="section service-overview-section">
        <div className="container">
          <SectionHeading
            eyebrow={t(lang, "Choose a service", "选择具体服务")}
            title={t(
              lang,
              "Each topic now has its own page.",
              "每个主题现在都有独立页面。",
            )}
          />
          <div className="service-page-grid">
            {pages.map((page, index) => (
              <Link
                href={path(lang, `/${group}/${page.slug}`)}
                key={page.slug}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{page.title[lang]}</h2>
                <p>{page.summary[lang]}</p>
                <strong>{t(lang, "View page →", "查看页面 →")}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="final-cta">
        <div className="container final-cta-inner">
          <div>
            <p className="eyebrow">
              {group === "tenants"
                ? t(lang, "Looking for a property?", "正在寻找房源？")
                : t(lang, "Talk to Gramax", "联系 Gramax")}
            </p>
            <h2>
              {group === "landlords"
                ? t(
                    lang,
                    "Start with a clear view of your property.",
                    "先清楚了解您的物业。",
                  )
                : group === "tenants"
                  ? t(
                      lang,
                      "Browse available Gramax-managed properties.",
                      "查看由 Gramax 管理的可租物业。",
                    )
                  : t(
                      lang,
                      "Discuss the commercial property and the outcome you need.",
                      "沟通商业物业情况及您需要实现的结果。",
                    )}
            </h2>
          </div>
          <Link
            className="button button-light"
            href={
              group === "landlords"
                ? path(lang, "/appraisal")
                : group === "tenants"
                  ? path(lang, "/rentals")
                  : path(lang, "/contact")
            }
          >
            {group === "landlords"
              ? t(lang, "Request an appraisal", "申请租金评估")
              : group === "tenants"
                ? t(lang, "View properties", "查看房源")
                : t(lang, "Commercial enquiry", "商业物业咨询")}
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}

export function ServiceDetailView({
  lang,
  group,
  slug,
}: {
  lang: Language;
  group: ServiceGroup;
  slug: string;
}) {
  const page = getServicePage(group, slug);
  if (!page) {
    return null;
  }

  return (
    <SiteFrame lang={lang} currentPath={`/${group}/${slug}`}>
      <PageIntro
        eyebrow={page.eyebrow[lang]}
        title={page.title[lang]}
        body={page.summary[lang]}
      />
      <section className="section service-detail-section">
        <div className="container service-detail-layout">
          <div>
            <SectionHeading title={page.sectionTitle[lang]} />
            <ArrowLink href={path(lang, `/${group}`)}>
              {t(lang, "Back to service overview", "返回服务概览")}
            </ArrowLink>
          </div>
          <div className="service-detail-list">
            {page.highlights.map((highlight, index) => (
              <article key={highlight.title.en}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{highlight.title[lang]}</h2>
                  <p>{highlight.body[lang]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {page.form === "maintenance" ? (
        <section className="section section-muted">
          <div className="container form-layout">
            <SectionHeading
              eyebrow={t(lang, "Maintenance request", "维修申报")}
              title={t(
                lang,
                "Send the details to the Gramax team.",
                "将具体情况发送给 Gramax 团队。",
              )}
            />
            <InquiryForm kind="maintenance" lang={lang} />
          </div>
        </section>
      ) : null}
      <section className="section service-detail-footer">
        <div className="container split-layout">
          <SectionHeading
            eyebrow={t(lang, "Original material", "原始宣传资料")}
            title={t(
              lang,
              "The bilingual guide is still available for reference.",
              "中英双语原始指南仍可供查阅。",
            )}
          />
          <div className="stacked-actions">
            <Link
              className="button"
              href={`${path(lang, "/resources")}#${page.resourceId}`}
            >
              {t(lang, "View original guide", "查看原始指南")}
            </Link>
            <ArrowLink href={path(lang, "/contact")}>
              {t(lang, "Ask Gramax a question", "向 Gramax 咨询")}
            </ArrowLink>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
