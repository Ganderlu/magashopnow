import { NavBar } from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";

type CollectionCard = {
  id: string;
  title: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
};

const cards: CollectionCard[] = [
  { id: "accessories", title: "Accesories", href: "/accesories" },
  {
    id: "apparel",
    title: "Apparel",
    href: "/apparel",
    imageSrc: "/images/apparel-socks.svg",
    imageAlt: "Apparel",
  },
  {
    id: "home",
    title: "Home page",
    href: "/",
    imageSrc: "/images/medallion-bitcoin-bar.svg",
    imageAlt: "Home page",
  },
  {
    id: "medallions",
    title: "Medallions",
    href: "/medallions",
    imageSrc: "/images/q1.png",
    imageAlt: "Medallions",
  },
];

function CollectionTile({ card }: { card: CollectionCard }) {
  return (
    <Link
      href={card.href}
      className="group relative overflow-hidden rounded-xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
    >
      <div className="p-6">
        {card.imageSrc ? (
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[280px]">
            <Image
              src={card.imageSrc}
              alt={card.imageAlt ?? card.title}
              fill
              className="object-contain"
              priority={false}
            />
          </div>
        ) : (
          <div className="h-[180px]" />
        )}

        <div className="mt-6 text-center text-[13px] text-zinc-600">
          {card.title} <span className="text-zinc-400">→</span>
        </div>
      </div>
    </Link>
  );
}

export default function BestSellersPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <NavBar />

      <div className="mx-auto max-w-[1240px] px-4 pb-24 pt-10 sm:px-6">
        <div className="text-center text-[34px] font-light tracking-wide text-zinc-700">
          Collections
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
          <CollectionTile card={cards[0]} />
          <CollectionTile card={cards[1]} />
          <CollectionTile card={cards[2]} />
        </div>

        <div className="mt-10 max-w-[420px]">
          <CollectionTile card={cards[3]} />
        </div>

        <div className="mt-24 text-center">
          <div className="text-[22px] font-medium text-zinc-700">
            Subscribe to our emails
          </div>
          <div className="mx-auto mt-2 max-w-[520px] text-[11px] text-zinc-500">
            Join our email list for exclusive offers and the latest news.
          </div>

          <div className="mx-auto mt-5 grid max-w-[240px] gap-2">
            <input
              placeholder="Email"
              className="h-9 rounded-md border border-zinc-200 bg-white px-3 text-[12px] text-zinc-800 placeholder:text-zinc-400"
            />
            <button
              type="button"
              className="h-9 rounded-md bg-[#2a2a3a] text-[12px] font-semibold text-white shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

