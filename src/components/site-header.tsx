"use client";

import { useEffect, useState } from "react";
import { Logo } from "./ui";
import { WaitlistButton } from "./waitlist";

const nav = [
  { href: "#advisors", label: "Experience" },
  { href: "#problem", label: "Problem" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#why", label: "Why Thirdline" },
  { href: "#experts", label: "For experts" },
];

export function SiteHeader() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 rounded-full border px-4 transition-all duration-300 sm:px-5 ${
          solid
            ? "border-white/60 bg-white/70 shadow-[0_8px_30px_-12px_rgba(27,27,31,0.25)] backdrop-blur-xl backdrop-saturate-150"
            : "border-white/25 bg-white/10 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150"
        }`}
      >
        <a href="#top" aria-label="Thirdline home" className="flex items-center leading-none">
          <Logo variant={solid ? "primary" : "inverse"} />
        </a>
        <nav
          aria-label="Primary"
          className={`hidden items-center gap-7 text-sm font-medium md:flex ${solid ? "text-muted" : "text-white/85"}`}
        >
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={`transition ${solid ? "hover:text-ink" : "hover:text-white"}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <WaitlistButton role="founder" size="sm" variant={solid ? "secondary" : "primary"}>
          <span className="sm:hidden">Join</span>
          <span className="hidden sm:inline">Find someone who’s been there</span>
        </WaitlistButton>
      </div>
    </header>
  );
}
