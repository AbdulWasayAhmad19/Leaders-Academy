"use client";

import { useEffect } from "react";
import { gsap, onReady, prefersReducedMotion } from "@/lib/motion";

/* Pinned storytelling: the title stays put (CSS sticky) while each step slides into focus as it crosses
   the middle of the screen — scrubbed, so scrolling back rewinds it. */
export function StepsMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    const cleanup = onReady(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("#how [data-step]").forEach((li) => {
          gsap.fromTo(
            li,
            { opacity: 0.2, x: 40 },
            { opacity: 1, x: 0, ease: "none", scrollTrigger: { trigger: li, start: "top 80%", end: "top 50%", scrub: 0.5 } },
          );
        });
      });
    });
    return () => {
      cleanup();
      ctx?.revert();
    };
  }, []);
  return null;
}
