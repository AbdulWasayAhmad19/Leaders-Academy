export const site = {
  name: "Leaders Academy",
  tagline: "Empower. Enlighten. Excel.",
  taglineLine: "Learn Better • Score Better • Succeed Better",
  motto: "Building bright futures through concepts",
  description:
    "Leaders Academy provides home and online tutors for all classes, from Primary to Matric, O-Level, F.Sc and A-Level. Concept-based teaching, weekly tests, past-paper practice and regular parent feedback. Book a free trial class.",
  url: "https://leadersacademy.example",
  // WhatsApp number as shown on the flyer, plus the international form used for links.
  whatsappDisplay: "0333 4994127",
  whatsappIntl: "923334994127",
  offer: "Free trial class + 25% off",
  experienceYears: 25,
  nav: [
    { href: "#why", label: "Why us" },
    { href: "#book-trial", label: "Free trial" },
    { href: "#courses", label: "Courses" },
    { href: "#how", label: "How it works" },
    { href: "#faq", label: "FAQ" },
    { href: "#location", label: "Location" },
  ],
  rating: { value: "5.0", stars: 5, source: "Google" },
  location: {
    // Google Maps place page for Leaders Academy.
    mapsLink:
      "https://www.google.com/maps/place/Leaders+Academy/@31.3837694,74.0427759,12z/data=!4m10!1m2!2m1!1sLeaders+Academy!3m6!1s0x3918ff5887b35695:0x93d65694a29e2849!8m2!3d31.3836275!4d74.1952115!15sCg9MZWFkZXJzIEFjYWRlbXmSARdlZHVjYXRpb25hbF9pbnN0aXR1dGlvbuABAA!16s%2Fg%2F11nvfp5ry7",
    // Exact pin from the place page.
    lat: 31.3836275,
    lng: 74.1952115,
    addressLines: [] as string[],
    hours: "Monday to Saturday, 9:00 am to 9:00 pm",
  },
};

/** Build a WhatsApp deep link with an optional pre-filled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappIntl}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
