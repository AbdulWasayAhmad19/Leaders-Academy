# Leaders Academy — website

Next.js 15 (App Router) + TypeScript + Tailwind CSS 3. Light theme by default with a dark theme toggle.
Design direction generated with the UI UX Pro Max skill (Minimalism & Swiss pattern) with the palette taken from the Leaders Academy logo: navy `#0B2D5B`, blue `#175C8B`, gold `#C8A24A`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes are static)
npm run typecheck
```

Requires Node 18.18+ and internet access on first build (Google Fonts are fetched at build time via `next/font`).

## Structure (one page)

Everything lives on `/` and the nav scrolls to anchors:

| Anchor            | Section                                                                   |
|-------------------|---------------------------------------------------------------------------|
| `#home`           | Photo hero (9:16 image on phones, 16:9 on desktop), red "Book your trial now!" |
| —                 | Trust strip: 25+ years, 5.0★ Google rating, 13K+ students, 100% focus (count up from 0) |
| `#why`            | Why choose Leaders Academy: the 9 features from the flyer                 |
| `#book-trial`     | Free trial / inquiry: WhatsApp button + form that opens a pre-filled chat |
| `#transformation` | Before and after joining, with a 0 → 100% progress bar that animates on scroll |
| `#courses`        | Courses for all classes (expandable cards with "what we focus on")        |
| `#subjects`       | Subject tiles; tapping one adds it to the trial form                      |
| `#how`            | How it works (4 steps)                                                    |
| —                 | Parent reviews (placeholders — replace before launch)                     |
| `#faq`            | Questions parents ask                                                     |
| `#location`       | Logo, address, hours, WhatsApp and the embedded Google Map                |

A first-visit loader shows the logo and a 0 → 100% counter for about 1.4 s (`components/preloader.tsx`). It runs
once per browser session and is skipped for visitors who prefer reduced motion.



## Motion (GSAP + ScrollTrigger + Lenis)

`components/motion/motion-provider.tsx` starts Lenis smooth scrolling, syncs it with ScrollTrigger and runs the
site-wide choreography. Everything is skipped when the visitor prefers reduced motion.

| Where | What happens |
|-------|--------------|
| Preloader | Logo and 0 → 100% counter, once per session |
| Hero | Photo unmasks from a rounded inset while settling from a 1.18 zoom; headline reveals word by word; on scroll the photo parallaxes and the copy lifts, blurs and fades (scrubbed) |
| Trust strip | Figures count up from 0 (25+, 5.0★, 13K+, 100%) when the strip enters |
| Any `[data-reveal]` | Fades up and un-blurs on entry; `[data-reveal-group]` staggers its children |
| Free-trial band `[data-band]` | Unmasks from an inset rounded rectangle to full bleed, scrubbed to scroll |
| Before / after | Progress bar is scrubbed 0 → 100% across the section; cards stagger in |
| Subjects | Desktop: section pins and the cards scroll horizontally with the scrollbar; phones: swipeable row |
| How it works | Title stays pinned (sticky) while each step slides into focus, scrubbed |
| Buttons | Hero CTAs and the floating WhatsApp button are magnetic on pointer devices |

Tune durations and easings in `lib/motion.ts` and the individual `components/motion/*` files. Add `data-reveal`
to any new block to include it in the choreography.

## Google Map and rating

`lib/site.ts` → `site.location` holds the exact pin (`lat`/`lng` from the Google Maps place page) used by the
embedded map, plus `mapsLink` for "Open in Google Maps". Fill `addressLines` to print the street address.
`site.rating` drives every 5-star display (hero, Why choose us, reviews, location) and links to the place page.

## WhatsApp chat widget

`components/whatsapp-float.tsx` is the floating button bottom-left on every page. Tapping it opens a chat panel
(greeting, four quick replies, a message box). Every action opens WhatsApp with the text pre-filled; edit the
quick replies at the top of that file.

## How the form works (no backend needed)

The form composes a WhatsApp message from the selected class, subjects, mode, name and notes and opens
`https://wa.me/923334994127?text=...`. Nothing is sent until the parent presses send. `?class=<slug>` and
`?subject=<slug>` in the URL pre-fill it (that is how the course and subject tiles work).

## Where things live

```
app/                 layout, page, fonts, global tokens (globals.css), icon.png (favicon from the logo)
components/          header, footer, logo, WhatsApp button + floating button, trial form, preloader, theme toggle
components/home/     one file per section
lib/data.ts          ALL content: classes, subjects, features, steps, promises, transformation, trust, reviews, FAQ
lib/site.ts          name, tagline, WhatsApp number, experience years, nav, location
public/              logo-full.png, logo-mark.png (transparent), hero-desktop.jpg, hero-mobile.jpg
```

## Theming

Semantic CSS variables in `app/globals.css` (`:root` light, `.dark` dark) exposed to Tailwind as `bg-primary`,
`text-accent` (gold), `bg-cta` (red buttons), `bg-whatsapp`, etc. Light is the default; the toggle uses `next-themes`.
Fonts: Outfit (headings) and Nunito Sans (body) via `next/font/google`.
