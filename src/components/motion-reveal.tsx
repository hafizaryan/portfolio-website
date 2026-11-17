"use client";

import type { CSSProperties, ReactNode } from "react";
import { m } from "motion/react";

type Direction = "up" | "left" | "right" | "none";
type TagName = "div" | "h1" | "p" | "dl" | "li";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 22 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

const TAG_COMPONENTS = {
  div: m.div,
  h1: m.h1,
  p: m.p,
  dl: m.dl,
  li: m.li,
} as const;

type MotionRevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  scale?: number;
  blur?: boolean;
  immediate?: boolean;
  amount?: number;
  as?: TagName;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
};

/**
 * Scroll-triggered (or immediate) in/out reveal wrapper using Framer Motion.
 * Uses `viewport={{ once: false }}` so elements animate both in and out on scroll.
 */
export function MotionReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  scale = 1,
  blur = false,
  immediate = false,
  amount = 0.15,
  as = "div",
  className,
  style,
  "aria-label": ariaLabel,
}: MotionRevealProps) {
  const Component = TAG_COMPONENTS[as];
  const { x, y } = OFFSETS[direction];

  const hiddenState = {
    opacity: 0,
    x,
    y,
    ...(scale !== 1 ? { scale } : {}),
    ...(blur ? { filter: "blur(4px)" } : {}),
  };

  const visibleState = {
    opacity: 1,
    x: 0,
    y: 0,
    ...(scale !== 1 ? { scale: 1 } : {}),
    ...(blur ? { filter: "blur(0px)" } : {}),
  };

  const transition = {
    duration,
    delay,
    ease: EASE_OUT,
  };

  if (immediate) {
    return (
      <Component
        initial={hiddenState}
        animate={visibleState}
        transition={transition}
        className={className}
        style={style}
        aria-label={ariaLabel}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      initial={hiddenState}
      whileInView={visibleState}
      viewport={{ once: false, amount }}
      transition={transition}
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  );
}
