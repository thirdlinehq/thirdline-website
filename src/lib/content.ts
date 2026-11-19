export type WaitlistRole = "founder" | "mentor";

export const marquee = [
  "Practical advice",
  "First-hand experience",
  "Specific challenges",
  "No generic playbooks",
  "Experience over titles",
  "Relevance over reach",
] as const;

export const markets = [
  "Founders in India",
  "Global → India",
  "India → GCC, UK",
] as const;

export const problemUsual = [
  "Scroll LinkedIn for a warm-ish intro",
  "Ask in a founder group chat and hope",
  "Read one more generic playbook",
] as const;

export const problemNeeded = [
  "Someone who has faced this exact challenge",
  "What worked, what didn’t, and why",
  "Advice for the decision in front of you, not in general",
] as const;

export const challenges = [
  {
    stage: "Starting out",
    question: "Is this idea worth pursuing? How do I validate it before investing too much?",
    tint: "butter" as const,
    icon: "bulb" as const,
    photo: "/photos/leah.jpg",
    name: "Leah K.",
    experience: "Validated 3 ideas before building",
    finds: "Someone who’s tested early ideas in your market and can tell you what signal actually matters — before you invest months.",
  },
  {
    stage: "Building your product",
    question: "What should our MVP include, and what can we leave out?",
    tint: "lavender" as const,
    icon: "sprout" as const,
    photo: "/photos/ken.jpg",
    name: "Ken A.",
    experience: "Shipped MVPs for 2 B2B products",
    finds: "Someone who’s cut scope the hard way — and can help you ship the smallest version that still learns something real.",
  },
  {
    stage: "Finding customers",
    question: "We’ve built the product. How do we get our first 100 customers?",
    tint: "peach" as const,
    icon: "target" as const,
    photo: "/photos/meera.jpg",
    name: "Meera S.",
    experience: "Got first 100 without paid ads",
    finds: "Someone who’s landed early customers in a similar stage and can share which channels actually moved, not theory.",
  },
  {
    stage: "Pricing",
    question: "How should we price our product for the Indian market?",
    tint: "sky" as const,
    icon: "book" as const,
    photo: "/photos/nora.jpg",
    name: "Nora V.",
    experience: "Priced SaaS for India — twice",
    finds: "Someone who’s priced for India before — what buyers pushed back on, what stuck, and how they’d set it today.",
  },
  {
    stage: "Growing your business",
    question: "Our current sales channel isn’t working. What should we try next?",
    tint: "lime" as const,
    icon: "group" as const,
    photo: "/photos/james.jpg",
    name: "James P.",
    experience: "Rebuilt a stalled sales channel",
    finds: "Someone who’s fixed a broken growth motion and can tell you what to stop, what to try next, and why.",
  },
  {
    stage: "Expanding into new markets",
    question: "We’re considering the GCC. What do we need to know before entering?",
    tint: "mist" as const,
    icon: "search" as const,
    photo: "/photos/omar.jpg",
    name: "Omar H.",
    experience: "Entered GCC from India",
    finds: "Someone who’s expanded India → GCC and can warn you about the decisions that look obvious until you’re in-market.",
  },
] as const;

export const advisors = [
  { photo: "/photos/meera.jpg", name: "Meera S.", role: "Priced SaaS for India" },
  { photo: "/photos/omar.jpg", name: "Omar H.", role: "Entered GCC from India" },
  { photo: "/photos/nora.jpg", name: "Nora V.", role: "First 100 customers" },
  { photo: "/photos/james.jpg", name: "James P.", role: "Rebuilt a sales channel" },
  { photo: "/photos/aisha.jpg", name: "Aisha M.", role: "Hired an early team" },
  { photo: "/photos/priya.jpg", name: "Daniel R.", role: "Closed enterprise deals" },
] as const;

export const howItWorks = [
  {
    step: 1,
    title: "Tell us what you’re working through",
    body: "Describe the specific business challenge, decision, or roadblock you need help with. Not sure where to start? Book a discovery call.",
  },
  {
    step: 2,
    title: "Find relevant, vetted experience",
    body: "We carefully review the experience and professional backgrounds of advisors on Thirdline, helping you connect with individuals who have genuine, relevant experience for the challenge you’re facing.",
  },
  {
    step: 3,
    title: "Get practical, actionable advice",
    body: "Book a call with the right person, learn what worked and what didn’t, and decide your next move.",
  },
] as const;

