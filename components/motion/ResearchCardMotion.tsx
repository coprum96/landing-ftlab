"use client";

import { useEffect, useRef } from "react";
import { gsap, ease } from "@/lib/animations";
import { motion } from "@/lib/motion";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Selector relative to root for the clipped image */
  imageSelector?: string;
  /** Selector for metadata row */
  metaSelector?: string;
  /** Selector for arrow */
  arrowSelector?: string;
};

/**
 * Premium research / project card hover:
 * subtle image scale, brighter border, micro meta shift, arrow nudge.
 * Optional cursor parallax on desktop (max ~5px).
 */
export function ResearchCardMotion({
  children,
  className,
  imageSelector = "[data-card-image]",
  metaSelector = "[data-card-meta]",
  arrowSelector = "[data-card-arrow]",
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const touch = useIsTouch();
  const reduced = useReducedMotionPreferred();
  const parallax = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const rafRef = useRef(0);
  const hovering = useRef(false);

  useEffect(() => {
    if (touch || reduced) return;

    const tick = () => {
      const root = rootRef.current;
      if (!root) return;
      const img = root.querySelector(imageSelector) as HTMLElement | null;
      const p = parallax.current;
      p.x += (p.tx - p.x) * 0.1;
      p.y += (p.ty - p.y) * 0.1;
      if (img && hovering.current) {
        const scale = motion.card.imageScale;
        img.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) scale(${scale})`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [imageSelector, reduced, touch]);

  const onEnter = () => {
    const root = rootRef.current;
    if (!root || touch || reduced) return;
    hovering.current = true;

    const img = root.querySelector(imageSelector) as HTMLElement | null;
    const meta = root.querySelector(metaSelector) as HTMLElement | null;
    const arrow = root.querySelector(arrowSelector) as HTMLElement | null;

    root.style.borderColor = motion.card.borderHover;

    if (img) {
      gsap.to(img, {
        scale: motion.card.imageScale,
        duration: motion.card.imageDuration,
        ease: ease.out,
        overwrite: "auto",
      });
    }
    if (meta) {
      gsap.to(meta, {
        y: -motion.card.metaMove,
        opacity: 1,
        duration: 0.5,
        ease: ease.out,
        overwrite: "auto",
      });
    }
    if (arrow) {
      gsap.to(arrow, {
        x: motion.card.arrowMove,
        duration: 0.35,
        ease: ease.out,
        overwrite: "auto",
      });
    }
  };

  const onLeave = () => {
    const root = rootRef.current;
    if (!root) return;
    hovering.current = false;
    parallax.current.tx = 0;
    parallax.current.ty = 0;

    const img = root.querySelector(imageSelector) as HTMLElement | null;
    const meta = root.querySelector(metaSelector) as HTMLElement | null;
    const arrow = root.querySelector(arrowSelector) as HTMLElement | null;

    root.style.borderColor = motion.card.borderDefault;

    if (img) {
      gsap.to(img, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.7,
        ease: ease.expo,
        overwrite: "auto",
      });
    }
    if (meta) {
      gsap.to(meta, { y: 0, duration: 0.6, ease: ease.expo, overwrite: "auto" });
    }
    if (arrow) {
      gsap.to(arrow, { x: 0, duration: 0.45, ease: ease.expo, overwrite: "auto" });
    }
  };

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (touch || reduced || !rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    parallax.current.tx = nx * motion.card.parallaxMax * 2;
    parallax.current.ty = ny * motion.card.parallaxMax * 2;
  };

  return (
    <div
      ref={rootRef}
      className={cx("transition-[border-color] duration-500", className)}
      style={{ borderColor: motion.card.borderDefault }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      {children}
    </div>
  );
}
