import Image from "next/image";
import Link from "next/link";
import type { Language } from "../_data/content";
import { MotionEffects } from "./MotionEffects";

const nav = [
  { path: "/", en: "Home", zh: "首页" },
  { path: "/rentals", en: "Rentals", zh: "可租房源" },
  { path: "/team", en: "Our Team", zh: "团队介绍" },
  {
    path: "/landlords",
    en: "Property Owners",
    zh: "房东服务",
    children: [
      { path: "/landlords", en: "Owner overview", zh: "房东服务概览" },
      { path: "/landlords/management", en: "Complete management", zh: "完整物业管理" },
      { path: "/landlords/compliance", en: "Healthy Homes & compliance", zh: "健康家园与合规" },
      { path: "/landlords/inspections-maintenance", en: "Inspections & maintenance", zh: "巡检与维修" },
      { path: "/landlords/insurance", en: "Insurance & records", zh: "保险与记录" },
      { path: "/appraisal", en: "Free rental appraisal", zh: "免费租金评估" },
    ],
  },
  {
    path: "/tenants",
    en: "Tenants",
    zh: "租客服务",
    children: [
      { path: "/tenants", en: "Tenant overview", zh: "租客服务概览" },
      { path: "/tenants/renting", en: "Renting with Gramax", zh: "选择 Gramax 房源" },
      { path: "/tenants/maintenance", en: "Maintenance requests", zh: "维修申报" },
      { path: "/tenants/tenancy-types", en: "Tenancy types & ending", zh: "租约类型与终止" },
      { path: "/tenants/inspections", en: "Routine inspections", zh: "例行物业检查" },
      { path: "/tenants/smoke-alarms", en: "Smoke alarm safety", zh: "烟雾报警器安全" },
    ],
  },
  {
    path: "/commercial",
    en: "Commercial",
    zh: "商业物业",
    children: [
      { path: "/commercial", en: "Commercial overview", zh: "商业服务概览" },
      { path: "/commercial/lease-management", en: "Lease management", zh: "租约管理" },
      { path: "/commercial/financial-management", en: "Financial management", zh: "财务管理" },
      { path: "/commercial/property-operations", en: "Property operations", zh: "物业运营" },
      { path: "/commercial/compliance", en: "Compliance", zh: "合规管理" },
      { path: "/commercial/tenant-management", en: "Tenant management", zh: "租客管理" },
      { path: "/commercial/asset-advisory", en: "Asset advisory", zh: "资产管理建议" },
    ],
  },
] as const;

function localized(path: string, lang: Language) {
  if (lang === "zh") {
    return path === "/" ? "/zh" : `/zh${path}`;
  }
  return path;
}

