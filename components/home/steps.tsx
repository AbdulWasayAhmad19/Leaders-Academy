import { StepsMotion } from "@/components/motion/steps-motion";
import { steps } from "@/lib/data";

export function Steps() {
  return (
    <section id="how" className="container mt-24 scroll-mt-24" aria-labelledby="how-title">
      <StepsMotion />
      <div className="rule grid gap-10 pt-8 md:grid-cols-12 md:pt-10">
        <div className="md:col-span-5 lg:col-span-4">
          <div data-reveal className="md:sticky md:top-28">
            <h2 id="how-title" className="text-display-md">How it works</h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted-foreground">From your first message to regular classes in under a week.</p>
          </div>
        </div>
        <ol className="overflow-x-clip md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
          {steps.map((s, i) => (
            <li key={s.title} data-step className="grid grid-cols-[3rem_1fr] gap-4 border-t border-border py-7 first:border-t-0 first:pt-0 md:grid-cols-[4rem_1fr]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-lg font-semibold text-primary-foreground" aria-hidden="true">{i + 1}</span>
              <div>
                <h3 className="text-display-sm">{s.title}</h3>
                <p className="mt-2 max-w-prose leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
