"use client";

import { useEffect } from "react";
import { ease, gsap, onReady, prefersReducedMotion } from "@/lib/motion";

/* Cinematic hero: the photo unmasks and settles from a slight zoom while the headline reveals word by word.
   On scroll the photo drifts (parallax) and the copy lifts, blurs and fades — scrubbed to the scrollbar. */
export function HeroMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    const cleanup = onReady(() => {
      ctx = gsap.context(() => {
        const picture = "#home [data-hero-picture]";
        const words = "#home [data-word]";
        const rest = "#home [data-hero-rest] > *";

        gsap.set("#home [data-hero-content]", { autoAlpha: 1 });
        const tl = gsap.timeline({ defaults: { ease: ease.reveal } });
        tl.fromTo(
          picture,
          { clipPath: "inset(12% 8% 12% 8% round 28px)", scale: 1.18, filter: "blur(6px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, filter: "blur(0px)", duration: 1.8, ease: "expo.inOut" },
        )
          .from(words, { yPercent: 115, duration: 1.1, stagger: 0.045 }, "-=1.0")
          .from(rest, { opacity: 0, y: 24, duration: 0.9, stagger: 0.1 }, "-=0.7");

        gsap
          .timeline({ scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true } })
          .to(picture, { yPercent: 18, scale: 1.06, ease: "none" }, 0)
          .to("#home [data-hero-content]", { y: -90, opacity: 0.15, filter: "blur(8px)", ease: "none" }, 0);
      });
    });
    return () => {
      cleanup();
      ctx?.revert();
    };
  }, []);
  return null;
}
