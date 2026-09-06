import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { icons } from "@/components/icons";
import { Rating } from "@/components/rating";
import { features } from "@/lib/data";
import { site } from "@/lib/site";

/* Why choose us: nine promise cards with gold icon tiles that lift on hover, closed by an offer card. */
export function Features() {
  return (
    <section id="why" className="container mt-24 scroll-mt-24" aria-labelledby="why-title">
      <div className="rule pt-8 md:pt-10">
        <div data-reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="text-sm font-bold text-secondary">Trusted by families for {site.experienceYears}+ years</p>
            <h2 id="why-title" className="mt-2 text-display-lg">
              Why parents choose <span className="text-secondary">Leaders Academy</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:text-right">
            <p className="max-w-prose text-lg leading-relaxed text-muted-foreground md:ml-auto">
              Every student gets all nine of these, whether the class is at your home or online.
            </p>
            <Rating className="mt-3" />
          </div>
        </div>

        <ul data-reveal-group className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <li
                key={f.title}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 text-card-foreground transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/70 hover:shadow-[0_18px_40px_-20px_rgba(11,31,58,0.35)] dark:hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] md:p-7"
              >
                <span className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/10 transition-transform duration-500 ease-out group-hover:scale-[1.8]" aria-hidden="true" />
                <div className="relative flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-[#9C7A2A] text-accent-foreground shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-semibold tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="relative mt-5 font-display text-xl font-semibold">{f.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </li>
            );
          })}
        </ul>

        <div data-reveal className="mt-6 grid gap-6 rounded-xl bg-gradient-to-r from-primary to-secondary p-6 text-primary-foreground md:grid-cols-12 md:items-center md:p-8">
          <div className="md:col-span-8">
            <p className="font-display text-2xl font-semibold md:text-3xl">See it for yourself: the first class is free.</p>
            <p className="mt-2 text-primary-foreground/80">Then 25% off when you enrol. No forms to print, no waiting — one WhatsApp message.</p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              href="#book-trial"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-cta px-6 text-base font-semibold text-cta-foreground transition-[transform,background-color] duration-200 hover:bg-cta/90 active:scale-[0.97]"
            >
              Book your free trial
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
