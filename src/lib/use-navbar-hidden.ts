"use client";

import { useSyncExternalStore } from "react";

const HIDE_SCROLL_THRESHOLD = 160;
const SHOW_SCROLL_THRESHOLD = 120;

let hidden = false;
let marqueeStuck = false;
let lastY = 0;
let delta = 0;
const listeners = new Set<() => void>();
const stuckListeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function notifyStuck() {
  for (const listener of stuckListeners) listener();
}

function setHidden(next: boolean) {
  if (hidden === next) return;
  hidden = next;
  notify();
}

export function setMarqueeStuck(next: boolean) {
  if (marqueeStuck === next) return;
  marqueeStuck = next;
  notifyStuck();
}

function onScroll() {
  const currentY = Math.max(window.scrollY, 0);

  if (currentY <= 0) {
    delta = 0;
    lastY = 0;
    setHidden(false);
    return;
  }

  const diff = currentY - lastY;
  lastY = currentY;
  if (diff === 0) return;

  if (diff > 0) {
    delta = delta > 0 ? delta + diff : diff;
    if (delta >= HIDE_SCROLL_THRESHOLD) {
      delta = HIDE_SCROLL_THRESHOLD;
      setHidden(true);
    }
  } else {
    delta = delta < 0 ? delta + diff : diff;
    if (delta <= -SHOW_SCROLL_THRESHOLD) {
      delta = -SHOW_SCROLL_THRESHOLD;
      setHidden(false);
    }
  }
}

function subscribe(listener: () => void) {
  if (listeners.size === 0 && typeof window !== "undefined") {
    lastY = Math.max(window.scrollY, 0);
    delta = 0;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("scroll", onScroll);
    }
  };
}

function getSnapshot() {
  return hidden;
}

function getServerSnapshot() {
  return false;
}

/**
 * Tracks whether the desktop navbar should be hidden based on scroll direction
 * (~160px down to hide, ~120px up to show, always visible at the top).
 */
export function useNavbarHidden(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function subscribeStuck(listener: () => void) {
  stuckListeners.add(listener);
  return () => {
    stuckListeners.delete(listener);
  };
}

function getStuckSnapshot() {
  return marqueeStuck;
}

/**
 * Tracks whether MarqueeStrip is currently stuck at the top of the viewport.
 */
export function useMarqueeStuck(): boolean {
  return useSyncExternalStore(subscribeStuck, getStuckSnapshot, getServerSnapshot);
}
