import { doc, onSnapshot } from "firebase/firestore";
import { getFirestoreDb, isFirebaseConfigured } from "@/lib/firebase";

export type PromoData = {
  endsAtMs: number;
  bundlePrice: string;
  profitDelta: string;
  setsLeftLabel: string;
};

export const defaultPromoData: PromoData = {
  endsAtMs: Date.now() + 5 * 60_000 + 15_000,
  bundlePrice: "$3,499",
  profitDelta: "+$49,750",
  setsLeftLabel: "14 Sets Left",
};

type PromoDocShape = {
  endsAtMs?: number;
  bundlePrice?: string;
  profitDelta?: string;
  setsLeftLabel?: string;
};

export function listenPromoData(onChange: (data: PromoData) => void): () => void {
  onChange(defaultPromoData);

  if (!isFirebaseConfigured) return () => {};
  const db = getFirestoreDb();
  if (!db) return () => {};

  const ref = doc(db, "ui", "promo");

  return onSnapshot(
    ref,
    (snap) => {
      const data = snap.data() as PromoDocShape | undefined;
      if (!data) return;

      const endsAtMs =
        typeof data.endsAtMs === "number" ? data.endsAtMs : defaultPromoData.endsAtMs;

      onChange({
        endsAtMs,
        bundlePrice: data.bundlePrice ?? defaultPromoData.bundlePrice,
        profitDelta: data.profitDelta ?? defaultPromoData.profitDelta,
        setsLeftLabel: data.setsLeftLabel ?? defaultPromoData.setsLeftLabel,
      });
    },
    () => {},
  );
}

