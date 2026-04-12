"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { NavBar } from "@/components/NavBar";
import {
  clearCart,
  removeFromCart,
  setCartItemQuantity,
  writeCart,
} from "@/lib/cart";
import { useCart } from "@/components/CartProvider";
import { parseUsd } from "@/lib/qfsBundles";

export default function CartPage() {
  const { cart } = useCart();

  const subtotal = React.useMemo(() => {
    return cart.items.reduce(
      (sum, item) => sum + parseUsd(item.price) * item.quantity,
      0,
    );
  }, [cart.items]);

  return (
    <div className="min-h-screen w-full bg-white">
      <NavBar />

      <div className="mx-auto max-w-[980px] px-4 pb-16 pt-10 sm:px-6">
        <div className="text-[28px] font-light text-zinc-800">Cart</div>

        {cart.items.length === 0 ? (
          <div className="mt-10 rounded-xl border border-zinc-200 bg-white p-8 text-center">
            <div className="text-[14px] font-semibold text-zinc-700">
              Your cart is empty.
            </div>
            <Link
              href="/"
              className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-[#6c0d0d] px-5 text-[12px] font-extrabold text-white"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="grid gap-3">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded border border-zinc-200 bg-white">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-extrabold text-zinc-900">
                      {item.title}
                    </div>
                    <div className="mt-1 text-[12px] font-semibold text-zinc-700">
                      {item.price}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="grid h-8 w-8 place-items-center rounded-md border border-zinc-200 bg-white text-[14px] font-bold text-zinc-800"
                      onClick={() => {
                        const next = setCartItemQuantity(
                          cart,
                          item.id,
                          item.quantity - 1,
                        );
                        writeCart(next);
                      }}
                    >
                      −
                    </button>
                    <div className="w-8 text-center text-[12px] font-extrabold text-zinc-900 tabular-nums">
                      {item.quantity}
                    </div>
                    <button
                      type="button"
                      className="grid h-8 w-8 place-items-center rounded-md border border-zinc-200 bg-white text-[14px] font-bold text-zinc-800"
                      onClick={() => {
                        const next = setCartItemQuantity(
                          cart,
                          item.id,
                          item.quantity + 1,
                        );
                        writeCart(next);
                      }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="ml-2 text-[12px] font-extrabold text-[#6c0d0d]"
                    onClick={() => {
                      const next = removeFromCart(cart, item.id);
                      writeCart(next);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="w-fit text-[12px] font-extrabold text-zinc-600"
                onClick={() => writeCart(clearCart())}
              >
                Clear cart
              </button>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between text-[12px] text-zinc-700">
                <div>Subtotal</div>
                <div className="font-extrabold text-zinc-900">
                  ${subtotal.toFixed(2)}
                </div>
              </div>

              <div className="mt-4 text-[11px] text-zinc-500">
                Taxes and shipping calculated at checkout.
              </div>

              <Link
                href="/checkout"
                className="mt-5 grid h-11 place-items-center rounded-md bg-blue-600 text-[12px] font-extrabold text-white"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
