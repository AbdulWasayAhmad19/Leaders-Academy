"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { icons } from "@/components/icons";
import { subjects } from "@/lib/data";
import { gsap, onReady, ScrollTrigger } from "@/lib/motion";

/* Horizontal scroll section. On desktop the section pins while the row of subject cards travels sideways,
   driven by the scrollbar. On phones it is a plain swipeable row with scroll snapping. */
export function Subjects() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;
    let mm: gsap.MatchMedia | undefined;
    const cleanup = onReady(() => {
      mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => tr.scrollWidth - sec.clientWidth + 2 * 40;
        const tween = gsap.to(tr, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            pin: true,
            scrub: 0.8,
            start: "top 96px",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        // Cards drift in with a slight scale as they enter from the right.
        gsap.utils.toArray<HTMLElement>(tr.children).forEach((card) => {
          gsap.fromTo(
            card,
            { scale: 0.92, opacity: 0.6 },
            {
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 95%", end: "left 60%", scrub: true },
            },
          );
        });
        ScrollTrigger.refresh();
      });
    });
    return () => {
      cleanup();
      mm?.revert();
    };
  }, []);

  return (
    <section ref={section} id="subjects" className="mt-24 scroll-mt-24 overflow-hidden py-2" aria-labelledby="subjects-title">
      <div className="container">
        <div data-reveal className="rule grid gap-6 pt-8 md:grid-cols-12 md:items-start md:pt-10">
          <h2 id="subjects-title" className="text-display-md md:col-span-5">Subjects we teach</h2>
          <p className="max-w-prose text-lg leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7">
            One tutor per subject, chosen for that class level. Tap a subject to add it to your trial request.
          </p>
        </div>
      </div>
      <ul
        ref={track}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:px-8 lg:snap-none lg:overflow-visible lg:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] [&::-webkit-scrollbar]:hidden"
        aria-label="Subjects"
      >
        {subjects.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <li key={s.slug} className="w-[78vw] shrink-0 snap-start sm:w-[360px] lg:w-[420px]">
              <Link
                href={`/?subject=${s.slug}#book-trial`}
                className="group flex h-full min-h-[260px] flex-col justify-between rounded-lg border border-border bg-card p-7 text-card-foreground transition-colors duration-250 hover:border-accent hover:bg-accent/5 lg:min-h-[300px]"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-md bg-primary text-primary-foreground transition-transform duration-250 group-hover:scale-105">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-semibold tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")} / {String(subjects.length).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-semibold">{s.name}</h3>
                  <p className="mt-2 text-muted-foreground">{s.blurb}</p>
                  <p className="mt-5 text-sm font-semibold text-secondary underline-offset-4 group-hover:underline">Add to trial request</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
