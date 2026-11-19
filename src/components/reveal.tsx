"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Tag = "div" | "li";

export function Reveal({
  as = "div",
  children,
  className = "",
  delay = 0,
  media = false,
}: {
  as?: Tag;
  children: ReactNode;
  className?: string;
  delay?: number;
  media?: boolean;
}) {
  const ref = useRef<HTMLDivElement | HTMLLIElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      className={`${media ? "reveal-media" : "reveal"} ${shown ? "is-in" : ""} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
