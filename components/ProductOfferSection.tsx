"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { listenPromoData } from "@/lib/promo";
import { qfsBundles } from "@/lib/qfsBundles";

function formatTime(totalSeconds: number) {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(clamped / 3600);
  const m = Math.floor((clamped % 3600) / 60);
  const s = clamped % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function DeliveryStep({
  title,
  date,
  active,
}: {
  title: string;
  date: string;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div
        className={[
          "grid h-10 w-10 place-items-center rounded-full border text-[12px] font-bold",
          active
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-zinc-200 bg-white text-zinc-500",
        ].join(" ")}
      >
        ✓
      </div>
      <div className="text-[11px] font-semibold text-zinc-800">{title}</div>
      <div className="text-[10px] text-zinc-500">{date}</div>
    </div>
  );
}

function LiveFeedCard() {
  const items = [
    {
      name: "Faith & Freedom",
      text: "GoodBlessUSA... just now",
      body: "Ordering a new for my grandkids. They need to know what real money looks like when the time comes. God bless America.",
      likes: "252 Likes",
    },
    {
      name: "RedWave2025",
      text: "@AmericaFirst · just now",
      body: "Best purchase I've made this year. It gives me hope every time I look at it. The Golden Age is here. #MAGA",
      likes: "641 Likes",
    },
    {
      name: "UltraMAGA",
      text: "@DarkMAGA · just now",
      body: "Just received my Rainbow Bill. Proof: don't do it justice. The holographic gold is amazing!! It's happening. #Truth",
      likes: "725 Likes",
    },
    {
      name: "LibertyBell",
      text: "@1776_Forever · just now",
      body: "Just received my Rainbow Bill. Photo doesn't do it justice. The holographic gold is stunning!! It's happening. #Truth",
      likes: "753 Likes",
    },
  ];

  return (
    <div className="mt-6 w-full max-w-[420px] rounded-lg border border-zinc-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-3">
        <div className="grid h-7 w-7 place-items-center rounded bg-[#4a7bd6] text-[12px] font-extrabold text-white">
          t
        </div>
        <div className="text-[11px] font-extrabold tracking-wide text-zinc-800">
          LIVE FEED FROM TRUTH SOCIAL
        </div>
      </div>

      <div className="relative max-h-[220px] overflow-hidden px-3 py-3">
        <div className="max-h-[220px] overflow-y-auto pr-3 [scrollbar-width:thin]">
          <div className="flex flex-col gap-3">
            {items.map((it) => (
              <div
                key={it.name}
                className="rounded-md border border-zinc-200 bg-white p-3"
              >
                <div className="flex items-start gap-2">
                  <div className="grid h-7 w-7 place-items-center rounded bg-[#7f3ed6] text-[12px] font-extrabold text-white">
                    {it.name.slice(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-extrabold text-zinc-800">
                      {it.name}
                    </div>
                    <div className="text-[10px] text-zinc-500">{it.text}</div>
                  </div>
                </div>
                <div className="mt-2 text-[11px] leading-4 text-zinc-700">
                  {it.body}
                </div>
                <div className="mt-2 text-[10px] font-semibold text-red-500">
                  ♥ {it.likes}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute right-2 top-4 h-[190px] w-2 rounded-full bg-zinc-200">
          <div className="mt-2 h-24 w-2 rounded-full bg-[#6c2bd9]" />
        </div>
      </div>
    </div>
  );
}

export function ProductOfferSection() {
  const [selectedId, setSelectedId] = React.useState<string>("90x");
  const [endsAtMs, setEndsAtMs] = React.useState<number>(
    () => Date.now() + 4 * 60_60_000,
  );
  const [nowMs, setNowMs] = React.useState<number>(() => Date.now());
  const [activeThumb, setActiveThumb] = React.useState<"front" | "back">(
    "front",
  );

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
    <section className="w-full bg-white">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:gap-14">
        <div className="flex w-full flex-col gap-4 lg:w-[58%]">
          <div className="flex items-start gap-5">
            <div className="flex flex-1 flex-col gap-4">
              <div className="grid gap-4">
                <div className="overflow-hidden rounded border border-zinc-200 bg-white shadow-[0_8px_26px_rgba(0,0,0,0.08)]">
                  <Image
                    src="/images/q1.png"
                    alt="QFS Gold Bill"
                    width={900}
                    height={450}
                    className="h-auto w-full"
                    priority
                  />
                </div>
                <div className="overflow-hidden rounded border border-zinc-200 bg-white shadow-[0_8px_26px_rgba(0,0,0,0.08)]">
                  <Image
                    src="/images/q1.png"
                    alt="QFS Gold Bill back"
                    width={900}
                    height={450}
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>

            <div className="hidden flex-col items-center gap-3 pt-1 sm:flex">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-zinc-200 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
                <Image
                  src="/gold-seal.svg"
                  alt="Gold seal"
                  width={34}
                  height={34}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={() => setActiveThumb("front")}
              className={[
                "overflow-hidden rounded border bg-white shadow-[0_10px_22px_rgba(0,0,0,0.12)] transition-transform",
                activeThumb === "front" ? "border-black/50" : "border-zinc-200",
              ].join(" ")}
              aria-label="Front image"
            >
              <Image
                src="/images/q1.png"
                alt="Front thumb"
                width={90}
                height={56}
              />
            </button>
            <button
              type="button"
              onClick={() => setActiveThumb("back")}
              className={[
                "overflow-hidden rounded border bg-white shadow-[0_10px_22px_rgba(0,0,0,0.12)] transition-transform",
                activeThumb === "back" ? "border-black/50" : "border-zinc-200",
              ].join(" ")}
              aria-label="Back image"
            >
              <Image
                src="/images/q1.png"
                alt="Back thumb"
                width={90}
                height={56}
              />
            </button>
            <button
              type="button"
              className="overflow-hidden rounded border border-zinc-200 bg-white shadow-[0_10px_22px_rgba(0,0,0,0.12)]"
              aria-label="Extra image"
            >
              <Image
                src="/images/q1.png"
                alt="Mini thumb"
                width={90}
                height={56}
              />
            </button>
          </div>
        </div>

        <div className="flex w-full justify-center lg:w-[42%] lg:justify-end">
          <div className="w-full max-w-[390px]">
            <div className="text-center text-[18px] font-medium tracking-wide text-zinc-800">
              QFS GOLD BILL
            </div>

            <div className="mt-3 rounded-[14px] border border-[#e7c36b] bg-[linear-gradient(180deg,#0b0b0b_0%,#2a2a2a_100%)] px-4 py-3 text-center shadow-[0_18px_55px_rgba(0,0,0,0.18)]">
              <div className="text-[10px] font-extrabold uppercase tracking-wide text-[#f3d25f]">
                Special Offer! $3,499
              </div>
              <div className="mt-1 text-[10px] font-semibold text-white/80">
                Our Normal Price <span className="line-through">$12,000</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-[11px]">
              <span className="font-extrabold text-[#00b67a]">★</span>
              <span className="font-semibold text-zinc-700">Trustpilot</span>
              <span className="text-zinc-400">|</span>
              <span className="font-semibold text-zinc-700">4.8</span>
              <span className="text-zinc-500">Excellent</span>
            </div>

            <div className="mt-4 text-center text-[10px] font-extrabold tracking-wide text-zinc-700">
              BUNDLE &amp; SAVE
            </div>

            <div className="mt-2 rounded-full bg-zinc-200 px-4 py-2 text-center text-[10px] font-semibold text-zinc-700">
              Hurry! offer expires in{" "}
              <span className="font-extrabold tabular-nums text-zinc-900">
                {formatTime(secondsLeft)}
              </span>
            </div>

            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-full rounded-full bg-black"
                style={{
                  width: `${Math.max(2, Math.min(100, (secondsLeft / 315_000) * 100))}%`,
                }}
              />
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {qfsBundles.map((opt) => {
                const selected = opt.id === selectedId;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedId(opt.id)}
                    className={[
                      "relative flex items-center gap-3 rounded-md border px-3 py-2 text-left transition-colors",
                      selected
                        ? "border-black bg-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                        : "border-zinc-200 bg-white text-zinc-800",
                    ].join(" ")}
                  >
                    <div className="grid h-7 w-10 place-items-center overflow-hidden rounded border border-zinc-200 bg-white">
                      <Image
                        src="/images/q1.png"
                        alt=""
                        width={34}
                        height={18}
                        className="h-auto w-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-[11px] font-extrabold">
                        {opt.label}
                      </div>
                    </div>
                    <div className="text-[11px] font-extrabold">
                      {opt.price}
                    </div>

                    {opt.badge ? (
                      <div className="absolute -top-2 right-3 rounded bg-black px-2 py-0.5 text-[9px] font-extrabold text-white">
                        {opt.badge}
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 overflow-hidden rounded-[12px] border border-[#7a0000] bg-[linear-gradient(180deg,#7a0000_0%,#3a0000_100%)] shadow-[0_18px_55px_rgba(0,0,0,0.18)]">
              <div className="px-4 pb-3 pt-4 text-center">
                <div className="text-[10px] font-extrabold uppercase tracking-wide text-[#ffd36a]">
                  Special Offer!
                </div>
                <div className="mt-1 text-[12px] font-extrabold text-white">
                  400X QFS GOLD BILLS{" "}
                  <span className="text-[#ffd36a]">$3,499.00</span>
                </div>
                <div className="mt-1 text-[10px] font-semibold text-white/80">
                  + FREE 80X QFS GOLD BILLS
                </div>
              </div>
            </div>

            <Link
              href={`/checkout?bundle=${encodeURIComponent(selectedId)}`}
              className="mt-4 grid w-full place-items-center rounded-[10px] border border-[#e7c36b] bg-black py-3 text-[12px] font-extrabold tracking-[0.22em] text-[#e7c36b] shadow-[0_14px_38px_rgba(0,0,0,0.22)]"
            >
              BUY NOW
            </Link>

            <div className="mt-4 flex items-center justify-center gap-2">
              {["VISA", "MC", "AMEX", "DISC", "PAY"].map((t) => (
                <div
                  key={t}
                  className="grid h-5 w-10 place-items-center rounded border border-zinc-200 bg-white text-[9px] font-extrabold text-zinc-600"
                >
                  {t}
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between gap-2">
              <DeliveryStep title="Ordered" date="Apr 11th" active />
              <div className="h-px flex-1 bg-zinc-200" />
              <DeliveryStep title="Ready" date="Apr 12th - Apr 13th" active />
              <div className="h-px flex-1 bg-zinc-200" />
              <DeliveryStep title="Delivered" date="Apr 21st - Apr 23rd" />
            </div>

            <LiveFeedCard />
          </div>
        </div>
      </div>
    </section>
  );
}
