import { AdvisorCarousel } from "@/components/advisor-carousel";
import { AloneScroll } from "@/components/alone-scroll";
import { HeroSearch } from "@/components/hero-product";
import { HeroVideo } from "@/components/hero-video";
import { PaintScroll } from "@/components/paint-scroll";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { Arrow, Logo } from "@/components/ui";
import { WaitlistButton, WaitlistProvider } from "@/components/waitlist";
import { FaqSection } from "@/components/faq-section";
import { WhySection } from "@/components/why-section";
import {
  challenges,
  expertPoints,
  howItWorks,
  marquee,
  markets,
  problemNeeded,
  problemUsual,
} from "@/lib/content";

const faces = ["/photos/meera.jpg", "/photos/omar.jpg", "/photos/nora.jpg", "/photos/aisha.jpg"];

export default function Home() {
  return (
    <WaitlistProvider>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Advisors />
        <Problem />
        <HowItWorks />
        <AloneScroll />
        <PaintScroll />
        <WhySection />
        <Experts />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </WaitlistProvider>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink px-5 pb-28 pt-28 text-center text-white">
      <HeroVideo />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/70" />
      <div className="relative mx-auto w-full max-w-4xl">
        <div className="flex animate-fade-up items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {faces.map((src) => (
              <img key={src} src={src} alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-white/80" />
            ))}
          </div>
          <p className="text-left text-sm leading-snug text-white/90">
            {markets[0]}
            <span className="block text-white/70">
              {markets[1]} · {markets[2]}
            </span>
          </p>
        </div>

        <p className="mt-8 animate-fade-up text-[13px] font-semibold uppercase tracking-[0.18em] text-lime [animation-delay:0.12s]">
          Advice when you need it
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl animate-fade-up font-display text-5xl font-semibold leading-[1.08] tracking-tight text-white [animation-delay:0.22s] sm:text-6xl lg:text-7xl">
          You have a problem.
          <span className="mt-1 block">Someone has solved it.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl animate-fade-up text-lg leading-relaxed text-white/80 [animation-delay:0.34s]">
          Get practical advice from people who have overcome the challenge you’re dealing with. Find the
          right experience for the decision in front of you, and move forward with greater clarity.
        </p>

        <div className="mt-8 animate-fade-up [animation-delay:0.46s]">
          <HeroSearch />
        </div>

        <div className="mt-6 flex animate-fade-up flex-wrap items-center justify-center gap-2 [animation-delay:0.58s]">
          {challenges.slice(0, 4).map((item) => (
            <a
              key={item.stage}
              href="#advisors"
              className="rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-sm text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {item.stage}
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <WaitlistButton role="mentor" variant="outline-light" size="sm">
            I can help others
          </WaitlistButton>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const values = [...marquee, ...marquee];
  const questions = [...challenges, ...challenges].map((item) => item.question);
  return (
    <div className="border-b border-line bg-white">
      <div className="marquee-fade overflow-hidden border-b border-line py-4" aria-hidden>
        <div className="marquee-track flex w-max items-center gap-3 whitespace-nowrap">
          {questions.map((question, i) => (
            <span
              key={`${question}-${i}`}
              className="rounded-full border border-line bg-mist px-4 py-2 text-sm font-medium text-ink"
            >
              {question}
            </span>
          ))}
        </div>
      </div>
      <div className="marquee-fade overflow-hidden py-4" aria-hidden>
        <div className="marquee-track-reverse flex w-max items-center gap-10 whitespace-nowrap">
          {values.map((item, i) => (
            <span key={`${item}-${i}`} className="inline-flex items-center gap-10 text-sm font-medium tracking-wide text-muted">
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Advisors() {
  return (
    <section id="advisors" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-leaf">The solution</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Real questions. Real experience.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Whatever stage you’re at, there’s a challenge worth solving. From your first business idea to your
            next growth milestone, Thirdline helps you find people who have been through challenges similar to
            yours.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={100}>
          <AdvisorCarousel />
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-start gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between" delay={80}>
          <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Sound familiar? Start with the challenge in front of you.
          </p>
          <WaitlistButton role="founder" variant="secondary">
            Find someone who’s been there <Arrow />
          </WaitlistButton>
        </Reveal>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section id="problem" className="scroll-mt-24 bg-mist">
      <div className="mx-auto grid max-w-6xl items-end gap-10 px-5 pt-20 sm:px-8 lg:grid-cols-12 lg:pt-28">
        <Reveal className="lg:col-span-7">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-leaf">The problem</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Generic advice is easy to find. Relevant experience is not.
          </h2>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <p className="text-lg leading-relaxed text-muted">
            When a real decision lands on your desk — pricing, market entry, a first enterprise deal — the usual
            routes fall short. What moves a founder forward is talking to someone who has already been through
            that specific challenge, in that specific market.
          </p>
        </Reveal>
      </div>

      <Reveal media className="mx-auto mt-12 max-w-6xl overflow-hidden px-5 sm:px-8" delay={80}>
        <img
          src="/photos/team.jpg"
          alt=""
          className="aspect-[21/9] w-full object-cover object-center sm:aspect-[2.4/1]"
        />
      </Reveal>

      <div className="mx-auto grid max-w-6xl gap-0 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-20">
        <Reveal className="border-b border-line py-8 lg:border-b-0 lg:border-r lg:pr-12">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">The usual routes</p>
          <ul className="mt-6 space-y-4">
            {problemUsual.map((item) => (
              <li key={item} className="flex gap-3 text-lg leading-snug text-muted">
                <span className="mt-2 h-px w-5 shrink-0 bg-muted/50" aria-hidden />
                <span className="line-through decoration-muted/40">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="py-8 lg:pl-12" delay={120}>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-leaf">What the moment calls for</p>
          <ul className="mt-6 space-y-4">
            {problemNeeded.map((item) => (
              <li key={item} className="flex gap-3 text-lg leading-snug text-ink">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lime" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-leaf">How it works</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            Three steps. No long-term mentor, no browsing profiles — just the right experience for the
            decision in front of you.
          </h2>
        </Reveal>
        <ol className="mt-16 grid gap-0 border-t border-line md:grid-cols-3">
          {howItWorks.map((item, index) => (
            <Reveal
              as="li"
              key={item.step}
              delay={index * 120}
              className={`border-b border-line py-10 md:border-b-0 md:px-8 md:py-12 ${
                index === 0 ? "md:pl-0" : "md:border-l"
              } ${index === howItWorks.length - 1 ? "md:pr-0" : ""}`}
            >
              <span className="font-display text-5xl font-semibold tracking-tight text-lime">{item.step}</span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Experts() {
  return (
    <section id="experts" className="scroll-mt-24 bg-mist px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12">
        <Reveal media className="overflow-hidden lg:col-span-6">
          <img src="/photos/call.jpg" alt="" className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]" />
        </Reveal>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={140}>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-leaf">For people who have been there</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            You’ve been there. Someone needs that.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            If you’ve built, priced, hired, launched, or expanded — especially across India, UK or the GCC —
            your experience could save another founder months of wrong turns. Founders, operators, and
            industry experts are all welcome.
          </p>
          <ul className="mt-8 space-y-4">
            {expertPoints.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lime" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <WaitlistButton role="mentor" variant="secondary">
              I can help others <Arrow />
            </WaitlistButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-28 text-center sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(166,226,75,0.18),transparent_58%)]" />
      <Reveal className="relative">
        <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-leaf">Coming soon. Waitlist open.</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Find someone who’s been there.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
          Describe the challenge in front of you. We’ll help you find someone who has already worked through
          it.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WaitlistButton role="founder" variant="secondary">
            Find someone who’s been there <Arrow />
          </WaitlistButton>
          <WaitlistButton role="mentor" variant="outline">
            I can help others
          </WaitlistButton>
        </div>
      </Reveal>
    </section>
  );
}

const footerColumns = [
  {
    title: "Product",
    links: [
      { href: "#advisors", label: "Experience" },
      { href: "#problem", label: "Problem" },
      { href: "#how-it-works", label: "How it works" },
      { href: "#why", label: "Why Thirdline" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#alone", label: "Stop deciding alone" },
      { href: "#experts", label: "For experts" },
      { href: "#top", label: "Advice when you need it" },
    ],
  },
] as const;

function Footer() {
  return (
    <footer className="bg-ink px-5 pb-8 pt-16 text-white sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Logo variant="inverse" />
          <h2 className="mt-8 max-w-md font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Don’t miss the next step.
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
            The waitlist is open. Tell us the decision in front of you, and we’ll help you find someone who’s
            already worked through it.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <WaitlistButton role="founder" variant="primary">
              Find someone who’s been there
            </WaitlistButton>
            <WaitlistButton role="mentor" variant="outline-light">
              I can help others
            </WaitlistButton>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:pt-16 lg:col-span-5 lg:col-start-8">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">{column.title}</p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-white/85 transition hover:text-lime">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-2 border-t border-white/15 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Thirdline</p>
        <p>The right experience beats the loudest opinion.</p>
      </div>
    </footer>
  );
}
