"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LocaleSwitch } from "./locale-switch";
import icon from "../app/icon.png";

export function Navbar() {
  const t = useTranslations("nav");
  const [active, setActive] = useState("");

  const links = [
    { href: "#about", label: t("about") },
    { href: "#experience", label: t("experience") },
    { href: "#education", label: t("education") },
    { href: "#bootcamp", label: t("bootcamp") },
    { href: "#projects", label: t("projects") },
  ];

  // Scroll-spy: tandai link yang section-nya sedang lewat garis navbar.
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const onScroll = () => {
      const y = 140; // posisi garis navbar + scroll offset
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= y) current = id;
      }
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
    <header className="fixed inset-x-0 top-4 z-50 hidden px-4 md:block">
      <nav className="navbar-glass mx-auto flex h-[50px] max-w-[1120px] items-center justify-between rounded-full px-4 text-white">
        <a href="#top" className="shrink-0" aria-label="Hafiz Aryan Siregar">
          <img
            src={icon.src}
            alt="Hafiz Aryan Siregar"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
        </a>

        <div className="flex items-center gap-5">
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={
                  "text-xs transition-colors " +
                  (isActive
                    ? "font-semibold text-white"
                    : "text-white/65 hover:text-white")
                }
              >
                {l.label}
              </a>
            );
          })}
          <div className="flex items-center gap-2 border-l border-white/15 pl-3">
            <LocaleSwitch />
            <a
              href="#contact"
              className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#090a0c] transition-colors hover:bg-white/85"
            >
              {t("contact")}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
