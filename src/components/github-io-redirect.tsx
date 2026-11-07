"use client";

import { useEffect } from "react";

export function GithubIoRedirect() {
  useEffect(() => {
    if (window.location.hostname === "hafizaryan.github.io") {
      window.location.replace(
        "https://hafizaryansiregar.my.id" +
          window.location.pathname +
          window.location.search
      );
    }
  }, []);

  return null;
}
