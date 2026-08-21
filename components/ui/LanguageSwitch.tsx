"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { switchLocalePath, type Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;

  return (
    <div className="inline-flex items-center gap-2 label-mono text-[11px]">
      {(["en", "ru"] as const).map((code, index) => (
        <span key={code} className="contents">
          {index > 0 ? <span className="text-muted/50">/</span> : null}
          <Link
            href={switchLocalePath(pathname, code)}
            className={cx(
              "relative transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
              locale === code ? "text-ink" : "text-muted hover:text-ink",
            )}
            aria-current={locale === code ? "page" : undefined}
          >
            {code.toUpperCase()}
            <span
              aria-hidden
              className={cx(
                "absolute -bottom-1 left-0 h-px bg-accent transition-[transform,opacity] duration-300 ease-out",
                locale === code
                  ? "w-full scale-x-100 opacity-100"
                  : "w-full origin-left scale-x-0 opacity-0",
              )}
            />
          </Link>
        </span>
      ))}
    </div>
  );
}
