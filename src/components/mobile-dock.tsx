"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons: Record<string, ReactNode> = {
  about: (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </svg>
  ),
  experience: (
    <svg {...iconProps}>
      <rect x="3.5" y="7" width="17" height="12.5" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17" />
    </svg>
  ),
  projects: (
    <svg {...iconProps}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </svg>
  ),
  contact: (
    <svg {...iconProps}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
    </svg>
  ),
};

const ids = ["about", "experience", "projects", "contact"];

export function MobileDock() {
  const t = useTranslations("nav");
  const [active, setActive] = useState("");

  // Scroll-spy: section aktif = section terakhir yang top-nya sudah melewati
  // ~40% tinggi layar. Di dasar halaman, Contact selalu aktif.
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.4;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (atBottom && current) current = "contact";
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 px-4 md:hidden">
      <nav
        aria-label="Section navigation"
        className="navbar-glass mx-auto grid max-w-[420px] grid-cols-4 gap-1 rounded-full p-1.5 text-ink-invert"
      >
        {ids.map((id) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={isActive ? "true" : undefined}
              className={
                "flex flex-col items-center justify-center gap-0.5 rounded-full py-1.5 transition-colors duration-200 " +
                (isActive
                  ? "bg-ink-invert/15 text-ink-invert"
                  : "text-ink-invert/60 active:bg-ink-invert/10")
              }
            >
              {icons[id]}
              <span
                className={
                  "text-[10px] leading-tight " +
                  (isActive ? "font-semibold" : "font-medium")
                }
              >
                {t(id)}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
