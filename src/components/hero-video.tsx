"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    let stopped = false;
    const play = () => {
      if (stopped || document.hidden) return;
      video.play().catch(() => {});
    };

    play();
    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);
    video.addEventListener("pause", play);
    document.addEventListener("visibilitychange", play);
    const retry = window.setInterval(play, 400);
    const stopRetry = window.setTimeout(() => window.clearInterval(retry), 8000);

    return () => {
      stopped = true;
      window.clearInterval(retry);
      window.clearTimeout(stopRetry);
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
      video.removeEventListener("pause", play);
      document.removeEventListener("visibilitychange", play);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover object-[center_45%]"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/photos/hero-poster.jpg?v=cafe"
      aria-hidden
    >
      <source src="/video/hero.mp4?v=cafe" type="video/mp4" />
    </video>
  );
}
