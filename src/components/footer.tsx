"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, m } from "motion/react";
import { usePathname, useRouter } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale = locale === "en" ? "id" : "en";
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
        className="site-footer fixed inset-x-0 bottom-0 z-10 w-full border-t border-ink bg-ink text-ink-invert"
      >
      <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-5 py-10 text-sm text-muted pb-28 md:flex-row md:items-center md:justify-end md:px-8 md:pb-10">
        <p>© 2026 Hafiz Aryan Siregar. {t("rights")}</p>
      </div>

      </footer>
      <button
        type="button"
        onClick={() => router.replace(pathname, { locale: nextLocale })}
        aria-label={
          nextLocale === "id"
            ? "Ganti ke Bahasa Indonesia"
            : "Switch to English"
        }
        className="fixed bottom-24 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-ink-invert/25 bg-ink font-mono text-xs font-semibold uppercase text-ink-invert shadow-lg transition-colors active:scale-95 hover:border-accent hover:text-accent md:hidden"
      >
        {locale.toUpperCase()}
      </button>
      <AnimatePresence>
        {showBackToTop && (
          <m.a
            key="back-to-top"
            href="#top"
            aria-label={t("backToTop")}
            initial={{ opacity: 0, y: 14, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 360, damping: 26 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.94 }}
            className="fixed bottom-6 right-6 z-[60] hidden h-12 w-12 items-center justify-center rounded-full border border-ink-invert/25 bg-ink text-ink-invert shadow-lg transition-colors hover:border-accent hover:text-accent md:flex"
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
          </m.a>
        )}
      </AnimatePresence>
    </>
  );
}
