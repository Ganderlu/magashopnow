"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BagIcon, SearchIcon, UserIcon } from "@/components/Icons";
import * as React from "react";
import { useCart } from "@/components/CartProvider";
import { SearchModal } from "@/components/SearchModal";
import { AuthModal } from "@/components/AuthModal";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Medallions", href: "/medallions" },
  { label: "Apparel", href: "/apparel" },
  { label: "Accesories", href: "/accesories" },
  { label: "Track Your Order", href: "/track-your-order" },
];

export function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [authOpen, setAuthOpen] = React.useState(false);
  const { count } = useCart();

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/our-maga-shop.svg"
              alt="Our Maga Shop"
              width={92}
              height={54}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-7 text-[14px] font-medium text-zinc-600 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={[
                    "rounded px-3 py-1 transition-colors",
                    isActive
                      ? "bg-[#6c0d0d] text-white"
                      : "text-zinc-600 hover:text-zinc-900",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 text-zinc-600 sm:gap-4">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full p-2 transition-colors hover:bg-zinc-100 hover:text-zinc-900 md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <div className="flex w-5 flex-col gap-1.5">
              <div className="h-0.5 w-full rounded bg-current" />
              <div className="h-0.5 w-full rounded bg-current" />
              <div className="h-0.5 w-full rounded bg-current" />
            </div>
          </button>

          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <SearchIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="Account"
            onClick={() => setAuthOpen(true)}
          >
            <UserIcon className="h-5 w-5" />
          </button>
          <Link
            href="/cart"
            className="rounded-full p-2 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="Cart"
          >
            <span className="relative inline-flex">
              <BagIcon className="h-5 w-5" />
              {count > 0 ? (
                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#6c0d0d] px-1 text-[11px] font-extrabold text-white">
                  {count}
                </span>
              ) : null}
            </span>
          </Link>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />

          <div className="relative h-full w-full bg-white">
            <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-4 sm:px-6">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/our-maga-shop.svg"
                  alt="Our Maga Shop"
                  width={92}
                  height={54}
                  priority
                />
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 text-[18px] font-bold text-zinc-700"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <div className="mx-auto max-w-[1240px] px-4 pb-10 pt-6 sm:px-6">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={[
                        "flex items-center justify-between rounded-lg px-4 py-4 text-[16px] font-semibold",
                        isActive
                          ? "bg-[#6c0d0d] text-white"
                          : "bg-zinc-50 text-zinc-800",
                      ].join(" ")}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{item.label}</span>
                      <span
                        className={isActive ? "text-white/90" : "text-zinc-400"}
                      >
                        →
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-center gap-4 text-zinc-600">
                <button
                  type="button"
                  className="rounded-full border border-zinc-200 p-3 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                  aria-label="Search"
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                >
                  <SearchIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="rounded-full border border-zinc-200 p-3 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                  aria-label="Account"
                  onClick={() => {
                    setMobileOpen(false);
                    setAuthOpen(true);
                  }}
                >
                  <UserIcon className="h-5 w-5" />
                </button>
                <Link
                  href="/cart"
                  className="rounded-full border border-zinc-200 p-3 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                  aria-label="Cart"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="relative inline-flex">
                    <BagIcon className="h-5 w-5" />
                    {count > 0 ? (
                      <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#6c0d0d] px-1 text-[11px] font-extrabold text-white">
                        {count}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}
