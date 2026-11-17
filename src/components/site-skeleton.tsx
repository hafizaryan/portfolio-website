"use client";

import { useEffect, useState } from "react";

const MIN_VISIBLE_MS = 500;
const MAX_WAIT_MS = 6000;
const FADE_MS = 380;

export function SiteSkeleton() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();
    let done = false;
    let hideTimer: number | undefined;
    let maxTimer: number | undefined;

    const dismiss = () => {
      if (done) return;
      done = true;
      window.clearTimeout(maxTimer);
      const remaining = Math.max(
        0,
        MIN_VISIBLE_MS - (performance.now() - startedAt),
      );
      hideTimer = window.setTimeout(() => setHidden(true), remaining);
    };

    maxTimer = window.setTimeout(dismiss, MAX_WAIT_MS);

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }

    return () => {
      window.removeEventListener("load", dismiss);
      window.clearTimeout(maxTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (!hidden) return;
    const removeTimer = window.setTimeout(() => setRemoved(true), FADE_MS);
    return () => window.clearTimeout(removeTimer);
  }, [hidden]);

  if (removed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`site-skeleton${hidden ? " is-hidden" : ""}`}
    >
      <span className="sr-only">Loading</span>

      {/* Hero: latar & ukuran sama dengan .hero-poster */}
      <div className="hero-poster absolute inset-0">
        <div className="mx-auto flex h-[100svh] max-w-[1120px] flex-col justify-end px-5 pb-28 pt-24 md:px-8 md:pb-10">
          {/* Wordmark: font-size ikut .hero-wordmark, jadi ukuran pakai em */}
          <div className="hero-wordmark">
            <div className="sk-block h-[0.72em] w-[4.3em] max-w-full rounded-xl" />
          </div>

          {/* Tagline: 2 baris di mobile, ukuran ikut .hero-tagline di desktop */}
          <div className="hero-tagline mt-6 max-w-[22ch] text-2xl leading-tight">
            <div className="sk-block h-[0.9em] w-[15ch]" />
            <div className="sk-block mt-[0.3em] h-[0.9em] w-[9ch]" />
          </div>
        </div>
      </div>

      {/* Desktop top navbar skeleton (floating glass pill) */}
      <header className="fixed inset-x-0 top-4 z-10 hidden px-4 md:block">
        <nav className="navbar-glass mx-auto flex h-[50px] max-w-[1120px] items-center justify-between rounded-full px-4">
          <div className="sk-block sk-glass h-8 w-8 rounded-full" />
          <div className="flex items-center gap-5">
            <div className="sk-block sk-glass h-2.5 w-10" />
            <div className="sk-block sk-glass h-2.5 w-16" />
            <div className="sk-block sk-glass h-2.5 w-14" />
            <div className="sk-block sk-glass h-2.5 w-14" />
            <div className="sk-block sk-glass h-2.5 w-12" />
            <div className="flex items-center gap-2 border-l border-white/15 pl-3">
              <div className="sk-block sk-glass h-6 w-10 rounded-full" />
              <div className="sk-block sk-glass h-7 w-16 rounded-full" />
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile dock */}
      <div className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-10 px-4 md:hidden">
        <div className="navbar-glass mx-auto grid max-w-[420px] grid-cols-4 gap-1 rounded-full p-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1 py-1.5">
              <div className="sk-block sk-glass h-5 w-5 rounded-md" />
              <div className="sk-block sk-glass h-2 w-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
