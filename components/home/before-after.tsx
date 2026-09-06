"use client";

import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { transformation } from "@/lib/data";
import { gsap, onReady, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* Before / after joining. On phones a toggle switches between the two states; on desktop both columns
   show side by side. The 0 → 100% bar is scrubbed to scroll position. */
export function BeforeAfter() {
  const [view, setView] = useState<"before" | "after">("before");
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLElement>(null);

  // Progress is scrubbed to the scrollbar: it fills from 0 to 100% as the section moves through the viewport,
  // and the phone view flips to "after" past the halfway point. Reduced motion shows the finished state.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setProgress(100);
      setView("after");
      return;
    }
    let ctx: gsap.Context | undefined;
    const cleanup = onReady(() => {
      ctx = gsap.context(() => {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: 100,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 75%", end: "top 15%", scrub: 0.6 },
          onUpdate: () => {
            const v = Math.round(obj.v);
            setProgress(v);
            setView(v >= 50 ? "after" : "before");
          },
        });
        gsap.from(el.querySelectorAll("[data-ba-card]"), {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        });
      }, el);
    });
    return () => {
      cleanup();
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={ref} id="transformation" className="container mt-24 scroll-mt-24" aria-labelledby="transformation-title">
      <div className="rule pt-8 md:pt-10">
        <div data-reveal className="grid gap-6 md:grid-cols-12 md:items-start">
          <h2 id="transformation-title" className="text-display-md md:col-span-5">
            Before and after joining Leaders Academy
          </h2>
          <p className="max-w-prose text-lg leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7">
            The same student, a few months apart. This is the shift parents describe most often, and the one our
            weekly tests are designed to make visible.
          </p>
        </div>

        {/* 0 → 100% journey bar */}
        <div data-reveal className="mt-10">
          <div className="flex items-baseline justify-between text-sm font-semibold">
            <span>Joining</span>
            <span className="font-display text-2xl tabular-nums text-primary dark:text-foreground" aria-live="polite">{progress}%</span>
            <span>Exam ready</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Student progress from joining to exam ready">
            <div className="h-full rounded-full bg-gradient-to-r from-secondary to-accent transition-[width] duration-100 ease-linear" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="mt-8 grid grid-cols-2 gap-1 rounded-md border border-border bg-muted p-1 md:hidden" role="tablist" aria-label="Before or after joining">
          {(["before", "after"] as const).map((v) => (
            <button
              key={v}
              role="tab"
              type="button"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={cn(
                "h-11 cursor-pointer rounded font-semibold capitalize transition-colors duration-200",
                view === v ? "bg-card text-card-foreground shadow-sm" : "text-muted-foreground",
              )}
            >
              {v} joining
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:mt-10 md:grid-cols-2">
          {/* Before */}
          <div data-ba-card className={cn("rounded-lg border border-border bg-muted/50 p-6 md:block md:p-8", view === "before" ? "block" : "hidden")}>
            <h3 className="font-display text-2xl font-semibold text-muted-foreground">Before joining</h3>
            <ul className="mt-6 space-y-4">
              {transformation.map((t) => (
                <li key={t.before} className="flex gap-3 text-muted-foreground">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
                  <span>{t.before}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* After */}
          <div data-ba-card className={cn("rounded-lg border-2 border-accent bg-card p-6 text-card-foreground md:block md:p-8", view === "after" ? "block" : "hidden")}>
            <h3 className="font-display text-2xl font-semibold">After joining Leaders Academy</h3>
            <ul className="mt-6 space-y-4">
              {transformation.map((t) => (
                <li key={t.after} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Check className="h-3.5 w-3.5 text-accent-foreground" aria-hidden="true" />
                  </span>
                  <span className="font-medium">{t.after}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
