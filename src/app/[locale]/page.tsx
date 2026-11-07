import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Bootcamp } from "@/components/bootcamp";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="site-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hafiz Aryan Siregar",
              url: `https://hafizaryan.github.io/${locale}/`,
              jobTitle: "Web Developer",
              sameAs: [
                "https://github.com/hafizaryan",
                "https://www.linkedin.com/in/hafizaryan/",
              ],
              knowsAbout: [
                "Web development",
                "Cloud computing",
                "Data",
                "Computer vision",
              ],
            }),
          }}
        />
        <Hero />
        <About />
        <Experience />
        <Education />
        <Bootcamp />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
