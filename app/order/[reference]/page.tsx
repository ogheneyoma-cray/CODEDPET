import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { getOrder } from "@/lib/orders";
import { formatMoney } from "@/lib/pricing";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Your order | Codedpet", robots: { index: false, follow: false } };

const STATUS = {
  awaiting_payment: {
    icon: Clock,
    title: "Order received",
    body: "We'll email you an invoice with payment instructions within one business day. Work starts once payment is confirmed.",
    tone: "text-amber-600",
  },
  paid: {
    icon: CheckCircle2,
    title: "Payment confirmed",
    body: "Thanks, your payment has been received. We'll be in touch shortly to agree the details and timeline.",
    tone: "text-[#00a344]",
  },
  cancelled: {
    icon: XCircle,
    title: "Order cancelled",
    body: "This order has been cancelled. If you think this is a mistake, please contact us.",
    tone: "text-red-600",
  },
} as const;

export default async function OrderPage({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  const order = await getOrder(reference.toUpperCase());
  if (!order) notFound();
  const s = STATUS[order.status];
  const Icon = s.icon;

  return (
    <main className="max-w-3xl mx-auto px-4 pt-28 pb-16">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10">
        <Icon className={`w-12 h-12 mb-4 ${s.tone}`} aria-hidden />
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{s.title}</h1>
        <p className="text-slate-600 mb-6">{s.body}</p>

        <dl className="grid sm:grid-cols-2 gap-4 rounded-xl bg-slate-50 p-5 text-sm mb-8">
          <div>
            <dt className="text-slate-500">Order reference</dt>
            <dd className="font-mono font-semibold text-slate-900">{order.reference}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Placed</dt>
            <dd className="text-slate-900">
              {order.createdAt.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Lagos" })}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Name</dt>
            <dd className="text-slate-900">{order.customerName}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd className="text-slate-900 break-all">{order.customerEmail}</dd>
          </div>
          {order.companyName && (
            <div>
              <dt className="text-slate-500">Company</dt>
              <dd className="text-slate-900">{order.companyName}</dd>
            </div>
          )}
        </dl>

        <h2 className="text-lg font-bold text-slate-900 mb-3">Items</h2>
        <ul className="divide-y divide-slate-200 border-y border-slate-200">
          {order.items.map((i) => (
            <li key={i.id} className="flex justify-between gap-4 py-3 text-sm">
              <span className="text-slate-900">
                {i.name} <span className="text-slate-500">× {i.quantity}</span>
              </span>
              <span className="font-semibold text-slate-900">{formatMoney(i.lineTotal, order.currency)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between pt-4 text-lg font-bold text-slate-900">
          <span>Total</span>
          <span>{formatMoney(order.total, order.currency)}</span>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Keep this page&apos;s link to check your order status. Questions? Email{" "}
          <a href={`mailto:${site.email}?subject=Order ${order.reference}`} className="underline text-slate-700">
            {site.email}
          </a>{" "}
          and quote your reference.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex bg-[#00C853] text-slate-900 font-semibold px-6 py-3 rounded-full hover:bg-[#00b34a] transition"
        >
          Back to shop
        </Link>
      </div>
    </main>
  );
}
