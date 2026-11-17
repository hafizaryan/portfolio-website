"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SKELETON_MAX_WAIT_MS } from "@/lib/use-site-ready";

const MIN_VISIBLE_MS = 250;
const FONT_WAIT_CAP_MS = 500;
const FADE_MS = 300;

type SiteWindow = Window & { __siteReady?: boolean };

export function SiteSkeleton() {
  const pathname = usePathname();
  const isRootRedirect = pathname === "/";
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (isRootRedirect) return;

    const startedAt = performance.now();
    let cancelled = false;
    let done = false;
    let hideTimer: number | undefined;
    let maxTimer: number | undefined;
    let fontTimer: number | undefined;
    let cleanupHeroImg: (() => void) | undefined;

    const reveal = () => {
      if (cancelled) return;
      setHidden(true);
      (window as SiteWindow).__siteReady = true;
      window.dispatchEvent(new Event("site-skeleton-hidden"));
    };

    const dismiss = (skipMinDelay = false) => {
      if (done || cancelled) return;
      done = true;
      window.clearTimeout(maxTimer);
      window.clearTimeout(fontTimer);
      cleanupHeroImg?.();

      const remaining = skipMinDelay
        ? 0
        : Math.max(0, MIN_VISIBLE_MS - (performance.now() - startedAt));

      if (remaining === 0) {
        reveal();
      } else {
        hideTimer = window.setTimeout(reveal, remaining);
      }
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const hasSectionHash = Boolean(
      window.location.hash && window.location.hash !== "#top",
    );
    const heroSection = document.querySelector("#top");

    // Skip splash delay when not at the Hero (e.g. 404, deep-link hash, or scrolled reload).
    if (!heroSection || window.scrollY > 80 || hasSectionHash || reduceMotion) {
      dismiss(true);
      if (reduceMotion) setRemoved(true);
      return;
    }

    maxTimer = window.setTimeout(() => dismiss(false), SKELETON_MAX_WAIT_MS);

    const heroImg =
      heroSection.querySelector<HTMLImageElement>("img.hero-silhouette");

    const waitForHeroImage = (): Promise<void> => {
      if (!heroImg) return Promise.resolve();
      if (heroImg.complete) {
        return typeof heroImg.decode === "function"
          ? heroImg.decode().catch(() => undefined)
          : Promise.resolve();
      }
      return new Promise((resolve) => {
        const onSettled = () => {
          cleanup();
          if (typeof heroImg.decode === "function") {
            heroImg.decode().catch(() => undefined).finally(resolve);
          } else {
            resolve();
          }
        };
        const onError = () => {
          cleanup();
          resolve();
        };
        const cleanup = () => {
          heroImg.removeEventListener("load", onSettled);
          heroImg.removeEventListener("error", onError);
        };
        cleanupHeroImg = cleanup;
        heroImg.addEventListener("load", onSettled, { once: true });
        heroImg.addEventListener("error", onError, { once: true });
      });
    };

    // Cap font readiness so slow third-party icon CDNs never stall the Hero reveal.
    const waitForPrimaryFont = (): Promise<void> => {
      if (!document.fonts?.ready) return Promise.resolve();
      return new Promise((resolve) => {
        fontTimer = window.setTimeout(resolve, FONT_WAIT_CAP_MS);
        document.fonts.ready.then(
          () => {
            window.clearTimeout(fontTimer);
            resolve();
          },
          () => {
            window.clearTimeout(fontTimer);
            resolve();
          },
        );
      });
    };

    Promise.all([waitForHeroImage(), waitForPrimaryFont()]).then(() => {
      dismiss(false);
    });

    return () => {
      cancelled = true;
      cleanupHeroImg?.();
      window.clearTimeout(maxTimer);
      window.clearTimeout(fontTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, [isRootRedirect]);

  useEffect(() => {
    if (!hidden || removed) return;
    const removeTimer = window.setTimeout(() => setRemoved(true), FADE_MS + 40);
    return () => window.clearTimeout(removeTimer);
  }, [hidden, removed]);

  if (isRootRedirect || removed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onTransitionEnd={(e) => {
        if (
          e.target === e.currentTarget &&
          e.propertyName === "opacity" &&
          hidden
        ) {
          setRemoved(true);
        }
      }}
      className={`site-skeleton${hidden ? " is-hidden" : ""}`}
    >
      <span className="sr-only">Loading</span>

      {/* Desktop top navbar skeleton (floating pill) */}
      <div className="fixed inset-x-0 top-4 z-10 hidden px-4 md:block">
        <div className="mx-auto flex h-[50px] max-w-[1120px] items-center justify-between rounded-full border border-rule/80 bg-surface/85 px-4">
          <div className="sk-block h-8 w-8 rounded-full" />
          <div className="flex items-center gap-5">
            <div className="sk-block h-3 w-11" />
            <div className="sk-block h-3 w-16" />
            <div className="sk-block h-3 w-14" />
            <div className="sk-block h-3 w-14" />
            <div className="sk-block h-3 w-12" />
            <div className="flex items-center gap-2 border-l border-rule/80 pl-3">
              <div className="sk-block h-6 w-14 rounded-lg" />
              <div className="sk-block h-7 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile skeleton: wordmark penuh, tagline, tombol bahasa, & bottom dock */}
      <div className="relative isolate mx-auto flex h-[100svh] max-w-[1120px] flex-col justify-end overflow-hidden px-5 pb-28 pt-24 md:hidden">
        <div
          aria-hidden="true"
          className="relative z-0 flex w-full shrink-0 items-end gap-[3%]"
        >
          <div className="sk-block h-[clamp(2rem,min(15.2vw,(100svh-390px)),5rem)] w-[44%] rounded-xl" />
          <div className="sk-block h-[clamp(2rem,min(15.2vw,(100svh-390px)),5rem)] w-[49%] rounded-xl" />
        </div>

        <div className="relative z-[2] mt-6 shrink-0 space-y-2.5">
          <div className="sk-block h-6 w-[78%] max-w-[17rem]" />
          <div className="sk-block h-6 w-[55%] max-w-[12rem]" />
        </div>
      </div>
      <div className="sk-block fixed bottom-24 right-6 h-12 w-12 rounded-full md:hidden" />
      <div className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] px-4 md:hidden">
        <div className="mx-auto grid h-[60px] max-w-[420px] grid-cols-4 gap-1 rounded-full border border-rule/80 bg-surface/90 p-1.5">
          <div className="flex flex-col items-center justify-center gap-1 rounded-full bg-base/60 py-1">
            <div className="sk-block h-4 w-4 rounded-full" />
            <div className="sk-block h-2 w-8" />
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-full py-1">
            <div className="sk-block h-4 w-4 rounded-full" />
            <div className="sk-block h-2 w-10" />
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-full py-1">
            <div className="sk-block h-4 w-4 rounded-full" />
            <div className="sk-block h-2 w-9" />
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-full py-1">
            <div className="sk-block h-4 w-4 rounded-full" />
            <div className="sk-block h-2 w-9" />
          </div>
        </div>
      </div>

      {/* Desktop hero skeleton: wordmark, tagline & scroll cue */}
      <div className="relative isolate mx-auto hidden h-[100svh] max-w-[1120px] flex-col justify-end overflow-hidden px-8 pb-10 pt-24 md:flex">
        <div
          aria-hidden="true"
          className="relative z-0 flex w-full shrink-0 items-end gap-[3%]"
        >
          <div className="sk-block h-[clamp(2rem,min((100vw-64px)/5.75,(100svh-160px-16svh)),11.6rem)] w-[43%] rounded-2xl" />
          <div className="h-[clamp(2rem,min((100vw-64px)/5.75,(100svh-160px-16svh)),11.6rem)] w-[50%] rounded-2xl border-2 border-[var(--sk-base)] bg-base/40" />
        </div>

        <div className="relative z-[2] mt-[2.5svh] shrink-0 space-y-2.5">
          <div className="sk-block h-[clamp(1.1rem,3.4svh,1.65rem)] w-[22rem] max-w-[65%]" />
          <div className="sk-block h-[clamp(1.1rem,3.4svh,1.65rem)] w-[14.5rem] max-w-[45%]" />
        </div>

        <div className="absolute bottom-10 right-8 z-[2] inline-flex items-center gap-3">
          <div className="sk-block h-3 w-12" />
          <div className="sk-block h-6 w-3.5 rounded-full" />
        </div>
      </div>
    </div>
  );
}
