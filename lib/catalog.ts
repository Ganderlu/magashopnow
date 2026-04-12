export type CatalogItem = {
  id: string;
  title: string;
  href: string;
  imageSrc?: string;
};

export const catalogItems: CatalogItem[] = [
  { id: "home", title: "Home", href: "/" },
  { id: "best-sellers", title: "Best Sellers", href: "/best-sellers" },
  { id: "medallions", title: "Medallions", href: "/medallions" },
  { id: "apparel", title: "Apparel", href: "/apparel" },
  { id: "accesories", title: "Accesories", href: "/accesories" },
  { id: "checkout", title: "Checkout", href: "/checkout" },
  {
    id: "socks",
    title: "Trump 2024 Socks",
    href: "/apparel",
    imageSrc: "/images/socks.webp",
  },
  {
    id: "polo",
    title: "Polo",
    href: "/apparel",
    imageSrc: "/images/polo.webp",
  },
  {
    id: "cap",
    title: "Cap",
    href: "/apparel",
    imageSrc: "/images/cap.webp",
  },
  {
    id: "gold-coin",
    title: "Golden QFS Coin | LIMITED EDITION",
    href: "/medallions",
    imageSrc: "/images/q31.webp",
  },
  {
    id: "nesara-pack",
    title: "Nesara Gesara QFS Gold",
    href: "/medallions",
    imageSrc: "/images/q32.webp",
  },
  {
    id: "btc-bar",
    title: "Trump 1000 Bitcoin Gold Bar",
    href: "/medallions",
    imageSrc: "/images/q35.webp",
  },
  {
    id: "silver-medallion",
    title: "President Trump First 2026 Edition Silver Medallion",
    href: "/medallions",
    imageSrc: "/images/q36.webp",
  },
  {
    id: "liberty-coin",
    title: "Liberty Gold Coin",
    href: "/medallions",
    imageSrc: "/images/q38.webp",
  },
];

export function searchCatalog(query: string): CatalogItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return catalogItems
    .filter((i) => i.title.toLowerCase().includes(q))
    .slice(0, 12);
}

