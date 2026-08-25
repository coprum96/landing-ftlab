import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function NotFound() {
  const locale: Locale = "en";
  const dict = getDictionary(locale);

  return (
    <div className="page-top flex min-h-[70svh] items-center">
      <div className="editorial-grid w-full">
        <div className="col-span-12 md:col-span-8">
          <p className="label-mono text-[11px] text-accent">404</p>
          <h1 className="headline-section mt-6">Page not found</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            The page you requested does not exist or has been moved.
          </p>
          <div className="mt-10 flex flex-wrap gap-6 label-mono text-[11px]">
            <Link href={`/${locale}`} className="text-ink hover:text-accent">
              ← {dict.nav.brand}
            </Link>
            <Link
              href={`/${locale}/projects`}
              className="text-muted hover:text-accent"
            >
              {dict.nav.projects}
            </Link>
            <Link
              href={`/${locale}/research/human`}
              className="text-muted hover:text-accent"
            >
              {dict.nav.research}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
