"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-0.5 rounded-lg border border-ink/10 bg-surface-raised p-0.5 text-xs font-semibold"
    >
      {routing.locales.map((l) => {
        const active = locale === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => router.replace(pathname, { locale: l })}
            aria-current={active ? "true" : undefined}
            className={
              "rounded-md px-2 py-1 transition-colors " +
              (active
                ? "bg-ink text-ink-invert"
                : "text-muted hover:text-ink")
            }
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
