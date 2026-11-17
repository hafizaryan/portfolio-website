"use client";

import { useEffect, useState } from "react";

export const SKELETON_MAX_WAIT_MS = 2000;
export const SKELETON_FALLBACK_MS = SKELETON_MAX_WAIT_MS + 400;

type SiteWindow = Window & { __siteReady?: boolean };

/**
 * Returns true once SiteSkeleton has started dismissing (or after the safety
 * fallback expires), synchronizing initial entrance animations with the reveal.
 */
export function useSiteReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const win = window as SiteWindow;
    if (win.__siteReady) {
      setReady(true);
      return;
    }

    const onReady = () => setReady(true);
    window.addEventListener("site-skeleton-hidden", onReady, { once: true });
    // Safety fallback if the skeleton is disabled or missed before mount.
    const fallback = window.setTimeout(onReady, SKELETON_FALLBACK_MS);

    return () => {
      window.removeEventListener("site-skeleton-hidden", onReady);
      window.clearTimeout(fallback);
    };
  }, []);

  return ready;
}
