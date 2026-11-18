"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { m } from "motion/react";
import { useSiteReady } from "@/lib/use-site-ready";
import { useMarqueeStuck, useNavbarHidden } from "@/lib/use-navbar-hidden";
import { LocaleSwitch } from "./locale-switch";
import icon from "../app/icon.png";

export function Navbar() {
  const t = useTranslations("nav");
  const ready = useSiteReady();
  const [active, setActive] = useState("");
  const hidden = useNavbarHidden();
  const marqueeStuck = useMarqueeStuck();

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

  const animateState = !ready
    ? { opacity: 0, y: -16 }
    : hidden
      ? { opacity: 1, y: "-100%" }
      : { opacity: 1, y: 0 };

  return (
    <m.header
      initial={{ opacity: 0, y: -16 }}
      animate={animateState}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={
        "fixed inset-x-0 top-0 z-40 hidden px-4 transition-[padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:block " +
        (marqueeStuck ? "pt-[58px]" : "pt-4") +
        (hidden ? " pointer-events-none" : "")
      }
    >
      <nav className="navbar-glass mx-auto flex h-[50px] max-w-[1120px] items-center justify-between rounded-full px-4 text-ink-invert">
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
                    ? "font-semibold text-ink-invert"
                    : "text-ink-invert/65 hover:text-accent")
                }
              >
                {l.label}
              </a>
            );
          })}
          <div className="flex items-center gap-2 border-l border-ink-invert/15 pl-3">
            <LocaleSwitch />
            <a
              href="#contact"
              className="rounded-full bg-ink-invert px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-accent hover:text-ink-invert"
            >
              {t("contact")}
            </a>
          </div>
        </div>
      </nav>
    </m.header>
  );
}
