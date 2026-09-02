"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotionPreferred } from "@/lib/hooks";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/animations";
import { getLenisInstance, setLenisInstance } from "@/lib/lenis";

function scrollToHash(hash: string, instant = false) {
  const id = hash.replace(/^#/, "");
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;

  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const top = el.getBoundingClientRect().top + window.scrollY - margin;
  const lenis = getLenisInstance();

  if (lenis) {
    lenis.scrollTo(top, { duration: instant ? 0 : 1.05 });
  } else {
    window.scrollTo({
      top,
      behavior: instant ? "auto" : "smooth",
    });
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotionPreferred();

  useEffect(() => {
    registerGsap();
    if (reduced) {
      setLenisInstance(null);
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    setLenisInstance(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      setLenisInstance(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, [reduced]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      event.preventDefault();
      history.pushState(null, "", href);
      scrollToHash(href, reduced);
    };

    const onHash = () => {
      if (window.location.hash) scrollToHash(window.location.hash, true);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    if (window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash, true));
    }

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
  }, [reduced]);

  return <>{children}</>;
}
