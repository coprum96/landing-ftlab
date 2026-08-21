import Link from "next/link";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { lab } from "@/data/lab";

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

  const legal = [
    { label: dict.footer.privacy, path: "privacy" },
    { label: dict.footer.personalData, path: "personal-data" },
    { label: dict.footer.terms, path: "terms" },
  ];

  const mailto = `mailto:${lab.contactEmail}?subject=${encodeURIComponent(
    dict.collaborate.mailSubject,
  )}`;

  return (
    <footer className="border-t border-white/10 section-pad pt-24 pb-12">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-5">
          <Link
            href={getLocalizedPath(locale)}
            className="label-mono inline-flex min-h-11 items-center text-[12px] text-ink"
          >
            {dict.nav.brand}
          </Link>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
            {dict.footer.institution}
          </p>
          <a
            href={mailto}
            className="label-mono mt-6 inline-flex min-h-11 items-center text-[12px] text-ink/90 underline decoration-white/25 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            {dict.footer.contact}
          </a>
          <p className="label-mono mt-2 text-[12px] text-muted">
            {lab.contactEmail}
          </p>
        </div>

        <div className="col-span-12 mt-12 flex flex-col gap-1 md:col-span-4 md:mt-0">
          {links.map((link) => (
            <AnimatedLink
              key={link.path}
              href={getLocalizedPath(locale, link.path)}
              className="label-mono inline-flex min-h-11 items-center text-[12px] text-muted hover:text-ink"
            >
              {link.label}
            </AnimatedLink>
          ))}
        </div>

        <div className="col-span-12 mt-12 flex flex-col gap-1 md:col-span-3 md:mt-0 md:justify-self-end">
          <LanguageSwitch locale={locale} />
          <div className="mt-6 flex flex-col gap-1">
            {legal.map((link) => (
              <Link
                key={link.path}
                href={getLocalizedPath(locale, link.path)}
                className="label-mono inline-flex min-h-11 items-center text-[12px] text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="col-span-12 mt-24 md:mt-36">
          <p className="headline-display max-w-5xl">
            {dict.footer.tagline1}
            <br />
            {dict.footer.tagline2}
          </p>
        </div>

        <div className="col-span-12 mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-[13px] text-muted md:flex-row md:items-center md:justify-between">
          <p>{dict.footer.copyright}</p>
          <p>{dict.footer.attribution}</p>
        </div>
        <p className="col-span-12 mt-4 text-[12px] text-muted/90">
          {dict.footer.legalNote}
        </p>
      </div>
    </footer>
  );
}
