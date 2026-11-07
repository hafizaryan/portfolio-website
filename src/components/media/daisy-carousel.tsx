"use client";

import Image from "next/image";
import daisy from "@/assets/portfolio/daisy.png";

export function DaisyCarousel({ alt }: { alt: string }) {
  return (
    <div className="group/daisy relative h-full w-full overflow-hidden bg-[#071329]">
      {/* Edge gradient masks for seamless drift fade */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#071329] to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-r from-transparent to-[#071329]"
        aria-hidden="true"
      />

      {/* Tech tag in top right */}
      <div className="absolute right-3 top-3 z-20 flex items-center rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[11px] text-zinc-300 backdrop-blur-md">
        <span>Mobile App, TFLite</span>
      </div>

      {/* Hover hint */}
      <div className="absolute bottom-3 right-3 z-20 font-mono text-[10px] text-zinc-400 opacity-0 transition-opacity duration-300 group-hover/daisy:opacity-100">
        Hover to pause
      </div>

      <div className="device-marquee flex h-full w-max">
        {[0, 1].map((copy) => (
          <Image
            key={copy}
            src={daisy}
            alt={copy === 0 ? alt : ""}
            aria-hidden={copy === 1}
            priority={false}
            className="h-full w-auto max-w-none object-cover"
            sizes="800px"
          />
        ))}
      </div>
    </div>
  );
}
