export type CartItem = {
  id: string;
  title: string;
  price: string;
  imageSrc: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

const STORAGE_KEY = "oms_cart_v1";

export function readCart(): CartState {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw) as CartState;
    if (!parsed || !Array.isArray(parsed.items)) return { items: [] };
    return {
      items: parsed.items
        .filter((i) => i && typeof i.id === "string")
        .map((i) => ({
          id: String(i.id),
          title: String((i as CartItem).title ?? ""),
          price: String((i as CartItem).price ?? ""),
          imageSrc: String((i as CartItem).imageSrc ?? ""),
          quantity: Math.max(1, Number((i as CartItem).quantity ?? 1) || 1),
        })),
    };
  } catch {
    return { items: [] };
  }
}

export function writeCart(cart: CartState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("oms_cart_updated"));
}

export function getCartCount(cart: CartState): number {
  return cart.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
}

export function addToCart(
  cart: CartState,
  item: Omit<CartItem, "quantity">,
): CartState {
  const existing = cart.items.find((i) => i.id === item.id);
  if (existing) {
    return {
      items: cart.items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    };
  }
  return { items: [...cart.items, { ...item, quantity: 1 }] };
}

export function removeFromCart(cart: CartState, id: string): CartState {
  return { items: cart.items.filter((i) => i.id !== id) };
}

export function setCartItemQuantity(
  cart: CartState,
  id: string,
  quantity: number,
): CartState {
  const nextQty = Math.max(0, Math.floor(quantity));
  if (nextQty === 0) return removeFromCart(cart, id);
  return {
    items: cart.items.map((i) =>
      i.id === id ? { ...i, quantity: nextQty } : i,
    ),
  };
}

export function clearCart(): CartState {
  return { items: [] };
}
