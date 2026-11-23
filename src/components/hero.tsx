"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useSiteReady } from "@/lib/use-site-ready";
import silhouette from "../assets/foto-profil-siluet-hero.png";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const ready = useSiteReady();
  const reduceMotion = useReducedMotion();

  // Scroll-linked depth parallax antara wordmark dan siluet.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const wordmarkY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);
  const silhouetteY = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const silhouetteScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-poster relative isolate overflow-hidden"
    >
      <div aria-hidden="true" className="hero-paper" />

      <svg className="hero-contours" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((line) => (
          <path
            key={line}
            transform={`translate(${line * 22} ${line * -18})`}
            d="M-180 680 C80 700 10 230 350 240 S620 580 900 340 S1280 30 1610 180"
          />
        ))}
      </svg>

      {/* Siluet foto di depan wordmark */}
      <m.div
        style={{ y: reduceMotion ? 0 : silhouetteY, scale: reduceMotion ? 1 : silhouetteScale }}
        className="hero-silhouette-wrap pointer-events-none absolute inset-x-0 bottom-[max(5.75rem,calc(4.75rem+env(safe-area-inset-bottom)))] z-[20] flex justify-center md:bottom-0"
        aria-hidden="true"
      >
        <m.div
          initial={{ y: 36, scale: 0.95 }}
          animate={
            ready
              ? { y: 0, scale: 1 }
              : { y: 36, scale: 0.95 }
          }
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="flex justify-center"
        >
          <Image
            src={silhouette}
            alt=""
            priority
            sizes="(min-width: 768px) 720px, 85vw"
            className="hero-silhouette h-auto -scale-x-100 w-[min(145vw,78svh)] max-w-none md:w-[min(720px,88svh)] md:translate-x-[8%] md:translate-y-[8%]"
          />
        </m.div>
      </m.div>

      {/* Wordmark and portrait have separate layers to keep the lettering behind the photo. */}
      <div className="hero-title-layout relative z-[10] mx-auto flex h-[100svh] max-w-[1120px] flex-col justify-end px-5 pb-[max(7rem,calc(6rem+env(safe-area-inset-bottom)))] pt-24 md:px-8 md:pb-10">
        {/* Layer belakang (z-0): wordmark "hafiz aryan" dengan editorial mask reveal */}
        <m.h1
          style={{ y: reduceMotion ? 0 : wordmarkY, opacity: reduceMotion ? 1 : wordmarkOpacity }}
          aria-label={t("name")}
          className="hero-wordmark relative z-[10] select-none whitespace-nowrap font-semibold lowercase text-accent"
        >
          <span aria-hidden="true" className={ready ? "hero-writing is-ready" : "hero-writing"}>
            {["hafiz", "aryan"].map((word, wordIndex) => (
              <span key={word}>
                {wordIndex > 0 && " "}
                <span className="hero-writing-word">
                  <span className="hero-writing-measure">{word}</span>
                  <svg className="hero-writing-svg" width="100%" height="100%">
                    <text x="0" y="0.8em" textLength="100%" lengthAdjust="spacingAndGlyphs">
                      {Array.from(word).map((letter, index) => (
                        <tspan key={index} style={{ animationDelay: `${(wordIndex * 5 + index) * 0.18}s` }}>{letter}</tspan>
                      ))}
                    </text>
                  </svg>
                </span>
              </span>
            ))}
          </span>
        </m.h1>

      </div>
    </section>
  );
}
