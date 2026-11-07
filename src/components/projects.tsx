"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

type ProjectKey = "foodinary" | "daisy" | "lab";

type Project = {
  key: ProjectKey;
  repo?: string;
  demo?: string;
  span: string;
  tags: string[];
};

const projects: Project[] = [
  {
    key: "foodinary",
    repo: "https://github.com/foodinary-project",
    demo: "https://foodinary.vercel.app/",
    span: "md:col-span-7",
    tags: ["React", "FastAPI", "TensorFlow", "Cloud Run"],
  },
  {
    key: "daisy",
    repo: "https://github.com/daisy-team",
    demo: "https://daisy-ai-system.vercel.app/",
    span: "md:col-span-5",
    tags: ["Mobile", "TFLite", "FastAPI", "Computer Vision"],
  },
  {
    key: "lab",
    repo: "#",
    demo: "#",
    span: "md:col-span-12",
    tags: ["PHP", "CodeIgniter", "MySQL", "RBAC Architecture"],
  },
];

// Jarak sticky dari atas viewport (match dengan `top-24` = 6rem = 96px).
const STICKY_TOP = 80;

export function Projects() {
  const t = useTranslations("projects");
  const stackRef = useRef<HTMLDivElement>(null);

  // Satu useEffect kecil: progres scale pada kartu yang sedang tertutup.
  useEffect(() => {
    const root = stackRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-stack-card]"),
    );
    if (cards.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const isLast = i === cards.length - 1;

        // Kartu terakhir selalu penuh — tidak pernah diperkecil.
        if (isLast) {
          card.style.setProperty("--stack-progress", "0");
          continue;
        }

        // Seberapa jauh kartu berikutnya sudah menutupi kartu ini.
        const next = cards[i + 1];
        const nextTop = next.getBoundingClientRect().top;
        const start = STICKY_TOP + card.offsetHeight; // mulai saat next menyentuh bawah kartu ini
        const end = STICKY_TOP; // selesai saat next menumpuk penuh di top

        let progress = (start - nextTop) / (start - end);
        progress = Math.min(1, Math.max(0, progress));
        card.style.setProperty("--stack-progress", progress.toFixed(4));
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="projects"
      className="projects-section mx-auto max-w-[1120px] scroll-mt-0 px-5 py-12 md:px-8 md:py-16"
    >
      <div className="project-layout">
        <div className="project-index">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-[32ch] text-muted">{t("lead")}</p>
          <ol className="mt-10 border-l border-rule">
            {projects.map((project, index) => (
              <li
                key={project.key}
                className="flex items-center gap-3 py-3 pl-5 text-sm text-muted"
              >
                <span className="font-mono text-[11px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{t(`${project.key}.name`)}</span>
              </li>
            ))}
          </ol>
        </div>

        <div ref={stackRef} className="project-stack">
          {projects.map((p, idx) => {
            const isLast = idx === projects.length - 1;
            return (
              <article
                key={p.key}
                data-stack-card
                className={`project-card project-card--${p.key} group min-w-0 w-full origin-top overflow-hidden rounded-[1.75rem] border border-rule bg-surface p-6 transition-[border-color] duration-300 hover:border-ink/30 md:p-10`}
                style={
                  {
                    transform:
                      "scale(calc(1 - 0.02 * var(--stack-progress, 0)))",
                    boxShadow:
                      "0 calc(8px * var(--stack-progress, 0)) calc(24px * var(--stack-progress, 0)) rgba(0,0,0,calc(0.14 * var(--stack-progress, 0)))",
                    top: `${80 + idx * 60}px`,
                    zIndex: idx + 1,
                    willChange: isLast ? undefined : "transform, box-shadow",
                  } as React.CSSProperties
                }
              >
                <div className="flex min-h-[321px] flex-col justify-between gap-8">
                  <div className="flex flex-col items-start gap-5 md:flex-row md:items-start md:justify-between md:gap-6">
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                      {t(`${p.key}.name`)}
                    </h3>
                    {(p.repo || p.demo) && (
                      <div className="flex shrink-0 flex-wrap gap-2">
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md border border-rule bg-base px-3 py-1.5 text-sm font-medium transition-colors hover:border-ink hover:text-ink"
                        >
                          <i className="fa-brands fa-github mr-2" aria-hidden="true" />
                          {t("repo")}
                        </a>
                      )}
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md border border-rule bg-base px-3 py-1.5 text-sm font-medium transition-colors hover:border-ink hover:text-ink"
                        >
                          <i className="fa-solid fa-globe mr-2" aria-hidden="true" />
                          {t("demo")}
                        </a>
                      )}
                      </div>
                    )}
                  </div>
                  <div className="max-w-[54ch]">
                    <p className="text-sm leading-6 text-muted md:text-base">
                      {t(`${p.key}.desc`)}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-rule bg-base px-2 py-0.5 font-mono text-[11px] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
          <article
            data-stack-card
            className="project-card project-card--github group min-w-0 w-full origin-top overflow-hidden rounded-[1.75rem] border border-rule p-6 transition-[border-color] duration-300 hover:border-ink/30 md:p-10"
            style={
              {
                top: `${80 + projects.length * 60}px`,
                zIndex: projects.length + 1,
              } as React.CSSProperties
            }
          >
            <div className="flex min-h-[321px] flex-col items-center justify-center gap-6 text-center">
              <i className="fa-brands fa-github text-4xl" aria-hidden="true" />
              <a
                href="https://github.com/hafizaryan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold tracking-tight underline-offset-4 hover:underline md:text-2xl"
              >
                View More Project on Github
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
