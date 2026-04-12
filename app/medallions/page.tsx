import { NavBar } from "@/components/NavBar";
import Image from "next/image";

type MedallionItem = {
  id: string;
  title: string;
  price: string;
  compareAt?: string;
  badge?: string;
  soldOut?: boolean;
  imageSrc: string;
  imageAlt: string;
};

const items: MedallionItem[] = [
  {
    id: "qfs-bill",
    title: "QFS GOLD BILL",
    price: "$1,399.00",
    imageSrc: "/images/q1.png",
    imageAlt: "QFS Gold Bill",
  },
  {
    id: "gold-coin",
    title: "Golden QFS Coin | LIMITED EDITION",
    price: "$1,399.99",
    badge: "SAVE 90%",
    compareAt: "$14,999.00",
    imageSrc: "/images/medallion-coin.svg",
    imageAlt: "Golden QFS Coin",
  },
  {
    id: "nesara-pack",
    title: "Nesara Gesara QFS Gold",
    price: "$1,399.99",
    imageSrc: "/images/medallion-nesara-pack.svg",
    imageAlt: "Nesara Gesara pack",
  },
  {
    id: "x25-bills",
    title: "X25 QFS GOLD BILLS",
    price: "$299.00",
    badge: "SAVE 90%",
    compareAt: "$2,999.00",
    imageSrc: "/images/q1.png",
    imageAlt: "X25 QFS Gold Bills",
  },
  {
    id: "bitcoin-bar",
    title: "Trump 1000 Bitcoin Gold Bar",
    price: "$19,999.00",
    imageSrc: "/images/medallion-bitcoin-bar.svg",
    imageAlt: "Bitcoin Gold Bar",
  },
  {
    id: "x120-bills",
    title: "X120 QFS GOLD BILLS",
    price: "$999.00",
    badge: "SAVE 90%",
    compareAt: "$9,999.00",
    imageSrc: "/images/q1.png",
    imageAlt: "X120 QFS Gold Bills",
  },
  {
    id: "trump-silver",
    title: "President Trump First 2026 Edition Silver Medallion",
    price: "$49.00",
    imageSrc: "/images/medallion-trump-silver.svg",
    imageAlt: "Trump Silver Medallion",
  },
  {
    id: "x180-bills",
    title: "X180 QFS GOLD BILLS",
    price: "$1,399.00",
    badge: "SAVE 90%",
    compareAt: "$13,999.00",
    imageSrc: "/images/q1.png",
    imageAlt: "X180 QFS Gold Bills",
  },
  {
    id: "liberty-coin",
    title: "Liberty Gold Coin",
    price: "$179.99",
    soldOut: true,
    imageSrc: "/images/medallion-liberty-coin.svg",
    imageAlt: "Liberty Gold Coin",
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

function Card({ item }: { item: MedallionItem }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
      <div className="relative bg-[#f6f6f6] p-4">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[240px]">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            className="object-contain"
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
        >
          {item.soldOut ? "Sold out" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

export default function MedallionsPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <NavBar />

      <div className="mx-auto max-w-[1240px] px-4 pb-14 pt-10 sm:px-6">
        <div className="text-center text-[40px] font-light tracking-wide text-zinc-700">
          Medallions
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
            <div className="text-[12px] text-zinc-500">9 products</div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

