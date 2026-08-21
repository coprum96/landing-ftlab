"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, ease, registerGsap } from "@/lib/animations";
import { useReducedMotionPreferred } from "@/lib/hooks";

export function AnimatedCounter({
  value,
  className,
  suffix = "",
}: {
  value: number;
  className?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotionPreferred();

  useEffect(() => {
    if (!ref.current) return;
    if (reduced) {
      ref.current.textContent = `${value}${suffix}`;
      return;
    }
    registerGsap();
    const state = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(state, {
        n: value,
        duration: 1.4,
        ease: ease.out,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = `${Math.round(state.n)}${suffix}`;
          }
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced, suffix, value]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

void ScrollTrigger;
