"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Lock } from "lucide-react";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00C853] focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-400";
const labelClass = "block text-sm font-medium text-slate-700 mb-2";

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const { formatPrice } = useCurrency();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    // Payer / contact details
    fullName: "",
    email: "",
    phone: "",
    // Shipping / billing address
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    // Card details
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const formatCardNumber = (value: string) =>
    value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: connect to backend/payment processor.
    // Example:
    // const res = await fetch("/api/checkout", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ ...form, items: cart, total: totalPrice }),
    // });

    setTimeout(() => {
      setSubmitting(false);
      alert("Checkout form captured. Payment backend is not yet connected.");
    }, 600);
  };

  if (cart.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Checkout</h1>
        <p className="text-slate-600 mb-8">Your cart is empty — add something before checking out.</p>
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
    <main className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Checkout</h1>
        <p className="text-slate-600">Enter your details below to complete your order.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-10">
        {/* Left: form fields */}
        <div className="lg:col-span-2 space-y-10">
          {/* Contact details */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className={labelClass}>Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  className={inputClass}
                  placeholder="Jane Doe"
                  value={form.fullName}
                  onChange={update("fullName")}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={update("email")}
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className={inputClass}
                  placeholder="+234 901 963 2428"
                  value={form.phone}
                  onChange={update("phone")}
                />
              </div>
            </div>
          </section>

          {/* Shipping address */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Shipping Address</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label htmlFor="address" className={labelClass}>Street Address</label>
                <input
                  id="address"
                  type="text"
                  required
                  autoComplete="address-line1"
                  className={inputClass}
                  placeholder="108 Ogunlana Drive"
                  value={form.address}
                  onChange={update("address")}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="apartment" className={labelClass}>Apartment, Suite, etc. (optional)</label>
                <input
                  id="apartment"
                  type="text"
                  autoComplete="address-line2"
                  className={inputClass}
                  placeholder="Apt, suite, unit"
                  value={form.apartment}
                  onChange={update("apartment")}
                />
              </div>
              <div>
                <label htmlFor="city" className={labelClass}>City</label>
                <input
                  id="city"
                  type="text"
                  required
                  autoComplete="address-level2"
                  className={inputClass}
                  placeholder="Lagos"
                  value={form.city}
                  onChange={update("city")}
                />
              </div>
              <div>
                <label htmlFor="state" className={labelClass}>State / Province</label>
                <input
                  id="state"
                  type="text"
                  required
                  autoComplete="address-level1"
                  className={inputClass}
                  placeholder="Lagos State"
                  value={form.state}
                  onChange={update("state")}
                />
              </div>
              <div>
                <label htmlFor="postalCode" className={labelClass}>Postal Code</label>
                <input
                  id="postalCode"
                  type="text"
                  required
                  autoComplete="postal-code"
                  className={inputClass}
                  placeholder="100001"
                  value={form.postalCode}
                  onChange={update("postalCode")}
                />
              </div>
              <div>
                <label htmlFor="country" className={labelClass}>Country</label>
                <input
                  id="country"
                  type="text"
                  required
                  autoComplete="country-name"
                  className={inputClass}
                  placeholder="Nigeria"
                  value={form.country}
                  onChange={update("country")}
                />
              </div>
            </div>
          </section>

          {/* Card details */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-[#00C853]" />
              <h2 className="text-xl font-bold text-slate-900">Payment Details</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label htmlFor="cardName" className={labelClass}>Name on Card</label>
                <input
                  id="cardName"
                  type="text"
                  required
                  autoComplete="cc-name"
                  className={inputClass}
                  placeholder="Jane Doe"
                  value={form.cardName}
                  onChange={update("cardName")}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="cardNumber" className={labelClass}>Card Number</label>
                <input
                  id="cardNumber"
                  type="text"
                  inputMode="numeric"
                  required
                  autoComplete="cc-number"
                  maxLength={19}
                  className={inputClass}
                  placeholder="1234 5678 9012 3456"
                  value={form.cardNumber}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))
                  }
                />
              </div>
              <div>
                <label htmlFor="expiry" className={labelClass}>Expiry Date</label>
                <input
                  id="expiry"
                  type="text"
                  inputMode="numeric"
                  required
                  autoComplete="cc-exp"
                  maxLength={5}
                  className={inputClass}
                  placeholder="MM/YY"
                  value={form.expiry}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, expiry: formatExpiry(e.target.value) }))
                  }
                />
              </div>
              <div>
                <label htmlFor="cvv" className={labelClass}>CVV</label>
                <input
                  id="cvv"
                  type="password"
                  inputMode="numeric"
                  required
                  autoComplete="cc-csc"
                  maxLength={4}
                  className={inputClass}
                  placeholder="123"
                  value={form.cvv}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                    }))
                  }
                />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              Your payment details are encrypted and never stored on our servers.
            </p>
          </section>
        </div>

        {/* Right: order summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            <div className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative w-14 h-12 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                    <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
                    <p className="text-xs text-slate-500">Qty {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 space-y-2">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Shipping</span>
                <span>Calculated at fulfillment</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-slate-900 pt-2">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full bg-[#00C853] text-slate-900 font-semibold px-6 py-3 rounded-full hover:bg-[#00b34a] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Processing..." : `Pay ${formatPrice(totalPrice)}`}
            </button>

            <button
              type="button"
              onClick={() => router.push("/cart")}
              className="mt-3 w-full text-slate-600 text-sm hover:text-slate-900 transition"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
