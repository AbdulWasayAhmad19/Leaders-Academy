export type ClassLevel = {
  slug: string;
  name: string;
  detail?: string;
  description: string;
  focus: string[];
};

/* Classes exactly as listed on the flyer. */
export const classes: ClassLevel[] = [
  {
    slug: "primary",
    name: "Primary",
    detail: "Classes 1–5",
    description: "Strong reading, writing and number sense, taught patiently so early gaps never become later problems.",
    focus: ["English reading and writing", "Mathematics basics", "Science and general knowledge", "Homework support and study habits"],
  },
  {
    slug: "middle",
    name: "Middle",
    detail: "Classes 6–8",
    description: "The years when concepts get abstract. We keep pace with school and make sure every topic is understood, not memorised.",
    focus: ["Mathematics and Science", "English grammar and composition", "Computer basics", "Exam-style practice tests"],
  },
  {
    slug: "matric",
    name: "Matric",
    detail: "9th & 10th",
    description: "Board-exam preparation with past papers, paper-pattern practice and regular tests, so marks reflect real understanding.",
    focus: ["Physics, Chemistry, Biology", "Mathematics", "English and Computer Science", "Past papers and board paper technique"],
  },
  {
    slug: "o-level",
    name: "O-Level",
    detail: "IGCSE / Cambridge",
    description: "Cambridge syllabus coverage with topical past papers, marking-scheme awareness and timed practice.",
    focus: ["Mathematics and Add Maths", "Physics, Chemistry, Biology", "English Language", "Computer Science"],
  },
  {
    slug: "fsc",
    name: "F.Sc",
    detail: "Pre-Medical / Pre-Engineering",
    description: "Intermediate science with a clear line to entry tests. Concept depth first, then speed and accuracy.",
    focus: ["Physics and Chemistry", "Biology (Pre-Med)", "Mathematics (Pre-Eng)", "Entry-test oriented MCQ practice"],
  },
  {
    slug: "a-level",
    name: "A-Level",
    detail: "AS & A2",
    description: "Subject specialists for AS and A2, with structured past-paper work and feedback on written answers.",
    focus: ["Mathematics and Further Maths", "Physics, Chemistry, Biology", "Computer Science", "Exam technique and revision plans"],
  },
  {
    slug: "online",
    name: "Online classes",
    detail: "Any class, anywhere",
    description: "Live one-to-one sessions over video with a shared whiteboard. Same tutors, same tests, same parent feedback.",
    focus: ["Live 1:1 sessions", "Digital whiteboard and shared notes", "Recorded summaries on request", "Flexible timings"],
  },
  {
    slug: "other",
    name: "All other classes",
    detail: "Ask us",
    description: "Preparing for something not listed here? Tell us the syllabus and we will match you with the right tutor.",
    focus: ["Entry tests and admissions", "Language and spoken English", "Special syllabi and homeschooling", "Short-term exam crash courses"],
  },
];

export type Subject = { slug: string; name: string; blurb: string; icon: "calculator" | "atom" | "flask" | "dna" | "code" | "book" | "microscope" };

/* Subjects exactly as listed on the flyer. */
export const subjects: Subject[] = [
  { slug: "mathematics", name: "Mathematics", blurb: "From number sense to calculus. Method first, then speed.", icon: "calculator" },
  { slug: "physics", name: "Physics", blurb: "Concepts you can picture, numericals you can finish in time.", icon: "atom" },
  { slug: "chemistry", name: "Chemistry", blurb: "Reactions, equations and the why behind every rule.", icon: "flask" },
  { slug: "biology", name: "Biology", blurb: "Diagrams, terminology and structured long answers.", icon: "dna" },
  { slug: "computer-science", name: "Computer Science", blurb: "Programming, theory and paper technique for O/A-Level.", icon: "code" },
  { slug: "english", name: "English", blurb: "Grammar, comprehension and writing that scores.", icon: "book" },
  { slug: "science", name: "Science", blurb: "Primary and middle school science, taught with curiosity.", icon: "microscope" },
];

export type Feature = {
  title: string;
  body: string;
  icon: "lightbulb" | "target" | "clipboard" | "file" | "trending" | "message" | "trophy" | "laptop" | "gift";
};

