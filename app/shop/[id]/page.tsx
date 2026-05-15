"use client";

import { useParams } from "next/navigation";
import { products } from "@/lib/products";
import { useCurrency } from "@/context/CurrencyContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find(p => p.id === productId);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-white/60 mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/shop"
            className="bg-[#00C853] text-slate-900 px-6 py-3 font-semibold rounded-full hover:bg-[#00b34a] transition"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition"
      >
        <ArrowLeft size={16} />
        Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image Placeholder */}
        <div className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center">
          <div className="text-white/40 text-center">
            <div className="w-24 h-24 bg-[#00C853]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart size={32} />
            </div>
            <p>Product Image</p>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <span className="text-xs text-[#00C853] uppercase tracking-widest">{product.category}</span>
            <h1 className="text-3xl font-bold mt-2 mb-4">{product.name}</h1>
            <p className="text-white/60">{product.shortDesc}</p>
          </div>

          <div className="text-4xl font-bold text-[#00C853]">
            {formatPrice(product.price)}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-white/80 leading-relaxed">{product.fullDesc}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-white/60">
              <span className="font-semibold">SKU:</span> {product.sku}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full py-4 font-bold rounded-full transition flex items-center justify-center gap-2 ${
              isAdded
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-[#00C853] text-slate-900 hover:bg-[#00b34a]"
            }`}
          >
            {isAdded ? (
              <>
                <Check size={20} />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
