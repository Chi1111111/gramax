import Image from "next/image";
import Link from "next/link";
import {
  tradeMeListingsUrl,
  type Language,
} from "../_data/content";

const nav = [
  {
    path: tradeMeListingsUrl,
    en: "Rentals ↗",
    zh: "可租房源 ↗",
    external: true,
  },
  { path: "/team", en: "Our Team", zh: "团队介绍" },
  { path: "/landlords", en: "Property Owners", zh: "房东服务" },
  { path: "/tenants", en: "Tenants", zh: "租客服务" },
  { path: "/commercial", en: "Commercial", zh: "商业物业" },
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
            {nav.map((item) => (
              <Link
                key={item.path}
                className={currentPath === item.path ? "active" : undefined}
                href={"external" in item ? item.path : localized(item.path, lang)}
                target={"external" in item ? "_blank" : undefined}
                rel={"external" in item ? "noreferrer" : undefined}
              >
                {item[lang]}
              </Link>
            ))}
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
              {nav.map((item) => (
                <Link
                  key={item.path}
                  href={"external" in item ? item.path : localized(item.path, lang)}
                  target={"external" in item ? "_blank" : undefined}
                  rel={"external" in item ? "noreferrer" : undefined}
                >
                  {item[lang]}
                </Link>
              ))}
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
            <a href={tradeMeListingsUrl} target="_blank" rel="noreferrer">
              {isZh ? "Trade Me 可租房源 ↗" : "Current rentals on Trade Me ↗"}
            </a>
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
