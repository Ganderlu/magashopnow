import Image from "next/image";
import Link from "next/link";
import { BagIcon, SearchIcon, UserIcon } from "@/components/Icons";

const navItems = [
  "Home",
  "Best Sellers",
  "Medallions",
  "Apparel",
  "Accesories",
  "Track Your Order",
];

export function NavBar() {
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
            {navItems.map((label) => (
              <Link
                key={label}
                href="#"
                className="transition-colors hover:text-zinc-900"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 text-zinc-600">
          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="Search"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="Account"
          >
            <UserIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="Cart"
          >
            <BagIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

