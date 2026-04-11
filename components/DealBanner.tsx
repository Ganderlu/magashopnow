"use client";

import * as React from "react";
import { TrendUpIcon } from "@/components/Icons";
import { listenPromoData, PromoData } from "@/lib/promo";

export function DealBanner() {
  const [promo, setPromo] = React.useState<PromoData | null>(null);

  React.useEffect(() => {
    const unsub = listenPromoData((data) => setPromo(data));
    return () => unsub();
  }, []);

  return (
    <div className="w-full bg-[#f3f3f3] pb-10">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="mt-7 overflow-hidden rounded-2xl shadow-[0_18px_55px_rgba(0,0,0,0.35)]">
          <div className="relative flex min-h-[86px] items-center justify-between gap-6 px-5 py-4 sm:px-6">
            <div className="absolute inset-0 bg-[radial-gradient(140%_140%_at_0%_0%,#3a3a3a_0%,#1a1a1a_35%,#0c0c0c_100%)]" />
            <div className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.22)_0,rgba(255,255,255,0.22)_6px,rgba(0,0,0,0)_6px,rgba(0,0,0,0)_18px)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.12)_45%,rgba(0,0,0,0.65)_100%)]" />

            <div className="relative flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#b8ff4d_0%,#1ea84a_55%,#0f6e2f_100%)] text-[15px] font-extrabold text-white ring-2 ring-[#ffcf4a]/70">
                47
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-extrabold tracking-wide text-[#f2c44e]">
                  ASSET BACKED
                </div>
                <div className="text-[18px] font-extrabold tracking-wide text-white">
                  RAINBOW BILLS
                </div>
              </div>
            </div>

            <div className="relative hidden items-center gap-3 sm:flex">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-4 py-2">
                <div className="text-[10px] font-bold tracking-wide text-white/65">
                  BUNDLE PRICE
                </div>
                <div className="text-[14px] font-extrabold text-white">
                  {promo?.bundlePrice ?? "$3,499"}
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-400/25 bg-black/35 px-4 py-2">
                <div className="grid h-6 w-10 place-items-center rounded-full bg-emerald-500/10">
                  <TrendUpIcon className="h-4 w-4 text-emerald-300" />
                </div>
                <div className="text-[14px] font-extrabold text-emerald-300">
                  {promo?.profitDelta ?? "+$49,750"}
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-red-400/30 bg-black/35 px-4 py-2">
                <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_0_3px_rgba(255,0,0,0.15)]" />
                <div className="text-[13px] font-extrabold text-white">
                  {promo?.setsLeftLabel ?? "14 Sets Left"}
                </div>
              </div>
            </div>

            <div className="relative flex w-full items-center justify-end gap-2 sm:hidden">
              <div className="text-[12px] font-extrabold text-white/90">
                {promo?.bundlePrice ?? "$3,499"}
              </div>
              <div className="text-[12px] font-extrabold text-emerald-300">
                {promo?.profitDelta ?? "+$49,750"}
              </div>
              <div className="text-[12px] font-extrabold text-white">
                {promo?.setsLeftLabel ?? "14 Sets Left"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

