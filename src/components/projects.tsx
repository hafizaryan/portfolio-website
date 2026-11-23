"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

type ProjectKey = "foodinary" | "daisy" | "lab" | "aurora" | "sitaris";

type Project = {
  key: ProjectKey;
  repo?: string;
  demo?: string;
  image?: string;
  tags: string[];
};

// Ordered newest to oldest.
const projects: Project[] = [
  {
    // Repo privat & demo sistem internal: tanpa tombol Repo/Demo.
    key: "aurora",
    image: "/projects/aurora.png",
    tags: ["Vue 3", "FastAPI", "MediaPipe", "Docker"],
  },
  {
    key: "foodinary",
    repo: "https://github.com/foodinary-project",
    demo: "https://foodinary.vercel.app/",
    image: "/projects/foodinary.jpg",
    tags: ["React", "FastAPI", "TensorFlow", "Cloud Run"],
  },
  {
    // Repo privat: tanpa tombol Repo/Demo.
    key: "lab",
    image: "/projects/lab.jpg",
    tags: ["PHP", "CodeIgniter", "MySQL", "RBAC Architecture"],
  },
  {
    key: "daisy",
    repo: "https://github.com/daisy-team",
    demo: "https://daisy-ai-system.vercel.app/",
    image: "/projects/daisy.jpg",
    tags: ["Mobile", "TFLite", "FastAPI", "Computer Vision"],
  },
  {
    // Repo privat: tanpa tombol Repo/Demo.
    key: "sitaris",
    image: "/projects/sitaris.jpg",
    tags: ["PHP", "CodeIgniter 4", "MySQL"],
  },
];

export function Projects() {
  const t = useTranslations("projects");
  const headerRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = stackRef.current;
    if (!root) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-stack-card]"),
    );
    if (cards.length === 0) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let stickyTops: number[] = [];
    let cardHeights: number[] = [];
    let frame = 0;

    const measure = () => {
      stickyTops = cards.map((card) => {
        const parsed = Number.parseFloat(window.getComputedStyle(card).top);
        return Number.isFinite(parsed) ? parsed : 0;
      });
      cardHeights = cards.map((card) => card.offsetHeight);
    };

    const resetStackStyles = () => {
      if (headerRef.current) {
        headerRef.current.style.transform = "";
      }
      for (const card of cards) {
        card.style.setProperty("--stack-scale", "1");
        card.style.setProperty("--stack-shade", "0");
      }
    };

    const update = () => {
      frame = 0;

      // Skip scroll-linked transforms under reduced motion to respect user motion preferences.
      if (motionQuery.matches) {
        resetStackStyles();
        return;
      }

      // Batch all DOM geometry reads before writing CSS custom properties.
      const rects = cards.map((card) => card.getBoundingClientRect());

      // Keep the sticky header moving up with the last card once the stack unsticks.
      const header = headerRef.current;
      if (header) {
        const lastIdx = cards.length - 1;
        const overflow = rects[lastIdx].top - stickyTops[lastIdx];
        header.style.transform =
          overflow < 0 ? `translate3d(0, ${overflow}px, 0)` : "";
      }

      // Compute each card j's covering progress in [0, 1] as it travels from
      // the bottom of card j - 1 up to its own computed sticky top.
      const progress = new Array<number>(cards.length).fill(0);
      for (let j = 1; j < cards.length; j++) {
        const start = stickyTops[j - 1] + cardHeights[j - 1];
        const end = stickyTops[j];
        const distance = Math.max(1, start - end);
        const raw = (start - rects[j].top) / distance;
        progress[j] = Math.min(1, Math.max(0, raw));
      }

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const isLast = i === cards.length - 1;

        if (isLast) {
          card.style.setProperty("--stack-scale", "1");
          card.style.setProperty("--stack-shade", "0");
          continue;
        }

        let coverDepth = 0;
        for (let j = i + 1; j < cards.length; j++) {
          coverDepth += progress[j];
        }

        // Scale and top-edge shading provide a sequential depth cue as newer cards cover older ones.
        // Progressive scale:
        // depth 0 -> 1.000, depth 1 -> 0.979 (~0.98), depth 2 -> 0.946 (~0.945),
        // depth 3 -> 0.901, gently floored at 0.88.
        const scale = Math.max(
          0.88,
          1 - 0.015 * coverDepth - 0.006 * coverDepth * coverDepth,
        );

        // Top-edge dark gradient opacity: 0 uncovered -> 0.7 at 1 card -> 1.0 at 2+ cards.
        const nextProgress = progress[i + 1] ?? 0;
        const shade = Math.min(
          1,
          0.7 * nextProgress + 0.3 * Math.max(0, coverDepth - 1),
        );

        card.style.setProperty("--stack-scale", scale.toFixed(4));
        card.style.setProperty("--stack-shade", shade.toFixed(4));
      }
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      scheduleUpdate();
    };

    const onMotionChange = () => {
      scheduleUpdate();
    };

    measure();
    update();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    motionQuery.addEventListener("change", onMotionChange);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            measure();
            scheduleUpdate();
          })
        : null;
    if (resizeObserver) {
      for (const card of cards) {
        resizeObserver.observe(card);
      }
    }

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", onResize);
      motionQuery.removeEventListener("change", onMotionChange);
      resizeObserver?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      if (headerRef.current) headerRef.current.style.transform = "";
    };
  }, []);

  return (
    <section
      id="projects"
      className="projects-section scroll-mt-0 py-12 md:py-20"
    >
      <div ref={headerRef} className="project-header">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-[44ch] text-muted">{t("lead")}</p>
      </div>

      <div ref={stackRef} className="project-stack">
        {projects.map((p, idx) => (
          <article
            key={p.key}
            data-stack-card
            className={`project-card project-card--${p.key}`}
            style={
              {
                "--card-index": idx,
                "--stack-scale": "1",
                "--stack-shade": "0",
                zIndex: idx + 1,
              } as React.CSSProperties
            }
          >
            <div className="project-card-inner">
              <div className="project-card-content">
                <div className="project-card-header">
                  <h3 className="project-card-title">{t(`${p.key}.name`)}</h3>
                  {(p.repo || p.demo) && (
                    <div className="flex shrink-0 flex-wrap gap-2">
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-card-action inline-flex min-h-[44px] items-center rounded-md border border-rule bg-base px-3.5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                        >
                          <i
                            className="fa-brands fa-github mr-2"
                            aria-hidden="true"
                          />
                          {t("repo")}
                        </a>
                      )}
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-card-action inline-flex min-h-[44px] items-center rounded-md border border-rule bg-base px-3.5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                        >
                          <i
                            className="fa-solid fa-globe mr-2"
                            aria-hidden="true"
                          />
                          {t("demo")}
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="project-card-body">
                  <p className="max-w-[54ch] text-sm leading-6 text-muted md:text-[1rem] md:leading-7">
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

              <div className="project-card-media">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={t(`${p.key}.name`)}
                    width={1280}
                    height={720}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <i
                    className="fa-regular fa-image text-3xl opacity-50"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
