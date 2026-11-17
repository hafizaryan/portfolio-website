import { useTranslations } from "next-intl";
import { MotionReveal } from "./motion-reveal";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      className="mx-auto max-w-[1120px] scroll-mt-0 px-5 py-12 md:px-8 md:py-16"
    >
      <div className="contact-card rounded-[2rem] p-8 md:p-12">
        <MotionReveal className="flex flex-col">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-[46ch] text-muted">{t("lead")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:mail@hafizaryansiregar.my.id"
              className="inline-flex items-center gap-2 rounded-md border border-rule px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              <i className="fa-solid fa-envelope" aria-hidden="true" />
              mail@hafizaryansiregar.my.id
            </a>
            <a
              href="https://github.com/hafizaryan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-rule px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              <i className="fa-brands fa-github" aria-hidden="true" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hafizaryan/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-rule px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              <i className="fa-brands fa-linkedin" aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
