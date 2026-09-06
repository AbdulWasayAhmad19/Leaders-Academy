import { promises } from "@/lib/data";

export function Promises() {
  return (
    <section className="container" aria-label="What every family gets">
      <ul className="grid grid-cols-1 gap-y-6 border-y border-border py-8 sm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-border md:py-9">
        {promises.map((p) => (
          <li key={p.title} className="md:px-6 md:first:pl-0 md:last:pr-0">
            <p className="font-display text-xl font-semibold">{p.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
