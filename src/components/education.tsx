"use client";

import { useTranslations } from "next-intl";

type Entry = {
  key: string;
  period: string;
};

const entries: Entry[] = [
  { key: "degree", period: "2021 - 2025" },
];

export function Education() {
  const t = useTranslations("education");

  return (
    <section
      id="education"
      className="mx-auto max-w-[1120px] scroll-mt-0 px-5 py-10 md:px-8 md:py-14"
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
                  className="absolute left-0 top-1.5 size-2.5 -translate-x-1/2 rounded-full border-2 border-base bg-muted"
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
