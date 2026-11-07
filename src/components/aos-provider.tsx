"use client";

import { useEffect, type ReactNode } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AosProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    AOS.init({
      once: false, // Animasi tetap berjalan saat scroll down dan scroll up
      mirror: true, // Elemen akan ter-animasi keluar saat di-scroll lewat dan masuk kembali
      duration: 650,
      easing: "ease-out-cubic",
      offset: 50,
    });

    // Refresh AOS saat konten berubah
    AOS.refresh();
  }, []);

  return <>{children}</>;
}
