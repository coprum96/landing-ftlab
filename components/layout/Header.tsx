"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";
import { motion } from "@/lib/motion";
import {
  useScrolled,
  useScrollDirection,
  useReducedMotionPreferred,
} from "@/lib/hooks";
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

function isHomePath(pathname: string, locale: Locale) {
  return pathname === `/${locale}` || pathname === `/${locale}/`;
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
  const researchId = useId();
  const researchWrapRef = useRef<HTMLDivElement>(null);
  const researchButtonRef = useRef<HTMLButtonElement>(null);
  const researchItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

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
  const homeActive = isHomePath(pathname, locale);

  const closeResearch = (returnFocus = false) => {
    setResearchOpen(false);
    if (returnFocus) researchButtonRef.current?.focus();
  };

  useEffect(() => {
    if (!researchOpen) return;

    const onPointer = (event: MouseEvent) => {
      if (!researchWrapRef.current?.contains(event.target as Node)) {
        closeResearch();
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeResearch(true);
      }
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [researchOpen]);

  const researchLinks = [
    {
      path: "research/human",
      label: dict.nav.researchHuman,
    },
    {
      path: "research/agentic-ai",
      label: dict.nav.researchAgentic,
    },
  ] as const;

  const onResearchKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setResearchOpen(true);
      queueMicrotask(() => researchItemRefs.current[0]?.focus());
    } else if (event.key === "Escape") {
      closeResearch(true);
    }
  };

  const onResearchItemKeyDown = (
    event: ReactKeyboardEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeResearch(true);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = (index + 1) % researchLinks.length;
      researchItemRefs.current[next]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = (index - 1 + researchLinks.length) % researchLinks.length;
      researchItemRefs.current[prev]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      researchItemRefs.current[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      researchItemRefs.current[researchLinks.length - 1]?.focus();
    }
  };

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
            aria-current={homeActive ? "page" : undefined}
            className={cx(
              "col-span-8 min-w-0 truncate whitespace-nowrap label-mono text-sm text-ink transition-colors duration-300 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent xl:col-span-3",
              homeActive && "underline decoration-accent/70 underline-offset-4",
            )}
          >
            {dict.nav.brandShort}
          </Link>

          <nav
            className="col-span-6 hidden min-w-0 items-center justify-center gap-5 xl:flex 2xl:gap-7"
            aria-label="Primary"
          >
            <div ref={researchWrapRef} className="relative">
              <button
                ref={researchButtonRef}
                type="button"
                className={cx(
                  "group relative shrink-0 whitespace-nowrap label-mono text-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                  researchActive || researchOpen
                    ? "text-ink"
                    : "text-muted hover:text-ink",
                )}
                aria-expanded={researchOpen}
                aria-haspopup="true"
                aria-controls={researchId}
                onClick={() => setResearchOpen((v) => !v)}
                onKeyDown={onResearchKeyDown}
              >
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                  {dict.nav.research}
                </span>
                <span
                  className={cx(
                    "absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300",
                    researchActive || researchOpen
                      ? "w-full"
                      : "w-0 group-hover:w-full",
                  )}
                />
              </button>

              <div
                id={researchId}
                role="region"
                className={cx(
                  "absolute left-1/2 top-full z-50 w-48 -translate-x-1/2 pt-3 transition-[opacity,transform] duration-300",
                  researchOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none invisible translate-y-1 opacity-0",
                )}
              >
                <div className="border border-white/15 bg-[#0a0a0a]/95 px-4 py-3 backdrop-blur-md">
                  {researchLinks.map((item, index) => {
                    const active = isActivePath(pathname, locale, item.path);
                    return (
                      <Link
                        key={item.path}
                        ref={(node) => {
                          researchItemRefs.current[index] = node;
                        }}
                        href={getLocalizedPath(locale, item.path)}
                        aria-current={active ? "page" : undefined}
                        className={cx(
                          "label-mono block min-h-11 py-2 text-sm tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                          active
                            ? "text-accent underline decoration-accent/70 underline-offset-4"
                            : "text-muted hover:text-ink",
                        )}
                        onClick={() => closeResearch()}
                        onKeyDown={(event) =>
                          onResearchItemKeyDown(event, index)
                        }
                      >
                        {item.label}
                      </Link>
                    );
                  })}
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
                    "group relative shrink-0 whitespace-nowrap label-mono text-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
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