export const whyContrasts = [
  {
    not: "Not another directory.",
    instead: "Start with the challenge you need to solve, rather than scrolling through profiles.",
  },
  {
    not: "Not just theory.",
    instead: "Learn from people who’ve made real decisions and experienced the outcomes.",
  },
  {
    not: "Not guesswork.",
    instead: "Find someone whose experience relates to your situation, so you can make a more informed next move.",
  },
] as const;

export const whyPrinciples = [
  {
    lead: "Experience",
    over: "titles",
    body: "What someone’s done beats where they work.",
  },
  {
    lead: "Relevance",
    over: "reach",
    body: "The right person for this problem — not the biggest network.",
  },
  {
    lead: "Specific",
    over: "generic",
    body: "Advice from someone who’s faced a similar challenge.",
  },
  {
    lead: "Fit",
    over: "familiar",
    body: "Who you ask next needn’t be who you asked last.",
  },
  {
    lead: "Outcomes",
    over: "talk",
    body: "A clearer decision. Then move.",
  },
] as const;

export const expertPoints = [
  "Share what actually worked — and what didn’t",
  "Help with the challenges you know first-hand",
  "Contribute when a relevant question comes up — no ongoing commitment",
] as const;

export const faqs = [
  {
    question: "What kind of people are on Thirdline?",
    answer:
      "People with first-hand experience — founders, operators, and industry experts who’ve worked through the challenges you’re facing. We care about what they’ve done, not just job titles.",
  },
  {
    question: "How do I know if someone is right for me?",
    answer:
      "Start with the challenge, not a profile. We match you with relevant experience for the decision in front of you — similar stage, market, and problem — so the conversation is useful from the first minute.",
  },
  {
    question: "Is this like coaching or mentoring?",
    answer:
      "No. Thirdline isn’t an ongoing mentor relationship. It’s practical advice for a specific decision — what worked, what didn’t, and what to try next — then you move forward.",
  },
  {
    question: "Do I need a subscription?",
    answer:
      "No subscription. You connect when you have a real challenge to work through. The waitlist is open now; we’ll share how booking works as we launch.",
  },
  {
    question: "Who is Thirdline for?",
    answer:
      "Founders and operators making concrete decisions — especially across India, the UK, and the GCC — who want advice from someone who’s already been through a similar situation.",
  },
] as const;

export type SceneVisual =
  | "street"
  | "clinics"
  | "waiting"
  | "pattern"
  | "idea"
  | "building"
  | "zero"
  | "call"
  | "realisation"
  | "lesson"
  | "product"
  | "cta";

export type Scene = {
  number: number;
  title: string;
  visual: SceneVisual;
  screen: string;
  onScreen: string[];
  /** Voiceover line index at which each onScreen item appears. Defaults to its own index. */
  revealAt?: number[];
  voiceover: string[];
};

export const video = {
  title: "Rahul's story: why founders stay stuck",
  // Set to null to fall back to the animated storyboard player.
  src: "/video/rahul-story.mp4" as string | null,
  poster: "/video/rahul-story-poster.jpg" as string | null,
  // The final video has captions burned in, so it gets no separate track.
  captions: null as string | null,
};

