"use client";

import * as React from "react";
import { listenPromoData } from "@/lib/promo";
import { BoltIcon, HourglassIcon } from "@/components/Icons";

function formatTime(totalSeconds: number) {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(clamped / 3600);
  const m = Math.floor((clamped % 3600) / 60);
  const s = clamped % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function PromoBar() {
  const [endsAtMs, setEndsAtMs] = React.useState<number>(() => Date.now() + 315_000);
  const [nowMs, setNowMs] = React.useState<number>(() => Date.now());

  React.useEffect(() => {
    const unsub = listenPromoData((data) => setEndsAtMs(data.endsAtMs));
    return () => unsub();
  }, []);

  React.useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 250);
    return () => window.clearInterval(id);
  }, []);

  const secondsLeft = Math.max(0, (endsAtMs - nowMs) / 1000);

  return (
    <div className="w-full bg-[linear-gradient(90deg,#2a0000_0%,#5a0000_50%,#2a0000_100%)] text-zinc-100">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center gap-1 py-2 md:hidden">
          <div className="flex items-center gap-2 text-[11px] font-extrabold tracking-wide text-[#f3d25f]">
            <HourglassIcon className="h-3.5 w-3.5" />
            <span className="text-center uppercase">
              Limited-time offer — available only for a few minutes
            </span>
          </div>
          <div className="text-center text-[22px] font-extrabold tabular-nums text-white">
            {formatTime(secondsLeft)}
          </div>
        </div>

        <div className="hidden h-8 items-center justify-between text-[11px] font-semibold tracking-wide md:flex">
          <div className="flex items-center gap-2 text-[#f3d25f]">
            <HourglassIcon className="h-3.5 w-3.5" />
            <span className="uppercase">
              Limited-time offer — available only for a few minutes
            </span>
          </div>

          <div className="min-w-[88px] text-center text-zinc-100 tabular-nums">
            {formatTime(secondsLeft)}
          </div>

          <div className="flex items-center gap-2 text-[#f3d25f]">
            <BoltIcon className="h-3.5 w-3.5" />
            <span className="uppercase text-zinc-100">
              Lock in your deal before the timer hits zero.
            </span>
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-[linear-gradient(90deg,rgba(255,215,80,0)_0%,rgba(255,215,80,0.65)_50%,rgba(255,215,80,0)_100%)]" />
    </div>
  );
}
