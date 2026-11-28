"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useSiteReady } from "@/lib/use-site-ready";
import silhouette from "../assets/foto-profil-siluet-hero.png";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const POINTER_SPRING = { stiffness: 110, damping: 20, mass: 0.6 };

/**
 * Satu layer parallax. scrollRange = geser Y (px) saat hero habis di-scroll;
 * pointerDepth = geser (px) saat kursor di tepi hero. Layer jauh: scroll besar,
 * pointer kecil/berlawanan. Layer dekat: scroll kecil, pointer besar.
 */
function useParallaxLayer(
  scroll: MotionValue<number>,
  pointerX: MotionValue<number>,
  pointerY: MotionValue<number>,
  scrollRange: number,
  pointerDepth: number,
) {
  const x = useTransform(pointerX, (p) => p * pointerDepth);
  const y = useTransform([scroll, pointerY], ([s, p]: number[]) =>
    s * scrollRange + p * pointerDepth,
  );
  return { x, y };
}

export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const ready = useSiteReady();
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Posisi kursor relatif terhadap hero (-0.5..0.5), dihaluskan dengan spring.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, POINTER_SPRING);
  const smoothY = useSpring(pointerY, POINTER_SPRING);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduceMotion) return;
    // Hanya perangkat dengan mouse; layar sentuh cukup parallax scroll.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, pointerX, pointerY]);

  const d = reduceMotion ? 0 : 1;
  // Wrapper kertas dibuat lebih besar dari hero (-inset-24) supaya
  // tepinya tidak terlihat saat digeser.
  const paper = useParallaxLayer(scrollYProgress, smoothX, smoothY, 160 * d, -40 * d);
  const wordmark = useParallaxLayer(scrollYProgress, smoothX, smoothY, 320 * d, 40 * d);
  const silhouetteLayer = useParallaxLayer(scrollYProgress, smoothX, smoothY, 110 * d, 70 * d);

  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);
  const silhouetteScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-poster relative isolate overflow-hidden"
    >
      {/* Wrapper parallax terpisah: .hero-paper sudah memakai transform untuk animasi drift. */}
      <m.div
        aria-hidden="true"
        style={{ x: paper.x, y: paper.y }}
        className="pointer-events-none absolute -inset-24 z-0"
      >
        <div className="hero-paper" />
      </m.div>

      {/* Siluet foto di depan wordmark */}
      <m.div
        style={{
          x: silhouetteLayer.x,
          y: silhouetteLayer.y,
          scale: reduceMotion ? 1 : silhouetteScale,
        }}
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
          style={{ x: wordmark.x, y: wordmark.y, opacity: reduceMotion ? 1 : wordmarkOpacity }}
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
