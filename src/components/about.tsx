import { useTranslations } from "next-intl";
import { MotionReveal } from "./motion-reveal";

const HIGHLIGHT_KEYS = ["experience", "programs", "scope"] as const;

export function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="relative z-10 mx-auto max-w-[1120px] scroll-mt-0 px-5 py-10 md:px-8 md:py-14"
    >
      <div className="grid gap-10 md:grid-cols-[0.25fr_0.75fr] md:items-start md:gap-16">
        <MotionReveal>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {t("title")}
          </h2>
        </MotionReveal>

        <div>
          <MotionReveal
            as="p"
            delay={0.08}
            className="text-base font-medium leading-7 text-ink md:text-lg"
          >
            {t("intro")}
          </MotionReveal>
          <p className="mt-4 text-base leading-7 text-muted">
            {t("focus")}
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {HIGHLIGHT_KEYS.map((key, i) => (
              <MotionReveal
                key={key}
                delay={0.16 + i * 0.06}
                className="border-t border-rule pt-4"
              >
                <dt className="text-base font-semibold tracking-tight text-ink md:text-lg">
                  {t(`highlights.${key}.value`)}
                </dt>
                <dd className="mt-1 text-xs text-muted md:text-sm">
                  {t(`highlights.${key}.label`)}
                </dd>
              </MotionReveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
