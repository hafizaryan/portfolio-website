"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { m, useScroll, useTransform } from "motion/react";
import { useSiteReady } from "@/lib/use-site-ready";
import silhouette from "../assets/foto-profil-siluet-hero.png";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const ready = useSiteReady();

  // Scroll-linked depth parallax antar 3 layer (wordmark, siluet, tagline).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const wordmarkY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);
  const silhouetteY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const silhouetteScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);
  const taglineY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-poster relative isolate overflow-hidden"
    >
      {/* Ambient breathing aura di belakang siluet */}
      <m.div
        aria-hidden="true"
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-[42%] z-0 h-[52svh] w-[52svh] -translate-x-1/2 -translate-y-1/2 rounded-full md:h-[64svh] md:w-[64svh]"
        style={{
          background:
            "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
        }}
      />

      {/* Layer tengah (z-[1]): siluet foto di depan wordmark, di belakang tagline */}
      <m.div
        style={{ y: silhouetteY, scale: silhouetteScale }}
        className="hero-silhouette-wrap pointer-events-none absolute inset-x-0 bottom-[17rem] z-[1] flex justify-center md:bottom-0"
        aria-hidden="true"
      >
        <m.div
          initial={{ opacity: 0, y: 36, scale: 0.95 }}
          animate={
            ready
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 36, scale: 0.95 }
          }
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="flex justify-center"
        >
          <Image
            src={silhouette}
            alt=""
            priority
            sizes="(min-width: 768px) 720px, 85vw"
            className="hero-silhouette h-auto -scale-x-100 w-[min(130vw,calc(100svh-22rem))] max-w-none md:w-[min(720px,88svh)] md:translate-x-[8%] md:translate-y-[8%]"
          />
        </m.div>
      </m.div>

      {/* Tanpa z-index agar tidak membuat stacking context: wordmark bisa turun ke bawah siluet */}
      <div className="relative mx-auto flex h-[100svh] max-w-[1120px] flex-col justify-end px-5 pb-28 pt-24 md:px-8 md:pb-10">
        {/* Layer belakang (z-0): wordmark "hafiz aryan" dengan editorial mask reveal */}
        <m.h1
          style={{ y: wordmarkY, opacity: wordmarkOpacity }}
          aria-label={t("name")}
          className="hero-wordmark relative z-0 select-none whitespace-nowrap font-semibold lowercase text-accent"
        >
          <span aria-hidden="true">
            <span className="inline-block overflow-hidden align-bottom pt-[0.12em] -mt-[0.12em] pb-[0.18em] -mb-[0.18em]">
              <m.span
                className="inline-block"
                initial={{ y: "115%" }}
                animate={ready ? { y: "0%" } : { y: "115%" }}
                transition={{ duration: 0.7, delay: 0.06, ease: EASE_OUT }}
              >
                hafiz
              </m.span>
            </span>{" "}
            <span className="inline-block overflow-hidden align-bottom pt-[0.12em] -mt-[0.12em] pb-[0.18em] -mb-[0.18em]">
              <m.span
                className="hero-outline-accent inline-block"
                initial={{ y: "115%" }}
                animate={ready ? { y: "0%" } : { y: "115%" }}
                transition={{ duration: 0.7, delay: 0.16, ease: EASE_OUT }}
              >
                aryan
              </m.span>
            </span>
          </span>
        </m.h1>

        {/* Layer depan (z-[2]): tagline */}
        <m.p
          style={{ y: taglineY, opacity: taglineOpacity }}
          className="hero-tagline relative z-[2] mt-6 max-w-[22ch] text-2xl font-semibold leading-tight tracking-tight"
        >
          <m.span
            className="block"
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={
              ready
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 16, filter: "blur(4px)" }
            }
            transition={{ duration: 0.6, delay: 0.28, ease: EASE_OUT }}
          >
            {t("taglineLead")}{" "}
            <span className="text-accent">{t("taglineAccent")}</span>
          </m.span>
        </m.p>

        {/* Scroll cue kontinu di sudut kanan bawah Hero (desktop) */}
        <m.a
          href="#about"
          aria-label="Scroll to about section"
          style={{ opacity: taglineOpacity }}
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-10 right-8 z-[2] hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent md:inline-flex"
        >
          <span>Scroll</span>
          <m.span
            aria-hidden="true"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex h-6 w-3.5 items-start justify-center rounded-full border border-current p-1"
          >
            <span className="h-1.5 w-0.5 rounded-full bg-current" />
          </m.span>
        </m.a>
      </div>
    </section>
  );
}
