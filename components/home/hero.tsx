import { getImageProps } from "next/image";
import { ButtonLink } from "@/components/button";
import { HeroMotion } from "@/components/motion/hero-motion";
import { Magnetic } from "@/components/motion/magnetic";
import { Rating } from "@/components/rating";
import { site } from "@/lib/site";

/* Art-directed background: 9:16 image on phones, 16:9 on larger screens. */
function HeroPicture() {
  const common = { alt: "", priority: true, sizes: "100vw" };
  const { props: desktop } = getImageProps({ ...common, width: 1920, height: 1047, src: "/hero-desktop.jpg" });
  const { props: mobile } = getImageProps({ ...common, width: 1080, height: 1935, src: "/hero-mobile.jpg" });
  return (
    <div data-hero-picture className="absolute inset-0 will-change-transform">
      <picture>
        <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes={desktop.sizes} />
        <source srcSet={mobile.srcSet} sizes={mobile.sizes} />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img {...mobile} className="absolute inset-0 h-full w-full object-cover object-center" />
      </picture>
      {/* Overlay lives inside the masked layer so it reveals together with the photo. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/95 via-[#0B1F3A]/60 to-[#0B1F3A]/10 md:bg-gradient-to-r md:from-[#0B1F3A]/85 md:via-[#0B1F3A]/55 md:to-[#0B1F3A]/10"
        aria-hidden="true"
      />
    </div>
  );
}

/* Each word in its own clipped box so it can rise into view. */
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span data-word className="inline-block">{w}&nbsp;</span>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative isolate min-h-[85svh] overflow-hidden text-white md:min-h-[640px] lg:min-h-[720px]" aria-labelledby="hero-title">
      <HeroMotion />
      <HeroPicture />

      <div className="container relative flex min-h-[85svh] flex-col justify-end pb-14 pt-24 md:min-h-[640px] md:justify-center md:py-24 lg:min-h-[720px]">
        <div data-hero-content className="max-w-3xl">
          <h1 id="hero-title" className="text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-display-xl">
            <Words text="Home & online tutor available for all classes" />
          </h1>
          <div data-hero-rest>
            <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-accent px-3 py-1.5 text-sm font-bold text-accent-foreground">{site.offer}</p>
            <p className="mt-4 font-display text-xl font-semibold leading-tight sm:text-2xl md:mt-5 md:text-4xl">
              Premium education at your doorstep or online!
            </p>
            <p className="mt-2 text-base text-white/85 sm:text-lg md:mt-3 md:text-2xl">{site.motto}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Magnetic className="inline-flex w-full sm:w-auto">
                <ButtonLink href="#book-trial" size="lg" variant="cta" className="w-full text-lg sm:w-auto">
                  Book your trial now!
                </ButtonLink>
              </Magnetic>
              <Magnetic className="inline-flex w-full sm:w-auto">
                <ButtonLink href="#courses" size="lg" variant="white" className="w-full text-lg sm:w-auto">
                  Explore courses
                </ButtonLink>
              </Magnetic>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-white/80">
              <Rating tone="onDark" />
              <span>{site.experienceYears}+ years of experience</span>
              <span>13K+ students taught</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
