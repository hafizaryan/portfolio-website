"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 text-xs font-medium text-white/70">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden="true">/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: l })}
            aria-current={locale === l}
            className={
              locale === l
                ? "text-ink"
                : "text-muted transition-colors hover:text-ink"
            }
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
