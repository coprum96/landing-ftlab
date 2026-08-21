"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { getLenisInstance } from "@/lib/lenis";

type NavLink = {
  key: "research" | "projects" | "education" | "publications" | "people" | "about";
  path: string;
};

export function MobileMenu({
  open,
  onClose,
  locale,
  dict,
  links,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  dict: Dictionary;
  links: NavLink[];
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const lenis = getLenisInstance();
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("menu-open");

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);

    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.documentElement.classList.remove("menu-open");
      lenis?.start();
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[60] bg-[#080808] px-6 pb-10 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className="flex items-center justify-between">
            <span id={titleId} className="label-mono text-[11px]">
              {dict.nav.brand}
            </span>
            <button
              ref={closeRef}
              type="button"
              className="label-mono min-h-11 min-w-11 px-3 text-[11px] text-ink underline decoration-white/30 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              onClick={onClose}
            >
              {dict.nav.close}
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-6" aria-label={dict.nav.menu}>
            {links.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 * index, duration: 0.45 }}
              >
                <Link
                  href={getLocalizedPath(locale, item.path)}
                  onClick={onClose}
                  className="headline-display block break-words focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {dict.nav[item.key]}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="mt-16">
            <LanguageSwitch locale={locale} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
