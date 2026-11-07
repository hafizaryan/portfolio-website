"use client";

import { useState } from "react";
import Image from "next/image";
import lab from "@/assets/portfolio/ilmis.jpg";

type Tab = "overview" | "metrics" | "events";

export function IlmisConsole({ alt }: { alt: string }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isLive] = useState(true);

  return (
    <div className="group/ilmis relative h-full w-full overflow-hidden bg-[#0a0d14]">
      {/* Background thesis screenshot with subtle dark tint */}
      <Image
        src={lab}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 1120px"
        className="object-cover object-top opacity-35 transition-transform duration-700 ease-out group-hover/ilmis:scale-[1.01]"
        placeholder="blur"
      />

      {/* Cybernetic grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/70 to-transparent"
        aria-hidden="true"
      />

      {/* System HUD Header */}
      <div className="absolute inset-x-0 top-0 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-black/75 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-xs font-semibold text-zinc-300">
            ILMIS Core Architecture
          </span>
          <span className="hidden font-mono text-[10px] text-zinc-400 sm:inline">
            v2.4-enterprise
          </span>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-300">
            <span>{isLive ? "SYSTEM ONLINE" : "IDLE"}</span>
          </div>

          {/* Interactive Navigation Pills */}
          <div className="flex rounded-md border border-white/10 bg-zinc-900/90 p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`rounded px-2.5 py-0.5 font-mono transition-colors ${
                activeTab === "overview"
                  ? "bg-white/15 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("metrics")}
              className={`rounded px-2.5 py-0.5 font-mono transition-colors ${
                activeTab === "metrics"
                  ? "bg-white/15 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Telemetry
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("events")}
              className={`rounded px-2.5 py-0.5 font-mono transition-colors ${
                activeTab === "events"
                  ? "bg-white/15 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Audit Stream
            </button>
          </div>
        </div>
      </div>

      {/* Main HUD Body */}
      <div className="absolute inset-x-4 bottom-4 top-14 flex flex-col justify-end">
        {activeTab === "overview" && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-white/10 bg-black/70 p-3 backdrop-blur-md">
              <span className="font-mono text-[10px] uppercase text-zinc-400">
                Workstations
              </span>
              <p className="mt-1 font-mono text-xl font-bold text-white">48 / 48</p>
              <span className="mt-1 block font-mono text-[10px] text-emerald-400">
                100% Monitored
              </span>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/70 p-3 backdrop-blur-md">
              <span className="font-mono text-[10px] uppercase text-zinc-400">
                Weekly Bookings
              </span>
              <p className="mt-1 font-mono text-xl font-bold text-white">320+</p>
              <span className="mt-1 block font-mono text-[10px] text-cyan-400">
                Auto Conflict Resolving
              </span>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/70 p-3 backdrop-blur-md">
              <span className="font-mono text-[10px] uppercase text-zinc-400">
                Security
              </span>
              <p className="mt-1 font-mono text-xl font-bold text-white">RBAC</p>
              <span className="mt-1 block font-mono text-[10px] text-zinc-300">
                Role-Based Permission
              </span>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/70 p-3 backdrop-blur-md">
              <span className="font-mono text-[10px] uppercase text-zinc-400">
                Deployment
              </span>
              <p className="mt-1 font-mono text-xl font-bold text-white">Docker</p>
              <span className="mt-1 block font-mono text-[10px] text-zinc-300">
                GCP Cloud Run
              </span>
            </div>
          </div>
        )}

        {activeTab === "metrics" && (
          <div className="rounded-lg border border-white/10 bg-black/80 p-4 font-mono text-xs backdrop-blur-md">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div>
                <span className="text-zinc-500">Query Response Time:</span>
                <p className="font-semibold text-emerald-400">&lt; 24ms (Indexed)</p>
              </div>
              <div>
                <span className="text-zinc-500">Scheduling Throughput:</span>
                <p className="font-semibold text-white">Synchronous Multi-user</p>
              </div>
              <div>
                <span className="text-zinc-500">Thesis Defense Result:</span>
                <p className="font-semibold text-white">Grade A (Undergraduate)</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div className="space-y-1.5 rounded-lg border border-white/10 bg-black/85 p-3.5 font-mono text-xs backdrop-blur-md">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-emerald-400">[ok]</span>
              <span>[14:20:01] Session batch authenticated: Computer Lab 2</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-cyan-400">[info]</span>
              <span>[14:18:44] Automated inventory sync completed (0 discrepancies)</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-emerald-400">[ok]</span>
              <span>[14:15:10] Academic timetable dispatch triggered</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
