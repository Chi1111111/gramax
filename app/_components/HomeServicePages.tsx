import Link from "next/link";
import type { Language } from "../_data/content";
import {
  getHomeServicePage,
  type HomeServiceSlug,
} from "../_data/homeServices";
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

export function HomeServiceDetailView({
  lang,
  slug,
}: {
  lang: Language;
  slug: HomeServiceSlug;
}) {
  const page = getHomeServicePage(slug);

  if (!page) {
    return null;
  }

  const homeServicesHref = lang === "zh" ? "/zh#our-services" : "/#our-services";

  return (
    <SiteFrame lang={lang} currentPath={`/services/${slug}`}>
      <PageIntro
        eyebrow={page.eyebrow[lang]}
        title={page.title[lang]}
        body={page.summary[lang]}
      />

      <section className="section service-detail-section">
        <div className="container service-detail-layout">
          <div>
            <SectionHeading title={page.sectionTitle[lang]} />
            <ArrowLink href={homeServicesHref}>
              {t(lang, "Back to Our Services", "返回我们的服务")}
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

      {page.context ? (
        <section className="section section-muted housing-models-section">
          <div className="container">
            <div className="housing-models-intro">
              <div>
                <p className="eyebrow">{page.context.eyebrow[lang]}</p>
                <h2>{page.context.title[lang]}</h2>
              </div>
              <p className="housing-models-summary">
                {page.context.body[lang]}
              </p>
            </div>
            <div className="housing-models-grid">
              {page.context.items.map((item, index) => (
                <article key={item.title.en}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title[lang]}</h3>
                    <p>{item.body[lang]}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className={`section${page.context ? "" : " section-muted"}`}>
        <div className="container split-layout">
          <SectionHeading
            eyebrow={t(lang, "Who we support", "服务对象")}
            title={page.audienceTitle[lang]}
            body={page.audienceBody[lang]}
          />
          <div className="quiet-list">
            <div>
              <h3>{t(lang, "Service area", "服务区域")}</h3>
              <p>
                {t(
                  lang,
                  "Greater Auckland and Hamilton.",
                  "大奥克兰及汉密尔顿。",
                )}
              </p>
            </div>
            <div>
              <h3>{t(lang, "How we work", "工作方式")}</h3>
              <p>{page.approach[lang]}</p>
            </div>
            {page.reference ? (
              <div>
                <h3>{t(lang, "Official reference", "官方参考")}</h3>
                <a
                  className="service-reference-link service-reference-link-inline"
                  href={page.reference.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {page.reference.label[lang]}
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner">
          <div>
            <p className="eyebrow">
              {t(lang, "Talk to Gramax", "联系 Gramax")}
            </p>
            <h2>
              {t(
                lang,
                "Discuss the property, portfolio or programme you need managed.",
                "沟通您需要管理的物业、投资组合或住房项目。",
              )}
            </h2>
          </div>
          <Link className="button button-light" href={path(lang, "/contact")}>
            {t(lang, "Contact Gramax", "联系 Gramax")}
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}
