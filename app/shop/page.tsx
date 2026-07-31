"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { useCurrency } from "@/context/CurrencyContext";

export default function ShopPage() {
  const { formatPrice } = useCurrency();

  return (
    <main className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-900">Shop Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-slate-200 rounded-3xl overflow-hidden flex flex-col bg-white hover:border-[#00C853] transition-all hover:shadow-xl hover:shadow-[#00C853]/10">
            <Link href={`/shop/${product.id}`} className="relative aspect-[3/2] bg-slate-100 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </Link>
            <div className="p-8 flex flex-col gap-4 flex-1">
              <span className="text-xs text-[#00C853] uppercase tracking-widest font-semibold">{product.category}</span>
              <h2 className="text-2xl font-bold text-slate-900">{product.name}</h2>
              <p className="text-slate-600 text-base flex-1">{product.shortDesc}</p>
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
                <span className="text-2xl font-bold text-slate-900">{formatPrice(product.price)}</span>
                <Link
                  href={`/shop/${product.id}`}
                  className="bg-[#00C853] text-slate-900 text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#00b34a] transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