/* "Our features" from the flyer, expanded into one sentence each. */
export const features: Feature[] = [
  { icon: "lightbulb", title: "Concepts, not memorization", body: "Students learn why an answer is right, so they can handle questions they have never seen before." },
  { icon: "target", title: "Personalized teaching", body: "Every plan starts at the student's actual level and moves at their pace, not the class average." },
  { icon: "clipboard", title: "Weekly tests and assessments", body: "A short test every week shows what has stuck and what needs another pass." },
  { icon: "file", title: "Past papers and exam techniques", body: "Board and Cambridge past papers, marking schemes and time management for exam day." },
  { icon: "trending", title: "Weak-area improvement", body: "Test results point to the exact topics to work on; we fix those first." },
  { icon: "message", title: "Regular parent feedback", body: "You hear from the tutor regularly about progress, attendance and what to expect next." },
  { icon: "trophy", title: "Result-oriented preparation", body: "Everything is planned backwards from the exam date and the grade the student is aiming for." },
  { icon: "laptop", title: "Online and physical classes", body: "Tutoring at your home or live online, or a mix of both when schedules change." },
  { icon: "gift", title: "Free trial + 25% off", body: "Try a full class before committing. Enrol afterwards and get 25% off." },
];

/* A genuine sequence: this is how a family goes from first message to regular classes. */
export const steps = [
  {
    title: "Message us on WhatsApp",
    body: "Tell us the class, subjects and whether you want home or online tutoring. We reply the same day.",
  },
  {
    title: "Take a free trial class",
    body: "The tutor teaches a real lesson and gauges where the student stands. No charge, no obligation.",
  },
  {
    title: "Agree a plan and timetable",
    body: "Days, timings, subjects and goals for the term, written down so everyone knows what to expect.",
  },
  {
    title: "Weekly tests, regular feedback",
    body: "Short tests each week and regular updates to parents keep progress visible from the first month.",
  },
];

/* Four promises that need no numbers. */
export const promises = [
  { title: "Free trial class", body: "See the teaching before you pay anything." },
  { title: "25% off on enrolment", body: "Applied when you continue after the trial." },
  { title: "Home or online", body: "Your doorstep or a live video session." },
  { title: "Parent feedback", body: "Regular updates you don't have to chase." },
];

/* SAMPLE reviews for layout only. Replace with real parent feedback before launch. */
export const reviews = [
  {
    quote: "My son used to memorise formulas the night before a test. Now he explains them to me. His maths marks went up two grades in one term.",
    name: "Parent of a Class 9 student",
    context: "Mathematics, home tutoring",
  },
  {
    quote: "The weekly test and the message afterwards are what I value most. I always know exactly where my daughter stands.",
    name: "Parent of an O-Level student",
    context: "Chemistry and Physics, online",
  },
  {
    quote: "We started with the free trial expecting to compare a few academies. We didn't need to.",
    name: "Parent of a Class 6 student",
    context: "English and Science, home tutoring",
  },
];

export const faq = [
  {
    q: "How does the free trial work?",
    a: "Message us on WhatsApp with the class and subjects. We arrange a full-length trial lesson, at home or online, at no cost. If you continue, the 25% discount is applied to your enrolment.",
  },
  {
    q: "Do you cover my child's syllabus?",
    a: "We teach Primary to Class 8, Matric (9th and 10th), O-Level and IGCSE, F.Sc Pre-Medical and Pre-Engineering, and A-Level. For anything else, send us the syllabus and we will confirm within a day.",
  },
  {
    q: "What does an online class look like?",
    a: "A live one-to-one video session with a shared digital whiteboard. The tutor can see the student's work as they do it, and notes are shared afterwards.",
  },
  {
    q: "How often will I hear from the tutor?",
    a: "After every weekly test at minimum, plus whenever something needs your attention. You can also message the tutor or the academy directly on WhatsApp at any time.",
  },
  {
    q: "Can we change tutors or timings later?",
    a: "Yes. If the fit isn't right or your schedule changes, tell us and we will adjust the plan or match a different tutor without extra charges.",
  },
];

/* Before / after joining: the change parents describe most often. Paired so the two columns line up. */
export const transformation = [
  { before: "Memorises formulas the night before a test", after: "Explains the concept and solves unseen questions" },
  { before: "Same lesson for every student", after: "A plan built around your child's actual level" },
  { before: "Marks are a surprise on report day", after: "Weekly tests show progress every week" },
  { before: "Past papers seen for the first time in the exam hall", after: "Paper pattern and timing practised in advance" },
  { before: "Parents hear only when something goes wrong", after: "Regular updates from the tutor, good news included" },
  { before: "Studying alone, stuck on the same topics", after: "Weak areas identified and fixed first" },
];

/* Trust figures. `count` drives the 0 → value animation; `decimals` for the rating. */
export const trust = [
  { value: "25+", count: 25, suffix: "+", label: "Years of experience" },
  { value: "5.0★", count: 5, suffix: "★", decimals: 1, label: "Google rating" },
  { value: "13K+", count: 13, suffix: "K+", label: "Students taught" },
  { value: "100%", count: 100, suffix: "%", label: "Focus on student success" },
];
