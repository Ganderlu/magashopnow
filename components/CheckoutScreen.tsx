"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { CryptoWalletModal } from "@/components/CryptoWalletModal";
import { StripeCheckoutModal } from "@/components/StripeCheckoutModal";
import {
  formatUsd,
  getQfsBundleById,
  parseUsd,
  qfsBundles,
} from "@/lib/qfsBundles";

function Input({
  label,
  placeholder,
  right,
}: {
  label: string;
  placeholder?: string;
  right?: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-[11px] font-semibold text-zinc-800">
        {label}
      </div>
      <div className="relative">
        <input
          className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-[12px] text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
          placeholder={placeholder}
        />
        {right ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {right}
          </div>
        ) : null}
      </div>
    </label>
  );
}

function Select({
  label,
  options,
}: {
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <div className="mb-2 text-[11px] font-semibold text-zinc-800">
        {label}
      </div>
      <select className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-[12px] text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-200">
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full bg-[#2bb34a] px-3 py-1 text-[10px] font-extrabold text-white">
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[12px] font-extrabold text-zinc-900">{children}</div>
  );
}

function Divider() {
  return <div className="my-5 h-px w-full bg-zinc-200" />;
}

export function CheckoutScreen({ bundleId }: { bundleId?: string }) {
  const bundle =
    getQfsBundleById(bundleId) ??
    qfsBundles.find((b) => b.badge === "Most Popular")!;

  const price = parseUsd(bundle.price);
  const amountCents = Math.max(0, Math.round(price * 100));
  const futureValue = 1_097_460;
  const savings = Math.max(0, futureValue - price);

  const [discountCode, setDiscountCode] = React.useState("");
  const [paymentModal, setPaymentModal] = React.useState<null | "crypto" | "stripe">(null);

  const cryptoWalletAddress =
    process.env.NEXT_PUBLIC_CRYPTO_WALLET_ADDRESS ??
    "0x0000000000000000000000000000000000000000";
  const cryptoNetworkLabel =
    process.env.NEXT_PUBLIC_CRYPTO_NETWORK ?? "USDT (ERC20)";

  return (
    <div className="min-h-screen w-full bg-[#f4f4f4]">
      <div className="mx-auto max-w-[980px] px-4 pb-10 pt-6">
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/our-maga-shop.svg"
            alt="Our Maga Shop"
            width={110}
            height={70}
          />
          <div className="text-[12px] font-extrabold tracking-[0.18em] text-zinc-900">
            LIMITED TIME OFFER
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Pill>✓ SECURE</Pill>
            <Pill>✓ 100% USA</Pill>
            <Pill>✓ CERTIFIED</Pill>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.10)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px]">
            <div className="border-b border-zinc-200 px-6 py-6 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="grid h-4 w-4 place-items-center rounded bg-[#2bb34a] text-[10px] font-extrabold text-white">
                    ✓
                  </div>
                  <div className="text-[10px] font-extrabold text-zinc-700">
                    TrustedSite
                  </div>
                </div>
                <Link
                  href="/"
                  className="text-[11px] font-semibold text-blue-600"
                >
                  Sign in
                </Link>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <SectionTitle>Email or Phone</SectionTitle>
                <Input label="Email" placeholder="" />
                <label className="flex items-center gap-2 text-[11px] text-zinc-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-300"
                  />
                  Send me tracking and order updates
                </label>

                <Divider />

                <SectionTitle>Delivery</SectionTitle>
                <Select
                  label="Country/region"
                  options={[
                    { value: "us", label: "United States" },
                    { value: "ca", label: "Canada" },
                    { value: "uk", label: "United Kingdom" },
                  ]}
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Input label="First name" placeholder="" />
                  <Input label="Last name" placeholder="" />
                </div>
                <Input
                  label="Address"
                  placeholder=""
                  right={<span className="text-[12px] text-zinc-400">🔍</span>}
                />
                <Input
                  label="Apartment, suite, etc. (optional)"
                  placeholder=""
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <Input label="City" placeholder="" />
                  <Input label="State" placeholder="" />
                  <Input label="ZIP code" placeholder="" />
                </div>
                <Input label="Phone" placeholder="" />
                <label className="flex items-center gap-2 text-[11px] text-zinc-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-300"
                  />
                  Save this information for next time
                </label>

                <Divider />

                <SectionTitle>Shipping method</SectionTitle>
                <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-3 text-[11px] text-zinc-500">
                  Enter your shipping address to view available shipping
                  methods.
                </div>

                <Divider />

                <SectionTitle>Secure Checkout</SectionTitle>
                <div className="text-[11px] leading-4 text-zinc-600">
                  All transactions are secure and encrypted. Your order includes
                  free returns and 24/7 access to our award-winning customer
                  service.
                </div>

                <div className="mt-3 grid gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentModal("crypto")}
                    className="flex items-center justify-between rounded-md border border-zinc-200 bg-white px-4 py-3 text-left shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                  >
                    <div>
                      <div className="text-[12px] font-extrabold text-zinc-900">
                        Pay by crypto wallet address
                      </div>
                      <div className="mt-1 text-[11px] text-zinc-600">
                        Send {formatUsd(price)} to our wallet ({cryptoNetworkLabel})
                      </div>
                    </div>
                    <div className="text-[14px] font-extrabold text-zinc-400">
                      →
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentModal("stripe")}
                    className="flex items-center justify-between rounded-md border border-blue-600 bg-blue-50 px-4 py-3 text-left shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                  >
                    <div>
                      <div className="text-[12px] font-extrabold text-blue-700">
                        Pay by Stripe checkout
                      </div>
                      <div className="mt-1 text-[11px] text-zinc-600">
                        Enter card details securely
                      </div>
                    </div>
                    <div className="text-[14px] font-extrabold text-blue-700">
                      →
                    </div>
                  </button>
                </div>

                <CryptoWalletModal
                  open={paymentModal === "crypto"}
                  onClose={() => setPaymentModal(null)}
                  walletAddress={cryptoWalletAddress}
                  networkLabel={cryptoNetworkLabel}
                  amountUsd={price}
                  bundleLabel={bundle.label}
                />

                <StripeCheckoutModal
                  open={paymentModal === "stripe"}
                  onClose={() => setPaymentModal(null)}
                  amountUsd={price}
                  amountCents={amountCents}
                  bundleId={bundle.id}
                  bundleLabel={bundle.label}
                />

                <div className="mt-4 rounded-md border border-zinc-200 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                  <div className="text-center text-[10px] font-extrabold text-zinc-800">
                    VIP PATRIOTS ONLY: Secure Your X120 QFS GOLD BILLS Supply
                    Before Checkout Closes!
                  </div>
                  <div className="mt-4 flex items-center gap-3 rounded-md border border-zinc-200 bg-white p-3">
                    <div className="grid h-10 w-14 place-items-center overflow-hidden rounded border border-zinc-200 bg-white">
                      <Image
                        src="/qfs-icon.svg"
                        alt=""
                        width={52}
                        height={28}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-extrabold text-zinc-800">
                        X120 QFS GOLD BILLS{" "}
                        <span className="text-zinc-500">(60% OFF)</span>
                      </div>
                      <div className="mt-1 text-[10px] font-semibold text-zinc-500">
                        $99.00{" "}
                        <span className="text-zinc-400 line-through">
                          $249.00
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-4 h-10 w-full rounded-md bg-blue-600 text-[11px] font-extrabold tracking-wide text-white"
                  >
                    Add
                  </button>
                </div>

                <button
                  type="button"
                  className="mt-6 h-11 w-full rounded-md bg-blue-600 text-[12px] font-extrabold tracking-wide text-white"
                >
                  Complete Purchase
                </button>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-zinc-500">
                  {[
                    "Refund policy",
                    "Shipping",
                    "Privacy policy",
                    "Terms of service",
                    "Contact",
                  ].map((t) => (
                    <Link key={t} href="#" className="hover:text-zinc-700">
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#fafafa] px-6 py-6">
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-14 place-items-center overflow-hidden rounded-md border border-zinc-200 bg-white">
                  <Image src="/qfs-icon.svg" alt="" width={52} height={28} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-extrabold text-zinc-900">
                    QFS GOLD BILL
                  </div>
                  <div className="mt-0.5 text-[10px] text-zinc-500">
                    {bundle.label}
                  </div>
                </div>
                <div className="text-[11px] font-extrabold text-zinc-900">
                  {bundle.price}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <input
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Discount code"
                  className="h-10 flex-1 rounded-md border border-zinc-200 bg-white px-3 text-[12px] text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                />
                <button
                  type="button"
                  className="h-10 rounded-md bg-zinc-200 px-4 text-[11px] font-extrabold text-zinc-700"
                >
                  Apply
                </button>
              </div>

              <div className="mt-5 grid gap-2 text-[11px] text-zinc-700">
                <div className="flex items-center justify-between">
                  <div>Subtotal</div>
                  <div className="font-semibold text-zinc-900">
                    {bundle.price}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Shipping</div>
                  <div className="text-zinc-500">Enter shipping address</div>
                </div>
              </div>

              <Divider />

              <div className="flex items-baseline justify-between">
                <div className="text-[12px] font-extrabold text-zinc-900">
                  Total
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-semibold text-zinc-500">
                    USD
                  </div>
                  <div className="text-[18px] font-extrabold text-zinc-900">
                    {formatUsd(price)}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-2 text-[10px] font-semibold text-zinc-600">
                <div className="grid h-4 w-4 place-items-center rounded-full bg-zinc-200 text-[10px] text-zinc-700">
                  i
                </div>
                <div className="text-zinc-600">
                  TOTAL SAVINGS{" "}
                  <span className="font-extrabold text-zinc-900">
                    {formatUsd(savings)}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-[10px] font-extrabold text-zinc-700">
                <div className="grid h-4 w-4 place-items-center rounded bg-[#2bb34a] text-[10px] font-extrabold text-white">
                  ✓
                </div>
                TrustedSite
                <span className="text-zinc-400">·</span>
                SECURE CHECKOUT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
