import type { Metadata } from "next";
import Link from "next/link";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { listOrders, orderCounts, ORDER_STATUSES, type OrderStatus } from "@/lib/orders";
import { formatMoney } from "@/lib/pricing";
import LoginForm from "./LoginForm";
import { cancelOrder, logout, markPaid } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Orders | Codedpet admin", robots: { index: false, follow: false } };

const LABEL: Record<OrderStatus, string> = {
  awaiting_payment: "Awaiting payment",
  paid: "Paid",
  cancelled: "Cancelled",
};
const BADGE: Record<OrderStatus, string> = {
  awaiting_payment: "bg-amber-100 text-amber-800",
  paid: "bg-green-100 text-green-800",
  cancelled: "bg-slate-200 text-slate-700",
};

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  if (!adminConfigured()) {
    return (
      <main className="max-w-md mx-auto px-4 pt-32 pb-24">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin is not set up</h1>
        <p className="text-slate-600">Set ADMIN_PASSWORD (12+ characters) in the server environment and redeploy.</p>
      </main>
    );
  }
  if (!(await isAdmin())) {
    return (
      <main className="max-w-md mx-auto px-4 pt-32 pb-24">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Orders admin</h1>
        <LoginForm />
      </main>
    );
  }

  const { status, q } = await searchParams;
  const [orders, counts] = await Promise.all([listOrders({ status, q }), orderCounts()]);

  return (
    <main className="max-w-7xl mx-auto px-4 pt-28 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
        <form action={logout}>
          <button className="text-sm text-slate-600 hover:text-slate-900 underline">Sign out</button>
        </form>
      </div>

      <nav className="flex flex-wrap gap-2 mb-4 text-sm" aria-label="Filter by status">
        <Link
          href="/admin"
          className={`px-3 py-1.5 rounded-full border ${!status ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 text-slate-700"}`}
        >
          All ({counts.awaiting_payment + counts.paid + counts.cancelled})
        </Link>
        {ORDER_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin?status=${s}`}
            className={`px-3 py-1.5 rounded-full border ${status === s ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 text-slate-700"}`}
          >
            {LABEL[s]} ({counts[s]})
          </Link>
        ))}
      </nav>

      <form className="mb-6 flex gap-2 max-w-md">
        {status && <input type="hidden" name="status" value={status} />}
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name, email or reference"
          aria-label="Search orders"
          className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-slate-900"
        />
        <button className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm">Search</button>
      </form>

      {orders.length === 0 ? (
        <p className="text-slate-600">No orders yet.</p>
      ) : (
        <div className="grid grid-cols-[minmax(0,1fr)]">
          <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-3 font-medium">Date</th>
                  <th className="p-3 font-medium">Reference</th>
                  <th className="p-3 font-medium">Customer</th>
                  <th className="p-3 font-medium">Items</th>
                  <th className="p-3 font-medium text-right">Total</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 align-top">
                {orders.map((o) => (
                  <tr key={o.reference}>
                    <td className="p-3 whitespace-nowrap text-slate-600">
                      {o.createdAt.toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short", timeZone: "Africa/Lagos" })}
                    </td>
                    <td className="p-3 font-mono whitespace-nowrap">
                      <Link href={`/order/${o.reference}`} className="text-slate-900 underline" target="_blank">
                        {o.reference}
                      </Link>
                    </td>
                    <td className="p-3 text-slate-900">
                      <div className="font-medium">{o.customerName}</div>
                      <div className="text-slate-500 break-all">{o.customerEmail}</div>
                      {o.customerPhone && <div className="text-slate-500">{o.customerPhone}</div>}
                      {o.companyName && <div className="text-slate-500">{o.companyName}</div>}
                      {o.billingAddress && (
                        <div className="text-slate-500">
                          {[o.billingAddress.address, o.billingAddress.city, o.billingAddress.state, o.billingAddress.country]
                            .filter(Boolean)
                            .join(", ")}
                        </div>
                      )}
                      {o.notes && <p className="mt-1 text-slate-600 whitespace-pre-line max-w-xs">Notes: {o.notes}</p>}
                    </td>
                    <td className="p-3 text-slate-700">
                      {o.items.map((i) => (
                        <div key={i.id}>
                          {i.name} × {i.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="p-3 text-right font-semibold whitespace-nowrap text-slate-900">
                      {formatMoney(o.total, o.currency)}
                    </td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${BADGE[o.status]}`}>
                        {LABEL[o.status]}
                      </span>
                      {o.paidAt && (
                        <div className="text-xs text-slate-500 mt-1">
                          {o.paidAt.toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short", timeZone: "Africa/Lagos" })}
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      {o.status === "awaiting_payment" && (
                        <div className="flex flex-col gap-2">
                          <form action={markPaid}>
                            <input type="hidden" name="reference" value={o.reference} />
                            <button className="w-full whitespace-nowrap px-3 py-1.5 rounded-full bg-[#00C853] text-slate-900 font-semibold text-xs">
                              Mark as paid
                            </button>
                          </form>
                          <form action={cancelOrder}>
                            <input type="hidden" name="reference" value={o.reference} />
                            <button className="w-full px-3 py-1.5 rounded-full border border-slate-300 text-slate-700 text-xs">
                              Cancel
                            </button>
                          </form>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
