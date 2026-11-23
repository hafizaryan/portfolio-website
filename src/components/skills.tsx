"use client";

import { useTranslations } from "next-intl";
import { m, useReducedMotion } from "motion/react";
import { MotionReveal } from "./motion-reveal";

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
  const reduceMotion = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] as const },
    },
  };

  return (
    <section
      id="skills"
      className="mx-auto max-w-[1120px] scroll-mt-0 px-5 py-10 md:px-8 md:py-14"
    >
      <MotionReveal>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {t("title")}
        </h2>
      </MotionReveal>

      <div className="mt-10">
        <dl className="space-y-8 md:space-y-10">
          {skillGroups.map((g, groupIndex) => (
            <m.div
              key={g.key}
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    delayChildren: reduceMotion ? 0 : groupIndex * 0.08,
                    staggerChildren: reduceMotion ? 0 : 0.1,
                  },
                },
              }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-[10rem_1fr] sm:gap-8"
            >
              <m.dt variants={reveal} className="font-medium">
                {t(`groups.${g.key}`)}
              </m.dt>
              <m.dd
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.05 } },
                }}
                className="flex flex-wrap gap-2"
              >
                {g.items.map((item) => (
                  <m.span
                    key={item.name}
                    variants={reveal}
                    className="inline-flex cursor-default items-center gap-2 rounded-md border border-rule px-2.5 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        width="16"
                        height="16"
                        loading="lazy"
                        decoding="async"
                        className="h-4 w-4 object-contain"
                      />
                    ) : (
                      <i className={`${item.icon} text-base`} aria-hidden="true" />
                    )}
                    {item.name}
                  </m.span>
                ))}
              </m.dd>
            </m.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
