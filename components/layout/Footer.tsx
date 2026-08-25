import Link from "next/link";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { lab } from "@/data/lab";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z" />
    </svg>
  );
}

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const links = [
    { label: dict.nav.research, path: "research/human" },
    { label: dict.nav.projects, path: "projects" },
    { label: dict.nav.education, path: "education" },
    { label: dict.nav.publications, path: "publications" },
    { label: dict.nav.people, path: "people" },
    { label: dict.nav.about, path: "about" },
  ];

  const legal = [
    { label: dict.footer.privacy, path: "privacy" },
    { label: dict.footer.terms, path: "terms" },
    { label: dict.footer.researchDisclaimer, path: "research-disclaimer" },
  ];

  const mailto = `mailto:${lab.contactEmail}?subject=${encodeURIComponent(
    dict.collaborate.mailSubject,
  )}`;

  return (
    <footer className="border-t border-white/10 section-pad pt-24 pb-12">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-5">
          <div className="flex items-center gap-4">
            <Link
              href={getLocalizedPath(locale)}
              className="label-mono inline-flex min-h-11 items-center text-[12px] text-ink"
            >
              {dict.nav.brand}
            </Link>
            <a
              href={lab.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label={dict.footer.linkedin}
              title={dict.footer.linkedin}
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </div>
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
          <div className="flex items-center gap-4">
            <p>{dict.footer.attribution}</p>
            <a
              href={lab.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label={dict.footer.linkedin}
              title={dict.footer.linkedin}
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
