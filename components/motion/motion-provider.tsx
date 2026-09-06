"use client";

import Lenis from "lenis";
import { usePathname, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ease, gsap, HEADER_OFFSET, onReady, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

/* Smooth inertia scrolling (Lenis) synced with GSAP ScrollTrigger, plus the site-wide reveal choreography:
   - [data-reveal]        one element fades up and un-blurs when it enters
   - [data-reveal-group]  direct children stagger in
   - [data-band]          a full-width band unmasks as it scrolls in (scrubbed)
   Anchor links scroll smoothly with a header offset. Everything is skipped under prefers-reduced-motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const params = useSearchParams();
  const lenisRef = useRef<Lenis | null>(null);

  // Lenis + ScrollTrigger sync
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, smoothWheel: true, anchors: false });
    lenisRef.current = instance;
    setLenis(instance);
    instance.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Smooth anchor navigation with header offset (also handles ?class=…#book-trial links)
  useEffect(() => {
    const scrollToHash = (hash: string, immediate = false) => {
      const target = hash ? document.querySelector<HTMLElement>(hash) : null;
      if (!target) return;
      if (lenisRef.current) lenisRef.current.scrollTo(target, { offset: -HEADER_OFFSET, duration: immediate ? 0 : 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
      else target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    };

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      if (url.search !== window.location.search) return; // let Next handle query changes; effect below scrolls
      e.preventDefault();
      history.pushState(null, "", url.hash);
      scrollToHash(url.hash);
    };
    document.addEventListener("click", onClick);

    // Scroll after query-param navigation or on first load with a hash (after the preloader)
    const cleanup = onReady(() => scrollToHash(window.location.hash, true));
    return () => {
      document.removeEventListener("click", onClick);
      cleanup();
    };
  }, [pathname, params]);

  // Reveal choreography
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    const cleanup = onReady(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 36,
            filter: "blur(10px)",
            duration: 1.1,
            ease: ease.reveal,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          gsap.from(group.children, {
            opacity: 0,
            y: 30,
            duration: 0.9,
            stagger: 0.09,
            ease: ease.out,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-band]").forEach((band) => {
          gsap.fromTo(
            band,
            { clipPath: "inset(8% 4% 8% 4% round 24px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: band, start: "top 90%", end: "top 25%", scrub: 0.6 } },
          );
        });
      });
      // Expanding <details> changes layout under pinned/scrubbed triggers
      document.addEventListener("toggle", () => ScrollTrigger.refresh(), true);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => {
      cleanup();
      ctx?.revert();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
