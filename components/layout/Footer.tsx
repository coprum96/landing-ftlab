import Link from "next/link";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { AnimatedLink } from "@/components/ui/AnimatedLink";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const links = [
    { label: dict.nav.research, path: "research" },
    { label: dict.nav.projects, path: "projects" },
    { label: dict.nav.education, path: "education" },
    { label: dict.nav.publications, path: "publications" },
    { label: dict.nav.people, path: "people" },
    { label: dict.nav.about, path: "about" },
  ];

  return (
    <footer className="border-t border-white/10 section-pad pt-24 pb-12">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-5">
          <Link
            href={getLocalizedPath(locale)}
            className="label-mono text-[12px] text-ink"
          >
            {dict.nav.brand}
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {dict.footer.institution}
          </p>
        </div>

        <div className="col-span-12 mt-12 flex flex-col gap-3 md:col-span-4 md:mt-0">
          {links.map((link) => (
            <AnimatedLink
              key={link.path}
              href={getLocalizedPath(locale, link.path)}
              className="label-mono text-[11px] text-muted hover:text-ink"
            >
              {link.label}
            </AnimatedLink>
          ))}
        </div>

        <div className="col-span-12 mt-12 md:col-span-3 md:mt-0 md:justify-self-end">
          <LanguageSwitch locale={locale} />
        </div>

        <div className="col-span-12 mt-24 md:mt-36">
          <p className="headline-display max-w-5xl">
            {dict.footer.tagline1}
            <br />
            {dict.footer.tagline2}
          </p>
        </div>

        <div className="col-span-12 mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>{dict.footer.copyright}</p>
          <p>{dict.footer.attribution}</p>
        </div>
      </div>
    </footer>
  );
}
