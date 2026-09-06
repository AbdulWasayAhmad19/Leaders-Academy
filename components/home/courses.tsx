import { Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { classes } from "@/lib/data";

export function Courses() {
  return (
    <section id="courses" className="container mt-24 scroll-mt-24" aria-labelledby="courses-title">
      <SectionHeading
        id="courses-title"
        title="Courses for all classes"
        lede="From the first years of school to A-Level exams. Open a class to see what we focus on, then book a trial in it."
      />
      <ul data-reveal-group className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {classes.map((c) => (
          <li key={c.slug} id={c.slug} className="scroll-mt-24">
            <details className="group h-full rounded-lg border border-border bg-card text-card-foreground open:border-secondary">
              <summary className="flex cursor-pointer list-none flex-col gap-1 p-6 [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-3">
                  <span className="text-sm font-semibold text-secondary">{c.detail}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                </span>
                <span className="font-display text-2xl font-semibold">{c.name}</span>
                <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</span>
              </summary>
              <div className="border-t border-border px-6 pb-6 pt-5">
                <p className="text-sm font-bold">What we focus on</p>
                <ul className="mt-3 space-y-2">
                  {c.focus.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm leading-relaxed">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/?class=${c.slug}#book-trial`}
                  className="mt-5 inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-md bg-cta px-4 text-sm font-semibold text-cta-foreground transition-colors duration-200 hover:bg-cta/90"
                >
                  Book a free {c.name} trial
                </Link>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
