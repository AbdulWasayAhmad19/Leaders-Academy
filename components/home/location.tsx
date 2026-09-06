import Image from "next/image";
import { Clock, ExternalLink, MapPin, MessageCircle } from "lucide-react";
import { Rating } from "@/components/rating";
import { site, whatsappLink } from "@/lib/site";

export function Location() {
  const { location } = site;
  return (
    <section id="location" className="container mt-24 scroll-mt-24" aria-labelledby="location-title">
      <div className="rule grid gap-10 pt-8 md:grid-cols-12 md:pt-10">
        <div data-reveal className="md:col-span-5 lg:col-span-4">
          <Image src="/logo-full.png" alt="Leaders Academy — Empower. Enlighten. Excel." width={384} height={446} className="h-44 w-auto md:h-52" />
          <h2 id="location-title" className="mt-6 text-display-md">Find us</h2>
          <Rating className="mt-3" />
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted-foreground">
            Visit the academy, or skip the trip: home tutoring comes to you and online classes work from anywhere.
          </p>
          <dl className="mt-8 space-y-5 text-sm">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <dt className="font-bold">Address</dt>
                <dd className="mt-1 text-muted-foreground">
                  {location.addressLines.length > 0
                    ? location.addressLines.map((l) => <span key={l} className="block">{l}</span>)
                    : "Leaders Academy — see the map for directions."}
                </dd>
                <dd className="mt-2">
                  <a href={location.mapsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-sm font-semibold text-secondary underline-offset-4 hover:underline">
                    Open in Google Maps
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <dt className="font-bold">Hours</dt>
                <dd className="mt-1 text-muted-foreground">{location.hours}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <dt className="font-bold">WhatsApp</dt>
                <dd className="mt-1">
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="rounded-sm font-semibold text-secondary underline-offset-4 hover:underline">{site.whatsappDisplay}</a>
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div data-reveal className="md:col-span-7 md:col-start-6 lg:col-span-8 lg:col-start-5">
          <iframe
            title="Map showing the location of Leaders Academy"
            src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=16&hl=en&output=embed`}
            className="aspect-[4/3] w-full rounded-lg border border-border bg-muted md:aspect-[16/10] lg:h-full lg:min-h-[520px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
