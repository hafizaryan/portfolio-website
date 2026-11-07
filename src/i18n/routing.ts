import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "id"],
  defaultLocale: "en",
  // Redirect "/" to the locale that best matches the visitor's browser.
  localeDetection: true,
  localePrefix: "always",
});
