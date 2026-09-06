import { ChevronDown } from "lucide-react";
import { faq } from "@/lib/data";

export function Faq() {
  return (
    <section id="faq" className="container mt-24 scroll-mt-24" aria-labelledby="faq-title">
      <div className="rule grid gap-10 pt-8 md:grid-cols-12 md:pt-10">
        <div className="md:col-span-5 lg:col-span-4">
          <h2 id="faq-title" data-reveal className="text-display-md">Questions parents ask</h2>
        </div>
        <div data-reveal-group className="md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
          {faq.map((item) => (
            <details key={item.q} className="group border-b border-border first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-medium transition-colors duration-200 hover:text-accent [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-prose pb-6 leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
