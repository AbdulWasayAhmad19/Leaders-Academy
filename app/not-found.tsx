import { ButtonLink } from "@/components/button";

export default function NotFound() {
  return (
    <section className="container py-24">
      <h1 className="text-display-lg">There&rsquo;s no page here.</h1>
      <p className="mt-4 max-w-prose text-lg text-muted-foreground">The link may be out of date. Everything is on the home page.</p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/#courses">See courses</ButtonLink>
        <ButtonLink href="/" variant="outline">Go home</ButtonLink>
      </div>
    </section>
  );
}
