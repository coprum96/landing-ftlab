"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { getLenisInstance } from "@/lib/lenis";

type NavLink = {
  key: "projects" | "education" | "publications" | "people" | "about";
  path: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

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
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const lenis = getLenisInstance();
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("menu-open");

    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    main?.setAttribute("aria-hidden", "true");
    footer?.setAttribute("inert", "");
    footer?.setAttribute("aria-hidden", "true");

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
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
      main?.removeAttribute("inert");
      main?.removeAttribute("aria-hidden");
      footer?.removeAttribute("inert");
      footer?.removeAttribute("aria-hidden");
      lenis?.start();
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[60] flex max-h-[100dvh] flex-col bg-[#080808] px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className="flex shrink-0 items-center justify-between">
            <span id={titleId} className="label-mono text-[12px]">
              {dict.nav.brand}
            </span>
            <button
              ref={closeRef}
              type="button"
              className="label-mono min-h-11 min-w-11 px-3 text-[12px] text-ink underline decoration-white/30 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              onClick={onClose}
            >
              {dict.nav.close}
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
            <nav className="mt-12 flex flex-col gap-2 pb-8" aria-label={dict.nav.menu}>
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0, duration: 0.45 }}
              >
                <p className="headline-display py-2">{dict.nav.research}</p>
                <div className="mb-4 ml-1 flex flex-col gap-1 border-l border-white/15 pl-4">
                  <Link
                    href={getLocalizedPath(locale, "research/human")}
                    onClick={onClose}
                    className="label-mono min-h-11 py-2 text-[12px] text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {dict.nav.researchHuman}
                  </Link>
                  <Link
                    href={getLocalizedPath(locale, "research/agentic-ai")}
                    onClick={onClose}
                    className="label-mono min-h-11 py-2 text-[12px] text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {dict.nav.researchAgentic}
                  </Link>
                </div>
              </motion.div>

              {links.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * (index + 1), duration: 0.45 }}
                >
                  <Link
                    href={getLocalizedPath(locale, item.path)}
                    onClick={onClose}
                    className="headline-display block min-h-11 break-words py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {dict.nav[item.key]}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="pb-4">
              <LanguageSwitch locale={locale} />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
