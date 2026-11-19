"use client";

import { useEffect, useRef, useState } from "react";
import { WaitlistButton } from "./waitlist";

const cycles = [
  {
    challenge: "How should we price for the Indian market?",
    photo: "/photos/nora.jpg",
    name: "Nora V.",
    experience: "Priced SaaS for India — twice",
  },
  {
    challenge: "We’re considering the GCC. What do we need to know?",
    photo: "/photos/omar.jpg",
    name: "Omar H.",
    experience: "Entered GCC from India",
  },
  {
    challenge: "How do we get our first 100 customers?",
    photo: "/photos/meera.jpg",
    name: "Meera S.",
    experience: "Got first 100 without paid ads",
  },
] as const;

const TYPE_MS = 32;
const HOLD_MS = 3000;

export function HeroSearch() {
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState("");
  const [matched, setMatched] = useState(false);
  const timers = useRef<number[]>([]);
  const cycle = cycles[active];

  function clearTimers() {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }

  useEffect(() => {
    clearTimers();
    setTyped("");
    setMatched(false);
    const text = cycle.challenge;
    let i = 0;

    const tick = () => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i < text.length) {
        timers.current.push(window.setTimeout(tick, TYPE_MS));
      } else {
        timers.current.push(
          window.setTimeout(() => {
            setMatched(true);
            timers.current.push(
              window.setTimeout(() => setActive((n) => (n + 1) % cycles.length), HOLD_MS),
            );
          }, 240),
        );
      }
    };

    timers.current.push(window.setTimeout(tick, 400));
    return clearTimers;
  }, [active, cycle.challenge]);

  return (
    <div className="mx-auto w-full max-w-2xl text-left">
      <div className="flex items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.55)]">
        <p className="min-h-6 min-w-0 flex-1 truncate text-[15px] font-medium text-ink" aria-live="polite">
          {typed}
          <span className={`ml-0.5 inline-block h-[1em] w-px translate-y-[2px] bg-ink ${matched ? "opacity-0" : "animate-caret"}`} />
        </p>
        <WaitlistButton role="founder" variant="secondary" size="sm">
          Find someone
        </WaitlistButton>
      </div>

      <div
        className={`mx-auto mt-4 flex w-fit items-center gap-3 rounded-full bg-white/95 py-1.5 pl-1.5 pr-4 text-ink shadow-lg transition-all duration-500 ${
          matched ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
        }`}
      >
        <img src={cycle.photo} alt="" className="h-9 w-9 rounded-full object-cover" />
        <div>
          <p className="text-sm font-semibold leading-tight">{cycle.name}</p>
          <p className="text-xs text-muted">{cycle.experience}</p>
        </div>
      </div>
    </div>
  );
}
