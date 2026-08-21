import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenisInstance() {
  return lenisInstance;
}

export function scrollToTopInstant() {
  const lenis = lenisInstance;
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
    return;
  }
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0);
  }
}
