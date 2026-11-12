import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="mx-auto max-w-[1120px] scroll-mt-0 px-5 py-10 md:px-8 md:py-14"
    >
      <div className="grid gap-10 md:grid-cols-[0.25fr_0.75fr] md:items-start md:gap-16">
        <h2 data-aos="fade-up" data-aos-anchor-placement="top-center" className="text-3xl font-semibold tracking-tight md:text-4xl">
          {t("title")}
        </h2>
        <div data-aos="fade-up" data-aos-anchor-placement="top-center" data-aos-delay="100" className="max-w-[52ch] text-lg leading-8 text-muted md:text-xl">
          <p>{t("intro")}</p>
          <p className="mt-6">{t("focus")}</p>
        </div>
      </div>
    </section>
  );
}
