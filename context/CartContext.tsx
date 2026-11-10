"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Product, products } from "@/lib/products";
import { MAX_QUANTITY } from "@/lib/pricing";

export type CartItem = Product & { quantity: number };
type StoredLine = { id: string; quantity: number };

type CartContextType = {
  cart: CartItem[];
  ready: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const STORAGE_KEY = "codedpet_cart";
const CartContext = createContext<CartContextType | undefined>(undefined);

const clamp = (n: number) => Math.max(1, Math.min(MAX_QUANTITY, Math.floor(n)));

export function CartProvider({ children }: { children: ReactNode }) {
  // Only ids and quantities are stored; names and prices always come from the catalogue.
  const [lines, setLines] = useState<StoredLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(raw)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage after mount
        setLines(
          raw
            .filter((l) => l && typeof l.id === "string" && products.some((p) => p.id === l.id))
            .map((l) => ({ id: l.id, quantity: clamp(Number(l.quantity) || 1) })),
        );
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  const cart = useMemo(
    () =>
      lines.flatMap((l) => {
        const p = products.find((x) => x.id === l.id);
        return p ? [{ ...p, quantity: l.quantity }] : [];
      }),
    [lines],
  );

  const addToCart = (product: Product, quantity = 1) =>
    setLines((prev) => {
      const existing = prev.find((l) => l.id === product.id);
      if (existing) return prev.map((l) => (l.id === product.id ? { ...l, quantity: clamp(l.quantity + quantity) } : l));
      return [...prev, { id: product.id, quantity: clamp(quantity) }];
    });

  const updateQuantity = (id: string, quantity: number) =>
    setLines((prev) =>
      quantity < 1 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, quantity: clamp(quantity) } : l)),
    );

  const removeFromCart = (id: string) => setLines((prev) => prev.filter((l) => l.id !== id));
  const clearCart = () => setLines([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, ready, addToCart, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
