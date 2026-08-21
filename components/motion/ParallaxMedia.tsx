"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, ease, registerGsap } from "@/lib/animations";
import { useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";

export function ParallaxMedia({
  children,
  className,
  speed = 0.15,
  expand = false,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  expand?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPreferred();

  useEffect(() => {
    if (reduced || !wrapRef.current || !innerRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current,
        {
          scale: 0.92,
          borderRadius: 24,
          opacity: 0.7,
          width: expand ? "70vw" : "100%",
        },
        {
          scale: 1,
          borderRadius: 0,
          opacity: 1,
          width: expand ? "100vw" : "100%",
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 85%",
            end: "top 20%",
            scrub: true,
          },
        },
      );

      gsap.to(innerRef.current, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [expand, reduced, speed]);

  return (
    <div
      ref={wrapRef}
      className={cx("media-mask mx-auto overflow-hidden", className)}
    >
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}

void ScrollTrigger;
void ease;
