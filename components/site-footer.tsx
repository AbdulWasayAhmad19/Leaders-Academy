import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { classes } from "@/lib/data";
import { site, whatsappLink } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div data-reveal className="container grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          {/* Full logo sits on a white tile so the navy wordmark stays legible in dark mode. */}
          <div className="inline-block rounded-lg bg-white p-3">
            <Image src="/logo-full.png" alt="Leaders Academy — Empower. Enlighten. Excel." width={384} height={446} className="h-28 w-auto" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Home and online tutors for all classes, backed by {site.experienceYears}+ years of teaching experience. {site.motto}.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 md:col-span-7">
          <div>
            <h3 className="font-sans text-sm font-bold">Courses</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {classes.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`#${c.slug}`} className="rounded-sm transition-colors duration-200 hover:text-foreground">
                    {c.name}{c.detail ? ` (${c.detail})` : ""}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-sm font-bold">Academy</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="#subjects" className="rounded-sm transition-colors duration-200 hover:text-foreground">Subjects</Link></li>
              <li><Link href="#why" className="rounded-sm transition-colors duration-200 hover:text-foreground">Why choose us</Link></li>
              <li><Link href="#location" className="rounded-sm transition-colors duration-200 hover:text-foreground">Find us</Link></li>
              <li><Link href="#how" className="rounded-sm transition-colors duration-200 hover:text-foreground">How it works</Link></li>
              <li><Link href="#book-trial" className="rounded-sm transition-colors duration-200 hover:text-foreground">Book a free trial</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-sm font-bold">Contact</h3>
            <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm font-semibold text-foreground transition-colors duration-200 hover:text-accent"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp {site.whatsappDisplay}
                </a>
              </li>
              <li>Home tutoring at your doorstep, or live online classes anywhere.</li>
              <li>Replies the same day, seven days a week.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.name}. {site.tagline}</p>
          <p>{site.taglineLine}</p>
        </div>
      </div>
    </footer>
  );
}
