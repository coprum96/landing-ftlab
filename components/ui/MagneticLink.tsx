"use client";

import { useRef } from "react";
import { gsap, ease } from "@/lib/animations";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export function MagneticLink({
  children,
  className,
  strength = 0.25,
  type = "button",
  onClick,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const touch = useIsTouch();
  const reduced = useReducedMotionPreferred();

  const onMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (touch || reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.45,
      ease: ease.out,
    });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: ease.expo });
  };

  return (
    <button
      ref={ref}
      type={type}
      className={cx("group inline-flex", className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
