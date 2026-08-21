"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, ease, registerGsap } from "@/lib/animations";
import { motion } from "@/lib/motion";
import { useReducedMotionPreferred } from "@/lib/hooks";
import { scrollToTopInstant } from "@/lib/lenis";

function labelForPath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  const section = parts[1] || "home";
  const map: Record<string, string> = {
    home: "/ HOME",
    research: "/ RESEARCH",
    projects: "/ PROJECTS",
    education: "/ EDUCATION",
    publications: "/ PUBLICATIONS",
    people: "/ PEOPLE",
    about: "/ ABOUT",
  };
  if (parts[2]) {
    return `P / ${parts[2].slice(0, 12).toUpperCase()}`;
  }
  return map[section] ?? `/ ${section.toUpperCase()}`;
}

/**
 * Editorial dark-panel page transition.
 * First paint: soft fade only.
 * Internal navigations: brief covering panel with technical label, then exit.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const reduced = useReducedMotionPreferred();
  const panelRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState(() => labelForPath(pathname));
  const first = useRef(true);
  const key = useMemo(() => pathname, [pathname]);

  useEffect(() => {
    setLabel(labelForPath(pathname));
  }, [pathname]);

  useLayoutEffect(() => {
    scrollToTopInstant();
  }, [key]);

  useLayoutEffect(() => {
    if (reduced) return;
    registerGsap();

    const panel = panelRef.current;
    const content = contentRef.current;
    const labelEl = labelRef.current;
    if (!panel || !content) return;

    if (first.current) {
      first.current = false;
      gsap.set(panel, { yPercent: -100 });
      gsap.fromTo(
        content,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: motion.page.fadeDuration,
          ease: ease.out,
        },
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.set(panel, { yPercent: 0 })
        .fromTo(
          labelEl,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.22, ease: ease.soft },
          0,
        )
        .fromTo(
          content,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: motion.page.fadeDuration,
            ease: ease.out,
          },
          0.04,
        )
        .to(
          labelEl,
          { opacity: 0, duration: 0.18, ease: ease.soft },
          motion.page.panelDuration * 0.4,
        )
        .to(
          panel,
          {
            yPercent: -100,
            duration: motion.page.panelDuration,
            ease: ease.out,
          },
          motion.page.panelDuration * 0.3,
        );
    });

    return () => ctx.revert();
  }, [key, reduced]);

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <>
      <div
        ref={panelRef}
        className="pointer-events-none fixed inset-0 z-[60] flex items-end justify-start bg-[#050505] px-8 pb-12 md:px-12"
        aria-hidden
        style={{ transform: "translateY(-100%)" }}
      >
        <span
          ref={labelRef}
          className="label-mono text-[11px] tracking-[0.18em] text-muted"
        >
          {label}
        </span>
      </div>
      <div ref={contentRef} key={key}>
        {children}
      </div>
    </>
  );
}
