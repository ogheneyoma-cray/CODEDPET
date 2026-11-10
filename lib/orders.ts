import "server-only";
import { randomInt } from "node:crypto";
import { db } from "./db";
import { products } from "./products";
import { convert, USD_TO_NGN, type Currency } from "./pricing";
import { site } from "./site";
import { CrayError, mapCrayStatus, queryCrayPayment } from "./cray";
import type { CheckoutInput } from "./validation";

export type OrderStatus = "awaiting_payment" | "paid" | "failed" | "review" | "cancelled";
export const ORDER_STATUSES: OrderStatus[] = ["awaiting_payment", "paid", "failed", "review", "cancelled"];

export type OrderItem = {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type Order = {
  reference: string;
  status: OrderStatus;
  currency: Currency;
  total: number;
  usdTotal: number;
  items: OrderItem[];
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  companyName: string | null;
  billingAddress: { address?: string; city?: string; state?: string; country?: string } | null;
  notes: string | null;
  paymentChannel: string | null;
  statusNote: string | null;
  paidAt: Date | null;
  createdAt: Date;
};

export class CheckoutError extends Error {}

// No 0/O/1/I so references are easy to read out.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function newReference(): string {
  const chunk = () => Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
  return `${site.referencePrefix}-${chunk()}-${chunk()}-${chunk()}`;
}

/** Prices every line from the catalogue. The browser only sends ids and quantities. */
export function priceItems(input: CheckoutInput["items"], currency: Currency) {
  const merged = new Map<string, number>();
  for (const { id, quantity } of input) merged.set(id, (merged.get(id) ?? 0) + quantity);

  const items: OrderItem[] = [];
  let usdTotal = 0;
  for (const [id, quantity] of merged) {
    const product = products.find((p) => p.id === id);
    if (!product) throw new CheckoutError("One of the services in your cart is no longer available.");
    const unitPrice = convert(product.price, currency);
    items.push({
      id,
      sku: product.sku,
      name: product.name,
      quantity,
      unitPrice,
      lineTotal: Math.round(unitPrice * quantity * 100) / 100,
    });
    usdTotal += product.price * quantity;
  }
  const total = Math.round(items.reduce((s, i) => s + i.lineTotal, 0) * 100) / 100;
  return { items, total, usdTotal: Math.round(usdTotal * 100) / 100 };
}

type Row = Record<string, unknown>;
function toOrder(r: Row): Order {
  return {
    reference: r.reference as string,
    status: r.status as OrderStatus,
    currency: r.currency as Currency,
    total: Number(r.total),
    usdTotal: Number(r.usd_total),
    items: r.items as OrderItem[],
    customerName: r.customer_name as string,
    customerEmail: r.customer_email as string,
    customerPhone: (r.customer_phone as string) ?? null,
    companyName: (r.company_name as string) ?? null,
    billingAddress: (r.billing_address as Order["billingAddress"]) ?? null,
    notes: (r.notes as string) ?? null,
    paymentChannel: (r.payment_channel as string) ?? null,
    statusNote: (r.status_note as string) ?? null,
    paidAt: (r.paid_at as Date) ?? null,
    createdAt: r.created_at as Date,
  };
}

export async function createOrder(input: CheckoutInput): Promise<Order> {
  const { items, total, usdTotal } = priceItems(input.items, input.currency);
  const sql = await db();
  const address = [input.address, input.city, input.state, input.country].some(Boolean)
    ? { address: input.address, city: input.city, state: input.state, country: input.country }
    : null;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const [row] = await sql`
        INSERT INTO orders (reference, currency, total, usd_total, fx_rate, items,
          customer_name, customer_email, customer_phone, company_name, billing_address, notes)
        VALUES (${newReference()}, ${input.currency}, ${total}, ${usdTotal},
          ${input.currency === "NGN" ? USD_TO_NGN : 1}, ${sql.json(items)},
          ${input.name}, ${input.email}, ${input.phone ?? null}, ${input.company ?? null},
          ${address ? sql.json(address) : null}, ${input.notes ?? null})
        RETURNING *`;
      return toOrder(row);
    } catch (err) {
      // 23505 = duplicate reference; try a fresh one.
      if ((err as { code?: string }).code !== "23505") throw err;
    }
  }
  throw new Error("Could not allocate an order reference");
}

