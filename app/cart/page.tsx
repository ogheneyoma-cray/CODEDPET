"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { MAX_QUANTITY } from "@/lib/pricing";

export default function CartPage() {
  const { cart, ready, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const { formatPrice } = useCurrency();

  if (!ready) return <main className="max-w-5xl mx-auto px-4 pt-28 pb-16 min-h-[60vh]" />;

  if (cart.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 pt-32 pb-20 text-center">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Your Cart</h1>
        <p className="text-slate-600 mb-8">You haven&apos;t added anything yet.</p>
        <Link
          href="/shop"
          className="bg-[#00C853] text-slate-900 font-semibold px-6 py-3 rounded-full hover:bg-[#00b34a] transition"
        >
          Browse Services
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 pt-28 pb-16">
      <h1 className="text-4xl font-bold mb-8 text-slate-900">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <ul className="lg:col-span-2 flex flex-col gap-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 border border-slate-200 rounded-2xl p-5 bg-white"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="relative w-20 h-16 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                  <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <Link href={`/shop/${item.id}`} className="font-semibold text-slate-900 hover:text-[#00a344]">
                    {item.name}
                  </Link>
                  <p className="text-slate-500 text-sm">{formatPrice(item.price)} each</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-5">
                <div className="flex items-center rounded-full border border-slate-300">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2.5 text-slate-600 hover:text-slate-900"
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-semibold text-slate-900" aria-live="polite">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= MAX_QUANTITY}
                    className="p-2.5 text-slate-600 hover:text-slate-900 disabled:opacity-40"
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="w-28 text-right font-bold text-slate-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-400 hover:text-red-600 transition"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h2>
          <div className="flex justify-between text-slate-600 mb-6">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-900">{formatPrice(totalPrice)}</span>
          </div>
          <Link
            href="/checkout"
            className="block text-center w-full bg-[#00C853] text-slate-900 font-semibold px-6 py-3 rounded-full hover:bg-[#00b34a] transition"
          >
            Proceed to Checkout
          </Link>
          <div className="mt-4 flex justify-between text-sm">
            <Link href="/shop" className="text-slate-600 hover:text-slate-900">
              Continue shopping
            </Link>
            <button type="button" onClick={clearCart} className="text-slate-500 hover:text-red-600">
              Clear cart
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
