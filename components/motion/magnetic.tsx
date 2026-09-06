"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

/* Magnetic hover: the element leans toward the pointer and springs back. Pointer devices only. */
export function Magnetic({ children, strength = 0.25, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={className ?? "inline-flex"}>
      {children}
    </span>
  );
}
