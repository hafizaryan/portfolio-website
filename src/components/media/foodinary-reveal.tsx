"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import foodinary from "@/assets/portfolio/foodinary.png";

export function FoodinaryReveal({
  alt,
  chipLabel,
}: {
  alt: string;
  chipLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group/food relative h-full w-full overflow-hidden bg-[#0c0e12]"
    >
      <Image
        src={foodinary}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 640px"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover/food:scale-[1.03]"
        placeholder="blur"
      />

      {/* Subtle scanner laser beam */}
      {shown && (
        <div
          className="scan-beam pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_rgba(52,211,153,0.8)]"
          aria-hidden="true"
        />
      )}

      {/* Tech tag in top right */}
      <div className="absolute right-3 top-3 flex items-center rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[11px] text-zinc-300 backdrop-blur-md">
        <span>ML Classification</span>
      </div>

      {/* Detected recipe pill in bottom left */}
      <div
        data-shown={shown}
        className="recipe-reveal absolute bottom-4 left-4 flex items-center rounded-lg border border-white/15 bg-black/75 px-3.5 py-2 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-md"
      >
        <span>{chipLabel}</span>
      </div>
    </div>
  );
}
