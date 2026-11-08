"use client";

import { useTranslations } from "next-intl";

const skillGroups: {
  key: "frontend" | "backend" | "data" | "cloud" | "ai";
  items: { name: string; icon?: string; image?: string }[];
}[] = [
  {
    key: "frontend",
    items: [
      { name: "HTML", icon: "devicon-html5-plain colored" },
      { name: "CSS", icon: "devicon-css3-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "Vue", icon: "devicon-vuejs-plain colored" },
      { name: "Blazor", icon: "devicon-blazor-original colored" },
      {
        name: "Next.js",
        image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/nextdotjs.svg",
      },
    ],
  },
  {
    key: "backend",
    items: [
      { name: "C#", icon: "devicon-csharp-plain colored" },
      { name: ".NET", icon: "devicon-dotnetcore-plain colored" },
      { name: "PHP", icon: "devicon-php-plain colored" },
      { name: "Node.js", icon: "devicon-nodejs-plain colored" },
      { name: "Laravel", icon: "devicon-laravel-plain colored" },
      { name: "CodeIgniter", icon: "devicon-codeigniter-plain colored" },
      { name: "Python", icon: "devicon-python-plain colored" },
    ],
  },
  {
    key: "data",
    items: [
      { name: "MySQL", icon: "devicon-mysql-plain colored" },
      { name: "SQL Server", icon: "devicon-microsoftsqlserver-plain colored" },
      { name: "Firebase", icon: "devicon-firebase-plain colored" },
      { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
    ],
  },
  {
    key: "cloud",
    items: [
      { name: "Google Cloud", icon: "devicon-googlecloud-plain colored" },
      { name: "Azure", icon: "devicon-azure-plain colored" },
      {
        name: "Azure DevOps",
        image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/azuredevops.svg",
      },
      { name: "Docker", icon: "devicon-docker-plain colored" },
      { name: "Postman", icon: "devicon-postman-plain colored" },
      { name: "Jira", icon: "devicon-jira-plain colored" },
      {
        name: "Vercel",
        image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vercel.svg",
      },
      { name: "Laragon", image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/laragon.svg" },
      {
        name: "VS Code",
        image: "/skills/vscode.svg",
      },
      { name: "Git", icon: "devicon-git-plain colored" },
      { name: "SSMS", icon: "devicon-microsoftsqlserver-plain colored" },
      { name: "Visual Studio", icon: "devicon-visualstudio-plain colored" },
    ],
  },
  {
    key: "ai",
    items: [
      { name: "Kiro", image: "https://kiro.dev/icon.svg" },
      {
        name: "Claude",
        image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/claude.svg",
      },
      { name: "Copilot", icon: "fa-brands fa-github text-purple-500" },
      { name: "MCP", icon: "fa-solid fa-plug text-blue-500" },
      {
        name: "Meta Muse",
        image: "/skills/metamuse.png",
      },
      {
        name: "Hermes",
        image:
          "https://raw.githubusercontent.com/NousResearch/hermes-agent/main/assets/icon-master.svg",
      },
      {
        name: "OpenCode",
        image:
          "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/opencode.svg",
      },
      {
        name: "Antigravity",
        image: "https://antigravity.google/favicon.svg",
      },
    ],
  },
];

export function Skills() {
  const t = useTranslations("skills");

  return (
    <section
      id="skills"
      className="mx-auto max-w-[1120px] scroll-mt-0 px-5 py-10 md:px-8 md:py-14"
    >
      <div data-aos="fade-up">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {t("title")}
        </h2>
      </div>

      <div className="mt-10">
        <dl data-aos="fade-right" data-aos-delay="100" className="space-y-8 md:space-y-10">
          {skillGroups.map((g) => (
            <div
              key={g.key}
              className="grid grid-cols-1 gap-3 sm:grid-cols-[10rem_1fr] sm:gap-8"
            >
              <dt className="font-medium">
                {t(`groups.${g.key}`)}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item.name}
                    className="inline-flex cursor-default items-center gap-2 rounded-md border border-rule px-2.5 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        width="16"
                        height="16"
                        className={`h-4 w-4 object-contain ${
                          item.name === "Next.js" ||
                          item.name === "Azure DevOps" ||
                          item.name === "Vercel" ||
                          item.name === "Laragon" ||
                          item.name === "OpenCode" ||
                          item.name === "Claude"
                            ? "dark:invert"
                            : ""
                        }`}
                      />
                    ) : (
                      <i className={`${item.icon} text-base`} aria-hidden="true" />
                    )}
                    {item.name}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
