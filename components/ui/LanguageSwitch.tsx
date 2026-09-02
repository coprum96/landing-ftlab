"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { switchLocalePath, type Dictionary, type Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

export function LanguageSwitch({
  locale,
  dict,
}: {
  locale: Locale;
  dict?: Dictionary;
}) {
  const pathname = usePathname() || `/${locale}`;
  const labels = {
    en: dict?.nav.languageEn ?? "English",
    ru: dict?.nav.languageRu ?? "Русский",
  };

  return (
    <div
      className="inline-flex items-center gap-1 label-mono text-xs"
      role="group"
      aria-label="Language"
    >
      {(["en", "ru"] as const).map((code, index) => (
        <span key={code} className="contents">
          {index > 0 ? (
            <span className="px-1 text-muted" aria-hidden>
              /
            </span>
          ) : null}
          <Link
            href={switchLocalePath(pathname, code)}
            lang={code}
            hrefLang={code}
            aria-label={labels[code]}
            aria-current={locale === code ? "true" : undefined}
            className={cx(
              "relative inline-flex min-h-11 min-w-11 items-center justify-center transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
              locale === code ? "text-ink" : "text-ink/65 hover:text-ink",
            )}
          >
            <span aria-hidden>{code.toUpperCase()}</span>
            <span
              aria-hidden
              className={cx(
                "absolute bottom-2 left-1/2 h-px w-5 -translate-x-1/2 bg-accent transition-[transform,opacity] duration-300 ease-out",
                locale === code
                  ? "scale-x-100 opacity-100"
                  : "origin-left scale-x-0 opacity-0",
              )}
            />
          </Link>
        </span>
      ))}
    </div>
  );
}
