"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, m } from "motion/react";
import { MotionReveal } from "./motion-reveal";

type Recommender = {
  name: string;
  role: string;
  initials: string;
  date: string;
  // Kutip asli dari rekomendasi LinkedIn, dipotong di kalimat yang lengkap.
  quote: string;
};

const RECOMMENDERS: Recommender[] = [
  {
    name: "Novrian Pratama",
    role: "Sales Digital Business Application Intern at PT. Amerta Indah Otsuka",
    initials: "NP",
    date: "Mar 2026",
    quote:
      "Throughout the project, Hafiz demonstrated strong leadership, technical expertise, and a great sense of responsibility in guiding the team toward our goals.",
  },
  {
    name: "Dani Harmade",
    role: "Software Development",
    initials: "DH",
    date: "Jul 2025",
    quote:
      "In DAISY, Hafiz served as both the Team Lead and a Cloud Computing Engineer, where he successfully coordinated a multidisciplinary team and managed the system's cloud infrastructure and deployment.",
  },
  {
    name: "Muhammad Jazman",
    role: "Lecturer | Head of ICT Centre",
    initials: "MJ",
    date: "May 2025",
    quote:
      "I had the privilege of teaching Hafiz in my Business Modeling course and also served as the second examiner for his undergraduate thesis.",
  },
];

// Ketiganya bergantian tampil satu-persatu, transisi tiap 5 detik.
const ROTATE_INDS = [0, 1, 2];
const ROTATE_MS = 5000;

export function Recommendations() {
  const t = useTranslations("recommendations");
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPos((v) => (v + 1) % ROTATE_INDS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [pos]);

  const activePerson = RECOMMENDERS[ROTATE_INDS[pos]];

  return (
    <section
      id="recommendations"
      className="mx-auto max-w-[1120px] scroll-mt-0 px-5 py-12 md:px-8 md:py-16"
    >
      <MotionReveal>
        <h2 className="sr-only">{t("title")}</h2>
        <p className="mx-auto text-center text-muted md:text-lg">{t("lead")}</p>
      </MotionReveal>

      <div className="mt-12">
        <figure className="min-h-[110px]" aria-live="polite">
          <AnimatePresence mode="wait">
            <m.blockquote
              key={activePerson.name}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-[60ch] px-5 text-center text-ink md:px-0"
            >
              <div className="quote-text text-sm leading-relaxed md:text-[1rem]">
                <p>&ldquo;{activePerson.quote}&rdquo;</p>
              </div>
              <figcaption className="mt-4 text-xs">
                <span className="font-medium text-ink">{activePerson.name}</span>
                {", "}
                <time className="text-muted">{activePerson.date}</time>
              </figcaption>
            </m.blockquote>
          </AnimatePresence>
        </figure>
        {/* Penanda rotasi: garis kecil, bisa diklik untuk pindah kutipan */}
        <div className="mt-8 flex justify-center gap-2">
          {ROTATE_INDS.map((idx, i) => {
            const person = RECOMMENDERS[idx];
            const isActive = i === pos;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setPos(i)}
                aria-label={`Show recommendation from ${person.name}`}
                aria-pressed={isActive}
                className="relative cursor-pointer p-2"
              >
                <span
                  aria-hidden="true"
                  className="relative block h-0.5 w-6 overflow-hidden rounded-full bg-rule"
                >
                  {isActive && (
                    <m.span
                      layoutId="rec-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-ink"
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
