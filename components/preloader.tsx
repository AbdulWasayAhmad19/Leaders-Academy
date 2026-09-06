"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* First-visit loader: logo and a 0 → 100% counter, then fades away. Shows once per browser session,
   skipped entirely when the visitor prefers reduced motion. */
export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<"hidden" | "running" | "leaving">("hidden");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ready = () => {
      document.documentElement.dataset.laReady = "1";
      window.dispatchEvent(new Event("la:ready"));
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem("la-loaded")) {
      ready();
      return;
    }
    sessionStorage.setItem("la-loaded", "1");
    setState("running");
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1400;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else {
        setState("leaving");
        setTimeout(() => {
          setState("hidden");
          document.body.style.overflow = "";
          ready();
        }, 450);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, []);

  if (state === "hidden") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading Leaders Academy, ${progress} percent`}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-[450ms] ${state === "leaving" ? "opacity-0" : "opacity-100"}`}
    >
      <Image src="/logo-full.png" alt="" width={384} height={446} priority className="h-40 w-auto md:h-52" />
      <p className="mt-8 font-display text-5xl font-bold tabular-nums text-primary dark:text-foreground md:text-6xl">{progress}%</p>
      <div className="mt-4 h-1.5 w-56 overflow-hidden rounded-full bg-muted" aria-hidden="true">
        <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-4 text-sm font-semibold text-muted-foreground">Empower. Enlighten. Excel.</p>
    </div>
  );
}
