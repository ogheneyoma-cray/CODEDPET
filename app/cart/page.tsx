"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { formatPrice } = useCurrency();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Your Cart</h1>
        <p className="text-slate-600 mb-8">You haven&apos;t added anything yet.</p>
        <Link
          href="/shop"
          className="bg-[#00C853] text-slate-900 font-semibold px-6 py-3 rounded-full hover:bg-[#00b34a] transition"
        >
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-slate-900">Your Cart</h1>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border border-slate-200 rounded-2xl p-5 bg-white">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-16 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">{item.name}</h2>
                <p className="text-slate-500 text-sm">{item.sku}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="font-bold text-slate-900">{formatPrice(item.price)}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 text-sm hover:text-red-700 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
        <div>
          <p className="text-slate-500 text-sm">Total</p>
          <p className="text-2xl font-bold text-slate-900">{formatPrice(total)}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={clearCart}
            className="border border-slate-300 text-slate-700 text-sm px-4 py-2 rounded-full hover:bg-slate-100 transition"
          >
            Clear Cart
          </button>
          <Link
            href="/checkout"
            className="bg-[#00C853] text-slate-900 font-semibold px-6 py-2 rounded-full hover:bg-[#00b34a] transition"
          >
            Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
