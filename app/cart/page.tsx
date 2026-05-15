"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { formatPrice } = useCurrency();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
        <p className="text-white/50 mb-8">You haven&apos;t added anything yet.</p>
        <Link
          href="/shop"
          className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition"
        >
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border border-white/10 rounded-2xl p-5 bg-white/5">
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-white/40 text-sm">{item.sku}</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="font-bold">{formatPrice(item.price)}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 text-sm hover:text-red-300 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
        <div>
          <p className="text-white/50 text-sm">Total</p>
          <p className="text-2xl font-bold">{formatPrice(total)}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={clearCart}
            className="border border-white/20 text-sm px-4 py-2 rounded-full hover:bg-white/10 transition"
          >
            Clear Cart
          </button>
          <Link
            href="/checkout"
            className="bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-white/90 transition"
          >
            Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
