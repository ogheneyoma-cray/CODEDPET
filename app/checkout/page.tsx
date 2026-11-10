"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#00C853] focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-400";
const labelClass = "block text-sm font-medium text-slate-700 mb-2";

const empty = {
  name: "",
  email: "",
  phone: "",
  company: "",
  address: "",
  city: "",
  state: "",
  country: "",
  notes: "",
};

type Field = keyof typeof empty;

export default function CheckoutPage() {
  const { cart, ready, totalPrice } = useCart();
  const { currency, formatPrice } = useCurrency();

  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          currency,
          items: cart.map((i) => ({ id: i.id, quantity: i.quantity })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.link) throw new Error(data.error || "We couldn't start your payment. Please try again.");
      // The cart is cleared on the callback page once Cray confirms the payment.
      window.location.href = data.link;
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't place your order. Please try again.");
      setSubmitting(false);
    }
  };

  if (!ready) return <main className="max-w-6xl mx-auto px-4 pt-28 pb-16 min-h-[60vh]" />;

  if (cart.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 pt-32 pb-24 text-center">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Checkout</h1>
        <p className="text-slate-600 mb-8">Your cart is empty. Add a service before checking out.</p>
        <Link
          href="/shop"
          className="bg-[#00C853] text-slate-900 font-semibold px-6 py-3 rounded-full hover:bg-[#00b34a] transition"
        >
          Browse Services
        </Link>
      </main>
    );
  }

  const text = (id: Field, label: string, opts: { required?: boolean; type?: string; autoComplete?: string; placeholder?: string; wide?: boolean } = {}) => (
    <div className={opts.wide ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {!opts.required && <span className="text-slate-400 font-normal"> (optional)</span>}
      </label>
      <input
        id={id}
        name={id}
        type={opts.type ?? "text"}
        required={opts.required}
        autoComplete={opts.autoComplete}
        placeholder={opts.placeholder}
        className={inputClass}
        value={form[id]}
        onChange={update(id)}
      />
    </div>
  );

  return (
    <main className="max-w-6xl mx-auto px-4 pt-28 pb-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Checkout</h1>
        <p className="text-slate-600">Enter your details below to complete your order.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Contact details</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {text("name", "Full name", { required: true, autoComplete: "name", wide: true })}
              {text("email", "Email address", { required: true, type: "email", autoComplete: "email", placeholder: "you@example.com" })}
              {text("phone", "Phone number", { type: "tel", autoComplete: "tel" })}
              {text("company", "Company", { autoComplete: "organization", wide: true })}
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Billing address</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {text("address", "Street address", { autoComplete: "street-address", wide: true })}
              {text("city", "City", { autoComplete: "address-level2" })}
              {text("state", "State / Province", { autoComplete: "address-level1" })}
              {text("country", "Country", { autoComplete: "country-name", wide: true })}
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
            <label htmlFor="notes" className="block text-xl font-bold text-slate-900 mb-1">
              Project notes <span className="text-slate-400 text-sm font-normal">(optional)</span>
            </label>
            <p className="text-sm text-slate-500 mb-4">Goals, deadlines, links to an existing site: anything that helps us start.</p>
            <textarea id="notes" name="notes" rows={4} maxLength={2000} className={inputClass} value={form.notes} onChange={update("notes")} />
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Payment method</h2>
            <label className="flex items-center gap-3 rounded-lg border-2 border-[#00C853] bg-[#00C853]/5 p-4 cursor-pointer">
              <input type="radio" name="paymentMethod" value="cray" defaultChecked className="accent-[#00C853] w-4 h-4" />
              <span className="font-semibold text-slate-900">Cray</span>
            </label>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order summary</h2>
            <ul className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <div className="relative w-14 h-12 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                    <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
                    <p className="text-xs text-slate-500">Qty {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-slate-200 flex justify-between text-lg font-bold text-slate-900">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            {error && (
              <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full bg-[#00C853] text-slate-900 font-semibold px-6 py-3 rounded-full hover:bg-[#00b34a] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Redirecting to payment…" : `Pay ${formatPrice(totalPrice)}`}
            </button>
            <p className="mt-3 text-xs text-slate-500 text-center">
              By paying you agree to our <Link href="/terms" className="underline">terms</Link> and{" "}
              <Link href="/refund" className="underline">refund policy</Link>.
            </p>

            <Link href="/cart" className="mt-3 block text-center text-slate-600 text-sm hover:text-slate-900 transition">
              Back to cart
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
