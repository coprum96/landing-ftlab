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
  const research = [
    { label: dict.nav.researchHuman, path: "research/human" },
    { label: dict.nav.researchAgentic, path: "research/agentic-ai" },
    { label: dict.nav.projects, path: "projects" },
    { label: dict.nav.publications, path: "publications" },
  ];

  const institution = [
    { label: dict.nav.education, path: "education" },
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
  const linkedInLabel = `${dict.footer.linkedin} ${dict.footer.opensNewTab}`;

  return (
    <footer className="border-t border-white/15 section-pad pt-20 pb-12">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-4">
          <p className="label-mono text-xs tracking-[0.1em] text-ink/60">
            {dict.footer.groupInstitution}
          </p>
          <Link
            href={getLocalizedPath(locale)}
            className="label-mono mt-4 inline-flex min-h-11 max-w-sm items-center text-xs leading-snug text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {dict.nav.brand}
          </Link>
          <p className="mt-3 max-w-sm text-base leading-relaxed text-muted">
            {dict.footer.institution}
          </p>
          <div className="mt-4 flex flex-col gap-1">
            {institution.map((link) => (
              <AnimatedLink
                key={link.path}
                href={getLocalizedPath(locale, link.path)}
                className="label-mono inline-flex min-h-11 items-center text-xs text-ink/70 hover:text-ink"
              >
                {link.label}
              </AnimatedLink>
            ))}
          </div>
        </div>

        <div className="col-span-12 mt-10 md:col-span-3 md:mt-0">
          <p className="label-mono text-xs tracking-[0.1em] text-ink/60">
            {dict.footer.groupResearch}
          </p>
          <div className="mt-4 flex flex-col gap-1">
            {research.map((link) => (
              <AnimatedLink
                key={link.path}
                href={getLocalizedPath(locale, link.path)}
                className="label-mono inline-flex min-h-11 items-center text-xs text-ink/70 hover:text-ink"
              >
                {link.label}
              </AnimatedLink>
            ))}
          </div>
        </div>

        <div className="col-span-12 mt-10 md:col-span-3 md:mt-0">
          <p className="label-mono text-xs tracking-[0.1em] text-ink/60">
            {dict.footer.groupContact}
          </p>
          <a
            href={mailto}
            className="label-mono mt-4 inline-flex min-h-11 items-center text-xs text-ink underline decoration-white/30 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {dict.footer.contact}
          </a>
          <p className="mt-2 text-sm text-ink/75">{lab.contactEmail}</p>
          <a
            href={lab.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-ink/75 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            aria-label={linkedInLabel}
          >
            <LinkedInIcon className="h-4 w-4" />
            <span>LinkedIn</span>
            <span className="sr-only">{dict.footer.opensNewTab}</span>
          </a>
          <div className="mt-6">
            <LanguageSwitch locale={locale} dict={dict} />
          </div>
        </div>

        <div className="col-span-12 mt-10 md:col-span-2 md:mt-0">
          <p className="label-mono text-xs tracking-[0.1em] text-ink/60">
            {dict.footer.groupLegal}
          </p>
          <div className="mt-4 flex flex-col gap-1">
            {legal.map((link) => (
              <Link
                key={link.path}
                href={getLocalizedPath(locale, link.path)}
                className="label-mono inline-flex min-h-11 items-center text-xs text-ink/70 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="col-span-12 mt-16 md:mt-24">
          <p className="headline-display max-w-5xl">
            {dict.footer.tagline1}
            <br />
            {dict.footer.tagline2}
          </p>
        </div>

        <div className="col-span-12 mt-12 flex flex-col gap-3 border-t border-white/15 pt-8 text-sm text-ink/65 md:flex-row md:items-center md:justify-between">
          <p>{dict.footer.copyright}</p>
          <p>{dict.footer.attribution}</p>
        </div>
      </div>
    </footer>
  );
}
