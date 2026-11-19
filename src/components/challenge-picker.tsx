"use client";

import { useEffect, useState, type ReactNode } from "react";
import { challenges } from "@/lib/content";
import { Arrow } from "./ui";
import { WaitlistButton } from "./waitlist";

const AUTO_MS = 5500;

export function ChallengePicker() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = challenges[active];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % challenges.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, active]);

  function select(index: number) {
    setActive(index);
    setPaused(true);
  }

  function step(delta: number) {
    setActive((i) => (i + delta + challenges.length) % challenges.length);
    setPaused(true);
  }

  return (
    <div
      className="mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-line">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          {/* Featured question */}
          <div className="relative flex flex-col justify-between gap-8 bg-mist p-6 sm:p-8">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">{current.stage}</p>
              <p
                key={current.stage}
                className="mt-6 font-display text-2xl font-bold leading-[1.2] text-ink animate-soft-in sm:text-3xl"
              >
                <span className="text-leaf/55" aria-hidden>
                  “
                </span>
                {current.question}
                <span className="text-leaf/55" aria-hidden>
                  ”
                </span>
              </p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium tabular-nums text-ink/55">
                {active + 1} / {challenges.length}
              </p>
              <div className="flex gap-2">
                <NavButton label="Previous challenge" onClick={() => step(-1)}>
                  <ArrowLeft />
                </NavButton>
                <NavButton label="Next challenge" onClick={() => step(1)}>
                  <Arrow />
                </NavButton>
              </div>
            </div>
          </div>

          {/* Match + CTA */}
          <div className="flex flex-col justify-between gap-8 bg-white p-6 sm:p-8">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">
                What Thirdline finds
              </p>
              <p key={`finds-${current.stage}`} className="mt-3 text-lg leading-relaxed text-muted animate-soft-in">
                {current.finds}
              </p>

              <div
                key={`person-${current.stage}`}
                className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-white p-2.5 animate-soft-in"
              >
                <img src={current.photo} alt="" className="h-14 w-14 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold tracking-tight text-ink">{current.name}</p>
                  <p className="truncate text-sm text-muted">{current.experience}</p>
                </div>
                <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white">Fit</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted">Sound familiar?</p>
              <div className="mt-3">
                <WaitlistButton role="founder" variant="secondary">
                  Find someone who’s been there <Arrow />
                </WaitlistButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Single selector: compact stage list */}
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((item, i) => {
          const on = i === active;
          return (
            <li key={item.stage}>
              <button
                type="button"
                onClick={() => select(i)}
                aria-pressed={on}
                className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-left transition ${
                  on ? "border-ink bg-white text-ink" : "border-line bg-white text-ink hover:border-ink/30"
                }`}
              >
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${on ? "bg-ink" : "bg-line"}`}
                />
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
                    {item.stage}
                  </span>
                  <span className="mt-1 block text-sm font-medium leading-snug text-ink line-clamp-2">
                    {item.question}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink ring-1 ring-ink/10 transition hover:bg-white"
    >
      {children}
    </button>
  );
}

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
