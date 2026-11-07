"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const terminalCommand = "whoami";

export function Hero() {
  const t = useTranslations("hero");
  const terminalRef = useRef<HTMLElement>(null);
  const [commandLength, setCommandLength] = useState(0);
  const [outputLines, setOutputLines] = useState(0);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return;

    let started = false;
    let commandTimer: ReturnType<typeof setTimeout>;
    let outputTimer: ReturnType<typeof setTimeout>;
    const outputCount = 6;

    const startTyping = () => {
      if (started) return;
      started = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCommandLength(terminalCommand.length);
        setOutputLines(outputCount);
        return;
      }

      const typeCommand = (length: number) => {
        setCommandLength(length);
        if (length < terminalCommand.length) {
          commandTimer = setTimeout(() => typeCommand(length + 1), 80);
        } else {
          const revealOutput = (line: number) => {
            setOutputLines(line);
            if (line < outputCount) {
              outputTimer = setTimeout(() => revealOutput(line + 1), 180);
            }
          };

          outputTimer = setTimeout(() => revealOutput(1), 180);
        }
      };

      typeCommand(1);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTyping();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(terminal);

    return () => {
      observer.disconnect();
      clearTimeout(commandTimer);
      clearTimeout(outputTimer);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative mx-auto max-w-[1120px] px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44"
    >
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <div>
          <h1
            data-aos="fade-up"
            className="max-w-none whitespace-nowrap text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-5xl"
          >
            {t("name")}
            <span className="text-accent">.</span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="mt-6 max-w-[42ch] text-lg text-muted md:text-xl"
          >
            {t("headline")}
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#experience"
              className="rounded-md bg-ink px-5 py-3 text-sm font-medium text-ink-invert transition-all hover:bg-accent hover:text-white hover:shadow-[0_0_20px_-3px_var(--accent-glow)]"
            >
              {t("viewExperience")}
            </a>
            <a
              href="#contact"
              className="rounded-md border border-rule px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              {t("contactMe")}
            </a>
          </div>

        </div>

        <figure
          ref={terminalRef}
          className="hero-terminal w-full overflow-hidden rounded-2xl border border-rule shadow-[0_14px_35px_rgba(13,15,18,0.10)]"
          aria-label="Example project code"
        >
          <div className="hero-terminal__bar flex items-center gap-2 border-b border-rule px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
          </div>
          <pre className="whitespace-pre-wrap break-words px-5 py-5 font-mono text-[0.78rem] leading-7 sm:text-sm">
            <code>
              <span className="text-accent">{terminalCommand.slice(0, commandLength)}</span>
              {commandLength === terminalCommand.length && (
                <>
                  {"\n\n"}
                  {outputLines >= 1 && <span className="text-muted">{"{"}</span>}
                  {outputLines >= 2 && (
                    <>
                      {"\n  "}
                      <span className="text-sky-700 dark:text-sky-300">&quot;role&quot;</span>
                      <span className="text-muted">: </span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        &quot;Web Developer&quot;
                      </span>
                      <span className="text-muted">,</span>
                    </>
                  )}
                  {outputLines >= 3 && (
                    <>
                      {"\n  "}
                      <span className="text-sky-700 dark:text-sky-300">&quot;stack&quot;</span>
                      <span className="text-muted">: [</span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        &quot;ASP.NET Core&quot;
                      </span>
                      <span className="text-muted">, </span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        &quot;Laravel&quot;
                      </span>
                      <span className="text-muted">, </span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        &quot;Node.js&quot;
                      </span>
                      <span className="text-muted">, </span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        &quot;SQL Server&quot;
                      </span>
                      <span className="text-muted">, </span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        &quot;GCP&quot;
                      </span>
                      <span className="text-muted">],</span>
                    </>
                  )}
                  {outputLines >= 4 && (
                    <>
                      {"\n  "}
                      <span className="text-sky-700 dark:text-sky-300">&quot;focus&quot;</span>
                      <span className="text-muted">: </span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        &quot;Backend Engineer &amp; Automation&quot;
                      </span>
                      <span className="text-muted">,</span>
                    </>
                  )}
                  {outputLines >= 5 && (
                    <>
                      {"\n  "}
                      <span className="text-sky-700 dark:text-sky-300">&quot;status&quot;</span>
                      <span className="text-muted">: </span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        &quot;Available for new challenges&quot;
                      </span>
                    </>
                  )}
                  {outputLines >= 6 && (
                    <>
                      {"\n"}
                      <span className="text-muted">{"}"}</span>
                    </>
                  )}
                </>
              )}
              <span className="hero-terminal__cursor" aria-hidden="true">▌</span>
            </code>
          </pre>
        </figure>

      </div>
    </section>
  );
}
