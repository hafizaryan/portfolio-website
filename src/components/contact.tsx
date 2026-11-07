"use client";

import { useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

const FORMSPREE = "https://formspree.io/f/xvzpvywr";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const openedAt = useRef(Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Anti-spam: honeypot field must stay empty.
    if ((data.get("_gotcha") as string)?.trim()) {
      setStatus("sent");
      form.reset();
      return;
    }
    // Anti-spam: a real person takes more than a few seconds to write.
    if (Date.now() - openedAt.current < 3000) {
      setStatus("sent");
      form.reset();
      return;
    }

    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();
    if (!email || !message) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-[1120px] scroll-mt-0 border-t border-rule px-5 py-12 md:px-8 md:py-16"
    >
      <div className="contact-card grid grid-cols-1 gap-12 rounded-[2rem] p-8 md:p-10 lg:grid-cols-2">
        <div data-aos="fade-right">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-[40ch] text-muted">{t("lead")}</p>
          <div className="mt-8 flex gap-3">
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
        </div>

        <form
          onSubmit={onSubmit}
          data-aos="fade-left"
          data-aos-delay="100"
          className="space-y-5"
        >
          {/* Honeypot, hidden from real users */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="_gotcha">Leave this field blank</label>
            <input id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-muted">
              {t("email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder={t("emailPlaceholder")}
              className="w-full rounded-md border border-rule bg-surface px-3 py-2.5 text-ink outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm text-muted">
              {t("message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder={t("messagePlaceholder")}
              className="w-full resize-none rounded-md border border-rule bg-surface px-3 py-2.5 text-ink outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-md bg-ink py-3 text-sm font-medium text-ink-invert transition-all hover:bg-accent hover:text-white hover:shadow-[0_0_20px_-3px_var(--accent-glow)] disabled:opacity-60"
          >
            {status === "sending" ? t("sending") : t("send")}
          </button>

          <p
            aria-live="polite"
            className="min-h-5 text-sm text-muted"
          >
            {status === "sent" && <span className="text-accent font-medium">{t("sent")}</span>}
            {status === "error" && t("error")}
          </p>
        </form>
      </div>
    </section>
  );
}
