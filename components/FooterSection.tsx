"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const quickLinks = [
  "Home",
  "Best Sellers",
  "Medallions",
  "Apparel",
  "Accesories",
  "Track Your Order",
];

const policyLinks = [
  "Terms of Service",
  "Privacy Policy",
  "Shipping Policy",
  "Refund Policy",
  "Contact Us",
];

type PaymentPill = {
  label: string;
  bg: string;
  fg: string;
};

const payments: PaymentPill[] = [
  { label: "AMEX", bg: "#0077c8", fg: "#ffffff" },
  { label: "D", bg: "#1a74d8", fg: "#ffffff" },
  { label: "DISC", bg: "#ffffff", fg: "#111111" },
  { label: "GPay", bg: "#ffffff", fg: "#111111" },
  { label: "MC", bg: "#ffffff", fg: "#111111" },
  { label: "Mastercard", bg: "#ffffff", fg: "#111111" },
  { label: "VISA", bg: "#ffffff", fg: "#1a3aa7" },
];

export function FooterSection() {
  const [email, setEmail] = React.useState("");

  return (
    <footer className="w-full bg-[radial-gradient(120%_120%_at_10%_10%,#1a1a1a_0%,#0b0b0b_45%,#050505_100%)] text-white">
      <div className="mx-auto max-w-[1240px] px-6 pb-10 pt-14">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-12">
          <div className="flex items-start">
            <Image
              src="/our-maga-shop.svg"
              alt="Our Maga Shop"
              width={160}
              height={92}
            />
          </div>

          <div>
            <div className="text-[22px] font-medium tracking-wide text-white/90">
              Quick links
            </div>
            <div className="mt-6 flex flex-col gap-4 text-[14px] text-white/75">
              {quickLinks.map((label) => (
                <Link
                  key={label}
                  href="#"
                  className="w-fit transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[22px] font-medium tracking-wide text-white/90">
              Address
            </div>
            <div className="mt-6 flex flex-col gap-4 text-[16px] font-medium text-white/75">
              <div>Constitution Triumph LLC</div>
              <div>1309 Coffeen Avenue STE 1200</div>
              <div>Sheridan Wyoming 82801</div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-12">
          <div>
            <div className="text-[26px] font-medium tracking-wide text-white/90">
              Policies
            </div>
            <div className="mt-7 flex flex-col gap-4 text-[14px] text-white/75">
              {policyLinks.map((label) => (
                <Link
                  key={label}
                  href="#"
                  className="w-fit transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="text-[26px] font-medium tracking-wide text-white/90">
              Subscribe to our emails
            </div>
            <div className="mt-5 max-w-[460px] text-[14px] leading-6 text-white/70">
              Join our email list for exclusive offers and the latest news.
            </div>

            <form
              className="mt-6 flex max-w-[460px] flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="h-12 w-full rounded-md border border-white/20 bg-transparent px-4 text-[14px] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <button
                type="submit"
                className="h-12 w-full rounded-md bg-white text-[16px] font-semibold text-black"
              >
                Sign up
              </button>
            </form>
          </div>

          <div className="hidden md:block" />
        </div>
      </div>

      <div className="w-full border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 px-6 py-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {payments.map((p) => (
              <div
                key={p.label}
                className="grid h-6 min-w-10 place-items-center rounded-sm px-2 text-[10px] font-extrabold"
                style={{ backgroundColor: p.bg, color: p.fg }}
              >
                {p.label}
              </div>
            ))}
          </div>
          <div className="text-[12px] text-white/60">© 2026, Our Maga Shop</div>
        </div>
      </div>
    </footer>
  );
}

