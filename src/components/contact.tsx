"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

const FORMSPREE = "https://formspree.io/f/xvzpvywr";

// Jeda minimal antar kirim (detik). Tersimpan di localStorage,
// jadi tetap berlaku walau halaman di-refresh.
const COOLDOWN_SECONDS = 60;

// Batas panjang pesan (karakter).
const MESSAGE_MAX_LENGTH = 2000;

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [cooldown, setCooldown] = useState(0);
  const openedAt = useRef(Date.now());
  const closeTimer = useRef<number | null>(null);
  const lastSent = useRef<{ email: string; message: string } | null>(null);

  function dismissPopup() {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setStatus((s) => (s === "sent" ? "idle" : s));
  }

  // Pulihkan cooldown dari sesi sebelumnya (localStorage).
  useEffect(() => {
    const last = Number(window.localStorage.getItem("contact-last-sent") || 0);
    const remaining = Math.ceil(
      (last + COOLDOWN_SECONDS * 1000 - Date.now()) / 1000,
    );
    if (remaining > 0) setCooldown(remaining);
  }, []);

  // Hitung mundur cooldown.
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = window.setTimeout(() => setCooldown((v) => v - 1), 1000);
    return () => window.clearTimeout(id);
  }, [cooldown]);

  // Tutup popup otomatis setelah 5 detik.
  useEffect(() => {
    if (status !== "sent") return;
    closeTimer.current = window.setTimeout(dismissPopup, 5000);
    return () => {
      if (closeTimer.current !== null) {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
    };
  }, [status]);

  // Tutup popup dengan tombol Escape.
  useEffect(() => {
    if (status !== "sent") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissPopup();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status]);

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
    const message = (data.get("message") as string)?.trim().slice(0, MESSAGE_MAX_LENGTH);
    if (!email || !message) {
      setStatus("error");
      return;
    }

    // Anti-spam: jeda minimal antar kirim.
    if (cooldown > 0) {
      setStatus("error");
      return;
    }

    // Anti-spam: tolak pesan duplikat yang persis sama dengan kirim terakhir.
    if (
      lastSent.current &&
      lastSent.current.email === email.toLowerCase() &&
      lastSent.current.message === message
    ) {
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
        lastSent.current = { email: email.toLowerCase(), message };
        setCooldown(COOLDOWN_SECONDS);
        window.localStorage.setItem("contact-last-sent", String(Date.now()));
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
      className="mx-auto max-w-[1120px] scroll-mt-0 px-5 py-12 md:px-8 md:py-16"
    >
      <div className="contact-card grid grid-cols-1 gap-12 rounded-[2rem] p-8 md:p-10 lg:grid-cols-2">
        <div data-aos="fade-right" className="flex flex-col">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-[40ch] text-muted">{t("lead")}</p>
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
          {/* Pet dekoratif, hanya tampil di light mode desktop */}
          <div className="footer-pet-track contact-pet mt-auto hidden pt-8 md:block dark:hidden" aria-hidden="true">
            <span className="footer-pet">
              <svg
                className="footer-pet-sprite"
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 7 L1 2 L6 5 L16 5 L21 2 L19 7 L19 14 L16 16 L6 16 L3 14 Z"
                  fill="currentColor"
                  fillOpacity="0.9"
                />
                <rect x="7" y="9" width="2" height="2" rx="1" className="contact-pet-eye" />
                <rect x="13" y="9" width="2" height="2" rx="1" className="contact-pet-eye" />
                <rect x="10" y="12" width="2" height="1.5" rx="0.5" className="contact-pet-eye" fillOpacity="0.7" />
              </svg>
            </span>
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
            {status === "error" && t("error")}
          </p>
        </form>
      </div>

      {status === "sent" && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center px-5"
        >
          <div
            aria-hidden="true"
            onClick={dismissPopup}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative z-10 w-full max-w-xs rounded-[1.5rem] border border-rule bg-surface-raised p-7 text-center shadow-2xl shadow-black/30">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-success/40 bg-[var(--success-glow)]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="var(--success)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="mt-4 text-lg font-semibold" style={{ color: "var(--success)" }}>
              {t("successTitle")}
            </h3>
            <p className="mt-2 text-sm text-muted">{t("sent")}</p>
            <button
              type="button"
              onClick={dismissPopup}
              className="mt-6 w-full rounded-md border border-rule bg-base px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
