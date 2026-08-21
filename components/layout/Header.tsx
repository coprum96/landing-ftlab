"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";
import { motion } from "@/lib/motion";
import { useScrolled, useScrollDirection, useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { MobileMenu } from "@/components/layout/MobileMenu";

const links = [
  { key: "research" as const, path: "research" },
  { key: "projects" as const, path: "projects" },
  { key: "education" as const, path: "education" },
  { key: "publications" as const, path: "publications" },
  { key: "people" as const, path: "people" },
  { key: "about" as const, path: "about" },
];

function isActivePath(pathname: string, locale: Locale, path: string) {
  const base = getLocalizedPath(locale, path);
  return pathname === base || pathname.startsWith(`${base}/`);
}

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname() || `/${locale}`;
  const scrolled = useScrolled(motion.header.scrollThreshold);
  const { direction, y } = useScrollDirection(motion.header.hideDelta);
  const reduced = useReducedMotionPreferred();
  const [open, setOpen] = useState(false);

  const hide =
    !reduced &&
    !open &&
    scrolled &&
    direction === "down" &&
    y > motion.header.scrollThreshold + 80;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-accent focus:px-4 focus:py-3 focus:label-mono focus:text-[11px] focus:text-ink"
      >
        Skip to main content
      </a>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter,border-color] duration-500 ease-out",
          scrolled
            ? "border-b border-white/[0.08] bg-[rgba(8,8,8,0.72)] backdrop-blur-[12px]"
            : "border-b border-transparent bg-transparent",
          hide ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="editorial-grid items-center py-4 xl:py-5">
          <Link
            href={getLocalizedPath(locale)}
            className="col-span-8 min-w-0 truncate whitespace-nowrap label-mono text-[11px] text-ink transition-colors duration-300 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent xl:col-span-3"
          >
            {dict.nav.brand}
          </Link>

          <nav
            className="col-span-6 hidden min-w-0 items-center justify-center gap-5 xl:flex 2xl:gap-7"
            aria-label="Primary"
          >
            {links.map((item) => {
              const active = isActivePath(pathname, locale, item.path);
              return (
                <Link
                  key={item.path}
                  href={getLocalizedPath(locale, item.path)}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "group relative shrink-0 whitespace-nowrap label-mono text-[11px] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                    active ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                    {dict.nav[item.key]}
                  </span>
                  <span
                    className={cx(
                      "absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="col-span-4 flex items-center justify-end gap-4 xl:col-span-3 xl:gap-5">
            <LanguageSwitch locale={locale} />
            <button
              type="button"
              className="label-mono min-h-11 min-w-11 text-[11px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              {dict.nav.menu}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        locale={locale}
        dict={dict}
        links={links}
      />
    </>
  );
}