export function SiteFrame({
  children,
  lang,
  currentPath,
}: {
  children: React.ReactNode;
  lang: Language;
  currentPath: string;
}) {
  const isZh = lang === "zh";
  const languageHref = isZh
    ? currentPath
    : currentPath === "/"
      ? "/zh"
      : `/zh${currentPath}`;

  return (
    <div className="site">
      <MotionEffects />
      <header className="site-header">
        <div className="container header-inner">
          <Link
            className="brand"
            href={localized("/", lang)}
            aria-label={isZh ? "Gramax 首页" : "Gramax home"}
          >
            <Image
              src={
                isZh
                  ? "/brand/gramax-logo-zh.png"
                  : "/brand/gramax-logo-en.png"
              }
              alt={isZh ? "Gramax 贵鑫物业管理" : "Gramax Property Management"}
              width={568}
              height={406}
              priority
            />
          </Link>

          <nav className="desktop-nav" aria-label={isZh ? "主导航" : "Main navigation"}>
            {nav.map((item) =>
              "children" in item ? (
                <div
                  className={`nav-group${
                    currentPath === item.path ||
                    currentPath.startsWith(`${item.path}/`)
                      ? " active"
                      : ""
                  }`}
                  key={item.path}
                >
                  <Link className="nav-parent" href={localized(item.path, lang)}>
                    {item[lang]} <span aria-hidden="true">⌄</span>
                  </Link>
                  <div className="nav-dropdown">
                    {item.children.map((child) => (
                      <Link href={localized(child.path, lang)} key={child.path}>
                        {child[lang]}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.path}
                  className={currentPath === item.path ? "active" : undefined}
                  href={localized(item.path, lang)}
                >
                  {item[lang]}
                </Link>
              ),
            )}
          </nav>

          <div className="header-actions">
            <Link className="language-link" href={languageHref}>
              {isZh ? "EN" : "中文"}
            </Link>
            <Link className="button button-small" href={localized("/appraisal", lang)}>
              {isZh ? "免费租金评估" : "Free appraisal"}
            </Link>
          </div>

          <details className="mobile-nav">
            <summary>{isZh ? "菜单" : "Menu"}</summary>
            <div className="mobile-nav-panel">
              {nav.map((item) =>
                "children" in item ? (
                  <details className="mobile-nav-group" key={item.path}>
                    <summary>{item[lang]}</summary>
                    <div>
                      {item.children.map((child) => (
                        <Link href={localized(child.path, lang)} key={child.path}>
                          {child[lang]}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link key={item.path} href={localized(item.path, lang)}>
                    {item[lang]}
                  </Link>
                ),
              )}
              <Link href={localized("/contact", lang)}>
                {isZh ? "联系我们" : "Contact"}
              </Link>
              <Link href={languageHref}>{isZh ? "English" : "中文"}</Link>
              <Link className="button" href={localized("/appraisal", lang)}>
                {isZh ? "免费租金评估" : "Free appraisal"}
              </Link>
            </div>
          </details>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Image
              className="footer-logo"
              src={
                isZh
                  ? "/brand/gramax-logo-zh.png"
                  : "/brand/gramax-logo-en.png"
              }
              alt=""
              width={568}
              height={406}
            />
            <p className="footer-statement">
              {isZh
                ? "贵在专业，用心做事。"
                : "Professional care for the property that matters to you."}
            </p>
          </div>
          <div>
            <p className="footer-label">{isZh ? "服务" : "Services"}</p>
            <Link href={localized("/landlords", lang)}>
              {isZh ? "住宅物业管理" : "Residential management"}
            </Link>
            <Link href={localized("/commercial", lang)}>
              {isZh ? "商业物业管理" : "Commercial management"}
            </Link>
            <Link href={localized("/appraisal", lang)}>
              {isZh ? "租金评估" : "Rental appraisal"}
            </Link>
            <Link href={localized("/rentals", lang)}>
              {isZh ? "查看可租房源" : "View available properties"}
            </Link>
          </div>
          <div>
            <p className="footer-label">{isZh ? "帮助" : "Support"}</p>
            <Link href={localized("/tenants", lang)}>
              {isZh ? "维修申请" : "Maintenance request"}
            </Link>
            <Link href={localized("/resources", lang)}>
              {isZh ? "资料与表格" : "Guides & forms"}
            </Link>
            <Link href={localized("/team", lang)}>
              {isZh ? "团队介绍" : "Our team"}
            </Link>
          </div>
          <div>
            <p className="footer-label">{isZh ? "联系" : "Contact"}</p>
            <a href="tel:+64212468868">021 246 8868</a>
            <a href="mailto:info@gramaxproperty.co.nz">
              info@gramaxproperty.co.nz
            </a>
            <p>84 Harris Road, East Tāmaki, Auckland 2013</p>
            <Link className="footer-contact" href={localized("/contact", lang)}>
              {isZh ? "发送咨询 →" : "Send an enquiry →"}
            </Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Gramax Property Management Ltd</span>
          <Link href={localized("/privacy", lang)}>
            {isZh ? "隐私声明" : "Privacy"}
          </Link>
        </div>
      </footer>
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="page-intro">
      <div className="container narrow">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="intro-copy">{body}</p>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="section-heading">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}

export function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="arrow-link" href={href}>
      {children} <span aria-hidden="true">→</span>
    </Link>
  );
}
