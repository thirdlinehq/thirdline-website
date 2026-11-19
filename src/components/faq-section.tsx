"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import { Reveal } from "./reveal";
import { Arrow } from "./ui";
import { WaitlistButton } from "./waitlist";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section id="faq" className="scroll-mt-24 bg-mist/60 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 lg:items-start">
        <Reveal className="lg:sticky lg:top-28">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-leaf">FAQ</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]">
            <span className="block">Frequently asked.</span>
            <span className="mt-2 inline-block rounded-md bg-lime px-2.5 py-1 text-ink">Honestly answered.</span>
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-soft">
            Straight answers about how Thirdline works — and what it isn’t.
          </p>

          <div className="mt-10 hidden rounded-[1.5rem] border border-line bg-white p-6 lg:block">
            <p className="font-display text-lg font-semibold tracking-tight text-ink">Still have a question?</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Join the waitlist and tell us what you’re working through.
            </p>
            <div className="mt-5">
              <WaitlistButton role="founder" variant="secondary" className="w-full justify-center sm:w-auto">
                Find someone who’s been there <Arrow />
              </WaitlistButton>
            </div>
          </div>
        </Reveal>

        <Reveal className="space-y-2.5">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-[1.25rem] border transition duration-300 ${
                  isOpen
                    ? "border-ink/10 bg-white shadow-[0_12px_40px_-24px_rgba(27,27,31,0.35)]"
                    : "border-transparent bg-white/70 hover:bg-white"
                }`}
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-[1.15rem]"
                >
                  <span
                    className={`font-display text-[12px] font-semibold tabular-nums transition ${
                      isOpen ? "text-leaf" : "text-muted"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`min-w-0 flex-1 font-display text-[16px] font-semibold leading-snug tracking-tight sm:text-[17px] ${
                      isOpen ? "text-ink" : "text-ink/80"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                      isOpen ? "bg-lime text-ink" : "bg-mist text-ink/70"
                    }`}
                    aria-hidden
                  >
                    {isOpen ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                        <path d="M5 12h14" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                      </svg>
                    )}
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-line/80 px-5 pb-5 pt-3 text-[15px] leading-relaxed text-ink-soft sm:px-6 sm:pb-6 sm:pl-[3.25rem]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>

        <div className="lg:hidden">
          <WaitlistButton role="founder" variant="secondary" className="w-full justify-center">
            Still unsure? Join the waitlist <Arrow />
          </WaitlistButton>
        </div>
      </div>
    </section>
  );
}
