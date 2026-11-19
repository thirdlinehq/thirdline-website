"use client";

import { useEffect, useEffectEvent, useRef, useState, type MouseEvent } from "react";
import { whyPrinciples } from "@/lib/content";
import { LogoMark } from "./ui";
import { Reveal } from "./reveal";

const AUTO_MS = 4800;

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const pauseUntil = useRef(0);
  const selectedRef = useRef(0);
  const elapsedRef = useRef(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [inside, setInside] = useState(false);
  const [selected, setSelected] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduce);
    setReduceMotion(reduce);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.22;
      current.current.y += (target.current.y - current.current.y) * 0.22;
      const { x, y } = current.current;

      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(380px circle at ${x}px ${y}px, rgba(166,226,75,0.16), transparent 55%)`;
      }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafRef.current);
  }, [enabled]);

  const stepTo = useEffectEvent((index: number, manual = false) => {
    const next = (index + whyPrinciples.length) % whyPrinciples.length;
    selectedRef.current = next;
    elapsedRef.current = 0;
    setSelected(next);
    if (progressRef.current) progressRef.current.style.width = "0%";
    if (manual) pauseUntil.current = performance.now() + AUTO_MS;
  });

  // Stable autoplay loop — progress via DOM, no setState thrash / effect reset.
  useEffect(() => {
    if (reduceMotion) return;
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = Math.min(64, now - last);
      last = now;

      if (now >= pauseUntil.current) {
        elapsedRef.current += delta;
        const ratio = Math.min(1, elapsedRef.current / AUTO_MS);
        if (progressRef.current) {
          progressRef.current.style.width = `${ratio * 100}%`;
        }
        if (elapsedRef.current >= AUTO_MS) {
          stepTo(selectedRef.current + 1);
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, stepTo]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
      if (!inView) return;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        stepTo(selectedRef.current + 1, true);
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        stepTo(selectedRef.current - 1, true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stepTo]);

  function onMove(event: MouseEvent<HTMLElement>) {
    if (!enabled) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    target.current = { x, y };
    if (!inside) {
      current.current = { x, y };
      setInside(true);
    }
  }

  const item = whyPrinciples[selected] ?? whyPrinciples[0];
  const nextItem = whyPrinciples[(selected + 1) % whyPrinciples.length];

  return (
    <section
      id="why"
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseEnter={() => setInside(true)}
      onMouseLeave={() => setInside(false)}
      className={`scroll-mt-24 relative flex min-h-[85svh] flex-col justify-center overflow-hidden bg-ink px-5 py-20 text-white sm:px-8 sm:py-24 ${
        enabled ? "cursor-none [&_button]:cursor-none" : ""
      }`}
      aria-roledescription="carousel"
      aria-label="Why Thirdline principles"
    >
      {enabled && (
        <>
          <div
            ref={spotRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
            style={{ opacity: inside ? 1 : 0 }}
          />
          <div
            ref={cursorRef}
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-40 h-4 w-4 rounded-full bg-lime/80 will-change-transform"
            style={{ opacity: inside ? 1 : 0 }}
          />
        </>
      )}

      <p
        key={selected}
        aria-hidden
        className="pointer-events-none absolute right-4 top-[6%] font-display text-[clamp(6rem,22vw,14rem)] font-bold leading-none tracking-[-0.06em] text-white/[0.04] animate-soft-in sm:right-8"
      >
        {String(selected + 1).padStart(2, "0")}
      </p>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <LogoMark variant="inverse" className="h-7 w-7" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-lime">Why Thirdline</p>
          </div>
        </Reveal>

        <div className="mt-14 sm:mt-20">
          <div className="flex max-w-xs items-center gap-4">
            <p className="shrink-0 text-[13px] font-medium uppercase tracking-[0.2em] text-white/35">
              {String(selected + 1).padStart(2, "0")} / {String(whyPrinciples.length).padStart(2, "0")}
            </p>
            {!reduceMotion && (
              <div className="h-[2px] min-w-0 flex-1 overflow-hidden rounded-full bg-white/10" aria-hidden>
                <div ref={progressRef} className="h-full w-0 rounded-full bg-lime will-change-[width]" />
              </div>
            )}
          </div>

          <div key={item.lead} className="mt-5 max-w-full animate-soft-in pr-2">
            <h2 className="break-words font-display text-[clamp(2.5rem,9vw,6.5rem)] font-semibold leading-[0.95] tracking-tight text-white">
              {item.lead}
            </h2>
            <p className="mt-2 break-words font-display text-[clamp(1.25rem,3.8vw,2.5rem)] font-semibold tracking-tight text-white/30">
              over {item.over}
            </p>
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/55 sm:text-lg">{item.body}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {whyPrinciples.map((principle, index) => {
              const on = index === selected;
              return (
                <button
                  key={principle.lead}
                  type="button"
                  onClick={() => stepTo(index, true)}
                  aria-current={on ? "true" : undefined}
                  className={`rounded-full px-3.5 py-2 text-[12px] font-semibold tracking-wide transition duration-300 sm:px-4 sm:text-[13px] ${
                    on
                      ? "bg-lime text-ink"
                      : "bg-white/5 text-white/45 hover:bg-white/10 hover:text-white/80"
                  }`}
                >
                  {principle.lead}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => stepTo(selected - 1, true)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-lime hover:text-lime"
              aria-label="Previous principle"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => stepTo(selected + 1, true)}
              className="inline-flex h-11 min-w-0 max-w-full items-center gap-2 rounded-full bg-lime px-4 text-[13px] font-semibold text-ink transition hover:bg-lime-deep sm:px-5"
              aria-label={`Next principle: ${nextItem.lead}`}
            >
              <span className="truncate">Next · {nextItem.lead}</span>
              <svg width="14" height="14" className="shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
