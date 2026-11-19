"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { challenges } from "@/lib/content";
import { tintBg, type Tint } from "./ui";

type IdeaCard = {
  stage: string;
  headline: string;
  question: string;
  idea: string;
  ghost: string;
  tint: Tint;
};

/** Challenge posters — core idea first, no people photos. */
const ideaCards: IdeaCard[] = [
  {
    stage: challenges[0].stage,
    headline: "Validate before you build",
    question: challenges[0].question,
    idea: "Experience over guesswork",
    ghost: "VALIDATE",
    tint: challenges[0].tint,
  },
  {
    stage: challenges[1].stage,
    headline: "Ship the smallest real MVP",
    question: challenges[1].question,
    idea: "Specific advice over playbooks",
    ghost: "SHIP",
    tint: challenges[1].tint,
  },
  {
    stage: challenges[2].stage,
    headline: "Find the first 100",
    question: challenges[2].question,
    idea: "Relevance over reach",
    ghost: "TRACTION",
    tint: challenges[2].tint,
  },
  {
    stage: challenges[3].stage,
    headline: "Price for this market",
    question: challenges[3].question,
    idea: "What worked, what didn’t",
    ghost: "PRICE",
    tint: challenges[3].tint,
  },
  {
    stage: challenges[4].stage,
    headline: "Fix what’s stuck",
    question: challenges[4].question,
    idea: "The right person for this problem",
    ghost: "GROW",
    tint: challenges[4].tint,
  },
  {
    stage: challenges[5].stage,
    headline: "Enter with eyes open",
    question: challenges[5].question,
    idea: "Practical outcomes over talk",
    ghost: "EXPAND",
    tint: challenges[5].tint,
  },
];

/** Fewer slots → larger angle between neighbors → harder BSP-style V wrap. */
const RING_COUNT = 16;
const ring = Array.from({ length: RING_COUNT }, (_, i) => ideaCards[i % ideaCards.length]);

const tintSurface: Record<Tint, string> = {
  butter: "from-[#2a2618] via-[#1a1810] to-[#0c0c0c]",
  lavender: "from-[#221f2e] via-[#16141c] to-[#0c0c0c]",
  peach: "from-[#2c1f1a] via-[#1a1412] to-[#0c0c0c]",
  sky: "from-[#1a222a] via-[#12161a] to-[#0c0c0c]",
  mist: "from-[#1e221c] via-[#141614] to-[#0c0c0c]",
  lime: "from-[#1c2614] via-[#12180e] to-[#0c0c0c]",
};

const tintGlow: Record<Tint, string> = {
  butter: "bg-butter/25",
  lavender: "bg-lavender/25",
  peach: "bg-peach/25",
  sky: "bg-sky/25",
  mist: "bg-mist/20",
  lime: "bg-lime/20",
};

