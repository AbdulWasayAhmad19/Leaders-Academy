import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once, on the client only. Every motion component imports gsap from here.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const HEADER_OFFSET = 88;

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True once the first-visit preloader has finished (or was skipped). */
export function isReady() {
  return typeof document !== "undefined" && document.documentElement.dataset.laReady === "1";
}

/** Run `fn` when the page is ready for motion. Returns a cleanup that removes the listener. */
export function onReady(fn: () => void) {
  if (isReady()) {
    fn();
    return () => {};
  }
  window.addEventListener("la:ready", fn, { once: true });
  return () => window.removeEventListener("la:ready", fn);
}

/** Motion tokens: slow, intentional, one easing family. */
export const ease = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
  reveal: "power4.out",
} as const;
