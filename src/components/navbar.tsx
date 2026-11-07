"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitch } from "./locale-switch";
import icon from "../app/icon.png";

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#about", label: t("about") },
    { href: "#experience", label: t("experience") },
    { href: "#education", label: t("education") },
    { href: "#bootcamp", label: t("bootcamp") },
    { href: "#projects", label: t("projects") },
  ];

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        className="navbar-glass mx-auto flex h-[50px] max-w-[1040px] items-center justify-between rounded-full px-3 text-white md:px-4"
      >
        <a href="#top" className="shrink-0" aria-label="Hafiz Aryan Siregar">
          <img
            src={icon.src}
            alt="Hafiz Aryan Siregar"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
        </a>

        <div className="hidden items-center gap-5 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs text-white/65 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-2 border-l border-white/15 pl-3">
            <span className="[&_button]:!text-white/70 [&_button:hover]:!text-white">
              <LocaleSwitch />
            </span>
            <span className="[&_button]:!text-white/70 [&_button:hover]:!text-white">
              <ThemeToggle />
            </span>
            <a
              href="#contact"
              className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#090a0c] transition-colors hover:bg-white/85"
            >
              {t("contact")}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <span className="[&_button]:!text-white/70 [&_button:hover]:!text-white">
            <LocaleSwitch />
          </span>
          <span className="[&_button]:!text-white/70 [&_button:hover]:!text-white">
            <ThemeToggle />
          </span>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center text-white"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d={open ? "M5 5l10 10M15 5L5 15" : "M3 6h14M3 10h14M3 14h14"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="navbar-glass mx-auto mt-2 max-w-[1040px] rounded-3xl px-4 py-1 text-white md:hidden">
          <div className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-xs text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <div className="my-2 mt-3 border-t border-white/15 pt-3">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-white px-3 py-2 text-center text-xs font-medium text-[#090a0c] transition-colors hover:bg-white/85"
              >
                {t("contact")}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
