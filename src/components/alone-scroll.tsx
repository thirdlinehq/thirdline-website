"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./ui";
import { WaitlistButton } from "./waitlist";

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

const beats = [
  {
    title: "Stop deciding alone.",
    body: "You’re smart. Driven. But stuck on a specific call. Another thread or playbook won’t give you the context you need.",
  },
  {
    title: "Talk to someone who’s been there.",
    body: "A few steps ahead — this challenge, this market — so you can decide with clearer eyes.",
  },
] as const;

const leftCluster = {
  photo: "/photos/nora.jpg",
  name: "Nora V.",
  tags: ["Pricing", "India SaaS"],
};

const rightCluster = {
  photo: "/photos/omar.jpg",
  name: "Omar H.",
  tags: ["India → GCC", "Market entry"],
};

const lateFaces = [
  { src: "/photos/meera.jpg", x: "12%", y: "18%", delay: 0 },
  { src: "/photos/james.jpg", x: "78%", y: "22%", delay: 0.08 },
  { src: "/photos/leah.jpg", x: "18%", y: "72%", delay: 0.16 },
  { src: "/photos/aisha.jpg", x: "74%", y: "68%", delay: 0.24 },
] as const;

export function AloneScroll() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    media.addEventListener("change", sync);

    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      setProgress(clamp(-el.getBoundingClientRect().top / Math.max(total, 1)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (reduce) {
    return (
      <section id="alone" className="bg-mist px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {beats.map((beat) => (
            <div key={beat.title} className="mt-10 first:mt-0">
              <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">{beat.title}</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{beat.body}</p>
            </div>
          ))}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            <StaticFace {...leftCluster} />
            <StaticFace {...rightCluster} />
          </div>
          <div className="mt-10">
            <WaitlistButton role="founder" variant="secondary">
              Find someone who’s been there <Arrow />
            </WaitlistButton>
          </div>
        </div>
      </section>
    );
  }

  const arrive = clamp(progress / 0.34);
  const swap = clamp((progress - 0.32) / 0.36);
  const swarm = clamp((progress - 0.48) / 0.28);
  const cta = clamp((progress - 0.72) / 0.18);

  return (
    <section id="alone" ref={ref} className="relative h-[280vh] bg-mist">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(166,226,75,0.14),transparent_55%)]" />

        {lateFaces.map((face) => (
          <img
            key={face.src}
            src={face.src}
            alt=""
            className="pointer-events-none absolute hidden h-16 w-16 rounded-full object-cover ring-4 ring-white shadow-lg sm:block lg:h-20 lg:w-20"
            style={{
              left: face.x,
              top: face.y,
              opacity: swarm * 0.9,
              transform: `scale(${0.7 + swarm * 0.3}) translateY(${(1 - swarm) * 24}px)`,
            }}
          />
        ))}

        <Portrait cluster={leftCluster} side="left" arrive={arrive} />
        <Portrait cluster={rightCluster} side="right" arrive={arrive} />

        <div className="relative z-10 mx-auto w-full max-w-3xl px-5">
          <div className="relative min-h-[11rem] sm:min-h-[13rem]">
            {beats.map((beat, index) => {
              const opacity = index === 0 ? 1 - swap : swap;
              const shift = index === 0 ? -swap * 32 : (1 - swap) * 40;
              return (
                <div
                  key={beat.title}
                  className={`${index === 1 ? "absolute inset-x-0 top-0" : ""} text-center`}
                  style={{ opacity, transform: `translateY(${shift}px)` }}
                >
                  <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                    {beat.title}
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">{beat.body}</p>
                </div>
              );
            })}
          </div>

          <div
            className="mt-10 flex justify-center"
            style={{
              opacity: cta,
              transform: `translateY(${(1 - cta) * 18}px)`,
              pointerEvents: cta > 0.5 ? "auto" : "none",
            }}
          >
            <WaitlistButton role="founder" variant="secondary">
              Find someone who’s been there <Arrow />
            </WaitlistButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portrait({
  cluster,
  side,
  arrive,
}: {
  cluster: { photo: string; name: string; tags: string[] };
  side: "left" | "right";
  arrive: number;
}) {
  const from = side === "left" ? -30 : 30;
  return (
    <div
      className={`pointer-events-none absolute top-[58%] z-[5] -translate-y-1/2 sm:top-1/2 ${
        side === "left" ? "left-[3%] sm:left-[6%]" : "right-[3%] sm:right-[6%]"
      }`}
    >
      <div
        className="flex max-w-[9.5rem] flex-col items-center text-center sm:max-w-[12rem]"
        style={{
          opacity: 0.12 + arrive * 0.88,
          transform: `translateX(${(1 - arrive) * from}vw)`,
        }}
      >
        <img
          src={cluster.photo}
          alt=""
          className="h-24 w-24 rounded-[1.6rem] object-cover shadow-[0_18px_40px_-24px_rgba(27,27,31,0.55)] ring-4 ring-white sm:h-40 sm:w-40 sm:rounded-[2rem] lg:h-48 lg:w-48"
        />
        <div className={`mt-3 flex flex-wrap justify-center gap-1.5 ${side === "right" ? "sm:flex-row-reverse" : ""}`}>
          {cluster.tags.map((tag, i) => (
            <span
              key={tag}
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold sm:text-xs ${
                i === 0 ? "bg-lime text-ink" : "bg-ink text-white"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-1.5 text-sm font-medium text-ink/80">{cluster.name}</p>
      </div>
    </div>
  );
}

function StaticFace({
  photo,
  name,
  tags,
}: {
  photo: string;
  name: string;
  tags: string[];
}) {
  return (
    <figure className="text-center">
      <img src={photo} alt="" className="mx-auto h-28 w-28 rounded-[1.75rem] object-cover ring-4 ring-white" />
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {tags.map((tag, i) => (
          <span
            key={tag}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              i === 0 ? "bg-lime text-ink" : "bg-ink text-white"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <figcaption className="mt-1 text-sm font-medium">{name}</figcaption>
    </figure>
  );
}
