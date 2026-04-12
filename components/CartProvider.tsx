"use client";

import * as React from "react";
import { addToCart, CartState, getCartCount, readCart, writeCart } from "@/lib/cart";

type CartApi = {
  cart: CartState;
  count: number;
  add: (item: { id: string; title: string; price: string; imageSrc: string }) => void;
};

const CartContext = React.createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<CartState>({ items: [] });

  React.useEffect(() => {
    setCart(readCart());

    const onUpdate = () => setCart(readCart());
    window.addEventListener("storage", onUpdate);
    window.addEventListener("oms_cart_updated", onUpdate);
    return () => {
      window.removeEventListener("storage", onUpdate);
      window.removeEventListener("oms_cart_updated", onUpdate);
    };
  }, []);

  const count = React.useMemo(() => getCartCount(cart), [cart]);

  const add = React.useCallback(
    (item: { id: string; title: string; price: string; imageSrc: string }) => {
      setCart((prev) => {
        const next = addToCart(prev, item);
        writeCart(next);
        return next;
      });
    },
    [],
  );

  return (
    <CartContext.Provider value={{ cart, count, add }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = React.useContext(CartContext);
  if (!value) {
    throw new Error("useCart must be used within CartProvider");
  }
  return value;
}

