"use client";

import { useTranslations } from "next-intl";
import { m } from "motion/react";
import { MotionReveal } from "./motion-reveal";

type Entry = {
  key: string;
  period: string;
};

// Ordered newest to oldest.
const entries: Entry[] = [
  { key: "pertaminaCurrent", period: "Sep 2026 - Present" },
  { key: "pertamina", period: "Aug 2025 - Aug 2026" },
  { key: "lab", period: "2023 - 2025" },
];

export function Experience() {
  const t = useTranslations("experience");

  return (
    <section
      id="experience"
      className="mx-auto max-w-[1120px] scroll-mt-0 px-5 py-10 md:px-8 md:py-14"
    >
      <MotionReveal>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-3 max-w-[52ch] text-muted">{t("lead")}</p>
      </MotionReveal>

      <ol className="mt-12">
        {entries.map((entry, i) => {
          const isLast = i === entries.length - 1;
          return (
            <MotionReveal
              as="li"
              key={entry.key}
              delay={Math.min(i * 0.06, 0.24)}
              className="grid grid-cols-1 gap-2 sm:grid-cols-[9rem_1fr] sm:gap-8"
            >
              <div className="pl-6 font-mono text-xs text-muted sm:pl-0 sm:pt-1.5 sm:text-right">
                {entry.period}
              </div>

              <div
                className={`relative pl-6 sm:pl-7 ${
                  isLast ? "pb-0" : "pb-8"
                }`}
              >
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[11px] -bottom-[11px] w-px -translate-x-1/2 bg-rule"
                  />
                )}
                {entry.key === "pertaminaCurrent" && (
                  <m.span
                    aria-hidden="true"
                    animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute left-0 top-1.5 z-10 size-2.5 -translate-x-1/2 rounded-full bg-accent"
                  />
                )}
                <span
                  className={`absolute left-0 top-1.5 z-10 size-2.5 -translate-x-1/2 rounded-full border-2 border-base ${
                    entry.key === "pertaminaCurrent" ? "bg-accent" : "bg-muted"
                  }`}
                  aria-hidden="true"
                />

                <div className="group">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="font-medium transition-colors group-hover:text-accent">
                      {t(`items.${entry.key}.role`)}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {t(`items.${entry.key}.org`)}
                  </p>
                </div>
              </div>
            </MotionReveal>
          );
        })}
      </ol>
    </section>
  );
}
