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

      {/* Desktop top navbar skeleton (floating pill) */}
      <div className="fixed inset-x-0 top-4 z-10 hidden px-4 md:block">
        <div className="mx-auto flex h-[50px] max-w-[1120px] items-center justify-between rounded-full border border-rule/60 px-4">
          <div className="sk-block h-8 w-8 !rounded-full" />
          <div className="flex items-center gap-5">
            <div className="sk-block h-3 w-12" />
            <div className="sk-block h-3 w-16" />
            <div className="sk-block h-3 w-14" />
            <div className="sk-block h-3 w-14" />
            <div className="sk-block h-3 w-12" />
            <div className="flex items-center gap-2 border-l border-rule/60 pl-3">
              <div className="sk-block h-6 w-14 !rounded-lg" />
              <div className="sk-block h-7 w-20 !rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile skeleton: tanpa top navbar, dengan bottom dock & tombol bahasa */}
      <div className="mx-auto flex h-[100svh] max-w-[1120px] flex-col justify-end px-5 pb-28 pt-10 md:hidden">
        <div className="mx-auto mb-auto mt-8 w-full max-w-[17rem]">
          <div className="sk-block aspect-square w-full rounded-2xl" />
        </div>
        <div className="sk-block h-12 w-[82%]" />
        <div className="mt-5 space-y-2.5">
          <div className="sk-block h-5 w-[78%]" />
          <div className="sk-block h-5 w-[55%]" />
        </div>
      </div>
      <div className="sk-block fixed bottom-24 right-6 h-12 w-12 !rounded-full md:hidden" />
      <div className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] px-4 md:hidden">
        <div className="sk-block mx-auto h-[54px] max-w-[420px] !rounded-full" />
      </div>

      {/* Desktop hero skeleton: siluet tengah-bawah + wordmark besar + tagline */}
      <div className="relative mx-auto hidden h-[100svh] max-w-[1120px] flex-col justify-end px-8 pb-10 pt-24 md:flex">
        <div className="mx-auto mb-auto mt-4 w-full max-w-[24rem] lg:max-w-[28rem]">
          <div className="sk-block aspect-[4/5] w-full rounded-2xl" />
        </div>
        <div className="sk-block h-28 w-[88%] lg:h-36" />
        <div className="mt-6 space-y-2.5">
          <div className="sk-block h-6 w-full max-w-[22rem]" />
          <div className="sk-block h-6 w-[65%] max-w-[15rem]" />
        </div>
      </div>
    </div>
  );
}
