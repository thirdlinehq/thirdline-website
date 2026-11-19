"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { challenges } from "@/lib/content";

const STEP = 320;

export function AdvisorCarousel() {
  const scroller = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);

  function move(direction: number) {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const next = el.scrollLeft + direction * STEP;
    el.scrollTo({ left: next > max - 8 ? 0 : Math.max(0, next), behavior: "smooth" });
  }

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => move(1), 3800);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Scroll through real founder challenges — and the kind of experience that answers them.
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <CarouselButton label="Previous" onClick={() => move(-1)}>
            <path d="M15 6l-6 6 6 6" />
          </CarouselButton>
          <CarouselButton label="Next" onClick={() => move(1)}>
            <path d="M9 6l6 6-6 6" />
          </CarouselButton>
        </div>
      </div>
      <ul
        ref={scroller}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
      >
        {challenges.map((item) => (
          <li key={item.stage} className="w-[260px] shrink-0 snap-start sm:w-[300px]">
            <article className="group">
              <div className="overflow-hidden rounded-[1.75rem]">
                <img
                  src={item.photo}
                  alt=""
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-leaf">{item.stage}</p>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{item.name}</h3>
                <p className="mt-1 text-sm leading-snug text-muted">{item.experience}</p>
                <p className="mt-3 text-[15px] leading-snug text-ink">&ldquo;{item.question}&rdquo;</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CarouselButton({
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-ink hover:bg-ink hover:text-white"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </button>
  );
}
