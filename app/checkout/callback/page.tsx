import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { syncOrder } from "@/lib/orders";
import { sendOrderPaidEmails } from "@/lib/email";
import { formatMoney } from "@/lib/pricing";
import ClearCart from "./ClearCart";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Payment | Codedpet", robots: { index: false, follow: false } };

const btn = "inline-flex bg-[#00C853] text-slate-900 font-semibold px-6 py-3 rounded-full hover:bg-[#00b34a] transition";

export default async function CallbackPage({ searchParams }: { searchParams: Promise<{ reference?: string }> }) {
  const { reference = "" } = await searchParams;
  const { order, becamePaid } = await syncOrder(reference.toUpperCase());
  if (order && becamePaid) await sendOrderPaidEmails(order);

  if (!order) {
    return (
      <main className="max-w-xl mx-auto px-4 pt-32 pb-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Order not found</h1>
        <p className="text-slate-600 mb-8">We couldn&apos;t find that order. Please check the link and try again.</p>
        <Link href="/shop" className={btn}>Back to shop</Link>
      </main>
    );
  }

  const view =
    order.status === "paid"
      ? { Icon: CheckCircle2, tone: "text-[#00a344]", title: "Order confirmed", body: "Thank you, your payment was successful." }
      : order.status === "awaiting_payment" || order.status === "review"
        ? { Icon: Clock, tone: "text-amber-600", title: "Confirming your payment", body: "This can take a few minutes for bank transfers. Refresh this page to check again." }
        : { Icon: XCircle, tone: "text-red-600", title: "Payment not completed", body: "Your payment didn't go through. You can try again from your cart." };

  return (
    <main className="max-w-xl mx-auto px-4 pt-32 pb-24 text-center">
      {order.status === "paid" && <ClearCart />}
      <view.Icon className={`w-14 h-14 mx-auto mb-4 ${view.tone}`} aria-hidden />
      <h1 className="text-3xl font-bold text-slate-900 mb-3">{view.title}</h1>
      <p className="text-slate-600 mb-2">{view.body}</p>
      <p className="text-sm text-slate-500 mb-8">
        Order <span className="font-mono font-semibold text-slate-700">{order.reference}</span> ·{" "}
        {formatMoney(order.total, order.currency)}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href={`/order/${order.reference}`} className={btn}>View order</Link>
        {order.status === "failed" && (
          <Link href="/cart" className="inline-flex border border-slate-300 text-slate-700 font-semibold px-6 py-3 rounded-full hover:bg-slate-100">
            Back to cart
          </Link>
        )}
      </div>
    </main>
  );
}