export function PaintScroll() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (reduce) {
    return (
      <section id="contrasts" className="bg-black px-5 py-24 text-white sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            Not another <span className="text-lime">directory.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
            Start with the challenge you need to solve, rather than scrolling through profiles.
          </p>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ideaCards.map((card) => (
              <ChallengeCard key={card.stage} card={card} active />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contrasts" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black pt-20 text-white sm:pt-24">
      <div className="relative z-10 mx-auto w-full max-w-4xl shrink-0 px-5 text-center">
        <h2 className="font-display text-[clamp(1.85rem,4.8vw,3.25rem)] font-semibold leading-[1.08] tracking-tight">
          Not another <span className="text-lime">directory.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55 sm:text-[15px]">
          Start with the challenge you need to solve, rather than scrolling through profiles.
        </p>
      </div>

      <div className="relative z-10 mt-1 min-h-0 w-full flex-1 sm:mt-2">
        <CurveCarousel />
      </div>
    </section>
  );
}

function CurveCarousel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const rotation = useRef(0);
  const velocity = useRef(0.014);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const [angle, setAngle] = useState(0);
  const [width, setWidth] = useState(1200);
  const [cardW, setCardW] = useState(280);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const w = stage.clientWidth || window.innerWidth;
      setWidth(w);
      setCardW(Math.max(200, Math.min(300, w * 0.2)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let previous = performance.now();
    const cruise = 0.016;

    const tick = (now: number) => {
      const delta = Math.min(32, now - previous) / 16.67;
      previous = now;
      if (!dragging.current) {
        velocity.current += (cruise - velocity.current) * 0.04;
        rotation.current += velocity.current * delta;
      }
      setAngle(rotation.current);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    lastX.current = event.clientX;
    lastT.current = performance.now();
    velocity.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const now = performance.now();
    const dx = event.clientX - lastX.current;
    const dt = Math.max(1, now - lastT.current);
    const step = dx * 0.08;
    rotation.current += step;
    velocity.current = step / (dt / 16.67);
    lastX.current = event.clientX;
    lastT.current = now;
    setAngle(rotation.current);
  };

  const endDrag = () => {
    dragging.current = false;
    velocity.current = Math.max(-0.06, Math.min(0.06, velocity.current));
    if (Math.abs(velocity.current) < 0.008) velocity.current = 0.016;
  };

  const step = 360 / ring.length;
  const w = stageRef.current?.clientWidth || width;
  // Hard cylindrical wrap (screenshot 2): deep gutter between cards, strong side skew.
  const span = w * 0.7;
  const depthZ = Math.min(420, w * 0.3);
  const perspective = 780;
  const visible = 78;
  const size = cardW || Math.max(200, Math.min(300, w * 0.2));

  return (
    <div
      ref={stageRef}
      className="relative h-full min-h-[560px] w-full cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing sm:min-h-[720px]"
      style={{ perspective: `${perspective}px`, perspectiveOrigin: "50% 48%" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      role="region"
      aria-label="Founder challenges in a curved carousel. Drag to browse."
    >
      <div
        className="absolute left-1/2 top-[48%] h-full w-full -translate-x-1/2 -translate-y-1/2"
        style={{ transformStyle: "preserve-3d" }}
      >
        {ring.map((card, index) => {
          const theta = angle + index * step;
          const wrapped = ((theta % 360) + 360) % 360;
          const centered = wrapped > 180 ? wrapped - 360 : wrapped;
          if (Math.abs(centered) > visible) {
            return (
              <div
                key={`${card.stage}-${index}`}
                className="absolute left-1/2 top-1/2"
                style={{ opacity: 0, pointerEvents: "none" }}
                aria-hidden
              />
            );
          }

          const rad = (centered * Math.PI) / 180;
          const x = Math.sin(rad) * span;
          // Center recedes; sides come forward — V / tunnel between neighbors.
          const z = -Math.cos(rad) * depthZ;
          // Amplify skew so near-center cards already read like screenshot 2.
          const skew = Math.max(-58, Math.min(58, -centered * 1.45));
          const fade = 1 - Math.min(1, Math.abs(centered) / visible);
          const active = Math.abs(centered) < 14;
          const shade = Math.min(0.45, Math.abs(centered) / 100);

          return (
            <div
              key={`${card.stage}-${index}`}
              className="absolute left-1/2 top-1/2 will-change-transform"
              style={{
                width: size,
                transform: `translate3d(calc(-50% + ${x}px), -50%, ${z}px) rotateY(${skew}deg)`,
                transformStyle: "preserve-3d",
                opacity: 0.82 + fade * 0.18,
                zIndex: Math.round(z + depthZ + 10),
                pointerEvents: "auto",
              }}
            >
              <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                <ChallengeCard card={card} active={active} />
                {/* Orientation shading — outer faces fall off like BSP */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[1.6rem]"
                  style={{
                    background: `linear-gradient(${skew > 0 ? "90deg" : "270deg"}, rgb(0 0 0 / ${shade}) 0%, transparent 55%)`,
                  }}
                  aria-hidden
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MotionHeadline({ text, active }: { text: string; active: boolean }) {
  const words = text.split(" ");
  return (
    <h3 className="font-display text-[clamp(1.45rem,4.2vw,1.9rem)] font-semibold leading-[1.12] tracking-tight text-white" aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}-${active ? "on" : "off"}`} className="inline-block">
          <span
            className={active ? "md-letter" : "inline-block"}
            style={active ? { animationDelay: `${index * 0.08}s, ${0.55 + index * 0.1}s` } : undefined}
          >
            {word}
          </span>
          {index < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </h3>
  );
}

function MotionLine({ text, active, className = "" }: { text: string; active: boolean; className?: string }) {
  const words = text.split(" ");
  return (
    <p className={className} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}-${active ? "on" : "off"}`} className="inline-block">
          <span
            className={active ? "md-word" : "inline-block"}
            style={active ? { animationDelay: `${0.15 + index * 0.05}s, ${0.9 + index * 0.04}s` } : undefined}
          >
            {word}
          </span>
          {index < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </p>
  );
}

function ChallengeCard({ card, active = false }: { card: IdeaCard; active?: boolean }) {
  return (
    <article className={`relative aspect-[3/4] overflow-hidden rounded-[1.6rem] bg-gradient-to-b ${tintSurface[card.tint]}`}>
      {/* Soft tint orb — atmosphere without photography */}
      <div
        className={`pointer-events-none absolute -left-1/4 top-[-10%] h-[70%] w-[90%] rounded-full blur-3xl ${tintGlow[card.tint]} ${
          active ? "card-orb-active" : "card-orb"
        }`}
        aria-hidden
      />

      {/* Giant ghost word */}
      <p
        className={`pointer-events-none absolute inset-x-[-8%] top-[28%] text-center font-display text-[clamp(3.2rem,12vw,4.6rem)] font-bold uppercase leading-none tracking-[-0.04em] text-white/[0.07] ${
          active ? "md-ghost" : ""
        }`}
        aria-hidden
      >
        {card.ghost}
      </p>

      <div className="relative z-10 flex h-full flex-col px-5 pb-5 pt-6">
        <span
          key={active ? "tag-on" : "tag-off"}
          className={`mx-auto inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink ${tintBg[card.tint]} ${
            active ? "md-tag" : ""
          }`}
        >
          {card.stage}
        </span>

        <div className="mt-8 flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <MotionHeadline text={card.headline} active={active} />
          <span className={`h-[2px] w-10 rounded-full bg-white/55 ${active ? "md-scrub" : "opacity-35"}`} aria-hidden />
          <MotionLine
            text={card.idea}
            active={active}
            className="font-display text-[13px] font-medium tracking-wide text-lime sm:text-sm"
          />
        </div>

        <div className="mt-auto space-y-2 text-center">
          <MotionLine
            text={card.question}
            active={active}
            className="font-display text-[13px] font-medium leading-snug text-white/85 sm:text-[14px]"
          />
          <p className="text-[11px] font-medium tracking-wide text-white/45">Start with the challenge — not a profile.</p>
        </div>
      </div>
    </article>
  );
}
