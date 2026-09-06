import { Suspense } from "react";
import { TrialForm } from "@/components/trial-form";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { promises } from "@/lib/data";
import { site } from "@/lib/site";

/* The conversion section: free trial request or a general inquiry, both ending in WhatsApp. */
export function Inquiry() {
  return (
    <section id="book-trial" data-band className="scroll-mt-24 bg-primary text-primary-foreground" aria-labelledby="inquiry-title">
      <div className="container grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div data-reveal className="lg:col-span-5">
          <p className="inline-flex rounded-md bg-accent px-3 py-1.5 text-sm font-bold text-accent-foreground">{site.offer}</p>
          <h2 id="inquiry-title" className="mt-5 text-display-lg">Book a free trial or ask us anything</h2>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-primary-foreground/80">
            Fill in the form and we open a WhatsApp chat with everything ready to send, or message us directly. Either
            way you hear back the same day.
          </p>
          <WhatsAppButton size="lg" className="mt-7" message="Hello Leaders Academy, I have an inquiry about tutoring.">
            Inquire on WhatsApp {site.whatsappDisplay}
          </WhatsAppButton>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {promises.map((p) => (
              <li key={p.title} className="border-t border-primary-foreground/20 pt-3">
                <p className="font-display text-lg font-semibold">{p.title}</p>
                <p className="mt-0.5 text-sm text-primary-foreground/75">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-lg border border-border bg-card p-6 text-card-foreground md:p-8">
            <h3 className="text-display-sm">Free trial request</h3>
            <p className="mt-1 text-sm text-muted-foreground">Takes thirty seconds. Submit opens WhatsApp.</p>
            <div className="mt-6">
              <Suspense fallback={<div className="h-96 animate-pulse rounded-md bg-muted" aria-hidden="true" />}>
                <TrialForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
