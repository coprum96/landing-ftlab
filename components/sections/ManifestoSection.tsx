"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap, registerGsap } from "@/lib/animations";
import { useReducedMotionPreferred } from "@/lib/hooks";
import type { Dictionary } from "@/lib/i18n";

export function ManifestoSection({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionPreferred();
  const lines = useMemo(
    () => [dict.manifesto.line1, dict.manifesto.line2, dict.manifesto.line3],
    [dict.manifesto.line1, dict.manifesto.line2, dict.manifesto.line3],
  );

  useEffect(() => {
    if (reduced || !ref.current) return;
    registerGsap();
    const ctx = gsap.context(() => {
      const items = ref.current?.querySelectorAll("[data-manifesto-line]");
      gsap.fromTo(
        items || [],
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.18,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 0.6,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced, lines]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[90svh] items-center border-y border-white/10 bg-[#050505] py-32"
    >
      <div className="editorial-grid w-full">
        <div className="col-span-12 md:col-span-11">
          {lines.map((line, index) => (
            <div key={line} className="overflow-hidden">
              <p
                data-manifesto-line
                className="headline-section py-1 md:py-2"
              >
                {index === 2 ? (
                  <>
                    {line.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-accent">{line.split(" ").slice(-1)}</span>
                  </>
                ) : (
                  line
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
