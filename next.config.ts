import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Static export so the site can keep being hosted on GitHub Pages.
  output: "export",
  // GitHub Pages serves each route as a folder with an index.html.
  trailingSlash: true,
  images: {
    // next/image optimization needs a server; disable it for static export.
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
