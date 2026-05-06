import React from "react";
import Link from "next/link";
import { products } from "@/lib/products";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
};

export default function ShopPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-900">Shop Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-slate-200 rounded-3xl p-8 flex flex-col gap-4 bg-white hover:border-[#00C853] transition-all hover:shadow-xl hover:shadow-[#00C853]/10">
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
        ))}
      </div>
    </main>
  );
}