export async function getOrder(reference: string): Promise<Order | null> {
  if (!/^[A-Z]{2,4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(reference)) return null;
  const sql = await db();
  const [row] = await sql`SELECT * FROM orders WHERE reference = ${reference}`;
  return row ? toOrder(row) : null;
}

export async function listOrders(opts: { status?: string; q?: string; limit?: number } = {}) {
  const sql = await db();
  const status = ORDER_STATUSES.includes(opts.status as OrderStatus) ? (opts.status as string) : null;
  const q = opts.q?.trim() ? `%${opts.q.trim().replace(/[\\%_]/g, (c) => `\\${c}`)}%` : null;
  const rows = await sql`
    SELECT * FROM orders
    WHERE (${status}::text IS NULL OR status = ${status})
      AND (${q}::text IS NULL OR reference ILIKE ${q} OR customer_name ILIKE ${q} OR customer_email ILIKE ${q})
    ORDER BY created_at DESC
    LIMIT ${opts.limit ?? 200}`;
  return rows.map(toOrder);
}

export async function orderCounts(): Promise<Record<OrderStatus, number>> {
  const sql = await db();
  const rows = await sql`SELECT status, count(*)::int AS n FROM orders GROUP BY status`;
  const counts = { awaiting_payment: 0, paid: 0, failed: 0, review: 0, cancelled: 0 };
  for (const r of rows) counts[r.status as OrderStatus] = r.n as number;
  return counts;
}

/** Admin action: moves an open order to paid or cancelled. Returns the order only if it changed. */
export async function setOrderStatus(reference: string, to: "paid" | "cancelled"): Promise<Order | null> {
  const sql = await db();
  const [row] = await sql`
    UPDATE orders SET status = ${to}, updated_at = now(),
      paid_at = CASE WHEN ${to} = 'paid' THEN now() ELSE paid_at END,
      cancelled_at = CASE WHEN ${to} = 'cancelled' THEN now() ELSE cancelled_at END
    WHERE reference = ${reference} AND status IN ('awaiting_payment', 'failed', 'review')
    RETURNING *`;
  return row ? toOrder(row) : null;
}

export async function setCheckoutLink(reference: string, link: string) {
  const sql = await db();
  await sql`UPDATE orders SET checkout_link = ${link}, updated_at = now() WHERE reference = ${reference}`;
}

export async function markInitFailed(reference: string, note: string) {
  const sql = await db();
  await sql`UPDATE orders SET status = 'failed', status_note = ${note.slice(0, 500)}, updated_at = now()
    WHERE reference = ${reference} AND status = 'awaiting_payment'`;
}

/**
 * Asks Cray for the payment status and updates the order. Never downgrades an order
 * that is already paid, under review or cancelled. Returns the order and whether it
 * just became paid (so the caller can send the confirmation emails once).
 */
export async function syncOrder(reference: string): Promise<{ order: Order | null; becamePaid: boolean }> {
  const order = await getOrder(reference);
  if (!order || ["paid", "review", "cancelled"].includes(order.status)) return { order, becamePaid: false };

  let payment;
  try {
    payment = await queryCrayPayment(reference);
  } catch (err) {
    // 404: the customer never reached the payment page. Anything else: try again later.
    if (!(err instanceof CrayError) || err.httpStatus !== 404) console.error(`[cray] query ${reference} failed:`, err);
    return { order, becamePaid: false };
  }

  const mapped = mapCrayStatus(payment.status ?? "");
  let next: OrderStatus = mapped === "paid" ? "paid" : mapped === "failed" ? "failed" : "awaiting_payment";
  let note: string | null = null;
  if (next === "paid" && payment.amount != null && Math.abs(Number(payment.amount) - order.total) > 0.01) {
    next = "review";
    note = `Cray reported ${payment.amount} ${payment.currency ?? ""}, order total is ${order.total} ${order.currency}`;
  }

  const sql = await db();
  const [row] = await sql`
    UPDATE orders SET status = ${next}, cray_status = ${payment.status ?? null},
      provider_reference = ${payment.provider_reference ?? null}, payment_channel = ${payment.payment_channel ?? null},
      status_note = COALESCE(${note}, status_note),
      paid_at = CASE WHEN ${next} = 'paid' THEN now() ELSE paid_at END, updated_at = now()
    WHERE reference = ${reference} AND status IN ('awaiting_payment', 'failed')
    RETURNING *`;
  if (!row) return { order: await getOrder(reference), becamePaid: false };
  return { order: toOrder(row), becamePaid: next === "paid" };
}
