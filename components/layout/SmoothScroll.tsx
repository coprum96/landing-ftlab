"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotionPreferred } from "@/lib/hooks";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/animations";
import { setLenisInstance } from "@/lib/lenis";

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

  return <>{children}</>;
}
