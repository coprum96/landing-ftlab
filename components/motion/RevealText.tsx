"use client";

import { useEffect, useRef } from "react";
import { gsap, ease, registerGsap } from "@/lib/animations";
import { motion } from "@/lib/motion";
import { useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";

export function RevealText({
  children,
  className,
  as: Tag = "div",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionPreferred();

  useEffect(() => {
    if (reduced || !ref.current) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: motion.reveal.titleDuration,
          delay,
          ease: ease.out,
          scrollTrigger: {
            trigger: ref.current,
            start: motion.reveal.start,
            once: true,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [delay, reduced]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={cx(className)}>
      {children}
    </Tag>
  );
}

export function RevealLine({
  lines,
  className,
  lineClassName,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPreferred();

  useEffect(() => {
    if (reduced || !ref.current) return;
    registerGsap();
    const ctx = gsap.context(() => {
      const items = ref.current?.querySelectorAll("[data-line]");
      if (!items) return;
      gsap.fromTo(
        items,
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: ease.out,
          scrollTrigger: {
            trigger: ref.current,
            start: motion.reveal.start,
            once: true,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced, lines]);

  return (
    <div ref={ref} className={className}>
      {lines.map((line) => (
        <div key={line} className="overflow-hidden">
          <div data-line className={lineClassName}>
            {line}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FadeIn({
  children,
  className,
  y = motion.reveal.contentY,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPreferred();

  useEffect(() => {
    if (reduced || !ref.current) return;
    registerGsap();
    const ctx = gsap.context(() => {
      const root = ref.current!;
      const number = root.querySelector("[data-reveal-number]");
      const title = root.querySelector("[data-reveal-title]");
      const blocks = root.querySelectorAll("[data-reveal-block]");

      if (number || title || blocks.length) {
        const tl = gsap.timeline({
          delay,
          scrollTrigger: {
            trigger: root,
            start: motion.reveal.start,
            once: true,
          },
        });
        if (number) {
          tl.fromTo(
            number,
            { y: 8, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: motion.reveal.numberDuration,
              ease: ease.soft,
            },
            0,
          );
        }
        if (title) {
          tl.fromTo(
            title,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: motion.reveal.titleDuration,
              ease: ease.out,
            },
            number ? 0.1 : 0,
          );
        }
        if (blocks.length) {
          tl.fromTo(
            blocks,
            { y, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: motion.reveal.contentDuration,
              stagger: 0.08,
              ease: ease.out,
            },
            "-=0.3",
          );
        }
        return;
      }

      gsap.fromTo(
        root,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: motion.reveal.contentDuration,
          delay,
          ease: ease.out,
          scrollTrigger: {
            trigger: root,
            start: motion.reveal.start,
            once: true,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [delay, reduced, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