export const scenes: Scene[] = [
  {
    number: 1,
    title: "Meet Rahul",
    visual: "street",
    screen: "Rahul, a young man in a tier 2 city, walking down a street.",
    onScreen: ["Meet Rahul"],
    voiceover: [
      "This is Rahul.",
      "He lives in a tier 2 city, and a few months ago, he had kidney stones.",
    ],
  },
  {
    number: 2,
    title: "The clinics",
    visual: "clinics",
    screen:
      "Quick cuts: a doctor's consultation, a follow-up visit, a lab. Rahul checking appointment times on his phone.",
    onScreen: [],
    voiceover: [
      "So he ended up spending quite a bit of time in clinics.",
      "Different doctors, a few follow-ups, even a lab visit.",
      "And after a while, he started noticing something.",
    ],
  },
  {
    number: 2,
    title: "The clinics",
    visual: "waiting",
    screen:
      "Rahul arriving on time, then sitting in a waiting room. A wall clock ticking forward.",
    onScreen: ["50 minutes."],
    revealAt: [1],
    voiceover: [
      "No matter which clinic he went to, he’d show up for his appointment",
      "and still end up sitting there for almost 50 minutes before he was actually seen.",
    ],
  },
  {
    number: 3,
    title: "The pattern",
    visual: "pattern",
    screen: "Three short shots of different clinics.",
    onScreen: ["1st time: fine.", "2nd time: annoying.", "3rd or 4th time: why?"],
    voiceover: [
      "The first time, he didn’t think much of it.",
      "The second time, it was annoying.",
      "By the third or fourth time, he started wondering,",
      "“Why do I even have an appointment if I’m still going to wait this long?”",
    ],
  },
  {
    number: 4,
    title: "The idea",
    visual: "idea",
    screen: "Rahul sketching on paper. A phone mockup.",
    onScreen: ["Book a time. Show up. See the doctor."],
    voiceover: [
      "And that’s where the idea started.",
      "What if you could just book a time, show up, and actually see the doctor at that time?",
      "Simple, right?",
    ],
  },
  {
    number: 5,
    title: "Building it",
    visual: "building",
    screen: "Rahul at a laptop late at night. A calendar on the wall flips through weeks.",
    onScreen: ["2 months."],
    revealAt: [1],
    voiceover: [
      "So Rahul started building it.",
      "He spent almost two months working on the product, and then he started speaking to clinics.",
    ],
  },
  {
    number: 6,
    title: "The zero",
    visual: "zero",
    screen:
      "Rahul pitching to a clinic owner. The owner shakes their head politely. Pause on a blank screen. Rahul alone, looking confused.",
    onScreen: ["Rs. 0"],
    revealAt: [2],
    voiceover: [
      "Can you guess how much clinics paid for the solution?",
      "…",
      "Zero.",
      "But Howz that even possible? How can you not get customers for the problem which is so obvious",
      "That confused him.",
      "Because the problem felt so obvious. He had experienced it himself.",
    ],
  },
  {
    number: 7,
    title: "The conversation",
    visual: "call",
    screen:
      "Rahul on a video call with someone who has worked with clinics. Two-person split screen. Subtitles on.",
    onScreen: [],
    voiceover: [
      "So after a while, he spoke to someone who had actually worked with clinics.",
      "And they asked him,",
      "“Okay. Who are you building this for?”",
      "“The patients.”",
      "“And who’s paying you?”",
      "“The clinic.”",
      "And they said,",
      "“That’s the issue.”",
      "“You’re solving a real problem, but you’re offering the solution to the wrong customer.”",
      "And then they asked him one more thing:",
      "“Do clinics actually care that patients are waiting 50 minutes?”",
    ],
  },
  {
    number: 8,
    title: "The realisation",
    visual: "realisation",
    screen: "Close up on Rahul's face as it lands. Two words on screen, one after the other.",
    onScreen: ["Patients: the problem.", "Clinics: the customer."],
    revealAt: [1, 2],
    voiceover: [
      "And that was the moment Rahul realised what he’d missed.",
      "The patients had the problem.",
      "But the clinics were the customers.",
      "He’d spent two months building a solution for a problem his customer didn’t care enough about.",
    ],
  },
  {
    number: 9,
    title: "The lesson",
    visual: "lesson",
    screen: "Slow shot of Rahul at his desk with his laptop closed. Soft music.",
    onScreen: [
      "Too close to the problem.",
      "Not another article.",
      "Not another AI answer.",
      "Someone who’s been there.",
    ],
    revealAt: [1, 2, 3, 4],
    voiceover: [
      "And that’s the thing about building something.",
      "Sometimes you’re too close to the problem to see what’s actually wrong.",
      "You don’t need another article.",
      "You don’t need another AI answer.",
      "Sometimes you need to talk to someone who’s already been there.",
    ],
  },
  {
    number: 10,
    title: "Thirdline",
    visual: "product",
    screen:
      "Thirdline logo appears. Homepage, then three quick app screens: bring your problem, find a mentor who's dealt with it, book a 1:1 call and talk.",
    onScreen: ["Bring your problem", "Find a mentor who's dealt with it", "Book a 1:1 call and talk"],
    revealAt: [1, 2, 3],
    voiceover: [
      "That’s what we’re building with Thirdline.",
      "You bring the problem you’re stuck on.",
      "You find someone who’s actually dealt with it.",
      "You book a conversation.",
      "And you talk.",
    ],
  },
  {
    number: 11,
    title: "Call to action",
    visual: "cta",
    screen:
      "Rahul, relaxed, on a call. Two people connected by a curved line. End card: Thirdline logo, Coming soon, Waitlist open, Join the waitlist.",
    onScreen: [],
    voiceover: [
      "Because somewhere, someone has already solved what you’re stuck on.",
      "You just haven’t talked to them yet.",
      "Thirdline.",
      "Coming soon.",
      "Join the waitlist.",
    ],
  },
];
