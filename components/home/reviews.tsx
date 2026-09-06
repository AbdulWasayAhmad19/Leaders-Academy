import { Star } from "lucide-react";
import { Rating } from "@/components/rating";
import { SectionHeading } from "@/components/section-heading";
import { reviews } from "@/lib/data";

export function Reviews() {
  return (
    <section className="container mt-24" aria-labelledby="reviews-title">
      <SectionHeading id="reviews-title" title="What parents notice first" action={<Rating />} />
      <div data-reveal-group className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
        {reviews.map((r) => (
          <figure key={r.quote} className="flex flex-col border-t-2 border-accent pt-6">
            <div className="flex gap-0.5" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />)}
            </div>
            <blockquote className="mt-4 flex-1 font-display text-xl font-medium leading-snug md:text-2xl">
              <p>&ldquo;{r.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-bold">{r.name}</span>
              <span className="block text-muted-foreground">{r.context}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
