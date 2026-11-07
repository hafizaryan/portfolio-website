"use client";

import { useTranslations } from "next-intl";

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
      className="mx-auto max-w-[1120px] scroll-mt-0 border-t border-rule px-5 py-12 md:px-8 md:py-16"
    >
      <div data-aos="fade-up">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-3 max-w-[52ch] text-muted">{t("lead")}</p>
      </div>

      <ol className="mt-12">
        {entries.map((entry, i) => {
          const isLast = i === entries.length - 1;
          return (
            <li
              key={entry.key}
              data-aos="fade-up"
              data-aos-delay={Math.min(i * 60, 240)}
              className="grid grid-cols-1 gap-2 sm:grid-cols-[9rem_1fr] sm:gap-8"
            >
              <div className="font-mono text-xs text-muted sm:pt-1.5 sm:text-right">
                {entry.period}
              </div>

              <div
                className={`relative border-l pl-6 sm:pl-7 ${
                  isLast ? "border-transparent pb-0" : "border-rule pb-8"
                }`}
              >
                <span
                  className={`absolute left-0 top-1.5 size-2.5 -translate-x-1/2 rounded-full border-2 border-base ${
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
            </li>
          );
        })}
      </ol>
    </section>
  );
}
