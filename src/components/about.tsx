import Image from "next/image";
import { useTranslations } from "next-intl";
import portrait from "@/assets/portrait.jpg";

export function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="mx-auto max-w-[1120px] scroll-mt-0 px-5 pb-10 pt-8 md:px-8 md:pb-16 md:pt-12"
    >
      <div className="grid gap-10 border-t border-rule pt-4 md:grid-cols-[0.25fr_0.75fr] md:items-start md:gap-16 md:pt-6">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {t("title")}
        </h2>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_14rem] md:items-start md:gap-14">
          <div className="max-w-[52ch] text-lg leading-8 text-muted md:text-xl">
            <p>{t("intro")}</p>
            <p className="mt-6">{t("focus")}</p>
          </div>
          <div className="about-photo hidden w-full overflow-hidden rounded-2xl bg-base md:block">
            <Image
              src={portrait}
              alt={t("title")}
              sizes="(max-width: 768px) 100vw, 14rem"
              className="aspect-square h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
