"use client";

import { NavBar } from "@/components/NavBar";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import * as React from "react";

type ApparelItem = {
  id: string;
  title: string;
  price: string;
  compareAt?: string;
  badge?: string;
  soldOut?: boolean;
  imageSrc: string;
  imageAlt: string;
};

const items: ApparelItem[] = [
  {
    id: "socks",
    title: "Trump 2024 Socks",
    price: "$9.99",
    compareAt: "$19.99",
    badge: "SAVE 50%",
    imageSrc: "/images/soc.webp",
    imageAlt: "Trump 2024 Socks",
  },
  {
    id: "jesus-shirt",
    title: "Jesus Is My Savior Trump Is My President Shirt",
    price: "$39.99",
    soldOut: true,
    imageSrc: "/images/polo.webp",
    imageAlt: "Jesus Is My Savior Trump Is My President Shirt",
  },
  {
    id: "maga-hat",
    title: "Make America Great Again Dark MAGA Edition",
    price: "$55.00",
    compareAt: "$149.00",
    badge: "SAVE 63%",
    imageSrc: "/images/cap.webp",
    imageAlt: "Make America Great Again Dark MAGA Edition",
  },
];

function Dropdown({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 text-[12px] text-zinc-600"
    >
      <span>{label}</span>
      <span className="text-zinc-400">▾</span>
    </button>
  );
}

function Card({ item }: { item: ApparelItem }) {
  const { add } = useCart();
  const [added, setAdded] = React.useState(false);

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
      <div className="relative bg-[#f6f6f6] p-4">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px]">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 90vw, 260px"
            priority={false}
          />
        </div>

        {item.badge ? (
          <div className="absolute bottom-4 left-4 rounded bg-[#6c0d0d] px-2 py-1 text-[10px] font-extrabold tracking-wide text-white">
            {item.badge}
          </div>
        ) : null}

        {item.soldOut ? (
          <div className="absolute bottom-4 left-4 rounded bg-black/70 px-2 py-1 text-[10px] font-extrabold tracking-wide text-white">
            Sold out
          </div>
        ) : null}
      </div>

      <div className="p-4 text-center">
        <div className="mx-auto min-h-[44px] max-w-[250px] text-[12px] leading-4 text-zinc-600">
          {item.title}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-[12px] font-extrabold">
          <div className="text-[#6c0d0d]">{item.price}</div>
          {item.compareAt ? (
            <div className="font-semibold text-zinc-400 line-through">
              {item.compareAt}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          disabled={item.soldOut}
          className={[
            "mt-3 h-10 w-full rounded-md text-[12px] font-extrabold",
            item.soldOut
              ? "bg-[#b79090] text-white"
              : "bg-[#6c0d0d] text-white",
          ].join(" ")}
          onClick={() => {
            if (item.soldOut) return;
            add({
              id: item.id,
              title: item.title,
              price: item.price,
              imageSrc: item.imageSrc,
            });
            setAdded(true);
            window.setTimeout(() => setAdded(false), 1200);
          }}
        >
          {item.soldOut ? "Sold out" : added ? "Added" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

export default function ApparelPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <NavBar />

      <div className="mx-auto max-w-[1240px] px-4 pb-14 pt-10 sm:px-6">
        <div className="text-center text-[40px] font-light tracking-wide text-zinc-700">
          Apparel
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[12px] text-zinc-500">Filter:</div>
            <Dropdown label="Availability" />
            <Dropdown label="Price" />
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <div className="flex items-center gap-3">
              <div className="text-[12px] text-zinc-500">Sort by:</div>
              <Dropdown label="Best selling" />
            </div>
            <div className="text-[12px] text-zinc-500">3 products</div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
