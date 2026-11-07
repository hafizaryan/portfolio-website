import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://hafizaryan.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/en/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en/`,
          id: `${baseUrl}/id/`,
        },
      },
    },
    {
      url: `${baseUrl}/id/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/`,
          id: `${baseUrl}/id/`,
        },
      },
    },
  ];
}
