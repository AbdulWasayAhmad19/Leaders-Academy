"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { trust } from "@/lib/data";

/* Each figure counts up from 0 to its value the first time the strip scrolls into view. */
export function Trust() {
  const ref = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        const decimals = Number(el.dataset.decimals ?? 0);
        const obj = { v: 0 };
        el.textContent = `${(0).toFixed(decimals)}${suffix}`;
        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = `${obj.v.toFixed(decimals)}${suffix}`;
          },
        });
      });
      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="container" aria-label="Leaders Academy at a glance">
      <dl ref={ref} data-reveal-group className="grid grid-cols-2 gap-y-8 border-b border-border py-8 md:grid-cols-4 md:divide-x md:divide-border md:py-10">
        {trust.map((t) => (
          <div key={t.label} className="md:px-6 md:first:pl-0 md:last:pr-0">
            <dd className="font-display text-display-md font-bold tabular-nums text-primary dark:text-foreground">
              <span data-count={t.count} data-suffix={t.suffix} data-decimals={t.decimals ?? 0} aria-label={t.value}>
                {t.value}
              </span>
            </dd>
            <dt className="mt-1 text-sm text-muted-foreground">{t.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
