"use client";

import { useTranslations } from "next-intl";
import { MotionReveal } from "./motion-reveal";

type Entry = {
  key: "codingcamp" | "bangkit";
  period: string;
};

const entries: Entry[] = [
  { key: "codingcamp", period: "Jan - Jun 2025" },
  { key: "bangkit", period: "Aug 2024 - Jan 2025" },
];

export function Bootcamp() {
  const t = useTranslations("bootcamp");

  return (
    <section
      id="bootcamp"
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
              delay={i * 0.06}
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
                <span
                  className="absolute left-0 top-1.5 z-10 size-2.5 -translate-x-1/2 rounded-full border-2 border-base bg-muted"
                  aria-hidden="true"
                />
                <h3 className="font-medium transition-colors hover:text-accent">
                  {t(`items.${entry.key}.role`)}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {t(`items.${entry.key}.org`)}
                </p>
              </div>
            </MotionReveal>
          );
        })}
      </ol>
    </section>
  );
}
