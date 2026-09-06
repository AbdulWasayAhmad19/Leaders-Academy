import { BeforeAfter } from "@/components/home/before-after";
import { Courses } from "@/components/home/courses";
import { Faq } from "@/components/home/faq";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { Inquiry } from "@/components/home/inquiry";
import { Location } from "@/components/home/location";
import { Reviews } from "@/components/home/reviews";
import { Steps } from "@/components/home/steps";
import { Subjects } from "@/components/home/subjects";
import { Trust } from "@/components/home/trust";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Trust />
      <Features />
      <div className="mt-24">
        <Inquiry />
      </div>
      <BeforeAfter />
      <Courses />
      <Subjects />
      <Steps />
      <Reviews />
      <Faq />
      <Location />
    </>
  );
}
