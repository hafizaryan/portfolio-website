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

      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5 md:px-8">
        <div className="sk-block h-8 w-40" />
        <div className="hidden items-center gap-8 md:flex">
          <div className="sk-block h-3 w-16" />
          <div className="sk-block h-3 w-12" />
          <div className="sk-block h-3 w-14" />
          <div className="sk-block h-3 w-16" />
          <div className="sk-block h-8 w-24" />
        </div>
      </div>

      <div className="mx-auto grid max-w-[1120px] items-center gap-14 px-5 pt-16 md:px-8 md:pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <div className="sk-block h-14 w-[86%] md:h-20" />
          <div className="sk-block mt-3 h-14 w-[58%] md:h-20" />

          <div className="mt-8 space-y-3">
            <div className="sk-block h-5 w-full max-w-[27rem]" />
            <div className="sk-block h-5 w-[70%] max-w-[20rem]" />
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <div className="sk-block h-11 w-36" />
            <div className="sk-block h-11 w-32" />
          </div>

          <div className="mt-8 flex gap-6">
            <div className="sk-block h-4 w-14" />
            <div className="sk-block h-4 w-16" />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[18rem] sm:max-w-[22rem] lg:max-w-[24rem]">
          <div className="sk-block aspect-square w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
