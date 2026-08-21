"use client";

import { useEffect, useRef } from "react";
import { gsap, ease, registerGsap } from "@/lib/animations";
import { motion } from "@/lib/motion";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";

/**
 * Editorial hero entrance: masked line reveals → description → metadata.
 * Optional subtle cursor response on the headline group (desktop only).
 */
export function useHeroReveal(rootRef: React.RefObject<HTMLElement | null>) {
  const reduced = useReducedMotionPreferred();
  const touch = useIsTouch();
  const headlineRef = useRef<HTMLElement | null>(null);
  const lightRef = useRef<HTMLDivElement | null>(null);
  const cursor = useRef({ nx: 0, ny: 0, tx: 0, ty: 0 });

  useEffect(() => {
    if (!rootRef.current) return;
    registerGsap();

    if (reduced) {
      gsap.set(
        rootRef.current.querySelectorAll(
          "[data-hero-line], [data-hero-desc], [data-hero-meta]",
        ),
        { clearProps: "all", opacity: 1, y: 0, yPercent: 0 },
      );
      return;
    }

    const ctx = gsap.context(() => {
      const lines = rootRef.current!.querySelectorAll("[data-hero-line]");
      const desc = rootRef.current!.querySelectorAll("[data-hero-desc]");
      const meta = rootRef.current!.querySelectorAll("[data-hero-meta]");
      const m = motion.hero;

      gsap.fromTo(
        lines,
        { yPercent: 105, opacity: 0.85 },
        {
          yPercent: 0,
          opacity: 1,
          duration: m.lineDuration,
          stagger: m.lineStagger,
          ease: m.lineEase,
          delay: 0.08,
        },
      );

      gsap.fromTo(
        desc,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: m.descriptionDuration,
          ease: ease.out,
          delay: m.descriptionDelay,
        },
      );

      gsap.fromTo(
        meta,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: m.metaDuration,
          stagger: 0.06,
          ease: ease.soft,
          delay: m.metaDelay,
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reduced, rootRef]);

  useEffect(() => {
    if (reduced || touch || !rootRef.current) return;

    const root = rootRef.current;
    let raf = 0;
    let active = false;

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (
        event.clientY < rect.top ||
        event.clientY > rect.bottom ||
        event.clientX < rect.left ||
        event.clientX > rect.right
      ) {
        cursor.current.tx = 0;
        cursor.current.ty = 0;
        active = false;
        return;
      }
      active = true;
      cursor.current.tx =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;
      cursor.current.ty =
        ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const tick = () => {
      const c = cursor.current;
      c.nx += (c.tx - c.nx) * 0.08;
      c.ny += (c.ty - c.ny) * 0.08;

      const el = headlineRef.current;
      if (el) {
        const x = c.nx * motion.hero.cursorMaxX;
        const y = c.ny * motion.hero.cursorMaxY;
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      }

      if (lightRef.current && active) {
        const rect = root.getBoundingClientRect();
        const px = ((c.nx + 1) / 2) * rect.width;
        const py = ((c.ny + 1) / 2) * rect.height;
        lightRef.current.style.opacity = String(motion.hero.lightOpacity);
        lightRef.current.style.background = `radial-gradient(420px circle at ${px}px ${py}px, rgba(255,255,255,0.035), transparent 55%)`;
      } else if (lightRef.current) {
        lightRef.current.style.opacity = "0";
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced, rootRef, touch]);

  return { headlineRef, lightRef };
}
