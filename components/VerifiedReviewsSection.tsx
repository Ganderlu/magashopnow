"use client";

import Image from "next/image";

function StarRow() {
  return (
    <div className="flex items-center gap-1 text-[#d9b45c]">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-[12px]">
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({
  text,
  name,
  meta,
}: {
  text: string;
  name: string;
  meta: string;
}) {
  return (
    <div className="rounded-xl border border-[#d1b469]/70 bg-white px-6 py-5 shadow-[0_18px_55px_rgba(0,0,0,0.10)]">
      <div className="flex items-start justify-between gap-4">
        <StarRow />
        <div className="rounded-full border border-[#d1b469]/70 bg-[#fbf3d6] px-4 py-1 text-[10px] font-extrabold tracking-[0.18em] text-[#5b4a1a]">
          VERIFIED PATRIOT
        </div>
      </div>

      <div className="mt-3 text-[12px] leading-5 text-zinc-700">
        <span className="text-zinc-500">“</span>
        {text}
        <span className="text-zinc-500">”</span>
      </div>

      <div className="mt-4 text-[11px] font-extrabold text-zinc-800">
        {name} <span className="font-semibold text-zinc-500">· {meta}</span>
      </div>
    </div>
  );
}

function CheckItem({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-semibold text-white/80">
      <div className="grid h-5 w-5 place-items-center rounded-full bg-[#d9b45c]/20 text-[#d9b45c]">
        ✓
      </div>
      <div>{children}</div>
    </div>
  );
}

export function VerifiedReviewsSection() {
  return (
    <section className="w-full bg-[#f3f3f3]">
      <div className="mx-auto max-w-[1240px] px-4 pb-0 pt-10 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[28px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.12)]" />
              <div className="relative overflow-hidden rounded-[22px] border border-white bg-white">
                <Image
                  src="/reviews-hero.svg"
                  alt="QFS Gold Bill"
                  width={560}
                  height={560}
                  className="h-auto w-[560px] max-w-full"
                  priority={false}
                />
              </div>
              <div className="absolute right-6 top-10 h-44 w-44 rounded bg-black/40 blur-[0px]" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-[34px] font-extrabold leading-[1.05] tracking-tight text-black">
              THE VOICE OF THE NEW
              <br />
              ERA
            </div>
            <div className="mt-2 text-[10px] font-extrabold tracking-[0.22em] text-[#9d7b2a]">
              VERIFIED REVIEWS · CERTIFIED OWNERS · USA MINTED
            </div>

            <div className="mt-6 flex flex-col gap-5">
              <ReviewCard
                text="The quality is undeniable. The gold foils has a weight and shine to it that photos don't do justice. A true symbol of what is coming."
                name="Robert D."
                meta="Texas, USA"
              />
              <ReviewCard
                text="I've collected many Trump items, but the Rainbow Sovereign Note is the most detailed. The holographic security strip is top-tier."
                name="Susan M."
                meta="Florida, USA"
              />
              <ReviewCard
                text="Arrived in a hard protective case. It feels professional and secure. Proud to hold this piece of history for the 47th President."
                name="James K."
                meta="Ohio, USA"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 w-full bg-black">
        <div className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-full border border-[#d1b469]/40 bg-white/5 text-[#d9b45c]">
                🔒
              </div>
              <div>
                <div className="text-[14px] font-extrabold tracking-wide text-[#d9b45c]">
                  30-DAY MONEY-BACK GUARANTEE
                </div>
                <div className="mt-1 max-w-[640px] text-[12px] leading-5 text-white/70">
                  Try the QFS Gold Bill risk-free. If you&apos;re not 100% satisfied within 30
                  days, we&apos;ll refund you—no hassle.
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <CheckItem>Fast &amp; friendly support</CheckItem>
                  <CheckItem>Full refund on purchase price</CheckItem>
                  <CheckItem>256-bit Secure SSL Checkout</CheckItem>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="h-12 rounded-md bg-[linear-gradient(180deg,#d9b45c_0%,#9d7b2a_100%)] px-8 text-[10px] font-extrabold tracking-[0.22em] text-black shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
            >
              READ REFUND POLICY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

