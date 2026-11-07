"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import qris from "@/assets/qris.jpeg";

export function Footer() {
  const t = useTranslations("footer");
  const [open, setOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const updateHeight = () => {
      document.documentElement.style.setProperty(
        "--footer-height",
        `${footer.getBoundingClientRect().height}px`,
      );
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(footer);

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--footer-height");
    };
  }, []);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("#top");
    if (!hero) return;

    const updateVisibility = () => {
      setShowBackToTop(window.scrollY > hero.offsetTop + hero.offsetHeight);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <>
      <footer
        ref={footerRef}
        className="site-footer fixed inset-x-0 bottom-0 z-10 w-full border-t border-black bg-black text-white"
      >
      <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-5 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <p>© 2026 Hafiz Aryan Siregar. {t("rights")}</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="self-start transition-colors hover:text-accent md:self-auto"
        >
          {t("support")}
        </button>
      </div>

      </footer>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-sm rounded-xl border border-rule bg-base p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto w-full max-w-[16rem] rounded-lg border border-rule bg-white p-3">
              <Image
                src={qris}
                alt="QRIS"
                className="h-auto w-full"
                sizes="256px"
              />
            </div>
            <p className="mt-4 text-sm text-muted">{t("supportText")}</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("close")}
              className="mt-5 rounded-md border border-rule px-4 py-2 text-sm transition-colors hover:border-ink"
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}
      {showBackToTop && (
        <a
          href="#top"
          aria-label={t("backToTop")}
          className="fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black text-white shadow-lg transition-transform hover:scale-105"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 19V5M6 11l6-6 6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}
    </>
  );
}
