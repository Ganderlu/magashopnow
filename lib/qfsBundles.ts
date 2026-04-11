export type QfsBundle = {
  id: string;
  label: string;
  price: string;
  badge?: "Most Popular";
};

export const qfsBundles: QfsBundle[] = [
  { id: "10x", label: "10X QFS GOLD BILLS", price: "$179.00" },
  { id: "25x", label: "25X QFS GOLD BILLS", price: "$329.00" },
  { id: "60x", label: "60X QFS GOLD BILLS", price: "$729.00" },
  { id: "90x", label: "90X QFS GOLD BILLS", price: "$1,399.00", badge: "Most Popular" },
  { id: "free-30x", label: "FREE 30X QFS GOLD BILLS", price: "$0.00" },
  { id: "150x", label: "150X QFS GOLD BILLS", price: "$1,829.00" },
  { id: "free-50x", label: "FREE 50X QFS GOLD BILLS", price: "$0.00" },
];

export function getQfsBundleById(id: string | null | undefined): QfsBundle | null {
  if (!id) return null;
  return qfsBundles.find((b) => b.id === id) ?? null;
}

export function parseUsd(input: string): number {
  const normalized = input.replace(/[^0-9.]/g, "");
  const value = Number(normalized);
  return Number.isFinite(value) ? value : 0;
}

export function formatUsd(value: number): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

