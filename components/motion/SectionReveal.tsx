"use client";

import { useEffect, useRef } from "react";
import { gsap, ease, registerGsap } from "@/lib/animations";
import { motion } from "@/lib/motion";
import { useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Animate as section number / label */
  number?: React.ReactNode;
  /** Animate as section title */
  title?: React.ReactNode;
  /** Delay before content (seconds) */
  delay?: number;
  once?: boolean;
};

/**
 * Consistent scroll reveal language:
 * SECTION NUMBER → SECTION TITLE → CONTENT
 */
export function SectionReveal({
  children,
  className,
  number,
  title,
  delay = 0,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPreferred();

  useEffect(() => {
    if (!ref.current) return;
    if (reduced) return;

    registerGsap();
    const ctx = gsap.context(() => {
      const root = ref.current!;
      const num = root.querySelector("[data-reveal-number]");
      const tit = root.querySelector("[data-reveal-title]");
      const content = root.querySelector("[data-reveal-content]");
      const m = motion.reveal;

      const tl = gsap.timeline({
        delay,
        scrollTrigger: {
          trigger: root,
          start: m.start,
          once,
        },
      });

      if (num) {
        tl.fromTo(
          num,
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: m.numberDuration, ease: ease.soft },
          0,
        );
      }

      if (tit) {
        tl.fromTo(
          tit,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: m.titleDuration, ease: ease.out },
          num ? 0.12 : 0,
        );
      }

      if (content) {
        tl.fromTo(
          content,
          { y: m.contentY, opacity: 0 },
          { y: 0, opacity: 1, duration: m.contentDuration, ease: ease.out },
          "-=0.35",
        );
      }
    }, ref);

    return () => ctx.revert();
  }, [delay, once, reduced]);

  const hasStructured = number != null || title != null;

  if (!hasStructured) {
    return (
      <div ref={ref} className={className}>
        <div data-reveal-content>{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cx(className)}>
      {number != null ? <div data-reveal-number>{number}</div> : null}
      {title != null ? <div data-reveal-title>{title}</div> : null}
      <div data-reveal-content>{children}</div>
    </div>
  );
}
