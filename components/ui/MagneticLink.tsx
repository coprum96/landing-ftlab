"use client";

import { useRef } from "react";
import { gsap, ease } from "@/lib/animations";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";

type Common = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

type ButtonProps = Common & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

type AnchorProps = Common & {
  href: string;
  type?: never;
  onClick?: never;
};

type Props = ButtonProps | AnchorProps;

export function MagneticLink({
  children,
  className,
  strength = 0.25,
  href,
  type = "button",
  onClick,
}: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const touch = useIsTouch();
  const reduced = useReducedMotionPreferred();

  const onMove = (event: React.MouseEvent<HTMLElement>) => {
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

  const shared = {
    className: cx("group inline-flex", className),
    onMouseMove: onMove,
    onMouseLeave: onLeave,
  };

  if (href) {
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} {...shared}>
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      {...shared}
    >
      {children}
    </button>
  );
}
