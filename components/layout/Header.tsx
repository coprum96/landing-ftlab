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
  const [researchOpen, setResearchOpen] = useState(false);

  const hide =
    !reduced &&
    !open &&
    scrolled &&
    direction === "down" &&
    y > motion.header.scrollThreshold + 80;

  const researchActive =
    isActivePath(pathname, locale, "research/human") ||
    isActivePath(pathname, locale, "research/agentic-ai") ||
    isActivePath(pathname, locale, "research");

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
            {/* Research → Human / Agentic choice */}
            <div
              className="relative"
              onMouseEnter={() => setResearchOpen(true)}
              onMouseLeave={() => setResearchOpen(false)}
            >
              <button
                type="button"
                className={cx(
                  "group relative shrink-0 whitespace-nowrap label-mono text-[11px] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                  researchActive ? "text-ink" : "text-muted hover:text-ink",
                )}
                aria-expanded={researchOpen}
                aria-haspopup="true"
                onFocus={() => setResearchOpen(true)}
              >
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                  {dict.nav.research}
                </span>
                <span
                  className={cx(
                    "absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300",
                    researchActive || researchOpen ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </button>

              <div
                className={cx(
                  "absolute left-1/2 top-full z-50 w-44 -translate-x-1/2 pt-3 transition-[opacity,transform] duration-300",
                  researchOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-1 opacity-0",
                )}
              >
                <div className="border border-white/10 bg-[#0a0a0a]/95 px-4 py-3 backdrop-blur-md">
                  <Link
                    href={getLocalizedPath(locale, "research/human")}
                    aria-current={
                      isActivePath(pathname, locale, "research/human")
                        ? "page"
                        : undefined
                    }
                    className={cx(
                      "label-mono block min-h-11 py-2 text-xs tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                      isActivePath(pathname, locale, "research/human")
                        ? "text-accent underline decoration-accent/70 underline-offset-4"
                        : "text-muted hover:text-ink",
                    )}
                    onClick={() => setResearchOpen(false)}
                  >
                    {dict.nav.researchHuman}
                  </Link>
                  <Link
                    href={getLocalizedPath(locale, "research/agentic-ai")}
                    aria-current={
                      isActivePath(pathname, locale, "research/agentic-ai")
                        ? "page"
                        : undefined
                    }
                    className={cx(
                      "label-mono block min-h-11 py-2 text-xs tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                      isActivePath(pathname, locale, "research/agentic-ai")
                        ? "text-accent underline decoration-accent/70 underline-offset-4"
                        : "text-muted hover:text-ink",
                    )}
                    onClick={() => setResearchOpen(false)}
                  >
                    {dict.nav.researchAgentic}
                  </Link>
                </div>
              </div>
            </div>

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
            <LanguageSwitch locale={locale} dict={dict} />
            <button
              type="button"
              className="label-mono min-h-11 min-w-11 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent xl:hidden"
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
