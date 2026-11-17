"use client";

import { useEffect, useRef } from "react";
import { setMarqueeStuck } from "@/lib/use-navbar-hidden";

export function MarqueeStrip() {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const update = () => {
      setMarqueeStuck(sentinel.getBoundingClientRect().top <= 0);
    };

    update();
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setMarqueeStuck(entry.boundingClientRect.top <= 0);
      },
      { threshold: 0 },
    );
    observer.observe(sentinel);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      setMarqueeStuck(false);
    };
  }, []);

  const items = [
    "Web Development",
    "Cloud Computing",
    "Data Engineering",
    "Computer Vision",
    "Full-Stack Architecture",
    "AI Integration",
  ];

  const renderGroup = (prefix: string) => (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((item) => (
        <span
          key={`${prefix}-${item}`}
          className="inline-flex items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-muted"
        >
          <span>{item}</span>
          <span className="h-1 w-1 rounded-full bg-accent/70" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-0 w-full" />
      <div
        aria-hidden="true"
        className="sticky top-0 z-50 border-y border-rule-subtle bg-surface/85 backdrop-blur-md select-none"
      >
        <div className="marquee-mask relative overflow-hidden py-3.5">
          <div className="marquee-track flex w-max">
            {renderGroup("a")}
            {renderGroup("b")}
          </div>
        </div>
      </div>
    </>
  );
}
