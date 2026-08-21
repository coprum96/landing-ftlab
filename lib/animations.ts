import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export const ease = {
  out: "power3.out",
  expo: "expo.out",
  soft: "power2.out",
} as const;

export function fadeUp(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
) {
  return gsap.fromTo(
    targets,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: ease.out,
      ...vars,
    },
  );
}

export function killTriggers(scope?: Element | string) {
  ScrollTrigger.getAll().forEach((trigger) => {
    if (!scope) {
      trigger.kill();
      return;
    }
    const triggerEl = trigger.trigger;
    if (typeof scope === "string") {
      if (triggerEl instanceof Element && triggerEl.closest(scope)) {
        trigger.kill();
      }
      return;
    }
    if (triggerEl instanceof Element && (scope === triggerEl || scope.contains(triggerEl))) {
      trigger.kill();
    }
  });
}

export { gsap, ScrollTrigger };
