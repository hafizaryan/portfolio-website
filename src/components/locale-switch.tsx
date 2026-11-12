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
      className="flex items-center gap-0.5 rounded-lg border border-black/10 bg-white p-0.5 text-xs font-semibold"
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
                ? "bg-[#0d0f12] text-white"
                : "text-[#8c93a0] hover:text-[#0d0f12]")
            }
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
