"use client";

import * as React from "react";
import { listenPromoData } from "@/lib/promo";

function formatTwoDigits(value: number) {
  return String(Math.max(0, Math.floor(value))).padStart(2, "0");
}

function splitCountdown(totalSeconds: number) {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const days = Math.floor(clamped / 86400);
  const hours = Math.floor((clamped % 86400) / 3600);
  const minutes = Math.floor((clamped % 3600) / 60);
  const seconds = clamped % 60;

  return {
    days: formatTwoDigits(days),
    hours: formatTwoDigits(hours),
    minutes: formatTwoDigits(minutes),
    seconds: formatTwoDigits(seconds),
  };
}

function CounterBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-md border border-white/10 bg-black/35 px-6 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
      <div className="text-[22px] font-extrabold tracking-wide text-white tabular-nums">
        {value}
      </div>
      <div className="text-[9px] font-extrabold tracking-[0.2em] text-white/60">
        {label}
      </div>
    </div>
  );
}

export function GoldenAgeSection() {
  const [endsAtMs, setEndsAtMs] = React.useState<number>(() => Date.now() + 300_000);
  const [bundlePrice, setBundlePrice] = React.useState<string>("$3,499");
  const [nowMs, setNowMs] = React.useState<number>(() => Date.now());

  React.useEffect(() => {
    const unsub = listenPromoData((data) => {
      setEndsAtMs(data.endsAtMs);
      setBundlePrice(data.bundlePrice);
    });
    return () => unsub();
  }, []);

  React.useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 250);
    return () => window.clearInterval(id);
  }, []);

  const secondsLeft = Math.max(0, (endsAtMs - nowMs) / 1000);
  const countdown = splitCountdown(secondsLeft);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1240px] px-4 pb-10 pt-2 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-black/10 shadow-[0_22px_70px_rgba(0,0,0,0.25)]">
          <div className="relative">
            <div className="absolute inset-0 bg-[radial-gradient(120%_110%_at_20%_20%,#3a3a3a_0%,#111_40%,#0a0a0a_100%)]" />
            <div className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.10)_0,rgba(255,255,255,0.10)_7px,rgba(0,0,0,0)_7px,rgba(0,0,0,0)_22px)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.0)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.70)_100%)]" />

            <div className="relative flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded bg-black/40 px-3 py-1 text-[10px] font-extrabold tracking-[0.18em] text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                    LIMITED TIME
                  </div>
                  <div className="rounded bg-black/40 px-3 py-1 text-[10px] font-extrabold tracking-[0.18em] text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                    RAINBOW IS THE FUTURE
                  </div>
                </div>

                <div className="text-[42px] font-extrabold leading-[1.02] tracking-tight text-white sm:text-[50px]">
                  The Golden Age Is Here
                </div>

                <div className="flex items-end gap-6">
                  <div>
                    <div className="text-[10px] font-extrabold tracking-[0.18em] text-white/55">
                      CURRENT VALUE
                    </div>
                    <div className="mt-1 text-[44px] font-extrabold leading-none text-white">
                      {bundlePrice}
                    </div>
                  </div>

                  <div className="pb-1">
                    <div className="text-[10px] font-extrabold tracking-[0.18em] text-white/55">
                      FUTURE VALUE
                    </div>
                    <div className="mt-1 text-[28px] font-extrabold leading-none text-white/40 line-through">
                      $1,097,460.00
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full max-w-[520px] flex-col items-center gap-4 md:items-end">
                <div className="text-[10px] font-extrabold tracking-[0.22em] text-[#f3d25f]">
                  PRICE RESETS IN:
                </div>

                <div className="grid w-full grid-cols-4 gap-3">
                  <CounterBox value={countdown.days} label="DAYS" />
                  <CounterBox value={countdown.hours} label="HOURS" />
                  <CounterBox value={countdown.minutes} label="MINUTES" />
                  <CounterBox value={countdown.seconds} label="SECONDS" />
                </div>

                <button
                  type="button"
                  className="w-full rounded-lg bg-[linear-gradient(180deg,#d9b45c_0%,#9d7b2a_100%)] py-4 text-[11px] font-extrabold tracking-[0.22em] text-black shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
                >
                  CHECK AVAILABILITY
                </button>

                <div className="flex items-center gap-2 text-[10px] font-semibold text-white/70">
                  <div className="grid h-4 w-4 place-items-center rounded bg-black/40 text-[10px] text-white/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                    ▲
                  </div>
                  <div>
                    Lock in {bundlePrice} before the price increases to{" "}
                    <span className="font-extrabold">$1,097,460.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <div className="text-[18px] font-semibold text-zinc-700">As Featured On</div>
          <div className="mx-auto mt-2 h-[3px] w-14 rounded-full bg-red-600" />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-16 gap-y-8 pb-8">
          <div className="text-[20px] font-extrabold tracking-tight text-[#0b2a63]">
            FOX <span className="text-red-600">NEWS</span>
          </div>
          <div className="text-[22px] font-extrabold tracking-tight text-[#0b2a63]">
            NEWSMAX
          </div>
          <div className="text-[12px] font-extrabold tracking-[0.16em] text-zinc-500">
            RIGHT SIDE
          </div>
          <div className="text-[18px] font-extrabold tracking-tight text-[#0b2a63]">
            OAN
          </div>
          <div className="text-[22px] font-light tracking-[0.24em] text-zinc-700">
            BUSINESS
            <span className="ml-2 font-extrabold tracking-[0.1em]">INSIDER</span>
          </div>
          <div className="text-[20px] font-extrabold tracking-tight text-[#0b2a63]">
            FOX <span className="text-red-600">NEWS</span>
          </div>
          <div className="text-[22px] font-extrabold tracking-tight text-[#0b2a63]">
            NEWSMAX
          </div>
        </div>

        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 grid h-10 w-10 place-items-center rounded-full bg-[#7a0000] text-white shadow-[0_18px_55px_rgba(0,0,0,0.25)]"
        >
          ^
        </button>
      </div>
    </section>
  );
}

