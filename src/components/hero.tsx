import Image from "next/image";
import { useTranslations } from "next-intl";
import silhouette from "../assets/foto-profil-siluet-hero.png";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="top" className="hero-poster relative isolate overflow-hidden">
      {/* Siluet besar sebagai jangkar visual, menempel ke dasar hero */}
      {/* z-[1]: di atas wordmark (teks di belakang foto), di bawah tagline & tautan */}
      <div
        className="hero-silhouette-wrap pointer-events-none absolute inset-x-0 bottom-[17rem] z-[1] flex justify-center md:bottom-0"
        aria-hidden="true"
      >
        <Image
          src={silhouette}
          alt=""
          priority
          sizes="(min-width: 768px) 720px, 85vw"
          className="hero-silhouette h-auto -scale-x-100 w-[min(130vw,calc(100svh-22rem))] max-w-none md:w-[min(720px,88svh)] md:translate-x-[8%] md:translate-y-[8%]"
        />
      </div>

      {/* Tanpa z-index agar tidak membuat stacking context: wordmark bisa turun ke bawah siluet */}
      <div className="relative mx-auto flex h-[100svh] max-w-[1120px] flex-col justify-end px-5 pb-28 pt-24 md:px-8 md:pb-10">
        <h1
          data-aos="fade-up"
          aria-label={t("name")}
          className="hero-wordmark relative z-0 select-none whitespace-nowrap font-semibold lowercase text-accent"
        >
          <span aria-hidden="true">
            hafiz <span className="hero-outline-accent">aryan</span>
          </span>
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="160"
          className="hero-tagline relative z-[2] mt-6 max-w-[22ch] text-2xl font-semibold leading-tight tracking-tight"
        >
          {t("taglineLead")} <span className="text-accent">{t("taglineAccent")}</span>
        </p>
      </div>
    </section>
  );
}
